import { Link } from 'react-router-dom'
import ss2Img from '../assets/imgs/ss2.png'

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  orange: 'bg-orange-500',
  black: 'bg-slate-900',
}

function ProductCard({ id, name, category, originalPrice, salePrice, colors = [] }) {
  return (
    <Link to={`/product/${id}`} className="flex flex-col items-center gap-1 text-center">
      <div className="flex aspect-[3/4] w-full overflow-hidden">
        <img src={ss2Img} alt={name} className="h-full w-full object-cover" />
      </div>
      <span className="mt-2 text-sm font-bold text-slate-900">{name}</span>
      <span className="text-xs font-bold text-neutral-500">{category}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-neutral-400 line-through">{originalPrice}</span>
        <span className="text-sm font-bold text-teal-700">{salePrice}</span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        {colors.map((color) => (
          <span key={color} className={`h-3 w-3 rounded-full ${colorClasses[color]}`} />
        ))}
      </div>
    </Link>
  )
}

export default ProductCard
