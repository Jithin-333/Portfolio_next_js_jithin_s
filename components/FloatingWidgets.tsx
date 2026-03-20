"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Rotating 3D Cube Widget ── */
function CubeWidget() {
  const [rot, setRot] = useState({ x: 20, y: 30 });
  const raf = useRef<number>(0);
  const t = useRef(0);

  useEffect(() => {
    const animate = () => {
      t.current += 0.008;
      setRot({ x: 20 + Math.sin(t.current * 0.7) * 10, y: t.current * 40 % 360 });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const size = 52;
  const h = size / 2;
  const faces = [
    { transform: `translateZ(${h}px)`, label: "JS" },
    { transform: `translateZ(-${h}px) rotateY(180deg)`, label: "TS" },
    { transform: `rotateY(90deg) translateZ(${h}px)`, label: "Py" },
    { transform: `rotateY(-90deg) translateZ(${h}px)`, label: "Go" },
    { transform: `rotateX(90deg) translateZ(${h}px)`, label: "Rx" },
    { transform: `rotateX(-90deg) translateZ(${h}px)`, label: "DB" },
  ];

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", top: "8%", right: "2%",
        background: "rgba(3,10,3,0.9)",
        border: "1px solid rgba(0,255,65,0.3)",
        borderRadius: 14, padding: "16px 20px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 25px rgba(0,255,65,0.15)",
      }}
    >
      <div className="mono" style={{ fontSize: "0.62rem", color: "#4a8a4a", letterSpacing: "0.15em", marginBottom: 12 }}>
        TECH_STACK.3D
      </div>
      <div style={{ perspective: "300px", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: size, height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        }}>
          {faces.map((f, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              transform: f.transform,
              background: "rgba(0,255,65,0.05)",
              border: "1px solid rgba(0,255,65,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Space Mono', monospace", fontSize: "0.8rem",
              fontWeight: 700, color: "#00ff41",
              textShadow: "0 0 8px #00ff41",
              backfaceVisibility: "visible",
            }}>{f.label}</div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Live Activity Graph Widget ── */
function ActivityWidget() {
  const [bars, setBars] = useState(() => Array.from({ length: 12 }, () => Math.random() * 80 + 20));

  useEffect(() => {
    const id = setInterval(() => {
      setBars(b => [...b.slice(1), Math.random() * 80 + 20]);
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      style={{
        position: "absolute", bottom: "22%", left: "-2%",
        background: "rgba(3,10,3,0.9)",
        border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: 14, padding: "14px 18px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 20px rgba(0,255,65,0.12)",
        minWidth: 160,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span className="mono" style={{ fontSize: "0.6rem", color: "#4a8a4a", letterSpacing: "0.12em" }}>ACTIVITY</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff41", boxShadow: "0 0 8px #00ff41", animation: "neon-pulse 1.5s infinite", display: "block" }} />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: h * 0.4 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              width: 8, borderRadius: 2,
              background: i === bars.length - 1 ? "#00ff41" : `rgba(0,255,65,${0.3 + (i / bars.length) * 0.5})`,
              boxShadow: i === bars.length - 1 ? "0 0 8px #00ff41" : "none",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div className="mono" style={{ fontSize: "0.65rem", color: "#00ff41", marginTop: 8, textShadow: "0 0 8px #00ff4166" }}>
        98.7% uptime
      </div>
    </motion.div>
  );
}

/* ── Terminal Code Widget ── */
function TerminalWidget() {
  const lines = [
    { text: "$ node server.js", color: "#4a8a4a" },
    { text: "✓ Compiled in 412ms", color: "#00ff41" },
    { text: "✓ API ready :3000", color: "#00ff41" },
    { text: "› 2.4M req/s", color: "#00ffcc" },
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown < lines.length) {
      const id = setTimeout(() => setShown(s => s + 1), 700);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => setShown(0), 3000);
      return () => clearTimeout(id);
    }
  }, [shown]);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      style={{
        position: "absolute", bottom: "5%", right: "22%",
        background: "rgba(3,10,3,0.95)",
        border: "1px solid rgba(0,255,65,0.3)",
        borderRadius: 12, padding: "14px 18px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 20px rgba(0,255,65,0.12)",
        minWidth: 200,
      }}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
        ))}
        <span className="mono" style={{ fontSize: "0.6rem", color: "#4a8a4a", marginLeft: 6 }}>terminal</span>
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mono"
          style={{ fontSize: "0.7rem", color: l.color, marginBottom: 4, textShadow: l.color === "#00ff41" ? "0 0 6px #00ff4166" : "none" }}
        >
          {l.text}
          {i === shown - 1 && <span style={{ animation: "blink 1s infinite", color: "#00ff41" }}>█</span>}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Circular Progress / Status Widget ── */
function StatusWidget() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAngle(a => (a + 2) % 360), 16);
    return () => clearInterval(id);
  }, []);

  const r = 22;
  const circ = 2 * Math.PI * r;
  const metrics = [
    { label: "CPU", val: 34, color: "#00ff41" },
    { label: "MEM", val: 67, color: "#00ffcc" },
    { label: "NET", val: 89, color: "#39ff14" },
  ];

  return (
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      style={{
        position: "absolute", top: "40%", right: "-3%",
        background: "rgba(3,10,3,0.9)",
        border: "1px solid rgba(0,255,65,0.25)",
        borderRadius: 14, padding: "14px 18px",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 20px rgba(0,255,65,0.1)",
      }}
    >
      <div className="mono" style={{ fontSize: "0.6rem", color: "#4a8a4a", letterSpacing: "0.12em", marginBottom: 12 }}>SYS_MONITOR</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width={52} height={52} style={{ flexShrink: 0 }}>
              <circle cx={26} cy={26} r={r} fill="none" stroke="rgba(0,255,65,0.08)" strokeWidth={3} />
              <circle cx={26} cy={26} r={r} fill="none" stroke={m.color} strokeWidth={3}
                strokeDasharray={circ}
                strokeDashoffset={circ - (circ * m.val / 100)}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
                style={{ filter: `drop-shadow(0 0 4px ${m.color})` }}
              />
              <text x={26} y={26} textAnchor="middle" dominantBaseline="central"
                style={{ fontFamily: "'Space Mono',monospace", fontSize: "9px", fill: m.color }}>
                {m.val}%
              </text>
            </svg>
            <span className="mono" style={{ fontSize: "0.65rem", color: "#4a8a4a" }}>{m.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function FloatingWidgets() {
  return (
    <>
      <CubeWidget />
      <ActivityWidget />
      <TerminalWidget />
      <StatusWidget />
    </>
  );
}
