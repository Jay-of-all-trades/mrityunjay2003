export type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E'

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
  /** null while the course is still running. */
  grade: Grade | null
  /** Graded course project / capstone rather than a taught course. */
  isProject?: boolean
  note?: string
}

/** IIT Madras BS grade points. */
export const gradePoints: Record<Grade, number> = {
  S: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  E: 4,
}

export const gradeOrder: Array<Grade> = ['S', 'A', 'B', 'C', 'D', 'E']

export const gradeMeaning: Record<Grade, string> = {
  S: 'Outstanding — 90 and above',
  A: 'Excellent — 80 to 89',
  B: 'Very good — 70 to 79',
  C: 'Good — 60 to 69',
  D: 'Average — 50 to 59',
  E: 'Pass — 40 to 49',
}

/** Chip styling per grade: a warm ordinal ramp, teal at the top, wine at the base. */
export const gradeStyle: Record<Grade, { chip: string; bar: string }> = {
  S: { chip: 'bg-teal text-paper-raised border-teal', bar: 'bg-teal' },
  A: {
    chip: 'bg-teal-soft text-paper-raised border-teal-soft',
    bar: 'bg-teal-soft',
  },
  B: { chip: 'bg-harbor-wash text-harbor border-harbor/35', bar: 'bg-harbor' },
  C: {
    chip: 'bg-marigold-wash text-marigold-deep border-marigold/45',
    bar: 'bg-marigold',
  },
  D: { chip: 'bg-rust-wash text-rust border-rust/35', bar: 'bg-rust' },
  E: { chip: 'bg-wine-wash text-wine border-wine/35', bar: 'bg-wine' },
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
    'Two parallel diplomas — Programming and Data Science — twelve taught courses plus four graded build projects.',
  Degree:
    'Degree-level specialisation: software engineering and testing, deep learning, AI search, and visualisation design under IDC IIT Bombay.',
}

export const courses: Array<Course> = [
  // ---------- Foundation ----------
  { name: 'Programming in Python', level: 'Foundation', domain: 'Programming', grade: 'B' },
  { name: 'Computational Thinking', level: 'Foundation', domain: 'Programming', grade: 'C' },
  { name: 'Statistics for Data Science I', level: 'Foundation', domain: 'Data Science', grade: 'B' },
  { name: 'Statistics for Data Science II', level: 'Foundation', domain: 'Data Science', grade: 'C' },
  { name: 'Mathematics for Data Science I', level: 'Foundation', domain: 'Mathematics', grade: 'C' },
  { name: 'Mathematics for Data Science II', level: 'Foundation', domain: 'Mathematics', grade: 'B' },
  { name: 'English I', level: 'Foundation', domain: 'Communication', grade: 'S' },
  { name: 'English II', level: 'Foundation', domain: 'Communication', grade: 'B' },

  // ---------- Diploma ----------
  { name: 'Programming Concepts using Java', level: 'Diploma', domain: 'Programming', grade: 'S' },
  { name: 'System Commands', level: 'Diploma', domain: 'Programming', grade: 'B' },
  { name: 'Database Management Systems', level: 'Diploma', domain: 'Programming', grade: 'C' },
  {
    name: 'Programming, Data Structures and Algorithms using Python',
    level: 'Diploma',
    domain: 'Programming',
    grade: 'C',
  },
  { name: 'Modern Application Development I', level: 'Diploma', domain: 'Programming', grade: 'C' },
  { name: 'Modern Application Development II', level: 'Diploma', domain: 'Programming', grade: 'C' },
  { name: 'Machine Learning Practice', level: 'Diploma', domain: 'Data Science', grade: 'A' },
  { name: 'Machine Learning Foundations', level: 'Diploma', domain: 'Data Science', grade: 'C' },
  { name: 'Machine Learning Techniques', level: 'Diploma', domain: 'Data Science', grade: 'D' },
  { name: 'Business Analytics', level: 'Diploma', domain: 'Data Science', grade: 'A' },
  { name: 'Business Data Management', level: 'Diploma', domain: 'Data Science', grade: 'B' },
  { name: 'Tools in Data Science', level: 'Diploma', domain: 'Data Science', grade: 'C' },

  // ---------- Diploma graded projects ----------
  {
    name: 'Modern Application Development I — Project',
    level: 'Diploma',
    domain: 'Programming',
    grade: 'S',
    isProject: true,
    note: 'Flask + Jinja application built and defended end to end.',
  },
  {
    name: 'Modern Application Development II — Project',
    level: 'Diploma',
    domain: 'Programming',
    grade: 'A',
    isProject: true,
    note: 'Full-stack SPA with a REST backend and async jobs.',
  },
  {
    name: 'Machine Learning Practice — Project',
    level: 'Diploma',
    domain: 'Data Science',
    grade: 'S',
    isProject: true,
    note: 'Crime-category prediction on LAPD open data.',
  },
  {
    name: 'Business Data Management — Project',
    level: 'Diploma',
    domain: 'Data Science',
    grade: 'A',
    isProject: true,
    note: 'Dealership sales and inventory study for a live business.',
  },

  // ---------- Degree ----------
  { name: 'Software Engineering', level: 'Degree', domain: 'Programming', grade: 'A' },
  { name: 'Software Testing', level: 'Degree', domain: 'Programming', grade: 'B' },
  { name: 'Deep Learning', level: 'Degree', domain: 'Data Science', grade: 'B' },
  { name: 'Data Visualization Design', level: 'Degree', domain: 'Data Science', grade: 'C' },
  {
    name: 'AI: Search Methods for Problem Solving',
    level: 'Degree',
    domain: 'Data Science',
    grade: 'E',
  },
  {
    name: 'Strategies for Professional Growth',
    level: 'Degree',
    domain: 'Professional',
    grade: 'A',
  },
  {
    name: 'Data Visualization Design — Capstone Project',
    level: 'Degree',
    domain: 'Data Science',
    grade: null,
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

export function gradeCounts(list: Array<Course>): Record<Grade, number> {
  const counts = { S: 0, A: 0, B: 0, C: 0, D: 0, E: 0 }
  for (const c of list) if (c.grade) counts[c.grade] += 1
  return counts
}

/** Unweighted mean of grade points — every IITM course here carries 4 credits. */
export function meanGradePoint(list: Array<Course>): number | null {
  const graded = list.filter((c) => c.grade)
  if (graded.length === 0) return null
  const total = graded.reduce((sum, c) => sum + gradePoints[c.grade as Grade], 0)
  return total / graded.length
}
