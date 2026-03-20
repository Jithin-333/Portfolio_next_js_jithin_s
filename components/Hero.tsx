"use client";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { TypeAnimation } from "react-type-animation";
import FloatingWidgets from "./FloatingWidgets";
import ProfilePicture from "./ProfilePicture";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 40px",
      }}
      className="grid-pattern"
    >
      {/* Ambient neon glows */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,255,204,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.5), transparent)",
        animation: "scanline 6s linear infinite",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* ── Main 2-column grid ── */}
      <div
        style={{
          maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 50,
          alignItems: "center",
          paddingTop: 100,
        }}
        className="flex flex-col-reverse md:grid"
      >

        {/* ══ LEFT COLUMN ══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Greeting tag */}
          <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
            <span className="mono" style={{
              fontSize: "0.82rem", color: "#00ff41",
              letterSpacing: "0.2em", textTransform: "uppercase",
              textShadow: "0 0 10px rgba(0,255,65,0.5)",
            }}>
              &gt; Hello_World.exe
            </span>
          </motion.div>

          {/* Profile picture — standalone row, left-aligned */}
          <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
            {/*
              ─── HOW TO ADD YOUR PHOTO ───────────────────────────────────────
              1. Copy your image into:  portfolio/public/profile.jpg
              2. Change  src={undefined}  to  src="/profile.jpg"  below
              ─────────────────────────────────────────────────────────────────
            */}
            <ProfilePicture
              src="/profile.jpg"      /* ← change to "/profile.jpg" after adding your photo */
              name="Jithin S"
              size={150}
              showStatus={true}
            />
          </motion.div>

          {/* Name */}
          <motion.h1 variants={itemVariants} style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            fontWeight: 900, lineHeight: 1.05,
            marginBottom: 10, letterSpacing: "-0.02em",
            color: "#d4f5d4",
          }}>
            Jithin&nbsp;
            <span className="neon-text" style={{ animation: "neon-text-pulse 3s ease-in-out infinite" }}>
              S
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)",
            fontWeight: 600, marginBottom: 24,
          }}>
            <TypeAnimation
              sequence={[
                "Python Django Developer", 2000,
                "Full-Stack Software Engineer", 2000,
                "Open Source Contributor", 2000,
                "System Architect", 2000,
              ]}
              repeat={Infinity}
              style={{ color: "#FF9000", textShadow: "0 0 12px rgba(0,255,204,0.6)" }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p variants={itemVariants} style={{
            color: "#4a8a4a", lineHeight: 1.85,
            maxWidth: 480, marginBottom: 36, fontSize: "0.93rem",
          }}>
            I architect high-performance web systems and craft immersive digital experiences.
            Passionate about pushing boundaries where code meets creativity — turning complex
            problems into elegant, scalable solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
            <motion.a href="#projects" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              View Projects →
            </motion.a>
            <motion.a href="#contact" className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              Contact Me
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { num: "5+", label: "Years Exp." },
              { num: "50+", label: "Projects" },
              { num: "20+", label: "Open Source" },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: "1.9rem",
                  fontWeight: 900, color: "#00ff41",
                  textShadow: "0 0 18px rgba(0,255,65,0.7), 0 0 36px rgba(0,255,65,0.3)",
                }}>
                  {stat.num}
                </div>
                <div className="mono" style={{
                  fontSize: "0.67rem", color: "#4a8a4a",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══ RIGHT COLUMN — 3D scene + floating widgets ══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
          style={{ height: 520, position: "relative" }}
        >
          <ThreeScene />
          <FloatingWidgets />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}
      >
        <span className="mono" style={{ fontSize: "0.62rem", color: "#4a8a4a", letterSpacing: "0.25em" }}>SCROLL</span>
        <div style={{
          width: 1, height: 50,
          background: "linear-gradient(to bottom, #00ff41, transparent)",
          boxShadow: "0 0 8px rgba(0,255,65,0.4)",
        }} />
      </motion.div>
    </section>
  );
}
