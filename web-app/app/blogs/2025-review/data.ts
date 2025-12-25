/**
 * Year in Review 2025 - Configuration Data
 * 
 * This file contains all configurable content for the Year in Review page.
 * Structure mirrors YAML format for easy editing and potential migration.
 * 
 * To convert to YAML: simply copy the object structure
 * To update content: modify the values below
 */

import { YearInReviewData } from './types';

export const yearInReviewData: YearInReviewData = {
  // Page configuration
  config: {
    title: 'in Review',
    year: '2025',
    tagline: 'Solution Architects exploring what\'s possible with AI',
    headerIcon: '✨',
  },

  // The people behind this journey
  people: [
    {
      id: 'H',
      name: 'Hemang S',
      image: '/people/hemang.jpg',
    },
    {
      id: 'R',
      name: 'Raghu B',
      image: '/people/raghu.jpg',
    },
  ],

  // Themes - what we focused on (activities happen year-round)
  quarters: [
    {
      id: 'Q1',
      period: 'Jan - Mar',
      color: '#f43f5e',
      gradient: 'from-rose-500 to-orange-500',
      summary: 'Laying Foundations',
      description: '',
      highlights: [
        { month: '', title: 'AI Strategy', icon: '🎯', by: 'H+R' },
        { month: '', title: 'Team Ramp-up', icon: '📈', by: 'H' },
        { month: '', title: 'First POCs', icon: '🔬', by: 'R' },
      ],
    },
    {
      id: 'Q2',
      period: 'Apr - Jun',
      color: '#22c55e',
      gradient: 'from-emerald-500 to-teal-500',
      summary: 'Building Momentum',
      description: '',
      highlights: [
        { month: '', title: 'Demos', icon: '🎬', by: 'H' },
        { month: '', title: 'Workshops', icon: '🛠️', by: 'R' },
        { month: '', title: 'Coding', icon: '💻', by: 'H+R' },
      ],
    },
    {
      id: 'Q3',
      period: 'Jul - Sep',
      color: '#3b82f6',
      gradient: 'from-blue-500 to-indigo-500',
      summary: 'Scaling Impact',
      description: '',
      highlights: [
        { month: '', title: 'Conferences', icon: '🎤', by: 'R' },
        { month: '', title: 'Enablement', icon: '🤝', by: 'H' },
        { month: '', title: 'Community', icon: '👥', by: 'H+R' },
      ],
    },
    {
      id: 'Q4',
      period: 'Oct - Dec',
      color: '#a855f7',
      gradient: 'from-purple-500 to-pink-500',
      summary: 'Delivering Value',
      description: '',
      highlights: [
        { month: '', title: 'Go-Lives', icon: '🚀', by: 'H+R' },
        { month: '', title: 'Open Source', icon: '🌐', by: 'R' },
        { month: '', title: 'Docs', icon: '📚', by: 'H' },
      ],
    },
  ],

  // Year-end statistics
  stats: [
    { value: '12', label: 'Talks', icon: '🎤' },
    { value: '8', label: 'Workshops', icon: '🛠️' },
    { value: '15+', label: 'POCs', icon: '🔬' },
    { value: '5', label: 'OSS Projects', icon: '💻' },
  ],
};

