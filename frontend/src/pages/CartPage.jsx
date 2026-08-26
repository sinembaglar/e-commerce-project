import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import {
  increaseCartCount,
  decreaseCartCount,
  removeFromCart,
  toggleCartItemChecked,
} from '../redux/actions/shoppingCartActions'

function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

  const total = cart
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.product.price * item.count, 0)

  return (
    <div className="flex flex-col">
      <section className="py-8">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center lg:px-10">
          <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 lg:px-10">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <span className="text-sm text-neutral-500">Your cart is empty.</span>
              <Link to="/shop" className="text-sm font-bold text-sky-500">
                Go to Shop
              </Link>
            </div>
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col items-center gap-4 border border-neutral-200 p-4 lg:flex-row"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => dispatch(toggleCartItemChecked(item.product.id))}
                  />

                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="h-20 w-20 object-cover"
                  />

                  <div className="flex flex-1 flex-col items-center gap-1 text-center lg:items-start lg:text-left">
                    <span className="text-sm font-bold text-slate-900">{item.product.name}</span>
                    <span className="text-sm text-neutral-500">{item.product.price} TL</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Adedi azalt"
                      onClick={() => dispatch(decreaseCartCount(item.product.id))}
                      className="flex items-center justify-center border border-neutral-300 p-2"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{item.count}</span>
                    <button
                      type="button"
                      aria-label="Adedi artır"
                      onClick={() => dispatch(increaseCartCount(item.product.id))}
                      className="flex items-center justify-center border border-neutral-300 p-2"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="w-24 text-center text-sm font-bold text-teal-700">
                    {(item.product.price * item.count).toFixed(2)} TL
                  </span>

                  <button
                    type="button"
                    aria-label="Sepetten kaldır"
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    className="flex items-center justify-center p-2 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <div className="flex justify-end border-t border-neutral-200 pt-4">
                <span className="text-lg font-bold text-slate-900">
                  Total: {total.toFixed(2)} TL
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CartPage
