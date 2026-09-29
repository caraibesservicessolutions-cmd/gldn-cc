"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { QRCodeSVG } from "qrcode.react";
import {
  BarChart3, Bell, Building2, CalendarDays, ChevronLeft, ChevronRight, CircleHelp,
  Compass, Crown, FileText, Home, LogOut, MapPin, Plus, QrCode, Search, Settings,
  ShieldCheck, ScanLine, TicketCheck, User, Users
} from "lucide-react";

const GOLD = "#D1B464";
const PEARL = "#FAFAF9";
const MUTED = "#9D9297";
const CARD = "#0E0A0C";
const BORDER = "rgba(209,180,100,.20)";
const SUPABASE_URL = "https://jnknwwfazfwqjlnhpzkm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_VTVS6BQJ1cUREwkukTTQjg_HNuWIBv5";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

type Role = "member" | "partner" | "admin";
type Screen =
  | "home" | "explorer" | "detail" | "reservation" | "pass" | "notifications" | "profile"
  | "profileInfo" | "profileTier" | "profilePrefs" | "profileReservations" | "profileBenefits"
  | "help" | "requests"
  | "partnerHome" | "partnerAnnouncements" | "partnerReservations" | "partnerScan" | "partnerProfile"
  | "adminHome" | "adminMembers" | "adminPartners" | "adminAnnouncements" | "adminReservations"
  | "adminRequests" | "adminSettings";

function tierLabel(v: string | null | undefined) {
  if (v === "gc_vip") return "GC VIP";
  if (v === "gc_ambassador") return "GC Ambassadrice";
  return "GC";
}

function fmtDate(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

function normalizeError(error: any) {
  const msg = String(error?.message || error || "Une erreur est survenue.");
  const map: Record<string, string> = {
    AUTH_REQUIRED: "Connexion requise.",
    MEMBERSHIP_NOT_APPROVED: "Votre adhésion Golden Circle n’est pas active.",
    ANNOUNCEMENT_NOT_FOUND: "Cette annonce n’existe plus.",
    ANNOUNCEMENT_NOT_BOOKABLE: "Cette annonce n’est pas ouverte aux réservations.",
    RESERVATIONS_DISABLED: "Les réservations sont désactivées.",
    BOOKING_CLOSED: "La période de réservation est terminée.",
    NOT_ELIGIBLE: "Vous n’êtes pas éligible à cette activation.",
    INVALID_PARTY_SIZE: "Nombre de personnes invalide.",
    INDIVIDUAL_ONLY: "Cette réservation est individuelle.",
    GROUP_TOO_SMALL: "Le groupe est trop petit pour cette offre.",
    GROUP_TOO_LARGE: "Le groupe dépasse la taille autorisée.",
    ALREADY_RESERVED: "Vous avez déjà une réservation active.",
    CAPACITY_EXCEEDED: "Le quota disponible est insuffisant.",
    CANCELLATION_DISABLED: "L’annulation n’est pas autorisée.",
    CANNOT_CANCEL: "Cette réservation ne peut plus être annulée.",
    PASS_INVALID: "Pass invalide.",
    SCAN_NOT_ALLOWED: "Vous n’êtes pas autorisé à scanner ce pass.",
    PASS_NOT_ACTIVE: "Ce pass n’est plus actif.",
    TOO_EARLY: "Le check-in n’est pas encore ouvert.",
    CHECK_IN_REQUIRED: "Le membre doit être enregistré avant consommation de l’avantage.",
    BENEFIT_LIMIT_EXCEEDED: "La quantité disponible est déjà consommée."
  };
  const key = Object.keys(map).find((k) => msg.includes(k));
  return key ? map[key] : msg;
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main style={{ minHeight: "100vh", background: "#070607", color: PEARL, fontFamily: "Helvetica Neue,Arial,sans-serif" }}>
      <div style={{
        width: "100%", maxWidth: wide ? 1280 : 430, minHeight: "100vh", margin: "0 auto", position: "relative",
        background: "radial-gradient(circle at 96% 2%,rgba(209,180,100,.07),transparent 22%),radial-gradient(circle at 5% 88%,rgba(74,25,46,.20),transparent 34%),#090708",
        borderLeft: "1px solid rgba(209,180,100,.08)", borderRight: "1px solid rgba(209,180,100,.08)"
      }}>{children}</div>
    </main>
  );
}

function TopBar({ title, back, onBack, right }: { title: string; back?: boolean; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <header style={{ padding: "18px 18px 13px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(209,180,100,.10)" }}>
      {back ? <button onClick={onBack} style={iconButton}><ChevronLeft size={20} /></button> : null}
      <h1 style={{ margin: 0, flex: 1, fontSize: 21, fontWeight: 500 }}>{title}</h1>
      {right}
    </header>
  );
}

const iconButton: React.CSSProperties = { border: 0, background: "transparent", color: GOLD, padding: 6 };
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", padding: "12px 13px", borderRadius: 11,
  border: "1px solid rgba(255,255,255,.13)", background: "#111012", color: PEARL, outline: "none"
};
const labelStyle: React.CSSProperties = { fontSize: 9, color: MUTED, display: "grid", gap: 6 };

function GoldButton({ children, onClick, disabled = false }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return <button disabled={disabled} onClick={onClick} style={{
    width: "100%", border: 0, borderRadius: 12, padding: "13px 16px",
    background: disabled ? "#5F5232" : "linear-gradient(180deg,#E2C26B,#BD9340)",
    color: "#1A1014", fontWeight: 800, fontSize: 11, letterSpacing: .4, opacity: disabled ? .65 : 1
  }}>{children}</button>;
}

function GhostButton({ children, onClick, danger = false }: { children: React.ReactNode; onClick?: () => void; danger?: boolean }) {
  return <button onClick={onClick} style={{
    border: "1px solid " + (danger ? "rgba(224,97,97,.35)" : BORDER), background: "transparent",
    color: danger ? "#E06161" : GOLD, borderRadius: 10, padding: "9px 11px", fontSize: 9
  }}>{children}</button>;
}

function Empty({ text }: { text: string }) {
  return <div style={{ padding: "24px 14px", border: "1px dashed " + BORDER, borderRadius: 14, color: MUTED, fontSize: 11, textAlign: "center" }}>{text}</div>;
}

function MemberNav({ active, go }: { active: Screen; go: (s: Screen) => void }) {
  const items: [string, Screen, any][] = [
    ["Accueil", "home", Home], ["Explorer", "explorer", Compass], ["Pass", "pass", QrCode],
    ["Notifications", "notifications", Bell], ["Profil", "profile", User]
  ];
  return (
    <nav style={{
      position: "fixed", left: "50%", bottom: 0, transform: "translateX(-50%)", width: "min(430px,100%)",
      height: 72, display: "grid", gridTemplateColumns: "repeat(5,1fr)", zIndex: 40,
      background: "rgba(9,7,8,.97)", backdropFilter: "blur(16px)", borderTop: "1px solid " + BORDER
    }}>
      {items.map(([label, screen, Icon]) => (
        <button key={label} onClick={() => go(screen)} style={{
          border: 0, background: "transparent", color: active === screen ? GOLD : "#766D71",
          display: "grid", placeItems: "center", padding: "8px 0", fontSize: 8
        }}>
          <Icon size={17} strokeWidth={active === screen ? 1.9 : 1.4} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function EventVisual({ event, compact = false }: { event: any; compact?: boolean }) {
  const bg = event?.flyer_url
    ? "linear-gradient(to top,rgba(7,5,6,.92),rgba(7,5,6,.16)),url('" + event.flyer_url + "') center/cover"
    : "linear-gradient(145deg,#241116,#5B1C33 58%,#0D080A)";
  return (
    <div style={{ height: compact ? 115 : 220, borderRadius: compact ? 14 : 0, background: bg, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 16, bottom: compact ? 11 : 16, right: 16 }}>
        {!compact && <p style={{ margin: 0, color: GOLD, fontSize: 9, letterSpacing: 1.6 }}>{event?.type === "golden_hour" ? "GOLDEN HOUR" : "GOLDEN CIRCLE"}</p>}
        <h2 style={{ margin: compact ? 0 : "5px 0 2px", fontSize: compact ? 15 : 29, fontWeight: 500 }}>{event?.title || "Événement"}</h2>
        {!compact && <p style={{ margin: 0, fontSize: 11 }}>{event?.venue_name || event?.territory || ""}</p>}
      </div>
    </div>
  );
}

function DataTable({ columns, rows, empty = "Aucune donnée." }: { columns: { key: string; label: string; render?: (row: any) => React.ReactNode }[]; rows: any[]; empty?: string }) {
  if (!rows.length) return <Empty text={empty} />;
  return (
    <div style={{ overflowX: "auto", border: "1px solid " + BORDER, borderRadius: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760, fontSize: 11 }}>
        <thead>
          <tr style={{ background: "rgba(209,180,100,.08)" }}>
            {columns.map((c) => <th key={c.key} style={{ textAlign: "left", padding: "11px 12px", color: GOLD, fontWeight: 600 }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} style={{ borderTop: "1px solid rgba(255,255,255,.07)" }}>
              {columns.map((c) => <td key={c.key} style={{ padding: "11px 12px", verticalAlign: "top" }}>{c.render ? c.render(row) : String(row[c.key] ?? "—")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "18px 0 10px" }}>
    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{title}</h3>{action}
  </div>;
}

export default function GoldenCircleApp() {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState<Role>("member");
  const [entryMode, setEntryMode] = useState<Role>("member");
  const [screen, setScreen] = useState<Screen>("home");
  const [profile, setProfile] = useState<any>(null);
  const [sessionUser, setSessionUser] = useState<any>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authInfo, setAuthInfo] = useState("");
  const [signupMode, setSignupMode] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [signup, setSignup] = useState({
    first_name: "", last_name: "", phone: "", city: "", territory: "", instagram: "",
    confirm_18: false, confirm_accuracy: false, accept_rules: false, accept_privacy: false,
    gc_news: false, partner_offers: false, whatsapp_sms: false, email_marketing: false, image_rights: false
  });

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [consents, setConsents] = useState<any[]>([]);
  const [engagement, setEngagement] = useState<any[]>([]);
  const [entitlements, setEntitlements] = useState<any[]>([]);
  const [interests, setInterests] = useState<any[]>([]);
  const [communityRequests, setCommunityRequests] = useState<any[]>([]);
  const [selectedAnn, setSelectedAnn] = useState<any>(null);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [availability, setAvailability] = useState<any>(null);
  const [partySize, setPartySize] = useState(1);
  const [search, setSearch] = useState("");
  const [memberError, setMemberError] = useState("");

  const [partnerMembership, setPartnerMembership] = useState<any>(null);
  const [partnerOrg, setPartnerOrg] = useState<any>(null);
  const [partnerAnnouncements, setPartnerAnnouncements] = useState<any[]>([]);
  const [partnerReservations, setPartnerReservations] = useState<any[]>([]);
  const [scanToken, setScanToken] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanError, setScanError] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<any>(null);

  const [adminProfiles, setAdminProfiles] = useState<any[]>([]);
  const [adminPartners, setAdminPartners] = useState<any[]>([]);
  const [adminAnnouncements, setAdminAnnouncements] = useState<any[]>([]);
  const [adminReservations, setAdminReservations] = useState<any[]>([]);
  const [adminLogs, setAdminLogs] = useState<any[]>([]);
  const [adminRequests, setAdminRequests] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [adminSearch, setAdminSearch] = useState("");

  const [announcementForm, setAnnouncementForm] = useState<any>({
    type: "event", title: "", short_description: "", territory: "", venue_name: "", address: "",
    starts_at: "", ends_at: "", booking_deadline: "", arrival_deadline: "", cancellation_deadline: "",
    capacity: 10, group_min: 1, group_max: 1, reservation_mode: "both", flyer_url: "",
    primary_category_id: "", target_tier: "", benefit_label: "", benefit_description: ""
  });
  const [partnerForm, setPartnerForm] = useState<any>({ name: "", partner_type: "", territory: "", city: "", owner_email: "" });
  const [requestForm, setRequestForm] = useState<any>({ request_type: "event", name: "", external_url: "", instagram: "", territory: "", event_date: "", description: "" });

  const displayName = useMemo(() => {
    const n = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim();
    return n || (role === "admin" ? "Administration" : role === "partner" ? partnerOrg?.name || "Partenaire" : "Membre GC");
  }, [profile, role, partnerOrg]);

  const engagementPoints = useMemo(() => engagement.reduce((s, x) => s + Number(x.points || 0), 0), [engagement]);

  async function hydrate(user: any) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (error || !data) {
      setAuthError("Profil Golden Circle introuvable.");
      return;
    }
    setSessionUser(user);
    setProfile(data);
    setRole(data.role as Role);
    setLogged(true);
    setScreen(data.role === "admin" ? "adminHome" : data.role === "partner" ? "partnerHome" : "home");
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) hydrate(data.session.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") setRecoveryMode(true);
      if (session?.user) hydrate(session.user);
      else if (event === "SIGNED_OUT") {
        setLogged(false); setProfile(null); setSessionUser(null);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!logged || !profile) return;
    if (role === "member") loadMemberData();
    if (role === "partner") loadPartnerData();
    if (role === "admin") loadAdminData();
  }, [logged, role, profile?.id]);

  useEffect(() => {
    if (selectedAnn?.id) {
      supabase.rpc("get_announcement_availability", { p_announcement_id: selectedAnn.id }).then(({ data }) => setAvailability(data?.[0] || null));
    } else setAvailability(null);
  }, [selectedAnn?.id]);

  async function login() {
    setAuthBusy(true); setAuthError(""); setAuthInfo("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setAuthError(normalizeError(error));
    else if (data.user) await hydrate(data.user);
    setAuthBusy(false);
  }

  async function createAccount() {
    setAuthError(""); setAuthInfo("");
    const required = signup.first_name && signup.last_name && signup.phone && signup.city && signup.territory;
    if (!required) return setAuthError("Complétez les informations obligatoires.");
    if (!signup.confirm_18 || !signup.confirm_accuracy || !signup.accept_rules || !signup.accept_privacy) {
      return setAuthError("Les confirmations obligatoires doivent être acceptées.");
    }
    setAuthBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(), password,
      options: { data: {
        first_name: signup.first_name.trim(), last_name: signup.last_name.trim(), phone: signup.phone.trim(),
        city: signup.city.trim(), territory: signup.territory.trim(), instagram: signup.instagram.trim(),
        confirm_18: signup.confirm_18, confirm_accuracy: signup.confirm_accuracy,
        accept_rules: signup.accept_rules, accept_privacy: signup.accept_privacy,
        marketing_news: signup.gc_news, partner_offers: signup.partner_offers,
        whatsapp_sms: signup.whatsapp_sms, email_marketing: signup.email_marketing, image_rights: signup.image_rights
      } }
    });
    if (error) setAuthError(normalizeError(error));
    else if (data.session?.user) await hydrate(data.session.user);
    else {
      setSignupMode(false);
      setAuthInfo("Compte créé. Confirmez votre adresse e-mail. Votre demande restera en attente de validation Golden Circle.");
    }
    setAuthBusy(false);
  }

  async function resetPasswordRequest() {
    if (!email.trim()) return setAuthError("Saisissez d’abord votre adresse e-mail.");
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: window.location.origin });
    if (error) setAuthError(normalizeError(error));
    else setAuthInfo("Un lien de réinitialisation a été envoyé.");
  }

  async function setRecoveredPassword() {
    if (newPassword.length < 8) return setAuthError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setAuthError(normalizeError(error));
    else { setRecoveryMode(false); setAuthInfo("Mot de passe mis à jour."); }
  }

  async function logout() {
    stopCamera();
    await supabase.auth.signOut();
    setLogged(false); setProfile(null); setSessionUser(null); setEmail(""); setPassword(""); setScreen("home");
  }

  async function loadMemberData() {
    const [a, r, n, c, e, en, i, cr, cats] = await Promise.all([
      supabase.from("announcements").select("*,privileges(*)").order("starts_at", { ascending: true }),
      supabase.from("reservations").select("*,announcements(id,title,venue_name,starts_at,arrival_deadline,cancellation_allowed,cancellation_deadline),reservation_benefits(*)").order("created_at", { ascending: false }),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }),
      supabase.from("consents").select("*").eq("user_id", profile.id),
      supabase.from("engagement_ledger").select("*").eq("user_id", profile.id).order("created_at", { ascending: false }),
      supabase.from("entitlements").select("*").eq("user_id", profile.id).order("starts_at", { ascending: false }),
      supabase.from("interests").select("*").eq("user_id", profile.id),
      supabase.from("community_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order", { ascending: true })
    ]);
    setAnnouncements(a.data || []); setReservations(r.data || []); setNotifications(n.data || []);
    setConsents(c.data || []); setEngagement(e.data || []); setEntitlements(en.data || []);
    setInterests(i.data || []); setCommunityRequests(cr.data || []); setCategories(cats.data || []);
    if (!selectedReservation && r.data?.length) setSelectedReservation(r.data.find((x: any) => ["confirmed", "checked_in"].includes(x.status)) || r.data[0]);
  }

  async function loadPartnerData() {
    const { data: pm } = await supabase.from("partner_members").select("*,partners(*)").eq("user_id", profile.id).eq("active", true).maybeSingle();
    setPartnerMembership(pm || null);
    const org = pm?.partners || null;
    setPartnerOrg(org);
    if (!org?.id) { setPartnerAnnouncements([]); setPartnerReservations([]); return; }
    const { data: pa } = await supabase.from("announcements").select("*").eq("partner_id", org.id).order("created_at", { ascending: false });
    setPartnerAnnouncements(pa || []);
    const ids = (pa || []).map((x: any) => x.id);
    if (ids.length) {
      const { data: pr } = await supabase.from("reservations").select("*,announcements(id,title,starts_at)").in("announcement_id", ids).order("created_at", { ascending: false });
      setPartnerReservations(pr || []);
    } else setPartnerReservations([]);
  }

  async function loadAdminData() {
    const [p, partners, anns, res, logs, reqs, cats] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("partners").select("*").order("created_at", { ascending: false }),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("reservations").select("*,announcements(id,title,venue_name,starts_at)").order("created_at", { ascending: false }),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(250),
      supabase.from("community_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("sort_order", { ascending: true })
    ]);
    setAdminProfiles(p.data || []); setAdminPartners(partners.data || []); setAdminAnnouncements(anns.data || []);
    setAdminReservations(res.data || []); setAdminLogs(logs.data || []); setAdminRequests(reqs.data || []); setCategories(cats.data || []);
  }

  async function refreshProfile() {
    if (!profile?.id) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", profile.id).single();
    if (data) setProfile(data);
  }

  async function saveProfileInfo() {
    setMemberError("");
    const { error } = await supabase.from("profiles").update({
      first_name: profile.first_name, last_name: profile.last_name, phone: profile.phone,
      city: profile.city, territory: profile.territory, instagram: profile.instagram || null, updated_at: new Date().toISOString()
    }).eq("id", profile.id);
    if (error) setMemberError(normalizeError(error));
    else await refreshProfile();
  }

  function consentValue(type: string) {
    return Boolean(consents.find((x) => x.consent_type === type && x.status));
  }

  async function setConsent(type: string, status: boolean) {
    const now = new Date().toISOString();
    const row = {
      user_id: profile.id, consent_type: type, status, policy_version: "v1.0",
      granted_at: status ? now : null, withdrawn_at: status ? null : now, source: "profile_preferences"
    };
    const { error } = await supabase.from("consents").upsert(row, { onConflict: "user_id,consent_type,policy_version" });
    if (error) setMemberError(normalizeError(error));
    else {
      const { data } = await supabase.from("consents").select("*").eq("user_id", profile.id);
      setConsents(data || []);
    }
  }

  async function toggleInterest(ann: any) {
    const existing = interests.find((x) => x.announcement_id === ann.id);
    if (existing) await supabase.from("interests").delete().eq("id", existing.id);
    else await supabase.from("interests").insert({ announcement_id: ann.id, user_id: profile.id, level: "interested" });
    const { data } = await supabase.from("interests").select("*").eq("user_id", profile.id);
    setInterests(data || []);
  }

  async function reserveSelected() {
    if (!selectedAnn?.id) return;
    setMemberError("");
    const { data, error } = await supabase.rpc("create_reservation", { p_announcement_id: selectedAnn.id, p_party_size: partySize });
    if (error) return setMemberError(normalizeError(error));
    await loadMemberData();
    const created = data?.[0];
    if (created) {
      const { data: r } = await supabase.from("reservations").select("*,announcements(id,title,venue_name,starts_at,arrival_deadline),reservation_benefits(*)").eq("id", created.reservation_id).single();
      if (r) setSelectedReservation(r);
    }
    setScreen("pass");
  }

  async function cancelReservation(id: string) {
    const { error } = await supabase.rpc("cancel_reservation", { p_reservation_id: id });
    if (error) setMemberError(normalizeError(error));
    else await loadMemberData();
  }

  async function createCommunityRequest() {
    if (!requestForm.name.trim()) return setMemberError("Donnez un nom à votre demande.");
    const payload = {
      created_by: profile.id, request_type: requestForm.request_type, name: requestForm.name.trim(),
      external_url: requestForm.external_url || null, instagram: requestForm.instagram || null,
      territory: requestForm.territory || profile.territory || null, event_date: requestForm.event_date || null,
      description: requestForm.description || null, status: "new"
    };
    const { error } = await supabase.from("community_requests").insert(payload);
    if (error) setMemberError(normalizeError(error));
    else {
      setRequestForm({ request_type: "event", name: "", external_url: "", instagram: "", territory: "", event_date: "", description: "" });
      const { data } = await supabase.from("community_requests").select("*").order("created_at", { ascending: false });
      setCommunityRequests(data || []);
    }
  }

  async function markNotificationRead(id: string) {
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    setNotifications((v) => v.map((n) => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
  }

  async function partnerCreateAnnouncement() {
    if (!partnerOrg?.id || !sessionUser?.id || !announcementForm.title.trim()) return;
    const payload: any = {
      created_by: sessionUser.id, partner_id: partnerOrg.id, type: announcementForm.type,
      status: "pending_validation", title: announcementForm.title.trim(),
      short_description: announcementForm.short_description || null, territory: announcementForm.territory || partnerOrg.territory || null,
      venue_name: announcementForm.venue_name || null, address: announcementForm.address || null,
      starts_at: announcementForm.starts_at || null, ends_at: announcementForm.ends_at || null,
      booking_deadline: announcementForm.booking_deadline || null, arrival_deadline: announcementForm.arrival_deadline || null,
      cancellation_deadline: announcementForm.cancellation_deadline || null, capacity: Number(announcementForm.capacity) || null,
      group_min: Number(announcementForm.group_min) || null, group_max: Number(announcementForm.group_max) || null,
      reservation_mode: announcementForm.reservation_mode, reservations_enabled: true, waitlist_enabled: false,
      primary_category_id: announcementForm.primary_category_id || null, flyer_url: announcementForm.flyer_url || null,
      visibility: "private"
    };
    const { data, error } = await supabase.from("announcements").insert(payload).select("*").single();
    if (error) return setScanError(normalizeError(error));
    if (data && announcementForm.target_tier) {
      await supabase.from("audience_rules").insert({ announcement_id: data.id, audience_type: "member", membership_tier: announcementForm.target_tier });
    }
    if (data && announcementForm.benefit_label) {
      await supabase.from("privileges").insert({
        announcement_id: data.id, membership_tier: announcementForm.target_tier || null, audience_type: "member",
        benefit_type: "custom", label: announcementForm.benefit_label, description: announcementForm.benefit_description || null,
        quantity: 1, visibility: "eligible"
      });
    }
    setAnnouncementForm((v: any) => ({ ...v, title: "", short_description: "", benefit_label: "", benefit_description: "" }));
    await loadPartnerData();
  }

  async function scanPass(token?: string) {
    const value = (token || scanToken).trim();
    if (!value) return;
    setScanError(""); setScanResult(null);
    const { data, error } = await supabase.rpc("scan_reservation_pass", { p_token: value });
    if (error) setScanError(normalizeError(error));
    else setScanResult(data?.[0] || null);
  }

  async function consumeBenefit(id: string) {
    const { data, error } = await supabase.rpc("consume_reservation_benefit", { p_benefit_id: id, p_quantity: 1 });
    if (error) setScanError(normalizeError(error));
    else setScanResult((r: any) => ({ ...r, benefits: (r.benefits || []).map((b: any) => b.id === id ? data : b) }));
  }

  async function startCamera() {
    setScanError("");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Caméra indisponible sur ce navigateur.");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      const Detector = (window as any).BarcodeDetector;
      if (!Detector) {
        setScanError("Le scan automatique n’est pas disponible sur ce navigateur. Utilisez la saisie manuelle du token.");
        return;
      }
      const detector = new Detector({ formats: ["qr_code"] });
      scanTimerRef.current = setInterval(async () => {
        try {
          if (!videoRef.current) return;
          const codes = await detector.detect(videoRef.current);
          const raw = codes?.[0]?.rawValue;
          if (raw) {
            setScanToken(raw);
            stopCamera();
            await scanPass(raw);
          }
        } catch {}
      }, 700);
    } catch (e) { setScanError(normalizeError(e)); }
  }

  function stopCamera() {
    if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    scanTimerRef.current = null;
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    cameraStreamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function adminDecision(member: any, status: "approved" | "rejected" | "suspended", tier?: string) {
    const payload: any = { membership_status: status, updated_at: new Date().toISOString() };
    if (tier) payload.membership_tier = tier;
    const { error } = await supabase.from("profiles").update(payload).eq("id", member.id);
    if (error) setAuthError(normalizeError(error));
    else await loadAdminData();
  }

  async function adminCreatePartner() {
    if (!partnerForm.name.trim()) return setAuthError("Nom partenaire requis.");
    const slug = partnerForm.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString().slice(-5);
    const { data: org, error } = await supabase.from("partners").insert({
      name: partnerForm.name.trim(), slug, partner_type: partnerForm.partner_type || "other",
      territory: partnerForm.territory || null, city: partnerForm.city || null,
      verification_status: "pending", publication_permission: "approval_required", account_status: "active"
    }).select("*").single();
    if (error) return setAuthError(normalizeError(error));
    if (partnerForm.owner_email.trim()) {
      const { data: owner } = await supabase.from("profiles").select("*").ilike("email", partnerForm.owner_email.trim()).maybeSingle();
      if (owner) {
        await supabase.from("profiles").update({ role: "partner", membership_tier: null, membership_status: null, updated_at: new Date().toISOString() }).eq("id", owner.id);
        await supabase.from("partner_members").upsert({ partner_id: org.id, user_id: owner.id, role: "owner", active: true });
      } else setAuthInfo("Partenaire créé, mais aucun compte utilisateur ne correspond à l’e-mail du responsable.");
    }
    setPartnerForm({ name: "", partner_type: "", territory: "", city: "", owner_email: "" });
    await loadAdminData();
  }

  async function adminCreateAnnouncement() {
    if (!sessionUser?.id || !announcementForm.title.trim()) return setAuthError("Titre requis.");
    const payload: any = {
      created_by: sessionUser.id, partner_id: announcementForm.partner_id || null, type: announcementForm.type,
      status: "scheduled", title: announcementForm.title.trim(), short_description: announcementForm.short_description || null,
      territory: announcementForm.territory || null, venue_name: announcementForm.venue_name || null, address: announcementForm.address || null,
      starts_at: announcementForm.starts_at || null, ends_at: announcementForm.ends_at || null,
      booking_deadline: announcementForm.booking_deadline || null, arrival_deadline: announcementForm.arrival_deadline || null,
      cancellation_deadline: announcementForm.cancellation_deadline || null, capacity: Number(announcementForm.capacity) || null,
      group_min: Number(announcementForm.group_min) || null, group_max: Number(announcementForm.group_max) || null,
      reservation_mode: announcementForm.reservation_mode, reservations_enabled: true, waitlist_enabled: false,
      primary_category_id: announcementForm.primary_category_id || null, flyer_url: announcementForm.flyer_url || null,
      visibility: "private"
    };
    const { data, error } = await supabase.from("announcements").insert(payload).select("*").single();
    if (error) return setAuthError(normalizeError(error));
    if (data && announcementForm.target_tier) {
      await supabase.from("audience_rules").insert({ announcement_id: data.id, audience_type: "member", membership_tier: announcementForm.target_tier });
    }
    if (data && announcementForm.benefit_label) {
      await supabase.from("privileges").insert({
        announcement_id: data.id, membership_tier: announcementForm.target_tier || null, audience_type: "member",
        benefit_type: "custom", label: announcementForm.benefit_label, description: announcementForm.benefit_description || null,
        quantity: 1, visibility: "eligible"
      });
    }
    setAnnouncementForm((v: any) => ({ ...v, title: "", short_description: "", benefit_label: "", benefit_description: "" }));
    await loadAdminData();
  }

  async function setAnnouncementStatus(id: string, status: string) {
    const { error } = await supabase.from("announcements").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) setAuthError(normalizeError(error));
    else await loadAdminData();
  }

  async function setRequestStatus(id: string, status: string) {
    const { error } = await supabase.from("community_requests").update({ status }).eq("id", id);
    if (error) setAuthError(normalizeError(error));
    else await loadAdminData();
  }

  if (recoveryMode) return (
    <Shell>
      <div style={{ minHeight: "100vh", padding: 24, display: "grid", alignItems: "center" }}>
        <div style={{ border: "1px solid " + BORDER, borderRadius: 22, padding: 18 }}>
          <h1 style={{ fontSize: 22 }}>Nouveau mot de passe</h1>
          <input style={inputStyle} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe" />
          <div style={{ marginTop: 12 }}><GoldButton onClick={setRecoveredPassword}>ENREGISTRER</GoldButton></div>
          {authError && <p style={{ color: "#E78686", fontSize: 10 }}>{authError}</p>}
        </div>
      </div>
    </Shell>
  );

  if (!logged) return (
    <Shell>
      <div style={{ minHeight: "100vh", padding: "28px 20px", display: "grid", alignItems: "center" }}>
        <div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <img src="/brand/golden-circle-emblem-transparent.png" alt="Golden Circle" style={{ width: 140, maxWidth: "50%" }} />
            <h1 style={{ margin: "7px 0 2px", fontSize: 23, fontWeight: 500, letterSpacing: 1 }}>GOLDEN CIRCLE</h1>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: 2, color: GOLD }}>CARAÏBES</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 10 }}>
            {([["member", "Membre"], ["partner", "Partenaire"], ["admin", "Admin"]] as [Role, string][]).map(([r, label]) => (
              <button key={r} onClick={() => { setEntryMode(r); setSignupMode(false); setAuthError(""); }} style={{
                padding: 10, borderRadius: 11, border: "1px solid " + (entryMode === r ? GOLD : BORDER),
                background: entryMode === r ? "rgba(209,180,100,.12)" : "rgba(10,7,8,.8)", color: entryMode === r ? GOLD : PEARL, fontSize: 9
              }}>{label}</button>
            ))}
          </div>
          <div style={{ border: "1px solid " + BORDER, borderRadius: 22, padding: 18, background: "rgba(10,7,8,.92)" }}>
            <p style={{ margin: "0 0 14px", fontSize: 10, color: GOLD, letterSpacing: 1.5 }}>
              {entryMode === "member" ? "ESPACE MEMBRE" : entryMode === "partner" ? "ESPACE PARTENAIRE" : "ADMINISTRATION"}
            </p>
            <div style={{ display: "grid", gap: 9 }}>
              <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse e-mail" inputMode="email" />
              <input style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" type="password" />
            </div>

            {signupMode && entryMode === "member" && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid " + BORDER, display: "grid", gap: 9 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input style={inputStyle} placeholder="Prénom *" value={signup.first_name} onChange={(e) => setSignup({ ...signup, first_name: e.target.value })} />
                  <input style={inputStyle} placeholder="Nom *" value={signup.last_name} onChange={(e) => setSignup({ ...signup, last_name: e.target.value })} />
                </div>
                <input style={inputStyle} placeholder="Téléphone *" value={signup.phone} onChange={(e) => setSignup({ ...signup, phone: e.target.value })} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <input style={inputStyle} placeholder="Ville / Commune *" value={signup.city} onChange={(e) => setSignup({ ...signup, city: e.target.value })} />
                  <input style={inputStyle} placeholder="Territoire *" value={signup.territory} onChange={(e) => setSignup({ ...signup, territory: e.target.value })} />
                </div>
                <input style={inputStyle} placeholder="Instagram (facultatif)" value={signup.instagram} onChange={(e) => setSignup({ ...signup, instagram: e.target.value })} />
                {[
                  ["confirm_18", "Je confirme avoir 18 ans ou plus. *"],
                  ["confirm_accuracy", "Je confirme l’exactitude des informations. *"],
                  ["accept_rules", "J’accepte la charte GC List. *"],
                  ["accept_privacy", "J’accepte la politique de confidentialité. *"]
                ].map(([k, label]) => <label key={k} style={{ fontSize: 9, color: "#D8CFD2" }}><input type="checkbox" checked={(signup as any)[k]} onChange={(e) => setSignup({ ...signup, [k]: e.target.checked })} /> {label}</label>)}
                <p style={{ margin: "4px 0 0", fontSize: 9, color: MUTED }}>Communications facultatives</p>
                {[
                  ["gc_news", "Actualités et opportunités Golden Circle"],
                  ["partner_offers", "Offres partenaires via Golden Circle"],
                  ["whatsapp_sms", "WhatsApp / SMS"],
                  ["email_marketing", "E-mails"],
                  ["image_rights", "Autorisation de diffusion d’image"]
                ].map(([k, label]) => <label key={k} style={{ fontSize: 9, color: MUTED }}><input type="checkbox" checked={(signup as any)[k]} onChange={(e) => setSignup({ ...signup, [k]: e.target.checked })} /> {label}</label>)}
              </div>
            )}

            <div style={{ display: "grid", gap: 9, marginTop: 14 }}>
              {signupMode && entryMode === "member"
                ? <GoldButton disabled={authBusy || !email || password.length < 8} onClick={createAccount}>SOUMETTRE MA DEMANDE</GoldButton>
                : <GoldButton disabled={authBusy || !email || !password} onClick={login}>SE CONNECTER</GoldButton>}
              {entryMode === "member" && <GhostButton onClick={() => setSignupMode((v) => !v)}>{signupMode ? "J’AI DÉJÀ UN COMPTE" : "CRÉER MON COMPTE MEMBRE"}</GhostButton>}
              {!signupMode && <button onClick={resetPasswordRequest} style={{ ...iconButton, fontSize: 9 }}>Mot de passe oublié</button>}
            </div>
            {authError && <p style={{ color: "#E78686", fontSize: 10, lineHeight: 1.5 }}>{authError}</p>}
            {authInfo && <p style={{ color: "#82CE98", fontSize: 10, lineHeight: 1.5 }}>{authInfo}</p>}
          </div>
        </div>
      </div>
    </Shell>
  );

  if (role === "member" && (profile?.account_status !== "active" || profile?.membership_status !== "approved")) {
    return (
      <Shell>
        <div style={{ minHeight: "100vh", padding: 22, display: "grid", alignItems: "center" }}>
          <div style={{ border: "1px solid " + BORDER, borderRadius: 22, padding: 20 }}>
            <p style={{ margin: 0, color: GOLD, fontSize: 10, letterSpacing: 1.5 }}>GC LIST</p>
            <h1 style={{ fontSize: 24, fontWeight: 500 }}>
              {profile?.membership_status === "rejected" ? "Demande non validée" : profile?.membership_status === "suspended" ? "Accès suspendu" : "Demande en cours de validation"}
            </h1>
            <p style={{ color: MUTED, fontSize: 11, lineHeight: 1.7 }}>
              {profile?.membership_status === "pending"
                ? "Votre profil a été reçu. L’accès aux privilèges sera activé uniquement après validation Golden Circle."
                : "Votre espace privé n’est pas actuellement accessible."}
            </p>
            <GhostButton onClick={logout} danger>SE DÉCONNECTER</GhostButton>
          </div>
        </div>
      </Shell>
    );
  }

  if (role === "member") {
    const filteredAnnouncements = announcements.filter((a) => {
      const q = search.toLowerCase().trim();
      return !q || [a.title, a.venue_name, a.territory, a.short_description].filter(Boolean).join(" ").toLowerCase().includes(q);
    });
    const goldenHour = announcements.find((a) => a.type === "golden_hour" && ["active", "scheduled"].includes(a.status));
    const activePass = selectedReservation || reservations.find((r) => ["confirmed", "checked_in"].includes(r.status));
    const profileRows = [
      ["Mes informations", "profileInfo"], ["Mon niveau GC", "profileTier"], ["Mes préférences", "profilePrefs"],
      ["Mes réservations", "profileReservations"], ["Mes avantages", "profileBenefits"], ["Demandes de la communauté", "requests"],
      ["Notifications", "notifications"], ["Centre d’aide", "help"]
    ] as [string, Screen][];

    if (screen === "home") return (
      <Shell>
        <div style={{ paddingBottom: 88 }}>
          <header style={{ padding: "18px 18px 12px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid " + GOLD, display: "grid", placeItems: "center", color: GOLD }}>GC</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 10, color: MUTED }}>Bonjour,</p>
              <h1 style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 400 }}>{displayName}</h1>
              <p style={{ margin: "3px 0 0", fontSize: 9, color: GOLD }}>{tierLabel(profile?.membership_tier)}</p>
            </div>
            <button onClick={() => setScreen("notifications")} style={iconButton}><Bell size={19} /></button>
          </header>

          <div style={{ padding: "0 14px" }}>
            {goldenHour ? (
              <section style={{ borderRadius: 22, overflow: "hidden", border: "1px solid " + GOLD, background: CARD }}>
                <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: GOLD, fontSize: 10, letterSpacing: 1.5 }}>GOLDEN HOUR</span>
                  <span style={{ color: MUTED, fontSize: 9 }}>{goldenHour.status.toUpperCase()}</span>
                </div>
                <EventVisual event={goldenHour} />
                <div style={{ padding: 13 }}><GoldButton onClick={() => { setSelectedAnn(goldenHour); setScreen("detail"); }}>VOIR L’ÉVÉNEMENT</GoldButton></div>
              </section>
            ) : <Empty text="Aucune Golden Hour active pour le moment." />}

            <SectionTitle title="À LA UNE" action={<button onClick={() => setScreen("explorer")} style={{ ...iconButton, fontSize: 9 }}>Tout voir ›</button>} />
            {announcements.length ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {announcements.filter((a) => a.id !== goldenHour?.id).slice(0, 4).map((a) => (
                  <button key={a.id} onClick={() => { setSelectedAnn(a); setScreen("detail"); }} style={{ padding: 0, borderRadius: 16, border: "1px solid " + BORDER, background: CARD, color: PEARL, overflow: "hidden", textAlign: "left" }}>
                    <EventVisual event={a} compact />
                    <div style={{ padding: 10 }}><b style={{ fontSize: 12 }}>{a.title}</b><p style={{ margin: "4px 0 0", fontSize: 9, color: MUTED }}>{fmtDate(a.starts_at)}</p></div>
                  </button>
                ))}
              </div>
            ) : <Empty text="Aucune annonce disponible." />}

            <button onClick={() => setScreen("pass")} style={{ width: "100%", marginTop: 18, borderRadius: 16, border: "1px solid " + BORDER, background: "rgba(74,25,46,.18)", color: PEARL, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <QrCode color={GOLD} /><div style={{ textAlign: "left", flex: 1 }}><small style={{ color: MUTED }}>Votre accès personnel</small><div>Golden Pass</div></div><ChevronRight />
            </button>
          </div>
          <MemberNav active={screen} go={setScreen} />
        </div>
      </Shell>
    );

    if (screen === "explorer") return (
      <Shell>
        <div style={{ paddingBottom: 88 }}>
          <TopBar title="Explorer" />
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", border: "1px solid rgba(255,255,255,.10)", background: "#111012", borderRadius: 12, padding: "10px 12px" }}>
              <Search size={15} color={MUTED} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Événement, partenaire, lieu..." style={{ flex: 1, border: 0, background: "transparent", color: PEARL, outline: "none" }} />
            </div>
            <SectionTitle title="Événements disponibles" />
            <div style={{ display: "grid", gap: 10 }}>
              {filteredAnnouncements.map((a) => (
                <button key={a.id} onClick={() => { setSelectedAnn(a); setScreen("detail"); }} style={{ border: "1px solid " + BORDER, borderRadius: 16, padding: 0, background: CARD, color: PEARL, textAlign: "left", overflow: "hidden" }}>
                  <EventVisual event={a} compact />
                  <div style={{ padding: 11, display: "grid", gridTemplateColumns: "1fr auto", gap: 10 }}>
                    <div><b>{a.title}</b><p style={{ margin: "4px 0", fontSize: 9, color: MUTED }}>{a.venue_name || a.territory || "Lieu à confirmer"} · {fmtDate(a.starts_at)}</p></div>
                    <ChevronRight size={16} />
                  </div>
                </button>
              ))}
              {!filteredAnnouncements.length && <Empty text="Aucun résultat." />}
            </div>
            <SectionTitle title="Demandes de la communauté" action={<GhostButton onClick={() => setScreen("requests")}>PROPOSER</GhostButton>} />
            <p style={{ fontSize: 10, color: MUTED, lineHeight: 1.6 }}>Suggérez un événement, un lieu ou un partenaire que Golden Circle pourrait activer.</p>
          </div>
          <MemberNav active={screen} go={setScreen} />
        </div>
      </Shell>
    );

    if (screen === "detail" && selectedAnn) {
      const eligibleBenefits = selectedAnn.privileges || [];
      const interested = interests.some((x) => x.announcement_id === selectedAnn.id);
      return (
        <Shell>
          <TopBar title="Détail événement" back onBack={() => setScreen("explorer")} />
          <EventVisual event={selectedAnn} />
          <div style={{ padding: 16 }}>
            <h2 style={{ margin: "0 0 5px", fontSize: 26 }}>{selectedAnn.title}</h2>
            <p style={{ margin: 0, color: MUTED, fontSize: 11 }}>{selectedAnn.short_description || ""}</p>
            <div style={{ display: "grid", gap: 8, margin: "16px 0", fontSize: 11 }}>
              <span><CalendarDays size={13} color={GOLD} style={{ verticalAlign: "middle", marginRight: 8 }} />{fmtDate(selectedAnn.starts_at)}</span>
              <span><MapPin size={13} color={GOLD} style={{ verticalAlign: "middle", marginRight: 8 }} />{selectedAnn.venue_name || selectedAnn.territory || "Lieu à confirmer"}</span>
              {availability && <span><TicketCheck size={13} color={GOLD} style={{ verticalAlign: "middle", marginRight: 8 }} />{availability.remaining == null ? "Quota limité" : availability.remaining + " place(s) restante(s)"}</span>}
            </div>
            {eligibleBenefits.length ? (
              <div style={{ border: "1px solid " + BORDER, borderRadius: 14, padding: 13, marginBottom: 14 }}>
                <p style={{ margin: "0 0 7px", color: GOLD, fontSize: 9, letterSpacing: 1 }}>VOTRE PRIVILÈGE</p>
                {eligibleBenefits.map((b: any) => <div key={b.id} style={{ fontSize: 11, marginTop: 5 }}><b>{b.label}</b>{b.description ? " — " + b.description : ""}</div>)}
              </div>
            ) : null}
            <div style={{ display: "grid", gap: 9 }}>
              {selectedAnn.reservations_enabled && <GoldButton onClick={() => setScreen("reservation")}>RÉSERVER</GoldButton>}
              <GhostButton onClick={() => toggleInterest(selectedAnn)}>{interested ? "RETIRER DE MES INTÉRÊTS" : "ÇA M’INTÉRESSE"}</GhostButton>
            </div>
          </div>
        </Shell>
      );
    }

    if (screen === "reservation" && selectedAnn) return (
      <Shell>
        <TopBar title="Réserver" back onBack={() => setScreen("detail")} />
        <div style={{ padding: 16 }}>
          <EventVisual event={selectedAnn} compact />
          <h2 style={{ fontSize: 20 }}>{selectedAnn.title}</h2>
          <label style={labelStyle}>Nombre de personnes
            <input style={inputStyle} type="number" min={1} max={selectedAnn.group_max || 20} value={partySize} onChange={(e) => setPartySize(Math.max(1, Number(e.target.value) || 1))} />
          </label>
          <div style={{ margin: "14px 0", fontSize: 10, color: MUTED, lineHeight: 1.7 }}>
            {selectedAnn.booking_deadline && <div>Réservation avant : {fmtDate(selectedAnn.booking_deadline)}</div>}
            {selectedAnn.arrival_deadline && <div>Arrivée avant : {fmtDate(selectedAnn.arrival_deadline)}</div>}
          </div>
          {memberError && <p style={{ color: "#E78686", fontSize: 10 }}>{memberError}</p>}
          <GoldButton onClick={reserveSelected}>CONFIRMER LA RÉSERVATION</GoldButton>
        </div>
      </Shell>
    );

    if (screen === "pass") return (
      <Shell>
        <div style={{ paddingBottom: 88 }}>
          <TopBar title="Golden Pass" />
          <div style={{ padding: 16 }}>
            {activePass && ["confirmed", "checked_in"].includes(activePass.status) ? (
              <div style={{ border: "1px solid " + GOLD, borderRadius: 22, padding: 18, background: "linear-gradient(165deg,#2C101F,#0C080A 55%,#17100D)", textAlign: "center" }}>
                <p style={{ margin: 0, color: GOLD, fontSize: 9, letterSpacing: 1.5 }}>{activePass.status === "checked_in" ? "PRÉSENCE VALIDÉE" : "ACCÈS CONFIRMÉ"}</p>
                <h2 style={{ fontSize: 23, margin: "9px 0 3px" }}>{activePass.announcements?.title || "Golden Circle"}</h2>
                <p style={{ color: MUTED, fontSize: 10, margin: 0 }}>{displayName} · {tierLabel(profile?.membership_tier)}</p>
                {activePass.qr_token ? <div style={{ background: "#FFF", width: "fit-content", padding: 12, borderRadius: 14, margin: "18px auto 12px" }}><QRCodeSVG value={activePass.qr_token} size={175} /></div> : <Empty text="Token QR indisponible." />}
                <p style={{ color: GOLD, fontSize: 10, letterSpacing: 1 }}>{activePass.public_code}</p>
                <p style={{ color: MUTED, fontSize: 9 }}>Groupe : {activePass.party_size || 1}</p>
              </div>
            ) : <Empty text="Aucune réservation active. Votre Golden Pass apparaîtra ici après confirmation." />}
          </div>
          <MemberNav active={screen} go={setScreen} />
        </div>
      </Shell>
    );

    if (screen === "notifications") return (
      <Shell>
        <div style={{ paddingBottom: 88 }}>
          <TopBar title="Notifications" />
          <div style={{ padding: "0 16px" }}>
            {notifications.map((n) => (
              <button key={n.id} onClick={() => markNotificationRead(n.id)} style={{ width: "100%", textAlign: "left", border: 0, borderBottom: "1px solid rgba(255,255,255,.08)", background: "transparent", color: PEARL, padding: "14px 0" }}>
                <div style={{ display: "flex", gap: 8 }}><span style={{ color: n.read_at ? MUTED : GOLD }}>●</span><div><b style={{ fontSize: 11 }}>{n.title}</b><p style={{ margin: "4px 0", fontSize: 10, color: MUTED }}>{n.body || ""}</p><small style={{ color: "#736B6F" }}>{fmtDate(n.created_at)}</small></div></div>
              </button>
            ))}
            {!notifications.length && <Empty text="Aucune notification." />}
          </div>
          <MemberNav active={screen} go={setScreen} />
        </div>
      </Shell>
    );

    if (screen === "profile") return (
      <Shell>
        <div style={{ paddingBottom: 88 }}>
          <TopBar title="Mon profil" right={<button onClick={logout} style={{ ...iconButton, color: "#E06161" }}><LogOut size={18} /></button>} />
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%", border: "1px solid " + GOLD, display: "grid", placeItems: "center", color: GOLD }}>GC</div>
              <div><h2 style={{ margin: 0, fontSize: 18 }}>{displayName}</h2><p style={{ margin: "4px 0", color: GOLD, fontSize: 9 }}>{tierLabel(profile?.membership_tier)}</p></div>
            </div>
            {profileRows.map(([label, target]) => (
              <button key={label} onClick={() => setScreen(target)} style={{ width: "100%", display: "flex", justifyContent: "space-between", border: 0, borderBottom: "1px solid rgba(255,255,255,.08)", background: "transparent", color: PEARL, padding: "15px 0", textAlign: "left" }}>
                <span>{label}</span><ChevronRight size={16} color={MUTED} />
              </button>
            ))}
          </div>
          <MemberNav active={screen} go={setScreen} />
        </div>
      </Shell>
    );

    if (screen === "profileInfo") return (
      <Shell><TopBar title="Mes informations" back onBack={() => setScreen("profile")} />
        <div style={{ padding: 16, display: "grid", gap: 10 }}>
          {[
            ["Prénom", "first_name"], ["Nom", "last_name"], ["Téléphone", "phone"], ["Ville / Commune", "city"], ["Territoire", "territory"], ["Instagram", "instagram"]
          ].map(([label, key]) => <label key={key} style={labelStyle}>{label}<input style={inputStyle} value={profile?.[key] || ""} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} /></label>)}
          <label style={labelStyle}>E-mail<input style={{ ...inputStyle, opacity: .65 }} value={profile?.email || sessionUser?.email || ""} disabled /></label>
          {memberError && <p style={{ color: "#E78686", fontSize: 10 }}>{memberError}</p>}
          <GoldButton onClick={saveProfileInfo}>ENREGISTRER</GoldButton>
        </div>
      </Shell>
    );

    if (screen === "profileTier") return (
      <Shell><TopBar title="Mon niveau GC" back onBack={() => setScreen("profile")} />
        <div style={{ padding: 16 }}>
          <div style={{ border: "1px solid " + GOLD, borderRadius: 18, padding: 18 }}>
            <p style={{ margin: 0, color: MUTED, fontSize: 9 }}>NIVEAU ACTUEL</p>
            <h2 style={{ margin: "7px 0", fontSize: 24, color: GOLD }}>{tierLabel(profile?.membership_tier)}</h2>
            <p style={{ margin: 0, fontSize: 10 }}>Adhésion : {profile?.membership_status || "—"}</p>
          </div>
          <SectionTitle title="Mon engagement" />
          <div style={{ border: "1px solid " + BORDER, borderRadius: 14, padding: 14 }}><strong style={{ fontSize: 24 }}>{engagementPoints}</strong><p style={{ color: MUTED, fontSize: 9, margin: "4px 0 0" }}>points d’engagement</p></div>
          <SectionTitle title="Historique" />
          {engagement.map((e) => <div key={e.id} style={{ padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.08)", fontSize: 10 }}><b>{e.points > 0 ? "+" : ""}{e.points}</b> · {e.reason || e.action_type}<span style={{ float: "right", color: MUTED }}>{fmtDate(e.created_at)}</span></div>)}
          {!engagement.length && <Empty text="Aucun mouvement d’engagement enregistré." />}
        </div>
      </Shell>
    );

    if (screen === "profilePrefs") {
      const prefs = [
        ["gc_news", "Actualités et opportunités Golden Circle"],
        ["partner_offers", "Offres partenaires via Golden Circle"],
        ["whatsapp_sms", "WhatsApp / SMS"],
        ["email_marketing", "E-mails"],
        ["image_rights", "Droit à l’image"]
      ];
      return (
        <Shell><TopBar title="Mes préférences" back onBack={() => setScreen("profile")} />
          <div style={{ padding: 16 }}>
            <p style={{ color: MUTED, fontSize: 10, lineHeight: 1.6 }}>Les consentements facultatifs peuvent être modifiés à tout moment.</p>
            {prefs.map(([type, label]) => <label key={type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><span>{label}</span><input type="checkbox" checked={consentValue(type)} onChange={(e) => setConsent(type, e.target.checked)} /></label>)}
          </div>
        </Shell>
      );
    }

    if (screen === "profileReservations") return (
      <Shell><TopBar title="Mes réservations" back onBack={() => setScreen("profile")} />
        <div style={{ padding: 16 }}>
          {reservations.map((r) => <div key={r.id} style={{ border: "1px solid " + BORDER, borderRadius: 14, padding: 13, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}><b>{r.announcements?.title || r.public_code}</b><span style={{ color: GOLD, fontSize: 9 }}>{r.status}</span></div>
            <p style={{ margin: "5px 0", color: MUTED, fontSize: 9 }}>{fmtDate(r.announcements?.starts_at)} · groupe {r.party_size}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {["confirmed", "checked_in"].includes(r.status) && <GhostButton onClick={() => { setSelectedReservation(r); setScreen("pass"); }}>PASS</GhostButton>}
              {r.status === "confirmed" && r.announcements?.cancellation_allowed && <GhostButton danger onClick={() => cancelReservation(r.id)}>ANNULER</GhostButton>}
            </div>
          </div>)}
          {!reservations.length && <Empty text="Aucune réservation." />}
          {memberError && <p style={{ color: "#E78686", fontSize: 10 }}>{memberError}</p>}
        </div>
      </Shell>
    );

    if (screen === "profileBenefits") {
      const benefits = reservations.flatMap((r) => (r.reservation_benefits || []).map((b: any) => ({ ...b, event: r.announcements?.title })));
      return (
        <Shell><TopBar title="Mes avantages" back onBack={() => setScreen("profile")} />
          <div style={{ padding: 16 }}>
            <SectionTitle title="Avantages de réservation" />
            {benefits.map((b) => <div key={b.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><b>{b.label}</b><p style={{ margin: "4px 0", color: MUTED, fontSize: 9 }}>{b.event} · {b.consumed_quantity}/{b.quantity} consommé</p></div>)}
            {!benefits.length && <Empty text="Aucun avantage de réservation actif." />}
            <SectionTitle title="Entitlements" />
            {entitlements.map((e) => <div key={e.id} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><b>{e.entitlement_type}</b><p style={{ margin: "4px 0", color: MUTED, fontSize: 9 }}>{e.source} · {e.status} · jusqu’au {fmtDate(e.expires_at)}</p></div>)}
            {!entitlements.length && <Empty text="Aucun privilège temporaire." />}
          </div>
        </Shell>
      );
    }

    if (screen === "requests") return (
      <Shell><TopBar title="Demandes communauté" back onBack={() => setScreen("profile")} />
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gap: 9, border: "1px solid " + BORDER, borderRadius: 14, padding: 13 }}>
            <select style={inputStyle} value={requestForm.request_type} onChange={(e) => setRequestForm({ ...requestForm, request_type: e.target.value })}><option value="event">Événement</option><option value="venue">Lieu</option><option value="partner">Partenaire</option></select>
            <input style={inputStyle} placeholder="Nom *" value={requestForm.name} onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} />
            <input style={inputStyle} placeholder="Instagram" value={requestForm.instagram} onChange={(e) => setRequestForm({ ...requestForm, instagram: e.target.value })} />
            <input style={inputStyle} placeholder="Lien" value={requestForm.external_url} onChange={(e) => setRequestForm({ ...requestForm, external_url: e.target.value })} />
            <input style={inputStyle} placeholder="Territoire" value={requestForm.territory} onChange={(e) => setRequestForm({ ...requestForm, territory: e.target.value })} />
            <input style={inputStyle} type="date" value={requestForm.event_date} onChange={(e) => setRequestForm({ ...requestForm, event_date: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: 90 }} placeholder="Commentaire" value={requestForm.description} onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })} />
            <GoldButton onClick={createCommunityRequest}>ENVOYER LA DEMANDE</GoldButton>
          </div>
          {memberError && <p style={{ color: "#E78686", fontSize: 10 }}>{memberError}</p>}
          <SectionTitle title="Demandes visibles" />
          {communityRequests.map((r) => <div key={r.id} style={{ padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><b>{r.name}</b><p style={{ margin: "4px 0", color: MUTED, fontSize: 9 }}>{r.request_type} · {r.territory || "Territoire non précisé"} · {r.status}</p></div>)}
        </div>
      </Shell>
    );

    if (screen === "help") return (
      <Shell><TopBar title="Centre d’aide" back onBack={() => setScreen("profile")} />
        <div style={{ padding: 16 }}>
          {[
            ["Comment obtenir un privilège ?", "Les privilèges dépendent de chaque événement, de votre niveau, du quota et des conditions annoncées."],
            ["Mon Pass ne s’affiche pas", "Le Golden Pass apparaît uniquement après une réservation confirmée."],
            ["Puis-je annuler ?", "L’annulation dépend des conditions et de la date limite de l’événement."],
            ["Je souhaite signaler un problème", "Contactez Golden Circle depuis vos canaux officiels avec le nom de l’événement et votre code de réservation."]
          ].map(([q, a]) => <div key={q} style={{ padding: "13px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><b>{q}</b><p style={{ color: MUTED, fontSize: 10, lineHeight: 1.6 }}>{a}</p></div>)}
        </div>
      </Shell>
    );
  }

  if (role === "partner") {
    const partnerCanManage = ["owner", "manager"].includes(partnerMembership?.role);
    if (!partnerMembership || !partnerOrg) return (
      <Shell wide><TopBar title="Espace partenaire" right={<GhostButton onClick={logout} danger>DÉCONNEXION</GhostButton>} /><div style={{ padding: 24 }}><Empty text="Votre compte n’est relié à aucune organisation partenaire active. Contactez l’administration Golden Circle." /></div></Shell>
    );

    const partnerMenu: [string, Screen, any][] = [
      ["Dashboard", "partnerHome", BarChart3], ["Annonces", "partnerAnnouncements", FileText],
      ["Réservations", "partnerReservations", TicketCheck], ["Scanner", "partnerScan", ScanLine], ["Profil", "partnerProfile", Building2]
    ];
    const PartnerMenu = () => <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "12px 18px", borderBottom: "1px solid " + BORDER }}>{partnerMenu.map(([label, s, Icon]) => <button key={label} onClick={() => setScreen(s)} style={{ border: "1px solid " + (screen === s ? GOLD : BORDER), borderRadius: 10, background: screen === s ? "rgba(209,180,100,.10)" : "transparent", color: screen === s ? GOLD : PEARL, padding: "9px 11px", fontSize: 9, display: "flex", alignItems: "center", gap: 6 }}><Icon size={14} />{label}</button>)}</div>;

    if (screen === "partnerHome") {
      const confirmed = partnerReservations.filter((r) => ["confirmed", "checked_in", "completed"].includes(r.status));
      const checked = partnerReservations.filter((r) => ["checked_in", "completed"].includes(r.status));
      const attendance = confirmed.length ? Math.round((checked.length / confirmed.length) * 100) : 0;
      return (
        <Shell wide><TopBar title={partnerOrg.name} right={<GhostButton onClick={logout} danger>DÉCONNEXION</GhostButton>} /><PartnerMenu />
          <div style={{ padding: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
              {[[partnerAnnouncements.length, "Annonces"], [confirmed.length, "Réservations actives"], [checked.length, "Présences"], [attendance + "%", "Taux présence"]].map(([n, l]) => <div key={String(l)} style={{ border: "1px solid " + BORDER, borderRadius: 14, padding: 14 }}><strong style={{ fontSize: 24 }}>{n}</strong><p style={{ margin: "4px 0", color: MUTED, fontSize: 9 }}>{l}</p></div>)}
            </div>
            <SectionTitle title="Événements récents" />
            <DataTable rows={partnerAnnouncements.slice(0, 8)} columns={[
              { key: "title", label: "Annonce" }, { key: "status", label: "Statut" }, { key: "starts_at", label: "Date", render: (r) => fmtDate(r.starts_at) },
              { key: "capacity", label: "Capacité" }
            ]} />
          </div>
        </Shell>
      );
    }

    if (screen === "partnerAnnouncements") return (
      <Shell wide><TopBar title="Mes annonces" /><PartnerMenu />
        <div style={{ padding: 18 }}>
          {partnerCanManage && <>
            <SectionTitle title="Créer une proposition" />
            <AnnouncementForm form={announcementForm} setForm={setAnnouncementForm} categories={categories} partners={[]} partnerMode />
            <div style={{ margin: "12px 0 22px", maxWidth: 320 }}><GoldButton onClick={partnerCreateAnnouncement}>SOUMETTRE À GOLDEN CIRCLE</GoldButton></div>
          </>}
          <SectionTitle title="Mes annonces" />
          <DataTable rows={partnerAnnouncements} columns={[
            { key: "title", label: "Titre" }, { key: "type", label: "Type" }, { key: "status", label: "Statut" },
            { key: "starts_at", label: "Début", render: (r) => fmtDate(r.starts_at) }, { key: "capacity", label: "Capacité" }
          ]} />
        </div>
      </Shell>
    );

    if (screen === "partnerReservations") return (
      <Shell wide><TopBar title="Réservations" /><PartnerMenu />
        <div style={{ padding: 18 }}>
          <DataTable rows={partnerReservations} columns={[
            { key: "public_code", label: "Code" }, { key: "announcement", label: "Événement", render: (r) => r.announcements?.title || "—" },
            { key: "party_size", label: "Groupe" }, { key: "status", label: "Statut" },
            { key: "created_at", label: "Réservé le", render: (r) => fmtDate(r.created_at) }
          ]} />
        </div>
      </Shell>
    );

    if (screen === "partnerScan") return (
      <Shell wide><TopBar title="Scanner un Golden Pass" /><PartnerMenu />
        <div style={{ padding: 18, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 18 }}>
          <div>
            <video ref={videoRef} playsInline muted style={{ width: "100%", minHeight: 280, background: "#050405", border: "1px solid " + GOLD, borderRadius: 18, objectFit: "cover" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}><GhostButton onClick={startCamera}>OUVRIR LA CAMÉRA</GhostButton><GhostButton onClick={stopCamera}>ARRÊTER</GhostButton></div>
            <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
              <input style={inputStyle} value={scanToken} onChange={(e) => setScanToken(e.target.value)} placeholder="Token QR / saisie manuelle" />
              <GoldButton onClick={() => scanPass()}>VÉRIFIER LE PASS</GoldButton>
            </div>
            {scanError && <p style={{ color: "#E78686", fontSize: 10 }}>{scanError}</p>}
          </div>
          <div>
            {scanResult ? <div style={{ border: "1px solid " + GOLD, borderRadius: 18, padding: 18 }}>
              <p style={{ color: GOLD, fontSize: 9, letterSpacing: 1.2 }}>PASS VALIDÉ</p>
              <h2 style={{ margin: "6px 0" }}>{scanResult.member_name}</h2>
              <p style={{ color: MUTED, fontSize: 10 }}>{tierLabel(scanResult.membership_tier)} · {scanResult.announcement_title} · groupe {scanResult.party_size}</p>
              <p style={{ fontSize: 10 }}>Statut : {scanResult.reservation_status}</p>
              <SectionTitle title="Avantages" />
              {(scanResult.benefits || []).map((b: any) => <div key={b.id} style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}><b>{b.label}</b><p style={{ color: MUTED, fontSize: 9 }}>{b.consumed_quantity}/{b.quantity} consommé</p>{b.consumed_quantity < b.quantity && <GhostButton onClick={() => consumeBenefit(b.id)}>CONSOMMER 1</GhostButton>}</div>)}
            </div> : <Empty text="Scannez un pass pour afficher les informations minimales nécessaires." />}
          </div>
        </div>
      </Shell>
    );

    return (
      <Shell wide><TopBar title="Profil partenaire" /><PartnerMenu />
        <div style={{ padding: 18, maxWidth: 760 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <label style={labelStyle}>Organisation<input style={inputStyle} value={partnerOrg.name || ""} disabled /></label>
            <label style={labelStyle}>Type<input style={inputStyle} value={partnerOrg.partner_type || ""} disabled={!partnerCanManage} onChange={(e) => setPartnerOrg({ ...partnerOrg, partner_type: e.target.value })} /></label>
            <label style={labelStyle}>Territoire<input style={inputStyle} value={partnerOrg.territory || ""} disabled={!partnerCanManage} onChange={(e) => setPartnerOrg({ ...partnerOrg, territory: e.target.value })} /></label>
            <label style={labelStyle}>Ville<input style={inputStyle} value={partnerOrg.city || ""} disabled={!partnerCanManage} onChange={(e) => setPartnerOrg({ ...partnerOrg, city: e.target.value })} /></label>
            <p style={{ fontSize: 10, color: MUTED }}>Vérification : {partnerOrg.verification_status} · publication : {partnerOrg.publication_permission} · rôle : {partnerMembership.role}</p>
            {partnerCanManage && <GoldButton onClick={async () => { await supabase.from("partners").update({ partner_type: partnerOrg.partner_type, territory: partnerOrg.territory, city: partnerOrg.city }).eq("id", partnerOrg.id); await loadPartnerData(); }}>ENREGISTRER</GoldButton>}
          </div>
        </div>
      </Shell>
    );
  }

  const profileById = new Map(adminProfiles.map((p) => [p.id, p]));
  const partnerById = new Map(adminPartners.map((p) => [p.id, p]));
  const adminMenu: [string, Screen, any][] = [
    ["Dashboard", "adminHome", BarChart3], ["Membres", "adminMembers", Users], ["Partenaires", "adminPartners", Building2],
    ["Annonces", "adminAnnouncements", FileText], ["Réservations", "adminReservations", TicketCheck], ["Demandes", "adminRequests", Compass], ["Logs", "adminSettings", Settings]
  ];
  const AdminMenu = () => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "12px 18px", borderBottom: "1px solid " + BORDER }}>{adminMenu.map(([label, s, Icon]) => <button key={label} onClick={() => setScreen(s)} style={{ border: "1px solid " + (screen === s ? GOLD : BORDER), borderRadius: 10, padding: "9px 11px", background: screen === s ? "rgba(209,180,100,.10)" : "transparent", color: screen === s ? GOLD : PEARL, fontSize: 9, display: "flex", alignItems: "center", gap: 6 }}><Icon size={14} />{label}</button>)}</div>;

  if (screen === "adminHome") {
    const members = adminProfiles.filter((p) => p.role === "member");
    return (
      <Shell wide><TopBar title="Golden Circle — Administration" right={<GhostButton onClick={logout} danger>DÉCONNEXION</GhostButton>} /><AdminMenu />
        <div style={{ padding: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
            {[
              [members.length, "Membres"], [members.filter((p) => p.membership_status === "pending").length, "En attente"],
              [members.filter((p) => p.membership_tier === "gc_vip").length, "GC VIP"], [members.filter((p) => p.membership_tier === "gc_ambassador").length, "Ambassadrices"],
              [adminPartners.length, "Partenaires"], [adminAnnouncements.length, "Annonces"], [adminReservations.length, "Réservations"]
            ].map(([n, l]) => <div key={String(l)} style={{ border: "1px solid " + BORDER, borderRadius: 14, padding: 14 }}><strong style={{ fontSize: 24 }}>{n}</strong><p style={{ margin: "4px 0", color: MUTED, fontSize: 9 }}>{l}</p></div>)}
          </div>
          <SectionTitle title="Activité récente" />
          <DataTable rows={adminLogs.slice(0, 15)} columns={[
            { key: "action", label: "Action" }, { key: "entity_type", label: "Objet" }, { key: "created_at", label: "Date", render: (r) => fmtDate(r.created_at) }
          ]} />
        </div>
      </Shell>
    );
  }

  if (screen === "adminMembers") {
    const q = adminSearch.toLowerCase().trim();
    const rows = adminProfiles.filter((p) => p.role === "member" && (!q || [p.first_name, p.last_name, p.email, p.city, p.territory, p.membership_tier, p.membership_status].filter(Boolean).join(" ").toLowerCase().includes(q)));
    return (
      <Shell wide><TopBar title="Membres" /><AdminMenu />
        <div style={{ padding: 18 }}>
          <div style={{ maxWidth: 420, marginBottom: 12 }}><input style={inputStyle} value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} placeholder="Rechercher nom, e-mail, ville, statut..." /></div>
          <DataTable rows={rows} columns={[
            { key: "member", label: "Membre", render: (r) => <><b>{[r.first_name, r.last_name].filter(Boolean).join(" ") || "Profil incomplet"}</b><div style={{ color: MUTED, fontSize: 9 }}>{r.email || ""}</div></> },
            { key: "membership_tier", label: "Niveau", render: (r) => tierLabel(r.membership_tier) },
            { key: "membership_status", label: "Adhésion" }, { key: "territory", label: "Territoire" },
            { key: "created_at", label: "Inscription", render: (r) => fmtDate(r.created_at) },
            { key: "actions", label: "Actions", render: (r) => <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {r.membership_status === "pending" && <><GhostButton onClick={() => adminDecision(r, "approved", "gc")}>GC</GhostButton><GhostButton onClick={() => adminDecision(r, "approved", "gc_vip")}>VIP</GhostButton><GhostButton onClick={() => adminDecision(r, "approved", "gc_ambassador")}>AMB.</GhostButton><GhostButton danger onClick={() => adminDecision(r, "rejected")}>REFUSER</GhostButton></>}
              {r.membership_status === "approved" && <GhostButton danger onClick={() => adminDecision(r, "suspended")}>SUSPENDRE</GhostButton>}
              {r.membership_status === "suspended" && <GhostButton onClick={() => adminDecision(r, "approved", r.membership_tier || "gc")}>RÉACTIVER</GhostButton>}
            </div> }
          ]} />
        </div>
      </Shell>
    );
  }

  if (screen === "adminPartners") return (
    <Shell wide><TopBar title="Partenaires" /><AdminMenu />
      <div style={{ padding: 18 }}>
        <SectionTitle title="Créer / référencer un partenaire" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 8, marginBottom: 10 }}>
          <input style={inputStyle} placeholder="Nom *" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} />
          <input style={inputStyle} placeholder="Type" value={partnerForm.partner_type} onChange={(e) => setPartnerForm({ ...partnerForm, partner_type: e.target.value })} />
          <input style={inputStyle} placeholder="Territoire" value={partnerForm.territory} onChange={(e) => setPartnerForm({ ...partnerForm, territory: e.target.value })} />
          <input style={inputStyle} placeholder="Ville" value={partnerForm.city} onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })} />
          <input style={inputStyle} placeholder="E-mail du responsable existant" value={partnerForm.owner_email} onChange={(e) => setPartnerForm({ ...partnerForm, owner_email: e.target.value })} />
        </div>
        <div style={{ maxWidth: 320, marginBottom: 20 }}><GoldButton onClick={adminCreatePartner}>CRÉER LE PARTENAIRE</GoldButton></div>
        <DataTable rows={adminPartners} columns={[
          { key: "name", label: "Partenaire" }, { key: "partner_type", label: "Type" }, { key: "territory", label: "Territoire" },
          { key: "verification_status", label: "Vérification" }, { key: "publication_permission", label: "Publication" },
          { key: "actions", label: "Actions", render: (r) => <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <GhostButton onClick={async () => { await supabase.from("partners").update({ verification_status: "verified" }).eq("id", r.id); await loadAdminData(); }}>VÉRIFIER</GhostButton>
            <GhostButton onClick={async () => { await supabase.from("partners").update({ publication_permission: "direct_publish" }).eq("id", r.id); await loadAdminData(); }}>DIRECT PUBLISH</GhostButton>
          </div> }
        ]} />
      </div>
    </Shell>
  );

  if (screen === "adminAnnouncements") return (
    <Shell wide><TopBar title="Annonces & activations" /><AdminMenu />
      <div style={{ padding: 18 }}>
        <SectionTitle title="Créer une annonce" />
        <AnnouncementForm form={announcementForm} setForm={setAnnouncementForm} categories={categories} partners={adminPartners} />
        <div style={{ maxWidth: 320, margin: "12px 0 22px" }}><GoldButton onClick={adminCreateAnnouncement}>PUBLIER / PLANIFIER</GoldButton></div>
        <DataTable rows={adminAnnouncements} columns={[
          { key: "title", label: "Titre" }, { key: "type", label: "Type" }, { key: "partner", label: "Partenaire", render: (r) => partnerById.get(r.partner_id)?.name || "Golden Circle" },
          { key: "status", label: "Statut" }, { key: "starts_at", label: "Début", render: (r) => fmtDate(r.starts_at) },
          { key: "capacity", label: "Quota" },
          { key: "actions", label: "Actions", render: (r) => <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {r.status !== "active" && <GhostButton onClick={() => setAnnouncementStatus(r.id, "active")}>ACTIVER</GhostButton>}
            {r.status === "pending_validation" && <GhostButton onClick={() => setAnnouncementStatus(r.id, "scheduled")}>VALIDER</GhostButton>}
            {!["cancelled", "ended"].includes(r.status) && <GhostButton danger onClick={() => setAnnouncementStatus(r.id, "cancelled")}>ANNULER</GhostButton>}
          </div> }
        ]} />
      </div>
    </Shell>
  );

  if (screen === "adminReservations") {
    const rows = adminReservations.map((r) => ({ ...r, member: profileById.get(r.user_id) }));
    return (
      <Shell wide><TopBar title="Réservations" /><AdminMenu />
        <div style={{ padding: 18 }}>
          <DataTable rows={rows} columns={[
            { key: "public_code", label: "Code" }, { key: "member", label: "Membre", render: (r) => [r.member?.first_name, r.member?.last_name].filter(Boolean).join(" ") || r.user_id },
            { key: "announcement", label: "Événement", render: (r) => r.announcements?.title || "—" }, { key: "party_size", label: "Groupe" },
            { key: "status", label: "Statut" }, { key: "checked_in_at", label: "Check-in", render: (r) => fmtDate(r.checked_in_at) },
            { key: "created_at", label: "Créée", render: (r) => fmtDate(r.created_at) }
          ]} />
        </div>
      </Shell>
    );
  }

  if (screen === "adminRequests") return (
    <Shell wide><TopBar title="Demandes communauté" /><AdminMenu />
      <div style={{ padding: 18 }}>
        <DataTable rows={adminRequests} columns={[
          { key: "name", label: "Demande" }, { key: "request_type", label: "Type" }, { key: "territory", label: "Territoire" },
          { key: "event_date", label: "Date souhaitée" }, { key: "status", label: "Pipeline" },
          { key: "actions", label: "Actions", render: (r) => <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <GhostButton onClick={() => setRequestStatus(r.id, "qualified")}>QUALIFIER</GhostButton>
            <GhostButton onClick={() => setRequestStatus(r.id, "contacted")}>CONTACTÉ</GhostButton>
            <GhostButton onClick={() => setRequestStatus(r.id, "converted")}>CONVERTI</GhostButton>
          </div> }
        ]} />
      </div>
    </Shell>
  );

  return (
    <Shell wide><TopBar title="Journal & contrôle" /><AdminMenu />
      <div style={{ padding: 18 }}>
        <DataTable rows={adminLogs} columns={[
          { key: "created_at", label: "Date", render: (r) => fmtDate(r.created_at) },
          { key: "action", label: "Action" }, { key: "entity_type", label: "Type" }, { key: "entity_id", label: "Objet" },
          { key: "actor_user_id", label: "Acteur" }, { key: "partner_id", label: "Partenaire", render: (r) => partnerById.get(r.partner_id)?.name || "—" }
        ]} />
      </div>
    </Shell>
  );
}

function AnnouncementForm({ form, setForm, categories, partners, partnerMode = false }: { form: any; setForm: (v: any) => void; categories: any[]; partners: any[]; partnerMode?: boolean }) {
  const f = (key: string, value: any) => setForm({ ...form, [key]: value });
  return (
    <div style={{ border: "1px solid " + BORDER, borderRadius: 16, padding: 14, display: "grid", gap: 9 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
        <select style={inputStyle} value={form.type} onChange={(e) => f("type", e.target.value)}>
          <option value="event">Événement</option><option value="golden_hour">Golden Hour</option><option value="offer">Offre</option><option value="opportunity">Opportunité</option><option value="information">Information</option><option value="test">Test</option>
        </select>
        {!partnerMode && <select style={inputStyle} value={form.partner_id || ""} onChange={(e) => f("partner_id", e.target.value)}><option value="">Golden Circle / sans partenaire</option>{partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>}
        <select style={inputStyle} value={form.primary_category_id || ""} onChange={(e) => f("primary_category_id", e.target.value)}><option value="">Catégorie</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <select style={inputStyle} value={form.target_tier || ""} onChange={(e) => f("target_tier", e.target.value)}><option value="">Tous niveaux éligibles</option><option value="gc">GC</option><option value="gc_vip">GC VIP</option><option value="gc_ambassador">GC Ambassadrice</option></select>
      </div>
      <input style={inputStyle} placeholder="Titre *" value={form.title} onChange={(e) => f("title", e.target.value)} />
      <textarea style={{ ...inputStyle, minHeight: 70 }} placeholder="Description courte" value={form.short_description} onChange={(e) => f("short_description", e.target.value)} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 }}>
        <input style={inputStyle} placeholder="Territoire" value={form.territory} onChange={(e) => f("territory", e.target.value)} />
        <input style={inputStyle} placeholder="Lieu" value={form.venue_name} onChange={(e) => f("venue_name", e.target.value)} />
        <input style={inputStyle} placeholder="Adresse" value={form.address} onChange={(e) => f("address", e.target.value)} />
        <input style={inputStyle} placeholder="URL flyer" value={form.flyer_url} onChange={(e) => f("flyer_url", e.target.value)} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 8 }}>
        <label style={labelStyle}>Début<input style={inputStyle} type="datetime-local" value={form.starts_at} onChange={(e) => f("starts_at", e.target.value)} /></label>
        <label style={labelStyle}>Fin<input style={inputStyle} type="datetime-local" value={form.ends_at} onChange={(e) => f("ends_at", e.target.value)} /></label>
        <label style={labelStyle}>Fin réservation<input style={inputStyle} type="datetime-local" value={form.booking_deadline} onChange={(e) => f("booking_deadline", e.target.value)} /></label>
        <label style={labelStyle}>Heure limite arrivée<input style={inputStyle} type="datetime-local" value={form.arrival_deadline} onChange={(e) => f("arrival_deadline", e.target.value)} /></label>
        <label style={labelStyle}>Fin annulation<input style={inputStyle} type="datetime-local" value={form.cancellation_deadline} onChange={(e) => f("cancellation_deadline", e.target.value)} /></label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 8 }}>
        <label style={labelStyle}>Quota<input style={inputStyle} type="number" value={form.capacity} onChange={(e) => f("capacity", e.target.value)} /></label>
        <label style={labelStyle}>Groupe min<input style={inputStyle} type="number" value={form.group_min} onChange={(e) => f("group_min", e.target.value)} /></label>
        <label style={labelStyle}>Groupe max<input style={inputStyle} type="number" value={form.group_max} onChange={(e) => f("group_max", e.target.value)} /></label>
        <label style={labelStyle}>Mode<select style={inputStyle} value={form.reservation_mode} onChange={(e) => f("reservation_mode", e.target.value)}><option value="individual">Individuel</option><option value="group">Groupe</option><option value="both">Les deux</option></select></label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input style={inputStyle} placeholder="Privilège / avantage" value={form.benefit_label} onChange={(e) => f("benefit_label", e.target.value)} />
        <input style={inputStyle} placeholder="Description avantage" value={form.benefit_description} onChange={(e) => f("benefit_description", e.target.value)} />
      </div>
    </div>
  );
}
