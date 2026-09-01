import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const statusLabels = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-light mb-4">
          Debes iniciar sesión
        </h1>
        <Link
          to="/login"
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-primary rounded-xl h-40 animate-pulse" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">📦</div>
        <h1 className="text-2xl font-bold text-light mb-4">
          No tienes pedidos aún
        </h1>
        <p className="text-gray-400 mb-8">
          Realiza tu primera compra y aquí aparecerán tus pedidos.
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-light mb-8">Mis Pedidos</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/pedidos/${order._id}`}
            className="block bg-primary rounded-xl p-6 border border-white/5 hover:border-accent/40 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  Pedido{' '}
                  <span className="text-accent font-mono">
                    #{order._id.slice(-8)}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image || '/images/bici1.jpg'}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <span className="w-10 h-10 rounded-full bg-bg-secondary border-2 border-primary flex items-center justify-center text-xs text-light">
                      +{order.items.length - 3}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[order.status] || statusColors.pending
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                  <p className="font-bold text-accent mt-2">
                    {order.totalPrice.toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
