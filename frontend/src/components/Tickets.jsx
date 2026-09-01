import { useState } from 'react';

const tickets = [
  {
    id: 'general',
    name: 'General',
    price: 25,
    features: [
      'Acceso a la zona principal',
      'Barra estándar',
      '1 bebida de bienvenida',
      'Acceso a zona chill'
    ],
    highlight: false,
    emoji: '🎟️',
    color: {
      border: 'border-white/20',
      button: 'border-white/30 text-white hover:bg-white/10'
    }
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 60,
    features: [
      'Todo lo de General',
      'Zona VIP con vistas',
      'Sección exclusiva near DJ booth',
      'Barra premium',
      'Acceso al after-party'
    ],
    highlight: true,
    emoji: '👑',
    color: {
      border: 'border-neon-cian shadow-neon',
      button: 'bg-neon-cian text-night-900 hover:shadow-neon-strong'
    }
  },
  {
    id: 'vip-plus',
    name: 'VIP+',
    price: 120,
    features: [
      'Todo lo de VIP',
      'Meet & greet con DJs',
      'Locker privado',
      'Drinks ilimitados',
      'Acceso backstage'
    ],
    highlight: false,
    emoji: '★',
    color: {
      border: 'border-neon-magenta/40',
      button: 'border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10'
    }
  }
];

function Tickets() {
  const [selected, setSelected] = useState('vip');

  // Data plana para el formulario RSVP
  const handleSelectTicket = (ticketId) => {
    setSelected(ticketId);
    // Guardar en localStorage para que el formulario lo use
    localStorage.setItem('selectedTicket', ticketId);
  };

  return (
    <section id="tickets" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
            🎟️ <span className="text-neon-cian">ENTRADAS</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Elige tu experiencia. Cupos limitados, ¡no te quedes fuera!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tickets.map((ticket) => {
            const isSelected = selected === ticket.id;
            return (
              <div
                key={ticket.id}
                className={`card-neon p-8 flex flex-col relative ${
                  ticket.highlight ? `${ticket.color.border} transform md:-translate-y-4` : ticket.color.border
                } ${isSelected ? 'ring-2 ring-neon-cian' : ''}`}
              >
                {ticket.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-cian to-neon-purple text-night-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Más Popular
                  </span>
                )}

                <div className="text-3xl mb-4">{ticket.emoji}</div>
                <h3 className="font-display font-bold text-xl mb-2 text-white">{ticket.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-400 text-sm">Desde</span>
                  <span className="font-display font-black text-4xl text-white">€{ticket.price}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {ticket.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-neon-cian mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectTicket(ticket.id)}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${ticket.color.button} ${
                    isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {isSelected ? '✓ Seleccionada' : 'Seleccionar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Tickets;
