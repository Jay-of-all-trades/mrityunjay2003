import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Quote, Sparkles } from 'lucide-react'
import { profile } from '@/data/profile'
import {
  courses,
  gradeCounts,
  levelBlurb,
  levels,
  meanGradePoint,
} from '@/data/courses'
import { projects } from '@/data/projects'
import { honors, orgs } from '@/data/journey'
import { GradeDistribution, StatTile } from '@/components/Grades'
import { Chip, Eyebrow, SectionHeading } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { img } from '@/lib/img'
import { trackStyle } from '@/data/projects'

export const Route = createFileRoute('/')({
  component: Home,
})

const counts = gradeCounts(courses)
const graded = courses.filter((c) => c.grade)
const topGrades = graded.filter((c) => c.grade === 'S' || c.grade === 'A').length
const mean = meanGradePoint(courses)
const featured = projects.filter((p) => p.featured)

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <ShortVersion />
      <TranscriptSnapshot />
      <FeaturedWork />
      <Podium />
      <Toolkit />
      <Closing />
    </>
  )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="paper-grid relative overflow-hidden border-b border-rule">
      {/* soft warm bloom, top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rounded-full bg-marigold/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[26rem] rounded-full bg-teal/[0.07] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <div className="rise" style={{ animationDelay: '60ms' }}>
            <Eyebrow>
              Portfolio · {profile.rollNumber} · {profile.location}
            </Eyebrow>
          </div>

          <h1
            className="display rise mt-5 text-[clamp(2.9rem,8.4vw,5.4rem)] font-semibold text-ink"
            style={{ animationDelay: '120ms' }}
          >
            Mrityunjay
            <br />
            <span className="relative inline-block">
              Chakraborty
              <svg
                aria-hidden
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-marigold"
              >
                <path
                  d="M2 9C58 3 120 2 176 5c50 3 90 5 142 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="rise mt-9 max-w-xl font-display text-[clamp(1.18rem,2.2vw,1.5rem)] italic leading-snug text-ink-soft"
            style={{ animationDelay: '200ms' }}
          >
            {profile.tagline}
          </p>

          <p
            className="rise mt-5 max-w-xl text-[1.02rem] text-ink-soft"
            style={{ animationDelay: '260ms' }}
          >
            <span className="marker font-medium text-ink">
              Data science undergraduate at IIT Madras
            </span>{' '}
            — backend lead on a civic-services platform, co-founder of the RaSoR
            research society, and founder of a venture chasing proof of humanity.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '320ms' }}
          >
            <Link
              to="/coursework"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.95rem] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Open the transcript
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink hover:bg-paper-raised"
            >
              See the projects
            </Link>
          </div>

          <dl
            className="rise mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-7 sm:grid-cols-4"
            style={{ animationDelay: '380ms' }}
          >
            {[
              ['31', 'courses'],
              [String(topGrades), 'S / A grades'],
              [String(projects.length), 'projects'],
              [String(honors.length), 'invited talks'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="label text-ink-faint">{label}</dt>
                <dd className="display mt-1 text-[1.9rem] font-semibold text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* photo */}
        <div
          className="rise relative mx-auto w-full max-w-[24rem] lg:mx-0"
          style={{ animationDelay: '220ms' }}
        >
          <div
            aria-hidden
            className="absolute -bottom-4 -right-4 h-full w-full rounded-[22px] border border-marigold/45 bg-marigold/[0.09]"
          />
          <div
            aria-hidden
            className="absolute -left-3 -top-3 size-16 rounded-tl-[22px] border-l-2 border-t-2 border-teal/45"
          />
          <figure className="relative overflow-hidden rounded-[22px] border border-rule bg-paper-raised p-2.5 shadow-[6px_8px_0_0_rgba(25,23,19,0.07)]">
            <img
              src={img(profile.photo, { w: 760, q: 78 })}
              width={420}
              height={560}
              alt="Mrityunjay Chakraborty in the Central Hall of Samvidhan Sadan, Parliament House Complex, New Delhi"
              className="aspect-[3/4] w-full rounded-[15px] object-cover"
            />
            <figcaption className="px-1.5 pb-1 pt-3 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ink-faint">
              Samvidhan Sadan · Parliament House Complex · New Delhi
            </figcaption>
          </figure>
          <div className="absolute -bottom-7 left-2 -rotate-[4deg] rounded-full border border-teal/40 bg-teal-wash px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-teal shadow-sm">
            MY Bharat · Parliament speaker
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- ticker */

function Ticker() {
  const items = [...profile.ticker, ...profile.ticker]
  return (
    <div className="ticker-shell overflow-hidden border-b border-rule bg-ink py-3">
      <div className="ticker-track flex w-max items-center gap-8 pr-8">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper/75"
          >
            {item}
            <span aria-hidden className="size-1 rounded-full bg-marigold" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------- short version */

function ShortVersion() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="The short version"
            title={
              <>
                Statistics by
                <br />
                training, systems
                <br />
                by instinct.
              </>
            }
          />
          <div className="sheet mt-9 p-5">
            <Quote size={18} className="text-marigold" />
            <p className="mt-3 font-display text-[1.08rem] italic leading-snug text-ink">
              Find the gap, name it precisely, propose the fix.
            </p>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-ink-faint">
              Debugging, and also policy
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {profile.intro.map((para, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="text-[1.08rem] leading-relaxed text-ink-soft">
                <span className="mr-2 font-mono text-[0.68rem] text-marigold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={280}>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <StatTile
                value={mean ? mean.toFixed(2) : '—'}
                label="Mean grade point"
                hint={`across ${graded.length} graded results`}
                accent="teal"
              />
              <StatTile
                value="2"
                label="Diplomas completed"
                hint="programming + data science"
                accent="plum"
              />
              <StatTile
                value={`${orgs.length}`}
                label="Organisations served"
                hint="founder to volunteer"
                accent="marigold"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------- transcript snapshot */

function TranscriptSnapshot() {
  return (
    <section className="border-y border-rule bg-paper-sunk/50">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-10 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Coursework · snapshot"
            title="Thirty-one entries on the ledger"
            lede="Three levels of the IITM BS programme — foundation, a double diploma, and degree-level specialisation. The full transcript is filterable, searchable and charted."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <Reveal className="sheet p-6">
            <p className="label text-ink-faint">Grade distribution</p>
            <p className="mt-2 text-[0.92rem] text-ink-soft">
              IITM grades run S, A, B, C, D, E — worth 10, 9, 8, 7, 6 and 4
              points.
            </p>
            <GradeDistribution counts={counts} className="mt-6" />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {levels.map((level, i) => {
              const inLevel = courses.filter((c) => c.level === level)
              const levelMean = meanGradePoint(inLevel)
              return (
                <Reveal
                  key={level}
                  delay={i * 90}
                  className="sheet sheet-lift flex flex-col p-5"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-marigold-deep">
                    Level {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="display mt-1.5 text-[1.5rem] font-semibold text-ink">
                    {level}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
                    {levelBlurb[level]}
                  </p>
                  <div className="mt-5 flex items-end justify-between border-t border-rule pt-4">
                    <span className="font-mono text-[0.72rem] text-ink-faint">
                      {inLevel.length} entries
                    </span>
                    <span className="display text-[1.35rem] font-semibold text-teal">
                      {levelMean ? levelMean.toFixed(2) : '—'}
                    </span>
                  </div>
                </Reveal>
              )
            })}
            <Reveal delay={280} className="sm:col-span-3">
              <Link
                to="/coursework"
                className="sheet sheet-lift group flex items-center justify-between gap-4 p-5"
              >
                <span>
                  <span className="display block text-[1.25rem] font-semibold text-ink">
                    Explore every course
                  </span>
                  <span className="mt-1 block text-[0.9rem] text-ink-soft">
                    Filter by level, domain and grade · search by name
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-200 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- featured work */

function FeaturedWork() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-10 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Selected work"
          title="Five that are worth the scroll"
          lede="Civic infrastructure, dealership economics, crime classification and a capstone about how volatility should look."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-6">
        {featured.map((project, i) => {
          // zig-zag: wide, narrow, narrow, wide, wide-full
          const spans = [
            'md:col-span-4',
            'md:col-span-2',
            'md:col-span-3',
            'md:col-span-3',
            'md:col-span-6',
          ]
          return (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 80}
              className={spans[i] ?? 'md:col-span-3'}
            >
              <Link
                to="/projects"
                hash={project.slug}
                className="sheet sheet-lift group flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Chip className={trackStyle[project.track]}>
                    {project.track}
                  </Chip>
                  <span className="font-mono text-[0.66rem] text-ink-faint">
                    {project.period}
                  </span>
                </div>
                <h3 className="display mt-4 text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-2.5 max-w-2xl flex-1 text-[0.97rem] leading-relaxed text-ink-soft">
                  {project.headline}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
                  {project.stack.slice(0, 4).map((s) => (
                    <Chip key={s} tone="ghost">
                      {s}
                    </Chip>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-ink group-hover:text-marigold-deep">
                    Read
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- podium */

function Podium() {
  return (
    <section className="relative overflow-hidden border-y border-rule bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(250,246,238,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,246,238,0.5) 1px, transparent 1px)',
          backgroundSize: '84px 84px',
        }}
      />
      <div className="relative mx-auto max-w-[1240px] px-5 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="label flex items-center gap-2.5 text-marigold">
              <Sparkles size={13} />
              Rooms I have spoken in
            </p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold">
              Parliament House,
              <br />
              a state assembly,
              <br />
              and a post-budget
              <br />
              webinar.
            </h2>
            <figure className="mt-9 overflow-hidden rounded-[18px] border border-paper/15">
              <img
                src={img(profile.wide, { w: 900, q: 72 })}
                width={1040}
                height={585}
                alt="The Central Hall of Samvidhan Sadan, Parliament House Complex, New Delhi"
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          </div>

          <ol className="space-y-4">
            {honors.map((honor, i) => (
              <Reveal
                key={honor.title}
                as="li"
                delay={i * 80}
                className="rounded-[14px] border border-paper/15 bg-paper/[0.04] p-5 transition-colors hover:border-marigold/50 hover:bg-paper/[0.07]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.15em] text-marigold">
                    {honor.when}
                  </span>
                  {honor.where ? (
                    <span className="font-mono text-[0.64rem] text-paper/50">
                      {honor.where}
                    </span>
                  ) : null}
                </div>
                <h3 className="display mt-2 text-[1.2rem] font-semibold leading-tight">
                  {honor.title}
                </h3>
                <p className="mt-1 text-[0.82rem] text-paper/60">{honor.org}</p>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-paper/80">
                  {honor.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- toolkit */

function Toolkit() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-10 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Toolkit"
          title="What I reach for"
          lede="Earned course by course and project by project — not a keyword list."
        />
      </Reveal>
      <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 70} className="sheet p-5">
            <p className="label text-marigold-deep">{group.group}</p>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2 text-[0.95rem] text-ink-soft"
                >
                  <span
                    aria-hidden
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-teal/60"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- closing */

function Closing() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 pb-8 lg:px-10">
      <Reveal className="paper-grid sheet relative overflow-hidden p-8 lg:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-teal/[0.08] blur-3xl"
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Eyebrow>Open to</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.9rem,4.4vw,3rem)] font-semibold text-ink">
              Data science roles, backend work,
              <br className="hidden sm:block" /> and research that has a{' '}
              <span className="marker">real user</span> at the end of it.
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] text-ink-soft">
              If you are hiring, collaborating on research, or want to talk about
              proof of humanity — the message box goes straight to my inbox.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-ink px-6 py-3.5 text-[0.98rem] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-between gap-3 rounded-full border border-ink/25 px-6 py-3.5 text-[0.98rem] font-medium text-ink transition-colors hover:border-ink hover:bg-paper-raised"
            >
              LinkedIn
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
