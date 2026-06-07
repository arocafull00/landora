"use client";

import { X } from "lucide-react";
import type { NavLink } from "@/lib/dashboard-data";

export function VelarNav({
  brand,
  navColor,
  menuOpen,
  onToggleMenu,
  navLinks,
}: {
  brand: string;
  navColor: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  navLinks: NavLink[];
}) {
  return (
    <>
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 md:py-6 lg:px-16"
        style={{ color: navColor, transition: "color 0.35s ease" }}
      >
        <span
          className="text-xl"
          style={{ fontFamily: "var(--font-syne)", letterSpacing: "-0.02em" }}
        >
          {brand.split("").map((char, i) => (
            <span key={i} style={{ fontWeight: char === "." ? 900 : 700 }}>
              {char}
            </span>
          ))}
        </span>

        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex flex-col items-end justify-center gap-[6px] group"
          onClick={onToggleMenu}
          type="button"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <>
              <span
                className="block h-[1px] bg-current transition-all duration-200 group-hover:w-5"
                style={{ width: "28px" }}
              />
              <span className="block h-[1px] bg-current" style={{ width: "28px" }} />
            </>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#f5f0ea]">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className="uppercase text-black transition-colors hover:text-gray-500"
              href={link.href}
              onClick={onToggleMenu}
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 300,
                letterSpacing: "0.12em",
                lineHeight: 1.6,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
