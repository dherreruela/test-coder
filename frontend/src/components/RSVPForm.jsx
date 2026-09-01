import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  ticketType: localStorage.getItem('selectedTicket') || 'vip',
  quantity: 1
};

const ticketLabel = {
  general: 'General',
  vip: 'VIP',
  'vip-plus': 'VIP+'
};

function RSVPForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantity = (delta) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, Math.min(10, prev.quantity + delta))
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // Confirmación local (sin backend)
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: `¡Gracias ${formData.name}! Tu entrada ${ticketLabel[formData.ticketType]} x${formData.quantity} está confirmada. Te esperamos en la pista 🪩`
      });
      setFormData({ ...initialState, ticketType: 'vip' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="rsvp" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
            📋 <span className="text-neon-magenta glow-text-magenta">CONFIRMA TU</span>{' '}
            <span className="text-neon-cian glow-text">ASISTENCIA</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Reserva tu entrada y asegura tu lugar en la pista.
          </p>
        </div>

        {/* Estado del formulario */}
        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.type === 'success'
                ? 'bg-neon-cian/10 border border-neon-cian text-neon-cian'
                : 'bg-red-500/10 border border-red-500 text-red-400'
            }`}
          >
            {status.type === 'success' ? '✅ ' : '⚠️ '}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-neon p-8 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cian focus:ring-1 focus:ring-neon-cian transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cian focus:ring-1 focus:ring-neon-cian transition"
            />
          </div>

          {/* Tipo de entrada */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de entrada *
            </label>
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleChange}
              className="w-full bg-night-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cian focus:ring-1 focus:ring-neon-cian transition"
            >
              <option value="general">General — €25</option>
              <option value="vip">VIP — €60</option>
              <option value="vip-plus">VIP+ — €120</option>
            </select>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cantidad de entradas
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleQuantity(-1)}
                className="w-10 h-10 bg-night-800 border border-white/10 rounded-lg text-gray-400 hover:border-neon-cian hover:text-neon-cian transition"
                aria-label="Disminuir"
              >
                −
              </button>
              <span className="font-display font-bold text-xl text-white w-8 text-center">
                {formData.quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantity(1)}
                className="w-10 h-10 bg-night-800 border border-white/10 rounded-lg text-gray-400 hover:border-neon-cian hover:text-neon-cian transition"
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-neon-magenta to-neon-purple text-white font-bold py-4 rounded-xl hover:shadow-neon-strong transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Procesando...' : '🪩 ¡Confirmar Asistencia!'}
          </button>

          <p className="text-center text-xs text-gray-500">
            Al confirmar aceptas los términos y condiciones del evento.
          </p>
        </form>
      </div>
    </section>
  );
}

export default RSVPForm;
