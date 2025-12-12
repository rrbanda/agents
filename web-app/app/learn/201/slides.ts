import { ComponentType } from 'react';

// Slide components
import TitleSlide201 from './slides/01-TitleSlide';
import RecapSlide from './slides/02-RecapSlide';
import WorkflowsVsAgentsSlide from './slides/03-WorkflowsVsAgentsSlide';
import CoreComponentsSlide from './slides/04-CoreComponentsSlide';
import AgentTypesOverviewSlide from './slides/05-AgentTypesOverviewSlide';
import AutonomyLevelsSlide from './slides/06-AutonomyLevelsSlide';
import DomainTypesSlide from './slides/07-DomainTypesSlide';
import ArchitecturePatternsSlide from './slides/08-ArchitecturePatternsSlide';
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
  // Section 1: Opening
  {
    id: '201-01-title',
    component: TitleSlide201,
    section: 'Opening',
    title: 'Agentic AI 201',
  },
  
  // Section 2: Foundations
  {
    id: '201-02-recap',
    component: RecapSlide,
    section: 'Foundations',
    title: 'Quick Recap',
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
    title: 'Core Components',
  },
  
  // Section 3: Agent Types
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
  
  // Section 4: Architecture Patterns
  {
    id: '201-08-architecture-patterns',
    component: ArchitecturePatternsSlide,
    section: 'Patterns',
    title: 'Architecture Patterns',
  },
  
  // Section 5: The Agent Loop Deep Dive
  {
    id: '201-09-agent-loop',
    component: AgentLoopDeepDiveSlide,
    section: 'Agent Loop',
    title: 'The Agent Loop',
  },
  {
    id: '201-10-planning-reasoning',
    component: PlanningReasoningSlide,
    section: 'Agent Loop',
    title: 'Planning & Reasoning',
  },
  
  // Section 6: Tool Design
  {
    id: '201-11-tool-design',
    component: ToolDesignSlide,
    section: 'Tool Design',
    title: 'Tool Design Principles',
  },
  {
    id: '201-11-mcp-tools',
    component: MCPToolsSlide,
    section: 'Tool Design',
    title: 'Model Context Protocol',
  },
  {
    id: '201-12-agent-skills',
    component: AgentSkillsSlide,
    section: 'Tool Design',
    title: 'Agent Skills Pattern',
  },
  
  // Section 7: Retrieval & Context
  {
    id: '201-13-rag-evolution',
    component: RAGEvolutionSlide,
    section: 'Retrieval',
    title: 'RAG Evolution',
  },
  {
    id: '201-13-context-engineering',
    component: ContextEngineeringAdvancedSlide,
    section: 'Context',
    title: 'Context Engineering',
  },
  {
    id: '201-14-memory-architecture',
    component: MemoryArchitectureSlide,
    section: 'Context',
    title: 'Memory Architecture',
  },
  
  // Section 8: Multi-Agent Systems
  {
    id: '201-15-multi-agent',
    component: MultiAgentSystemsSlide,
    section: 'Multi-Agent',
    title: 'Multi-Agent Systems',
  },
  
  // Section 9: Long-Running & Production
  {
    id: '201-17-long-running',
    component: LongRunningAgentsSlide,
    section: 'Production',
    title: 'Long-Running & Deep Agents',
  },
  {
    id: '201-18-error-handling',
    component: ErrorHandlingSlide,
    section: 'Production',
    title: 'Error Handling & Recovery',
  },
  
  // Section 10: Trust & Safety
  {
    id: '201-19-human-in-the-loop',
    component: HumanInTheLoopSlide,
    section: 'Trust & Safety',
    title: 'Human-in-the-Loop',
  },
  {
    id: '201-20-security',
    component: SecuritySlide,
    section: 'Trust & Safety',
    title: 'Security for Agents',
  },
  
  // Section 11: Best Practices
  {
    id: '201-21-best-practices',
    component: BestPracticesSlide,
    section: 'Best Practices',
    title: 'Best Practices',
  },
  
  // Section 12: Closing
  {
    id: '201-22-takeaways',
    component: TakeawaysSlide,
    section: 'Closing',
    title: 'Key Takeaways',
  },
  {
    id: '201-23-thank-you',
    component: ThankYouSlide,
    section: 'Closing',
    title: 'Thank You',
  },
];
