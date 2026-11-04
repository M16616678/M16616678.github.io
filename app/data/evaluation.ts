/**
 * Original, synthetic AI evaluation demonstrations.
 * None of this is client data, a proprietary rubric, or a benchmark of real commercial models.
 * Responses are labelled "Response A / B" on purpose so nobody mistakes them for named models.
 */

export interface RubricDimension {
  id: string;
  name: string;
  weight: number; // percent, all weights sum to 100
  guide: string;
}

export const rubric: RubricDimension[] = [
  { id: "correctness", name: "Technical correctness", weight: 40, guide: "Does it produce the right result for normal and edge-case inputs?" },
  { id: "adherence", name: "Instruction adherence", weight: 25, guide: "Does it follow every explicit requirement in the prompt?" },
  { id: "edges", name: "Edge cases", weight: 20, guide: "Are empty, boundary and invalid inputs handled as specified?" },
  { id: "clarity", name: "Clarity", weight: 15, guide: "Is the code or explanation easy to read and correctly documented?" },
];

export const PASS_SCORE = 80;
export const MIN_CORRECTNESS = 4;

/** Weighted score out of 100 from 1-5 ratings, rounded to one decimal place. */
export function weightedScore(ratings: number[], dims: RubricDimension[] = rubric): number {
  if (ratings.length !== dims.length) throw new Error("ratings and rubric length differ");
  const total = dims.reduce((sum, d, i) => {
    const r = Math.min(5, Math.max(1, ratings[i]));
    return sum + (d.weight * r) / 5;
  }, 0);
  return Math.round(total * 10) / 10;
}

export type Verdict = "Pass" | "Fail: correctness gate" | "Fail: below threshold";

/** Pass needs both the overall threshold and a minimum correctness rating (a hard gate). */
export function verdict(ratings: number[], dims: RubricDimension[] = rubric): Verdict {
  const ci = dims.findIndex((d) => d.id === "correctness");
  if (ci >= 0 && ratings[ci] < MIN_CORRECTNESS) return "Fail: correctness gate";
  return weightedScore(ratings, dims) >= PASS_SCORE ? "Pass" : "Fail: below threshold";
}

export const failureTaxonomy = [
  { id: "logic", label: "Logic error", desc: "Wrong result on valid input." },
  { id: "edge", label: "Unhandled edge case", desc: "Empty, boundary or invalid input breaks the contract." },
  { id: "instruction", label: "Instruction miss", desc: "Ignores an explicit requirement." },
  { id: "hallucination", label: "Unsupported claim", desc: "States something the evidence does not support." },
  { id: "tool", label: "Tool misuse", desc: "Calls the wrong tool, wrong arguments, or ignores the tool result." },
  { id: "reasoning", label: "Reasoning slip", desc: "A step in the derivation does not follow from the previous one." },
] as const;
export type FailureId = (typeof failureTaxonomy)[number]["id"];

export const codeTask = {
  prompt: "Write mean(values: number[]): number | null. Return null for an empty array.",
  code: `function mean(values: number[]): number | null {
  return values.reduce((s, n) => s + n, 0) / values.length;
}`,
  tests: [
    { input: "[2, 4, 6]", expected: "4", actual: "4", pass: true },
    { input: "[-1, 1]", expected: "0", actual: "0", pass: true },
    { input: "[]", expected: "null", actual: "NaN", pass: false },
  ],
  finding: "Returns NaN on an empty array because 0 / 0 is NaN. That breaks the explicit null contract even though ordinary inputs pass.",
  failures: ["edge", "instruction"] as FailureId[],
  suggested: [3, 2, 1, 4],
  fix: `function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((s, n) => s + n, 0) / values.length;
}`,
};

export interface ComparedResponse {
  id: "A" | "B";
  text: string;
  ratings: number[];
  notes: string[];
  failures: FailureId[];
}

export const comparisonTask = {
  prompt: "In two or three sentences, explain why a SQL index can slow down INSERT statements.",
  responses: [
    {
      id: "A",
      text: "Every index is a separate data structure, usually a B-tree, that must be updated on each INSERT. More indexes mean more writes and page splits per row, so inserts take longer even though reads get faster.",
      ratings: [5, 5, 4, 5],
      notes: ["Correct mechanism (extra structure maintenance)", "Respects the 2 to 3 sentence limit", "Mentions the read and write trade-off"],
      failures: [],
    },
    {
      id: "B",
      text: "Indexes slow INSERTs because the database has to rebuild the whole index from scratch after every insert. This is why you should never use more than one index per table. Indexes are mainly useful for UPDATE statements.",
      ratings: [1, 4, 2, 3],
      notes: ["Indexes are updated incrementally, not rebuilt", "\"Never more than one index\" is unsupported advice", "Indexes mainly help reads (SELECT), not UPDATE"],
      failures: ["logic", "hallucination"],
    },
  ] as ComparedResponse[],
};

export const reasoningTask = {
  prompt: "A train travels 120 km in 1.5 hours, then 80 km in 0.5 hours. What is its average speed for the whole trip?",
  steps: [
    { text: "Total distance = 120 + 80 = 200 km.", ok: true, note: "Correct." },
    { text: "Speeds are 120 / 1.5 = 80 km/h and 80 / 0.5 = 160 km/h.", ok: true, note: "Correct, but not needed for the answer." },
    { text: "Average speed = (80 + 160) / 2 = 120 km/h.", ok: false, note: "Reasoning slip: averages the two speeds instead of dividing total distance by total time." },
    { text: "Answer: 120 km/h.", ok: false, note: "Wrong final answer. Correct value is 200 / 2.0 = 100 km/h." },
  ],
  correct: "200 km / 2.0 h = 100 km/h",
  failures: ["reasoning"] as FailureId[],
};

export type TraceStatus = "ok" | "warn" | "fail";
export const agentTrace = {
  goal: "User: \"What's the total of the three unpaid invoices for ACME (synthetic data)?\"",
  steps: [
    { kind: "thought", label: "Plan", body: "Look up ACME's invoices, filter unpaid, sum the amounts.", status: "ok" as TraceStatus },
    { kind: "tool", label: "search_invoices({ customer: \"ACME\" })", body: "→ 4 invoices: #101 $1,200 paid · #102 $450 unpaid · #103 $980 unpaid · #104 $300 unpaid", status: "ok" as TraceStatus },
    { kind: "thought", label: "Filter", body: "Unpaid: #102, #103, #104.", status: "ok" as TraceStatus },
    { kind: "tool", label: "calculator({ expr: \"450 + 980 + 1200\" })", body: "→ 2630", status: "fail" as TraceStatus },
    { kind: "answer", label: "Final answer", body: "The unpaid total is $2,630.", status: "fail" as TraceStatus },
  ],
  diagnosis: "Tool misuse: the calculator call used #101's $1,200 (paid) instead of #104's $300. Correct total is 450 + 980 + 300 = $1,730. The plan and filter steps were right, so the failure is localised to step 4.",
  failures: ["tool"] as FailureId[],
};
