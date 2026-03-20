"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX - 6 + "px";
      cursor.style.top = mouseY - 6 + "px";
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX - 20 + "px";
      follower.style.top = followerY - 20 + "px";
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    const links = document.querySelectorAll("a, button, .hoverable");
    links.forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)";
        cursor.style.background = "#00ff41";
        follower.style.borderColor = "rgba(0,255,65,0.8)";
        follower.style.transform = "scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.background = "#00ff41";
        follower.style.borderColor = "rgba(0,255,65,0.5)";
        follower.style.transform = "scale(1)";
      });
    });

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", width: 12, height: 12,
        background: "#00ff41",
        borderRadius: "50%",
        pointerEvents: "none", zIndex: 9999,
        boxShadow: "0 0 10px #00ff41, 0 0 20px rgba(0,255,65,0.5)",
        transition: "transform 0.15s ease, background 0.2s ease",
      }} />
      <div ref={followerRef} style={{
        position: "fixed", width: 40, height: 40,
        border: "1px solid rgba(0,255,65,0.5)",
        borderRadius: "50%",
        pointerEvents: "none", zIndex: 9998,
        boxShadow: "0 0 10px rgba(0,255,65,0.2)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }} />
    </>
  );
}
