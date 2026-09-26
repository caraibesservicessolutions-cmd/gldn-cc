"use client";
import { useState } from "react";

const events=[
 {type:"GOLDEN HOUR",title:"Accès privé activé",meta:"Opportunité limitée · GC List",action:"Découvrir"},
 {type:"À LA UNE",title:"Expériences sélectionnées",meta:"Événements · Lifestyle · Caraïbes",action:"Explorer"}
];

export default function Home(){
 const [tab,setTab]=useState("Accueil");
 return <main style={{minHeight:"100vh",background:"#10090c",color:"#FAFAF9",fontFamily:"Helvetica Neue,Arial,sans-serif"}}>
  <div style={{maxWidth:430,minHeight:"100vh",margin:"0 auto",position:"relative",background:"linear-gradient(180deg,#160c11 0%,#0d090b 100%)",paddingBottom:92}}>
   <header style={{padding:"22px 22px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <img src="/golden-circle-logo-transparent.png" alt="Golden Circle" style={{width:108,height:"auto"}}/>
    <button style={{width:36,height:36,borderRadius:"50%",border:"1px solid #D1B46455",background:"#4A192E33",color:"#D1B464",fontSize:15}}>GC</button>
   </header>
   <section style={{padding:"24px 22px 28px"}}>
    <p style={{margin:0,fontSize:11,letterSpacing:2.4,color:"#D1B464"}}>BONSOIR</p>
    <h1 style={{fontSize:29,fontWeight:300,margin:"8px 0 4px"}}>Bienvenue dans le Circle</h1>
    <p style={{fontSize:13,color:"#aaa0a5",margin:0}}>Membre GC · Caraïbes</p>
   </section>
   <section style={{margin:"0 16px 30px",padding:"25px 22px",borderRadius:26,position:"relative",overflow:"hidden",border:"1px solid #D1B46466",background:"radial-gradient(circle at 85% 10%,#6b304b 0,#4A192E 32%,#211018 100%)"}}>
    <div style={{position:"absolute",right:-24,top:-34,fontSize:118,color:"#D1B46414"}}>◯</div>
    <p style={{fontSize:10,letterSpacing:3,color:"#D1B464",margin:0}}>GOLDEN HOUR</p>
    <h2 style={{fontSize:27,fontWeight:300,margin:"30px 0 8px"}}>Une opportunité<br/>vient d’être activée.</h2>
    <p style={{fontSize:13,color:"#e0d8db",lineHeight:1.5,maxWidth:270}}>Accès réservé aux membres éligibles. Disponibilité limitée.</p>
    <button style={{marginTop:17,border:0,borderBottom:"1px solid #D1B464",padding:"7px 0",background:"transparent",color:"#D1B464",fontSize:12,letterSpacing:1.2}}>VOIR L’OPPORTUNITÉ →</button>
   </section>
   <section style={{padding:"0 22px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:14}}>
     <h3 style={{fontWeight:300,fontSize:19,margin:0}}>À la une</h3><span style={{fontSize:11,color:"#D1B464"}}>Tout voir</span>
    </div>
    {events.slice(1).map(e=><article key={e.type} style={{display:"grid",gridTemplateColumns:"92px 1fr",gap:16,padding:"14px 0",borderTop:"1px solid #ffffff12",borderBottom:"1px solid #ffffff12"}}>
      <div style={{height:112,borderRadius:14,background:"linear-gradient(145deg,#4A192E,#1c1116)",border:"1px solid #D1B46425",display:"grid",placeItems:"center",color:"#D1B464",fontSize:25}}>GC</div>
      <div style={{padding:"7px 0"}}><p style={{fontSize:9,letterSpacing:2,color:"#D1B464",margin:"0 0 10px"}}>{e.type}</p><h4 style={{fontSize:17,fontWeight:400,margin:"0 0 8px"}}>{e.title}</h4><p style={{fontSize:12,color:"#999096",lineHeight:1.4,margin:0}}>{e.meta}</p><p style={{fontSize:11,color:"#D1B464",marginTop:15}}>{e.action} →</p></div>
    </article>)}
   </section>
   <nav style={{position:"fixed",left:"50%",transform:"translateX(-50%)",bottom:0,width:"min(430px,100%)",height:72,background:"#100b0eee",backdropFilter:"blur(16px)",borderTop:"1px solid #D1B46422",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
    {["Accueil","Explorer","Pass","Profil"].map((x,i)=><button key={x} onClick={()=>setTab(x)} style={{border:0,background:"transparent",color:tab===x?"#D1B464":"#777077",fontSize:10,letterSpacing:.4}}><div style={{fontSize:17,marginBottom:5}}>{["⌂","◇","▣","○"][i]}</div>{x}</button>)}
   </nav>
  </div>
 </main>
}