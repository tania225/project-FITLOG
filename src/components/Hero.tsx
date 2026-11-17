"use client";
import bannerImg from "@/assets/banner.png";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-[#111111] text-white px-5 md:px-12 lg:px-20 py-16 md:py-24">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>

          <p className="text-[#ccff00] text-sm font-semibold tracking-[3px] mb-5">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            TRAIN WITH INTENT.
            <span className="block text-[#ccff00]">
              LOG EVERY SET.
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          {/* Browse Button */}
          <a
            href="#library"
            className="inline-flex items-center rounded-2xl gap-3 bg-[#ccff00] text-black px-6 py-4 font-bold text-sm tracking-wider hover:bg-white transition duration-300"
          >
            BROWSE WORKOUTS
            <ArrowUpRight size={20} />
          </a>

        </div>

        {/* Right Banner Image */}
        <div className="relative w-full h-75 md:h-105 overflow-hidden rounded-xl">

          <Image
            src={bannerImg}
            alt="Fitness workout training"
            fill
            priority
            className="object-contain object-center rounded-xl"
            sizes="(max-width: 700px) 100vw, 50vw"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

        </div>

      </div>

    </section>
  );
};

export default Hero;