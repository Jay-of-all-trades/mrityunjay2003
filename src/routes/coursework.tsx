import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { RotateCcw, Search, SlidersHorizontal, FolderGit2 } from 'lucide-react'
import {
  courses,
  domainStyle,
  domains,
  levelBlurb,
  levels,
  type Course,
  type Domain,
  type Level,
} from '@/data/courses'
import { Chip, Eyebrow } from '@/components/Bits'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/coursework')({
  component: Coursework,
  head: () => ({
    meta: [
      { title: 'Coursework — Mrityunjay Chakraborty' },
      {
        name: 'description',
        content:
          'Interactive coursework explorer: 31 courses and build projects across the foundation, diploma and degree levels of the IIT Madras BS in Data Science.',
      },
    ],
  }),
})

type SortKey = 'name' | 'level'

const sortLabels: Record<SortKey, string> = {
  level: 'Programme order',
  name: 'Name, A to Z',
}

const levelRank: Record<Level, number> = {
  Foundation: 0,
  Diploma: 1,
  Degree: 2,
}

function Coursework() {
  const [level, setLevel] = useState<Level | 'All'>('All')
  const [activeDomains, setActiveDomains] = useState<Array<Domain>>([])
  const [projectsOnly, setProjectsOnly] = useState(false)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('level')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = courses.filter((c) => {
      if (level !== 'All' && c.level !== level) return false
      if (activeDomains.length && !activeDomains.includes(c.domain)) return false
      if (projectsOnly && !c.isProject) return false
      if (q && !`${c.name} ${c.domain} ${c.note ?? ''}`.toLowerCase().includes(q))
        return false
      return true
    })

    return list.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      return (
        levelRank[a.level] - levelRank[b.level] ||
        Number(a.isProject ?? false) - Number(b.isProject ?? false) ||
        a.name.localeCompare(b.name)
      )
    })
  }, [level, activeDomains, projectsOnly, query, sort])

  const projectCount = filtered.filter((c) => c.isProject).length
  const dirty =
    level !== 'All' ||
    activeDomains.length > 0 ||
    projectsOnly ||
    query.trim() !== ''

  const reset = () => {
    setLevel('All')
    setActiveDomains([])
    setProjectsOnly(false)
    setQuery('')
    setSort('level')
  }

  const toggleDomain = (d: Domain) =>
    setActiveDomains((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    )

  const grouped = useMemo(() => {
    if (sort !== 'level') return null
    return levels
      .map((l) => ({ level: l, items: filtered.filter((c) => c.level === l) }))
      .filter((g) => g.items.length > 0)
  }, [filtered, sort])

  return (
    <div className="paper-grid border-b border-rule">
      <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <Eyebrow>Coursework · interactive explorer</Eyebrow>
          <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold text-ink">
            Every course,
            <br />
            in one place.
          </h1>
          <p className="mt-6 text-[1.06rem] leading-relaxed text-ink-soft">
            Thirty-one entries from the IIT Madras BS in Data Science and
            Applications — taught courses and build projects, across the
            foundation level, a double diploma, and degree-level
            specialisation. Filter it, search it, sort it. The summary below
            recomputes from whatever you are looking at.
          </p>
        </header>

        {/* --------------------------------------------------- controls */}
        <section
          aria-label="Filters"
          className="sheet mt-12 overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-rule px-5 py-4">
            <span className="label flex items-center gap-2 text-ink-faint">
              <SlidersHorizontal size={13} />
              Filter
            </span>

            <div className="relative ml-auto w-full sm:w-72">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                aria-label="Search courses"
                className="w-full rounded-full border border-rule bg-paper py-2 pl-9 pr-3 text-[0.92rem] text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-2 text-[0.88rem] text-ink-soft">
              <span className="label text-ink-faint">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-rule bg-paper px-3 py-2 text-[0.88rem] text-ink focus:border-teal focus:outline-none"
              >
                {(Object.keys(sortLabels) as Array<SortKey>).map((k) => (
                  <option key={k} value={k}>
                    {sortLabels[k]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 px-5 py-5 lg:grid-cols-3">
            <FilterRow label="Level">
              <Toggle
                active={level === 'All'}
                onClick={() => setLevel('All')}
                className="border-ink/25 data-[on=true]:bg-ink data-[on=true]:text-paper"
              >
                All
              </Toggle>
              {levels.map((l) => (
                <Toggle
                  key={l}
                  active={level === l}
                  onClick={() => setLevel(l)}
                  className="border-ink/25 data-[on=true]:bg-ink data-[on=true]:text-paper"
                >
                  {l}
                </Toggle>
              ))}
            </FilterRow>

            <FilterRow label="Domain">
              {domains.map((d) => (
                <Toggle
                  key={d}
                  active={activeDomains.includes(d)}
                  onClick={() => toggleDomain(d)}
                  className={cn(
                    'border-rule-strong',
                    activeDomains.includes(d) && domainStyle[d],
                  )}
                >
                  {d}
                </Toggle>
              ))}
            </FilterRow>

            <FilterRow label="Type">
              <Toggle
                active={projectsOnly}
                onClick={() => setProjectsOnly((v) => !v)}
                className={cn(
                  'border-rule-strong',
                  projectsOnly && 'border-plum/40 bg-plum-wash text-plum',
                )}
              >
                <FolderGit2 size={12} className="mr-1.5" />
                Projects only
              </Toggle>
            </FilterRow>
          </div>

          {dirty ? (
            <div className="flex items-center justify-between gap-4 border-t border-rule bg-paper-sunk/60 px-5 py-3">
              <p className="font-mono text-[0.72rem] text-ink-soft">
                Showing {filtered.length} of {courses.length} entries
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-paper-raised px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
          ) : null}
        </section>

        {/* ----------------------------------------------------- summary */}
        <section className="sheet mt-6 p-5">
          <p className="label text-ink-faint">Selection</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Metric value={String(filtered.length)} label="entries" />
            <Metric
              value={String(filtered.length - projectCount)}
              label="taught courses"
              accent="text-teal"
            />
            <Metric
              value={String(projectCount)}
              label="build projects"
              accent="text-plum"
            />
            <Metric
              value={String(new Set(filtered.map((c) => c.domain)).size)}
              label="domains"
              accent="text-marigold-deep"
            />
          </div>
        </section>

        {/* -------------------------------------------------- course list */}
        <section className="mt-12">
          {filtered.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : grouped ? (
            <div className="space-y-12">
              {grouped.map((group) => (
                <div key={group.level}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink/80 pb-3">
                    <h2 className="display text-[1.8rem] font-semibold text-ink">
                      {group.level} level
                    </h2>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.13em] text-ink-faint">
                      {group.items.length} entries
                    </p>
                  </div>
                  <p className="mt-3 max-w-2xl text-[0.94rem] text-ink-soft">
                    {levelBlurb[group.level]}
                  </p>
                  <ul className="mt-5 divide-y divide-rule">
                    {group.items.map((c) => (
                      <CourseRow key={c.name} course={c} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-rule border-t-2 border-ink/80">
              {filtered.map((c) => (
                <CourseRow key={c.name} course={c} showLevel />
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------- fragments */

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="label mb-2.5 text-ink-faint">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Toggle({
  active,
  onClick,
  children,
  className,
  title,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      data-on={active}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1.5 text-[0.82rem] font-medium text-ink-soft transition-all duration-200',
        'hover:border-ink/45 hover:text-ink',
        active && 'text-ink shadow-[0_1px_0_0_rgba(25,23,19,0.08)]',
        !active && 'bg-paper',
        className,
      )}
    >
      {children}
    </button>
  )
}

function Metric({
  value,
  label,
  accent = 'text-ink',
}: {
  value: string
  label: string
  accent?: string
}) {
  return (
    <div>
      <p className={cn('display text-[1.85rem] font-semibold', accent)}>
        {value}
      </p>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
        {label}
      </p>
    </div>
  )
}

function CourseRow({
  course,
  showLevel = false,
}: {
  course: Course
  showLevel?: boolean
}) {
  return (
    <li className="group flex items-start gap-4 py-3.5 transition-colors hover:bg-paper-raised/70">
      <span
        aria-hidden
        className={cn(
          'mt-2 size-2 shrink-0 rounded-full',
          course.isProject ? 'bg-plum' : 'bg-teal',
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-[1rem] font-medium leading-snug text-ink">
            {course.name}
          </span>
          {course.isProject ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-plum/30 bg-plum-wash px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-plum">
              <FolderGit2 size={9} />
              Project
            </span>
          ) : null}
          {course.inProgress ? (
            <span className="rounded-full border border-dashed border-marigold/50 bg-marigold-wash px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-marigold-deep">
              In progress
            </span>
          ) : null}
        </p>
        {course.note ? (
          <p className="mt-1 text-[0.88rem] leading-snug text-ink-faint">
            {course.note}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <Chip className={domainStyle[course.domain]}>{course.domain}</Chip>
        {showLevel ? (
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
            {course.level}
          </span>
        ) : null}
      </div>
    </li>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="sheet flex flex-col items-center px-6 py-16 text-center">
      <svg
        aria-hidden
        viewBox="0 0 120 80"
        className="h-20 w-32 text-rule-strong"
      >
        <rect
          x="14"
          y="10"
          width="92"
          height="60"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {[24, 36, 48, 60].map((y) => (
          <line
            key={y}
            x1="26"
            y1={y}
            x2={y === 60 ? 68 : 94}
            y2={y}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 7"
          />
        ))}
      </svg>
      <p className="display mt-6 text-[1.5rem] font-semibold text-ink">
        Nothing matches that combination
      </p>
      <p className="mt-2 max-w-sm text-[0.95rem] text-ink-soft">
        Try widening the level or domain filters — or clear everything and start
        again.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.92rem] font-medium text-paper"
      >
        <RotateCcw size={14} />
        Clear filters
      </button>
    </div>
  )
}
