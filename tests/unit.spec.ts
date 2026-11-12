import { expect, test } from "@playwright/test";
import { rubric, verdict, weightedScore, codeTask, comparisonTask } from "../app/data/evaluation";
import { profile, projects, timeline, getProject } from "../app/data/portfolio";

test("rubric weights sum to 100", () => {
  expect(rubric.reduce((s, d) => s + d.weight, 0)).toBe(100);
});

test("weighted score math", () => {
  expect(weightedScore([5, 5, 5, 5])).toBe(100);
  expect(weightedScore([1, 1, 1, 1])).toBe(20);
  expect(weightedScore([4, 4, 3, 4])).toBe(76);
  expect(weightedScore([5, 5, 4, 5])).toBe(96);
  expect(weightedScore([9, 0, 3, 3])).toBe(weightedScore([5, 1, 3, 3])); // clamps to 1-5
  expect(() => weightedScore([1, 2])).toThrow();
});

test("verdict applies correctness gate before threshold", () => {
  expect(verdict([5, 5, 5, 5])).toBe("Pass");
  expect(verdict([3, 5, 5, 5])).toBe("Fail: correctness gate");
  expect(verdict([4, 3, 3, 3])).toBe("Fail: below threshold");
  expect(verdict(codeTask.suggested)).not.toBe("Pass");
  expect(verdict(comparisonTask.responses[0].ratings)).toBe("Pass");
  expect(verdict(comparisonTask.responses[1].ratings)).not.toBe("Pass");
});

test("content model integrity", () => {
  const slugs = new Set(projects.map((p) => p.slug));
  expect(slugs.size).toBe(projects.length);
  for (const p of projects) {
    for (const r of p.related) expect(slugs.has(r), `${p.slug} -> ${r}`).toBe(true);
    const ids = new Set(p.diagram.nodes.map((n) => n.id));
    for (const [a, b] of p.diagram.edges) expect(ids.has(a) && ids.has(b), `${p.slug} edge ${a}-${b}`).toBe(true);
  }
  for (const t of timeline) for (const s of t.projects) expect(getProject(s), s).toBeTruthy();
});

test("content guardrails from the handoff", () => {
  const all = JSON.stringify({ projects, timeline });
  expect(all).toContain("Information Technology");
  expect(all).not.toMatch(/Computer Science/);
  expect(all).not.toMatch(/KL University|Electronics & Communication/);
  expect(all).not.toMatch(/hand rehabilitation/i);
  expect(getProject("cfms")!.summary).toMatch(/state-government/);
});

test("university degree dates and rounded GPA match the university record", () => {
  const uc = timeline.find((t) => t.id === "uc");
  expect(uc?.title).toBe("M.S. Information Technology");
  expect(uc?.period).toBe("Aug 2024 to Dec 2025");
  expect(uc?.body).toContain("December 13, 2025");
  expect(uc?.body).toContain("3.971 / 4.0");
});

test("latest professional status and public asset references", () => {
  const fulltime = timeline.find((t) => t.id === "innovision");
  const internship = timeline.find((t) => t.id === "innovision-intern");
  expect(fulltime?.title).toBe("Software Engineer (Full-time)");
  expect(fulltime?.period).toMatch(/Oct 2026/);
  expect(internship?.period).toMatch(/Jan 2026 to Sep 2026/);
  expect(profile.portraits).toHaveLength(2);
  expect(profile.portraits[0].src).toBe("/portfolio-formal-hq.webp");
  expect(profile.portraits[1].src).toBe("/portfolio-headshot-hq.webp");
  expect(profile.summary).toMatch(/full-time Software Engineer at Innovision LLC/);
  expect(timeline.find((t) => t.id === "tcs")?.place).toBe("Kolkata, India");
});
