import React from 'react';
import InteractiveHeroJourney from '../components/InteractiveHeroJourney';

/**
 * HeroJourneyPreview Page
 * 
 * Demonstrates the 5-step Interactive Hero Product Journey:
 * 1. Data Upload Simulation
 * 2. AI Analysis in Action
 * 3. KPI & Chart Selection
 * 4. Detail & Drill-Down
 * 5. Final Dashboard Preview
 * 
 * Features:
 * - Auto-play with 3-second intervals
 * - Manual navigation via timeline dots
 * - Hover to pause auto-play
 * - CTA button appears on final step
 * - All mock data, no backend required
 */
const HeroJourneyPreview: React.FC = () => {
  return (
    <div className="min-h-screen">
      <InteractiveHeroJourney autoPlay={true} autoPlayDelay={3000} />
    </div>
  );
};

export default HeroJourneyPreview;
