import {SONGS,LANES,buildChart,newRun,hitLane,advanceRun,accuracy,grade,selectFromHash,cleanPreferences,timeLabel} from './core.js';
import {ParadeAudio} from './audio.js';

const $=s=>document.querySelector(s),storageKey='midnight-rhythm-parade-v1';
let saved;try{saved=JSON.parse(localStorage.getItem(storageKey)||'null');}catch{}
const prefs=cleanPreferences(saved),initial=selectFromHash(location.hash);
let songIndex=initial.songIndex,practice=initial.practice,lang=prefs.lang,phase='ready',chart=buildChart(songIndex,practice),run=newRun(chart),currentTime=0;
let frame=0,lastFrame=0,lastStats=0,lastJudgement=0,toastTimer=0,startRequest=0;
const activeKeys=new Set(),pressed=[0,0,0,0],audio=new ParadeAudio(),colors=['#edb477','#c3a0d9','#9dd3cc','#dba8be'];
const canvas=$('#track'),ctx=canvas.getContext('2d');let width=640,height=350,dpr=1;
audio.onInterrupted=()=>pause();
const tr=(en,zh)=>lang==='zh'?zh:en;
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({...prefs,lang}));}catch{}}
function ghostArt(lane){
  const head=lane===0?'<path d="M32 16q-4-8 4-11" fill="none" stroke="#a9b58c" stroke-width="4" stroke-linecap="round"/><ellipse cx="32" cy="36" rx="24" ry="21" fill="#eab071"/><ellipse cx="32" cy="36" rx="13" ry="21" fill="#f3c48d"/><path d="M19 31l8-4v9Z M45 31l-8-4v9Z M23 43q9 10 18 0" fill="#57404b"/>':lane===1?'<path d="M12 17L16 2l13 13 8-1L50 2l2 18q15 23-9 35H21Q0 45 12 17Z" fill="#b69ad0"/><path d="M16 13l2-5 5 8 M44 15l5-7 0 9" fill="#ddbbd9"/><path d="M19 31l9-3 M37 28l9 3" stroke="#4b385f" stroke-width="3" stroke-linecap="round"/><path d="M29 37h7l-3 4Z M27 44l4 5 3-4 3 4 3-5" fill="#4b385f"/>':lane===2?'<path d="M10 33q0-30 22-30t22 30l3 25-12-6-12 8-12-8-13 6Z" fill="#b5d8d3"/><ellipse cx="24" cy="29" rx="3" ry="5" fill="#39545c"/><ellipse cx="41" cy="29" rx="3" ry="5" fill="#39545c"/><path d="M28 41q5 5 10 0" fill="none" stroke="#39545c" stroke-width="2" stroke-linecap="round"/><ellipse cx="17" cy="37" rx="5" ry="2" fill="#e1b7b5" opacity=".5"/><ellipse cx="47" cy="37" rx="5" ry="2" fill="#e1b7b5" opacity=".5"/>':'<path d="M23 23L7 14l4 16L2 39l16-1q8 21 25 3l19 0-9-14 4-13-17 9Z" fill="#d6a4b8"/><path d="M24 24L23 10l8 8 8-8 1 14" fill="#e9bdd0"/><ellipse cx="27" cy="31" rx="3" ry="4" fill="#65445b"/><ellipse cx="39" cy="31" rx="3" ry="4" fill="#65445b"/><path d="M28 41q5 5 10 0" fill="none" stroke="#65445b" stroke-width="2"/>';
  return `<svg viewBox="0 0 64 66" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="32" cy="61" rx="22" ry="4" fill="#0b1023" opacity=".3"/>${head}</svg>`;
}
$('#lanes').innerHTML=LANES.map((key,i)=>`<button class="lane" data-lane="${i}" aria-label="Lane ${i+1}, ${key}" style="--lane:${colors[i]}">${ghostArt(i)}<span class="key">${key}</span></button>`).join('');
$('#parade-art').innerHTML=[1,0,2].map(ghostArt).join('');

function renderText(){
  document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=tr('Midnight Rhythm Parade · Halloween','怪物节拍巡游 · 万圣节');
  $('#title').innerHTML=tr('Rhythm <em>Parade</em>','怪物<em>节拍巡游</em>');$('#language').textContent=tr('中文','EN');
  $('#help').ariaLabel=tr('How to play','玩法说明');$('#sound').textContent=prefs.sound?'♪':'♩';$('#sound').ariaLabel=prefs.sound?tr('Mute sound','关闭声音'):tr('Enable sound','开启声音');
  $('#song-label').textContent=tr('Song','曲目');$('#song-select').innerHTML=SONGS.map((s,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} · ${lang==='zh'?s.zh:s.en}</option>`).join('');$('#song-select').value=String(songIndex);
  $('#practice').textContent=tr('Practice · 75%','练习 · 75%');$('#practice').setAttribute('aria-pressed',String(practice));
  $('#score-label').textContent=tr('SCORE','得分');$('#combo-label').textContent=tr('COMBO','连击');$('#accuracy-label').textContent=tr('ACCURACY','准确率');
  $('#journal-title').innerHTML=tr('Four friends.<br>One perfect moment.','四位小伙伴，<br>同一个好节拍。');
  $('#journal-copy').textContent=tr('A pumpkin on percussion. A shy ghost on bells. There’s a place for you in the parade.','南瓜敲着鼓，害羞的幽灵摇响铃。午夜巡游，等你来合奏。');
  $('#journal-tip').textContent=tr('20 notes in a row set the lanterns aglow. Every song plays to the end, so take a breath and find the beat.','连续命中 20 个音符，点亮整条灯火长街。每首歌都能弹到最后，慢慢找到你的节拍。');
  $('#difficulty-label').textContent=tr('ENERGY','节奏强度');$('#notes-label').textContent=tr('LANTERNS','音符数量');$('#best-label').textContent=tr('YOUR BEST PERFORMANCE','个人最佳演出');
  $('#restart').innerHTML=`↻ <span>${tr('Restart','重来')}</span>`;$('#restart').ariaLabel=tr('Restart song','重置曲目');$('#share').innerHTML=`↗ <span>${tr('Share','分享')}</span>`;$('#share').ariaLabel=tr('Share song','分享曲目');$('#settings').ariaLabel=tr('Timing settings','时间校准');$('#footer-hint').textContent=tr('Three original songs. A little courage.','三首原创小曲，等一点点勇气。');
  $('#help-title').textContent=tr('Find your rhythm.','跟上这段小节拍。');$('#help-done').textContent=tr('Let’s play','开始玩');
  $('#help-copy').innerHTML=tr('<div class="keys"><i>D</i><i>F</i><i>J</i><i>K</i></div><p><b>Meet the gold line.</b> Tap a matching key or monster button when its falling lantern reaches the glowing target. Two lanterns together mean two buttons together.</p><p><b>Keep the street glowing.</b> Perfect ±55 ms, Good ±115 ms, Okay ±180 ms. Twenty hits in a row light Lantern Fever. A missed note resets your combo, but the song keeps going.</p><p><b>Take it gently.</b> Practice plays at 75% speed without changing your stage record. Pause any time. Changing tabs pauses the parade until you press Resume.</p>','<div class="keys"><i>D</i><i>F</i><i>J</i><i>K</i></div><p><b>等音符落到金线。</b> 按对应键，或轻触下方小怪物。两个音符一起到达时，请同时按两个键。</p><p><b>把街道点亮。</b> 完美 ±55 毫秒、很好 ±115 毫秒、命中 ±180 毫秒。连续命中 20 个音符点亮灯火连击。漏掉音符会中断连击，音乐仍会继续。</p><p><b>慢一点也很好。</b> 练习模式使用 75% 速度，不计入正式演出纪录。随时可以暂停，切到其他页面也会自动暂停，回来后点继续。</p>');
  $('#settings-title').textContent=tr('Your timing.','你的节拍。');$('#settings-copy').textContent=tr('If your device sounds late, add a positive audio offset. This shifts note judgement and the visual notes, not the song.','如果设备的声音稍慢，请增加正向延迟值。这会同步后移画面音符与判定，不会改变乐曲。');$('#offset-label').textContent=tr('Audio offset','声音延迟校准');$('#settings-note').textContent=tr('For the tightest timing, try wired headphones or your device’s speakers.','需要更稳定的节拍时，可以使用有线耳机或设备扬声器。');$('#settings-done').textContent=tr('Done','完成');$('#offset').value=String(prefs.offset);$('#offset-value').textContent=`${prefs.offset>0?'+':''}${prefs.offset} ms`;
  $('#share-title').textContent=tr('Invite a little company.','叫上小伙伴。');$('#share-copy').textContent=tr('This link opens the same song and practice setting.','链接会打开同一首曲目与练习设置。');$('#copy-link').textContent=tr('Copy link','复制链接');$('#play-again').textContent=tr('Play again','再来一曲');$('#next-song').textContent=tr('Next song ↗','下一首 ↗');
  document.querySelectorAll('.lane').forEach((b,i)=>b.ariaLabel=tr(`Lane ${i+1}, ${LANES[i]}`,`第 ${i+1} 轨，${LANES[i]} 键`));
  updateSongInfo();renderPhase();updateStats();
}
function updateSongInfo(){
  $('#difficulty').textContent='● '.repeat(SONGS[songIndex].level)+'○ '.repeat(3-SONGS[songIndex].level);$('#notes-count').textContent=String(chart.notes.length);
  $('#pace').textContent=`${Math.round(SONGS[songIndex].bpm*chart.speed)} BPM${practice?tr(' · PRACTICE',' · 练习'):''}`;
  const best=prefs.best[SONGS[songIndex].id];$('#best').textContent=best?`${best.score.toLocaleString()} · ${best.accuracy.toFixed(1)}%`:tr('Be the first to light this street.','来点亮这条小街的第一个纪录。');
}
function renderPhase(){
  $('#state-badge').textContent=tr({ready:'READY',starting:'LOADING',playing:'LIVE',paused:'PAUSED',finished:'ENCORE'}[phase],{ready:'待开场',starting:'准备中',playing:'演奏中',paused:'已暂停',finished:'谢幕'}[phase]);
  $('#state-badge').style.color=phase==='playing'?'#c9ba88':'';
  const button={ready:tr('Start the parade','开始巡游'),starting:tr('Tuning up…','准备中…'),playing:tr('Pause','暂停'),paused:tr('Resume the parade','继续巡游'),finished:tr('Play again','再来一曲')}[phase];
  $('#start').innerHTML=`${button}<span>${phase==='playing'?'Ⅱ':'↗'}</span>`;$('#start').disabled=phase==='starting';
  $('#song-select').disabled=phase==='playing'||phase==='starting';$('#practice').disabled=phase==='playing'||phase==='starting';
  $('#center-message').classList.toggle('quiet',phase==='playing');
  const head=phase==='paused'?tr('We’ll keep your place.','我们等你回来。'):phase==='finished'?tr('A lovely little encore?','再来一段小小的返场？'):phase==='starting'?tr('One little moment…','准备开场……'):tr('A little monster music.','来一段怪物小合奏。');
  $('#welcome-title').textContent=head;$('#welcome-copy').innerHTML=phase==='paused'?tr('Press Resume whenever you’re ready.','准备好了，就点「继续巡游」。'):phase==='finished'?tr('Choose another song, or chase your best score.','选另一首曲目，或挑战自己的最好成绩。'):tr('Tap when the lanterns reach the line.<br>D &nbsp; F &nbsp; J &nbsp; K — or the four buttons below.','音符落到金线时，轻轻按下。<br>D &nbsp; F &nbsp; J &nbsp; K，或下方四个小怪物。');
  $('#playfield').dataset.phase=phase;$('#playfield').dataset.song=SONGS[songIndex].id;
}
function updateStats(){
  $('#score').textContent=run.score.toLocaleString();$('#combo').textContent=String(run.combo);$('#accuracy').textContent=run.judged?`${accuracy(run).toFixed(1)}%`:'—';
  $('#clock').textContent=`${timeLabel(currentTime)} / ${timeLabel(chart.duration)}`;$('#progress').style.width=`${Math.min(100,currentTime/chart.duration*100)}%`;
  $('#fever').hidden=run.combo<20;$('#fever').textContent=tr('✦ LANTERN FEVER ✦','✦ 灯火连击 ✦');
  $('#playfield').dataset.judged=String(run.judged);$('#playfield').dataset.notes=String(chart.notes.length);
}
function prepare(){
  startRequest++;audio.reset();phase='ready';chart=buildChart(songIndex,practice);run=newRun(chart);currentTime=0;activeKeys.clear();pressed.fill(0);
  document.querySelectorAll('.lane').forEach(b=>b.classList.remove('active'));$('#judgement').classList.remove('show');$('#result-dialog').close();
  $('#song-select').value=String(songIndex);$('#practice').setAttribute('aria-pressed',String(practice));updateSongInfo();renderPhase();updateStats();
}
async function play(){
  if(phase==='playing'){pause();return;}if(phase==='starting')return;
  if(phase==='finished')prepare();
  const position=phase==='paused'?audio.position:0,request=++startRequest;phase='starting';renderPhase();
  try{
    audio.setVolume(prefs.sound?.7:0);const ok=await audio.start(chart.events,position);
    if(request!==startRequest||!ok)return;
    if(document.hidden){pause();return;}
    phase='playing';renderPhase();$('#screen-status').textContent=tr('The parade has started.','巡游开始了。');
  }catch{if(request!==startRequest)return;phase='ready';renderPhase();toast(tr('Audio could not start. Tap Start again, or try another browser.','声音未能启动。请再点一次开始，或换个浏览器。'));}
}
function pause(){
  if(!['playing','starting'].includes(phase))return;startRequest++;currentTime=audio.pause();phase='paused';renderPhase();updateStats();
}
function finish(){
  audio.pause();currentTime=chart.duration;phase='finished';run.finished=true;renderPhase();updateStats();
  const a=accuracy(run,true),id=SONGS[songIndex].id;
  if(!practice&&(!prefs.best[id]||run.score>prefs.best[id].score)){prefs.best[id]={score:run.score,accuracy:a};persist();updateSongInfo();}
  $('#result-kicker').textContent=practice?tr('A LITTLE REHEARSAL','一次小小的排练'):tr('THE STREET IS YOURS','今夜的长街属于你');$('#result-grade').textContent=grade(run);$('#result-title').textContent=tr('What a lovely night.','这一晚，真好听。');$('#result-song').textContent=lang==='zh'?SONGS[songIndex].zh:SONGS[songIndex].en;
  $('#result-stats').innerHTML=`<div><b>${run.score.toLocaleString()}</b><span>${tr('SCORE','得分')}</span></div><div><b>${a.toFixed(1)}%</b><span>${tr('ACCURACY','准确率')}</span></div><div><b>${run.maxCombo}</b><span>${tr('BEST COMBO','最高连击')}</span></div>`;
  $('#result-breakdown').innerHTML=[['perfect',tr('Perfect','完美')],['good',tr('Good','很好')],['okay',tr('Okay','命中')],['miss',tr('Miss','漏过')]].map(([k,l])=>`<span>${l} <b>${run.counts[k]}</b></span>`).join('');
  $('#result-practice').hidden=!practice;$('#result-practice').textContent=tr('Practice performances do not replace your stage record.','练习成绩不会替换正式演出纪录。');$('#result-dialog').showModal();$('#screen-status').textContent=tr(`Song complete. Accuracy ${a.toFixed(1)} percent.`,`演出结束，准确率 ${a.toFixed(1)}%。`);
}
function flash(result){
  if(!result)return;const label={perfect:tr('Perfect','完美'),good:tr('Lovely','很好'),okay:tr('Got it','命中'),miss:tr('Find the beat','找回节拍')}[result.kind];
  $('#judgement').textContent=label;$('#judgement').className=`judgement show${result.kind==='miss'?' miss':''}`;lastJudgement=performance.now();
}
function hit(lane){
  if(phase!=='playing')return;pressed[lane]=performance.now()+130;
  const result=hitLane(run,lane,audio.now()-prefs.offset/1000);if(result){flash(result);updateStats();}
}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2800);}
function openDialog(id){pause();$(id).showModal();}
$('#start').addEventListener('click',play);$('#restart').addEventListener('click',prepare);
$('#song-select').addEventListener('change',e=>{const value=Number(e.target.value);if(Number.isInteger(value)&&value>=0&&value<SONGS.length){songIndex=value;prepare();}});
$('#practice').addEventListener('click',()=>{practice=!practice;prepare();});
$('#language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';persist();renderText();});
$('#sound').addEventListener('click',()=>{prefs.sound=!prefs.sound;audio.setVolume(prefs.sound?.7:0);persist();renderText();});
$('#help').addEventListener('click',()=>openDialog('#help-dialog'));$('#settings').addEventListener('click',()=>openDialog('#settings-dialog'));
$('#offset').addEventListener('input',e=>{prefs.offset=Math.max(-150,Math.min(150,Math.round(Number(e.target.value)||0)));$('#offset-value').textContent=`${prefs.offset>0?'+':''}${prefs.offset} ms`;persist();});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$('#play-again').addEventListener('click',()=>{prepare();play();});$('#next-song').addEventListener('click',()=>{songIndex=(songIndex+1)%SONGS.length;prepare();});
$('#share').addEventListener('click',()=>{const u=new URL(location.href);u.hash=new URLSearchParams({song:SONGS[songIndex].id,...(practice?{practice:'1'}:{})}).toString();$('#share-link').value=u.href;openDialog('#share-dialog');});
$('#copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#share-link').value);toast(tr('Link copied.','链接已复制。'));}catch{$('#share-link').focus();$('#share-link').select();toast(tr('Select and copy the link.','请选中并复制链接。'));}});
document.querySelectorAll('.lane').forEach((b,i)=>{
  b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);b.classList.add('active');hit(i);});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>b.classList.remove('active'));
  b.addEventListener('click',e=>{if(e.detail===0)hit(i);});
});
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName))return;
  const key=e.key.toUpperCase(),i=LANES.indexOf(key);
  if(i!==-1){e.preventDefault();if(e.repeat||activeKeys.has(key))return;activeKeys.add(key);document.querySelector(`[data-lane="${i}"]`).classList.add('active');hit(i);}
  else if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();if(!e.repeat)play();}
});
document.addEventListener('keyup',e=>{const key=e.key.toUpperCase(),i=LANES.indexOf(key);activeKeys.delete(key);if(i!==-1)document.querySelector(`[data-lane="${i}"]`).classList.remove('active');});
window.addEventListener('blur',()=>{activeKeys.clear();document.querySelectorAll('.lane').forEach(b=>b.classList.remove('active'));});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('pagehide',()=>{startRequest++;audio.pause();cancelAnimationFrame(frame);});
window.addEventListener('pageshow',e=>{if(e.persisted){phase='paused';renderPhase();frame=requestAnimationFrame(tick);}});

function resize(){const r=canvas.getBoundingClientRect();width=Math.max(1,r.width);height=Math.max(1,r.height);dpr=Math.min(2,devicePixelRatio||1);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
new ResizeObserver(resize).observe(canvas);resize();
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function note(lane,x,y,size,alpha=1){
  ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.fillStyle=colors[lane];ctx.shadowBlur=10;ctx.shadowColor=colors[lane]+'66';
  if(lane===0){ctx.beginPath();ctx.ellipse(0,0,size*.7,size*.55,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#765442';ctx.beginPath();ctx.moveTo(-size*.36,-size*.1);ctx.lineTo(-size*.12,-size*.23);ctx.lineTo(-size*.12,size*.04);ctx.fill();ctx.beginPath();ctx.moveTo(size*.36,-size*.1);ctx.lineTo(size*.12,-size*.23);ctx.lineTo(size*.12,size*.04);ctx.fill();ctx.strokeStyle='#9fa279';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-size*.5);ctx.quadraticCurveTo(-2,-size*.8,2,-size*.8);ctx.stroke();}
  else if(lane===1){ctx.beginPath();ctx.moveTo(-size*.68,-size*.26);ctx.lineTo(-size*.25,-size*.1);ctx.lineTo(0,-size*.52);ctx.lineTo(size*.25,-size*.1);ctx.lineTo(size*.68,-size*.26);ctx.lineTo(size*.45,size*.4);ctx.lineTo(0,size*.28);ctx.lineTo(-size*.45,size*.4);ctx.closePath();ctx.fill();}
  else if(lane===2){ctx.beginPath();ctx.moveTo(-size*.48,size*.42);ctx.lineTo(-size*.44,-size*.1);ctx.quadraticCurveTo(-size*.44,-size*.6,0,-size*.6);ctx.quadraticCurveTo(size*.44,-size*.6,size*.44,-size*.1);ctx.lineTo(size*.48,size*.42);ctx.lineTo(size*.22,size*.27);ctx.lineTo(0,size*.48);ctx.lineTo(-size*.22,size*.27);ctx.closePath();ctx.fill();ctx.fillStyle='#4b6a70';ctx.shadowBlur=0;ctx.beginPath();ctx.ellipse(-size*.16,-size*.07,size*.055,size*.09,0,0,Math.PI*2);ctx.ellipse(size*.16,-size*.07,size*.055,size*.09,0,0,Math.PI*2);ctx.fill();}
  else{ctx.beginPath();ctx.moveTo(0,-size*.65);ctx.lineTo(size*.5,0);ctx.lineTo(0,size*.65);ctx.lineTo(-size*.5,0);ctx.closePath();ctx.fill();ctx.strokeStyle='#f4d6e080';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-size*.45);ctx.lineTo(0,size*.45);ctx.moveTo(-size*.3,0);ctx.lineTo(size*.3,0);ctx.stroke();}
  ctx.restore();
}
function drawTrack(time,stamp){
  if(!ctx||width<1||height<1)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const bg=ctx.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#282b44');bg.addColorStop(.7,'#25283c');bg.addColorStop(1,'#303248');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
  const hitY=height*.84,topY=height*.05,topW=width*.53,bottomW=width*.9;
  const moonX=width*.83,moonY=height*.2,moonR=Math.min(26,height*.15);ctx.fillStyle='#d9d8bb20';ctx.beginPath();ctx.arc(moonX,moonY,moonR,0,Math.PI*2);ctx.fill();ctx.fillStyle='#282b44';ctx.beginPath();ctx.arc(moonX+moonR*.43,moonY-moonR*.18,moonR*.89,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#d0c4b044';for(let i=0;i<21;i++){const x=((i*83+27)%997)/997*width,y=((i*53+13)%137)/137*height*.7;ctx.beginPath();ctx.arc(x,y,i%4===0?1.2:.7,0,Math.PI*2);ctx.fill();}
  for(let lane=0;lane<4;lane++){
    const a=width/2-topW/2+lane*topW/4,b=width/2-bottomW/2+lane*bottomW/4;
    ctx.fillStyle=lane%2?'#0e142319':'#0e142337';ctx.beginPath();ctx.moveTo(a,topY);ctx.lineTo(a+topW/4,topY);ctx.lineTo(b+bottomW/4,height);ctx.lineTo(b,height);ctx.closePath();ctx.fill();
    if(pressed[lane]>stamp){const flash=ctx.createLinearGradient(0,hitY,0,height*.2);flash.addColorStop(0,colors[lane]+'36');flash.addColorStop(1,colors[lane]+'00');ctx.fillStyle=flash;ctx.fill();}
  }
  ctx.strokeStyle='#adabce16';ctx.lineWidth=1;
  for(let lane=0;lane<=4;lane++){ctx.beginPath();ctx.moveTo(width/2-topW/2+lane*topW/4,topY);ctx.lineTo(width/2-bottomW/2+lane*bottomW/4,height);ctx.stroke();}
  const atY=y=>topW+(bottomW-topW)*(y-topY)/(height-topY);
  const xAt=(lane,y)=>width/2-atY(y)/2+(lane+.5)*atY(y)/4;
  // A subtle bar grid shares exactly the song's clock, even after pausing.
  const spacing=chart.beat*2;for(let beat=Math.floor(time/spacing)-1;beat<time/spacing+5;beat++){const dt=beat*spacing-time,y=hitY-dt/2.15*(hitY-topY);if(y<topY||y>height)continue;const w=atY(y);ctx.strokeStyle='#d4cfdf0b';ctx.beginPath();ctx.moveTo(width/2-w/2,y);ctx.lineTo(width/2+w/2,y);ctx.stroke();}
  const hitW=atY(hitY);ctx.strokeStyle=run.combo>=20?'#f8d28f99':'#e2c4935c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(width/2-hitW/2,hitY);ctx.lineTo(width/2+hitW/2,hitY);ctx.stroke();
  for(let i=0;i<4;i++){const x=xAt(i,hitY),r=Math.min(19,width*.035,height*.09);ctx.strokeStyle=pressed[i]>stamp?colors[i]:'#b6accd44';ctx.lineWidth=pressed[i]>stamp?2:1;ctx.beginPath();ctx.ellipse(x,hitY,r*1.15,r*.64,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle=colors[i]+'24';ctx.fill();}
  const shown=phase==='ready'?[{lane:0,time:.5},{lane:1,time:1},{lane:2,time:1.5},{lane:3,time:1.9}]:chart.notes;
  for(const n of shown){if(phase!=='ready'&&run.status[n.id])continue;const dt=n.time-time;if(dt>2.15||dt<-.25)continue;const y=hitY-dt/2.15*(hitY-topY),size=Math.max(7,Math.min(width*.039,height*.105))*(.58+.42*(y-topY)/(hitY-topY));note(n.lane,xAt(n.lane,y),y,size,phase==='ready'?.23:Math.min(1,(2.15-dt)*3));}
  if(phase==='playing'&&time<chart.lead){const remaining=Math.ceil((chart.lead-time)/chart.beat);ctx.textAlign='center';ctx.fillStyle='#e9cf9c';ctx.font=`${Math.min(38,height*.22)}px Georgia`;ctx.fillText(String(Math.max(1,remaining)),width/2,height*.43);}
}
function tick(stamp){
  frame=requestAnimationFrame(tick);if(document.hidden)return;
  if(phase==='playing'){
    currentTime=audio.now();const missed=advanceRun(run,currentTime-prefs.offset/1000);if(missed.length)flash(missed.at(-1));
    if(run.finished){finish();}
  }
  if(stamp-lastStats>90){updateStats();lastStats=stamp;}
  if(stamp-lastJudgement>520)$('#judgement').classList.remove('show');
  // Canvas keeps the target perfectly aligned with the audio transport.
  if(stamp-lastFrame>1000/45){drawTrack(Math.max(0,currentTime-prefs.offset/1000),stamp);lastFrame=stamp;}
}
renderText();frame=requestAnimationFrame(tick);
