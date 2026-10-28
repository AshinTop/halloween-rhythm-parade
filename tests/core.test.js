import test from 'node:test';
import assert from 'node:assert/strict';
import {SONGS,buildChart,newRun,hitLane,advanceRun,accuracy,grade,cleanPreferences,selectFromHash,lowerBound} from '../core.js';

test('all three original charts have ordered unique lane events and bounded complete songs',()=>{
  const counts=[70,133,168];
  for(let i=0;i<SONGS.length;i++){
    const chart=buildChart(i);assert.equal(chart.notes.length,counts[i]);assert.ok(chart.duration>45&&chart.duration<55);assert.ok(chart.events.length<800);
    const seen=new Set();for(let n=0;n<chart.notes.length;n++){const note=chart.notes[n];assert.ok(note.lane>=0&&note.lane<4);assert.ok(note.time>=chart.lead&&note.time<chart.duration-1);assert.ok(n===0||chart.notes[n-1].time<=note.time);const key=note.lane+':'+note.time;assert.ok(!seen.has(key));seen.add(key);}
  }
});

test('a real all-note playthrough finishes every song at full accuracy, including chords',()=>{
  for(let i=0;i<3;i++){const chart=buildChart(i),run=newRun(chart);for(const n of chart.notes){assert.equal(hitLane(run,n.lane,n.time)?.kind,'perfect');}advanceRun(run,chart.duration+.2);assert.equal(run.finished,true);assert.equal(run.counts.perfect,chart.notes.length);assert.equal(run.counts.miss,0);assert.equal(run.maxCombo,chart.notes.length);assert.equal(accuracy(run,true),100);assert.equal(grade(run),'S+');}
});

test('judgement windows, wrong lanes and repeat hits cannot manufacture score',()=>{
  const chart=buildChart(0),n=chart.notes[0];
  for(const [offset,expected] of [[0,'perfect'],[.055,'perfect'],[-.055,'perfect'],[.06,'good'],[.115,'good'],[-.115,'good'],[.12,'okay'],[.18,'okay'],[-.18,'okay']]){const run=newRun(chart);assert.equal(hitLane(run,n.lane,n.time+offset)?.kind,expected);const score=run.score;assert.equal(hitLane(run,n.lane,n.time+offset),null);assert.equal(run.score,score);}
  const run=newRun(chart);assert.equal(hitLane(run,(n.lane+1)%4,n.time),null);assert.equal(hitLane(run,n.lane,n.time-.181),null);assert.equal(run.score,0);
});

test('late notes become misses once, reset combo, and never end a song early',()=>{
  const chart=buildChart(0),run=newRun(chart);hitLane(run,chart.notes[0].lane,chart.notes[0].time);assert.equal(run.combo,1);
  advanceRun(run,chart.notes[1].time+.181);assert.equal(run.counts.miss,1);assert.equal(run.combo,0);assert.equal(run.finished,false);advanceRun(run,chart.notes[1].time+.3);assert.equal(run.counts.miss,1);
  advanceRun(run,chart.duration+1);assert.equal(run.judged,chart.notes.length);assert.equal(run.counts.miss,chart.notes.length-1);assert.equal(run.finished,true);
});

test('75 percent practice scales chart and audio together, without changing the note sequence',()=>{
  for(let i=0;i<3;i++){const normal=buildChart(i),practice=buildChart(i,true);assert.equal(practice.notes.length,normal.notes.length);for(let n=0;n<normal.notes.length;n++){assert.equal(practice.notes[n].lane,normal.notes[n].lane);assert.ok(Math.abs(practice.notes[n].time-normal.notes[n].time/.75)<1e-10);}assert.ok(Math.abs((practice.duration-1)-(normal.duration-1)/.75)<1e-10);}
});

test('malformed preferences and share parameters fall back safely',()=>{
  for(const bad of [null,undefined,7,'bad',[],true])assert.deepEqual(cleanPreferences(bad),{lang:'en',sound:true,offset:0,best:{}});
  const p=cleanPreferences({lang:'xx',offset:999,sound:false,best:{'lantern-walk':{score:-4,accuracy:200},'velvet-wings':{score:1200,accuracy:75}}});assert.equal(p.offset,150);assert.deepEqual(Object.keys(p.best),['velvet-wings']);assert.equal(p.sound,false);
  assert.deepEqual(selectFromHash('#song=velvet-wings&practice=1'),{songIndex:1,practice:true});assert.deepEqual(selectFromHash('#song=1.5&practice=true'),{songIndex:0,practice:false});
});

test('binary event seeking finds future notes across the entire chart',()=>{
  const events=buildChart(2).events;for(const time of [-5,0,1,12.3,48,999]){const i=lowerBound(events,time);assert.ok(i===events.length||events[i].time>=time);assert.ok(i===0||events[i-1].time<time);}
});
