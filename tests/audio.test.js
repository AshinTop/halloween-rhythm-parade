import test from 'node:test';
import assert from 'node:assert/strict';
import {ParadeAudio} from '../audio.js';
import {buildChart} from '../core.js';

function fixture(){const audio=new ParadeAudio(),calls=[];audio.ctx={currentTime:100,state:'running'};audio.sound=(event,time)=>calls.push({event,time});return {audio,calls};}

test('the audio transport schedules only inside a small future window',async()=>{
  const {audio,calls}=fixture();await audio.start(buildChart(0).events);assert.ok(calls.length>0);assert.ok(calls.every(c=>c.time>=100&&c.time<100.15));audio.pause();
});

test('a long frozen-tab jump skips stale events instead of replaying the backlog',async()=>{
  const {audio,calls}=fixture();await audio.start(buildChart(2).events);calls.length=0;audio.ctx.currentTime+=37;audio.schedule();assert.ok(calls.length<12);assert.ok(calls.every(c=>c.time>=audio.ctx.currentTime&&c.time<audio.ctx.currentTime+.15));
  audio.ctx.currentTime+=100;audio.schedule();assert.equal(audio.next,audio.events.length);audio.pause();
});

test('pause freezes the song clock and resume rebases the remaining events',async()=>{
  const {audio,calls}=fixture(),events=buildChart(1).events;await audio.start(events);audio.ctx.currentTime+=12;const position=audio.pause();assert.ok(position>11&&position<12);audio.ctx.currentTime+=40;assert.equal(audio.now(),position);calls.length=0;
  await audio.start(events,position);assert.ok(Math.abs(audio.now()-Math.max(0,position-.06))<1e-9);assert.ok(calls.every(c=>c.event.time>=position&&c.time>=audio.ctx.currentTime));audio.pause();
});

test('a pause cancels a pending asynchronous audio start',async()=>{
  const {audio}=fixture();let resolve;audio.ready=()=>new Promise(r=>{resolve=r;});const pending=audio.start(buildChart(0).events);audio.pause();resolve(audio.ctx);assert.equal(await pending,false);assert.equal(audio.playing,false);assert.equal(audio.timer,null);
});

test('pausing stops every queued oscillator and clears the scheduler',async()=>{
  const {audio}=fixture();await audio.start(buildChart(0).events);let stopped=0;audio.sources.add({stop(){stopped++;}});audio.sources.add({stop(){stopped++;}});audio.pause();assert.equal(stopped,2);assert.equal(audio.sources.size,0);assert.equal(audio.playing,false);assert.equal(audio.timer,null);
});
