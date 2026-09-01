function Hero() {
  return (
    <section id="home" className="section-padding pt-32 md:pt-40 relative min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge de fecha */}
        <div className="inline-flex items-center gap-2 bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-blink">
          <span className="w-2 h-2 bg-neon-magenta rounded-full"></span>
          15 · 08 · 2025 — 22:00 H
        </div>

        {/* Titular */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6">
          <span className="block text-neon-cian glow-text">NEON</span>
          <span className="block text-neon-magenta glow-text-magenta">NIGHTS</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          La experiencia de música electrónica más intensa del año.
          <br className="hidden sm:block" />
          Donde la tecnología se encuentra con el ritmo. 💫
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tickets"
            className="w-full sm:w-auto bg-gradient-to-r from-neon-cian to-neon-purple text-night-900 font-bold px-8 py-4 rounded-xl hover:shadow-neon-strong transition-all hover:scale-105"
          >
            🎟️ Comprar Entradas
          </a>
          <a
            href="#lineup"
            className="w-full sm:w-auto border border-neon-cian text-neon-cian px-8 py-4 rounded-xl font-bold hover:bg-neon-cian/10 transition-all"
          >
            Ver Line Up
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-16">
          {[
            { value: '10+', label: 'DJs' },
            { value: '6h', label: 'Música' },
            { value: '3k', label: 'Personas' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-3xl md:text-4xl text-white glow-text">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
