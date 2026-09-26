"use client";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Compass,
  Crown,
  Diamond,
  Home,
  MapPin,
  QrCode,
  User,
} from "lucide-react";

const GOLD = "#D1B464";
const BURGUNDY = "#4A192E";
const PEARL = "#FAFAF9";

const eventCards = [
  { title: "LA DESH", meta: "03 oct. · Club", tone: "linear-gradient(145deg,#241116,#5b1c33 60%,#12090d)" },
  { title: "SA PRETTY", meta: "10 oct. · Lounge", tone: "linear-gradient(145deg,#2b111f,#7d2345 55%,#14090e)" },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#070607", color: PEARL, fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
      <div
        style={{
          minHeight: "100vh",
          maxWidth: 430,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 92% 3%,rgba(209,180,100,.08),transparent 24%),radial-gradient(circle at 10% 88%,rgba(74,25,46,.22),transparent 34%),#090708",
          borderLeft: "1px solid rgba(209,180,100,.08)",
          borderRight: "1px solid rgba(209,180,100,.08)",
          paddingBottom: 92,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.22,
            background:
              "repeating-linear-gradient(122deg,transparent 0 18px,rgba(209,180,100,.035) 18px 19px,transparent 19px 38px)",
            maskImage: "linear-gradient(to bottom,black,transparent 38%)",
          }}
        />

        <header style={{ position: "relative", zIndex: 1, padding: "18px 18px 12px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", padding: 2, border: `1px solid ${GOLD}`, background: "#130b0f" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 28%,#6f4637 0,#2a1718 48%,#0f0a0b 100%)",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                color: GOLD,
                letterSpacing: 1,
              }}
            >
              GC
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 10, color: "#a89da1" }}>Bonjour,</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
              <h1 style={{ margin: 0, fontWeight: 400, fontSize: 20, lineHeight: 1.1 }}>Mélissa</h1>
              <span
                style={{
                  fontSize: 9,
                  padding: "4px 7px",
                  borderRadius: 999,
                  background: GOLD,
                  color: "#1c1115",
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                GC VIP <Diamond size={9} />
              </span>
            </div>
          </div>

          <button
            aria-label="Notifications"
            style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid rgba(209,180,100,.18)", background: "#0e0a0b", color: GOLD, display: "grid", placeItems: "center" }}
          >
            <Bell size={18} strokeWidth={1.5} />
          </button>
        </header>

        <section
          style={{
            position: "relative",
            zIndex: 1,
            margin: "8px 14px 22px",
            borderRadius: 22,
            padding: 1,
            background: "linear-gradient(135deg,#f2d47e,#8a5f20 48%,#f0ce6b)",
            boxShadow: "0 18px 40px rgba(0,0,0,.45),0 0 30px rgba(209,180,100,.06)",
          }}
        >
          <div
            style={{
              borderRadius: 21,
              overflow: "hidden",
              background: "linear-gradient(180deg,rgba(44,15,28,.95),rgba(12,7,9,.98))",
            }}
          >
            <div
              style={{
                padding: "16px 16px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(209,180,100,.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: GOLD }}>
                <Crown size={15} strokeWidth={1.5} />
                <span style={{ fontSize: 11, letterSpacing: 1.8, fontWeight: 700 }}>GOLDEN HOUR</span>
              </div>
              <span style={{ fontSize: 9, color: "#b8adb1" }}>ACTIVÉE</span>
            </div>

            <div
              style={{
                minHeight: 190,
                padding: "22px 16px 16px",
                position: "relative",
                background:
                  "linear-gradient(90deg,rgba(9,6,7,.88) 0%,rgba(9,6,7,.56) 58%,rgba(9,6,7,.25) 100%),url('/images/golden-circle-hero.png') center/cover",
              }}
            >
              <div style={{ maxWidth: 265 }}>
                <p style={{ margin: 0, fontSize: 9, letterSpacing: 1.5, color: GOLD }}>OPPORTUNITÉ PRIVÉE</p>
                <h2 style={{ margin: "7px 0 2px", fontSize: 31, lineHeight: 1, fontWeight: 500 }}>FUEGO</h2>
                <p style={{ margin: 0, fontSize: 13, color: "#f2ecee" }}>LA BOCA — Le Gosier</p>

                <div style={{ marginTop: 13, display: "flex", flexWrap: "wrap", gap: 10, color: "#c8bec1", fontSize: 11 }}>
                  <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
                    <CalendarDays size={12} color={GOLD} /> Sam. 03 oct.
                  </span>
                  <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
                    <Clock3 size={12} color={GOLD} /> 21h · 4h
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 9px",
                    borderRadius: 9,
                    background: "rgba(10,7,8,.68)",
                    border: "1px solid rgba(209,180,100,.25)",
                    color: "#f4e5b7",
                    fontSize: 11,
                  }}
                >
                  <Diamond size={12} color={GOLD} /> Privilège GC disponible
                </div>
              </div>
            </div>

            <div style={{ padding: "12px 14px 14px" }}>
              <button
                style={{
                  width: "100%",
                  border: 0,
                  borderRadius: 12,
                  padding: "13px 16px",
                  background: "linear-gradient(180deg,#e2c26b,#bd9340)",
                  color: "#1a1014",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: 0.5,
                }}
              >
                VOIR L’ÉVÉNEMENT
              </button>
            </div>
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 1, padding: "0 14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500, letterSpacing: 0.3 }}>ÉVÉNEMENTS À LA UNE</h3>
            <button style={{ border: 0, background: "transparent", color: GOLD, fontSize: 10, display: "inline-flex", alignItems: "center", gap: 2 }}>
              Tout voir <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {eventCards.map((event) => (
              <article key={event.title} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(209,180,100,.18)", background: "#0d0a0b" }}>
                <div
                  style={{
                    height: 116,
                    background: `${event.tone},url('/images/golden-circle-hero.png') center/cover`,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", right: 8, top: 8, padding: "4px 6px", borderRadius: 999, background: "rgba(8,6,7,.72)", color: GOLD, fontSize: 8, border: "1px solid rgba(209,180,100,.25)" }}>
                    GC
                  </span>
                </div>
                <div style={{ padding: "10px 10px 11px" }}>
                  <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{event.title}</h4>
                  <p style={{ margin: "4px 0 0", fontSize: 9, color: "#968b8f" }}>{event.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 1, margin: "18px 14px 0", padding: "14px 15px", borderRadius: 16, border: "1px solid rgba(209,180,100,.16)", background: "linear-gradient(145deg,rgba(74,25,46,.28),rgba(11,8,9,.96))", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", border: "1px solid rgba(209,180,100,.28)", color: GOLD }}>
            <QrCode size={22} strokeWidth={1.4} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 10, color: "#a99ea2" }}>Votre accès personnel</p>
            <p style={{ margin: "3px 0 0", fontSize: 13, fontWeight: 500 }}>Golden Pass</p>
          </div>
          <ChevronRight size={18} color={GOLD} />
        </section>

        <nav
          style={{
            position: "fixed",
            left: "50%",
            bottom: 0,
            transform: "translateX(-50%)",
            width: "min(430px,100%)",
            height: 72,
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            alignItems: "center",
            padding: "0 8px env(safe-area-inset-bottom)",
            background: "rgba(9,7,8,.96)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(209,180,100,.16)",
            zIndex: 20,
          }}
        >
          {[
            { label: "Accueil", Icon: Home, active: true },
            { label: "Explorer", Icon: Compass },
            { label: "Pass", Icon: QrCode },
            { label: "Notifications", Icon: Bell },
            { label: "Profil", Icon: User },
          ].map(({ label, Icon, active }) => (
            <button
              key={label}
              style={{ border: 0, background: "transparent", color: active ? GOLD : "#7f7579", display: "grid", placeItems: "center", gap: 4, fontSize: 8, padding: "7px 0" }}
            >
              <Icon size={17} strokeWidth={active ? 1.8 : 1.4} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
