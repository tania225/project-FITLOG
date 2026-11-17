import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Dumbbell size={24} className="text-[#ccff00]" />
          
          <span className="text-xl font-bold tracking-wider">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;