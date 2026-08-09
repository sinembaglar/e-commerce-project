import {
  Bookmark,
  List,
  TrendingUp,
  Star,
  Users,
  Clock,
  BookOpen,
  ArrowRight,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import Slider from '../components/Slider'
import sliderImg from '../assets/imgs/slider.png'
import ss2Img from '../assets/imgs/ss2.png'

const brands = ['hooli', 'Lyft', 'stripe', 'aws', 'reddit']

const heroSlides = [
  {
    label: 'Summer 2020',
    title: 'New Collection',
    description: 'We know how large objects will act, but things on a small scale.',
    image: sliderImg,
  },
  {
    label: 'Winter 2020',
    title: 'Best Sellers',
    description: 'Discover the pieces everyone is talking about this season.',
    image: sliderImg,
  },
  {
    label: 'Spring 2021',
    title: 'New Arrivals',
    description: 'Fresh styles just landed, be the first to shop them.',
    image: sliderImg,
  },
]

function HeroSlide({ label, title, description, image }) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-[20px] bg-gradient-to-r from-[#96E9FB] to-[#ABECD6] px-4 py-10 text-center lg:flex-row lg:justify-between lg:px-10 lg:py-20 lg:text-left">
      <div className="flex flex-col items-center gap-4 lg:items-start">
        <span className="text-base font-bold text-sky-600">{label}</span>
        <h1 className="text-3xl font-bold text-slate-900 lg:text-[58px] lg:leading-[1.2]">
          {title}
        </h1>
        <p className="max-w-sm text-sm text-neutral-500 lg:text-xl">{description}</p>
        <button
          type="button"
          className="rounded-full bg-sky-500 px-8 py-3 text-sm font-bold uppercase text-white shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-600"
        >
          Shop Now
        </button>
      </div>

      <div className="flex w-full max-w-xs items-center justify-center lg:max-w-md">
        <img src={image} alt={title} className="w-full object-contain" />
      </div>
    </div>
  )
}

const product = {
  name: 'Graphic Design',
  category: 'English Department',
  originalPrice: '$16.48',
  salePrice: '$6.48',
  colors: ['blue', 'green', 'orange', 'black'],
}

const products = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, ...product }))

const services = [
  {
    id: 1,
    icon: Bookmark,
    title: 'Easy Wins',
    description: 'Get your best looking smile now!',
  },
  {
    id: 2,
    icon: List,
    title: 'Concrete',
    description: 'Defalcate is most focused in helping you discover your most beautiful smile',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Hack Growth',
    description: 'Overcome any hurdle or any other problem.',
  },
]

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  black: 'bg-slate-900',
}

const posts = [
  {
    id: 1,
    category: 'English Department',
    title: 'Graphic Design',
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    rating: '4.9',
    sales: 15,
    originalPrice: '$16.48',
    salePrice: '$6.48',
    colors: ['blue', 'green', 'orange', 'black'],
    duration: '22h : 55m',
    lessons: '84 Lessons',
  },
  {
    id: 2,
    category: 'English Department',
    title: 'Graphic Design',
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    rating: '4.9',
    sales: 15,
    originalPrice: '$16.48',
    salePrice: '$6.48',
    colors: ['blue', 'green', 'orange', 'black'],
    duration: '22h : 55m',
    lessons: '84 Lessons',
  },
]

function PromoTile({ big = false }) {
  return (
    <div
      className={`relative flex overflow-hidden ${
        big ? 'min-h-[220px] lg:flex-1' : 'min-h-[100px] flex-1'
      }`}
    >
      <img src={ss2Img} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={`absolute bottom-4 left-4 flex flex-col items-start gap-2 bg-[#2D8BC0]/75 text-white ${
          big ? 'p-4' : 'p-3'
        }`}
      >
        <span className={big ? 'text-sm font-semibold' : 'text-xs font-semibold'}>
          Top Product Of the week
        </span>
        <button
          type="button"
          className={`border border-white font-bold uppercase ${
            big ? 'px-4 py-2 text-xs' : 'px-3 py-1.5 text-[10px]'
          }`}
        >
          Explore Items
        </button>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="py-6 lg:py-10">
        <div className="container mx-auto px-4 lg:px-10">
          <Slider slides={heroSlides.map((slide) => <HeroSlide key={slide.title} {...slide} />)} />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 px-4 lg:gap-12 lg:px-10">
          {brands.map((brand) => (
            <span key={brand} className="text-sm font-bold text-neutral-500">
              {brand}
            </span>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-4 px-4 lg:flex-row lg:px-10">
          <PromoTile big />
          <div className="flex flex-col gap-4 lg:flex-1">
            <PromoTile />
            <PromoTile />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:px-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Featured Products
            </span>
            <h2 className="text-xl font-bold uppercase text-slate-900">
              Bestseller Products
            </h2>
            <p className="text-sm text-neutral-500">
              Problems trying to resolve the conflict between
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex basis-[calc(50%-8px)] lg:basis-[calc(20%-13px)]"
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mx-auto rounded border border-sky-500 px-8 py-3 text-sm font-bold uppercase text-sky-500"
          >
            Load More Products
          </button>
        </div>
      </section>

      <section className="py-8">
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
              Featured Products
            </span>
            <h2 className="text-2xl font-bold text-slate-900">We love what we do</h2>
            <p className="text-sm text-neutral-500">
              Problems trying to resolve the conflict between the two major realms of
              Classical physics: Newtonian mechanics
            </p>
            <p className="text-sm text-neutral-500">
              Problems trying to resolve the conflict between the two major realms of
              Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container mx-auto flex flex-col gap-8 px-4 lg:px-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Featured Products
            </span>
            <h2 className="text-xl font-bold uppercase text-slate-900">
              The Best Services
            </h2>
            <p className="text-sm text-neutral-500">
              Problems trying to resolve the conflict between
            </p>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-center lg:gap-16">
            {services.map(({ id, icon: Icon, title, description }) => (
              <div key={id} className="flex flex-col items-center gap-2 text-center lg:max-w-[220px]">
                <Icon size={32} className="text-sky-500" />
                <span className="text-sm font-bold text-slate-900">{title}</span>
                <span className="text-xs text-neutral-500">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:px-10">
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Practice Advice
            </span>
            <h2 className="text-xl font-bold text-slate-900">Featured Posts</h2>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col gap-2 lg:basis-1/3">
              <div className="relative flex aspect-[4/3] w-full overflow-hidden">
                <img src={ss2Img} alt="" className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                  Sale
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">{post.category}</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-900">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  {post.rating}
                </span>
              </div>
              <span className="text-base font-bold text-slate-900">{post.title}</span>
              <p className="text-sm text-neutral-500">{post.description}</p>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Users size={12} />
                {post.sales} Sales
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 line-through">
                  {post.originalPrice}
                </span>
                <span className="text-sm font-bold text-teal-700">{post.salePrice}</span>
              </div>
              <div className="flex items-center gap-2">
                {post.colors.map((color) => (
                  <span key={color} className={`h-3 w-3 rounded-full ${colorClasses[color]}`} />
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {post.lessons}
                </span>
              </div>
              <button
                type="button"
                className="mt-1 flex items-center gap-1 text-xs font-bold text-sky-500"
              >
                Learn More
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
