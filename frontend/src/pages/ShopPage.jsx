import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { LayoutGrid, List, Loader2 } from 'lucide-react'
import { fetchProducts } from '../redux/actions/productActions'

function getCategoryPath(category) {
  const genderWord = category.gender === 'k' ? 'kadin' : 'erkek'
  const categoryName = category.code.split(':')[1]
  return `/shop/${genderWord}/${categoryName}/${category.id}`
}

const brands = ['hooli', 'Lyft', 'stripe', 'aws', 'reddit']

const pageNumbers = [1, 2, 3]

function ShopPage() {
  const dispatch = useDispatch()
  const [activePage, setActivePage] = useState(1)
  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const total = useSelector((state) => state.product.total)
  const fetchState = useSelector((state) => state.product.fetchState)
  const params = useParams()
  const activeCategory = params.categoryId
    ? categories.find((category) => String(category.id) === params.categoryId)
    : null

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-10">
          {activeCategory && (
            <h1 className="mb-4 text-xl font-bold text-slate-900">{activeCategory.title}</h1>
          )}
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={getCategoryPath(category)}
                className="group relative flex aspect-[4/5] basis-[calc(50%-8px)] items-center justify-center overflow-hidden lg:basis-[calc(20%-13px)]"
              >
                <img
                  src={category.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative flex flex-col items-center gap-1 text-center text-white">
                  <span className="text-lg font-bold uppercase">{category.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 py-6">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 lg:flex-row lg:justify-between lg:px-10">
          <span className="text-sm font-bold text-neutral-500">Showing all {total} results</span>

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
          {fetchState === 'FETCHING' && (
            <div className="flex justify-center py-12">
              <Loader2 size={32} className="animate-spin text-sky-500" />
            </div>
          )}

          {fetchState === 'FETCHED' && (
            <div className="flex flex-wrap justify-center gap-4">
              {productList.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="flex basis-full flex-col items-center gap-1 text-center lg:basis-[calc(25%-12px)]"
                >
                  <div className="flex aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={p.images[0]?.url}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-sm font-bold text-slate-900">{p.name}</span>
                  <span className="text-sm font-bold text-teal-700">{p.price} TL</span>
                </Link>
              ))}
            </div>
          )}

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
