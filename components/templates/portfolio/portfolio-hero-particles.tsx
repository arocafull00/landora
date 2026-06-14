"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
  height: number;
};

export function PortfolioHeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = (): Particle => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
        height: Math.random() * 2 + 1,
      };
    };

    const reset = (particle: Particle) => {
      particle.x = Math.random() * canvas.width;
      particle.y = Math.random() * canvas.height;
      particle.speed = Math.random() / 5 + 0.1;
      particle.opacity = 0.7;
      particle.fadeDelay = Math.random() * 600 + 100;
      particle.fadeStart = Date.now() + particle.fadeDelay;
      particle.fadingOut = false;
      particle.height = Math.random() * 2 + 1;
    };

    const setSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) reset(particle);
        if (!particle.fadingOut && Date.now() > particle.fadeStart) particle.fadingOut = true;
        if (particle.fadingOut) {
          particle.opacity -= 0.008;
          if (particle.opacity <= 0) reset(particle);
        }
        ctx.fillStyle = `rgba(250, 250, 250, ${particle.opacity})`;
        ctx.fillRect(particle.x, particle.y, 0.6, particle.height);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    setSize();
    init();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen opacity-60"
      aria-hidden
    />
  );
}
