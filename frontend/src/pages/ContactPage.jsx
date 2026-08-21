import { useState } from 'react'
import { MapPin, Phone, Clock } from 'lucide-react'

const infoCards = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['236 5th SE Avenue, New York NY10000, United States'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: ['Mobile: +(84) 546-6789', 'Hotline: +(84) 456-6789'],
  },
  {
    icon: Clock,
    title: 'Working Time',
    lines: ['Monday-Friday: 9:00 - 22:00', 'Saturday-Sunday: 9:00 - 21:00'],
  },
]

const initialForm = { name: '', email: '', subject: '', message: '' }

function ContactPage() {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialForm)
  }

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Get In Touch With Us</h1>
          <p className="max-w-md text-sm text-neutral-500">
            For more information about our products &amp; services, please feel free to drop
            us an email. Our staff always be there to help you out. Do not hesitate!
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto flex flex-col gap-4 px-4 lg:flex-row lg:px-10">
          {infoCards.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="flex flex-1 flex-col items-center gap-3 border border-neutral-200 px-6 py-8 text-center"
            >
              <Icon size={24} className="text-sky-500" />
              <span className="text-base font-bold text-slate-900">{title}</span>
              {lines.map((line) => (
                <span key={line} className="text-sm text-neutral-500">
                  {line}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 py-8">
        <div className="container mx-auto px-4 lg:px-10">
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="flex-1 border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="flex-1 border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900"
              />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="flex-1 border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={6}
              required
              className="border border-neutral-300 bg-white px-4 py-3 text-sm text-slate-900"
            />
            <button
              type="submit"
              className="self-center bg-sky-500 px-10 py-3 text-sm font-bold text-white"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
