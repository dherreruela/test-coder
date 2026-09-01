import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setError('');
      })
      .catch(() => setError('Producto no encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-primary rounded-xl aspect-square animate-pulse" />
          <div className="space-y-4">
            <div className="bg-primary h-8 rounded animate-pulse w-2/3" />
            <div className="bg-primary h-6 rounded animate-pulse w-1/3" />
            <div className="bg-primary h-32 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-light mb-4">{error}</h1>
        <button
          onClick={() => navigate('/catalogo')}
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/carrito');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-bg-secondary rounded-xl overflow-hidden border border-white/5">
          <img
            src={product.images?.[0] || '/images/bici1.jpg'}
            alt={product.name}
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-sm font-medium text-accent uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-light mt-2">
            {product.name}
          </h1>
          <p className="text-gray-400 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 text-3xl font-bold text-accent">
            {product.price.toLocaleString('es-ES', {
              style: 'currency',
              currency: 'EUR',
            })}
          </div>

          <div className="mt-2 text-sm">
            {product.stock > 0 ? (
              <span className="text-green-400">
                En stock ({product.stock} disponibles)
              </span>
            ) : (
              <span className="text-red-400">Agotado</span>
            )}
          </div>

          {/* Specs */}
          <div className="mt-8 bg-primary rounded-xl p-6 border border-white/5">
            <h2 className="font-semibold text-light mb-4">Especificaciones</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Cuadro</dt>
                <dd className="text-light font-medium">{product.specs?.frame || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Cambios</dt>
                <dd className="text-light font-medium">{product.specs?.gears || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Ruedas</dt>
                <dd className="text-light font-medium">{product.specs?.wheelSize || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Peso</dt>
                <dd className="text-light font-medium">
                  {product.specs?.weight ? `${product.specs.weight} kg` : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Marca</dt>
                <dd className="text-light font-medium">{product.brand || '—'}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Suspensión</dt>
                <dd className="text-light font-medium">
                  {product.specs?.suspension ? 'Sí' : 'No'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Add to cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center bg-primary rounded-lg border border-white/10">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-light hover:text-accent transition-colors"
              >
                −
              </button>
              <span className="px-2 text-light font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-3 text-light hover:text-accent transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
