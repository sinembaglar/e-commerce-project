import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { LayoutGrid, List, Loader2 } from 'lucide-react'
// react-paginate's default export needs unwrapping twice in this project's
// build setup (Vite double-wraps this specific package's CommonJS export).
import * as ReactPaginateModule from 'react-paginate'

const ReactPaginate = ReactPaginateModule.default.default
import {
  fetchProducts,
  setFilter,
  setSort,
  setOffset,
} from '../redux/actions/productActions'

function getCategoryPath(category) {
  const genderWord = category.gender === 'k' ? 'kadin' : 'erkek'
  const categoryName = category.code.split(':')[1]
  return `/shop/${genderWord}/${categoryName}/${category.id}`
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Product URLs look like /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
// which needs the product's category info, so we look it up by category_id.
function getProductPath(product, categories) {
  const category = categories.find((c) => c.id === product.category_id)
  if (!category) return `/product/${product.id}`

  const categoryPath = getCategoryPath(category)
  const slug = slugify(product.name)
  return `${categoryPath}/${slug}/${product.id}`
}

const brands = ['hooli', 'Lyft', 'stripe', 'aws', 'reddit']

function ShopPage() {
  const dispatch = useDispatch()
  const [activePage, setActivePage] = useState(1)
  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const total = useSelector((state) => state.product.total)
  const fetchState = useSelector((state) => state.product.fetchState)
  const filter = useSelector((state) => state.product.filter)
  const sort = useSelector((state) => state.product.sort)
  const limit = useSelector((state) => state.product.limit)
  const params = useParams()
  const activeCategory = params.categoryId
    ? categories.find((category) => String(category.id) === params.categoryId)
    : null

  const totalPages = Math.ceil(total / limit) || 1

  useEffect(() => {
    const offset = (activePage - 1) * limit
    dispatch(setOffset(offset))
    dispatch(fetchProducts({ category: params.categoryId, filter, sort, limit, offset }))
  }, [dispatch, params.categoryId, filter, sort, activePage, limit])

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
            <input
              type="text"
              value={filter}
              onChange={(e) => dispatch(setFilter(e.target.value))}
              placeholder="Search products..."
              className="border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900"
            />
            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className="border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="">Sort by</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="rating:asc">Rating: Low to High</option>
              <option value="rating:desc">Rating: High to Low</option>
            </select>
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
                  to={getProductPath(p, categories)}
                  className="group flex basis-full cursor-pointer flex-col items-center gap-1 text-center lg:basis-[calc(25%-12px)]"
                >
                  <div className="flex aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={p.images[0]?.url}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-2 text-sm font-bold text-slate-900">{p.name}</span>
                  <span className="text-sm font-bold text-teal-700">{p.price} TL</span>
                </Link>
              ))}
            </div>
          )}

          <ReactPaginate
            pageCount={totalPages}
            forcePage={activePage - 1}
            onPageChange={({ selected }) => setActivePage(selected + 1)}
            previousLabel="Previous"
            nextLabel="Next"
            containerClassName="flex flex-wrap items-center justify-center gap-2 text-sm font-bold"
            pageLinkClassName="flex px-3 py-2 text-neutral-500 cursor-pointer"
            activeLinkClassName="!bg-sky-500 !text-white"
            previousLinkClassName="flex px-3 py-2 text-neutral-500 cursor-pointer"
            nextLinkClassName="flex px-3 py-2 text-neutral-500 cursor-pointer"
            breakLinkClassName="flex px-3 py-2 text-neutral-500"
          />
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
