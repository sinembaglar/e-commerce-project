import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import md5 from 'blueimp-md5'
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  User,
  Search,
  ShoppingCart,
  Heart,
} from 'lucide-react'
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from '../components/icons/FeatherIcons'

const GENDER_GROUPS = [
  { gender: 'k', label: 'Kadın' },
  { gender: 'e', label: 'Erkek' },
]

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Team', path: '/team' },
  { label: 'Pages', path: '/pages' },
]

function getCategoryPath(category) {
  const genderWord = category.gender === 'k' ? 'kadin' : 'erkek'
  const categoryName = category.code.split(':')[1]
  return `/shop/${genderWord}/${categoryName}/${category.id}`
}

function AuthStatus({ className = '' }) {
  const user = useSelector((state) => state.client.user)

  if (user?.email) {
    const hash = md5(user.email.trim().toLowerCase())
    const avatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon&s=32`

    return (
      <span className={`flex items-center gap-2 font-bold text-slate-900 ${className}`}>
        <img src={avatarUrl} alt={user.name} className="h-6 w-6 rounded-full" />
        {user.name}
      </span>
    )
  }

  return (
    <Link
      to="/login"
      className={`flex items-center gap-2 font-bold text-sky-500 ${className}`}
    >
      <User size={16} />
      Login / Register
    </Link>
  )
}

function ShopDropdown() {
  const [open, setOpen] = useState(false)
  const categories = useSelector((state) => state.product.categories)

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-base font-bold text-neutral-500 hover:text-slate-900"
      >
        Shop
        <ChevronDown size={16} />
      </button>

      {open && categories.length > 0 && (
        <div className="absolute left-0 top-full z-20 flex gap-8 border border-neutral-200 bg-white p-6 shadow-lg">
          {GENDER_GROUPS.map(({ gender, label }) => (
            <div key={gender} className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                {label}
              </span>
              {categories
                .filter((category) => category.gender === gender)
                .map((category) => (
                  <Link
                    key={category.id}
                    to={getCategoryPath(category)}
                    onClick={() => setOpen(false)}
                    className="text-sm text-neutral-600 hover:text-sky-500"
                  >
                    {category.title}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CartDropdown() {
  const [open, setOpen] = useState(false)
  const cart = useSelector((state) => state.shoppingCart.cart)

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Sepetim"
        className="relative flex"
      >
        <ShoppingCart size={20} className="text-sky-500" />
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
          {cart.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 flex w-80 flex-col gap-3 border border-neutral-200 bg-white p-4 shadow-lg">
          <span className="text-sm font-bold text-slate-900">Cart ({cart.length} items)</span>

          {cart.length === 0 && (
            <span className="text-sm text-neutral-500">Your cart is empty.</span>
          )}

          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="h-14 w-14 object-cover"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-bold text-slate-900">{item.product.name}</span>
                <span className="text-xs text-neutral-500">Qty: {item.count}</span>
              </div>
              <span className="text-sm font-bold text-teal-700">{item.product.price} TL</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex flex-col">
      <div className="hidden bg-slate-900 text-sm font-bold text-white lg:flex">
        <div className="container mx-auto flex items-center justify-between px-4 py-5 lg:px-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone size={16} />
              (225) 555-0118
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} />
              michelle.rivera@example.com
            </span>
          </div>
          <span>Follow Us and get a chance to win 80% off</span>
          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <div className="flex items-center gap-3 text-white">
              <InstagramIcon size={16} />
              <YoutubeIcon size={16} />
              <FacebookIcon size={16} />
              <TwitterIcon size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-10">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            SB ATELIER
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/" className="text-base font-bold text-neutral-500 hover:text-slate-900">
              Home
            </Link>
            <ShopDropdown />
            {navItems.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-base font-bold text-neutral-500 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <AuthStatus className="rounded-full px-4 py-2 text-sm" />
          <Search size={20} className="text-sky-500" />
          <CartDropdown />
          <span className="relative flex">
            <Heart size={20} className="text-sky-500" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
              1
            </span>
          </span>
        </div>

        <button
          type="button"
          className="flex items-center lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 px-4 pb-4 lg:hidden">
          <Link to="/" className="text-sm text-neutral-500" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/shop"
            className="text-sm text-neutral-500"
            onClick={() => setMenuOpen(false)}
          >
            Shop
          </Link>
          {navItems.slice(1).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm text-neutral-500"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <AuthStatus className="text-sm" />
        </nav>
      )}
    </header>
  )
}

export default Header
