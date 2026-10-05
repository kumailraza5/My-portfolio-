'use client';

import {useEffect,useRef,useState} from 'react';
import {Play,Square,LoaderCircle} from 'lucide-react';

export default function HeroPortrait({src}:{src?:string}) {
  const video=useRef<HTMLVideoElement>(null);
  const request=useRef(0);
  const initialAttempted=useRef(false);
  const [phase,setPhase]=useState<'idle'|'loading'|'playing'>('idle');
  const [error,setError]=useState('');

  function stop() {
    initialAttempted.current=true;
    request.current++;
    const el=video.current;
    if(el){el.pause();el.muted=true;}
    setPhase('idle');
  }

  useEffect(()=>{
    const el=video.current;
    if(!el)return;
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)stop();
    },{threshold:.1});
    observer.observe(el);
    const hide=()=>{if(document.hidden)stop();};
    document.addEventListener('visibilitychange',hide);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',hide);request.current++;el.pause();};
  },[src]);

  useEffect(()=>{
    let frame=0;
    const attempt=()=>{
      frame=requestAnimationFrame(()=>{
        const el=video.current;
        if(!el||initialAttempted.current||document.hidden)return;
        const bounds=el.getBoundingClientRect();
        if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;
        void startIntro(true);
      });
    };
    if(document.readyState==='complete')attempt();
    else window.addEventListener('load',attempt,{once:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('load',attempt);};
  },[src]);

  async function startIntro(automatic=false) {
    initialAttempted.current=true;
    const el=video.current;
    if(!el)return;
    const id=++request.current;
    setError('');setPhase('loading');
    if(el.error)el.load();
    el.currentTime=0;el.muted=false;el.volume=1;
    try {
      // The initial attempt may be rejected by the browser. Manual replay stays available.
      await el.play();
      if(id!==request.current)return;
      setPhase('playing');
    } catch (reason) {
      if(id!==request.current)return;
      stop();
      const blocked=reason instanceof DOMException&&reason.name==='NotAllowedError';
      if(!automatic||!blocked)setError('Could not play the intro. Tap to try again.');
    }
  }

  function toggleIntro() {
    if(phase!=='idle'){stop();return;}
    void startIntro();
  }

  return <>
    <div className="portrait-depth">
      <img src="/portrait.png" alt="Kumail Raza seated in a chair" fetchPriority="high" className={`portrait-poster ${phase==='playing'?'hidden':''}`}/>
      {src&&<video ref={video} src={src} className={`portrait-video ${phase==='playing'?'ready':''}`} poster="/portrait.png" playsInline preload="none" aria-label="Kumail Raza’s spoken introduction" onEnded={stop} onError={()=>{stop();setError('Could not load the intro. Tap to retry.');}}/>}
    </div>
    {src&&<div className="intro-controls">
      <button className="intro-play" onClick={toggleIntro} aria-label={phase==='idle'?'Play introduction with voice':phase==='loading'?'Cancel loading introduction':'Stop introduction'} title={phase==='idle'?'Play my introduction':'Stop introduction'} aria-pressed={phase!=='idle'}>
        {phase==='loading'?<LoaderCircle className="intro-loading" size={22}/>:phase==='playing'?<Square size={18}/>:<Play size={22}/>}
      </button>
      <span className="intro-error" role="status">{error}</span>
    </div>}
  </>;
}
