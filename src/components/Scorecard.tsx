import { motion } from 'motion/react';
import { metrics, MetricCategory } from '../data/metrics';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const categoryLabels: Record<MetricCategory, string> = {
  economy: 'Economy',
  'cost-of-living': 'Cost of Living',
  power: 'Power & Infrastructure',
  security: 'Security',
};

export default function Scorecard() {
  const categories: MetricCategory[] = ['economy', 'cost-of-living', 'power', 'security'];

  const getVerdict = (worse: number, better: number, neutral: number) => {
    const total = worse + better + neutral;
    if (worse / total > 0.6) return { label: 'Significantly Worse', color: 'bg-rose-50 text-rose-700 border-rose-100', icon: <AlertTriangle className="w-4 h-4" /> };
    if (better / total > 0.6) return { label: 'Improved', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: <CheckCircle className="w-4 h-4" /> };
    return { label: 'Mixed', color: 'bg-amber-50 text-amber-700 border-amber-100', icon: <HelpCircle className="w-4 h-4" /> };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const catMetrics = metrics.filter((m) => m.category === cat);
          const worse = catMetrics.filter((m) => m.direction === 'worse').length;
          const better = catMetrics.filter((m) => m.direction === 'better').length;
          const neutral = catMetrics.filter((m) => m.direction === 'neutral').length;
          const verdict = getVerdict(worse, better, neutral);

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 shadow-card flex flex-col group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-[#008751] transition-colors duration-300">
                  {categoryLabels[cat]}
                </h3>
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-wider ${verdict.color}`}>
                  {verdict.icon}
                  {verdict.label}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-5 bg-rose-50/30 rounded-2xl border border-rose-100/50">
                  <TrendingUp className="w-6 h-6 text-rose-500 mb-3" />
                  <span className="text-3xl font-black text-rose-600 font-mono">{worse}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mt-2">Worse</span>
                </div>
                <div className="flex flex-col items-center p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                  <TrendingDown className="w-6 h-6 text-emerald-500 mb-3" />
                  <span className="text-3xl font-black text-emerald-600 font-mono">{better}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mt-2">Better</span>
                </div>
                <div className="flex flex-col items-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <Minus className="w-6 h-6 text-slate-400 mb-3" />
                  <span className="text-3xl font-black text-slate-600 font-mono">{neutral}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Neutral</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                    {catMetrics.length} Key Indicators
                  </p>
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(catMetrics.length, 5))].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-slate-200 border border-white" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
