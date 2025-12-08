'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Component {
  id: string;
  label: string;
  shortLabel: string;
  position: { x: number; y: number };
  description: string;
  labelPosition: 'top' | 'bottom' | 'left' | 'right';
}

const components: Component[] = [
  {
    id: 'goal',
    label: 'Goal & Constraints',
    shortLabel: 'Goal & Constraints',
    position: { x: 15, y: 20 },
    description: 'Defines mission and boundaries',
    labelPosition: 'left',
  },
  {
    id: 'brain',
    label: 'LLM Brain',
    shortLabel: 'LLM Brain',
    position: { x: 50, y: 12 },
    description: 'Understands, reasons, plans',
    labelPosition: 'top',
  },
  {
    id: 'memory',
    label: 'Memory',
    shortLabel: 'Memory',
    position: { x: 85, y: 20 },
    description: 'Short-term context and long-term history',
    labelPosition: 'right',
  },
  {
    id: 'tools',
    label: 'Tools/APIs',
    shortLabel: 'Tools/APIs',
    position: { x: 85, y: 55 },
    description: 'Acts in the real world',
    labelPosition: 'right',
  },
  {
    id: 'planner',
    label: 'Planner/Scheduler',
    shortLabel: 'Planner/Scheduler',
    position: { x: 15, y: 55 },
    description: 'Sequences steps',
    labelPosition: 'left',
  },
  {
    id: 'reflection',
    label: 'Reflection Loop',
    shortLabel: 'Reflection Loop',
    position: { x: 50, y: 72 },
    description: 'Evaluates its own work',
    labelPosition: 'bottom',
  },
];

const humanOversight = {
  id: 'oversight',
  label: 'Human Oversight',
  position: { x: 50, y: -3 },
  description: 'Ensures alignment and safety',
};

export default function AgentAnatomy() {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const getLabelPosition = (component: Component) => {
    const offset = 5.5;
    switch (component.labelPosition) {
      case 'top':
        return { x: component.position.x, y: component.position.y - offset };
      case 'bottom':
        return { x: component.position.x, y: component.position.y + offset };
      case 'left':
        return { x: component.position.x - offset, y: component.position.y };
      case 'right':
        return { x: component.position.x + offset, y: component.position.y };
      default:
        return { x: component.position.x, y: component.position.y + offset };
    }
  };

  const getTextAnchor = (position: 'top' | 'bottom' | 'left' | 'right') => {
    if (position === 'left') return 'end';
    if (position === 'right') return 'start';
    return 'middle';
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-3xl" style={{ aspectRatio: '1', maxHeight: '60vh' }}>
        {/* SVG Container */}
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
          {/* Human Oversight (Top) - Connected to LLM Brain */}
          <motion.g
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Connection line from Human Oversight to LLM Brain */}
            <motion.line
              x1={50}
              y1={12}
              x2={50}
              y2={humanOversight.position.y + 3}
              stroke="#f59e0b"
              strokeWidth="0.4"
              strokeDasharray="1 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            />
            
            <motion.circle
              cx={humanOversight.position.x}
              cy={humanOversight.position.y}
              r={3}
              fill="#f59e0b"
              className="cursor-pointer"
              whileHover={{ scale: 1.3 }}
              onHoverStart={() => setHoveredComponent(humanOversight.id)}
              onHoverEnd={() => setHoveredComponent(null)}
            />
            <motion.text
              x={humanOversight.position.x}
              y={humanOversight.position.y - 5}
              textAnchor="middle"
              className="text-xs fill-orange-400 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '2.5px',
              }}
            >
              {humanOversight.label}
            </motion.text>
          </motion.g>

          {/* Agent Core (Center) */}
          <motion.circle
            cx={50}
            cy={38}
            r={6.5}
            fill="#3b82f6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          />
          <motion.text
            x={50}
            y={40}
            textAnchor="middle"
            className="text-xs fill-white font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '3px',
            }}
          >
            AGENT
          </motion.text>

          {/* Components */}
          {components.map((component, index) => {
            const labelPos = getLabelPosition(component);
            const textAnchor = getTextAnchor(component.labelPosition);
            
            return (
              <motion.g
                key={component.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                {/* Connection Line */}
                <motion.line
                  x1={50}
                  y1={38}
                  x2={component.position.x}
                  y2={component.position.y}
                  stroke="#6b7280"
                  strokeWidth="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                />

                {/* Component Circle */}
                <motion.circle
                  cx={component.position.x}
                  cy={component.position.y}
                  r={3}
                  fill={hoveredComponent === component.id ? '#60a5fa' : '#9ca3af'}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.4, fill: '#60a5fa' }}
                  onHoverStart={() => setHoveredComponent(component.id)}
                  onHoverEnd={() => setHoveredComponent(null)}
                />

                {/* Component Label */}
                <motion.text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor={textAnchor}
                  className={`text-xs fill-gray-300 font-medium ${
                    hoveredComponent === component.id ? 'fill-blue-400' : ''
                  }`}
                  style={{
                    fontSize: '2.5px',
                  }}
                >
                  {component.shortLabel.split('/').map((part, i, arr) => (
                    <tspan
                      key={i}
                      x={labelPos.x}
                      dy={i === 0 ? 0 : 2.5}
                      textAnchor={textAnchor}
                    >
                      {part}
                    </tspan>
                  ))}
                </motion.text>
              </motion.g>
            );
          })}

          {/* Living Loop (Bottom) */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.ellipse
              cx={50}
              cy={87}
              rx={32}
              ry={5}
              fill="none"
              stroke="#10b981"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            />
            <motion.text
              x={50}
              y={89}
              textAnchor="middle"
              className="text-xs fill-green-400 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              style={{
                fontSize: '2.5px',
              }}
            >
              Perceive → Reason → Act → Reflect → Learn
            </motion.text>
          </motion.g>
        </svg>

        {/* Tooltip */}
        {hoveredComponent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-lg z-10 max-w-xs"
          >
            <div className="text-sm text-white font-semibold mb-1">
              {hoveredComponent === 'oversight'
                ? humanOversight.label
                : components.find((c) => c.id === hoveredComponent)?.label}
            </div>
            <div className="text-xs text-gray-300">
              {hoveredComponent === 'oversight'
                ? humanOversight.description
                : components.find((c) => c.id === hoveredComponent)?.description}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
