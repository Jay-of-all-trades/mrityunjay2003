/**
 * Build a Netlify Image CDN URL so pages never ship the full-resolution
 * original. See https://docs.netlify.com/image-cdn/overview/
 */
export function img(
  src: string,
  opts: { w: number; h?: number; fit?: 'cover' | 'contain'; q?: number } = { w: 800 },
) {
  const params = new URLSearchParams({ url: src, w: String(opts.w), fm: 'webp' })
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  if (opts.q) params.set('q', String(opts.q))
  return `/.netlify/images?${params.toString()}`
}
