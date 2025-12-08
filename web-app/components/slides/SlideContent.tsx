'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LineReveal from '../animations/LineReveal';

interface SlideContentProps {
  content: string;
}

export default function SlideContent({ content }: SlideContentProps) {
  // Check if content starts with a heading - if so, don't render it as h1 in markdown
  const contentWithoutTitle = content.replace(/^###\s+.*$/m, '');
  
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            const text = String(children);
            const lines = text.split('\n').filter(line => line.trim());
            
            // Regular paragraphs - consistent size, tighter spacing
            return (
              <LineReveal delay={0}>
                <p className="text-lg md:text-xl mb-4 leading-relaxed text-gray-200">
                  {children}
                </p>
              </LineReveal>
            );
          },
          h1: ({ children }) => (
            <LineReveal delay={0}>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight border-b border-gray-700 pb-6">
                {children}
              </h1>
            </LineReveal>
          ),
          h2: ({ children }) => (
            <LineReveal delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold mt-12 mb-8 text-white leading-tight">
                {children}
              </h2>
            </LineReveal>
          ),
          h3: ({ children }) => (
            <LineReveal delay={0}>
              <h3 className="text-3xl md:text-4xl font-semibold mt-10 mb-6 text-white">
                {children}
              </h3>
            </LineReveal>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-4 my-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-4 my-6 ml-4">{children}</ol>
          ),
          li: ({ children }) => {
            return (
              <LineReveal delay={0}>
                <li className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-4 pl-2">
                  {children}
                </li>
              </LineReveal>
            );
          },
          blockquote: ({ children }) => (
            <LineReveal delay={0}>
              <blockquote className="border-l-4 border-blue-500 pl-6 italic my-8 text-xl md:text-2xl text-gray-300">
                {children}
              </blockquote>
            </LineReveal>
          ),
          code: ({ children }) => (
            <code className="bg-gray-800 px-3 py-1.5 rounded text-base font-mono text-blue-300">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-800 p-6 rounded-lg overflow-x-auto my-6 text-sm">
              {children}
            </pre>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-bold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-gray-300 italic">{children}</em>
          ),
          hr: () => (
            <hr className="my-10 border-gray-700" />
          ),
        }}
      >
        {contentWithoutTitle}
      </ReactMarkdown>
    </div>
  );
}

