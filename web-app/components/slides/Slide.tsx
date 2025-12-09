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
import SolarScoutImpactSlide from './special/SolarScoutImpactSlide';
import RealWorldProblemSlide from './special/RealWorldProblemSlide';
import RealWorldSolutionSlide from './special/RealWorldSolutionSlide';
import AgentLoopSlide from './special/AgentLoopSlide';
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
// AgentLoopPracticeSlide removed - was redundant with slides 16-17
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
// New 101 slides
import GenerativeAISlide from './special/GenerativeAISlide';

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

  // Render the appropriate slide component based on slide number
  // Current structure: 29 slides total
  const renderSlideContent = () => {
    switch (slide.number) {
      // Part 1: Opening (Slides 1-4)
      case 1:
        return <TitleSlide />;
      case 2:
        return <FrustrationSlide />;
      case 3:
        return <WhatIfSlide />;
      case 4:
        return <WhatWellCoverSlide />;
      
      // Part 2: Foundation & Evolution (Slides 5-11)
      case 5:
        // NEW: What is Generative AI? (foundational)
        return <GenerativeAISlide />;
      case 6:
        return <ColdOpenSlide />;
      case 7:
        return <LanguageModelsSlide />;
      case 8:
        return <AssistantsSlide />;
      case 9:
        return <ReasoningSlide />;
      case 10:
        return <ConvergenceSlide />;
      case 11:
        return <EvolutionSlide />;
      
      // Part 3: Understanding Agents (Slides 12-18)
      case 12:
        return <WhatIsAgentSlide />;
      case 13:
        return <AnatomyProgressiveSlide />;
      case 14:
        return <RealWorldProblemSlide />;
      case 15:
        return <RealWorldSolutionSlide />;
      case 16:
        return <SolarScoutImpactSlide />;
      case 17:
        return <AgentLoopSlide persona={persona} />;
      case 18:
        return <PersonaExamplesSlide />;
      
      // Part 4: How They Work (Slides 19-25)
      case 19:
        return <CommonPatternsSlide />;
      case 20:
        return <WhenToUseSlide />;
      case 21:
        return <ToolDesignSlide />;
      case 22:
        return <LimitationsSlide />;
      case 23:
        return <MultiAgentSlide />;
      case 24:
        return <LongRunningSlide />;
      case 25:
        return <ApplicationsSlide />;
      
      // Part 5: Closing (Slides 26-29)
      case 26:
        return <JourneyBeginsSlide />;
      case 27:
        return <TakeawaysSlide />;
      case 28:
        return <QuestionsSlide />;
      case 29:
        return <ThankYouSlide />;
      
      // Fallback for any other slides - render generic content
      default:
        return (
          <div className="flex-1 overflow-y-auto">
            {(() => {
              const section = getSectionForSlide(slide.number);
              const prevSection = slide.number > 1 ? getSectionForSlide(slide.number - 1) : null;
              const isFirstInSection = section && prevSection?.title !== section.title;
              
              return isFirstInSection && section ? (
                <SectionHeader section={section.title} subtitle={section.subtitle} />
              ) : null;
            })()}
            
            {slide.content.title && slide.content.title.trim() && (
              <TextReveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white leading-tight pb-6 border-b border-gray-700/50">
                  {slide.content.title}
                </h1>
              </TextReveal>
            )}
            <SlideContent content={slide.content.content} />
          </div>
        );
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
        {renderSlideContent()}
      </div>
    </motion.div>
  );
}
