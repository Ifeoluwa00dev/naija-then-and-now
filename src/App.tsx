import { useState } from 'react';
import { metrics, MetricCategory } from './data/metrics';
import Header from './components/Header';
import TabNav from './components/TabNav';
import SectionGrid from './components/SectionGrid';
import Scorecard from './components/Scorecard';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('economy');

  const renderContent = () => {
    if (activeTab === 'scorecard') {
      return <Scorecard />;
    }

    const filteredMetrics = metrics.filter(
      (m) => m.category === activeTab as MetricCategory
    );

    return <SectionGrid metrics={filteredMetrics} categoryId={activeTab} />;
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans selection:bg-[#008751] selection:text-white">
      <Header />
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}
