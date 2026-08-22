import { Users, Package, Globe, Award } from 'lucide-react'
import ss2Img from '../assets/imgs/ss2.png'

const stats = [
  { icon: Users, value: '10k+', label: 'Happy Customers' },
  { icon: Package, value: '500+', label: 'Products' },
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Award, value: '5+', label: 'Years of Experience' },
]

function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">About Us</h1>
          <p className="max-w-md text-sm text-neutral-500">
            SB Atelier started with a simple idea: make quality fashion accessible to everyone,
            everywhere.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:items-center lg:px-10">
          <div className="flex gap-4 lg:w-1/2">
            <div className="flex aspect-[3/4] flex-1 overflow-hidden">
              <img src={ss2Img} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex aspect-[3/4] flex-1 overflow-hidden">
              <img src={ss2Img} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Our Story
            </span>
            <h2 className="text-2xl font-bold text-slate-900">We love what we do</h2>
            <p className="text-sm text-neutral-500">
              What started as a small local shop has grown into a brand trusted by thousands of
              customers around the world, all while staying true to our values of quality,
              honesty, and great design.
            </p>
            <p className="text-sm text-neutral-500">
              Every piece we sell is chosen with care, because we believe good style shouldn't
              come at the cost of good service.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-8">
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:flex-row lg:justify-center lg:gap-16 lg:px-10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon size={28} className="text-sky-500" />
              <span className="text-xl font-bold text-slate-900">{value}</span>
              <span className="text-sm text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
