"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "18px 40px",
        background: scrolled ? "rgba(3,10,3,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,65,0.1)" : "none",
        boxShadow: scrolled ? "0 0 30px rgba(0,255,65,0.05)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}
    >
      <motion.div whileHover={{ scale: 1.05 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36,
          background: "rgba(0,255,65,0.1)",
          border: "1px solid rgba(0,255,65,0.5)",
          borderRadius: 7,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "0.78rem",
          color: "#00ff41",
          boxShadow: "0 0 15px rgba(0,255,65,0.3), inset 0 0 10px rgba(0,255,65,0.05)",
          textShadow: "0 0 8px #00ff41",
        }}>JS</div>
        <span style={{
          fontFamily: "'Orbitron', monospace", fontWeight: 700,
          fontSize: "1rem", letterSpacing: "0.1em",
          color: "#d4f5d4",
        }}>
          Jithin_S
        </span>
      </motion.div>

      <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden md:flex">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            onClick={() => setActive(link)}
            style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: active === link ? "#00ff41" : "rgba(212, 245, 212, 0.55)",
              textDecoration: "none", transition: "all 0.3s ease",
              textShadow: active === link ? "0 0 10px rgba(0,255,65,0.6)" : "none",
            }}
            whileHover={{ color: "#00ff41" }}
          >
            <span style={{ color: "#4a8a4a", marginRight: 4, fontSize: "0.68rem" }}>0{i + 1}.</span>
            {link}
          </motion.a>
        ))}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,65,0.5)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "transparent",
            border: "1px solid rgba(0,255,65,0.6)",
            color: "#00ff41",
            padding: "8px 20px", borderRadius: 5,
            fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
            fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", textDecoration: "none", cursor: "none",
            transition: "all 0.3s ease",
            textShadow: "0 0 8px rgba(0,255,65,0.4)",
            boxShadow: "0 0 10px rgba(0,255,65,0.1)",
          }}
        >
          Hire Me
        </motion.a>
      </div>
    </motion.nav>
  );
}
