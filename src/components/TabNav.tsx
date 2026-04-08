import { motion } from 'motion/react';

type TabNavProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { id: 'economy', label: 'Economy' },
  { id: 'cost-of-living', label: 'Cost of Living' },
  { id: 'power', label: 'Power & Infra' },
  { id: 'security', label: 'Security' },
  { id: 'scorecard', label: 'Scorecard' },
];

export default function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200/60 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2 sm:space-x-8 h-16 items-center min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative h-10 px-4 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#008751] rounded-full shadow-lg shadow-[#008751]/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
