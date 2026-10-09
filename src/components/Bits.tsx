import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/** Small outlined tag used for domains, tracks and stack items. */
export function Chip({
  children,
  className,
  tone = 'neutral',
}: {
  children: ReactNode
  className?: string
  tone?: 'neutral' | 'ghost'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.12em]',
        tone === 'neutral' && 'border-rule-strong bg-paper-sunk text-ink-soft',
        tone === 'ghost' && 'border-rule text-ink-faint',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** The mono eyebrow that sits above nearly every heading on the site. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn('label flex items-center gap-2.5 text-ink-faint', className)}>
      <span aria-hidden className="h-px w-7 bg-rule-strong" />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display mt-3 text-[clamp(1.9rem,4.4vw,3rem)] font-semibold text-ink">
        {title}
      </h2>
      {lede ? <p className="mt-4 text-[1.02rem] text-ink-soft">{lede}</p> : null}
    </div>
  )
}

export function StatTile({
  value,
  label,
  hint,
  accent = 'ink',
}: {
  value: string
  label: string
  hint?: string
  accent?: 'ink' | 'teal' | 'marigold' | 'plum' | 'harbor'
}) {
  const accents = {
    ink: 'text-ink',
    teal: 'text-teal',
    marigold: 'text-marigold-deep',
    plum: 'text-plum',
    harbor: 'text-harbor',
  }
  return (
    <div className="sheet px-4 py-4">
      <p className={cn('display text-[2.1rem] font-semibold', accents[accent])}>
        {value}
      </p>
      <p className="mt-1 text-[0.86rem] font-medium leading-tight text-ink">
        {label}
      </p>
      {hint ? (
        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
