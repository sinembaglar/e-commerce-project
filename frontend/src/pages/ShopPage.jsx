import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import ss2Img from '../assets/imgs/ss2.png'

const brands = ['hooli', 'Lyft', 'stripe', 'aws', 'reddit']

const categories = [
  { name: 'Cloths', items: 5, color: 'bg-slate-800' },
  { name: 'Cloths', items: 5, color: 'bg-teal-600' },
  { name: 'Cloths', items: 5, color: 'bg-rose-300' },
  { name: 'Cloths', items: 5, color: 'bg-pink-400' },
  { name: 'Cloths', items: 5, color: 'bg-pink-300' },
]

const product = {
  name: 'Graphic Design',
  category: 'English Department',
  originalPrice: '$16.48',
  salePrice: '$6.48',
  colors: ['blue', 'green', 'orange', 'black'],
}

const products = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, ...product }))

const pageNumbers = [1, 2, 3]

function ShopPage() {
  const [activePage, setActivePage] = useState(1)

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`relative flex aspect-[4/5] flex-1 items-center justify-center overflow-hidden ${category.color}`}
              >
                <img
                  src={ss2Img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
                <div className="relative flex flex-col items-center gap-1 text-center text-white">
                  <span className="text-lg font-bold uppercase">{category.name}</span>
                  <span className="text-sm">{category.items} items</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 py-6">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 lg:flex-row lg:justify-between lg:px-10">
          <span className="text-sm font-bold text-neutral-500">Showing all 12 results</span>

          <div className="flex items-center gap-2 text-sm font-bold text-neutral-500">
            Views:
            <button
              type="button"
              aria-label="Grid görünümü"
              className="flex items-center justify-center border border-sky-500 bg-sky-50 p-2"
            >
              <LayoutGrid size={16} className="text-sky-500" />
            </button>
            <button
              type="button"
              aria-label="Liste görünümü"
              className="flex items-center justify-center border border-neutral-300 p-2"
            >
              <List size={16} className="text-neutral-400" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select className="border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900">
              <option>Popularity</option>
            </select>
            <button
              type="button"
              className="bg-sky-500 px-6 py-2 text-sm font-bold text-white"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto flex flex-col gap-8 px-4 lg:px-10">
          <div className="flex flex-wrap justify-center gap-4">
            {products.map((p) => (
              <div key={p.id} className="flex basis-full lg:basis-[calc(25%-12px)]">
                <ProductCard {...p} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <button type="button" className="px-3 py-2 text-neutral-400">
              First
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`px-3 py-2 ${
                  page === activePage ? 'bg-sky-500 text-white' : 'text-neutral-500'
                }`}
              >
                {page}
              </button>
            ))}
            <button type="button" className="px-3 py-2 text-neutral-500">
              Next
            </button>
          </div>
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
    </div>
  )
}

export default ShopPage
