"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "TechNova Inc.",
    period: "2022 — Present",
    type: "Full-Time",
    desc: "Lead architect for the core platform serving 2M+ users. Introduced micro-frontend architecture that reduced deployment time by 60%. Mentored a team of 8 engineers.",
    highlights: ["Reduced load time by 70%", "Led team of 8 engineers", "Micro-frontend architecture"],
    color: "#00ff41",
  },
  {
    role: "Full-Stack Engineer",
    company: "Datastream Labs",
    period: "2020 — 2022",
    type: "Full-Time",
    desc: "Built real-time analytics pipelines processing 500M events/day. Developed custom WebGL visualizations for complex financial data.",
    highlights: ["500M events/day pipeline", "Custom WebGL visualizations", "3 OSS contributions"],
    color: "#00ffcc",
  },
  {
    role: "Frontend Engineer",
    company: "CreativeStack",
    period: "2019 — 2020",
    type: "Contract",
    desc: "Delivered 15+ client projects. Established design system used across 30+ products. Reduced bundle sizes by 45% through code splitting.",
    highlights: ["15+ client projects", "30+ product design system", "45% bundle reduction"],
    color: "#39ff14",
  },
  {
    role: "Software Engineer Intern",
    company: "CodeCraft Studio",
    period: "2018 — 2019",
    type: "Internship",
    desc: "Contributed to React Native app with 100K+ downloads. Implemented offline-first architecture and push notification system.",
    highlights: ["100K+ downloads", "Offline-first architecture", "Push notifications"],
    color: "#00ff41",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" style={{ padding: "120px 40px", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.35), transparent)",
      }} />

      <div
        style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}
        className="flex flex-col md:grid"
      >
        {/* Left */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ position: "sticky", top: 120 }}
        >
          <div className="mono" style={{ color: "#4a8a4a", fontSize: "0.82rem", letterSpacing: "0.2em", marginBottom: 12 }}>
            04. JOURNEY
          </div>
          <h2 className="section-title" style={{ marginBottom: 20, color: "#d4f5d4" }}>
            Work<br /><span className="neon-text">Experience</span>
          </h2>
          <p style={{ color: "#4a8a4a", lineHeight: 1.8, marginBottom: 32, fontSize: "0.9rem" }}>
            5+ years building products at the intersection of engineering excellence and creative problem-solving.
          </p>
          <div style={{
            padding: 24, borderRadius: 12,
            border: "1px solid rgba(0,255,65,0.15)",
            background: "rgba(7,20,7,0.6)",
            animation: "glow-border 5s ease-in-out infinite",
          }}>
            <div className="mono" style={{ fontSize: "0.68rem", color: "#4a8a4a", letterSpacing: "0.15em", marginBottom: 10 }}>
              EDUCATION
            </div>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "0.88rem",
              fontWeight: 700, color: "#00ff41",
              textShadow: "0 0 10px rgba(0,255,65,0.5)", marginBottom: 4,
            }}>
              B.Sc. Computer Science
            </div>
            <div className="mono" style={{ fontSize: "0.78rem", color: "#4a8a4a" }}>
              MIT · 2018 · GPA 3.9/4.0
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const itemInView = useInView(itemRef, { once: true, margin: "-50px" });
            return (
              <motion.div
                key={exp.company}
                ref={itemRef}
                initial={{ opacity: 0, x: -40 }}
                animate={itemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                style={{ display: "flex", gap: 28, marginBottom: i < experiences.length - 1 ? 0 : 0 }}
              >
                {/* Timeline axis */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 16 }}>
                  <div style={{
                    width: 13, height: 13, borderRadius: "50%",
                    background: exp.color,
                    border: "2px solid #030a03",
                    boxShadow: `0 0 12px ${exp.color}, 0 0 24px ${exp.color}66`,
                    flexShrink: 0, marginTop: 4,
                  }} />
                  {i < experiences.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "rgba(0,255,65,0.1)", marginTop: 8, minHeight: 60 }} />
                  )}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                  style={{ paddingBottom: 44, flex: 1 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div>
                      <h3 style={{
                        fontFamily: "'Orbitron', monospace", fontSize: "0.95rem",
                        fontWeight: 700, color: exp.color,
                        textShadow: `0 0 10px ${exp.color}66`, marginBottom: 3,
                      }}>{exp.role}</h3>
                      <div className="mono" style={{ color: "rgba(212,245,212,0.75)", fontSize: "0.82rem" }}>
                        @ {exp.company}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                      <span className="mono" style={{ fontSize: "0.72rem", color: "#4a8a4a" }}>{exp.period}</span>
                      <span style={{
                        background: `${exp.color}12`, border: `1px solid ${exp.color}28`,
                        color: exp.color, padding: "2px 10px", borderRadius: 3,
                        fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
                      }}>{exp.type}</span>
                    </div>
                  </div>
                  <p style={{ color: "#4a8a4a", lineHeight: 1.8, marginBottom: 14, fontSize: "0.88rem" }}>
                    {exp.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {exp.highlights.map(h => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 4, height: 4, background: exp.color, borderRadius: "50%", boxShadow: `0 0 6px ${exp.color}` }} />
                        <span className="mono" style={{ fontSize: "0.73rem", color: "rgba(212,245,212,0.6)" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
