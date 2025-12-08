import { SlideNotes } from '@/components/ui/PresenterPanel';

export const presenterNotes: Record<number, SlideNotes> = {
  1: {
    slideNumber: 1,
    objective: 'Set the stage and establish credibility. Make audience feel this will be valuable.',
    duration: '~1 min',
    talkingPoints: [
      'Welcome everyone and introduce yourself briefly',
      'Explain why this topic matters NOW — AI is evolving fast',
      'Set expectations: practical, no hype, real applications',
      'Mention this is interactive — questions welcome anytime',
    ],
    emphasize: [
      'This is about augmentation, not replacement',
      'Focus on practical applications, not theory',
    ],
    transition: 'Let me start by asking — how many of you have felt overwhelmed by the number of tools and tabs you use daily?',
  },

  2: {
    slideNumber: 2,
    objective: 'Create emotional connection by acknowledging shared pain points.',
    duration: '~2 min',
    talkingPoints: [
      'Acknowledge the chaos: 47 tabs, 5 dashboards, constant context switching',
      'These are REAL statistics — 2.5 hours lost daily to context switching',
      'This resonates with everyone regardless of role',
      'Pause to let the audience connect with this reality',
    ],
    questions: [
      'How many tabs do you have open right now?',
      'When was the last time you felt truly focused at work?',
    ],
    emphasize: [
      'This is not about working harder — it is about the tools failing us',
    ],
    transition: 'What if there was a better way? What if YOU had superpowers?',
  },

  3: {
    slideNumber: 3,
    objective: 'Paint the vision of what is possible with AI augmentation.',
    duration: '~2 min',
    talkingPoints: [
      'Watch the transformation animation — Today vs Tomorrow',
      'Key message: AI AUGMENTS you, does not replace you',
      'You focus, AI fetches. You decide, AI executes.',
      'Emphasize: You stay in control',
    ],
    emphasize: [
      'AUGMENT is the key word — making YOU more effective',
      'This is about amplifying human capability, not replacing it',
    ],
    examples: [
      'Imagine asking for a summary instead of reading 50 pages',
      'Imagine the system remembering what you forgot',
    ],
    transition: 'Let me show you the journey of how we got here...',
  },

  4: {
    slideNumber: 4,
    objective: 'Give audience a roadmap of what they will learn.',
    duration: '~1 min',
    talkingPoints: [
      'Quick overview of the journey we will take',
      'From history → understanding → practical application',
      'By the end, you will know WHEN and HOW to use agents',
      'Keep this brief — just setting expectations',
    ],
    transition: 'Let us start at the beginning...',
  },

  5: {
    slideNumber: 5,
    objective: 'Set historical context — AI was always reactive until now.',
    duration: '~2 min',
    talkingPoints: [
      'AI has been around for decades, but always REACTIVE',
      'Photo apps recognizing faces, voice assistants understanding speech',
      'The key limitation: AI waited for YOU to act',
      'Foreshadow: What changed? The ability to TAKE ACTION',
    ],
    emphasize: [
      'The shift from reactive to proactive is the key breakthrough',
    ],
    transition: 'To understand agents, we need to understand the evolution...',
  },

  6: {
    slideNumber: 6,
    objective: 'Explain Large Language Models in simple terms.',
    duration: '~2 min',
    talkingPoints: [
      'LLMs = Large Language Models — trained on billions of parameters',
      'Simple example: "The weather today is..." → AI adds "sunny and warm"',
      'They could generate fluent text, but could not UNDERSTAND or REMEMBER',
      'This was impressive but limited — no memory, no tools, no goals',
    ],
    examples: [
      'GPT-2 in 2019 had 1.5 billion parameters',
      'GPT-3 in 2020 jumped to 175 billion parameters',
    ],
    transition: 'Then came the assistants...',
  },

  7: {
    slideNumber: 7,
    objective: 'Show how AI Assistants added memory and conversation.',
    duration: '~2 min',
    talkingPoints: [
      'ChatGPT, GitHub Copilot, Grammarly — these are AI assistants',
      'Key breakthrough: They remember the CONVERSATION',
      'Show the example: "I am planning a trip" → later "What hotel?"',
      'Still reactive — they WAIT for you to ask',
    ],
    emphasize: [
      'Memory within a conversation was a big step forward',
      'But still: no tools, no independent action',
    ],
    transition: 'Then AI learned to THINK step by step...',
  },

  8: {
    slideNumber: 8,
    objective: 'Explain chain-of-thought reasoning breakthrough.',
    duration: '~2 min',
    talkingPoints: [
      'Before: AI would guess at complex problems',
      'After: AI breaks problems into steps, like we do',
      'The math example shows this clearly: step-by-step thinking',
      'This enabled PLANNING and VERIFICATION',
    ],
    examples: [
      'Instead of guessing 23 × 17 = 391, it shows: 23 × 17 = 23 × 10 + 23 × 7...',
    ],
    emphasize: [
      'This is what unlocked agents — the ability to plan and verify',
    ],
    transition: 'Now, what happens when we combine all of these?',
  },

  9: {
    slideNumber: 9,
    objective: 'Show how Memory + Tools + Goals = Agents.',
    duration: '~2 min',
    talkingPoints: [
      'Memory: Knows context and history',
      'Tools: Can actually DO things — not just suggest',
      'Goals: Works toward outcomes, not just responds',
      'The formula: 🧠 + 🔧 + 🎯 = 🤖 Agent',
    ],
    emphasize: [
      'You ask → It answers (Assistant) vs You set goal → It works (Agent)',
      'This shift from reactive to proactive is fundamental',
    ],
    transition: 'Let me show you the complete evolution...',
  },

  10: {
    slideNumber: 10,
    objective: 'Summarize the evolution timeline.',
    duration: '~1 min',
    talkingPoints: [
      'Quick visual recap of all four stages',
      'Each stage built on the previous',
      'From "answering questions" to "achieving goals"',
      'We are NOW in the age of agents (2024-Present)',
    ],
    transition: 'So what exactly IS an agent? Let me define it clearly...',
  },

  11: {
    slideNumber: 11,
    objective: 'Give a clear, memorable definition of an AI agent.',
    duration: '~2 min',
    talkingPoints: [
      'An agent is AI that can: perceive, reason, and ACT',
      'Key difference from assistants: AUTONOMY in execution',
      'It does not just suggest — it DOES',
      'Still works WITHIN boundaries you set',
    ],
    emphasize: [
      'Autonomy does not mean uncontrolled — you set the guardrails',
    ],
    transition: 'Let me show you what is inside an agent...',
  },

  12: {
    slideNumber: 12,
    objective: 'Break down the components of an agent step by step.',
    duration: '~3 min',
    talkingPoints: [
      'Walk through each component: User prompt → LLM → Response',
      'Point out the bidirectional connections to Knowledge, Tools, Memory',
      'Emphasize: The LLM is the brain, tools are the hands',
      'Goals and guidelines shape HOW it behaves',
    ],
    emphasize: [
      'The arrows show information flow — this is not just a chatbot',
      'Tools are what make agents AGENTS — they can act',
    ],
    transition: 'Now let us see this in action with real challenges...',
  },

  13: {
    slideNumber: 13,
    objective: 'Show relatable cross-team challenges that agents can solve.',
    duration: '~3 min',
    talkingPoints: [
      'Click through each scenario tab to show relevance',
      'These are SHARED problems — not role-specific',
      'Highlight the coordination costs and time waste',
      'Let audience connect: "I have been there"',
    ],
    questions: [
      'Which of these scenarios is most familiar to you?',
    ],
    emphasize: [
      'The pain is in COORDINATION, not individual tasks',
    ],
    transition: 'So how can agents help with these challenges?',
  },

  14: {
    slideNumber: 14,
    objective: 'Show how agents solve cross-team challenges.',
    duration: '~3 min',
    talkingPoints: [
      'Match each scenario with how an agent helps',
      'Emphasize: Human + Agent collaboration, not replacement',
      'The agent does the heavy lifting — correlation, gathering, drafting',
      'The human stays in control — decisions, approvals, judgment',
    ],
    emphasize: [
      'You set the goal, agent handles the details',
      'Agent multiplies your effectiveness, not replaces you',
    ],
    transition: 'Let us look at the measurable impact...',
  },

  15: {
    slideNumber: 15,
    objective: 'Show measurable results from agent adoption.',
    duration: '~2 min',
    talkingPoints: [
      'Real metrics: 90% reduction in incident resolution time',
      'Beyond numbers: reduced burnout, preserved knowledge',
      'Bottom line: You stay in control, AI handles heavy lifting',
      'These are achievable results, not theoretical',
    ],
    emphasize: [
      'The qualitative gains matter as much as the numbers',
    ],
    transition: 'Now let us understand HOW agents achieve this...',
  },

  16: {
    slideNumber: 16,
    objective: 'Explain the universal agent loop pattern.',
    duration: '~3 min',
    talkingPoints: [
      'All agents follow this pattern: Gather → Act → Verify → Repeat',
      'Unlike chatbots, agents ACTIVELY work through problems',
      'Key insight: Agents verify their own work',
      'This loop continues until the goal is achieved',
    ],
    emphasize: [
      'The VERIFY step is what makes agents reliable',
      'Agents do not just answer — they check their work',
    ],
    transition: 'Let me show you how this applies to different roles...',
  },

  17: {
    slideNumber: 17,
    objective: 'Show role-specific examples of the agent loop.',
    duration: '~3 min',
    talkingPoints: [
      'Walk through each persona: SysAdmin, DevOps, Developer',
      'Same pattern, different context',
      'Show the time savings for each',
      'Make it relatable to the audience',
    ],
    questions: [
      'Which of these examples resonates most with your work?',
    ],
    transition: 'Now let us talk about how to BUILD effective agents...',
  },

  18: {
    slideNumber: 18,
    objective: 'Explain context engineering and progressive disclosure.',
    duration: '~3 min',
    talkingPoints: [
      'Context is expensive (tokens cost money and time)',
      'Progressive disclosure: load only what is needed',
      'Three levels: Metadata → Content → Deep dive',
      'Hover over pyramid levels to see examples',
    ],
    emphasize: [
      'Start small, expand as needed',
      'This is how you keep agents fast and cheap',
    ],
    transition: 'Context is important, but so are the right tools...',
  },

  19: {
    slideNumber: 19,
    objective: 'Explain tool design principles and MCP.',
    duration: '~3 min',
    talkingPoints: [
      'Tools are what make agents AGENTS',
      'Each role needs different tools',
      'MCP (Model Context Protocol) is a standard for tools',
      'Good tools are specific, safe, and observable',
    ],
    emphasize: [
      'Tools should do ONE thing well',
      'Always have human oversight for destructive actions',
    ],
    transition: 'Let us see how this works in practice...',
  },

  20: {
    slideNumber: 20,
    objective: 'Show practical agent loop examples.',
    duration: '~2 min',
    talkingPoints: [
      'Concrete examples of Gather → Act → Verify',
      'Show persona-specific workflows',
      'Emphasize the iterative nature',
    ],
    transition: 'Now let us look at common patterns...',
  },

  21: {
    slideNumber: 21,
    objective: 'Share best practices and patterns.',
    duration: '~2 min',
    talkingPoints: [
      'Four key principles for effective agents',
      'Start small, verify often, keep human in loop, iterate',
      'These are lessons from real implementations',
    ],
    transition: 'But when should you actually USE agents?',
  },

  22: {
    slideNumber: 22,
    objective: 'Help audience decide when to use agents.',
    duration: '~2 min',
    talkingPoints: [
      'Use agents for: repetitive, multi-step, data-heavy tasks',
      'DO NOT use agents for: simple queries, one-off tasks, sensitive decisions',
      'The decision framework helps you choose',
    ],
    emphasize: [
      'Not everything needs an agent',
      'Simple chat is often enough',
    ],
    transition: 'Let us also be honest about limitations...',
  },

  23: {
    slideNumber: 23,
    objective: 'Be transparent about current limitations.',
    duration: '~2 min',
    talkingPoints: [
      'Hallucinations, cost, latency are real challenges',
      'For each limitation, there is a mitigation strategy',
      'Honest assessment builds trust',
    ],
    emphasize: [
      'Being honest about limitations is important',
      'These are solvable with the right approach',
    ],
    transition: 'Now let us look at where this is going...',
  },

  24: {
    slideNumber: 24,
    objective: 'Introduce multi-agent systems concept.',
    duration: '~2 min',
    talkingPoints: [
      'Multiple specialized agents working together',
      'Orchestrator coordinates the specialists',
      'Like a team of experts, each with a specialty',
    ],
    transition: 'And agents that run for hours or days...',
  },

  25: {
    slideNumber: 25,
    objective: 'Explain long-running agent concepts.',
    duration: '~2 min',
    talkingPoints: [
      'Agents that work overnight, over weekends',
      'Handle: checkpointing, resumption, progress tracking',
      'Examples: code refactoring, data migration, monitoring',
    ],
    transition: 'Here are some real-world applications...',
  },

  26: {
    slideNumber: 26,
    objective: 'Show concrete applications by role.',
    duration: '~2 min',
    talkingPoints: [
      'DevOps: CI/CD, monitoring, incident response',
      'SysAdmin: Log analysis, capacity planning',
      'Developer: Code review, documentation, testing',
    ],
    transition: 'So how do you get started?',
  },

  27: {
    slideNumber: 27,
    objective: 'Give actionable first steps.',
    duration: '~2 min',
    talkingPoints: [
      'Start with existing tools (GitHub Copilot, etc.)',
      'Identify ONE repetitive task to automate',
      'Experiment, measure, iterate',
      'Join the community, share learnings',
    ],
    emphasize: [
      'Start small — do not try to automate everything at once',
    ],
    transition: 'Let me summarize what we covered...',
  },

  28: {
    slideNumber: 28,
    objective: 'Summarize key takeaways.',
    duration: '~1 min',
    talkingPoints: [
      'Four key principles to remember',
      'Agents augment, not replace',
      'Start small, verify often',
      'Human stays in control',
    ],
    transition: 'Any questions?',
  },

  29: {
    slideNumber: 29,
    objective: 'Open floor for Q&A.',
    duration: '~5 min',
    talkingPoints: [
      'Encourage questions from the audience',
      'If no questions, have some prepared talking points',
      'Share resources for further learning',
    ],
    questions: [
      'What would you automate first?',
      'What concerns do you have about agent adoption?',
    ],
    transition: 'Thank you all for your time...',
  },

  30: {
    slideNumber: 30,
    objective: 'Close with gratitude and next steps.',
    duration: '~1 min',
    talkingPoints: [
      'Thank the audience for their time',
      'Share contact info or resources',
      'Encourage them to start experimenting',
      'End with energy and optimism',
    ],
    emphasize: [
      'The future is about humans AND AI, together',
    ],
  },
};

