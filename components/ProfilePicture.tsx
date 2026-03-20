"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ProfilePictureProps {
  src?: string;
  name?: string;
  size?: number;
  showStatus?: boolean;
}

export default function ProfilePicture({
  src,
  name = "Alex Chen",
  size = 200,
  showStatus = true,
}: ProfilePictureProps) {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const angleRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);

  // Only run on client — avoids SSR/client mismatch entirely
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate orbiting dots purely via DOM after mount — no React state updates
  useEffect(() => {
    if (!mounted || !svgRef.current) return;

    const svgSize = size + 60;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const outerR = size / 2 + 24;

    const dots = svgRef.current.querySelectorAll<SVGCircleElement>(".orbit-dot");
    const dashes = svgRef.current.querySelector<SVGCircleElement>(".orbit-ring");

    const animate = () => {
      angleRef.current = (angleRef.current + 0.4) % 360;
      const a = angleRef.current;

      // Update dashed ring rotation
      if (dashes) dashes.setAttribute("transform", `rotate(${a} ${cx} ${cy})`);

      // Update each orbiting dot
      dots.forEach((dot, i) => {
        const rad = ((a + i * 120) * Math.PI) / 180;
        dot.setAttribute("cx", String(cx + outerR * Math.cos(rad)));
        dot.setAttribute("cy", String(cy + outerR * Math.sin(rad)));
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted, size]);

  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const hasImage = src && !imgError;

  const svgSize = size + 60;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const outerR = size / 2 + 24;
  const middleR = size / 2 + 14;
  const innerR = size / 2 + 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ position: "relative", width: svgSize, height: svgSize, flexShrink: 0 }}
    >
      {/* Outer glow bloom */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: size + 80, height: size + 80,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,65,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "neon-pulse 3s ease-in-out infinite",
      }} />

      {/* ── SVG rings — static parts rendered on SSR, animated parts only after mount ── */}
      {mounted && (
        <svg
          ref={svgRef}
          width={svgSize}
          height={svgSize}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {/* Dashed outer spinning ring — transform updated by rAF after mount */}
          <circle
          className="orbit-ring"
          cx={cx} cy={cy} r={outerR}
          fill="none"
          stroke="rgba(0,255,65,0.25)"
          strokeWidth={1}
          strokeDasharray="6 5"
        />

        {/* Solid middle ring */}
        <circle
          cx={cx} cy={cy} r={middleR}
          fill="none"
          stroke="#00ff41"
          strokeWidth={1.5}
          opacity={0.5}
          style={{ filter: "drop-shadow(0 0 4px #00ff41)" }}
        />

        {/* Thin inner accent ring */}
        <circle
          cx={cx} cy={cy} r={innerR}
          fill="none"
          stroke="rgba(0,255,204,0.3)"
          strokeWidth={0.8}
        />

        {/* Fixed bracket dots at 0°, 90°, 180°, 270° on middle ring — static, no hydration risk */}
        {[0, 90, 180, 270].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={cx + middleR * Math.cos(rad)}
              cy={cy + middleR * Math.sin(rad)}
              r={2.5}
              fill="#00ff41"
              style={{ filter: "drop-shadow(0 0 4px #00ff41)" }}
            />
          );
        })}

        {/* Orbiting dots — rendered at 0° on SSR; rAF moves them after mount */}
        {[0, 1, 2].map(i => (
          <circle
            key={i}
            className="orbit-dot"
            cx={cx + outerR * Math.cos((i * 120 * Math.PI) / 180)}
            cy={cy + outerR * Math.sin((i * 120 * Math.PI) / 180)}
            r={i === 0 ? 4 : 2.5}
            fill={i === 0 ? "#00ff41" : "#00ffcc"}
            style={{ filter: `drop-shadow(0 0 ${i === 0 ? 6 : 4}px ${i === 0 ? "#00ff41" : "#00ffcc"})` }}
          />
        ))}

        {/* Tick marks — fully static, safe for SSR */}
        {Array.from({ length: 12 }).map((_, i) => {
          const tickAngle = (i / 12) * Math.PI * 2;
          const r1 = innerR - 5;
          const r2 = innerR - 1;
          return (
            <line
              key={i}
              x1={cx + r1 * Math.cos(tickAngle)}
              y1={cy + r1 * Math.sin(tickAngle)}
              x2={cx + r2 * Math.cos(tickAngle)}
              y2={cy + r2 * Math.sin(tickAngle)}
              stroke="rgba(0,255,65,0.4)"
              strokeWidth={1}
            />
          );
        })}
        </svg>
      )}

      {/* Profile image / fallback */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: size, height: size,
      }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "relative",
            width: "100%", height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(0,255,65,0.6)",
            boxShadow: "0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.15), inset 0 0 20px rgba(0,255,65,0.05)",
          }}
        >
        {hasImage ? (
          <Image
            src={src}
            alt={`${name} profile picture`}
            fill
            sizes={`${size}px`}
            style={{ objectFit: "cover" }}
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: "rgba(7,20,7,0.95)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8, position: "relative",
          }}>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: size * 0.22, fontWeight: 900,
              color: "#00ff41",
              textShadow: "0 0 20px rgba(0,255,65,0.8), 0 0 40px rgba(0,255,65,0.4)",
              letterSpacing: "0.05em", lineHeight: 1,
            }}>{initials}</div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: size * 0.055,
              color: "rgba(0,255,65,0.4)",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              {src ? "IMG_ERR" : "ADD PHOTO"}
            </div>
            <div style={{
              position: "absolute", left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.3), transparent)",
              animation: "scanline 4s linear infinite",
            }} />
          </div>
        )}
        </motion.div>
      </div>

      {/* Online status dot */}
      {showStatus && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          style={{
            position: "absolute",
            bottom: svgSize / 2 - size / 2 + 10,
            right: svgSize / 2 - size / 2 + 10,
            width: 18, height: 18,
            borderRadius: "50%",
            background: "#00ff41",
            border: "3px solid #030a03",
            boxShadow: "0 0 10px #00ff41, 0 0 20px rgba(0,255,65,0.5)",
            animation: "neon-pulse 2s ease-in-out infinite",
            zIndex: 10,
          }}
        />
      )}

      {/* Available badge */}
      <div style={{
        position: "absolute",
        bottom: svgSize / 2 - size / 2 - 14,
        left: "50%", transform: "translateX(-50%)",
        zIndex: 10,
      }}>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{
            background: "rgba(7,20,7,0.9)",
            border: "1px solid rgba(0,255,65,0.35)",
            borderRadius: 6, padding: "5px 14px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 12px rgba(0,255,65,0.15)",
            whiteSpace: "nowrap",
          }}
        >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#00ff41", boxShadow: "0 0 6px #00ff41",
            animation: "neon-pulse 1.5s infinite",
          }} />
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.62rem",
            color: "#00ff41", letterSpacing: "0.15em", textTransform: "uppercase",
            textShadow: "0 0 6px rgba(0,255,65,0.4)",
          }}>Available</span>
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
