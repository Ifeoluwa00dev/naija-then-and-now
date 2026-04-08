import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Metric } from '../data/metrics';
import StatCard from './StatCard';

type SectionGridProps = {
  metrics: Metric[];
  categoryId: string;
};

export default function SectionGrid({ metrics, categoryId }: SectionGridProps) {
  const [openEvidenceId, setOpenEvidenceId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={categoryId}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metrics.map((metric) => (
            <StatCard
  key={metric.id}
  metric={metric}
  isEvidenceOpen={openEvidenceId === metric.id}
  onEvidenceToggle={() =>
    setOpenEvidenceId(openEvidenceId === metric.id ? null : metric.id)
  }
/>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
