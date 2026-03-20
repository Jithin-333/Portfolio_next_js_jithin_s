"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    role: "Full-Stack Software Engineer",
    company: "NexLoyd",
    period: "2025 — Present",
    type: "Full-Time",
    desc: "Currently working as a Full Stack Developer at Nextloyd, contributing to the development of Learning Management Systems (LMS) and AI-based web applications. Working with Django, Next.js, and microservices architecture to build scalable and modular systems. Involved in designing APIs, integrating frontend and backend services, and developing efficient, production-ready solutions.",
    highlights: [
      "Developing LMS platforms and AI-based applications",
      "Working with Django (backend) and Next.js (frontend)",
      "Implementing microservices architecture",
      "Designing and integrating REST APIs",
      "Building scalable and modular systems"
    ],
    color: "#00ff41",
  },
  {
    role: "Python Django + React Developer",
    company: "Brototype",
    period: "2024 — 2025",
    type: "Internship",
    desc: "Completed a full stack development internship working with Python, Django, and React. Built and contributed to an e-commerce web application with features like user authentication, product management, and API integration. Also developed additional Python-based projects, gaining hands-on experience in backend logic, frontend integration, and full-stack workflows.",
    highlights: [
      "Developed a full-stack e-commerce web application",
      "Worked with Django for backend and React for frontend",
      "Implemented authentication and REST API integration",
      "Built and deployed Python-based projects",
      "Gained experience in full-stack development workflow"
    ],
    color: "#39ff14",
  },
  {
    role: "Frontend Developer Intern",
    company: "Tecque Academy",
    period: "2023 — 2024",
    type: "Internship",
    desc: "Completed a frontend internship where I learned and applied HTML, CSS, Bootstrap, and React fundamentals. Developed responsive user interfaces and built a frontend project focusing on component-based architecture and clean UI design.",
    highlights: [
      "Built responsive UI using HTML, CSS, and Bootstrap",
      "Learned React fundamentals and component structure",
      "Developed a frontend project from scratch",
      "Improved understanding of modern web development practices"
    ],
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
            2+ years building products at the intersection of engineering excellence and creative problem-solving.
          </p>
          <div className="mono" style={{ fontSize: "0.80rem", color: "#4a8a4a", letterSpacing: "0.15em", marginBottom: 10 }}>
              EDUCATION
            </div>
          <div style={{
            marginBottom: 24,
            padding: 24, borderRadius: 12,
            border: "1px solid rgba(0,255,65,0.15)",
            background: "rgba(7,20,7,0.6)",
            animation: "glow-border 5s ease-in-out infinite",
          }}>
           
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "0.88rem",
              fontWeight: 700, color: "#FFC300",
              textShadow: "0 0 10px rgba(0,255,65,0.5)", marginBottom: 4,
            }}>
              Master of Computer Applications (MCA)
            </div>
            <div className="mono" style={{ fontSize: "0.78rem", color: "#FF9000" }}>
              APJ Abdul Kalam Technological University (KTU), 2025 — present
            </div>
            
          </div>
          <div style={{
            padding: 24, borderRadius: 12,
            border: "1px solid rgba(0,255,65,0.15)",
            background: "rgba(7,20,7,0.6)",
            animation: "glow-border 5s ease-in-out infinite",
          }}>
            
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "0.88rem",
              fontWeight: 700, color: "#FFC300",
              textShadow: "0 0 10px rgba(0,255,65,0.5)", marginBottom: 4,
            }}>
              B.Sc. Computer Science
            </div>
            <div className="mono" style={{ fontSize: "0.78rem", color: "#FF9000" }}>
              University of Kerala, 2020 — 2023
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
