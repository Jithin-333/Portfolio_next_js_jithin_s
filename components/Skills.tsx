"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import IconCloudDemo from "./IconCloudDemo";

const skillCategories = [
  {
    title: "Frontend",
    color: "#00ff41",
    borderColor: "rgba(0,255,65,0.3)",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Three.js / WebGL", level: 80 },
      { name: "Framer Motion", level: 88 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    color: "#00ffcc",
    borderColor: "rgba(0,255,204,0.3)",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Python / FastAPI", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 80 },
      { name: "GraphQL", level: 82 },
    ],
  },
  {
    title: "DevOps & Cloud",
    color: "#39ff14",
    borderColor: "rgba(57,255,20,0.3)",
    skills: [
      { name: "AWS / GCP", level: 82 },
      { name: "Docker / K8s", level: 85 },
      { name: "CI/CD Pipelines", level: 88 },
      { name: "Terraform", level: 72 },
      { name: "Monitoring", level: 78 },
    ],
  },
];

const techs = ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "GraphQL", "Three.js", "Git", "Linux", "Figma", "MongoDB", "Kubernetes"];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span className="mono" style={{ fontSize: "0.78rem", color: "#d4f5d4" }}>{name}</span>
        <span className="mono" style={{ fontSize: "0.72rem", color, textShadow: `0 0 8px ${color}88` }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(0,255,65,0.07)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: "100%", background: color,
            borderRadius: 2,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" style={{ padding: "120px 40px 60px 40px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div className="mono" style={{ color: "#4a8a4a", fontSize: "0.82rem", letterSpacing: "0.2em", marginBottom: 12 }}>
            02. EXPERTISE
          </div>
          <h2 className="section-title" style={{ color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.4)" }}>
            Technical Skills
          </h2>
          <p style={{ color: "#4a8a4a", marginTop: 14, maxWidth: 440, margin: "14px auto 0", fontSize: "0.92rem" }}>
            Mastering the full spectrum of modern software development
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 72 }}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: ci * 0.15 }}
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${cat.color}15, 0 0 1px ${cat.borderColor}` }}
              style={{
                padding: 30,
                background: "rgba(7,20,7,0.85)",
                border: `1px solid ${cat.borderColor}`,
                borderRadius: 14,
                transition: "box-shadow 0.3s ease",
                animation: "glow-border 4s ease-in-out infinite",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 9,
                  background: `${cat.color}10`,
                  border: `1px solid ${cat.borderColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", color: cat.color,
                  boxShadow: `0 0 12px ${cat.color}33`,
                }}>⬡</div>
                <h3 style={{
                  fontFamily: "'Orbitron', monospace", fontWeight: 700,
                  fontSize: "0.9rem", color: cat.color,
                  textShadow: `0 0 10px ${cat.color}66`,
                }}>{cat.title}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} color={cat.color} delay={ci * 0.15 + si * 0.08} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <div className="mono" style={{ color: "#4a8a4a", fontSize: "0.72rem", letterSpacing: "0.18em", marginBottom: 18, textTransform: "uppercase" }}>
            Also Proficient In
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {techs.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.04 }}
                whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(0,255,65,0.4)" }}
                className="tech-tag"
                style={{ cursor: "default" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Interactive Icon Cloud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ marginTop: 60 }}
        >
          <div className="mono" style={{ textAlign: "center", color: "#4a8a4a", fontSize: "0.72rem", letterSpacing: "0.18em", marginBottom: -10, textTransform: "uppercase" }}>
            Interactive Stack
          </div>
          <IconCloudDemo />
        </motion.div>

      </div>
    </section>
  );
}
