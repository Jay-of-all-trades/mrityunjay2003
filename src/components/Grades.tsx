import { cn } from '@/lib/utils'
import {
  gradeMeaning,
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
