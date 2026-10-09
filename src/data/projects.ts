export type ProjectTrack = 'Data Science' | 'Software' | 'Research'

export type Project = {
  slug: string
  title: string
  period: string
  /** Sort key — ISO-ish start date. */
  since: string
  org?: string
  track: ProjectTrack
  headline: string
  detail: Array<string>
  stack: Array<string>
  ongoing?: boolean
  featured?: boolean
}

export const projects: Array<Project> = [
  {
    slug: 'civiscense',
    title: 'Civiscense',
    period: 'May 2026 – Sep 2026',
    since: '2026-05',
    org: 'Indian Institute of Technology, Madras',
    track: 'Software',
    headline:
      'Smart civic services and maintenance platform, built by a student team on Agile/SCRUM.',
    detail: [
      'Built collaboratively with a team of students following Agile/SCRUM and user-story-driven development, from backlog grooming through sprint review.',
      'Led backend development and the background job architecture — core APIs, business logic, data management and asynchronous task processing.',
      'Translated user stories into working backend features across iterative sprints and integrated them with the rest of the application.',
    ],
    stack: ['Python', 'REST APIs', 'Background jobs', 'Agile/SCRUM'],
    featured: true,
  },
  {
    slug: 'bse-volatility',
    title: 'Volatility on the Bombay Stock Exchange',
    period: 'Apr 2024 – present',
    since: '2024-04',
    org: 'Capstone · Data Visualization Design, IDC IIT Bombay',
    track: 'Data Science',
    headline:
      'Capstone visualisation study of BSE volatility, under Prof. Venkatesh of IDC IIT Bombay.',
    detail: [
      'Capstone project for the Data Visualization Design course, taught by Prof. Venkatesh from IDC, IIT Bombay.',
      'Treats volatility on the Bombay Stock Exchange as a design problem: what encodings let a reader feel risk moving through time rather than merely read a number.',
    ],
    stack: ['Python', 'Visualisation design', 'Financial time series'],
    ongoing: true,
    featured: true,
  },
  {
    slug: 'parking-full-stack',
    title: 'Parking Management System — Full Stack',
    period: 'Jul 2025',
    since: '2025-07-15',
    org: 'Indian Institute of Technology, Madras',
    track: 'Software',
    headline:
      'Full-stack parking platform with real-time booking, lot control and role-based dashboards.',
    detail: [
      'A full-stack web application that streamlines parking spot booking and management for both end users and administrators.',
      'Supports real-time booking, lot and spot control, background data exports, and separate role-based dashboards.',
    ],
    stack: ['Vue', 'Flask', 'REST APIs', 'Celery', 'SQLite'],
    featured: true,
  },
  {
    slug: 'parking-flask-jinja',
    title: 'Parking Management System',
    period: 'Jul 2025',
    since: '2025-07-01',
    org: 'Indian Institute of Technology, Madras',
    track: 'Software',
    headline:
      'Server-rendered Flask + Jinja take on the same problem — booking, lots, exports, dashboards.',
    detail: [
      'A Flask + Jinja web application to streamline parking spot booking and management.',
      'Built for end users and administrators alike, with real-time booking, lot and spot control, background data exports and role-based dashboards.',
    ],
    stack: ['Flask', 'Jinja', 'SQLAlchemy', 'Background jobs'],
  },
  {
    slug: 'vehicle-sales-analysis',
    title: 'Vehicle Sales and Inventory Analysis',
    period: 'Jan 2025 – Jul 2025',
    since: '2025-01',
    org: 'Indian Institute of Technology, Madras',
    track: 'Data Science',
    headline:
      'Enhancing business decisions with data at a Tata Motors dealership in Guwahati, Assam.',
    detail: [
      'Examined the operational challenges of Veerprabhu Auto Pvt. Ltd., a Tata Motors dealership under the Cosmopolitan Auto Group, located in Guwahati, Assam.',
      'The dealership serves both B2B and B2C customers, with the majority of revenue driven by small-scale transporters and farmers in the outskirts of Guwahati and lower Assam.',
      'The inferences have had substantial positive effects on the dealership.',
    ],
    stack: ['Python', 'pandas', 'Business analytics', 'Inventory modelling'],
    featured: true,
  },
  {
    slug: 'lapd-crime-categories',
    title: 'Prediction of Crime Categories on LAPD Data',
    period: 'Jul 2024 – Aug 2024',
    since: '2024-07',
    org: 'Indian Institute of Technology, Madras',
    track: 'Data Science',
    headline:
      'Capstone for the machine learning course: detailed EDA, feature engineering, competing classifiers.',
    detail: [
      'A project with detailed exploratory data analysis, feature engineering and a range of data analytics techniques.',
      'Built and compared multiple classification models. This was the capstone project for the machine learning course.',
    ],
    stack: ['scikit-learn', 'pandas', 'Feature engineering', 'Classification'],
    featured: true,
  },
  {
    slug: 'bert-bias-mitigation',
    title: 'Bias Mitigation in BERT Models',
    period: 'Jun 2024',
    since: '2024-06',
    org: 'ACM, Association for Computing Machinery',
    track: 'Research',
    headline:
      'Studied bias in BERT when predicting economic status from a person’s name.',
    detail: [
      'Studied the bias present in BERT models on prediction of economic status based on names.',
      'Carried out alongside the ACM Summer School on Responsible AI at IIT Madras.',
    ],
    stack: ['BERT', 'PyTorch', 'Fairness metrics', 'Responsible AI'],
  },
  {
    slug: 'ab-testing-student-performance',
    title: 'A/B Testing on Student Performance',
    period: 'Jan 2024 – Apr 2024',
    since: '2024-01',
    track: 'Data Science',
    headline:
      'Designed and read out a controlled experiment on what actually moves student outcomes.',
    detail: [
      'An experiment-design study: hypothesis framing, assignment, power considerations and read-out on student performance data.',
    ],
    stack: ['Hypothesis testing', 'Experiment design', 'Python'],
  },
  {
    slug: 'credit-risk-analysis',
    title: 'Credit Risk Analysis',
    period: 'Oct 2023 – Dec 2023',
    since: '2023-10',
    track: 'Data Science',
    headline: 'Scoring and segmenting borrower risk from historical lending data.',
    detail: [
      'Risk modelling on lending data — cleaning, feature construction, and comparison of scoring approaches.',
    ],
    stack: ['Python', 'Risk modelling', 'Classification'],
  },
  {
    slug: 'customer-segmentation',
    title: 'Customer Segmentation Analysis',
    period: 'Apr 2023 – Jul 2023',
    since: '2023-04',
    track: 'Data Science',
    headline: 'Customer segmentation analysis on legal company data.',
    detail: [
      'Clustering and profiling of clients in legal company data to surface distinct, actionable customer segments.',
    ],
    stack: ['Clustering', 'pandas', 'Profiling'],
  },
]

export const projectTracks: Array<ProjectTrack> = [
  'Data Science',
  'Software',
  'Research',
]

export const trackStyle: Record<ProjectTrack, string> = {
  'Data Science': 'bg-teal-wash text-teal border-teal/30',
  Software: 'bg-plum-wash text-plum border-plum/30',
  Research: 'bg-marigold-wash text-marigold-deep border-marigold/40',
}
