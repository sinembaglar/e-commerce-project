import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { fetchOrders } from '../redux/actions/clientActions'

function OrderRow({ order }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left"
      >
        <span className="text-sm font-bold text-slate-900">Order #{order.id}</span>
        <span className="text-sm text-neutral-500">
          {new Date(order.order_date).toLocaleDateString()}
        </span>
        <span className="text-sm font-bold text-teal-700">{order.price} TL</span>
        {open ? (
          <ChevronUp size={18} className="text-neutral-500" />
        ) : (
          <ChevronDown size={18} className="text-neutral-500" />
        )}
      </button>

      {open && (
        <div className="flex flex-col gap-3 border-t border-neutral-200 p-4">
          {order.products.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="h-16 w-16 object-cover"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-bold text-slate-900">{product.name}</span>
                <span className="text-sm text-neutral-500">Qty: {product.count}</span>
              </div>
              <span className="text-sm font-bold text-teal-700">{product.price} TL</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function PreviousOrdersPage() {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.client.orders)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchOrders()).finally(() => setLoading(false))
  }, [dispatch])

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Previous Orders</h1>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-10">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 size={32} className="animate-spin text-sky-500" />
              </div>
            )}

            {!loading && orders.length === 0 && (
              <span className="text-center text-sm text-neutral-500">
                You have no previous orders yet.
              </span>
            )}

            {!loading && orders.map((order) => <OrderRow key={order.id} order={order} />)}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PreviousOrdersPage
