"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "");
        setIsPointer(true);
      } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
        setCursorText("");
        setIsPointer(true);
      } else {
        setCursorText("");
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-orange-500 shadow-[0_0_12px_#ff4500]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 0 : 8,
          height: isPointer ? 0 : 8,
          opacity: isPointer ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Smooth outer follower ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-orange-500/50 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: cursorText ? "rgba(255, 75, 18, 0.9)" : isPointer ? "rgba(255, 75, 18, 0.15)" : "transparent",
          boxShadow: isPointer ? "0 0 25px rgba(255, 75, 18, 0.4)" : "none",
        }}
        animate={{
          width: cursorText ? 64 : isPointer ? 48 : 32,
          height: cursorText ? 64 : isPointer ? 48 : 32,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-black tracking-widest uppercase text-white drop-shadow select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
