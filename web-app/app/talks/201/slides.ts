import { ComponentType } from 'react';

// Slide components - Ordered for optimal learning flow
import TitleSlide201 from './slides/01-TitleSlide';
import RecapSlide from './slides/02-RecapSlide';
import WorkflowsVsAgentsSlide from './slides/03-WorkflowsVsAgentsSlide';
import CoreComponentsSlide from './slides/04-CoreComponentsSlide';
import AgentTypesOverviewSlide from './slides/05-AgentTypesOverviewSlide';
import AutonomyLevelsSlide from './slides/06-AutonomyLevelsSlide';
import DomainTypesSlide from './slides/07-DomainTypesSlide';
import ArchitecturePatternsSlide from './slides/08-ArchitecturePatternsSlide';
import CodeExamplesSlide from './slides/27-CodeExamplesSlide';
import AgentLoopDeepDiveSlide from './slides/09-AgentLoopDeepDiveSlide';
import PlanningReasoningSlide from './slides/21-PlanningReasoningSlide';
import ToolDesignSlide from './slides/10-ToolDesignSlide';
import MCPToolsSlide from './slides/18-MCPToolsSlide';
import AgentSkillsSlide from './slides/23-AgentSkillsSlide';
import RAGEvolutionSlide from './slides/20-RAGEvolutionSlide';
import ContextEngineeringAdvancedSlide from './slides/11-ContextEngineeringAdvancedSlide';
import MemoryArchitectureSlide from './slides/22-MemoryArchitectureSlide';
import MultiAgentSystemsSlide from './slides/12-MultiAgentSystemsSlide';
import LongRunningAgentsSlide from './slides/13-LongRunningAgentsSlide';
import ErrorHandlingSlide from './slides/25-ErrorHandlingSlide';
import EvaluationSlide from './slides/17-EvaluationSlide';
import FrameworkLandscapeSlide from './slides/26-FrameworkLandscapeSlide';
import HumanInTheLoopSlide from './slides/24-HumanInTheLoopSlide';
import SecuritySlide from './slides/19-SecuritySlide';
import BestPracticesSlide from './slides/14-BestPracticesSlide';
import TakeawaysSlide from './slides/15-TakeawaysSlide';
import ThankYouSlide from './slides/16-ThankYouSlide';

export interface Slide201 {
  id: string;
  component: ComponentType;
  section?: string;
  title?: string;
}

export const slides201: Slide201[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 1: OPENING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-01-title',
    component: TitleSlide201,
    section: 'Opening',
    title: 'Agentic AI 201',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 2: FOUNDATIONS (Bridge from 101)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-02-recap',
    component: RecapSlide,
    section: 'Foundations',
    title: 'Quick Recap from 101',
  },
  {
    id: '201-03-workflows-vs-agents',
    component: WorkflowsVsAgentsSlide,
    section: 'Foundations',
    title: 'Workflows vs Agents',
  },
  {
    id: '201-04-core-components',
    component: CoreComponentsSlide,
    section: 'Foundations',
    title: 'Core Components (201 Depth)',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 3: AGENT TYPES & DOMAINS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-05-agent-types-overview',
    component: AgentTypesOverviewSlide,
    section: 'Agent Types',
    title: 'Understanding Agent Types',
  },
  {
    id: '201-06-autonomy-levels',
    component: AutonomyLevelsSlide,
    section: 'Agent Types',
    title: 'Autonomy Levels',
  },
  {
    id: '201-07-domain-types',
    component: DomainTypesSlide,
    section: 'Agent Types',
    title: 'Domain Types',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 4: ARCHITECTURE PATTERNS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-08-architecture-patterns',
    component: ArchitecturePatternsSlide,
    section: 'Architecture',
    title: 'Architecture Patterns',
  },
  {
    id: '201-09-code-examples',
    component: CodeExamplesSlide,
    section: 'Architecture',
    title: 'Code Patterns',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 5: THE AGENT LOOP (Deep Dive)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-10-agent-loop',
    component: AgentLoopDeepDiveSlide,
    section: 'Agent Loop',
    title: 'The Agent Loop',
  },
  {
    id: '201-11-planning-reasoning',
    component: PlanningReasoningSlide,
    section: 'Agent Loop',
    title: 'Planning & Reasoning',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 6: TOOLS & SKILLS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-12-tool-design',
    component: ToolDesignSlide,
    section: 'Tools & Skills',
    title: 'Tool Design Principles',
  },
  {
    id: '201-13-mcp-tools',
    component: MCPToolsSlide,
    section: 'Tools & Skills',
    title: 'Model Context Protocol',
  },
  {
    id: '201-14-agent-skills',
    component: AgentSkillsSlide,
    section: 'Tools & Skills',
    title: 'Agent Skills Pattern',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 7: KNOWLEDGE & CONTEXT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-15-rag-evolution',
    component: RAGEvolutionSlide,
    section: 'Knowledge',
    title: 'RAG Evolution',
  },
  {
    id: '201-16-context-engineering',
    component: ContextEngineeringAdvancedSlide,
    section: 'Knowledge',
    title: 'Context Engineering',
  },
  {
    id: '201-17-memory-architecture',
    component: MemoryArchitectureSlide,
    section: 'Knowledge',
    title: 'Memory Architecture',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 8: SCALING UP
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-18-multi-agent',
    component: MultiAgentSystemsSlide,
    section: 'Scaling',
    title: 'Multi-Agent Systems',
  },
  {
    id: '201-19-long-running',
    component: LongRunningAgentsSlide,
    section: 'Scaling',
    title: 'Long-Running Agents',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 9: PRODUCTION EXCELLENCE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-20-error-handling',
    component: ErrorHandlingSlide,
    section: 'Production',
    title: 'Error Handling & Recovery',
  },
  {
    id: '201-21-evaluation',
    component: EvaluationSlide,
    section: 'Production',
    title: 'Agent Evaluation',
  },
  {
    id: '201-22-framework-landscape',
    component: FrameworkLandscapeSlide,
    section: 'Production',
    title: 'Framework Landscape',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 10: TRUST & SAFETY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-23-human-in-the-loop',
    component: HumanInTheLoopSlide,
    section: 'Trust & Safety',
    title: 'Human-in-the-Loop',
  },
  {
    id: '201-24-security',
    component: SecuritySlide,
    section: 'Trust & Safety',
    title: 'Security for Agents',
  },
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION 11: BEST PRACTICES & CLOSING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '201-25-best-practices',
    component: BestPracticesSlide,
    section: 'Best Practices',
    title: 'Best Practices',
  },
  {
    id: '201-26-takeaways',
    component: TakeawaysSlide,
    section: 'Closing',
    title: 'Key Takeaways',
  },
  {
    id: '201-27-thank-you',
    component: ThankYouSlide,
    section: 'Closing',
    title: 'Thank You',
  },
];
