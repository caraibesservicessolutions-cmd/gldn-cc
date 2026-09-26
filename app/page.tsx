"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@supabase/supabase-js";
import {
  Bell, CalendarDays, ChevronLeft, ChevronRight, Clock3, Compass, Crown,
  Diamond, Home, MapPin, QrCode, Search, Settings, ShieldCheck, TicketCheck,
  User, Users, Building2, BarChart3, Plus, ScanLine, LogOut
} from "lucide-react";

const GOLD = "#D1B464";
const PEARL = "#FAFAF9";
const MUTED = "#9d9297";
const CARD = "#0e0a0c";
const BORDER = "rgba(209,180,100,.20)";
const SUPABASE_URL = "https://jnknwwfazfwqjlnhpzkm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_VTVS6BQJ1cUREwkukTTQjg_HNuWIBv5";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

type Role = "member" | "partner" | "admin";
type Screen =
  | "home" | "explorer" | "detail" | "reservation" | "pass" | "notifications" | "profile"
  | "partnerHome" | "partnerAnnouncements" | "partnerReservations" | "partnerScan" | "partnerProfile"
  | "adminHome" | "adminMembers" | "adminPartners" | "adminAnnouncements" | "adminReservations" | "adminSettings";

const events = [
  { id:"fuego", title:"FUEGO", venue:"LA BOCA — Le Gosier", date:"Sam. 03 oct.", time:"21h · 4h", benefit:"Boisson d’accueil", places:8 },
  { id:"desh", title:"LA DESH", venue:"Club — Le Gosier", date:"03 oct.", time:"Avant 23h", benefit:"Accueil GC", places:5 },
  { id:"pretty", title:"SA PRETTY", venue:"Le Deck", date:"10 oct.", time:"Soirée", benefit:"Privilège GC", places:12 },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{minHeight:"100vh",background:"#070607",color:PEARL,fontFamily:"Helvetica Neue,Arial,sans-serif"}}>
      <div style={{maxWidth:430,minHeight:"100vh",margin:"0 auto",position:"relative",overflowX:"hidden",background:"radial-gradient(circle at 95% 3%,rgba(209,180,100,.08),transparent 24%),radial-gradient(circle at 8% 88%,rgba(74,25,46,.22),transparent 34%),#090708",borderLeft:"1px solid rgba(209,180,100,.08)",borderRight:"1px solid rgba(209,180,100,.08)"}}>
        {children}
      </div>
    </main>
  );
}

function GoldButton({children,onClick,disabled=false}:{children:React.ReactNode;onClick?:()=>void;disabled?:boolean}) {
  return <button disabled={disabled} onClick={onClick} style={{width:"100%",border:0,borderRadius:12,padding:"13px 16px",background:disabled?"#5f5232":"linear-gradient(180deg,#e2c26b,#bd9340)",color:"#1a1014",fontWeight:800,fontSize:11,letterSpacing:.5,opacity:disabled ? .65 : 1}}>{children}</button>
}

function TopBar({title,back,onBack,right}:{title:string;back?:boolean;onBack?:()=>void;right?:React.ReactNode}) {
  return <header style={{padding:"18px 16px 12px",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid rgba(209,180,100,.10)"}}>
    {back ? <button onClick={onBack} style={{border:0,background:"transparent",color:PEARL,padding:4}}><ChevronLeft size={20}/></button> : null}
    <h1 style={{margin:0,flex:1,fontSize:19,fontWeight:500}}>{title}</h1>
    {right}
  </header>
}

function Nav({active,onNav}:{active:string;onNav:(s:Screen)=>void}) {
  const items:[string,Screen,any][] = [
    ["Accueil","home",Home],["Explorer","explorer",Compass],["Pass","pass",QrCode],["Notifications","notifications",Bell],["Profil","profile",User],
  ];
  return <nav style={{position:"fixed",left:"50%",bottom:0,transform:"translateX(-50%)",width:"min(430px,100%)",height:72,display:"grid",gridTemplateColumns:"repeat(5,1fr)",background:"rgba(9,7,8,.97)",backdropFilter:"blur(16px)",borderTop:`1px solid ${BORDER}`,zIndex:30}}>
    {items.map(([label,screen,Icon])=><button key={label} onClick={()=>onNav(screen)} style={{border:0,background:"transparent",color:active===screen?GOLD:"#71686c",display:"grid",placeItems:"center",fontSize:8,padding:"8px 0"}}>
      <Icon size={17} strokeWidth={active===screen?1.9:1.4}/><span>{label}</span>
    </button>)}
  </nav>
}

function EventArt({compact=false}:{compact?:boolean}) {
  return <div style={{height:compact?104:210,borderRadius:compact?14:0,background:"linear-gradient(90deg,rgba(8,5,7,.76),rgba(62,13,34,.20)),url('/images/golden-circle-hero.png') center/cover",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(8,6,7,.92),transparent 58%)"}}/>
    {!compact && <div style={{position:"absolute",left:16,bottom:16}}><p style={{margin:0,fontSize:10,letterSpacing:1.5,color:GOLD}}>GOLDEN HOUR</p><h2 style={{margin:"5px 0 0",fontSize:30,fontWeight:500}}>FUEGO</h2><p style={{margin:"3px 0 0",fontSize:12}}>LA BOCA — Le Gosier</p></div>}
  </div>
}

export default function HomePage() {
  const [role,setRole] = useState<Role>("member");
  const [logged,setLogged] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [authBusy,setAuthBusy] = useState(false);
  const [authError,setAuthError] = useState("");
  const [authInfo,setAuthInfo] = useState("");
  const [screen,setScreen] = useState<Screen>("home");
  const [selected,setSelected] = useState(events[0]);
  const [reserved,setReserved] = useState(false);
  const [confirmed,setConfirmed] = useState(false);

  async function hydrateUser(userId:string,userEmail?:string|null){
    const { data, error } = await supabase
      .from("profiles")
      .select("role,membership_tier,account_status,first_name,last_name")
      .eq("id",userId)
      .single();

    if(error || !data){
      setAuthError("Compte reconnu, mais le profil Golden Circle n’est pas encore disponible.");
      return;
    }

    const nextRole=(data.role || "member") as Role;
    const profileName=[data.first_name,data.last_name].filter(Boolean).join(" ").trim();
    setRole(nextRole);
    setName(profileName || (userEmail ? userEmail.split("@")[0] : "Golden Circle"));
    setLogged(true);
    setScreen(nextRole==="partner" ? "partnerHome" : nextRole==="admin" ? "adminHome" : "home");
  }

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{
      if(data.session?.user) hydrateUser(data.session.user.id,data.session.user.email);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event,session)=>{
      if(session?.user) hydrateUser(session.user.id,session.user.email);
      else setLogged(false);
    });
    return ()=>listener.subscription.unsubscribe();
  },[]);

  const displayName = name.trim() || (role==="member"?"Membre GC":role==="partner"?"Partenaire GC":"Administration");
  const passCode = useMemo(()=>`GC-FUEGO-${(displayName.replace(/\s+/g,"").toUpperCase().slice(0,4)||"MEMB")}-8F4K2`,[displayName]);

  async function login(){
    setAuthBusy(true); setAuthError(""); setAuthInfo("");
    const { data, error } = await supabase.auth.signInWithPassword({email:email.trim(),password});
    if(error){ setAuthError(error.message); setAuthBusy(false); return; }
    if(data.user) await hydrateUser(data.user.id,data.user.email);
    setAuthBusy(false);
  }

  async function signup(){
    setAuthBusy(true); setAuthError(""); setAuthInfo("");
    const { data, error } = await supabase.auth.signUp({email:email.trim(),password});
    if(error){ setAuthError(error.message); setAuthBusy(false); return; }
    if(data.session?.user){
      await hydrateUser(data.session.user.id,data.session.user.email);
    }else{
      setAuthInfo("Compte créé. Vérifiez votre boîte mail pour confirmer l’adresse, puis connectez-vous.");
    }
    setAuthBusy(false);
  }

  async function logout(){
    await supabase.auth.signOut();
    setLogged(false); setName(""); setEmail(""); setPassword(""); setRole("member"); setScreen("home"); setReserved(false); setConfirmed(false);
  }

  if(!logged) return <Shell>
    <div style={{minHeight:"100vh",padding:"44px 22px 28px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <img src="/brand/golden-circle-emblem-transparent.png" alt="Golden Circle" style={{width:148,maxWidth:"55%",height:"auto"}}/>
        <h1 style={{margin:"8px 0 2px",fontSize:24,fontWeight:500,letterSpacing:1}}>GOLDEN CIRCLE</h1>
        <p style={{margin:0,fontSize:11,letterSpacing:2,color:GOLD}}>CARAÏBES</p>
      </div>
      <div style={{border:`1px solid ${BORDER}`,borderRadius:22,padding:18,background:"rgba(10,7,8,.88)"}}>
        <p style={{margin:"0 0 12px",fontSize:10,letterSpacing:1.8,color:GOLD}}>ACCÈS SÉCURISÉ</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" inputMode="email" placeholder="Adresse e-mail" style={{width:"100%",boxSizing:"border-box",padding:"13px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,.13)",background:"#111012",color:PEARL,outline:"none",marginBottom:10}}/>
        <input value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" placeholder="Mot de passe" type="password" style={{width:"100%",boxSizing:"border-box",padding:"13px 12px",borderRadius:10,border:"1px solid rgba(255,255,255,.13)",background:"#111012",color:PEARL,outline:"none",marginBottom:14}}/>
        <GoldButton disabled={authBusy || !email || !password} onClick={login}>{authBusy?"CONNEXION…":"SE CONNECTER"}</GoldButton>
        <button disabled={authBusy || !email || password.length<8} onClick={signup} style={{width:"100%",marginTop:10,padding:"11px 14px",borderRadius:12,border:`1px solid ${BORDER}`,background:"transparent",color:GOLD,fontSize:10}}>PREMIÈRE ACTIVATION / CRÉER MON ACCÈS</button>
        {authError ? <p style={{fontSize:10,lineHeight:1.5,color:"#e78686",margin:"12px 0 0"}}>{authError}</p> : null}
        {authInfo ? <p style={{fontSize:10,lineHeight:1.5,color:"#87d8a0",margin:"12px 0 0"}}>{authInfo}</p> : null}
        <p style={{fontSize:9,lineHeight:1.5,color:MUTED,textAlign:"center",margin:"12px 0 0"}}>Le rôle affiché après connexion vient de Supabase et ne peut pas être choisi depuis l’interface.</p>
      </div>
    </div>
  </Shell>;

  if(role==="member"){
    if(screen==="home") return <Shell>
      <div style={{paddingBottom:88}}>
        <header style={{padding:"18px 18px 12px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:46,height:46,borderRadius:"50%",border:`1px solid ${GOLD}`,display:"grid",placeItems:"center",background:"#130b0f",color:GOLD,fontSize:12}}>GC</div>
          <div style={{flex:1}}><p style={{margin:0,fontSize:10,color:MUTED}}>Bonjour,</p><div style={{display:"flex",gap:8,alignItems:"center"}}><h1 style={{margin:0,fontSize:20,fontWeight:400}}>{displayName}</h1><span style={{fontSize:9,padding:"4px 7px",borderRadius:999,background:GOLD,color:"#1b1115",fontWeight:700}}>GC VIP ◇</span></div></div>
          <button onClick={()=>setScreen("notifications")} style={{border:0,background:"transparent",color:GOLD}}><Bell size={19}/></button>
        </header>

        <section style={{margin:"8px 14px 22px",borderRadius:22,padding:1,background:"linear-gradient(135deg,#f2d47e,#8a5f20 48%,#f0ce6b)"}}>
          <div style={{borderRadius:21,overflow:"hidden",background:CARD}}>
            <div style={{padding:"14px 15px",display:"flex",justifyContent:"space-between",borderBottom:`1px solid ${BORDER}`}}><span style={{fontSize:11,letterSpacing:1.7,color:GOLD,fontWeight:700}}>♛ GOLDEN HOUR</span><span style={{fontSize:9,color:MUTED}}>ACTIVÉE</span></div>
            <EventArt/>
            <div style={{padding:13}}><GoldButton onClick={()=>{setSelected(events[0]);setScreen("detail")}}>VOIR L’ÉVÉNEMENT</GoldButton></div>
          </div>
        </section>

        <section style={{padding:"0 14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><h3 style={{margin:0,fontSize:14,fontWeight:500}}>ÉVÉNEMENTS À LA UNE</h3><button onClick={()=>setScreen("explorer")} style={{border:0,background:"transparent",color:GOLD,fontSize:10}}>Tout voir ›</button></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {events.slice(1).map(e=><button key={e.id} onClick={()=>{setSelected(e);setScreen("detail")}} style={{padding:0,textAlign:"left",border:`1px solid ${BORDER}`,borderRadius:16,background:CARD,color:PEARL,overflow:"hidden"}}><EventArt compact/><div style={{padding:10}}><b style={{fontSize:13}}>{e.title}</b><p style={{margin:"4px 0 0",fontSize:9,color:MUTED}}>{e.date} · {e.venue}</p></div></button>)}
          </div>
        </section>

        <button onClick={()=>setScreen("pass")} style={{margin:"18px 14px 0",width:"calc(100% - 28px)",padding:"14px 15px",borderRadius:16,border:`1px solid ${BORDER}`,background:"linear-gradient(145deg,rgba(74,25,46,.28),rgba(11,8,9,.96))",color:PEARL,display:"flex",alignItems:"center",gap:12,textAlign:"left"}}><div style={{width:42,height:42,borderRadius:12,border:`1px solid ${BORDER}`,display:"grid",placeItems:"center",color:GOLD}}><QrCode size={22}/></div><div style={{flex:1}}><small style={{color:MUTED}}>Votre accès personnel</small><div style={{fontSize:13}}>Golden Pass</div></div><ChevronRight size={18} color={GOLD}/></button>
        <Nav active="home" onNav={setScreen}/>
      </div>
    </Shell>;

    if(screen==="explorer") return <Shell><div style={{paddingBottom:88}}><TopBar title="Explorer"/><div style={{padding:14}}>
      <div style={{display:"flex",gap:8,alignItems:"center",padding:"11px 12px",borderRadius:12,background:"#111012",border:"1px solid rgba(255,255,255,.1)",marginBottom:14}}><Search size={15} color={MUTED}/><input placeholder="Rechercher un événement..." style={{flex:1,border:0,outline:"none",background:"transparent",color:PEARL}}/></div>
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:10}}>{["Tous","Soirées","Lounge","Restaurant","Réseau"].map((x,i)=><span key={x} style={{whiteSpace:"nowrap",padding:"7px 10px",borderRadius:999,background:i===0?GOLD:"#111012",color:i===0?"#1b1115":PEARL,fontSize:9}}>{x}</span>)}</div>
      {events.map(e=><button key={e.id} onClick={()=>{setSelected(e);setScreen("detail")}} style={{width:"100%",display:"grid",gridTemplateColumns:"90px 1fr auto",gap:12,alignItems:"center",padding:"10px 0",border:0,borderBottom:"1px solid rgba(255,255,255,.08)",background:"transparent",color:PEARL,textAlign:"left"}}><EventArt compact/><div><b>{e.title}</b><p style={{margin:"4px 0",fontSize:10,color:MUTED}}>{e.date} · {e.venue}</p><span style={{fontSize:9,color:GOLD}}>{e.places} places restantes</span></div><ChevronRight size={17}/></button>)}
    </div><Nav active="explorer" onNav={setScreen}/></div></Shell>;

    if(screen==="detail") return <Shell><div style={{paddingBottom:24}}><TopBar title="Détail événement" back onBack={()=>setScreen("explorer")}/><EventArt/><div style={{padding:16}}>
      <h2 style={{margin:"0 0 4px",fontSize:25}}>{selected.title}</h2><p style={{margin:"0 0 14px",fontSize:12,color:MUTED}}>{selected.venue}</p>
      <div style={{display:"grid",gap:9,marginBottom:16,fontSize:12}}><span><CalendarDays size={14} color={GOLD} style={{marginRight:8,verticalAlign:"middle"}}/>{selected.date}</span><span><Clock3 size={14} color={GOLD} style={{marginRight:8,verticalAlign:"middle"}}/>{selected.time}</span><span><MapPin size={14} color={GOLD} style={{marginRight:8,verticalAlign:"middle"}}/>{selected.venue}</span></div>
      <div style={{borderTop:`1px solid ${BORDER}`,borderBottom:`1px solid ${BORDER}`,padding:"14px 0",marginBottom:16}}><p style={{margin:"0 0 7px",fontSize:10,color:GOLD,letterSpacing:1}}>PRIVILÈGE GC</p><p style={{margin:0,fontSize:13}}>{selected.benefit}</p><p style={{margin:"6px 0 0",fontSize:10,color:MUTED}}>{selected.places} places restantes · Conditions propres à cet événement.</p></div>
      <GoldButton onClick={()=>{setReserved(true);setScreen("reservation")}}>RÉSERVER MA PLACE</GoldButton>
    </div></div></Shell>;

    if(screen==="reservation") return <Shell><div><TopBar title="Confirmation" back onBack={()=>setScreen("detail")}/><div style={{padding:16}}>
      <div style={{display:"grid",gridTemplateColumns:"72px 1fr",gap:12,padding:12,borderRadius:14,border:`1px solid ${BORDER}`,background:CARD}}><EventArt compact/><div><b>{selected.title}</b><p style={{margin:"5px 0",fontSize:10,color:MUTED}}>{selected.date} · {selected.venue}</p></div></div>
      <h3 style={{fontSize:15,margin:"20px 0 10px"}}>Votre réservation</h3>
      <div style={{fontSize:12,lineHeight:1.9,color:"#d9d2d5"}}><div>Membre <span style={{float:"right",color:GOLD}}>{displayName}</span></div><div>Niveau <span style={{float:"right"}}>GC VIP</span></div><div>Privilège <span style={{float:"right"}}>{selected.benefit}</span></div><div>Places <span style={{float:"right"}}>1</span></div></div>
      <label style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:10,color:MUTED,margin:"18px 0"}}><input type="checkbox" defaultChecked/> J’accepte les conditions de l’événement.</label>
      <GoldButton onClick={()=>{setConfirmed(true);setScreen("pass")}}>CONFIRMER</GoldButton>
    </div></div></Shell>;

    if(screen==="pass") return <Shell><div style={{paddingBottom:88}}><TopBar title="Votre Pass Golden Circle"/><div style={{padding:16}}>
      <div style={{borderRadius:22,border:`1px solid ${GOLD}`,padding:18,background:"linear-gradient(165deg,#2c101f,#0c080a 55%,#17100d)",textAlign:"center",boxShadow:"0 18px 50px rgba(0,0,0,.38)"}}>
        <p style={{margin:0,fontSize:10,color:GOLD,letterSpacing:1.5}}>{confirmed?"RÉSERVATION CONFIRMÉE":"GOLDEN PASS"}</p><h2 style={{margin:"9px 0 2px",fontSize:24}}>{selected.title}</h2><p style={{margin:0,fontSize:10,color:MUTED}}>{selected.venue}</p>
        <div style={{margin:"18px auto 12px",padding:12,background:"#fff",borderRadius:14,width:"fit-content"}}><QRCodeSVG value={passCode} size={170}/></div>
        <p style={{margin:"8px 0 2px",fontSize:11,color:GOLD,letterSpacing:1}}>{passCode}</p><p style={{margin:0,fontSize:10}}>{displayName} · GC VIP</p>
        <div style={{marginTop:15,padding:"9px",borderRadius:10,background:confirmed?"rgba(31,111,65,.28)":"rgba(209,180,100,.10)",border:`1px solid ${confirmed?"rgba(67,190,106,.45)":BORDER}`,fontSize:10}}>{confirmed?"✓ Accès confirmé":"Aucune réservation active"}</div>
      </div>
    </div><Nav active="pass" onNav={setScreen}/></div></Shell>;

    if(screen==="notifications") return <Shell><div style={{paddingBottom:88}}><TopBar title="Notifications"/><div style={{padding:16}}>{["Golden Hour activée : une nouvelle opportunité est disponible.","Votre réservation FUEGO est prête à être confirmée.","Nouvel événement partenaire ajouté dans Explorer."].map((x,i)=><div key={i} style={{padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.08)",fontSize:12}}><span style={{color:GOLD,marginRight:8}}>●</span>{x}</div>)}</div><Nav active="notifications" onNav={setScreen}/></div></Shell>;

    return <Shell><div style={{paddingBottom:88}}><TopBar title="Mon profil" right={<button onClick={logout} style={{border:0,background:"transparent",color:"#e06161"}}><LogOut size={18}/></button>}/><div style={{padding:16}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}><div style={{width:60,height:60,borderRadius:"50%",border:`1px solid ${GOLD}`,display:"grid",placeItems:"center",color:GOLD}}>GC</div><div><h2 style={{margin:0,fontSize:18}}>{displayName}</h2><p style={{margin:"4px 0 0",fontSize:10,color:GOLD}}>GC VIP ◇</p></div></div>
      {["Mes informations","Mon niveau GC","Mes préférences","Mes réservations","Mes avantages","Notifications","Centre d’aide"].map(x=><button key={x} style={{width:"100%",padding:"14px 0",border:0,borderBottom:"1px solid rgba(255,255,255,.08)",background:"transparent",color:PEARL,textAlign:"left",display:"flex",justifyContent:"space-between"}}><span>{x}</span><ChevronRight size={16} color={MUTED}/></button>)}
    </div><Nav active="profile" onNav={setScreen}/></div></Shell>;
  }

  if(role==="partner"){
    const partnerNav=(s:Screen)=>setScreen(s);
    if(screen==="partnerHome") return <Shell><div style={{paddingBottom:80}}><TopBar title="Tableau de bord" right={<span style={{fontSize:9,color:GOLD}}>ESPACE PARTENAIRE</span>}/><div style={{padding:14}}>
      <p style={{margin:"0 0 12px",fontSize:12}}>Bonjour, <b>{displayName}</b></p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>{[["3","Annonces"],["84","Réservations"],["67","Présences"],["79,8 %","Taux de présence"]].map(x=><div key={x[1]} style={{padding:14,borderRadius:14,border:`1px solid ${BORDER}`,background:CARD}}><strong style={{fontSize:22}}>{x[0]}</strong><p style={{margin:"4px 0 0",fontSize:9,color:MUTED}}>{x[1]}</p></div>)}</div>
      <h3 style={{fontSize:14,margin:"20px 0 10px"}}>Événements en cours</h3><button onClick={()=>partnerNav("partnerReservations")} style={{width:"100%",padding:14,borderRadius:14,border:`1px solid ${BORDER}`,background:CARD,color:PEARL,textAlign:"left"}}><b>FUEGO</b><p style={{margin:"5px 0",fontSize:10,color:MUTED}}>42 / 50 réservations</p><div style={{height:5,borderRadius:999,background:"#262023"}}><div style={{width:"84%",height:"100%",borderRadius:999,background:GOLD}}/></div></button>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginTop:12}}><GoldButton onClick={()=>partnerNav("partnerAnnouncements")}>MES ANNONCES</GoldButton><GoldButton onClick={()=>partnerNav("partnerScan")}>SCANNER UN PASS</GoldButton></div>
      <button onClick={logout} style={{marginTop:18,width:"100%",border:0,background:"transparent",color:"#e06161"}}>Se déconnecter</button>
    </div></div></Shell>;
    if(screen==="partnerAnnouncements") return <Shell><div><TopBar title="Mes annonces" back onBack={()=>partnerNav("partnerHome")} right={<button style={{border:`1px solid ${GOLD}`,borderRadius:999,background:"transparent",color:GOLD,fontSize:10,padding:"5px 9px"}}><Plus size={12} style={{verticalAlign:"middle"}}/> Créer</button>}/><div style={{padding:14}}>{events.map(e=><div key={e.id} style={{padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,.08)"}}><b>{e.title}</b><p style={{margin:"4px 0",fontSize:10,color:MUTED}}>{e.date} · {e.venue}</p><span style={{fontSize:9,color:"#69c985"}}>Publié</span></div>)}</div></div></Shell>;
    if(screen==="partnerReservations") return <Shell><div><TopBar title="Réservations" back onBack={()=>partnerNav("partnerHome")}/><div style={{padding:14}}>{["Mélissa D.","Sabrina L.","Jade R.","Naïma S."].map((x,i)=><button onClick={()=>partnerNav("partnerScan")} key={x} style={{width:"100%",padding:"12px 0",border:0,borderBottom:"1px solid rgba(255,255,255,.08)",background:"transparent",color:PEARL,display:"flex",alignItems:"center",gap:10,textAlign:"left"}}><div style={{width:36,height:36,borderRadius:"50%",background:"#2a171c",display:"grid",placeItems:"center",color:GOLD}}>GC</div><div style={{flex:1}}><b style={{fontSize:12}}>{x}</b><p style={{margin:"3px 0",fontSize:9,color:MUTED}}>GC VIP · Réservé</p></div><QrCode size={18}/></button>)}</div></div></Shell>;
    if(screen==="partnerScan") return <Shell><div><TopBar title="Scanner un pass" back onBack={()=>partnerNav("partnerHome")}/><div style={{padding:16,textAlign:"center"}}><div style={{height:330,borderRadius:22,border:`1px solid ${GOLD}`,background:"linear-gradient(135deg,#271016,#0c090a)",display:"grid",placeItems:"center"}}><div><ScanLine size={70} color={GOLD}/><p style={{fontSize:11,color:MUTED}}>Placez le QR code dans le cadre</p></div></div><div style={{marginTop:14}}><GoldButton onClick={()=>alert("Pass de démonstration validé")}>SAISIE MANUELLE / TEST</GoldButton></div></div></div></Shell>;
    return <Shell><div><TopBar title="Mon compte partenaire" back onBack={()=>partnerNav("partnerHome")}/><div style={{padding:16}}><Building2 size={42} color={GOLD}/><h2>{displayName}</h2><p style={{color:MUTED,fontSize:11}}>Partenaire Golden Circle</p><button onClick={logout} style={{marginTop:20,border:0,background:"transparent",color:"#e06161"}}>Déconnexion</button></div></div></Shell>;
  }

  // ADMIN
  if(screen==="adminHome") return <Shell><div><TopBar title="Tableau de bord" right={<span style={{fontSize:9,color:GOLD}}>ADMIN</span>}/><div style={{padding:14}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>{[["184","Membres"],["23","VIP"],["9","Ambassadrices"],["12","Partenaires"],["6","Événements"],["31","Présences"]].map(x=><button key={x[1]} onClick={()=>setScreen(x[1]==="Membres"?"adminMembers":x[1]==="Partenaires"?"adminPartners":"adminReservations")} style={{padding:"12px 7px",borderRadius:12,border:`1px solid ${BORDER}`,background:CARD,color:PEARL}}><strong style={{fontSize:18}}>{x[0]}</strong><p style={{margin:"4px 0 0",fontSize:8,color:MUTED}}>{x[1]}</p></button>)}</div>
    <h3 style={{fontSize:14,margin:"20px 0 10px"}}>Accès rapides</h3>
    <div style={{display:"grid",gap:8}}>{[["Membres","adminMembers",Users],["Partenaires","adminPartners",Building2],["Annonces","adminAnnouncements",CalendarDays],["Réservations","adminReservations",TicketCheck],["Paramètres","adminSettings",Settings]].map(([l,s,I]:any)=><button key={l} onClick={()=>setScreen(s)} style={{padding:13,borderRadius:12,border:`1px solid ${BORDER}`,background:CARD,color:PEARL,display:"flex",alignItems:"center",gap:10,textAlign:"left"}}><I size={17} color={GOLD}/><span style={{flex:1}}>{l}</span><ChevronRight size={15}/></button>)}</div>
    <button onClick={logout} style={{marginTop:18,width:"100%",border:0,background:"transparent",color:"#e06161"}}>Déconnexion</button>
  </div></div></Shell>;

  const adminTitle = screen==="adminMembers"?"Membres":screen==="adminPartners"?"Partenaires":screen==="adminAnnouncements"?"Annonces":screen==="adminReservations"?"Réservations":"Paramètres";
  return <Shell><div><TopBar title={adminTitle} back onBack={()=>setScreen("adminHome")}/><div style={{padding:14}}>
    {screen==="adminSettings" ? ["Gestion des rôles","Niveaux membres","Catégories partenaires","Modèles d’annonces","Notifications","Sécurité","Journal d’activité"].map(x=><div key={x} style={{padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",justifyContent:"space-between"}}><span>{x}</span><ChevronRight size={15} color={MUTED}/></div>)
    : [1,2,3,4,5].map(i=><div key={i} style={{padding:"13px 0",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:10}}><div style={{width:36,height:36,borderRadius:10,background:"#241016",display:"grid",placeItems:"center",color:GOLD}}>{i}</div><div style={{flex:1}}><b style={{fontSize:12}}>{adminTitle} — élément {i}</b><p style={{margin:"3px 0",fontSize:9,color:MUTED}}>Donnée de démonstration</p></div><ChevronRight size={15}/></div>)}
  </div></div></Shell>;
}
