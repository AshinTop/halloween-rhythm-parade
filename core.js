export const LANES = ['D', 'F', 'J', 'K'];
export const WINDOW = .18;
const TIMING_EPSILON=1e-9;
export const SONGS = Object.freeze([
  {id:'lantern-walk',zh:'南瓜灯的散步',en:'Lantern Walk',bpm:96,bars:18,root:60,color:'#ecb36b',level:1,notes:['暖身巡游','A gentle first parade']},
  {id:'velvet-wings',zh:'天鹅绒蝠翼',en:'Velvet Wings',bpm:112,bars:22,root:62,color:'#c0a5df',level:2,notes:['切分节奏 · 双音','Syncopation · Twin notes']},
  {id:'midnight-confetti',zh:'午夜糖果雨',en:'Midnight Confetti',bpm:126,bars:24,root:65,color:'#97cbbd',level:3,notes:['轻快疾行 · 双音','Quick steps · Twin notes']}
]);

const PATTERNS = [
  [[0,0],[1,1],[2,2],[3,3]],
  [[0,0],[.75,2],[1.5,1],[2,3],[3,2],[3.5,1]],
  [[0,0],[.5,1],[1,2],[1.5,3],[2,1],[2.75,2],[3.5,0]]
];
const MOTIFS = [[0,1,2,3],[2,1,3,0],[3,2,1,0],[1,3,0,2]];
const SCALE = [0,3,7,10];

export function buildChart(songIndex=0, practice=false) {
  const index = Number.isInteger(songIndex) && songIndex>=0 && songIndex<SONGS.length ? songIndex : 0;
  const song=SONGS[index], speed=practice?.75:1, beat=60/song.bpm/speed, lead=beat*4;
  const notes=[], events=[];
  // Four quiet clicks count in before the first playable note.
  for(let b=0;b<4;b++)events.push({time:b*beat,type:'click',pitch:76,velocity:.035});
  for(let bar=0;bar<song.bars;bar++) {
    const phrase=Math.floor(bar/4)%4, motif=MOTIFS[phrase];
    const pattern=PATTERNS[index];
    const rest=bar%8===7;
    pattern.forEach(([position,lane],i)=>{
      if(rest && position>2)return;
      const mapped=motif[(lane+Math.floor(bar/2))%4];
      const time=lead+(bar*4+position)*beat;
      notes.push({id:notes.length,lane:mapped,time});
      events.push({time,type:'bell',pitch:song.root+12+SCALE[mapped],velocity:.10,duration:beat*.65});
      if(index>0 && bar%4===3 && position===0) {
        const second=(mapped+2)%4;
        notes.push({id:notes.length,lane:second,time});
        events.push({time,type:'bell',pitch:song.root+12+SCALE[second],velocity:.07,duration:beat*.65});
      }
    });
    const bassRoot=song.root-24+[0,0,-5,-2][Math.floor(bar/2)%4];
    for(let b=0;b<4;b++) {
      const time=lead+(bar*4+b)*beat;
      events.push({time,type:b%2?'snap':'kick',pitch:0,velocity:b%2?.08:.24});
      events.push({time,type:'bass',pitch:bassRoot+(b===3?7:0),velocity:.11,duration:beat*.67});
      events.push({time,type:'hat',pitch:0,velocity:.025});
      events.push({time:time+beat*.5,type:'hat',pitch:0,velocity:.018});
      if(b===0)events.push({time,type:'pad',pitch:bassRoot+24,velocity:.028,duration:beat*3.5});
    }
  }
  notes.sort((a,b)=>a.time-b.time||a.lane-b.lane);notes.forEach((n,i)=>n.id=i);
  events.sort((a,b)=>a.time-b.time);
  return {songIndex:index,song,practice:!!practice,speed,beat,lead,notes,events,duration:lead+song.bars*4*beat+1.0};
}

export function newRun(chart) {
  return {chart,status:new Array(chart.notes.length).fill(0),score:0,combo:0,maxCombo:0,
    counts:{perfect:0,good:0,okay:0,miss:0},nextMiss:0,judged:0,finished:false,last:null};
}

export function advanceRun(run,time) {
  if(run.finished)return [];
  const missed=[];
  while(run.nextMiss<run.chart.notes.length && run.chart.notes[run.nextMiss].time+WINDOW+TIMING_EPSILON<time) {
    const i=run.nextMiss++;
    if(run.status[i]!==0)continue;
    run.status[i]=4;run.counts.miss++;run.judged++;run.combo=0;
    const last={kind:'miss',lane:run.chart.notes[i].lane,id:i,time};run.last=last;missed.push(last);
  }
  if(time>=run.chart.duration){run.finished=true;}
  return missed;
}

export function hitLane(run,lane,time) {
  if(run.finished||!Number.isInteger(lane)||lane<0||lane>3||!Number.isFinite(time))return null;
  advanceRun(run,time);
  let closest=-1,distance=WINDOW+TIMING_EPSILON;
  for(let i=run.nextMiss;i<run.chart.notes.length;i++) {
    const n=run.chart.notes[i];
    if(n.time>time+WINDOW+TIMING_EPSILON)break;
    if(run.status[i]||n.lane!==lane)continue;
    const d=Math.abs(n.time-time);
    if(d<distance){closest=i;distance=d;}
  }
  if(closest===-1)return null;
  const kind=distance<=.055+TIMING_EPSILON?'perfect':distance<=.115+TIMING_EPSILON?'good':'okay',status=kind==='perfect'?1:kind==='good'?2:3;
  run.status[closest]=status;run.counts[kind]++;run.judged++;run.combo++;
  run.maxCombo=Math.max(run.maxCombo,run.combo);
  const base=kind==='perfect'?1000:kind==='good'?700:400;
  run.score+=Math.round(base*(1+Math.min(20,run.combo-1)*.025));
  run.last={kind,lane,id:closest,time,offset:time-run.chart.notes[closest].time};
  return run.last;
}

export function accuracy(run,final=false) {
  const denominator=final?run.chart.notes.length:run.judged;
  return denominator?100*(run.counts.perfect+run.counts.good*.7+run.counts.okay*.4)/denominator:100;
}

export function grade(run) {
  const a=accuracy(run,true);return a>=98?'S+':a>=92?'S':a>=82?'A':a>=68?'B':a>=50?'C':'D';
}

export function lowerBound(events,time) {
  let lo=0,hi=events.length;
  while(lo<hi){const mid=(lo+hi)>>>1;if(events[mid].time<time)lo=mid+1;else hi=mid;}
  return lo;
}

export function selectFromHash(hash) {
  const p=new URLSearchParams(String(hash||'').replace(/^#/,''));
  const id=p.get('song'),songIndex=Math.max(0,SONGS.findIndex(s=>s.id===id));
  return {songIndex,practice:p.get('practice')==='1'};
}

export function cleanPreferences(raw) {
  const p=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
  const best={};
  for(const s of SONGS){const b=p.best?.[s.id];if(b&&typeof b==='object'&&Number.isInteger(b.score)&&b.score>=0&&b.score<1e7&&Number.isFinite(b.accuracy)&&b.accuracy>=0&&b.accuracy<=100)best[s.id]={score:b.score,accuracy:b.accuracy};}
  return {lang:['en','zh'].includes(p.lang)?p.lang:'en',sound:p.sound!==false,offset:Number.isFinite(p.offset)?Math.max(-150,Math.min(150,Math.round(p.offset))):0,best};
}

export const timeLabel=seconds=>`${Math.floor(Math.max(0,seconds)/60)}:${String(Math.floor(Math.max(0,seconds)%60)).padStart(2,'0')}`;
