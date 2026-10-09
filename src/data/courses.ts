export type Level = 'Foundation' | 'Diploma' | 'Degree'

export type Domain =
  | 'Programming'
  | 'Data Science'
  | 'Mathematics'
  | 'Communication'
  | 'Professional'

export type Course = {
  name: string
  level: Level
  domain: Domain
  /** Course project / capstone rather than a taught course. */
  isProject?: boolean
  /** Still running this term. */
  inProgress?: boolean
  note?: string
}

export const domainStyle: Record<Domain, string> = {
  Programming: 'bg-plum-wash text-plum border-plum/30',
  'Data Science': 'bg-teal-wash text-teal border-teal/30',
  Mathematics: 'bg-harbor-wash text-harbor border-harbor/30',
  Communication: 'bg-marigold-wash text-marigold-deep border-marigold/35',
  Professional: 'bg-rust-wash text-rust border-rust/30',
}

export const levelBlurb: Record<Level, string> = {
  Foundation:
    'Eight gateway courses: Python, statistics, mathematics and the English pair. The grounding everything after it leans on.',
  Diploma:
    'Two parallel diplomas — Programming and Data Science — twelve taught courses plus four build projects.',
  Degree:
    'Degree-level specialisation: software engineering and testing, deep learning, AI search, and visualisation design under IDC IIT Bombay.',
}

export const courses: Array<Course> = [
  // ---------- Foundation ----------
  { name: 'Programming in Python', level: 'Foundation', domain: 'Programming' },
  { name: 'Computational Thinking', level: 'Foundation', domain: 'Programming' },
  { name: 'Statistics for Data Science I', level: 'Foundation', domain: 'Data Science' },
  { name: 'Statistics for Data Science II', level: 'Foundation', domain: 'Data Science' },
  { name: 'Mathematics for Data Science I', level: 'Foundation', domain: 'Mathematics' },
  { name: 'Mathematics for Data Science II', level: 'Foundation', domain: 'Mathematics' },
  { name: 'English I', level: 'Foundation', domain: 'Communication' },
  { name: 'English II', level: 'Foundation', domain: 'Communication' },

  // ---------- Diploma ----------
  { name: 'Programming Concepts using Java', level: 'Diploma', domain: 'Programming' },
  { name: 'System Commands', level: 'Diploma', domain: 'Programming' },
  { name: 'Database Management Systems', level: 'Diploma', domain: 'Programming' },
  {
    name: 'Programming, Data Structures and Algorithms using Python',
    level: 'Diploma',
    domain: 'Programming',
  },
  { name: 'Modern Application Development I', level: 'Diploma', domain: 'Programming' },
  { name: 'Modern Application Development II', level: 'Diploma', domain: 'Programming' },
  { name: 'Machine Learning Practice', level: 'Diploma', domain: 'Data Science' },
  { name: 'Machine Learning Foundations', level: 'Diploma', domain: 'Data Science' },
  { name: 'Machine Learning Techniques', level: 'Diploma', domain: 'Data Science' },
  { name: 'Business Analytics', level: 'Diploma', domain: 'Data Science' },
  { name: 'Business Data Management', level: 'Diploma', domain: 'Data Science' },
  { name: 'Tools in Data Science', level: 'Diploma', domain: 'Data Science' },

  // ---------- Diploma projects ----------
  {
    name: 'Modern Application Development I — Project',
    level: 'Diploma',
    domain: 'Programming',
    isProject: true,
    note: 'Flask + Jinja application built and defended end to end.',
  },
  {
    name: 'Modern Application Development II — Project',
    level: 'Diploma',
    domain: 'Programming',
    isProject: true,
    note: 'Full-stack SPA with a REST backend and async jobs.',
  },
  {
    name: 'Machine Learning Practice — Project',
    level: 'Diploma',
    domain: 'Data Science',
    isProject: true,
    note: 'Crime-category prediction on LAPD open data.',
  },
  {
    name: 'Business Data Management — Project',
    level: 'Diploma',
    domain: 'Data Science',
    isProject: true,
    note: 'Dealership sales and inventory study for a live business.',
  },

  // ---------- Degree ----------
  { name: 'Software Engineering', level: 'Degree', domain: 'Programming' },
  { name: 'Software Testing', level: 'Degree', domain: 'Programming' },
  { name: 'Deep Learning', level: 'Degree', domain: 'Data Science' },
  { name: 'Data Visualization Design', level: 'Degree', domain: 'Data Science' },
  {
    name: 'AI: Search Methods for Problem Solving',
    level: 'Degree',
    domain: 'Data Science',
  },
  {
    name: 'Strategies for Professional Growth',
    level: 'Degree',
    domain: 'Professional',
  },
  {
    name: 'Data Visualization Design — Capstone Project',
    level: 'Degree',
    domain: 'Data Science',
    inProgress: true,
    isProject: true,
    note: 'Volatility on the Bombay Stock Exchange, under Prof. Venkatesh, IDC IIT Bombay.',
  },
]

export const levels: Array<Level> = ['Foundation', 'Diploma', 'Degree']

export const domains: Array<Domain> = [
  'Programming',
  'Data Science',
  'Mathematics',
  'Communication',
  'Professional',
]
