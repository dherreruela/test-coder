function Location() {
  const venue = {
    name: 'Warehouse 23',
    address: 'Calle de la Innovación 23, 28002 Madrid',
    mapsUrl: 'https://maps.google.com/?q=Madrid+Warehouse'
  };

  return (
    <section id="location" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-white">
            📍 <span className="text-neon-cian glow-text">¿DÓNDE</span>{' '}
            <span className="text-neon-magenta">NOS JUNTAMOS?</span>
          </h2>
        </div>

        <div className="card-neon p-8 md:p-12 text-center">
          <div className="text-4xl mb-4">🏭</div>
          <h3 className="font-display font-bold text-2xl text-white mb-2">{venue.name}</h3>
          <p className="text-gray-400 mb-1">{venue.address}</p>
          <p className="text-gray-500 text-sm mb-8">
            Antigua fábrica reconvertida en espacio industrial de eventos
          </p>

          <div className="inline-flex flex-wrap justify-center items-center gap-3">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neon-cian/10 border border-neon-cian text-neon-cian px-6 py-3 rounded-lg font-semibold hover:bg-neon-cian/20 transition-all hover:shadow-neon"
            >
              🗺️ Ver en Google Maps
            </a>
            <span className="px-4 py-2 bg-night-700/50 rounded-lg text-gray-300 text-sm">
              🚇 Metro: Línea 5, parada Industrial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
