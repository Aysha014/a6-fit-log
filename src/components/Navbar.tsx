"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const ACCENT = "#ccff00";

const NAV_LINKS = [
  { label: "Workout", href: "/workouts" },
  { label: "My Plan", href: "/plan" },
];

export default function Navbar({
  planCount = 0,
  savedCount = 0,
}) {
  const [active, setActive] = useState("Workout");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (label: string) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <nav className="w-full border-b border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Main Navbar */}
        <div className="flex items-center justify-between py-4">

          {/* Left: Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="FitLog logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />

            <span className="text-sm font-extrabold tracking-wide text-white">
              FITLOG
            </span>
          </Link>

          {/* Desktop Middle Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.label;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-black"
                      : "text-gray-300 hover:text-white"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: ACCENT }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop Counters */}
            <div className="hidden items-center gap-4 text-sm sm:flex">

              {/* Plan */}
              <Link
                href="/my-plan"
                className="flex items-center gap-2"
              >
                <span className="text-gray-300">
                  Plan
                </span>

                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: ACCENT }}
                >
                  {planCount}
                </span>
              </Link>

              {/* Saved */}
              <Link
                href="/my-plan"
                className="flex items-center gap-2"
              >
                <span className="text-gray-300">
                  Saved
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white">
                  {savedCount}
                </span>
              </Link>

            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-xl text-white md:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-white/10 pb-4 pt-4 md:hidden">

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.label;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(link.label)}
                    className={`rounded-md px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "text-black"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: ACCENT }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Plan / Saved */}
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-between rounded-md bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Plan
                </span>

                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{ backgroundColor: ACCENT }}
                >
                  {planCount}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex flex-1 items-center justify-between rounded-md bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Saved
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white">
                  {savedCount}
                </span>
              </Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}