import { accentHex, type Project } from "../../data/portfolio";

/** Small decorative SVG motif per project. Illustrative only, never a screenshot. */
export default function ProjectVisual({ project, tall = false }: { project: Project; tall?: boolean }) {
  const c = accentHex[project.accent];
  const label: Record<string, string> = {
    cfms: "PUBLIC FINANCE · SPRING", ibrace: "ROLE-BASED CARE", comfit: "RETRIEVAL + EVAL", "healthcare-testing": "MULTI-ROLE QA",
    "ai-evaluation": "RUBRIC SCORING", careerconnect: "HUMAN-CENTRED UX", "home-automation": "EMBEDDED CONTROL",
    "hospital-checkin": "JAVA APPLICATION", "cloud-data-labs": "DATA PIPELINES", arcade: "CANVAS · WEB AUDIO",
    "ai-workflows": "AUTOMATION", "portfolio-site": "STATIC EXPORT",
  };
  const motif = () => {
    switch (project.slug) {
      case "cfms":
        return [28, 46, 36, 58, 44, 70, 54, 80, 62, 88].map((h, i) => <rect key={i} x={20 + i * 26} y={100 - h * 0.8} width="14" height={h * 0.8} rx="3" fill={c} opacity={0.3 + i * 0.06} />);
      case "ibrace":
      case "healthcare-testing":
        return (
          <>
            {[["P", 50], ["G", 120], ["C", 190], ["A", 260]].map(([t, x]) => (
              <g key={t}><line x1={x as number} y1="58" x2="155" y2="95" stroke={c} strokeOpacity=".35" /><circle cx={x as number} cy="50" r="15" fill="#0a1422" stroke={c} strokeOpacity=".7" /><text x={x as number} y="55" textAnchor="middle" fontSize="12" fill={c}>{t}</text></g>
            ))}
            <rect x="120" y="88" width="70" height="20" rx="6" fill={c} opacity=".18" stroke={c} strokeOpacity=".6" />
            <text x="155" y="102" textAnchor="middle" fontSize="9" fill={c}>RLS</text>
          </>
        );
      case "comfit":
      case "ai-workflows":
        return (
          <>
            {[[40, 70], [110, 40], [110, 95], [190, 60], [260, 70]].map(([x, y], i, a) => (
              <g key={i}>{i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke={c} strokeOpacity=".4" strokeDasharray="3 3" />}<circle cx={x} cy={y} r={i === 3 ? 12 : 8} fill="#0a1422" stroke={c} /></g>
            ))}
          </>
        );
      case "ai-evaluation":
        return [0.92, 0.7, 0.45, 0.85].map((w, i) => (
          <g key={i}><rect x="30" y={22 + i * 22} width="250" height="9" rx="4.5" fill="#ffffff10" /><rect x="30" y={22 + i * 22} width={250 * w} height="9" rx="4.5" fill={c} opacity=".75" /></g>
        ));
      case "arcade":
        return (
          <>
            <rect x="60" y="20" width="190" height="90" rx="10" fill="#0a1422" stroke={c} strokeOpacity=".5" />
            {[[90, 50], [130, 80], [170, 45], [210, 75]].map(([x, y], i) => <rect key={i} x={x} y={y} width="12" height="12" rx="2" fill={c} opacity={0.4 + i * 0.15} />)}
            <circle cx="150" cy="62" r="5" fill="#fff" />
          </>
        );
      case "home-automation":
        return (
          <>
            <rect x="120" y="40" width="70" height="50" rx="6" fill="#0a1422" stroke={c} />
            {[0, 1, 2, 3].map((i) => <line key={i} x1={130 + i * 16} y1="40" x2={130 + i * 16} y2="28" stroke={c} />)}
            <path d="M40 65h80M190 65h80M270 65v-25M270 65v25" stroke={c} strokeOpacity=".5" fill="none" />
            <circle cx="270" cy="35" r="6" fill={c} opacity=".6" /><circle cx="270" cy="95" r="6" fill={c} opacity=".35" />
          </>
        );
      default:
        return (
          <>
            {[30, 110, 190].map((x, i) => <g key={x}><rect x={x} y="45" width="60" height="40" rx="8" fill="#0a1422" stroke={c} strokeOpacity={0.4 + i * 0.2} />{i < 2 && <path d={`M${x + 62} 65h16`} stroke={c} markerEnd="" />}</g>)}
            <rect x="270" y="45" width="20" height="40" rx="5" fill={c} opacity=".3" />
          </>
        );
    }
  };
  return (
    <div aria-hidden="true" className="v4-visual" style={tall ? { height: 170 } : undefined}>
      <span className="v4-mono absolute left-3.5 top-3 z-[1] text-[9.5px] font-semibold tracking-[.18em]" style={{ color: c }}>{label[project.slug] ?? "SOFTWARE"}</span>
      <svg viewBox="0 0 310 120" preserveAspectRatio="xMidYMid meet" className="absolute inset-x-0 bottom-0 h-[86%] w-full">{motif()}</svg>
    </div>
  );
}
