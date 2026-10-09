/**
 * The Jobhunt match score, re-created for the browser demo.
 *
 * The weights, the "first five skills count double" rule, the middling 60 for
 * anything the posting does not state, and both caps come from Jobhunt's
 * src/lib/match.ts. Role fit is simplified to four preset cases here; the
 * real scorer derives it from job title taxonomies.
 */

export const WEIGHT = { role: 0.45, skills: 0.35, level: 0.2 } as const;
export const UNKNOWN = 60;

export type RoleFit = "exact" | "same" | "related" | "different";
export type Band = "strong" | "good" | "fair" | "low";
export type PartKey = keyof typeof WEIGHT;

export const ROLE: Record<RoleFit, { score: number; reason: string }> = {
  exact: { score: 100, reason: "The title matches your target title." },
  same: { score: 80, reason: "Same kind of work as your target title." },
  related: { score: 45, reason: "Related to your target title, not the same work." },
  different: { score: 20, reason: "A different kind of work from your target title." },
};

export type MatchInput = {
  roleFit: RoleFit;
  asked: string[]; // skills the posting names, most mentioned first
  have: ReadonlySet<string>;
  yearsMin: number | null; // null when the posting does not say
  years: number;
  needsSponsorship: boolean;
  noSponsorship: boolean; // the posting rules sponsorship out
};

export type MatchPart = { key: PartKey; label: string; score: number | null; reason: string };
export type MatchResult = { score: number; band: Band; parts: MatchPart[]; cap: string | null };

export const bandFor = (score: number): Band =>
  score >= 80 ? "strong" : score >= 65 ? "good" : score >= 50 ? "fair" : "low";

/** Skills are in order of how often the posting names them. The first five count double. */
export function skillsPart(asked: string[], have: ReadonlySet<string>): MatchPart {
  const top = asked.slice(0, 12);
  if (top.length < 3) {
    return { key: "skills", label: "Skills", score: null, reason: "The posting names too few skills to compare." };
  }
  let got = 0;
  let total = 0;
  let matched = 0;
  top.forEach((skill, i) => {
    const w = i < 5 ? 2 : 1;
    total += w;
    if (have.has(skill)) {
      got += w;
      matched++;
    }
  });
  return {
    key: "skills",
    label: "Skills",
    score: Math.round((100 * got) / total),
    reason: `You have ${matched} of the ${top.length} skills the posting names most.`,
  };
}

export function levelPart(yearsMin: number | null, years: number): MatchPart {
  if (yearsMin === null) {
    return { key: "level", label: "Level", score: null, reason: "The posting does not say what level it is." };
  }
  const gap = yearsMin - years;
  const score = gap <= 0 ? 100 : gap <= 1 ? 80 : gap <= 2 ? 60 : gap <= 3 ? 40 : 20;
  return {
    key: "level",
    label: "Level",
    score,
    reason:
      gap <= 0
        ? `It asks for ${yearsMin}+ years; you have ${years}.`
        : `It asks for ${yearsMin}+ years; you have ${years}, ${gap} short.`,
  };
}

export function scoreJob(input: MatchInput): MatchResult {
  const role: MatchPart = { key: "role", label: "Role", ...ROLE[input.roleFit] };
  const parts = [role, skillsPart(input.asked, input.have), levelPart(input.yearsMin, input.years)];

  // A part the posting gives nothing to judge by counts as a middling 60, so a
  // job known only by its title cannot reach the top of the feed.
  let score = Math.round(parts.reduce((sum, p) => sum + (p.score ?? UNKNOWN) * WEIGHT[p.key], 0));
  let cap: string | null = null;

  // Shared tools do not make a different job a good match.
  if (role.score !== null && role.score < 40 && score > 55) {
    score = 55;
    cap = "Held at 55% because the role is a different kind of work.";
  }
  if (input.needsSponsorship && input.noSponsorship) {
    score = Math.min(score, 20);
    cap = "Held at 20%. The posting says it does not sponsor visas, and your profile says you need sponsorship.";
  }
  return { score, band: bandFor(score), parts, cap };
}
