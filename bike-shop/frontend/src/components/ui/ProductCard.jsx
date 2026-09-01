import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const categoryLabels = {
    road: 'Carretera',
    mtb: 'Montaña',
    city: 'Ciudad',
    electric: 'Eléctrica',
    children: 'Infantil',
  };

  return (
    <div className="bg-primary rounded-xl overflow-hidden border border-white/5 hover:border-accent/40 transition-all hover:-translate-y-1 group">
      <Link to={`/producto/${product._id}`}>
        <div className="aspect-square overflow-hidden bg-bg-secondary">
          <img
            src={product.images?.[0] || '/images/bici1.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            {categoryLabels[product.category] || product.category}
          </span>
          <h3 className="font-semibold text-light mt-1">{product.name}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-lg font-bold text-accent">
          {product.price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
          })}
        </span>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="bg-accent text-bg px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'Agotado' : 'Añadir'}
        </button>
      </div>
    </div>
  );
}
