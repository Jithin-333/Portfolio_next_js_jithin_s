"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const socials = [
  { label: "GitHub", handle: "@alexchen", icon: "GH" },
  { label: "LinkedIn", handle: "alex-chen-dev", icon: "LI" },
  { label: "Twitter", handle: "@alexchendev", icon: "TW" },
  { label: "Email", handle: "alex@domain.dev", icon: "@" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(7,20,7,0.7)",
    border: "1px solid rgba(0,255,65,0.15)",
    borderRadius: 7,
    color: "#d4f5d4",
    padding: "13px 16px",
    fontFamily: "'Syne', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    cursor: "none",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(0,255,65,0.5)";
    e.target.style.boxShadow = "0 0 15px rgba(0,255,65,0.1), inset 0 0 10px rgba(0,255,65,0.03)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(0,255,65,0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section id="contact" style={{ padding: "10px 40px 80px", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 300,
        background: "radial-gradient(ellipse, rgba(0,255,65,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="mono" style={{ color: "#4a8a4a", fontSize: "0.82rem", letterSpacing: "0.2em", marginBottom: 12 }}>
            05. CONNECT
          </div>
          <h2 className="section-title" style={{ marginBottom: 14, color: "#d4f5d4" }}>
            Get In <span className="neon-text">Touch</span>
          </h2>
          <p style={{ color: "#4a8a4a", maxWidth: 440, margin: "0 auto", fontSize: "0.92rem" }}>
            Have a project in mind or just want to chat? My inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 52, alignItems: "start" }}
          className="flex flex-col md:grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              padding: 28, borderRadius: 16, marginBottom: 20,
              background: "rgba(7,20,7,0.7)",
              border: "1px solid rgba(0,255,65,0.15)",
              animation: "glow-border 5s ease-in-out infinite",
            }}>
              <h3 style={{
                fontFamily: "'Orbitron', monospace", fontSize: "0.95rem",
                fontWeight: 700, color: "#00ff41",
                textShadow: "0 0 10px rgba(0,255,65,0.5)", marginBottom: 10,
              }}>
                Let&apos;s Build Something
              </h3>
              <p style={{ color: "#4a8a4a", lineHeight: 1.8, fontSize: "0.88rem", marginBottom: 18 }}>
                Available for freelance projects, full-time roles, and interesting collaborations.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 9, height: 9, background: "#00ff41", borderRadius: "50%",
                  boxShadow: "0 0 10px #00ff41, 0 0 20px rgba(0,255,65,0.5)",
                  animation: "neon-pulse 2s infinite",
                }} />
                <span className="mono" style={{ fontSize: "0.78rem", color: "#d4f5d4" }}>Available for opportunities</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8, borderColor: "rgba(0,255,65,0.45)" }}
                  href="#"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", borderRadius: 10,
                    background: "rgba(7,20,7,0.8)",
                    border: "1px solid rgba(0,255,65,0.1)",
                    textDecoration: "none", cursor: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 7,
                      background: "rgba(0,255,65,0.08)",
                      border: "1px solid rgba(0,255,65,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#00ff41",
                      fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
                      textShadow: "0 0 6px rgba(0,255,65,0.5)",
                    }}>{s.icon}</div>
                    <div>
                      <div className="mono" style={{ fontSize: "0.63rem", color: "#4a8a4a", letterSpacing: "0.1em", marginBottom: 2 }}>{s.label}</div>
                      <div style={{ fontSize: "0.82rem", color: "#d4f5d4" }}>{s.handle}</div>
                    </div>
                  </div>
                  <span style={{ color: "rgba(0,255,65,0.5)", fontSize: "1rem" }}>↗</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  textAlign: "center", padding: "80px 40px",
                  borderRadius: 18,
                  border: "1px solid rgba(0,255,65,0.4)",
                  background: "rgba(0,255,65,0.03)",
                  boxShadow: "0 0 40px rgba(0,255,65,0.1)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 18, color: "#00ff41", textShadow: "0 0 20px rgba(0,255,65,0.8)" }}>✓</div>
                <h3 style={{ fontFamily: "'Orbitron', monospace", color: "#00ff41", marginBottom: 10, fontSize: "1rem" }}>Message Sent!</h3>
                <p style={{ color: "#4a8a4a" }}>I&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "0.67rem", color: "#4a8a4a", marginBottom: 7, letterSpacing: "0.1em" }}>NAME</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: "0.67rem", color: "#4a8a4a", marginBottom: 7, letterSpacing: "0.1em" }}>EMAIL</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>
                <div>
                  <label className="mono" style={{ display: "block", fontSize: "0.67rem", color: "#4a8a4a", marginBottom: 7, letterSpacing: "0.1em" }}>SUBJECT</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Project Inquiry" style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label className="mono" style={{ display: "block", fontSize: "0.67rem", color: "#4a8a4a", marginBottom: 7, letterSpacing: "0.1em" }}>MESSAGE</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about your project..." rows={6}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 } as React.CSSProperties}
                    onFocus={onFocus} onBlur={onBlur}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,255,65,0.5), 0 0 80px rgba(0,255,65,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  style={{
                    background: "#00ff41", color: "#030a03",
                    padding: "15px", borderRadius: 7,
                    fontFamily: "'Space Mono', monospace", fontSize: "0.85rem",
                    fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "none", cursor: "none",
                    boxShadow: "0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.15)",
                    opacity: sending ? 0.7 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {sending ? "TRANSMITTING..." : "SEND MESSAGE →"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 80, paddingTop: 36, borderTop: "1px solid rgba(0,255,65,0.07)" }}>
        <div className="mono" style={{ fontSize: "0.72rem", color: "#4a8a4a", letterSpacing: "0.1em" }}>
          DESIGNED & BUILT BY <span style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.5)" }}>ALEX CHEN</span> · 2024
        </div>
        <div className="mono" style={{ fontSize: "0.68rem", color: "rgba(74,138,74,0.35)", marginTop: 8 }}>
          &lt; MADE WITH NEXT.JS & THREE.JS /&gt;
        </div>
      </div>
    </section>
  );
}
