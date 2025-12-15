# AI Fluency Framework - Content Draft

**Source**: Anthropic AI Fluency Key Terminology Cheat Sheet (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and frameworks, not product-specific features

---

## Core AI Fluency Framework

### AI Fluency

**Definition**: The ability to work with AI systems in ways that are effective, efficient, ethical, and safe.

**Includes**:
- Practical skills
- Knowledge
- Insights
- Values

**Purpose**: Help you adapt to evolving AI technologies

### The 4Ds

**Concept**: The four core competencies of AI Fluency

**Components**:
1. **Delegation**
2. **Description**
3. **Discernment**
4. **Diligence**

---

## The 4Ds: Core Competencies

### 1. Delegation

**Definition**: Deciding on what work should be done by humans, what work should be done by AI, and how to distribute tasks between them.

**Includes**:
- Understanding your goals
- Understanding AI capabilities
- Making strategic choices about collaboration

**Three Components**:

#### Problem Awareness
- Clearly understanding your goals
- Understanding the nature of the work before involving AI

#### Platform Awareness
- Understanding the capabilities and limitations of different AI systems

#### Task Delegation
- Thoughtfully distributing work between humans and AI
- Leveraging the strengths of each

### 2. Description

**Definition**: Effectively communicating with AI systems.

**Includes**:
- Clearly defining outputs
- Guiding AI processes
- Specifying desired AI behaviors and interactions

**Three Components**:

#### Product Description
- Defining what you want in terms of:
  - Outputs
  - Format
  - Audience
  - Style

#### Process Description
- Defining how the AI approaches your request
- Example: Providing step-by-step instructions for the AI to follow

#### Performance Description
- Defining the AI's behavior during your collaboration
- Examples: Whether it should be concise or detailed, challenging or supportive

### 3. Discernment

**Definition**: Thoughtfully and critically evaluating AI outputs, processes, behaviors and interactions.

**Includes**:
- Assessing quality
- Assessing accuracy
- Assessing appropriateness
- Determining areas for improvement

**Three Components**:

#### Product Discernment
- Evaluating the quality of what AI produces
- Criteria: Accuracy, appropriateness, coherence, relevance

#### Process Discernment
- Evaluating how the AI arrived at its output
- Looking for:
  - Logical errors
  - Lapses in attention
  - Inappropriate reasoning steps

#### Performance Discernment
- Evaluating how the AI behaves during your interaction
- Considering whether its communication style is effective for your needs

### 4. Diligence

**Definition**: Using AI responsibly and ethically.

**Includes**:
- Making thoughtful choices about AI systems and interactions
- Maintaining transparency
- Taking accountability for AI-assisted work

**Three Components**:

#### Creation Diligence
- Being thoughtful about which AI systems you use
- Being thoughtful about how you interact with them

#### Transparency Diligence
- Being honest about AI's role in your work
- With everyone who needs to know
- **Context Matters**: Different contexts (personal, academic, professional) may have different expectations for disclosure and verification

#### Deployment Diligence
- Taking responsibility for verifying outputs
- Taking responsibility for vouching for outputs you use or share

---

## Human-AI Interaction Modes

### Mode 1: Automation

**Definition**: When AI performs specific tasks based on specific human instructions.

**Characteristics**:
- Human defines what needs to be done
- AI executes it

**Nature**: Directive, task-specific

### Mode 2: Augmentation

**Definition**: When humans and AI collaborate as thinking partners to complete tasks together.

**Characteristics**:
- Involves iterative back-and-forth
- Both contribute to the outcome

**Nature**: Collaborative, iterative

### Mode 3: Agency

**Definition**: When humans configure AI to work independently on their behalf, including interacting with other humans or AI.

**Characteristics**:
- Human establishes the AI's knowledge and behavior patterns
- Rather than specifying exact actions

**Nature**: Autonomous, pattern-based

---

## AI Technical Concepts

### Generative AI

**Definition**: AI systems that can create new content (text, images, code, etc.) rather than just analyzing existing data.

### Large Language Models (LLMs)

**Definition**: Generative AI systems trained on vast amounts of text data to understand and generate human language.

### Parameters

**Definition**: The mathematical values within an AI model that determine how it processes information and relates different pieces of language to each other.

**Scale**: Modern LLMs contain billions of parameters

### Neural Networks

**Definition**: Computing systems similar to, but distinct from, biological brains.

**Structure**: Composed of interconnected nodes organized in layers that learn patterns from data through training

### Transformer Architecture

**Definition**: The breakthrough AI design from 2017 that enables LLMs to process sequences of text in parallel while paying attention to relationships between words across long passages.

### Scaling Laws

**Definition**: As AI models have grown larger and trained on more data with more computing power, their performance has improved in consistent patterns.

**Nature**: Empirical observation

**Key Insight**: Perhaps most interestingly, entirely new capabilities can emerge at certain scale thresholds that weren't explicitly programmed

### Pre-training

**Definition**: The initial training phase where AI models learn patterns from vast amounts of text data, developing a foundational understanding of language and knowledge.

### Fine-tuning

**Definition**: Additional training after pre-training where models learn to:
- Follow instructions
- Provide helpful responses
- Avoid generating harmful content

### Context Window

**Definition**: The amount of information an AI can consider at one time, including:
- Conversation history
- Any documents you've shared

**Characteristic**: Has a maximum limit that varies by model

### Hallucination

**Definition**: A type of error when AI confidently states something that sounds plausible, but is actually incorrect.

### Knowledge Cutoff Date

**Definition**: The point after which an AI model has no built-in knowledge of the world, based on when it was trained.

### Reasoning or Thinking Models

**Definition**: Types of AI models specifically designed to think step-by-step through complex problems, showing improved capabilities for tasks requiring logical reasoning.

### Temperature

**Definition**: A setting that controls how random an AI's responses are.

**Higher Temperature**:
- Produces more varied and creative outputs
- Analogy: Boiling water bubbling

**Lower Temperature**:
- Produces more predictable and focused responses
- Analogy: Ice crystals

### Retrieval Augmented Generation (RAG)

**Definition**: A technique that connects AI models to external knowledge sources to improve accuracy and reduce hallucinations.

### Bias

**Definition**: Systematic patterns in AI outputs that unfairly favor or disadvantage certain groups or perspectives, often reflecting patterns in training data.

---

## Prompt Engineering Concepts

### Prompt

**Definition**: The input given to an AI model, including:
- Instructions
- Any documents shared

### Prompt Engineering

**Definition**: The practice of designing effective prompts for AI systems to produce desired outputs.

**Combines**:
- Clear communication
- AI-specific techniques

### Chain-of-Thought Prompting

**Definition**: Encouraging an AI to work through a problem step by step, breaking down complex tasks into smaller steps that help the AI follow your thinking and deliver better results.

### Few-Shot Learning (N-Shot Prompting)

**Definition**: Teaching AI by showing examples of the desired input-output pattern.

**The "N"**: Refers to the number of examples provided

**Benefit**: Helps the model understand what you want without lengthy explanations

### Role or Persona Definition

**Definition**: Specifying a particular character, expertise level, or communication style for the AI to adopt when responding.

**Range**:
- General roles: "speak as a UX design expert"
- Specific personas: "explain this like Richard Feynman would"

### Output Constraints / Output Formatting

**Definition**: Clearly specifying within your prompt the desired format, length, structure, or other characteristics of the AI's response to ensure you get exactly what you need.

### Think-First Approach

**Definition**: Explicitly asking the AI to work through its reasoning process before providing a final answer, which can lead to more thorough and well-considered responses.

---

## Framework Summary

### The 4Ds Framework

**Delegation**: Strategic distribution of work between humans and AI
- Problem Awareness
- Platform Awareness
- Task Delegation

**Description**: Effective communication with AI systems
- Product Description
- Process Description
- Performance Description

**Discernment**: Critical evaluation of AI outputs and processes
- Product Discernment
- Process Discernment
- Performance Discernment

**Diligence**: Responsible and ethical AI use
- Creation Diligence
- Transparency Diligence
- Deployment Diligence

### Human-AI Interaction Modes

1. **Automation**: AI executes specific human instructions
2. **Augmentation**: Human-AI collaborative partnership
3. **Agency**: AI works independently based on configured patterns

### Technical Foundation

**Core Concepts**:
- Generative AI and LLMs
- Neural networks and transformer architecture
- Parameters and scaling laws
- Training processes (pre-training, fine-tuning)

**Operational Concepts**:
- Context window
- Hallucination
- Knowledge cutoff
- Temperature
- RAG
- Bias

### Prompt Engineering Techniques

**Core Techniques**:
- Chain-of-thought prompting
- Few-shot learning
- Role/persona definition
- Output constraints/formatting
- Think-first approach

---

## Key Principles

### 1. The 4Ds Are Interconnected

**Delegation** informs what you need to **Describe**
**Description** enables effective **Discernment**
**Discernment** guides **Diligence** in deployment

### 2. Interaction Modes Are Not Mutually Exclusive

**Can Combine**: Different modes can be used together or sequentially
- Start with Automation
- Move to Augmentation for refinement
- Deploy Agency for ongoing operations

### 3. Technical Understanding Enables Better Practice

**Foundation**: Understanding technical concepts helps with:
- Better Delegation (knowing capabilities)
- Better Description (understanding how models work)
- Better Discernment (recognizing limitations)
- Better Diligence (understanding risks)

### 4. Prompt Engineering Is Core Skill

**Foundation**: Effective prompt engineering underlies:
- Description (how you communicate)
- Discernment (how you evaluate)
- Delegation (how you structure tasks)

---

## Summary

The AI Fluency Framework provides a comprehensive approach to working effectively with AI systems:

**The 4Ds**:
- **Delegation**: Strategic task distribution
- **Description**: Effective communication
- **Discernment**: Critical evaluation
- **Diligence**: Responsible use

**Three Interaction Modes**:
- **Automation**: Directive execution
- **Augmentation**: Collaborative partnership
- **Agency**: Autonomous operation

**Technical Foundation**: Understanding core AI concepts enables better practice

**Prompt Engineering**: Core skill for effective AI interaction

**Core Principle**: Effective, efficient, ethical, and safe AI use requires developing fluency across all these dimensions.

