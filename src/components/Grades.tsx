import { cn } from '@/lib/utils'
import {
  gradeMeaning,
  gradeOrder,
  gradePoints,
  gradeStyle,
  type Grade,
} from '@/data/courses'

export function GradeChip({
  grade,
  size = 'md',
  className,
}: {
  grade: Grade | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  if (!grade) {
    return (
      <span
        className={cn(
          'inline-grid place-items-center rounded-lg border border-dashed border-rule-strong font-mono text-ink-faint',
          size === 'sm' && 'size-6 text-[0.62rem]',
          size === 'md' && 'size-8 text-[0.7rem]',
          size === 'lg' && 'size-11 text-[0.8rem]',
          className,
        )}
        title="In progress"
      >
        ··
      </span>
    )
  }

  return (
    <span
      title={gradeMeaning[grade]}
      className={cn(
        'inline-grid place-items-center rounded-lg border font-display font-semibold',
        gradeStyle[grade].chip,
        size === 'sm' && 'size-6 text-[0.74rem]',
        size === 'md' && 'size-8 text-[0.95rem]',
        size === 'lg' && 'size-11 text-[1.3rem]',
        className,
      )}
    >
      {grade}
    </span>
  )
}

/**
 * Horizontal grade distribution. Bars are labelled in place, so there is no
 * legend to cross-reference, and each row is readable as a sentence by a
 * screen reader.
 */
export function GradeDistribution({
  counts,
  className,
  compact = false,
}: {
  counts: Record<Grade, number>
  className?: string
  compact?: boolean
}) {
  const max = Math.max(1, ...gradeOrder.map((g) => counts[g]))
  const total = gradeOrder.reduce((sum, g) => sum + counts[g], 0)

  return (
    <div className={cn('space-y-2', className)}>
      {gradeOrder.map((grade, i) => {
        const value = counts[grade]
        const pct = (value / max) * 100
        return (
          <div
            key={grade}
            className="grid grid-cols-[2rem_1fr_2.5rem] items-center gap-3"
          >
            <GradeChip grade={grade} size="sm" className="justify-self-start" />
            <div
              className="relative h-6 overflow-hidden rounded-[5px] bg-paper-sunk"
              role="img"
              aria-label={`${value} of ${total} grades at ${grade} (${gradePoints[grade]} points)`}
            >
              <div
                className={cn(
                  'h-full origin-left rounded-[5px] transition-[width] duration-500',
                  gradeStyle[grade].bar,
                  value === 0 && 'opacity-0',
                )}
                style={{
                  width: `${pct}%`,
                  animation: `rise 520ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                }}
              />
            </div>
            <span className="font-mono text-[0.78rem] text-ink-soft">
              {value}
              {!compact && (
                <span className="text-ink-faint">
                  {' '}
                  / {total}
                </span>
              )}
            </span>
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
