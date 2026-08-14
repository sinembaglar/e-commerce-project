import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
  Heart,
  ShoppingCart,
  Eye,
} from 'lucide-react'
import ss2Img from '../assets/imgs/ss2.png'

const galleryImages = [ss2Img, ss2Img]

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  black: 'bg-slate-900',
}

const colors = ['blue', 'green', 'orange', 'black']

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'additional', label: 'Additional Information' },
  { id: 'reviews', label: 'Reviews (0)' },
]

function ProductDetailPage() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  const showPrev = () =>
    setActiveImage((i) => (i === 0 ? galleryImages.length - 1 : i - 1))
  const showNext = () =>
    setActiveImage((i) => (i === galleryImages.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:px-10">
          <div className="flex flex-col gap-3 lg:w-1/2">
            <div className="relative flex aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <img
                src={galleryImages[activeImage]}
                alt="Ürün görseli"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={showPrev}
                aria-label="Önceki görsel"
                className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 text-slate-900 shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Sonraki görsel"
                className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 text-slate-900 shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-3">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`flex h-16 w-16 overflow-hidden border-2 ${
                    index === activeImage ? 'border-sky-500' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:w-1/2">
            <h1 className="text-xl font-bold text-slate-900">Floating Phone</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star size={16} className="fill-amber-400" />
                <Star size={16} className="fill-amber-400" />
                <Star size={16} className="fill-amber-400" />
                <Star size={16} className="fill-amber-400" />
                <StarHalf size={16} className="fill-amber-400" />
              </div>
              <span className="text-sm text-neutral-500">10 Reviews</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">$1,139.33</span>
            <span className="text-sm text-neutral-500">
              Availability : <span className="font-bold text-sky-500">In Stock</span>
            </span>
            <p className="text-sm text-neutral-500">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT
              official consequent door ENIM RELIT Mollie. Excitation venial consequent sent
              nostrum met.
            </p>

            <div className="flex items-center gap-3 border-t border-neutral-200 pt-4">
              {colors.map((color) => (
                <span key={color} className={`h-5 w-5 rounded-full ${colorClasses[color]}`} />
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="bg-sky-500 px-8 py-3 text-sm font-bold text-white"
              >
                Select Options
              </button>
              <button
                type="button"
                aria-label="Favorilere ekle"
                className="flex items-center justify-center border border-neutral-300 p-3"
              >
                <Heart size={18} className="text-neutral-500" />
              </button>
              <button
                type="button"
                aria-label="Sepete ekle"
                className="flex items-center justify-center border border-neutral-300 p-3"
              >
                <ShoppingCart size={18} className="text-neutral-500" />
              </button>
              <button
                type="button"
                aria-label="Hızlı görüntüle"
                className="flex items-center justify-center border border-neutral-300 p-3"
              >
                <Eye size={18} className="text-neutral-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-8">
        <div className="container mx-auto flex flex-col gap-6 px-4 lg:px-10">
          <div className="flex flex-wrap justify-center gap-6 border-b border-neutral-200 pb-4 lg:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-bold ${
                  activeTab === tab.id ? 'text-sky-500' : 'text-neutral-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-neutral-500 lg:text-left">
            {activeTab === 'description' &&
              'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.'}
            {activeTab === 'additional' && `Ürün ID: ${id} için ek bilgiler burada listelenecek.`}
            {activeTab === 'reviews' && 'Henüz yorum yapılmamış.'}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
