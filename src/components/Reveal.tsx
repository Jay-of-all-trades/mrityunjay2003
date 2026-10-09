import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Scroll-triggered reveal. Renders visible-by-default markup on the server and
 * only opts into the hidden state once JS is running, so no-JS readers see
 * everything.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    setArmed(true)
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn(armed && 'reveal', className)}
      data-shown={shown ? 'true' : 'false'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
