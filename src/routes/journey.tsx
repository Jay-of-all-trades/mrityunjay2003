import { createFileRoute } from '@tanstack/react-router'
import { MicVocal } from 'lucide-react'
import { honors, orgs, type Org } from '@/data/journey'
import { Chip, Eyebrow, SectionHeading } from '@/components/Bits'
import { Reveal } from '@/components/Reveal'
import { profile } from '@/data/profile'
import { img } from '@/lib/img'

export const Route = createFileRoute('/journey')({
  component: Journey,
  head: () => ({
    meta: [
      { title: 'Journey — Mrityunjay Chakraborty' },
      {
        name: 'description',
        content:
          'Roles and rooms: founder of a proof-of-humanity venture, co-founder of RaSoR, Secretary of Saranda House, MY Bharat parliament speaker, UNICEF India volunteer.',
      },
    ],
  }),
})

const kindTone: Record<Org['kind'], string> = {
  Venture: 'bg-rust-wash text-rust border-rust/30',
  Society: 'bg-teal-wash text-teal border-teal/30',
  'Student government': 'bg-plum-wash text-plum border-plum/30',
  Internship: 'bg-harbor-wash text-harbor border-harbor/30',
  Volunteering: 'bg-marigold-wash text-marigold-deep border-marigold/40',
  School: 'bg-paper-sunk text-ink-faint border-rule-strong',
}

function Journey() {
  const totalRoles = orgs.reduce((sum, o) => sum + o.roles.length, 0)

  return (
    <div>
      <section className="paper-grid border-b border-rule">
        <div className="mx-auto grid max-w-[1240px] items-end gap-10 px-5 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-20">
          <div>
            <Eyebrow>Journey · 2017 to now</Eyebrow>
            <h1 className="display mt-4 text-[clamp(2.4rem,6vw,4rem)] font-semibold text-ink">
              Built clubs before
              <br />
              I built products.
            </h1>
            <p className="mt-6 max-w-2xl text-[1.06rem] leading-relaxed text-ink-soft">
              {totalRoles} roles across {orgs.length} organisations — a research
              society that started as a two-person club and became official, a
              student house handed over mid-crisis, a venture still chasing its
              first clean answer, and a run of rooms where the microphone was on.
            </p>
          </div>
          <figure className="overflow-hidden rounded-[18px] border border-rule bg-paper-raised p-2">
            <img
              src={img(profile.avatar, { w: 520, q: 80 })}
              width={480}
              height={480}
              alt="Mrityunjay Chakraborty"
              className="aspect-square w-full rounded-[12px] object-cover"
            />
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------- experience */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-10 lg:py-24">
        <SectionHeading
          eyebrow="Roles"
          title="Where the time went"
          lede="Newest first. Sub-roles sit under the organisation they belong to."
        />

        <ol className="mt-14 space-y-14">
          {orgs.map((org, i) => (
            <Reveal key={org.slug} as="li" delay={(i % 3) * 70}>
              <div className="grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-10">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <Chip className={kindTone[org.kind]}>{org.kind}</Chip>
                  <h3 className="display mt-3 text-[1.5rem] font-semibold leading-tight text-ink">
                    {org.name}
                  </h3>
                  {org.span ? (
                    <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
                      {org.span}
                    </p>
                  ) : null}
                </div>

                <ol className="relative space-y-6 border-l border-rule pl-7">
                  {org.roles.map((role) => (
                    <li key={role.title} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[2.06rem] top-2 size-3 rounded-full border-2 border-paper bg-marigold"
                      />
                      <div className="sheet p-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h4 className="text-[1.08rem] font-semibold text-ink">
                            {role.title}
                          </h4>
                          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-faint">
                            {role.period}
                            {role.duration ? ` · ${role.duration}` : ''}
                            {role.location ? ` · ${role.location}` : ''}
                          </p>
                        </div>
                        {role.bullets.length > 0 ? (
                          <ul className="mt-4 space-y-2.5">
                            {role.bullets.map((b, bi) => (
                              <li
                                key={bi}
                                className="flex gap-3 text-[0.96rem] leading-relaxed text-ink-soft"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-teal/55"
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* -------------------------------------------------------- honors */}
      <section className="border-t border-rule bg-paper-sunk/50">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-10 lg:py-24">
          <SectionHeading
            eyebrow="Honours & speaking"
            title="Four rooms, one argument"
            lede="Policy for employment-linked skilling, homage in the Central Hall, a state assembly, and responsible AI at IIT Madras."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {honors.map((honor, i) => (
              <Reveal
                key={honor.title}
                delay={(i % 2) * 90}
                className="sheet sheet-lift flex flex-col p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-9 place-items-center rounded-full bg-marigold-wash text-marigold-deep">
                    <MicVocal size={15} />
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-ink-faint">
                    {honor.when}
                    {honor.where ? ` · ${honor.where}` : ''}
                  </span>
                </div>
                <h3 className="display mt-4 text-[1.3rem] font-semibold leading-tight text-ink">
                  {honor.title}
                </h3>
                <p className="mt-1.5 text-[0.85rem] text-ink-faint">
                  {honor.org}
                </p>
                <p className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">
                  {honor.body}
                </p>
                {honor.bullets ? (
                  <ul className="mt-4 space-y-2 border-t border-rule pt-4">
                    {honor.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-[0.93rem] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-marigold/70"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
