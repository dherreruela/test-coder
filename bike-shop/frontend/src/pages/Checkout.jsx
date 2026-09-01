import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'España',
    paymentMethod: 'card',
  });

  const shippingPrice = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + shippingPrice;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const orderData = {
      items: items.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      shippingAddress: {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
      itemsPrice: cartTotal,
      shippingPrice,
      totalPrice: total,
    };

    try {
      const order = await createOrder(orderData);
      clearCart();
      navigate(`/pedidos/${order._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error al procesar el pedido. Intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-light mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Shipping */}
          <div className="bg-primary rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-light mb-4">
              Dirección de Envío
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-light mb-2">
                  Calle y número
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={form.street}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="Calle del Ciclista 42"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="Madrid"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Provincia
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="Madrid"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={form.zip}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
                  placeholder="28001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  País
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full bg-bg-secondary border border-white/10 rounded-lg px-4 py-3 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-primary rounded-xl p-6 border border-white/5">
            <h2 className="text-lg font-semibold text-light mb-4">
              Método de Pago
            </h2>
            <div className="space-y-3">
              {[
                { id: 'card', label: 'Tarjeta de crédito/débito' },
                { id: 'paypal', label: 'PayPal' },
                { id: 'transfer', label: 'Transferencia bancaria' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 bg-bg-secondary rounded-lg p-4 border cursor-pointer transition-colors ${
                    form.paymentMethod === method.id
                      ? 'border-accent'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={form.paymentMethod === method.id}
                    onChange={handleChange}
                    className="accent-accent"
                  />
                  <span className="text-sm text-light">{method.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Demo: no se realiza ningún cobro real en este entorno de prueba.
            </p>
          </div>
        </form>

        {/* Summary */}
        <div className="bg-primary rounded-xl p-6 border border-white/5 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-light mb-4">Resumen del Pedido</h2>
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <img
                  src={item.image || '/images/bici1.jpg'}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover bg-bg-secondary"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-light truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
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
          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-light">
                {cartTotal.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Envío</span>
              <span className="text-light">
                {shippingPrice === 0 ? 'Gratis' : `${shippingPrice} €`}
              </span>
            </div>
            <div className="flex justify-between text-lg pt-2">
              <span className="text-light font-semibold">Total</span>
              <span className="text-accent font-bold">
                {total.toLocaleString('es-ES', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mt-6 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
}
