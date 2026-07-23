export interface Role {
  title: string;
  org: string;
  points: string[];
}

export const roles: Role[] = [
  {
    title: 'Software Development Intern',
    org: 'Oracle',
    points: [
      'Built a Codex-native AI operations agent: an MCP server that exposes approved internal operations to an AI agent through natural language.',
      'Designed a secure, queue-aware backend — allowlisted operations, signed stateless status handles, credential redaction, and owner-scoped polling.',
      'Wrote extensive unit and evaluator tests covering validation, request routing, status-handle signing/expiry, and sensitive-value leakage prevention.',
    ],
  },
  {
    title: 'Software Development Intern',
    org: 'Exalture',
    points: [
      'Debugged and refactored anti-collision software for satellites.',
      'Contributed to the machine-learning component of the satellite project.',
      'Led a seminar on the importance of code efficiency and organization.',
    ],
  },
  {
    title: 'Head of Social Media Outreach',
    org: 'Theruvoram NGO',
    points: [
      'Designed the blog webpage for the non-profit.',
      'Wrote biweekly blog posts and managed social media.',
      'Edited and posted community-awareness videos.',
    ],
  },
];

export const skills: string[] = [
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'React',
  'React Native',
  'Node',
  'MongoDB',
  'MCP / AI Agents',
  'Machine Learning',
  'Data Mining / KDD',
  'Computer Vision',
  'Automation',
  'HTML / CSS',
];

export const coursework: string[] = [
  'Knowledge Discovery in Databases (KDD)',
  'Artificial Intelligence (CSC 480)',
  'Linear Models',
  'Data Structures',
  'Project-Based Object-Oriented Programming & Design',
  'Fundamentals of Computer Science',
];

export const currentlyLearning: string[] = [
  'Reinforcement learning for robot control',
  'Production LLM agent evaluation & safety',
  'Shipping Findr to its first campus beta',
];
