import ScriptGenerator from "@/components/ScriptGenerator";

export default function Page() {
  return (
    <div className="container">
      <div className="header">
        <span className="badge">UGC Toolkit</span>
        <h1 style={{ margin: 0 }}>CAD Training UGC Script Generator</h1>
      </div>
      <p className="small">Create a proper UGC video script with a hook, CTA, and exactly two pillars among Value, Entertainment, Emotion.</p>

      <div className="grid" style={{ marginTop: 18 }}>
        <div className="card"><ScriptGenerator /></div>
        <div className="card">
          <h3 style={{ marginTop: 4 }}>Best Practices</h3>
          <ul>
            <li>Open with a bold hook in 1-2 seconds.</li>
            <li>Deliver clear value or emotion fast; avoid fluff.</li>
            <li>Use pattern interrupts every 3-5 seconds.</li>
            <li>Keep shots varied: A-Roll, B-Roll, screen capture, text overlays.</li>
            <li>End with one crisp CTA tied to a benefit.</li>
          </ul>
        </div>
      </div>
      <p className="footer">Built for high-converting social UGC in CAD education.</p>
    </div>
  );
}
