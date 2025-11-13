"use client";

import { useMemo, useState } from "react";
import { generateUGCScripts, type GeneratorOptions } from "@/lib/generateScript";

const allPillars = ["Value", "Entertainment", "Emotion"] as const;

type Pillar = typeof allPillars[number];

export default function ScriptGenerator() {
  const [instituteName, setInstituteName] = useState("CAD Mastery Institute");
  const [audience, setAudience] = useState("engineering and architecture students");
  const [focus, setFocus] = useState("AutoCAD and SolidWorks from beginner to job-ready");
  const [duration, setDuration] = useState(45);
  const [tone, setTone] = useState("friendly, fast-paced, confidence-boosting");
  const [creatorPersona, setCreatorPersona] = useState("recent graduate who landed a CAD internship");
  const [pillars, setPillars] = useState<Pillar[]>(["Value", "Emotion"]);
  const [cta, setCta] = useState("Book a free trial class this week");
  const [variants, setVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pillarOptions = useMemo(() => allPillars, []);

  function togglePillar(p: Pillar) {
    setPillars((prev) => {
      if (prev.includes(p)) return prev.filter((x) => x !== p);
      if (prev.length >= 2) return [prev[1], p];
      return [...prev, p];
    });
  }

  async function onGenerate() {
    setLoading(true);
    try {
      const opts: GeneratorOptions = {
        instituteName,
        audience,
        focus,
        durationSeconds: Math.max(20, Math.min(75, duration)),
        tone,
        creatorPersona,
        pillars: pillars as unknown as GeneratorOptions["pillars"],
        cta,
      };
      const out = generateUGCScripts(opts);
      setVariants(out);
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  function download(text: string, idx: number) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ugc_script_variant_${idx + 1}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="row">
        <div>
          <label className="label">Institute name</label>
          <input className="input" value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
        </div>
        <div>
          <label className="label">Primary CTA</label>
          <input className="input" value={cta} onChange={(e) => setCta(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label className="label">Audience</label>
          <input className="input" value={audience} onChange={(e) => setAudience(e.target.value)} />
        </div>
        <div>
          <label className="label">Training focus</label>
          <input className="input" value={focus} onChange={(e) => setFocus(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label className="label">Tone</label>
          <input className="input" value={tone} onChange={(e) => setTone(e.target.value)} />
        </div>
        <div>
          <label className="label">Creator persona</label>
          <input className="input" value={creatorPersona} onChange={(e) => setCreatorPersona(e.target.value)} />
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <div>
          <label className="label">Duration (seconds)</label>
          <input type="number" min={20} max={75} className="input" value={duration} onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))} />
        </div>
        <div>
          <label className="label">Pillars (choose exactly 2)</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {pillarOptions.map((p) => (
              <button
                key={p}
                type="button"
                className="btn secondary"
                style={{
                  borderColor: pillars.includes(p) ? "var(--accent)" : "rgba(255,255,255,0.16)",
                  background: pillars.includes(p) ? "rgba(34,197,94,0.12)" : "transparent",
                }}
                onClick={() => togglePillar(p)}
              >
                {pillars.includes(p) ? "? " : ""}{p}
              </button>
            ))}
          </div>
          <div className="small" style={{ marginTop: 6 }}>We will enforce exactly two pillars in output.</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button className="btn" onClick={onGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate 3 Variants"}
        </button>
        {variants.length > 0 && (
          <button className="btn secondary" onClick={() => setVariants([])}>Clear</button>
        )}
      </div>

      {variants.length > 0 && (
        <div style={{ marginTop: 18 }}>
          {variants.map((v, i) => (
            <div key={i} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Variant {i + 1}</h3>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn secondary" onClick={() => copy(v)}>Copy</button>
                  <button className="btn secondary" onClick={() => download(v, i)}>Download</button>
                </div>
              </div>
              <div className="generated" style={{ marginTop: 10 }}>{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
