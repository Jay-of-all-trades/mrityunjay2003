import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Menu, X, Linkedin } from 'lucide-react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/', index: '01', label: 'Home' },
  { to: '/coursework', index: '02', label: 'Coursework' },
  { to: '/projects', index: '03', label: 'Projects' },
  { to: '/journey', index: '04', label: 'Journey' },
  { to: '/contact', index: '05', label: 'Contact' },
] as const

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-5 py-3 lg:px-10">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label={`${profile.name} — home`}
        >
          <span className="grid size-10 place-items-center rounded-[11px] bg-ink font-display text-[0.95rem] font-semibold text-paper transition-transform duration-300 group-hover:-rotate-6">
            {profile.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[1.02rem] font-semibold text-ink">
              {profile.shortName} Chakraborty
            </span>
            <span className="label block text-[0.6rem] text-ink-faint">
              {profile.rollNumber} · IITM BS
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group relative rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors',
                  active
                    ? 'text-ink'
                    : 'text-ink-soft hover:text-ink',
                )}
              >
                <span className="mr-1.5 font-mono text-[0.64rem] text-ink-faint">
                  {item.index}
                </span>
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-marigold transition-transform duration-300',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="grid size-9 place-items-center rounded-full border border-rule text-ink-soft transition-colors hover:border-harbor hover:bg-harbor-wash hover:text-harbor"
          >
            <Linkedin size={15} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid size-9 place-items-center rounded-full border border-rule text-ink md:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-rule bg-paper-raised px-5 pb-4 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-baseline gap-3 border-b border-rule/70 py-3 text-[1.05rem] text-ink last:border-0"
            >
              <span className="font-mono text-[0.68rem] text-ink-faint">
                {item.index}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper-sunk/60">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-12 sm:grid-cols-2 lg:px-10">
        <div>
          <p className="display text-[1.6rem] font-semibold text-ink">
            {profile.name}
          </p>
          <p className="mt-2 max-w-sm text-[0.95rem] text-ink-soft">
            {profile.programme}, {profile.institute}. Based in{' '}
            {profile.location}.
          </p>
        </div>
        <div className="sm:justify-self-end">
          <p className="label text-ink-faint">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="ink-link text-ink-soft hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link to="/contact" className="ink-link text-ink-soft hover:text-ink">
                Send a message
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule px-5 py-5 lg:px-10">
        <p className="mx-auto max-w-[1240px] font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
          Set in Fraunces, Karla and IBM Plex Mono · Built with TanStack Start on
          Netlify
        </p>
      </div>
    </footer>
  )
}
