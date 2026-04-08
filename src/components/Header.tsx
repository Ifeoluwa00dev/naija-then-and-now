import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="relative bg-white border-b border-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#008751 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex h-7 w-14 overflow-hidden rounded-md shadow-soft border border-slate-100">
            <div className="w-1/3 bg-[#008751]" />
            <div className="w-1/3 bg-white" />
            <div className="w-1/3 bg-[#008751]" />
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            Public Accountability Dashboard
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-6"
        >
          Nigeria: <span className="text-[#008751]">Then</span> <span className="text-slate-300 font-light mx-1">vs</span> <span className="text-red-600">Now</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed"
        >
          A neutral, data-driven comparison of key national indicators before and after May 29, 2023.
        </motion.p>
      </div>
    </header>
  );
}
