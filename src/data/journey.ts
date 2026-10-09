export type Role = {
  title: string
  period: string
  duration?: string
  location?: string
  bullets: Array<string>
}

export type Org = {
  slug: string
  name: string
  span?: string
  kind: 'Venture' | 'Society' | 'Student government' | 'Internship' | 'Volunteering' | 'School'
  roles: Array<Role>
}

/** Newest first — this is the reading order on the page. */
export const orgs: Array<Org> = [
  {
    slug: 'proof-of-humanity',
    name: 'Stealth venture — Proof of Humanity',
    span: 'Mar 2025 – present · 1 yr 7 mos',
    kind: 'Venture',
    roles: [
      {
        title: 'Founder',
        period: 'Mar 2025 – present',
        duration: '1 yr 7 mos',
        location: 'Remote',
        bullets: [
          'Started with a problem — proof of humanity — and am building a startup to solve it. Still solving it.',
          'Pre-incubated at Nirmaan, IIT Madras.',
        ],
      },
    ],
  },
  {
    slug: 'rasor',
    name: 'RaSoR — Ramanujan Society of Research',
    span: 'Feb 2022 – present · 4 yrs 8 mos',
    kind: 'Society',
    roles: [
      {
        title: 'Co-Founder',
        period: 'Feb 2022 – present',
        duration: '4 yrs 8 mos',
        bullets: [
          'With my associate Ketan Chandra, started a small club to connect people with a serious interest in research and to promote research interest in the community.',
          'Later, with the help of the IITM BS team, scaled it up into a society — the official research society of the IITM BS programme.',
        ],
      },
      {
        title: 'Board Member',
        period: 'Jan 2023 – Feb 2024',
        duration: '1 yr 2 mos',
        bullets: [
          'Established a system of management for efficient operations.',
          'Initiated collaboration with research organisations and companies for research opportunities.',
          'Started programmes to guide rookies in the field of research — being a rookie myself, it was a learning journey that shaped not only mine but the research careers of everyone connected to the RaSoR family.',
        ],
      },
    ],
  },
  {
    slug: 'iitm-bs',
    name: 'IIT Madras BS in Data Science Programme',
    span: 'Jan 2022 – Aug 2023 · 1 yr 8 mos',
    kind: 'Student government',
    roles: [
      {
        title: 'Secretary, Saranda House',
        period: 'Mar 2023 – Aug 2023',
        duration: '6 mos',
        bullets: [
          'Took over the house in a critical situation and established a proper system of administration.',
          'Defined communication channels with a structure that let students of differing mindsets and goals enjoy and benefit from a dynamic, diverse community.',
          'Significantly improved the public relations and digital presence of the house with a team of talented, hard-working people.',
          'Organised administrative tasks into separate teams and recruited more volunteers, cutting excessive workload on the house council.',
          'Started the All Stars initiative — anyone could bring a creative idea to improve student engagement and skills, take up a leadership role and run their own venture. It was built to create new leaders and thinkers.',
          'Formed a base and defined a structure the house administration still follows today.',
        ],
      },
      {
        title: 'Deputy Secretary, Saranda House',
        period: 'Sep 2022 – Mar 2023',
        duration: '7 mos',
        bullets: [
          'Established a system of separate teams to tackle challenges specific to each domain.',
          'Scaled up house-level clubs to widen their reach.',
          'Supported students in finding opportunities and made sure everyone’s needs were catered to.',
        ],
      },
      {
        title: 'Events Head, Research and Academia Club',
        period: 'Jan 2022 – Sep 2022',
        duration: '9 mos',
        bullets: [
          'With my colleague Mr. Ketan Chandra, started a club for like-minded people in our house to promote and discover research.',
        ],
      },
    ],
  },
  {
    slug: 'techlearn',
    name: 'TechLearn.live',
    span: 'Feb 2022 – Apr 2022 · 3 mos',
    kind: 'Internship',
    roles: [
      {
        title: 'Intern',
        period: 'Feb 2022 – Apr 2022',
        duration: '3 mos',
        bullets: [],
      },
    ],
  },
  {
    slug: 'unicef',
    name: 'UNICEF India',
    span: 'Apr 2021 – Apr 2022 · 1 yr 1 mo',
    kind: 'Volunteering',
    roles: [
      {
        title: 'Volunteer',
        period: 'Apr 2021 – Apr 2022',
        duration: '1 yr 1 mo',
        bullets: [],
      },
    ],
  },
  {
    slug: 'st-clares',
    name: "St. Clare's Convent Senior Secondary School",
    span: 'Apr 2017 – Apr 2018 · 1 yr 1 mo',
    kind: 'School',
    roles: [
      {
        title: 'Assistant Head Boy',
        period: 'Apr 2017 – Apr 2018',
        duration: '1 yr 1 mo',
        bullets: [],
      },
      {
        title: 'Student Representative',
        period: 'Apr 2017 – Apr 2018',
        duration: '1 yr 1 mo',
        bullets: [],
      },
      {
        title: 'Student Editor',
        period: 'Apr 2017 – Jan 2018',
        duration: '10 mos',
        bullets: [],
      },
    ],
  },
]

export type Honor = {
  title: string
  body: string
  org: string
  when: string
  where?: string
  bullets?: Array<string>
}

export const honors: Array<Honor> = [
  {
    title: 'Intervenor / Panelist — Post-Budget Webinar on Divyangjan Kaushal Yojana',
    org: 'Ministry of Social Justice & Empowerment, Government of India',
    when: 'Mar 2026',
    body: 'Selected as one of two MY Bharat volunteers from across India to intervene at the Post-Budget Webinar on Divyangjan Kaushal Yojana — addressed by the Hon’ble Prime Minister and attended by the Union Minister for Social Justice and Empowerment.',
    bullets: [
      'Flagged three implementation gaps and proposed three policy ideas for employment-linked skilling of Persons with Disabilities.',
      'Presented before senior IAS officers, Ministry Secretaries and industry leaders.',
    ],
  },
  {
    title: 'Representative / Parliament Speaker',
    org: 'Mera Yuva Bharat — MY Bharat',
    when: 'Dec 2025',
    where: 'Delhi, India',
    body: 'Participated in paying homage to Shree Atal Bihari Vajpayee and Shree Pandit Madan Mohan Malaviya on their birth anniversaries, in the Central Hall of Samvidhan Sadan, Parliament House Complex, New Delhi.',
  },
  {
    title: 'Youth Parliament Speaker',
    org: 'Viksit Bharat 2047',
    when: 'Mar 2025',
    where: 'Assam, India',
    body: 'Had the honour of speaking at the State Legislative Assembly of Assam on the occasion of the Youth Parliament.',
  },
  {
    title: 'Summer School Student — Responsible AI',
    org: 'ACM, Association for Computing Machinery',
    when: 'Jun 2024',
    where: 'Chennai, Tamil Nadu, India',
    body: 'Selected for the ACM Summer School on Responsible AI, organised at the Indian Institute of Technology Madras.',
  },
]
