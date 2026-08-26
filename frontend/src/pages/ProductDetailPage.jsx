import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Loader2,
} from 'lucide-react'
import { fetchProduct } from '../redux/actions/productActions'

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'additional', label: 'Additional Information' },
  { id: 'reviews', label: 'Reviews' },
]

function ProductDetailPage() {
  const { productId, id } = useParams()
  const targetId = productId || id
  const dispatch = useDispatch()
  const history = useHistory()
  const product = useSelector((state) => state.product.product)
  const fetchState = useSelector((state) => state.product.fetchState)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    dispatch(fetchProduct(targetId))
  }, [dispatch, targetId])

  if (fetchState === 'FETCHING' || !product) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 size={32} className="animate-spin text-sky-500" />
      </div>
    )
  }

  const images = product.images || []

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-8 px-4 lg:flex-row lg:px-10">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="flex items-center gap-1 self-start text-sm font-bold text-neutral-500 hover:text-sky-500 lg:hidden"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="flex flex-col gap-3 lg:w-1/2">
            <div className="relative flex aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <img
                src={images[activeImage]?.url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))
                    }
                    aria-label="Önceki görsel"
                    className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 text-slate-900 shadow"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))
                    }
                    aria-label="Sonraki görsel"
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/80 p-1.5 text-slate-900 shadow"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`flex h-16 w-16 overflow-hidden border-2 ${
                      index === activeImage ? 'border-sky-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 lg:w-1/2">
            <button
              type="button"
              onClick={() => history.goBack()}
              className="hidden items-center gap-1 self-start text-sm font-bold text-neutral-500 hover:text-sky-500 lg:flex"
            >
              <ChevronLeft size={16} />
              Back
            </button>

            <h1 className="text-xl font-bold text-slate-900">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={16} className="fill-amber-400" />
                <span className="text-sm font-bold text-slate-900">{product.rating}</span>
              </div>
              <span className="text-sm text-neutral-500">{product.sell_count} sold</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">{product.price} TL</span>
            <span className="text-sm text-neutral-500">
              Availability :{' '}
              <span className="font-bold text-sky-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </span>
            <p className="text-sm text-neutral-500">{product.description}</p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                className="bg-sky-500 px-8 py-3 text-sm font-bold text-white"
              >
                Add to Cart
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
            {activeTab === 'description' && product.description}
            {activeTab === 'additional' && `${product.stock} items in stock.`}
            {activeTab === 'reviews' && 'No reviews yet.'}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
