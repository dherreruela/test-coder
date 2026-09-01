const djs = [
  {
    name: 'AXIOM',
    genre: 'Techno',
    time: '22:30 - 23:45',
    color: 'neon-cian',
    initials: 'AX',
    emoji: '🎛️'
  },
  {
    name: 'Voltage',
    genre: 'Tech House',
    time: '23:45 - 01:00',
    color: 'neon-magenta',
    initials: 'VO',
    emoji: '⚡'
  },
  {
    name: 'Lyra',
    genre: 'Trance',
    time: '01:00 - 02:30',
    color: 'neon-purple',
    initials: 'LY',
    emoji: '🌌'
  },
  {
    name: 'Pulse',
    genre: 'House',
    time: '02:30 - 03:45',
    color: 'neon-lime',
    initials: 'PU',
    emoji: '💓'
  },
  {
    name: 'Kyra Wave',
    genre: 'Melodic House',
    time: '03:45 - 05:00',
    color: 'neon-cian',
    initials: 'KW',
    emoji: '🌊'
  },
  {
    name: 'DJ Nova',
    genre: 'Drum & Bass',
    time: '05:00 - 06:00',
    color: 'neon-magenta',
    initials: 'DN',
    emoji: '🚀'
  }
];

const colorMap = {
  'neon-cian': {
    bg: 'from-neon-cian/20 to-transparent',
    text: 'text-neon-cian',
    border: 'border-neon-cian/40',
    glow: 'hover:shadow-neon'
  },
  'neon-magenta': {
    bg: 'from-neon-magenta/20 to-transparent',
    text: 'text-neon-magenta',
    border: 'border-neon-magenta/40',
    glow: 'hover:shadow-neon-magenta'
  },
  'neon-purple': {
    bg: 'from-neon-purple/20 to-transparent',
    text: 'text-neon-purple',
    border: 'border-neon-purple/40',
    glow: 'hover:shadow-neon-purple'
  },
  'neon-lime': {
    bg: 'from-neon-lime/20 to-transparent',
    text: 'text-neon-lime',
    border: 'border-neon-lime/40',
    glow: 'hover:shadow-neon'
  }
};

function LineUp() {
  return (
    <section id="lineup" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
            <span className="text-neon-cian">LINE</span>{' '}
            <span className="text-neon-magenta glow-text-magenta">UP</span>
          </h2>
          <p className="text-gray-400 text-lg">
            6 DJs. 6 horas de pura electrónica. Noche sin descanso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {djs.map((dj) => {
            const colors = colorMap[dj.color];
            return (
              <div
                key={dj.name}
                className={`card-neon overflow-hidden group hover:scale-[1.02] ${colors.glow} relative`}
              >
                {/* Decoración de gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-b ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                <div className="relative p-7">
                  {/* Avatar placeholder */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center font-display font-bold text-xl ${colors.text}`}
                    >
                      {dj.initials}
                    </div>
                    <span className="text-2xl">{dj.emoji}</span>
                  </div>

                  <h3 className={`font-display font-bold text-xl mb-2 ${colors.text}`}>
                    {dj.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="px-2 py-0.5 bg-white/5 rounded-full">{dj.genre}</span>
                    <span className="text-gray-500">{dj.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-500 text-sm mt-10">
          * Line up sujeto a cambios. Sigue nuestras redes para actualizaciones.
        </p>
      </div>
    </section>
  );
}

export default LineUp;
