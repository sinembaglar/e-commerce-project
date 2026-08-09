import { useState } from 'react'
import { FacebookIcon, InstagramIcon, TwitterIcon } from '../components/icons/FeatherIcons'

const footerColumns = [
  { title: 'Company Info', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  { title: 'Legal', links: ['About Us', 'Carrier', 'We are hiring', 'Blog'] },
  {
    title: 'Features',
    links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'],
  },
  { title: 'Resources', links: ['iOS & Android', 'Watch a Demo', 'Customers', 'API'] },
]

function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-slate-50">
      <div className="container mx-auto flex flex-col gap-10 px-4 py-10 lg:px-10">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <span className="text-2xl font-bold text-slate-900">Bandage</span>
          <div className="flex items-center gap-4 text-sky-500">
            <FacebookIcon size={20} />
            <InstagramIcon size={20} />
            <TwitterIcon size={20} />
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-sm font-bold text-slate-900">{column.title}</span>
              {column.links.map((link) => (
                <span key={link} className="text-sm text-neutral-500">
                  {link}
                </span>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-slate-900">Get In Touch</span>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-40 border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900"
              />
              <button type="button" className="bg-sky-500 px-4 py-2 text-sm font-bold text-white">
                Subscribe
              </button>
            </div>
            <p className="max-w-[200px] text-xs text-neutral-500">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-neutral-200 px-4 py-6">
        <span className="text-xs text-neutral-500">
          Made With Love By Finland All Right Reserved
        </span>
      </div>
    </footer>
  )
}

export default Footer
