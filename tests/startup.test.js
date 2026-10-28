import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

test('an obsolete rejected audio start cannot overwrite a newer successful performance',async()=>{
  // Exercise the actual UI transport functions with only their DOM/audio ports stubbed.
  const source=readFileSync(new URL('../app.js',import.meta.url),'utf8');
  const code=source.slice(source.indexOf('function prepare(){'),source.indexOf('function pause(){'));
  let rejectOld,starts=0;const elements=new Map();
  const $=id=>{if(!elements.has(id))elements.set(id,{close(){},classList:{remove(){}},setAttribute(){}});return elements.get(id);};
  const context=vm.createContext({$,document:{hidden:false,querySelectorAll(){return[];}},audio:{position:0,reset(){},setVolume(){},start(){return ++starts===1?new Promise((_,reject)=>{rejectOld=reject;}):Promise.resolve(true);}},buildChart:()=>({events:[]}),newRun:()=>({}),updateSongInfo(){},renderPhase(){},updateStats(){},toast(){},tr:a=>a,phase:'ready',startRequest:0,songIndex:0,practice:false,prefs:{sound:true},chart:{events:[]},run:{},currentTime:0,activeKeys:new Set(),pressed:[0,0,0,0]});
  vm.runInContext(code,context);const old=context.play();context.prepare();await context.play();assert.equal(context.phase,'playing');rejectOld(new Error('Late rejection from the old start'));await old;assert.equal(context.phase,'playing');
});
