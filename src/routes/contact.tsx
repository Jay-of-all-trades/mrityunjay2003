import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  AlertCircle,
  Check,
  Linkedin,
  Loader2,
  MapPin,
  Send,
} from 'lucide-react'
import { profile } from '@/data/profile'
import { Eyebrow } from '@/components/Bits'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/contact')({
  component: Contact,
  head: () => ({
    meta: [
      { title: 'Contact — Mrityunjay Chakraborty' },
      {
        name: 'description',
        content:
          'Get in touch with Mrityunjay Chakraborty about data science roles, backend work, research collaboration or proof of humanity.',
      },
    ],
  }),
})

const reasons = [
  'A role or internship',
  'Research collaboration',
  'Proof of humanity / the venture',
  'Speaking or panel invitation',
  'Something else',
] as const

type Fields = {
  name: string
  email: string
  organisation: string
  reason: string
  message: string
}

const empty: Fields = {
  name: '',
  email: '',
  organisation: '',
  reason: reasons[0],
  message: '',
}

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle',
  )

  const update =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'A name helps me reply properly.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = 'That does not look like a reachable email address.'
    if (fields.message.trim().length < 12)
      next.message = 'Give me a sentence or two to work with.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setFields(empty)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className="paper-grid min-h-[70vh] border-b border-rule">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="display mt-4 text-[clamp(2.3rem,5.5vw,3.6rem)] font-semibold text-ink">
            Say something
            <br />
            specific.
          </h1>
          <p className="mt-6 text-[1.04rem] leading-relaxed text-ink-soft">
            I read everything. Concrete beats generic — tell me the problem, the
            team, or the paper, and I will come back with something useful rather
            than a thank-you note.
          </p>

          <ul className="mt-10 space-y-3">
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="sheet sheet-lift flex items-center gap-4 p-4"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-harbor-wash text-harbor">
                  <Linkedin size={16} />
                </span>
                <span>
                  <span className="block text-[0.96rem] font-medium text-ink">
                    LinkedIn
                  </span>
                  <span className="block font-mono text-[0.66rem] text-ink-faint">
                    mrityunjay-chakraborty-477380229
                  </span>
                </span>
              </a>
            </li>
            <li className="sheet flex items-center gap-4 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-marigold-wash text-marigold-deep">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-[0.96rem] font-medium text-ink">
                  {profile.location}
                </span>
                <span className="block font-mono text-[0.66rem] text-ink-faint">
                  Remote-friendly · IST
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div className="sheet p-6 lg:p-9">
          {status === 'sent' ? (
            <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-teal text-paper">
                <Check size={26} />
              </span>
              <p className="display mt-6 text-[1.8rem] font-semibold text-ink">
                That reached me.
              </p>
              <p className="mt-3 max-w-sm text-[0.98rem] text-ink-soft">
                Thank you for writing. I answer in the order things arrive,
                usually within a few days.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 rounded-full border border-ink/25 px-5 py-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:border-ink hover:bg-paper-sunk"
              >
                Write another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Do not fill this in
                  <input name="bot-field" />
                </label>
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Your name"
                  id="name"
                  value={fields.name}
                  onChange={update('name')}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  value={fields.email}
                  onChange={update('email')}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              <Field
                label="Organisation"
                id="organisation"
                optional
                value={fields.organisation}
                onChange={update('organisation')}
                autoComplete="organization"
              />

              <div>
                <label htmlFor="reason" className="label block text-ink-faint">
                  What is this about
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={fields.reason}
                  onChange={update('reason')}
                  className="mt-2 w-full rounded-[10px] border border-rule bg-paper px-3.5 py-2.5 text-[0.97rem] text-ink focus:border-teal focus:outline-none"
                >
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="label block text-ink-faint">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={fields.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  className={cn(
                    'mt-2 w-full resize-y rounded-[10px] border bg-paper px-3.5 py-2.5 text-[0.97rem] text-ink placeholder:text-ink-faint focus:outline-none',
                    errors.message
                      ? 'border-rust focus:border-rust'
                      : 'border-rule focus:border-teal',
                  )}
                  placeholder="The problem, the team, the paper…"
                />
                {errors.message ? <FieldError>{errors.message}</FieldError> : null}
              </div>

              {status === 'failed' ? (
                <p className="flex items-start gap-2.5 rounded-[10px] border border-rust/35 bg-rust-wash px-4 py-3 text-[0.92rem] text-rust">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  That did not go through. Netlify Forms only accept submissions
                  from a deployed site — if you are running this locally, try the
                  live version, or reach me on LinkedIn.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.98rem] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </>
                )}
              </button>

              <p className="font-mono text-[0.66rem] uppercase tracking-[0.11em] text-ink-faint">
                Delivered by Netlify Forms · no tracking, no list
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = 'text',
  optional = false,
  autoComplete,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  optional?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="label block text-ink-faint">
        {label}
        {optional ? (
          <span className="ml-1.5 normal-case tracking-normal opacity-70">
            (optional)
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          'mt-2 w-full rounded-[10px] border bg-paper px-3.5 py-2.5 text-[0.97rem] text-ink placeholder:text-ink-faint focus:outline-none',
          error ? 'border-rust focus:border-rust' : 'border-rule focus:border-teal',
        )}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  )
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] text-rust">
      <AlertCircle size={13} />
      {children}
    </p>
  )
}
