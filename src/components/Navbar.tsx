"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="w-full bg-[#0b0c0e] border-b border-gray-800">

      <div className="max-w-7xl h-20 mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="FitLog Logo"
           className="object-contain"
          />
          
            <span className="text-white font-bold text-xl tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/workouts"
            className="bg-[#1c2600] text-lime-400 px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#293800] transition"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-gray-400 hover:text-white px-4 py-2 text-sm transition"
          >
            My Plan
          </Link>

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            Plan

            <span className="bg-lime-400 text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
              0
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/saved"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            Saved

            <span className="border border-gray-700 text-gray-400 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              0
            </span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white cursor-pointer"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 px-6 py-5 flex flex-col gap-5">

          <Link
            href="/workouts"
            onClick={() => setIsMenuOpen(false)}
            className="text-lime-400 text-sm font-semibold"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-white text-sm"
          >
            My Plan
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Plan (0)
          </Link>

          <Link
            href="/saved"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-white text-sm"
          >
            Saved (0)
          </Link>

        </div>
      )}

    </nav>
  );
};

export default Navbar;