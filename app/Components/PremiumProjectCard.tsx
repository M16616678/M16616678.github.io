"use client";
import React,{useRef} from "react";
type Accent="gold"|"cyan"|"violet"|"blue";
const palettes:Record<Accent,{accent:string;glow:string}>={
 gold:{accent:"#e8bc73",glow:"rgba(232,188,115,.25)"},
 cyan:{accent:"#69d9e9",glow:"rgba(105,217,233,.24)"},
 violet:{accent:"#ba9aff",glow:"rgba(186,154,255,.24)"},
 blue:{accent:"#7cb9ff",glow:"rgba(124,185,255,.24)"}
};
export default function PremiumProjectCard({children,accent="gold",featured=false}:{children:React.ReactNode;accent?:Accent;featured?:boolean}){
 const ref=useRef<HTMLElement>(null);
 const palette=palettes[accent];
 const update=(event:React.PointerEvent<HTMLElement>)=>{
  if(event.pointerType!=="mouse"||!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches)return;
  const el=ref.current;if(!el)return;
  const rect=el.getBoundingClientRect();
  const x=Math.min(1,Math.max(0,(event.clientX-rect.left)/rect.width));
  const y=Math.min(1,Math.max(0,(event.clientY-rect.top)/rect.height));
  el.style.setProperty("--tilt-x",`${(0.5-y)*6}deg`);
  el.style.setProperty("--tilt-y",`${(x-0.5)*6}deg`);
  el.style.setProperty("--pointer-x",`${x*100}%`);
  el.style.setProperty("--pointer-y",`${y*100}%`);
 };
 const reset=()=>{const el=ref.current;if(!el)return;el.style.setProperty("--tilt-x","0deg");el.style.setProperty("--tilt-y","0deg");};
 return <article ref={ref} onPointerMove={update} onPointerLeave={reset} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))reset()}}
  style={{"--accent":palette.accent,"--glow":palette.glow} as React.CSSProperties}
  className={`premium-project-card relative flex min-w-0 flex-col overflow-hidden rounded-2xl border p-5 text-white ${featured?"premium-project-featured":""}`}>
   <div aria-hidden="true" className="premium-project-shine pointer-events-none absolute inset-0"/>
   <div className="premium-project-content relative flex flex-1 flex-col">{children}</div>
 </article>;
}
