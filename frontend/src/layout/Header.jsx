import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import { getGravatarUrl } from '../utils/gravatar'
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Team', path: '/team' },
  { label: 'Pages', path: '/pages' },
]

function AuthStatus({ className = '' }) {
  const user = useSelector((state) => state.client.user)
  const location = useLocation()

  if (user?.email) {
    return (
      <span className={`flex items-center gap-2 font-bold text-slate-900 ${className}`}>
        <img
          src={getGravatarUrl(user.email, 32)}
          alt={user.name}
          className="h-6 w-6 rounded-full"
        />
        {user.name}
      </span>
    )
  }

  return (
    <Link
      to={{ pathname: '/login', state: { from: location } }}
      className={`flex items-center gap-2 font-bold text-sky-500 ${className}`}
    >
      <User size={16} />
      Login / Register
    </Link>
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
            <Link
              to="/shop"
              className="flex items-center gap-1 text-base font-bold text-neutral-500 hover:text-slate-900"
            >
              Shop
              <ChevronDown size={16} />
            </Link>
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
          <span className="relative flex">
            <ShoppingCart size={20} className="text-sky-500" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
              1
            </span>
          </span>
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
