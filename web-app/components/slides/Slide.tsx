'use client';

import { motion } from 'framer-motion';
import { Slide as SlideType, Persona } from '@/lib/types';
import TextReveal from '../animations/TextReveal';
import SlideContent from './SlideContent';
import SectionHeader from './SectionHeader';
import { getSectionForSlide } from '@/lib/sections';
import TitleSlide from './special/TitleSlide';
import ColdOpenSlide from './special/ColdOpenSlide';
import WhatIsAgentSlide from './special/WhatIsAgentSlide';
import FrustrationSlide from './special/FrustrationSlide';
import SolarScoutProblemSlide from './special/SolarScoutProblemSlide';
import SolarScoutImpactSlide from './special/SolarScoutImpactSlide';
import AgentLoopSlide from './special/AgentLoopSlide';
import AnatomySlide from './special/AnatomySlide';
import AnatomyProgressiveSlide from './special/AnatomyProgressiveSlide';
import EvolutionSlide from './special/EvolutionSlide';
import LanguageModelsSlide from './special/LanguageModelsSlide';
import AssistantsSlide from './special/AssistantsSlide';
import ReasoningSlide from './special/ReasoningSlide';
import ConvergenceSlide from './special/ConvergenceSlide';
import WhatIfSlide from './special/WhatIfSlide';
import WhatWellCoverSlide from './special/WhatWellCoverSlide';
import PersonaExamplesSlide from './special/PersonaExamplesSlide';
import ContextEngineeringSlide from './special/ContextEngineeringSlide';
import ToolDesignSlide from './special/ToolDesignSlide';
import AgentLoopPracticeSlide from './special/AgentLoopPracticeSlide';
import CommonPatternsSlide from './special/CommonPatternsSlide';
import WhenToUseSlide from './special/WhenToUseSlide';
import LimitationsSlide from './special/LimitationsSlide';
import MultiAgentSlide from './special/MultiAgentSlide';
import LongRunningSlide from './special/LongRunningSlide';
import ApplicationsSlide from './special/ApplicationsSlide';
import JourneyBeginsSlide from './special/JourneyBeginsSlide';
import TakeawaysSlide from './special/TakeawaysSlide';
import QuestionsSlide from './special/QuestionsSlide';
import ThankYouSlide from './special/ThankYouSlide';
import AgentAnatomy from '../diagrams/AgentAnatomy';
import AgentLoop from '../diagrams/AgentLoop';
import EvolutionTimeline from '../diagrams/EvolutionTimeline';
import SolarScoutWorkflow from '../diagrams/SolarScoutWorkflow';

interface SlideProps {
  slide: SlideType;
  persona: Persona;
  showNotes?: boolean;
  showReferences?: boolean;
}

export default function Slide({ 
  slide, 
  persona, 
  showNotes = false,
  showReferences = false 
}: SlideProps) {
  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-screen bg-gray-900 text-gray-100 p-8 md:p-12 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center overflow-hidden">
        {/* Special slides with custom formatting */}
        {slide.number === 1 ? (
          <TitleSlide />
        ) : slide.number === 2 ? (
          <FrustrationSlide />
        ) : slide.number === 3 ? (
          <WhatIfSlide />
        ) : slide.number === 4 ? (
          <WhatWellCoverSlide />
        ) : slide.number === 5 ? (
          <ColdOpenSlide />
        ) : slide.number === 6 ? (
          // Slide 6: Language Models (focused)
          <LanguageModelsSlide />
        ) : slide.number === 7 ? (
          // Slide 7: Assistants (focused)
          <AssistantsSlide />
        ) : slide.number === 8 ? (
          // Slide 8: Reasoning (focused)
          <ReasoningSlide />
        ) : slide.number === 9 ? (
          // Slide 9: Convergence
          <ConvergenceSlide />
        ) : slide.number === 10 ? (
          // Slide 10: All stages together
          <EvolutionSlide />
        ) : slide.number === 11 ? (
          // Slide 11: What is an Agent
          <WhatIsAgentSlide />
        ) : slide.number === 12 ? (
          // Slide 12: Anatomy of an Agent (Progressive Step-by-Step)
          <AnatomyProgressiveSlide />
        ) : slide.number === 13 ? (
          <SolarScoutProblemSlide />
        ) : slide.number === 15 ? (
          <SolarScoutImpactSlide />
        ) : slide.number === 16 ? (
          <AgentLoopSlide persona={persona} />
        ) : slide.number === 17 ? (
          // Slide 17: Persona-Specific Examples
          <PersonaExamplesSlide />
        ) : slide.number === 18 ? (
          // Slide 18: Context Engineering
          <ContextEngineeringSlide />
        ) : slide.number === 19 ? (
          // Slide 19: Tool Design
          <ToolDesignSlide />
        ) : slide.number === 20 ? (
          // Slide 20: Agent Loop in Practice
          <AgentLoopPracticeSlide />
        ) : slide.number === 21 ? (
          // Slide 21: Common Patterns
          <CommonPatternsSlide />
        ) : slide.number === 22 ? (
          // Slide 22: When to Use Agents
          <WhenToUseSlide />
        ) : slide.number === 23 ? (
          // Slide 23: Limitations
          <LimitationsSlide />
        ) : slide.number === 24 ? (
          // Slide 24: Multi-Agent Systems
          <MultiAgentSlide />
        ) : slide.number === 25 ? (
          // Slide 25: Long-Running Agents
          <LongRunningSlide />
        ) : slide.number === 26 ? (
          // Slide 26: Applications
          <ApplicationsSlide />
        ) : slide.number === 27 ? (
          // Slide 27: Journey Begins
          <JourneyBeginsSlide />
        ) : slide.number === 28 ? (
          // Slide 28: Key Takeaways
          <TakeawaysSlide />
        ) : slide.number === 29 ? (
          // Slide 29: Questions
          <QuestionsSlide />
        ) : slide.number === 30 ? (
          // Slide 30: Thank You
          <ThankYouSlide />
        ) : (slide.number === 14 || slide.id === 'slide-14-solar-scout-solution') ? (
          // Slide 14: Solar Scout Workflow
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="w-full max-w-5xl flex-shrink-0">
              <SolarScoutWorkflow />
            </div>
            {slide.content.content && slide.content.content.trim() && (
              <div className="w-full max-w-4xl">
                <SlideContent content={slide.content.content} />
              </div>
            )}
          </div>
        ) : (
          // Regular content slides - Show section header and title nicely at top
          <div className="flex-1 overflow-y-auto">
            {/* Show section header if this slide is the first in a section */}
            {(() => {
              const section = getSectionForSlide(slide.number);
              const prevSection = slide.number > 1 ? getSectionForSlide(slide.number - 1) : null;
              const isFirstInSection = section && prevSection?.title !== section.title;
              
              return isFirstInSection && section ? (
                <SectionHeader section={section.title} subtitle={section.subtitle} />
              ) : null;
            })()}
            
            {/* Display title nicely at top if it exists */}
            {slide.content.title && slide.content.title.trim() && (
              <TextReveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white leading-tight pb-6 border-b border-gray-700/50">
                  {slide.content.title}
                </h1>
              </TextReveal>
            )}
            <SlideContent content={slide.content.content} />
          </div>
        )}

      </div>
    </motion.div>
  );
}

