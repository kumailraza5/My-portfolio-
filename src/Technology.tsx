import {Fragment} from 'react';

const brands: Record<string, {file: string; light?: boolean; png?: boolean}> = {
  react: {file:'react'}, 'node.js': {file:'nodejs'}, mongodb: {file:'mongodb'},
  express: {file:'express',light:true}, firebase: {file:'firebase'}, supabase: {file:'supabase'},
  tailwind: {file:'tailwindcss'}, 'tailwind css': {file:'tailwindcss'}, typescript: {file:'typescript'},
  postgresql: {file:'postgresql'}, javascript: {file:'javascript'}, css: {file:'css3'},
  python: {file:'python'}, flask: {file:'flask',light:true}, mysql: {file:'mysql'},
  wordpress: {file:'wordpress'}, flutter: {file:'flutter'}, flutterflow: {file:'flutterflow'},
  git: {file:'git'}, github: {file:'github',light:true}, vercel: {file:'vercel',light:true},
  java: {file:'java'}, 'framer motion': {file:'framermotion',light:true},
  shopify: {file:'shopify'}, liquid: {file:'liquid',png:true}, render: {file:'render'}, yolo: {file:'yolo'}
};
const pattern = new RegExp('\\b(' + Object.keys(brands).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|') + ')\\b', 'gi');

export function BrandLogo({name, className=''}:{name:string;className?:string}) {
  const brand=brands[name.toLowerCase()];
  return brand ? <img src={`/tech/${brand.file}.${brand.png?'png':'svg'}`} alt="" aria-hidden="true" width="24" height="24" className={`brand-logo ${brand.light?'logo-on-light':''} ${className}`} decoding="async"/> : null;
}

export function TechLabel({name}:{name:string}) {
  return <span className="tech-label"><BrandLogo name={name}/>{name}</span>;
}

export function TechText({text}:{text:string}) {
  return <>{text.split(pattern).map((part,i)=>brands[part.toLowerCase()] ? <TechLabel key={i} name={part}/> : <Fragment key={i}>{part}</Fragment>)}</>;
}
