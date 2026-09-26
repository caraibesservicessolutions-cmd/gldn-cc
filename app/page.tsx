import Link from "next/link";

const cards = [
  { tag: "GOLDEN HOUR", title: "Opportunités privées", text: "Accès limité, conditions et privilèges visibles selon votre profil." },
  { tag: "À LA UNE", title: "Explorer", text: "Événements, nightlife, restaurants, mode, bien-être et expériences partenaires." },
  { tag: "COMMUNAUTÉ", title: "Je veux cet événement", text: "Proposez un lieu ou un événement. Golden Circle transforme la demande en opportunité." },
];

export default function Home() {
  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(circle at 50% 0%,#4A192E 0,#160b11 42%,#090708 100%)",color:"#FAFAF9",fontFamily:"Helvetica Neue,Arial,sans-serif"}}>
      <div style={{maxWidth:480,margin:"0 auto",padding:"28px 20px 110px"}}>
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <img src="/golden-circle-logo-transparent.png" alt="Golden Circle" style={{width:132,height:"auto"}}/>
          <span style={{fontSize:11,letterSpacing:2,color:"#D1B464"}}>V0 · TEST</span>
        </header>
        <section style={{padding:"54px 0 30px"}}>
          <p style={{fontSize:11,letterSpacing:3,color:"#D1B464",margin:0}}>L'ACCÈS AUX PRIVILÈGES</p>
          <h1 style={{fontWeight:300,fontSize:40,lineHeight:1.05,margin:"14px 0"}}>Votre cercle.<br/>Vos accès.</h1>
          <p style={{color:"#d9d2d5",lineHeight:1.6}}>La première version test de l'expérience Golden Circle Caraïbes.</p>
          <div style={{display:"flex",gap:10,marginTop:26}}>
            <Link href="/fr" style={{background:"#D1B464",color:"#241018",padding:"13px 18px",borderRadius:999,textDecoration:"none",fontWeight:600}}>Entrer dans la V0</Link>
            <Link href="/fr/language" style={{border:"1px solid #D1B46466",color:"#FAFAF9",padding:"13px 18px",borderRadius:999,textDecoration:"none"}}>Langues</Link>
          </div>
        </section>
        <div style={{height:1,background:"#D1B46455",margin:"12px 0 28px"}}/>
        <section style={{display:"grid",gap:14}}>
          {cards.map((c)=>(
            <article key={c.tag} style={{border:"1px solid #D1B46438",borderRadius:22,padding:22,background:"rgba(74,25,46,.22)",boxShadow:"0 18px 50px rgba(0,0,0,.18)"}}>
              <p style={{fontSize:10,letterSpacing:2.4,color:"#D1B464",margin:"0 0 10px"}}>{c.tag}</p>
              <h2 style={{fontSize:22,fontWeight:400,margin:"0 0 8px"}}>{c.title}</h2>
              <p style={{fontSize:14,color:"#d7ced2",lineHeight:1.55,margin:0}}>{c.text}</p>
            </article>
          ))}
        </section>
        <footer style={{textAlign:"center",paddingTop:48,color:"#D1B464",fontSize:12}}>@gld.crcl</footer>
      </div>
    </main>
  );
}