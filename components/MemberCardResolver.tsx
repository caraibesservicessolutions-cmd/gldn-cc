"use client";

import { useEffect, useState } from "react";
import { MemberCard } from "@/components/MemberCard";
import type { Locale } from "@/lib/i18n";
import {
  seedMembers,
  getMemberBySecretId,
  memberPageText,
  type Member
} from "@/lib/members";
import { memberService } from "@/src/lib/members/member.service";

export function MemberCardResolver({
  locale,
  secretId
}: {
  locale: Locale;
  secretId: string;
}) {
  const [member, setMember] = useState<Member | null>(() =>
    getMemberBySecretId(secretId, seedMembers) ?? null
  );

  useEffect(() => {
    let mounted = true;

    memberService.getMemberBySecretId(secretId).then((result) => {
      if (mounted) {
        setMember(result.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, [secretId]);

  if (!member) {
    return (
      <div className="premium-border rounded-lg bg-coal/86 p-6 text-mist shadow-card">
        <p className="font-display text-3xl font-bold text-white">
          {memberPageText[locale].unavailable}
        </p>
        <p className="mt-3 font-mono text-sm text-champagne">{secretId}</p>
      </div>
    );
  }

  return <MemberCard member={member} locale={locale} />;
}
