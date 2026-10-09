import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import {
  projectTracks,
  projects,
  trackStyle,
  type Project,
  type ProjectTrack,
} from '@/data/projects'
import { Chip, Eyebrow } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects')({
  component: Projects,
  head: () => ({
    meta: [
      { title: 'Projects — Mrityunjay Chakraborty' },
      {
        name: 'description',
        content:
          'Ten projects: a civic-services platform, dealership analytics, LAPD crime classification, BERT bias mitigation, credit risk, and a BSE volatility capstone.',
      },
    ],
  }),
})

function Projects() {
  const [track, setTrack] = useState<ProjectTrack | 'All'>('All')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects
      .filter((p) => {
        if (track !== 'All' && p.track !== track) return false
        if (!q) return true
        return `${p.title} ${p.headline} ${p.stack.join(' ')} ${p.org ?? ''}`
          .toLowerCase()
          .includes(q)
      })
      .sort((a, b) => b.since.localeCompare(a.since))
  }, [track, query])

  const tallies = projectTracks.map((t) => ({
    track: t,
    count: projects.filter((p) => p.track === t).length,
  }))

  return (
    <div>
      <section className="paper-grid border-b border-rule">
        <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-10 lg:py-20">
          <Eyebrow>Projects · 2023 to now</Eyebrow>
          <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] font-semibold text-ink">
            Ten things I built,
            <br />
            broke, and fixed.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.06rem] leading-relaxed text-ink-soft">
            Coursework projects that went further than the rubric asked, plus
            analytics work for a real dealership, a fairness audit of BERT, and a
            capstone about drawing volatility properly. Open any card for the
            full account.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTrack('All')}
              aria-pressed={track === 'All'}
              className={cn(
                'rounded-full border px-4 py-2 text-[0.88rem] font-medium transition-colors',
                track === 'All'
                  ? 'border-ink bg-ink text-paper'
                  : 'border-ink/25 bg-paper text-ink-soft hover:border-ink hover:text-ink',
              )}
            >
              All{' '}
              <span className="font-mono text-[0.7rem] opacity-70">
                {projects.length}
              </span>
            </button>
            {tallies.map(({ track: t, count }) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrack(t)}
                aria-pressed={track === t}
                className={cn(
                  'rounded-full border px-4 py-2 text-[0.88rem] font-medium transition-colors',
                  track === t
                    ? trackStyle[t]
                    : 'border-rule-strong bg-paper text-ink-soft hover:border-ink hover:text-ink',
                )}
              >
                {t}{' '}
                <span className="font-mono text-[0.7rem] opacity-70">
                  {count}
                </span>
              </button>
            ))}

            <div className="relative ml-auto w-full sm:w-64">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                aria-label="Search projects"
                className="w-full rounded-full border border-rule bg-paper py-2 pl-9 pr-3 text-[0.92rem] text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 lg:px-10 lg:py-20">
        {visible.length === 0 ? (
          <div className="sheet px-6 py-16 text-center">
            <p className="display text-[1.5rem] font-semibold text-ink">
              No project matches “{query}”
            </p>
            <p className="mt-2 text-[0.95rem] text-ink-soft">
              Try a technology name — pandas, Flask, BERT — or clear the search.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setTrack('All')
              }}
              className="mt-6 rounded-full bg-ink px-5 py-2.5 text-[0.92rem] font-medium text-paper"
            >
              Show all ten
            </button>
          </div>
        ) : (
          <ol className="space-y-5">
            {visible.map((project, i) => (
              <Reveal key={project.slug} as="li" delay={(i % 4) * 70}>
                <ProjectCard project={project} n={i + 1} />
              </Reveal>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

function ProjectCard({ project, n }: { project: Project; n: number }) {
  const [open, setOpen] = useState(false)
  const panelId = `panel-${project.slug}`

  return (
    <article
      id={project.slug}
      className="sheet sheet-lift scroll-mt-28 overflow-hidden"
    >
      <div className="grid gap-5 p-6 sm:grid-cols-[3.2rem_1fr] sm:gap-6 lg:p-8">
        <div className="flex items-start gap-3 sm:flex-col sm:items-stretch">
          <span className="display grid size-12 shrink-0 place-items-center rounded-[12px] border border-rule bg-paper-sunk text-[1.15rem] font-semibold text-ink-faint">
            {String(n).padStart(2, '0')}
          </span>
          {project.ongoing ? (
            <span
              className="mt-1 hidden justify-center sm:flex"
              title="Still running"
            >
              <span className="size-2 animate-pulse rounded-full bg-marigold" />
            </span>
          ) : null}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Chip className={trackStyle[project.track]}>{project.track}</Chip>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
              {project.period}
            </span>
            {project.ongoing ? (
              <span className="rounded-full border border-marigold/45 bg-marigold-wash px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-marigold-deep">
                Ongoing
              </span>
            ) : null}
          </div>

          <h2 className="display mt-3 text-[clamp(1.5rem,3vw,2.15rem)] font-semibold text-ink">
            {project.title}
          </h2>

          {project.org ? (
            <p className="mt-1.5 text-[0.88rem] text-ink-faint">{project.org}</p>
          ) : null}

          <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-ink-soft">
            {project.headline}
          </p>

          <div
            id={panelId}
            hidden={!open}
            className="mt-5 border-l-2 border-marigold/45 pl-5"
          >
            <ul className="space-y-3">
              {project.detail.map((line, i) => (
                <li
                  key={i}
                  className="text-[0.98rem] leading-relaxed text-ink-soft"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
            {project.stack.map((s) => (
              <Chip key={s} tone="ghost">
                {s}
              </Chip>
            ))}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink hover:bg-paper-sunk"
            >
              {open ? 'Close' : 'Details'}
              <ChevronDown
                size={13}
                className={cn(
                  'transition-transform duration-300',
                  open && 'rotate-180',
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
