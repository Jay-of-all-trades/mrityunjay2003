import { domainBar, domains, type Domain } from '@/data/courses'
import { cn } from '@/lib/utils'

/**
 * Horizontal breakdown of entries per domain. Bars are labelled in place, so
 * there is no legend to cross-reference, and each row reads as a sentence to a
 * screen reader.
 */
export function DomainDistribution({
  counts,
  className,
}: {
  counts: Record<Domain, number>
  className?: string
}) {
  const max = Math.max(1, ...domains.map((d) => counts[d]))
  const total = domains.reduce((sum, d) => sum + counts[d], 0)

  return (
    <div className={cn('space-y-2.5', className)}>
      {domains.map((domain, i) => {
        const value = counts[domain]
        const pct = (value / max) * 100
        return (
          <div
            key={domain}
            className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-3"
          >
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-soft">
              {domain}
            </span>
            <div
              className="relative h-6 overflow-hidden rounded-[5px] bg-paper-sunk"
              role="img"
              aria-label={`${value} of ${total} entries in ${domain}`}
            >
              <div
                className={cn(
                  'h-full origin-left rounded-[5px] transition-[width] duration-500',
                  domainBar[domain],
                  value === 0 && 'opacity-0',
                )}
                style={{
                  width: `${pct}%`,
                  animation: `rise 520ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                }}
              />
            </div>
            <span className="font-mono text-[0.78rem] text-ink-soft">{value}</span>
          </div>
        )
      })}
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
