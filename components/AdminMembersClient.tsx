"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Eye,
  KeyRound,
  Pencil,
  PauseCircle,
  PlayCircle,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  XCircle
} from "lucide-react";
import { SocialProof } from "@/components/SocialProof";
import type { Locale } from "@/lib/i18n";
import {
  seedMembers,
  memberPageText,
  memberStatuses,
  memberStatusLabels,
  memberTypeLabels,
  memberTypes,
  type Member,
  type MemberInput,
  type MemberLanguage,
  type MemberStatus,
  type MemberType
} from "@/lib/members";
import { memberService } from "@/src/lib/members/member.service";

const adminAccessStorageKey = "golden-circle-local-admin-access";
const fallbackAdminCode = "GC-LOCAL-2026";

const copy = {
  fr: {
    total: "Total comptes",
    active: "Actifs",
    pending: "En attente",
    suspended: "Suspendus",
    deleted: "Supprimés",
    formCreate: "Créer un compte",
    formEdit: "Modifier un compte",
    list: "Comptes membres",
    name: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    instagram: "Instagram",
    type: "Type de compte",
    status: "Statut",
    language: "Langue préférée",
    location: "Lieu / zone",
    start: "Date début",
    end: "Date fin",
    notes: "Notes admin",
    create: "Créer le compte",
    save: "Enregistrer",
    cancel: "Annuler",
    suspend: "Suspendre",
    reactivate: "Réactiver",
    softDelete: "Désactiver",
    delete: "Supprimer",
    copySecret: "Copier Secret ID",
    viewCard: "Voir carte",
    resetSeed: "Réinitialiser les données locales",
    search: "Rechercher nom, email, téléphone ou Secret ID",
    filterAll: "Tous statuts",
    typeAll: "Tous types",
    successCreate: "Compte créé. Carte virtuelle générée automatiquement.",
    successUpdate: "Compte mis à jour.",
    loading: "Chargement des comptes...",
    accessTitle: "Accès admin",
    accessText:
      "Entre le code admin de démonstration pour ouvrir la gestion locale.",
    accessButton: "Ouvrir admin",
    accessError: "Code incorrect.",
    tempSecurity:
      "Protection temporaire. En production, remplacer par Supabase Auth + rôle admin.",
    deleteConfirm:
      "Cette action supprime le compte de la liste locale. En production, elle devra être sécurisée et journalisée. Confirmer la suppression ?",
    supabaseNote:
      "Supabase-ready : localStorage sera remplacé par la table members, avec soft delete recommandé."
  },
  en: {
    total: "Total accounts",
    active: "Active",
    pending: "Pending",
    suspended: "Suspended",
    deleted: "Deleted",
    formCreate: "Create account",
    formEdit: "Edit account",
    list: "Member accounts",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    instagram: "Instagram",
    type: "Account type",
    status: "Status",
    language: "Preferred language",
    location: "Location / area",
    start: "Start date",
    end: "End date",
    notes: "Admin notes",
    create: "Create account",
    save: "Save",
    cancel: "Cancel",
    suspend: "Suspend",
    reactivate: "Reactivate",
    softDelete: "Disable",
    delete: "Delete",
    copySecret: "Copy Secret ID",
    viewCard: "View card",
    resetSeed: "Reset local data",
    search: "Search name, email, phone or Secret ID",
    filterAll: "All statuses",
    typeAll: "All types",
    successCreate: "Account created. Virtual card generated automatically.",
    successUpdate: "Account updated.",
    loading: "Loading accounts...",
    accessTitle: "Admin access",
    accessText: "Enter the admin access code to open local management.",
    accessButton: "Open admin",
    accessError: "Incorrect code.",
    tempSecurity:
      "Temporary protection. In production, replace with Supabase Auth + admin role.",
    deleteConfirm:
      "This action removes the account from the local list. In production, it must be secured and logged. Confirm deletion?",
    supabaseNote:
      "Supabase-ready: localStorage will be replaced by the members table, with soft delete recommended."
  },
  es: {
    total: "Total cuentas",
    active: "Activas",
    pending: "Pendientes",
    suspended: "Suspendidas",
    deleted: "Eliminadas",
    formCreate: "Crear cuenta",
    formEdit: "Editar cuenta",
    list: "Cuentas miembros",
    name: "Nombre completo",
    email: "Email",
    phone: "Teléfono",
    instagram: "Instagram",
    type: "Tipo de cuenta",
    status: "Estado",
    language: "Idioma preferido",
    location: "Lugar / zona",
    start: "Fecha inicio",
    end: "Fecha fin",
    notes: "Notas admin",
    create: "Crear cuenta",
    save: "Guardar",
    cancel: "Cancelar",
    suspend: "Suspender",
    reactivate: "Reactivar",
    softDelete: "Desactivar",
    delete: "Eliminar",
    copySecret: "Copiar Secret ID",
    viewCard: "Ver tarjeta",
    resetSeed: "Reiniciar datos locales",
    search: "Buscar nombre, email, teléfono o Secret ID",
    filterAll: "Todos estados",
    typeAll: "Todos tipos",
    successCreate: "Cuenta creada. Tarjeta virtual generada automáticamente.",
    successUpdate: "Cuenta actualizada.",
    loading: "Cargando cuentas...",
    accessTitle: "Acceso admin",
    accessText: "Introduce el código admin para abrir la gestión local.",
    accessButton: "Abrir admin",
    accessError: "Código incorrecto.",
    tempSecurity:
      "Protección temporal. En producción, reemplazar por Supabase Auth + rol admin.",
    deleteConfirm:
      "Esta acción elimina la cuenta de la lista local. En producción deberá estar protegida y registrada. ¿Confirmar eliminación?",
    supabaseNote:
      "Supabase-ready: localStorage será reemplazado por la tabla members, con soft delete recomendado."
  },
  pt: {
    total: "Total contas",
    active: "Ativas",
    pending: "Pendentes",
    suspended: "Suspensas",
    deleted: "Removidas",
    formCreate: "Criar conta",
    formEdit: "Editar conta",
    list: "Contas membros",
    name: "Nome completo",
    email: "Email",
    phone: "Telefone",
    instagram: "Instagram",
    type: "Tipo de conta",
    status: "Status",
    language: "Idioma preferido",
    location: "Local / zona",
    start: "Data início",
    end: "Data fim",
    notes: "Notas admin",
    create: "Criar conta",
    save: "Salvar",
    cancel: "Cancelar",
    suspend: "Suspender",
    reactivate: "Reativar",
    softDelete: "Desativar",
    delete: "Excluir",
    copySecret: "Copiar Secret ID",
    viewCard: "Ver cartão",
    resetSeed: "Reiniciar datos locales",
    search: "Buscar nome, email, telefone ou Secret ID",
    filterAll: "Todos status",
    typeAll: "Todos tipos",
    successCreate: "Conta criada. Cartão virtual gerado automaticamente.",
    successUpdate: "Conta atualizada.",
    loading: "Carregando contas...",
    accessTitle: "Acesso admin",
    accessText: "Digite o código admin para abrir a gestão local.",
    accessButton: "Abrir admin",
    accessError: "Código incorreto.",
    tempSecurity:
      "Proteção temporária. Em produção, substituir por Supabase Auth + papel admin.",
    deleteConfirm:
      "Esta ação remove a conta da lista local. Em produção, deverá ser segura e registrada. Confirmar exclusão?",
    supabaseNote:
      "Supabase-ready: localStorage será substituído pela tabela members, com soft delete recomendado."
  },
  ht: {
    total: "Total kont",
    active: "Aktif",
    pending: "Ap tann",
    suspended: "Sispann",
    deleted: "Efase",
    formCreate: "Kreye kont",
    formEdit: "Modifye kont",
    list: "Kont manm yo",
    name: "Non konplè",
    email: "Email",
    phone: "Telefòn",
    instagram: "Instagram",
    type: "Kalite kont",
    status: "Estati",
    language: "Lang prefere",
    location: "Kote / zòn",
    start: "Dat kòmansman",
    end: "Dat fen",
    notes: "Nòt admin",
    create: "Kreye kont",
    save: "Sove",
    cancel: "Anile",
    suspend: "Sispann",
    reactivate: "Reaktive",
    softDelete: "Dezaktive",
    delete: "Efase",
    copySecret: "Kopye Secret ID",
    viewCard: "Gade kat",
    resetSeed: "Rekòmanse done lokal yo",
    search: "Chèche non, email, telefòn oswa Secret ID",
    filterAll: "Tout estati",
    typeAll: "Tout kalite",
    successCreate: "Kont kreye. Kat vityèl la kreye otomatikman.",
    successUpdate: "Kont mete ajou.",
    loading: "Chajman kont yo...",
    accessTitle: "Aksè admin",
    accessText: "Antre kòd admin nan pou louvri jesyon lokal la.",
    accessButton: "Louvri admin",
    accessError: "Kòd pa bon.",
    tempSecurity:
      "Pwoteksyon tanporè. Nan pwodiksyon, ranplase pa Supabase Auth + wòl admin.",
    deleteConfirm:
      "Aksyon sa a efase kont lan nan lis lokal la. Nan pwodiksyon, li dwe sekirize epi anrejistre. Konfime efasman an?",
    supabaseNote:
      "Pare pou Supabase: localStorage pral ranplase pa tablo members, ak soft delete rekòmande."
  }
};

const today = new Date().toISOString().slice(0, 10);

const emptyForm: MemberInput = {
  fullName: "",
  email: "",
  phone: "",
  instagram: "",
  type: "gc_list",
  status: "active",
  language: "fr",
  location: "",
  startDate: today,
  endDate: "",
  notes: ""
};

const languageLabels: Record<MemberLanguage, string> = {
  fr: "FR",
  en: "EN",
  es: "ES",
  pt: "PT",
  ht: "HT"
};

export function AdminMembersClient({ locale }: { locale: Locale }) {
  const [hasAccess, setHasAccess] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(adminAccessStorageKey) === "ok";
  });
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState(false);
  const [members, setMembers] = useState<Member[]>(seedMembers);
  const [form, setForm] = useState<MemberInput>({
    ...emptyForm,
    language: locale
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<MemberType | "all">("all");
  const [message, setMessage] = useState("");
  const [developerMessage, setDeveloperMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastCreated, setLastCreated] = useState<Member | null>(null);

  const t = copy[locale];
  const typeLabels = memberTypeLabels[locale];
  const statusLabels = memberStatusLabels[locale];
  const pageCopy = memberPageText[locale];

  async function refreshMembers() {
    setLoading(true);
    const result = await memberService.listMembers();
    setMembers(result.data);
    setDeveloperMessage(result.developerMessage ?? "");
    setLoading(false);
  }

  useEffect(() => {
    if (hasAccess) {
      void refreshMembers();
    }
  }, [hasAccess]);

  function unlockAdmin() {
    const expectedCode =
      process.env.NEXT_PUBLIC_ADMIN_DEMO_CODE || fallbackAdminCode;

    // Cette protection est temporaire. En production, remplacer par Supabase Auth + rôle admin.
    if (accessCode.trim() === expectedCode) {
      window.localStorage.setItem(adminAccessStorageKey, "ok");
      window.localStorage.setItem("golden-circle-admin-code", accessCode.trim());
      setHasAccess(true);
      setAccessError(false);
      return;
    }

    setAccessError(true);
  }

  async function createMemberAction() {
    if (!form.fullName.trim()) return;

    const result = await memberService.createMember(form);
    const member = result.data;
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
    setForm({ ...emptyForm, language: locale });
    setEditingId(null);
    setLastCreated(member);
    setMessage(t.successCreate);
  }

  async function updateMemberAction() {
    if (!editingId || !form.fullName.trim()) return;

    const result = await memberService.updateMember(editingId, form);
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
    setForm({ ...emptyForm, language: locale });
    setEditingId(null);
    setLastCreated(null);
    setMessage(t.successUpdate);
  }

  function editMember(member: Member) {
    setEditingId(member.id);
    setForm({
      fullName: member.fullName,
      email: member.email ?? "",
      phone: member.phone ?? "",
      instagram: member.instagram ?? "",
      type: member.type,
      status: member.status,
      language: member.language,
      location: member.location ?? "",
      startDate: member.startDate,
      endDate: member.endDate ?? "",
      notes: member.notes ?? ""
    });
    setLastCreated(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ ...emptyForm, language: locale });
  }

  async function suspendMemberAction(id: string) {
    const result = await memberService.suspendMember(id);
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
  }

  async function reactivateMemberAction(id: string) {
    const result = await memberService.reactivateMember(id);
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
  }

  async function softDeleteMemberAction(id: string) {
    const result = await memberService.softDeleteMember(id);
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
  }

  async function hardDeleteMemberAction(id: string) {
    if (!window.confirm(t.deleteConfirm)) return;
    const result = await memberService.hardDeleteMember(id);
    setDeveloperMessage(result.developerMessage ?? "");
    await refreshMembers();
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  function resetSeed() {
    window.localStorage.setItem("golden-circle-local-members", JSON.stringify(seedMembers));
    setMembers(seedMembers);
    setMessage("");
    setLastCreated(null);
    cancelEdit();
  }

  const stats = useMemo(
    () => ({
      total: members.length,
      active: members.filter((member) => member.status === "active").length,
      pending: members.filter((member) => member.status === "pending").length,
      suspended: members.filter((member) => member.status === "suspended").length,
      deleted: members.filter((member) => member.status === "deleted").length
    }),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const matchesQuery = normalizedQuery
        ? [
            member.fullName,
            member.email,
            member.phone,
            member.secretId,
            member.instagram
          ]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(normalizedQuery))
        : true;
      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;
      const matchesType = typeFilter === "all" || member.type === typeFilter;

      return matchesQuery && matchesStatus && matchesType;
    });
  }, [members, query, statusFilter, typeFilter]);

  if (!hasAccess) {
    return (
      <section className="premium-border mt-10 max-w-xl rounded-lg bg-coal/86 p-6 shadow-card">
        <KeyRound className="h-8 w-8 text-gold" aria-hidden />
        <h2 className="mt-4 font-display text-3xl font-bold text-white">
          {t.accessTitle}
        </h2>
        <p className="mt-3 text-sm leading-7 text-mist">{t.accessText}</p>
        <p className="mt-2 text-xs leading-6 text-mist/80">{t.tempSecurity}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={accessCode}
            onChange={(event) => setAccessCode(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") unlockAdmin();
            }}
            className="min-h-12 rounded-lg border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-gold"
            placeholder="GC-LOCAL-2026"
            type="password"
          />
          <button
            type="button"
            onClick={unlockAdmin}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-black uppercase tracking-wide text-ink shadow-glow"
          >
            {t.accessButton}
          </button>
        </div>
        {accessError ? (
          <p className="mt-3 text-sm font-semibold text-ruby">{t.accessError}</p>
        ) : null}
      </section>
    );
  }

  return (
    <div className="mt-10 grid gap-8">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label={t.total} value={stats.total} />
        <Stat label={t.active} value={stats.active} />
        <Stat label={t.pending} value={stats.pending} />
        <Stat label={t.suspended} value={stats.suspended} />
        <Stat label={t.deleted} value={stats.deleted} />
      </section>

      <SocialProof locale={locale} compact />

      {loading || developerMessage ? (
        <div className="rounded-lg border border-gold/20 bg-black/25 p-4 text-sm leading-6 text-mist">
          {loading ? t.loading : developerMessage}
        </div>
      ) : null}

      <section className="premium-border rounded-lg bg-coal/86 p-5 shadow-card">
        <h2 className="font-display text-3xl font-bold text-white">
          {editingId ? t.formEdit : t.formCreate}
        </h2>
        <p className="mt-2 text-sm leading-6 text-mist">{t.supabaseNote}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Field label={t.name} value={form.fullName} onChange={(fullName) => setForm({ ...form, fullName })} />
          <Field label={t.email} value={form.email ?? ""} onChange={(email) => setForm({ ...form, email })} />
          <Field label={t.phone} value={form.phone ?? ""} onChange={(phone) => setForm({ ...form, phone })} />
          <Field label={t.instagram} value={form.instagram ?? ""} onChange={(instagram) => setForm({ ...form, instagram })} />
          <Select
            label={t.type}
            value={form.type}
            values={memberTypes}
            labels={typeLabels}
            onChange={(type) => setForm({ ...form, type: type as MemberType })}
          />
          <Select
            label={t.status}
            value={form.status}
            values={memberStatuses}
            labels={statusLabels}
            onChange={(status) => setForm({ ...form, status: status as MemberStatus })}
          />
          <Select
            label={t.language}
            value={form.language}
            values={Object.keys(languageLabels)}
            labels={languageLabels}
            onChange={(language) => setForm({ ...form, language: language as MemberLanguage })}
          />
          <Field label={t.location} value={form.location ?? ""} onChange={(location) => setForm({ ...form, location })} />
          <Field label={t.start} value={form.startDate} type="date" onChange={(startDate) => setForm({ ...form, startDate })} />
          <Field label={t.end} value={form.endDate ?? ""} type="date" onChange={(endDate) => setForm({ ...form, endDate })} />
          <Field label={t.notes} value={form.notes ?? ""} onChange={(notes) => setForm({ ...form, notes })} className="xl:col-span-2" />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={editingId ? updateMemberAction : createMemberAction}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-black uppercase tracking-wide text-ink shadow-glow transition hover:bg-champagne sm:w-auto"
          >
            {editingId ? <CheckCircle2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? t.save : t.create}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold uppercase tracking-wide text-mist sm:w-auto"
            >
              <XCircle className="h-4 w-4" />
              {t.cancel}
            </button>
          ) : null}
        </div>
        {message ? (
          <div className="mt-5 rounded-lg border border-gold/20 bg-gold/10 p-4 text-sm font-semibold text-champagne">
            {message}
            {lastCreated ? (
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/${locale}/card/${lastCreated.secretId}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-ink"
                >
                  <Eye className="h-4 w-4" />
                  {t.viewCard}
                </Link>
                <button
                  type="button"
                  onClick={() => copyText(lastCreated.secretId)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-champagne"
                >
                  <Copy className="h-4 w-4" />
                  {t.copySecret}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="premium-border rounded-lg bg-coal/86 p-5 shadow-card">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="font-display text-3xl font-bold text-white">{t.list}</h2>
          <button
            type="button"
            onClick={resetSeed}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold/30 px-3 py-2 text-xs font-bold uppercase text-champagne"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t.resetSeed}
          </button>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_180px_180px]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
              className="min-h-12 w-full rounded-lg border border-white/10 bg-black/30 pl-10 pr-3 text-white outline-none focus:border-gold"
            />
          </label>
          <Select
            label=""
            value={statusFilter}
            values={["all", ...memberStatuses]}
            labels={{ all: t.filterAll, ...statusLabels }}
            onChange={(status) => setStatusFilter(status as MemberStatus | "all")}
          />
          <Select
            label=""
            value={typeFilter}
            values={["all", ...memberTypes]}
            labels={{ all: t.typeAll, ...typeLabels }}
            onChange={(type) => setTypeFilter(type as MemberType | "all")}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:hidden">
          {filteredMembers.map((member) => (
            <MemberAdminCard
              key={member.id}
              member={member}
              locale={locale}
              labels={{ ...t, type: typeLabels[member.type], status: statusLabels[member.status] }}
              onEdit={() => editMember(member)}
              onCopy={() => copyText(member.secretId)}
              onSuspend={() => suspendMemberAction(member.id)}
              onReactivate={() => reactivateMemberAction(member.id)}
              onSoftDelete={() => softDeleteMemberAction(member.id)}
              onHardDelete={() => hardDeleteMemberAction(member.id)}
            />
          ))}
        </div>

        <div className="mt-5 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-gold">
              <tr>
                <th className="px-4 py-3">{t.name}</th>
                <th className="px-4 py-3">{t.type}</th>
                <th className="px-4 py-3">{t.status}</th>
                <th className="px-4 py-3">Secret ID</th>
                <th className="px-4 py-3">{t.end}</th>
                <th className="px-4 py-3">{t.language}</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-t border-white/10">
                  <td className="px-4 py-4 font-semibold text-white">{member.fullName}</td>
                  <td className="px-4 py-4 text-mist">{typeLabels[member.type]}</td>
                  <td className="px-4 py-4 text-mist">{statusLabels[member.status]}</td>
                  <td className="px-4 py-4 font-mono text-champagne">{member.secretId}</td>
                  <td className="px-4 py-4 text-mist">{member.endDate || "-"}</td>
                  <td className="px-4 py-4 text-mist">{member.language.toUpperCase()}</td>
                  <td className="px-4 py-4">
                    <AdminActions
                      member={member}
                      locale={locale}
                      t={t}
                      onEdit={() => editMember(member)}
                      onCopy={() => copyText(member.secretId)}
                      onSuspend={() => suspendMemberAction(member.id)}
                      onReactivate={() => reactivateMemberAction(member.id)}
                      onSoftDelete={() => softDeleteMemberAction(member.id)}
                      onHardDelete={() => hardDeleteMemberAction(member.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-sm leading-7 text-mist">{pageCopy.adminText}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-mist">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl font-bold text-gold">{value}</p>
    </article>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-mist">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none focus:border-gold"
      />
    </label>
  );
}

function Select({
  label,
  value,
  values,
  labels,
  onChange
}: {
  label: string;
  value: string;
  values: string[];
  labels: Record<string, string>;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      {label ? (
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-mist">
          {label}
        </span>
      ) : null}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={["min-h-12 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-white outline-none focus:border-gold", label ? "mt-2" : ""].join(" ")}
      >
        {values.map((item) => (
          <option key={item} value={item} className="bg-coal text-white">
            {labels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}

function AdminActions({
  member,
  locale,
  t,
  onEdit,
  onCopy,
  onSuspend,
  onReactivate,
  onSoftDelete,
  onHardDelete
}: {
  member: Member;
  locale: Locale;
  t: (typeof copy)[Locale];
  onEdit: () => void;
  onCopy: () => void;
  onSuspend: () => void;
  onReactivate: () => void;
  onSoftDelete: () => void;
  onHardDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`/${locale}/card/${member.secretId}`} className="action-link">
        <Eye className="h-3.5 w-3.5" />
        {t.viewCard}
      </Link>
      <button type="button" onClick={onEdit} className="action-button">
        <Pencil className="h-3.5 w-3.5" />
        {t.save}
      </button>
      <button type="button" onClick={onCopy} className="action-button">
        <Copy className="h-3.5 w-3.5" />
        {t.copySecret}
      </button>
      {member.status === "suspended" || member.status === "deleted" ? (
        <button type="button" onClick={onReactivate} className="action-button">
          <PlayCircle className="h-3.5 w-3.5" />
          {t.reactivate}
        </button>
      ) : (
        <button type="button" onClick={onSuspend} className="action-danger">
          <PauseCircle className="h-3.5 w-3.5" />
          {t.suspend}
        </button>
      )}
      <button type="button" onClick={onSoftDelete} className="action-danger">
        <XCircle className="h-3.5 w-3.5" />
        {t.softDelete}
      </button>
      <button type="button" onClick={onHardDelete} className="action-danger">
        <Trash2 className="h-3.5 w-3.5" />
        {t.delete}
      </button>
    </div>
  );
}

function MemberAdminCard({
  member,
  locale,
  labels,
  onEdit,
  onCopy,
  onSuspend,
  onReactivate,
  onSoftDelete,
  onHardDelete
}: {
  member: Member;
  locale: Locale;
  labels: Record<string, string>;
  onEdit: () => void;
  onCopy: () => void;
  onSuspend: () => void;
  onReactivate: () => void;
  onSoftDelete: () => void;
  onHardDelete: () => void;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-black/25 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">
            {member.fullName}
          </h3>
          <p className="mt-1 font-mono text-xs text-champagne">{member.secretId}</p>
        </div>
        <span className="rounded-full border border-gold/20 px-2 py-1 text-[10px] font-bold uppercase text-gold">
          {member.status}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-mist">
        <p>{labels.type}</p>
        <p>{labels.status}</p>
        {member.email ? <p>{member.email}</p> : null}
        {member.phone ? <p>{member.phone}</p> : null}
      </div>
      <div className="mt-4">
        <AdminActions
          member={member}
          locale={locale}
          t={copy[locale]}
          onEdit={onEdit}
          onCopy={onCopy}
          onSuspend={onSuspend}
          onReactivate={onReactivate}
          onSoftDelete={onSoftDelete}
          onHardDelete={onHardDelete}
        />
      </div>
    </article>
  );
}
