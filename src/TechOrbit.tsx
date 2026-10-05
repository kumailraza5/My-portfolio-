'use client';
import {useEffect,useRef,type CSSProperties} from 'react';
import {BrandLogo} from './Technology';

const rings = [
  [{name:'React',color:'#61dafb'},{name:'Shopify',color:'#95bf47'},{name:'Supabase',color:'#3ecf8e'},{name:'PostgreSQL',color:'#6397bf'}],
  [{name:'Node.js',color:'#68a063'},{name:'MongoDB',color:'#47a248'},{name:'TypeScript',color:'#3178c6'},{name:'Firebase',color:'#ffca28'}]
];

export default function TechOrbit({motion}:{motion:boolean}) {
  const root=useRef<HTMLDivElement>(null);
  const canvas=useRef<HTMLCanvasElement>(null);
  const icons=useRef<(HTMLDivElement|null)[]>([]);

  useEffect(()=>{
    const host=root.current, surface=canvas.current;
    if(!host||!surface)return;
    const ctx=surface.getContext('2d');
    if(!ctx)return;
    let width=0,height=0,frame=0,time=0,last=0,inView=true;
    function project(angle:number,ring:number) {
      const radius=width*.43*(ring===0?1:.84);
      const tilt=ring===0?.42:-.294+Math.sin(time*.3)*.08;
      const x=Math.cos(angle)*radius;
      const y=-Math.sin(angle)*radius*Math.sin(tilt);
      const z=Math.sin(angle)*radius*Math.cos(tilt);
      const scale=1-z/Math.max(width*5,1800);
      return {x:width*.5+x*scale,y:height*.40+y*scale,z,scale};
    }
    function draw() {
      if(!ctx)return;
      ctx.clearRect(0,0,width,height);
      rings.forEach((ring,r)=>{
        const rotation=r===0?time*.28:-time*.18+Math.PI/3;
        ctx.beginPath();
        for(let i=0;i<=128;i++){
          const p=project(i/128*Math.PI*2,r);
          if(!i)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle=r===0?'rgba(200,244,122,.22)':'rgba(97,218,251,.19)';
        ctx.lineWidth=1;ctx.stroke();
        ring.forEach((_,i)=>{
          const el=icons.current[r*4+i];if(!el)return;
          const p=project(i/ring.length*Math.PI*2+rotation,r);
          el.style.transform=`translate(-50%,-50%) translate(${p.x}px,${p.y}px) scale(${p.scale})`;
          el.style.zIndex='1';
          el.style.opacity=p.z<0?'1':'.72';
        });
      });
    }
    function tick(now:number) {
      time+=last?Math.min((now-last)/1000,.05):0;last=now;
      draw();frame=requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);last=0;draw();
      if(motion&&inView&&!document.hidden)frame=requestAnimationFrame(tick);
    }
    const resize=new ResizeObserver(()=>{
      width=host.clientWidth;height=host.clientHeight;
      const ratio=Math.min(window.devicePixelRatio||1,2);
      surface.width=width*ratio;surface.height=height*ratio;
      ctx.setTransform(ratio,0,0,ratio,0,0);draw();
    });resize.observe(host);
    const observer=new IntersectionObserver(([e])=>{inView=e.isIntersecting;sync();},{threshold:.01});observer.observe(host);
    document.addEventListener('visibilitychange',sync);sync();
    return()=>{cancelAnimationFrame(frame);resize.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',sync);};
  },[motion]);

  return <div className="tech-orbits" ref={root} aria-hidden="true">
    <canvas className="orbit-paths" ref={canvas}/>
    {rings.flat().map((tech,i)=><div key={tech.name} ref={el=>{icons.current[i]=el;}} className="orbit-logo" title={tech.name} style={{'--brand-glow':tech.color} as CSSProperties}><BrandLogo name={tech.name}/></div>)}
  </div>;
}
