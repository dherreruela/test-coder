import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-light mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-gray-400 mb-8">
          Añade bicicletas y accesorios a tu carrito para comenzar a comprar.
        </p>
        <Link
          to="/catalogo"
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-light mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-primary rounded-xl p-4 flex items-center gap-4 border border-white/5"
            >
              <img
                src={item.image || '/images/bici1.jpg'}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover bg-bg-secondary"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-light">{item.name}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {item.price.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center bg-bg-secondary rounded-lg border border-white/10">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1.5 text-light hover:text-accent transition-colors"
                    >
                      −
                    </button>
                    <span className="px-2 text-sm text-light font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1.5 text-light hover:text-accent transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-sm text-gray-500 hover:text-red-400 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-accent">
                  {(item.price * item.quantity).toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-primary rounded-xl p-6 border border-white/5 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-light mb-6">Resumen</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Productos ({cartCount})</span>
              <span className="text-light font-medium">
                {cartTotal.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Envío</span>
              <span className="text-light font-medium">
                {cartTotal > 50 ? 'Gratis' : '5,99 €'}
              </span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-lg">
              <span className="text-light font-semibold">Total</span>
              <span className="text-accent font-bold">
                {(cartTotal + (cartTotal > 50 ? 0 : 5.99)).toLocaleString(
                  'es-ES',
                  { style: 'currency', currency: 'EUR' }
                )}
              </span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mt-6"
          >
            {user ? 'Proceder al Pago' : 'Iniciar Sesión y Comprar'}
          </button>
          <Link
            to="/catalogo"
            className="block text-center text-sm text-gray-400 hover:text-accent transition-colors mt-4"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
