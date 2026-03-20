"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    id: "01",
    title: "NeuralChat",
    subtitle: "AI-Powered Real-Time Chat Platform",
    desc: "Scalable chat app with AI assistance using WebSockets, Redis pub/sub, and LLM APIs. Handles 100K+ concurrent users with sub-50ms latency.",
    stack: ["Next.js", "WebSocket", "Redis", "OpenAI", "PostgreSQL", "Docker"],
    color: "#00ff41",
    metrics: { "100K+": "Users", "<50ms": "Latency", "99.9%": "Uptime" },
    type: "Full-Stack",
  },
  {
    id: "02",
    title: "QuantumDash",
    subtitle: "Real-Time Analytics Dashboard",
    desc: "Enterprise analytics with 3D visualizations using Three.js. Processes 1M+ events/day with custom WebGL shaders for immersive data storytelling.",
    stack: ["React", "Three.js", "D3.js", "Node.js", "TimescaleDB", "K8s"],
    color: "#00ffcc",
    metrics: { "1M+/d": "Events", "<10ms": "Latency", "50+": "Charts" },
    type: "Data Viz",
  },
  {
    id: "03",
    title: "GridForge",
    subtitle: "Distributed Task Orchestration",
    desc: "Microservices-based orchestration engine with K8s auto-scaling. Reduced infra costs by 40% while improving throughput by 3×.",
    stack: ["Python", "FastAPI", "Kafka", "Kubernetes", "Terraform", "Prometheus"],
    color: "#39ff14",
    metrics: { "−40%": "Infra Cost", "3×": "Throughput", "20+": "Services" },
    type: "DevOps",
  },
  {
    id: "04",
    title: "CryptoForest",
    subtitle: "DeFi Portfolio Tracker",
    desc: "Web3 tracker with cross-chain DeFi yield analytics and NFT visualization. Integrated with 15+ blockchain networks.",
    stack: ["Next.js", "ethers.js", "Solidity", "The Graph", "Prisma", "IPFS"],
    color: "#00ff41",
    metrics: { "15+": "Chains", "10K+": "Wallets", "100+": "Protocols" },
    type: "Web3",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: 18, cursor: "none",
        border: `1px solid ${hovered ? project.color + "55" : "rgba(0,255,65,0.1)"}`,
        transition: "all 0.35s ease",
        boxShadow: hovered ? `0 0 40px ${project.color}18, 0 20px 60px rgba(0,0,0,0.4)` : "none",
        background: "rgba(7,20,7,0.9)",
      }}
    >
      {/* Top neon bar */}
      <div style={{
        height: 2,
        background: project.color,
        opacity: hovered ? 1 : 0.4,
        boxShadow: hovered ? `0 0 12px ${project.color}, 0 0 24px ${project.color}66` : "none",
        transition: "all 0.35s ease",
      }} />

      {/* Corner glow */}
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 120,
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}08, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{ padding: "28px 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: "0.68rem", color: project.color, textShadow: `0 0 8px ${project.color}88` }}>
                {project.id}
              </span>
              <span style={{
                background: `${project.color}10`,
                border: `1px solid ${project.color}30`,
                color: project.color, padding: "2px 10px", borderRadius: 3,
                fontFamily: "'Space Mono', monospace", fontSize: "0.63rem",
                textShadow: `0 0 6px ${project.color}66`,
              }}>
                {project.type}
              </span>
            </div>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.3rem", fontWeight: 800, color: "#d4f5d4", marginBottom: 3 }}>
              {project.title}
            </h3>
            <p style={{ color: "#4a8a4a", fontSize: "0.82rem" }}>{project.subtitle}</p>
          </div>
          <motion.span
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: project.color, fontSize: "1.4rem", lineHeight: 1, textShadow: `0 0 10px ${project.color}` }}
          >
            ↗
          </motion.span>
        </div>

        <p style={{ color: "#4a8a4a", lineHeight: 1.8, marginBottom: 22, fontSize: "0.88rem" }}>
          {project.desc}
        </p>

        {/* Metrics */}
        <div style={{ display: "flex", gap: 24, marginBottom: 22, paddingBottom: 22, borderBottom: `1px solid rgba(0,255,65,0.07)` }}>
          {Object.entries(project.metrics).map(([val, key]) => (
            <div key={key}>
              <div style={{
                fontFamily: "'Orbitron', monospace", fontSize: "1.05rem", fontWeight: 800,
                color: project.color, textShadow: `0 0 12px ${project.color}88`,
              }}>{val}</div>
              <div className="mono" style={{ fontSize: "0.62rem", color: "#4a8a4a", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>
                {key}
              </div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.stack.map(tech => (
            <span
              key={tech}
              style={{
                background: `${project.color}08`,
                border: `1px solid ${project.color}22`,
                color: project.color,
                padding: "3px 10px", borderRadius: 3,
                fontFamily: "'Space Mono', monospace", fontSize: "0.68rem",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" style={{ padding: "10px 40px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 64 }}
        >
          <div className="mono" style={{ color: "#4a8a4a", fontSize: "0.82rem", letterSpacing: "0.2em", marginBottom: 12 }}>
            03. PORTFOLIO
          </div>
          <h2 className="section-title" style={{ marginBottom: 14, color: "#d4f5d4" }}>
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p style={{ color: "#4a8a4a", maxWidth: 480, fontSize: "0.92rem" }}>
            Selected works showcasing architecture, performance, and creative engineering
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: 22 }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
