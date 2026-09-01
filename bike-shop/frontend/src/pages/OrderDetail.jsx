import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';

const statusLabels = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((data) => {
        const found = data.find((o) => o._id === id);
        setOrder(found || null);
      })
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-primary rounded-xl h-64 animate-pulse" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-light mb-4">
          Pedido no encontrado
        </h1>
        <Link
          to="/pedidos"
          className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
        >
          Volver a mis pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/pedidos"
        className="text-sm text-accent hover:underline mb-6 inline-block"
      >
        ← Volver a mis pedidos
      </Link>

      <div className="bg-primary rounded-xl p-6 border border-white/5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-light">
              Pedido{' '}
              <span className="text-accent font-mono">#{order._id.slice(-8)}</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Realizado el{' '}
              {new Date(order.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/30">
            {statusLabels[order.status] || order.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-primary rounded-xl p-6 border border-white/5 md:col-span-2">
          <h2 className="text-lg font-semibold text-light mb-4">
            Productos
          </h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <img
                  src={item.image || '/images/bici1.jpg'}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover bg-bg-secondary"
                />
                <div className="flex-1">
                  <p className="text-sm text-light font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <span className="text-sm text-light font-medium">
                  {(item.price * item.quantity).toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-light mb-4">Totales</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-light">
                  {order.itemsPrice.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Envío</span>
                <span className="text-light">
                  {order.shippingPrice === 0
                    ? 'Gratis'
                    : `${order.shippingPrice} €`}
                </span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-white/10">
                <span className="text-light font-semibold">Total</span>
                <span className="text-accent font-bold">
                  {order.totalPrice.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-light mb-4">
              Dirección de Envío
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}
              {order.shippingAddress.state && `, ${order.shippingAddress.state}`}{' '}
              {order.shippingAddress.zip}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
