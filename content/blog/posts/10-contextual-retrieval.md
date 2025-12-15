# Contextual Retrieval in AI Systems - Content Draft

**Source**: Anthropic article on Contextual Retrieval (conceptual content extracted)
**Status**: Draft - awaiting organization
**Note**: Content focuses on concepts and patterns, not product-specific features

---

## The Problem: Knowledge Base Access

### Core Need

**Requirement**: For AI model to be useful in specific contexts, it often needs access to background knowledge

**Examples**:
- Customer support chatbots need knowledge about specific business
- Legal analyst bots need to know about vast array of past cases

### Traditional Solution: RAG

**Method**: Retrieval-Augmented Generation (RAG)
- Retrieves relevant information from knowledge base
- Appends it to user's prompt
- Significantly enhances model's response

**Problem**: Traditional RAG solutions remove context when encoding information
- Often results in system failing to retrieve relevant information from knowledge base

---

## Simple Solution: Longer Prompts

### When It Works

**Threshold**: If your knowledge base is smaller than 200,000 tokens (about 500 pages of material)

**Approach**: Can just include entire knowledge base in prompt that you give model
- No need for RAG or similar methods

**Optimization**: Prompt caching makes this approach significantly faster and more cost-effective
- Can cache frequently used prompts between API calls
- Reduces latency by > 2x
- Reduces costs by up to 90%

### When You Need More

**Scaling**: As knowledge base grows, need more scalable solution
- That's where Contextual Retrieval comes in

---

## A Primer on RAG: Scaling to Larger Knowledge Bases

### Traditional RAG Process

**Preprocessing Steps**:

1. **Chunking**: Break down knowledge base (corpus of documents) into smaller chunks of text
   - Usually no more than few hundred tokens

2. **Embedding**: Use embedding model to convert these chunks into vector embeddings that encode meaning

3. **Storage**: Store these embeddings in vector database that allows for searching by semantic similarity

**Runtime Process**:

1. **Query**: User inputs query to model

2. **Retrieval**: Vector database used to find most relevant chunks based on semantic similarity to query

3. **Augmentation**: Most relevant chunks added to prompt sent to generative model

### The Limitation: Embeddings Miss Exact Matches

**Strength**: Embedding models excel at capturing semantic relationships

**Weakness**: They can miss crucial exact matches

**Solution**: BM25 (Best Matching 25)
- Older technique that can assist in these situations
- Ranking function that uses lexical matching to find precise word or phrase matches
- Particularly effective for queries that include unique identifiers or technical terms

### How BM25 Works

**Foundation**: Builds upon TF-IDF (Term Frequency-Inverse Document Frequency) concept

**TF-IDF**: Measures how important a word is to a document in a collection

**BM25 Refinement**: 
- Considers document length
- Applies saturation function to term frequency
- Helps prevent common words from dominating results

**Example**: Suppose user queries "Error code TS-999" in technical support database
- Embedding model might find content about error codes in general
- Could miss exact "TS-999" match
- BM25 looks for this specific text string to identify relevant documentation

### Combining Embeddings and BM25

**Enhanced RAG Process**:

1. **Chunking**: Break down knowledge base into smaller chunks (usually no more than few hundred tokens)

2. **Dual Encoding**: Create TF-IDF encodings and semantic embeddings for these chunks

3. **BM25 Retrieval**: Use BM25 to find top chunks based on exact matches

4. **Embedding Retrieval**: Use embeddings to find top chunks based on semantic similarity

5. **Rank Fusion**: Combine and deduplicate results from steps 3 and 4 using rank fusion techniques

6. **Augmentation**: Add top-K chunks to prompt to generate response

**Benefit**: By leveraging both BM25 and embedding models, traditional RAG systems can provide more comprehensive and accurate results, balancing precise term matching with broader semantic understanding

**Scalability**: Allows cost-effective scaling to enormous knowledge bases, far beyond what could fit in single prompt

### The Context Problem

**Limitation**: Traditional RAG systems have significant limitation—they often destroy context

**How It Happens**: Documents are typically split into smaller chunks for efficient retrieval

**Problem**: While this approach works well for many applications, it can lead to problems when individual chunks lack sufficient context

**Example**: Imagine collection of financial information (U.S. SEC filings) embedded in knowledge base

**Query**: "What was the revenue growth for ACME Corp in Q2 2023?"

**Relevant Chunk**: "The company's revenue grew by 3% over the previous quarter."

**Problem**: This chunk on its own doesn't specify:
- Which company it's referring to
- Relevant time period

**Result**: Makes it difficult to retrieve right information or use information effectively

---

## Introducing Contextual Retrieval

### The Solution

**Concept**: Contextual Retrieval solves context problem by prepending chunk-specific explanatory context to each chunk before:
- Embedding ("Contextual Embeddings")
- Creating BM25 index ("Contextual BM25")

### Example Transformation

**Original Chunk**:
```
"The company's revenue grew by 3% over the previous quarter."
```

**Contextualized Chunk**:
```
"This chunk is from an SEC filing on ACME corp's performance in Q2 2023; the previous quarter's revenue was $314 million. The company's revenue grew by 3% over the previous quarter."
```

**Key**: Contextual information prepended to chunk provides necessary context for retrieval

### Related Approaches

**Note**: Other approaches to using context to improve retrieval have been proposed in past

**Other Proposals Include**:
- Adding generic document summaries to chunks (limited gains)
- Hypothetical document embedding
- Summary-based indexing (low performance)

**Difference**: These methods differ from what is proposed in Contextual Retrieval

---

## Implementing Contextual Retrieval

### The Challenge

**Scale**: Would be far too much work to manually annotate thousands or even millions of chunks in knowledge base

**Solution**: Use LLM to generate context automatically

### The Prompt

**Approach**: Prompt that instructs model to provide concise, chunk-specific context that explains chunk using context of overall document

**Example Prompt Structure**:
```
<document> 
{{WHOLE_DOCUMENT}} 
</document> 

Here is the chunk we want to situate within the whole document 

<chunk> 
{{CHUNK_CONTENT}} 
</chunk> 

Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else.
```

**Output**: Resulting contextual text, usually 50-100 tokens, is prepended to chunk before:
- Embedding it
- Creating BM25 index

### Preprocessing Flow

**Process**:
1. Take document and chunk
2. Generate contextual information using LLM
3. Prepend context to chunk
4. Create embeddings and BM25 index from contextualized chunk

**Result**: Both embeddings and BM25 index now contain contextual information

### Cost Optimization: Prompt Caching

**Unique Advantage**: Contextual Retrieval uniquely possible at low cost with prompt caching

**How It Works**: With prompt caching, don't need to pass in reference document for every chunk
- Simply load document into cache once
- Then reference previously cached content

**Cost Example**: Assuming:
- 800 token chunks
- 8k token documents
- 50 token context instructions
- 100 tokens of context per chunk

**One-Time Cost**: $1.02 per million document tokens to generate contextualized chunks

**Benefit**: Makes Contextual Retrieval cost-effective at scale

---

## Performance Improvements

### Experimental Setup

**Domains Tested**: Various knowledge domains:
- Codebases
- Fiction
- ArXiv papers
- Science Papers

**Variables Tested**:
- Embedding models
- Retrieval strategies
- Evaluation metrics

**Evaluation Metric**: 1 minus recall@20
- Measures percentage of relevant documents that fail to be retrieved within top 20 chunks

**Configuration**: Top-performing embedding configuration (Gemini Text 004), retrieving top-20 chunks

### Results

**Baseline**: Top-20-chunk retrieval failure rate: 5.7%

**Contextual Embeddings**: Reduced failure rate by 35% (5.7% → 3.7%)

**Combined Approach**: Contextual Embeddings + Contextual BM25 reduced failure rate by 49% (5.7% → 2.9%)

**Key Finding**: Contextualizing improves performance in every embedding-source combination evaluated

---

## Implementation Considerations

### 1. Chunk Boundaries

**Consideration**: How you split documents into chunks affects retrieval performance

**Factors**:
- Chunk size
- Chunk boundary
- Chunk overlap

**Impact**: Choice of these parameters can affect retrieval performance

### 2. Embedding Model

**Finding**: Contextual Retrieval improves performance across all embedding models tested

**Variation**: Some models may benefit more than others

**Best Performers**: Found Gemini and Voyage embeddings to be particularly effective

### 3. Custom Contextualizer Prompts

**Generic Prompt**: Generic prompt provided works well

**Optimization Opportunity**: May achieve even better results with prompts tailored to specific domain or use case

**Example**: Including glossary of key terms that might only be defined in other documents in knowledge base

### 4. Number of Chunks

**Trade-off**: Adding more chunks into context window:
- Increases chances that you include relevant information
- However, more information can be distracting for models
- There's limit to this

**Testing**: Tried delivering 5, 10, and 20 chunks

**Finding**: Found using 20 to be most performant of these options

**Recommendation**: Worth experimenting on your use case

### 5. Always Run Evals

**Important**: Response generation may be improved by:
- Passing it contextualized chunk
- Distinguishing between what is context and what is chunk

**Principle**: Always run evaluations to measure impact

---

## Further Boosting Performance with Reranking

### The Problem

**Initial Retrieval**: With large knowledge bases, initial retrieval often returns lot of chunks—sometimes hundreds—of varying relevance and importance

**Need**: Filtering technique to ensure only most relevant chunks are passed to model

### Reranking Process

**Common Technique**: Reranking is commonly used filtering technique

**Benefits**:
- Provides better responses
- Reduces cost and latency (model processing less information)

**Key Steps**:

1. **Initial Retrieval**: Perform initial retrieval to get top potentially relevant chunks (e.g., top 150)

2. **Reranking**: Pass top-N chunks, along with user's query, through reranking model

3. **Scoring**: Using reranking model, give each chunk score based on its relevance and importance to prompt

4. **Selection**: Select top-K chunks (e.g., top 20)

5. **Augmentation**: Pass top-K chunks into model as context to generate final result

### Performance Improvements

**Reranking Models**: Several reranking models on market

**Tested**: Ran tests with Cohere reranker (Voyage also offers reranker)

**Finding**: Across various domains, adding reranking step further optimizes retrieval

**Result**: Reranked Contextual Embedding and Contextual BM25 reduced top-20-chunk retrieval failure rate by 67% (5.7% → 1.9%)

### Cost and Latency Considerations

**Trade-off**: Important consideration with reranking is impact on latency and cost, especially when reranking large number of chunks

**Latency**: Reranking adds extra step at runtime
- Inevitably adds small amount of latency
- Even though reranker scores all chunks in parallel

**Balance**: Inherent trade-off between:
- Reranking more chunks for better performance
- Reranking fewer for lower latency and cost

**Recommendation**: Experiment with different settings on your specific use case to find right balance

---

## Conclusion: Summary of Findings

### Comprehensive Testing

**Scope**: Ran large number of tests, comparing different combinations of all techniques described above:
- Embedding model
- Use of BM25
- Use of contextual retrieval
- Use of reranker
- Total # of top-K results retrieved

**Across**: Variety of different dataset types

### Key Findings

1. **Embeddings+BM25**: Better than embeddings on their own

2. **Best Embeddings**: Voyage and Gemini have best embeddings of ones tested

3. **Top-K Selection**: Passing top-20 chunks to model is more effective than just top-10 or top-5

4. **Contextual Retrieval**: Adding context to chunks improves retrieval accuracy a lot

5. **Reranking**: Better than no reranking

6. **Stacking Benefits**: All these benefits stack—to maximize performance improvements, can combine:
   - Contextual embeddings (from Voyage or Gemini)
   - Contextual BM25
   - Reranking step
   - Adding 20 chunks to prompt

### Recommendation

**Encouragement**: Encourage all developers working with knowledge bases to experiment with these approaches to unlock new levels of performance

---

## Key Concepts Summary

### Traditional RAG

**Process**: Chunk → Embed → Store → Retrieve → Augment

**Limitation**: Destroys context when chunking

### Contextual Retrieval

**Solution**: Prepend chunk-specific context before embedding/indexing

**Two Techniques**:
1. **Contextual Embeddings**: Context prepended before embedding
2. **Contextual BM25**: Context prepended before BM25 indexing

**Implementation**: Use LLM to generate context automatically

**Cost Optimization**: Prompt caching makes it cost-effective

### Performance Stack

**Layers**:
1. Embeddings + BM25 (better than embeddings alone)
2. Contextual Retrieval (49% improvement)
3. Reranking (67% improvement when combined)

**Best Configuration**:
- Contextual embeddings (Voyage or Gemini)
- Contextual BM25
- Reranking
- Top-20 chunks

---

## Principles Summary

### Retrieval Principles

1. **Start Simple**: For small knowledge bases (<200K tokens), just include in prompt

2. **Scale with RAG**: For larger knowledge bases, use RAG

3. **Combine Techniques**: Embeddings + BM25 better than either alone

4. **Preserve Context**: Contextual Retrieval preserves context lost in chunking

5. **Rerank for Quality**: Reranking filters to most relevant chunks

### Implementation Principles

1. **Chunk Carefully**: Chunk boundaries, size, and overlap matter

2. **Choose Embeddings**: Some models benefit more from contextualization

3. **Customize Prompts**: Domain-specific prompts may improve results

4. **Optimize Top-K**: Experiment with number of chunks (20 found optimal)

5. **Balance Trade-offs**: Consider latency/cost vs. performance for reranking

6. **Always Evaluate**: Run evals to measure impact

---

## Summary

Contextual Retrieval solves fundamental problem in traditional RAG: loss of context when chunking documents.

**The Problem**: Chunks lack context (which company? what time period?)

**The Solution**: Prepend chunk-specific context before embedding/indexing

**The Implementation**: Use LLM to generate context automatically (cost-effective with prompt caching)

**The Results**: 
- 49% reduction in retrieval failures (with Contextual Embeddings + BM25)
- 67% reduction when combined with reranking

**The Stack**: Best performance achieved by combining:
- Contextual embeddings (Voyage/Gemini)
- Contextual BM25
- Reranking
- Top-20 chunks

**Core Principle**: Preserve context throughout retrieval pipeline to improve accuracy and downstream task performance.

