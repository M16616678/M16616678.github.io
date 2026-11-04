"use client";
import { useState } from "react";
import { accentHex, type Accent, type Diagram } from "../../data/portfolio";

const W = 760, H = 330, NW = 150, NH = 58;
const pos = (col: number, row: number) => ({ x: 20 + col * ((W - 40 - NW) / 3), y: 20 + row * ((H - 40 - NH) / 2) });

/** Interactive, illustrative architecture diagram. Select a node to see what it does. */
export default function ArchitectureDiagram({ diagram, accent }: { diagram: Diagram; accent: Accent }) {
  const [sel, setSel] = useState<string>(diagram.nodes[0]?.id);
  const c = accentHex[accent];
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const current = byId[sel];
  const linked = new Set(diagram.edges.filter(([a, b]) => a === sel || b === sel).flat());

  return (
    <figure className="v4-glass overflow-hidden">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="block min-w-[640px]" role="group" aria-label="Architecture diagram. Use Tab to move between components.">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill={c} />
            </marker>
          </defs>
          {diagram.edges.map(([a, b]) => {
            const A = byId[a], B = byId[b];
            if (!A || !B) return null;
            const pa = pos(A.col, A.row), pb = pos(B.col, B.row);
            const ax = pa.x + (pb.x > pa.x ? NW : pb.x < pa.x ? 0 : NW / 2);
            const ay = pa.y + NH / 2 + (pb.x === pa.x ? (pb.y > pa.y ? NH / 2 : -NH / 2) : 0);
            const bx = pb.x + (pb.x > pa.x ? 0 : pb.x < pa.x ? NW : NW / 2);
            const by = pb.y + NH / 2 + (pb.x === pa.x ? (pb.y > pa.y ? -NH / 2 : NH / 2) : 0);
            const mx = (ax + bx) / 2;
            const on = a === sel || b === sel;
            return (
              <path key={`${a}-${b}`} d={`M${ax} ${ay} C${mx} ${ay} ${mx} ${by} ${bx} ${by}`} fill="none" stroke={on ? c : "rgba(148,163,184,.35)"} strokeWidth={on ? 2 : 1.2} strokeDasharray={on ? "none" : "4 4"} markerEnd="url(#arrow)" />
            );
          })}
          {diagram.nodes.map((n) => {
            const p = pos(n.col, n.row);
            const active = n.id === sel;
            const near = linked.has(n.id);
            return (
              <g key={n.id} transform={`translate(${p.x} ${p.y})`} tabIndex={0} role="button" aria-pressed={active} aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}`}
                onClick={() => setSel(n.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(n.id); } }}
                onMouseEnter={() => setSel(n.id)} style={{ cursor: "pointer", outline: "none" }} className="group">
                <rect width={NW} height={NH} rx="12" fill={active ? `${c}22` : "#0b1220"} stroke={active ? c : near ? `${c}99` : "rgba(148,163,184,.3)"} strokeWidth={active ? 2 : 1} className="group-focus-visible:stroke-[3]" />
                <text x={NW / 2} y={n.sub ? 25 : 34} textAnchor="middle" fontSize="13" fontWeight="600" fill="#e8edf5">{n.label}</text>
                {n.sub && <text x={NW / 2} y={43} textAnchor="middle" fontSize={n.sub.length > 24 ? 9 : 10.5} fill="#8592a6">{n.sub}</text>}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="border-t border-[var(--line)] p-4 sm:p-5" aria-live="polite">
        {current && (
          <p className="text-[14.5px]"><strong style={{ color: c }}>{current.label}</strong> <span className="text-[var(--muted)]">{current.detail}</span></p>
        )}
        <figcaption className="mt-2 text-[12px] text-[var(--dim)]">{diagram.caption}</figcaption>
      </div>
    </figure>
  );
}
