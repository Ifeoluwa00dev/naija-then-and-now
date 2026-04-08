import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, AlertCircle, TrendingUp, TrendingDown, Minus, ExternalLink, ChevronRight } from 'lucide-react';
import { Metric } from '../data/metrics';

export type StatCardProps = {
  metric: Metric;
  isEvidenceOpen: boolean;
  onEvidenceToggle: () => void;
};

const StatCard: React.FC<StatCardProps> = ({ metric, isEvidenceOpen, onEvidenceToggle }) => {
  const [showNote, setShowNote] = useState(false);
  

  const getDirectionColor = () => {
    if (metric.direction === 'better') return 'text-emerald-600';
    if (metric.direction === 'worse') return 'text-rose-600';
    return 'text-slate-500';
  };

  const getDirectionIcon = () => {
    if (metric.direction === 'better') return <TrendingDown className="w-5 h-5" />;
    if (metric.direction === 'worse') return <TrendingUp className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${metric.label} was ${metric.unit}${metric.before.value} in ${metric.before.date}. It's now ${metric.unit}${metric.after.value}. ${metric.change} in ${metric.after.date}. naijathenandnow.ng #NigeriaThenAndNow`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-xl transition-all duration-500 flex flex-col h-full group overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-[#008751] transition-colors duration-300">
            {metric.label}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3 flex-grow items-center mb-8">
          {/* Before */}
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100/50">
            <span className="block text-[10px] uppercase tracking-[0.15em] text-slate-400 font-black mb-2">
              Before
            </span>
            <span className="block break-all leading-tight text-xl font-black text-slate-900 font-mono">
              {metric.unit}{metric.before.value}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1 font-medium">
              {metric.before.date}
            </span>
          </div>

          {/* Change */}
          <div className="flex flex-col items-center justify-center">
            <div className={`${getDirectionColor()} mb-1.5 p-2 bg-white rounded-full shadow-soft`}>
              {getDirectionIcon()}
            </div>
            <span className={`text-xs font-black tracking-tight ${getDirectionColor()}`}>
              {metric.change}
            </span>
          </div>

          {/* Now */}
          <div className={`${
            metric.direction === 'worse' 
              ? 'bg-rose-50/50 border-rose-100/50' 
              : metric.direction === 'better' 
                ? 'bg-emerald-50/50 border-emerald-100/50' 
                : 'bg-slate-50 border-slate-100/50'
          } rounded-xl p-4 text-center border transition-colors duration-500`}>
            <span className={`block text-[10px] uppercase tracking-[0.15em] font-black mb-2 ${
              metric.direction === 'worse' ? 'text-rose-500' : metric.direction === 'better' ? 'text-emerald-500' : 'text-slate-400'
            }`}>
              Now
            </span>
            <span className="block break-all leading-tight text-xl font-black text-slate-900 font-mono">
              {metric.unit}{metric.after.value}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1 font-medium">
              {metric.after.date}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Source: <span className="text-slate-600">{metric.source}</span>
              </span>
            </div>
            
            {metric.note && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowNote(true)}
                  onMouseLeave={() => setShowNote(false)}
                  onClick={() => setShowNote(!showNote)}
                  className="text-slate-300 hover:text-amber-500 transition-all duration-300"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {showNote && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 w-64 p-3 bg-slate-900 text-white text-[11px] rounded-xl shadow-2xl z-50 leading-relaxed font-medium"
                    >
                      <div className="absolute -bottom-1 left-1.5 w-2 h-2 bg-slate-900 rotate-45" />
                      {metric.note}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEvidenceToggle()}
              className="text-[10px] font-bold text-[#008751] hover:underline flex items-center gap-1"
            >
              See evidence {isEvidenceOpen ? '↑' : '→'}
            </button>
            <button
              onClick={handleShare}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <Share2 className="w-3 h-3" /> Share
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isEvidenceOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="bg-slate-50 border-t border-slate-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Official Source */}
              <div>
                <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1 flex items-center gap-1">
                  📄 Official source
                </div>
                <a
                  href={metric.evidence.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg hover:border-[#008751] transition-colors"
                >
                  <span className="text-xs font-medium text-slate-700 truncate pr-2">
                    {metric.evidence.sourceLabel}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-[#008751] flex-shrink-0" />
                </a>
              </div>

              {/* Reported By */}
              {metric.evidence.newsHeadline && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1 flex items-center gap-1">
                    📰 Reported by
                  </div>
                  <a
                    href={metric.evidence.newsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg hover:border-[#008751] transition-colors"
                  >
                    <span className="text-xs font-medium text-slate-700 line-clamp-2 pr-2">
                      {metric.evidence.newsHeadline}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-[#008751] flex-shrink-0" />
                  </a>
                </div>
              )}

              {/* Also Reported */}
              {metric.evidence.extraHeadline && (
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1 flex items-center gap-1">
                    📰 Also reported
                  </div>
                  <a
                    href={metric.evidence.extraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between p-2 bg-white border border-slate-200 rounded-lg hover:border-[#008751] transition-colors"
                  >
                    <span className="text-xs font-medium text-slate-700 line-clamp-2 pr-2">
                      {metric.evidence.extraHeadline}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover/link:text-[#008751] flex-shrink-0" />
                  </a>
                </div>
              )}

              {/* Disclaimer */}
              <div className="pt-2 flex items-start gap-1.5 text-[10px] text-slate-400 leading-tight">
                <span className="flex-shrink-0">⚠</span>
                <p>All links open official government documents or established Nigerian news outlets.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StatCard;
