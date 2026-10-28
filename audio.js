import {lowerBound} from './core.js';

const hz=n=>440*2**((n-69)/12);
export class ParadeAudio {
  constructor(){this.ctx=null;this.playing=false;this.position=0;this.events=[];this.next=0;this.epoch=0;this.sources=new Set();this.volume=.7;this.onError=()=>{};}
  async ready(){
    if(!this.ctx){
      const AC=globalThis.AudioContext||globalThis.webkitAudioContext;
      if(!AC)throw new Error('Web Audio is unavailable.');
      const c=this.ctx=new AC();this.master=c.createGain();this.master.gain.value=this.volume*.75;
      c.onstatechange=()=>{if(this.playing&&c.state!=='running')this.onInterrupted?.();};
      const comp=c.createDynamicsCompressor();comp.threshold.value=-18;comp.knee.value=20;comp.ratio.value=4;comp.attack.value=.005;comp.release.value=.2;
      this.master.connect(comp);comp.connect(c.destination);
      this.noise=c.createBuffer(1,c.sampleRate*.3,c.sampleRate);const data=this.noise.getChannelData(0);
      // A deterministic noise buffer keeps the same timbre across restarts.
      let s=419;for(let i=0;i<data.length;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;data[i]=(s/4294967296)*2-1;}
    }
    if(this.ctx.state!=='running')await this.ctx.resume();return this.ctx;
  }
  setVolume(value){this.volume=Math.max(0,Math.min(1,Number(value)||0));if(this.master)this.master.gain.setTargetAtTime(this.volume*.75,this.ctx.currentTime,.015);}
  now(){return this.playing?Math.max(0,this.ctx.currentTime-this.origin):this.position;}
  async start(events,position=0){
    this.stopSources();clearInterval(this.timer);this.playing=false;
    const epoch=++this.epoch;await this.ready();if(epoch!==this.epoch)return false;
    this.events=events;this.position=Math.max(0,position);this.origin=this.ctx.currentTime+.06-this.position;
    this.next=lowerBound(events,this.position-.0001);this.playing=true;this.schedule();
    this.timer=setInterval(()=>this.schedule(),25);return true;
  }
  pause(){this.epoch++;if(this.playing)this.position=this.now();this.playing=false;clearInterval(this.timer);this.timer=null;this.stopSources();return this.position;}
  reset(){this.pause();this.position=0;this.next=0;}
  stopSources(){if(!this.ctx)return;for(const s of this.sources){try{s.stop(this.ctx.currentTime);}catch{}}this.sources.clear();}
  schedule(){
    if(!this.playing||this.ctx.state!=='running')return;
    const now=this.ctx.currentTime,position=now-this.origin;
    // Skip a suspended tab's entire backlog before entering a bounded lookahead.
    this.next=Math.max(this.next,lowerBound(this.events,position+.004));
    while(this.next<this.events.length && this.origin+this.events[this.next].time<now+.15){
      const e=this.events[this.next++];this.sound(e,this.origin+e.time);
    }
  }
  track(source){this.sources.add(source);source.onended=()=>{this.sources.delete(source);try{source.disconnect();}catch{}};return source;}
  tone(type,pitch,time,duration,volume,attack=.008){
    const c=this.ctx,o=this.track(c.createOscillator()),g=c.createGain();o.type=type;o.frequency.value=hz(pitch);
    g.gain.setValueAtTime(.0001,time);g.gain.exponentialRampToValueAtTime(Math.max(.001,volume),time+attack);g.gain.exponentialRampToValueAtTime(.0001,time+duration);
    o.connect(g);g.connect(this.master);o.start(time);o.stop(time+duration+.03);return o;
  }
  hiss(time,duration,volume,frequency){
    const c=this.ctx,s=this.track(c.createBufferSource()),g=c.createGain(),f=c.createBiquadFilter();s.buffer=this.noise;f.type='highpass';f.frequency.value=frequency;
    g.gain.setValueAtTime(volume,time);g.gain.exponentialRampToValueAtTime(.0001,time+duration);s.connect(f);f.connect(g);g.connect(this.master);s.start(time);s.stop(time+duration+.01);
  }
  sound(e,time){
    const v=e.velocity||.1;
    if(e.type==='kick'){const o=this.tone('sine',48,time,.22,v);o.frequency.setValueAtTime(135,time);o.frequency.exponentialRampToValueAtTime(42,time+.14);}
    if(e.type==='snap'){this.hiss(time,.09,v,1700);this.tone('triangle',58,time,.07,v*.4);}
    if(e.type==='hat')this.hiss(time,.035,v,7000);
    if(e.type==='bass')this.tone('triangle',e.pitch,time,e.duration,v,.015);
    if(e.type==='bell'){this.tone('triangle',e.pitch,time,e.duration,v);this.tone('sine',e.pitch+12,time,.14,v*.16);}
    if(e.type==='pad'){[0,3,7].forEach(n=>this.tone('sine',e.pitch+n,time,e.duration,v,.18));}
    if(e.type==='click')this.tone('sine',e.pitch,time,.05,v,.003);
  }
}
