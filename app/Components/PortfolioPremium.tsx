"use client";
import React,{useMemo,useState} from "react";

type Category="All"|"Government"|"Healthcare"|"Academic"|"AI Evaluation"|"Independent";
const categories:Category[]=["All","Government","Healthcare","Academic","AI Evaluation","Independent"];
const cases=[
 {id:"cfms",name:"CFMS 2.0",org:"Tata Consultancy Services",category:"Government" as Category,years:"2020–2024",description:"Comprehensive Financial Management System 2.0: enterprise financial services software for state government operations.",details:["Payee, Treasury and E-billing application modules","Java and Spring Boot REST services, batch jobs and PostgreSQL","JasperReports, JMeter, Jenkins and Docker release workflows"],tech:["Java","Spring Boot","PostgreSQL","JasperReports"],evidence:null},
 {id:"ibrace",name:"IBrace Healthcare Portal",org:"Innovision LLC",category:"Healthcare" as Category,years:"2026",description:"Web portal for scoliosis care coordination between patients, parents, clinicians and brace providers.",details:["Role-oriented portals and user journeys","Next.js and TypeScript frontend with Python/FastAPI APIs","PostgreSQL/Supabase authentication and storage workflows"],tech:["Next.js","FastAPI","Supabase","TypeScript"],evidence:null},
 {id:"comfit",name:"ComFit / DCAP",org:"Innovision LLC",category:"Healthcare" as Category,years:"2026",description:"Scoliosis-focused AI assistance, evaluation and technical infrastructure work.",details:["RAG and evaluation experimentation","DKIP offline package optimization and project separation","Feedback-loop and chatbot development"],tech:["Python","RAG","RAGAS","AI"],evidence:null},
 {id:"home",name:"Advanced Home Automation",org:"Vignan University",category:"Academic" as Category,years:"2019–2020",description:"Bachelor's engineering project exploring Bluetooth-enabled home automation and device control.",details:["Arduino microcontroller integration","Bluetooth-enabled control concepts","Python-assisted project development"],tech:["Arduino","Python","Bluetooth"],evidence:null},
 {id:"hci",name:"CareerConnect — HCI",org:"University of Cincinnati",category:"Academic" as Category,years:"2024–2025",description:"A usability-driven career guidance concept for university students, presented through personas, task flows and evaluation planning.",details:["Personas and student/counselor user journeys","Task analysis and prototype goals","Planned usability testing and feedback"],tech:["HCI","UX","Research"],evidence:null},
 {id:"hospital",name:"Hospital Check-in System",org:"Software Project",category:"Academic" as Category,years:"Repository",description:"Version-controlled hospital check-in software project.",details:["Java source repository","Potential extension with walkthroughs and test evidence"],tech:["Java","Software"],evidence:"https://github.com/M16616678/Hospital-Check-in-System"},
 {id:"ai",name:"AI Model Quality Evaluation",org:"Handshake AI · Mercor · Appen CrowdGen · Outlier",category:"AI Evaluation" as Category,years:"Contract engagements",description:"Technical AI response assessment across multiple project platforms. Individual client tasks are private.",details:["Technical response and code evaluation","Requirements-based scoring and reasoning assessments where applicable","Documenting quality findings without sharing proprietary instructions"],tech:["AI Quality","Rubrics","Code Review"],evidence:null},
 {id:"arcade",name:"Interactive Game Engineering",org:"Independent",category:"Independent" as Category,years:"2024–2026",description:"16 browser-playable games using TypeScript and Canvas, with a level editor, audio synthesis and mobile input.",details:["Shared canvas game runner with 16 playable examples","Mouse and touch interaction","Web Audio API, level painting and offscreen buffers"],tech:["TypeScript","Canvas","Web Audio","PWA"],evidence:"#library"},
 {id:"automation",name:"AI Workflow Exploration",org:"Independent / Open Source",category:"Independent" as Category,years:"2026",description:"Containerized automation tooling and workflow experimentation with upstream attribution.",details:["n8n and Docker workflow exploration","AI runtime integrations and deployment documentation","Original modifications documented separately from upstream"],tech:["n8n","Docker","Python"],evidence:"https://github.com/M16616678/n8n-workflows"}
];
const events=[
 {date:"2014–2017",title:"Diploma · Electrical & Electronics Engineering",body:"Foundational electrical engineering education."},
 {date:"2017–2020",title:"B.Tech · Vignan University",body:"Electrical & Electronics Engineering. Advanced Home Automation Control System."},
 {date:"Nov 2020–Aug 2024",title:"Software Engineer · TCS",body:"State government financial systems: CFMS 2.0, backend services, reporting and CI/CD."},
 {date:"Aug 2024–Dec 2025",title:"M.S. Information Technology · University of Cincinnati",body:"Graduate coursework in web development, AI, cybersecurity and HCI. GPA 3.97/4.0."},
 {date:"Jan 2026 onward",title:"Software Engineering · Innovision LLC",body:"IBrace, ComFit/DCAP, healthcare workflows and full-stack engineering."},
 {date:"Contract assignments",title:"Professional AI Evaluation",body:"Handshake AI, Mercor, Appen CrowdGen and Outlier."},
 {date:"Ongoing",title:"Independent Engineering",body:"16 interactive games, AI workflow experiments and software projects."}
];
const rubric=[
 {name:"Technical correctness",weight:40},
 {name:"Instruction adherence",weight:25},
 {name:"Edge cases",weight:20},
 {name:"Clarity",weight:15}
];
export default function PortfolioPremium() {
 const [category,setCategory]=useState<Category>("All");
 const [query,setQuery]=useState("");
 const [expanded,setExpanded]=useState<string|null>("cfms");
 const [timeline,setTimeline]=useState(3);
 const [tab,setTab]=useState<"Review"|"Method">("Review");
 const [ratings,setRatings]=useState([4,4,2,5]);
 const [menu,setMenu]=useState(false);
 const [light,setLight]=useState(false);
 const [portrait,setPortrait]=useState(0);
 const total=rubric.reduce((v,c,i)=>v+c.weight*ratings[i]/5,0);
 const shown=useMemo(()=>cases.filter(p=>(category==="All"||p.category===category)&&[p.name,p.org,p.description,...p.tech].join(" ").toLowerCase().includes(query.toLowerCase())),[category,query]);

 const toggleTheme=()=>setLight(v=>!v);
 const links=[["Overview","#portfolio-overview"],["Timeline","#career"],["Projects","#projects"],["AI Studio","#evaluation-lab"],["Games","#library"],["Resume","#credentials"],["Contact","#contact"]];
 return <section id="portfolio-overview" className={`relative isolate overflow-hidden rounded-3xl border p-4 shadow-2xl sm:p-7 ${light?"border-slate-300 bg-[#f5f3ef] text-slate-900":"border-[#aa8340]/20 bg-[#080d17] text-slate-100"}`}>
   <style>{`
    .p3-glow{background:radial-gradient(circle at 86% 3%,rgba(214,170,89,.12),transparent 38%),radial-gradient(circle at 0% 100%,rgba(54,106,160,.13),transparent 40%)}
    .p3-card{border:1px solid rgba(205,167,99,.18);border-radius:18px;background:linear-gradient(145deg,rgba(22,33,49,.95),rgba(11,17,28,.96));box-shadow:0 8px 40px rgba(0,0,0,.12)}
    .p3-kicker{font-size:10px;font-weight:800;letter-spacing:.21em;text-transform:uppercase;color:#e3b66a}
    .p3-link:focus-visible,.p3-button:focus-visible{outline:3px solid #efc776;outline-offset:3px}
    @media(prefers-reduced-motion:reduce){.p3-motion{transition:none!important;scroll-behavior:auto!important}}
   `}</style>
   <div className="p3-glow pointer-events-none absolute inset-0 -z-10"/>
   <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#b88d44]/20 pb-4">
    <div className="flex items-center gap-3"><span className="font-serif text-3xl font-black text-[#e8bc73]">AN</span><div><strong className="block text-sm">Adi Narayana Manga</strong><span className="text-[10px] opacity-60">Software Engineer · Technical AI Evaluator</span></div></div>
    <nav aria-label="Portfolio sections" className="hidden flex-wrap gap-3 lg:flex">{links.map(([label,url])=><a key={url} className="p3-link text-xs font-semibold opacity-75 hover:text-[#e8bc73] hover:opacity-100" href={url}>{label}</a>)}</nav>
    <div className="flex items-center gap-2"><button type="button" onClick={toggleTheme} className="p3-button rounded-lg border border-[#af8a4a]/30 px-3 py-2 text-xs" aria-label={light?"Switch to dark theme":"Switch to light theme"}>{light?"☾ Dark":"☀ Theme"}</button><button type="button" onClick={()=>setMenu(!menu)} aria-expanded={menu} className="p3-button rounded-lg border border-[#af8a4a]/30 px-3 py-2 text-xs lg:hidden">Menu</button></div>
   </div>
   {menu&&<nav className="grid grid-cols-2 gap-3 border-b border-[#b88d44]/20 py-4 lg:hidden" aria-label="Mobile portfolio sections">{links.map(([label,url])=><a key={url} onClick={()=>setMenu(false)} className="p3-link text-xs" href={url}>{label}</a>)}</nav>}
   <div className="grid gap-7 py-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
     <div>
       <p className="p3-kicker">Portfolio 3.0 · People × Products × Impact</p>
       <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">Engineering reliable software.<span className="block text-[#e8bc73]">Evaluating intelligent systems.</span></h2>
       <p className="mt-4 max-w-2xl text-sm leading-7 opacity-80">From electrical engineering at Vignan University to state-government financial systems at TCS, healthcare technology at Innovision, graduate research and technical AI evaluation. I turn complex workflows into useful software.</p>
       <div className="mt-6 flex flex-wrap gap-3"><a href="#projects" className="p3-link rounded-xl bg-[#e8bc73] px-5 py-3 text-xs font-black text-[#10131a]">Explore case studies ↗</a><a href="#evaluation-lab" className="p3-link rounded-xl border border-[#e8bc73]/40 px-5 py-3 text-xs font-bold">Try AI evaluation ↗</a><a href="#contact" className="p3-link rounded-xl border border-white/20 px-5 py-3 text-xs font-bold">Contact</a></div>
     </div>
     <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
       <div className="p3-card flex min-h-[150px] items-center justify-between gap-3 p-4 text-white">
         <div><p className="p3-kicker">Professional profile</p><h3 className="mt-2 text-lg font-bold">Software & AI</h3><p className="mt-2 text-xs text-slate-400">Industry · Healthcare · AI Evaluation</p></div>
         <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d9ab62]/40 bg-[#1a2231]"><img alt="Professional portrait supplied by Adi" src={portrait===0?"/portfolio-headshot.webp":"/portfolio-formal.webp"} onError={event=>{event.currentTarget.style.display="none"}} className="h-full w-full object-cover"/></div>
       </div>
       <div className="p3-card flex items-center justify-between p-4 text-white"><p className="text-xs text-slate-400">Portrait view</p><button type="button" className="p3-button text-xs font-semibold text-[#e8bc73]" onClick={()=>setPortrait(v=>1-v)}>Switch photograph ↔</button></div>
     </div>
   </div>
   <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["2020","B.Tech · Vignan University"],["2025","M.S. IT · Cincinnati"],["4","AI evaluation platforms"],["16","Playable games"]].map(([metric,label])=><div key={label} className="p3-card p-4 text-white"><strong className="text-2xl text-[#e8bc73]">{metric}</strong><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}</div>
   <section id="career" className="mt-12 scroll-mt-24">
     <p className="p3-kicker">A verified progression</p><h3 className="mt-2 text-2xl font-black">Career & Education Timeline</h3>
     <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
       <div className="space-y-1">{events.map((item,i)=><button type="button" key={item.date} aria-pressed={timeline===i} onClick={()=>setTimeline(i)} className={`p3-button flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs transition-colors ${timeline===i?"border border-[#dfae58]/50 bg-[#dfae58]/10":"border border-transparent hover:bg-white/5"}`}><span className={`h-2.5 w-2.5 shrink-0 rounded-full ${timeline===i?"bg-[#e8bc73]":"bg-slate-500"}`}/><span><strong className="block">{item.date}</strong><span className="mt-1 block opacity-75">{item.title}</span></span></button>)}</div>
       <div className="p3-card flex flex-col justify-center p-6 text-white"><p className="p3-kicker">{events[timeline].date}</p><h4 className="mt-3 text-xl font-black">{events[timeline].title}</h4><p className="mt-4 text-sm leading-relaxed text-slate-300">{events[timeline].body}</p><p className="mt-6 text-xs text-slate-500">Select any milestone to explore this chapter of the career journey.</p></div>
     </div>
   </section>
   <section id="projects" className="mt-12 scroll-mt-24">
     <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="p3-kicker">Work with substance</p><h3 className="mt-2 text-2xl font-black">Projects & Engineering Case Studies</h3></div><label className="text-xs"><span className="sr-only">Search projects</span><input aria-label="Search projects" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects or technologies" className="w-full rounded-xl border border-[#af8a4a]/30 bg-transparent px-4 py-3 text-sm sm:w-64"/></label></div>
     <div className="mt-5 flex flex-wrap gap-2" aria-label="Project category filters">{categories.map(c=><button key={c} type="button" onClick={()=>setCategory(c)} aria-pressed={category===c} className={`p3-button rounded-full border px-3 py-2 text-[11px] font-bold ${category===c?"border-[#e8bc73] bg-[#e8bc73] text-[#121621]":"border-[#ad8955]/30"}`}>{c}</button>)}</div>
     <p aria-live="polite" className="mt-3 text-xs opacity-60">{shown.length} matching case studies</p>
     <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{shown.map(p=><article key={p.id} className="p3-card flex flex-col p-5 text-white"><div className="flex justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-[#e8bc73]"><span>{p.category}</span><span>{p.years}</span></div><h4 className="mt-4 text-lg font-black">{p.name}</h4><p className="mt-1 text-xs text-slate-400">{p.org}</p><p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{p.description}</p><div className="mt-4 flex flex-wrap gap-1">{p.tech.map(t=><span key={t} className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-300">{t}</span>)}</div><button type="button" className="p3-button mt-4 flex justify-between border-t border-white/10 pt-3 text-left text-xs font-bold text-[#e8bc73]" aria-expanded={expanded===p.id} onClick={()=>setExpanded(v=>v===p.id?null:p.id)}>{expanded===p.id?"Hide details":"Explore contributions"}<span>{expanded===p.id?"−":"+"}</span></button>{expanded===p.id&&<div className="mt-3"><ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-slate-300">{p.details.map(d=><li key={d}>{d}</li>)}</ul>{p.evidence&&<a href={p.evidence} target={p.evidence.startsWith("#")?undefined:"_blank"} rel="noopener noreferrer" className="p3-link mt-4 inline-block text-xs font-semibold text-[#e8bc73]">View project ↗</a>}</div>}</article>)}</div>
   </section>
   <section id="evaluation-lab" className="p3-card mt-12 scroll-mt-24 p-5 text-white sm:p-7">
      <div><p className="p3-kicker">Interactive demonstration</p><h3 className="mt-2 text-2xl font-black">AI Evaluation Studio</h3><p className="mt-2 text-sm text-slate-400">Original synthetic example. No confidential Handshake, Mercor, Appen CrowdGen or Outlier tasks are disclosed.</p></div>
      <div className="mt-5 flex gap-2">{(["Review","Method"] as const).map(t=><button type="button" key={t} onClick={()=>setTab(t)} aria-pressed={tab===t} className={`p3-button rounded-lg border px-4 py-2 text-xs ${tab===t?"border-[#e8bc73] bg-[#e8bc73] text-black":"border-white/20"}`}>{t}</button>)}</div>
      {tab==="Review"?<div className="mt-5 grid gap-5 lg:grid-cols-2"><div className="rounded-xl border border-white/10 bg-[#070a12] p-4"><h4 className="text-sm font-bold">Synthetic code-review assignment</h4><p className="mt-3 text-xs text-slate-300">Return the mean of a numeric array, but return <code>null</code> for an empty array.</p><pre className="mt-4 overflow-x-auto text-xs leading-6 text-[#d5bf88]"><code>{`function mean(a: number[]) {
 return a.reduce((s,n)=>s+n,0)/a.length;
}`}</code></pre><p className="mt-4 text-xs text-slate-400">Key finding: this implementation returns NaN on empty input. An evaluator should flag it despite passing ordinary non-empty cases.</p></div><div><div className="flex justify-between text-xs"><strong>Weighted rubric</strong><strong aria-live="polite" className="text-[#e8bc73]">{Math.round(total)} / 100 · {total>=80&&ratings[0]>=4?"Pass":"Needs revision"}</strong></div>{rubric.map((r,i)=><label key={r.name} className="mt-5 block text-xs"><span className="flex justify-between"><span>{r.name} ({r.weight}%)</span><span>{ratings[i]}/5</span></span><input className="mt-2 w-full accent-[#dcae60]" type="range" min={0} max={5} step={1} value={ratings[i]} onChange={e=>setRatings(v=>v.map((n,k)=>k===i?Number(e.target.value):n))}/></label>)}<button type="button" onClick={()=>setRatings([4,4,2,5])} className="p3-button mt-4 text-xs text-[#e8bc73] underline">Reset rubric</button></div></div>:<div className="mt-5 rounded-xl bg-[#070a12] p-5 text-sm leading-7 text-slate-300">Review each response for correctness, adherence to task requirements, edge-case handling and clarity. Scores are weighted transparently; pass requires at least 80/100 and a correctness score of at least 4/5. This public example is not an employer&apos;s actual scoring rubric.</div>}
   </section>
   <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#b88d44]/20 pt-6"><p className="max-w-xl text-xs opacity-70">Enterprise systems · Healthcare platforms · AI evaluation · Independent engineering. Case studies are public-safe summaries.</p><a href="mailto:mangaaa@mail.uc.edu" className="p3-link rounded-xl bg-[#e8bc73] px-5 py-3 text-xs font-black text-[#111111]">Discuss an opportunity ↗</a></div>
  </section>;
}
