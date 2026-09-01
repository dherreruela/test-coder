import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ui/ProductCard';

const categories = [
  { id: 'road', name: 'Carretera', icon: '🏁', img: '/images/bici1.jpg' },
  { id: 'mtb', name: 'Montaña', icon: '⛰️', img: '/images/bici2.jpg' },
  { id: 'city', name: 'Ciudad', icon: '🏙️', img: '/images/bici3.jpg' },
  { id: 'electric', name: 'Eléctricas', icon: '⚡', img: '/images/bici4.jpg' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-bg-secondary to-bg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/bici1.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Nueva colección 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-light leading-tight">
              Descubre la libertad sobre dos ruedas
            </h1>
            <p className="text-gray-400 text-lg mt-6 leading-relaxed">
              Bicicletas premium para carretera, montaña, ciudad y eléctricas.
              Diseñadas para el rendimiento, construidas para durar.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/catalogo"
                className="bg-accent text-bg px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Ver Catálogo
              </Link>
              <Link
                to="/catalogo?categoria=mtb"
                className="border border-light/30 text-light px-6 py-3 rounded-lg font-semibold hover:border-accent hover:text-accent transition-colors"
              >
                Explorar MTB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-light mb-8">
            Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalogo?categoria=${cat.id}`}
                className="group relative overflow-hidden rounded-xl bg-primary border border-white/5 hover:border-accent/40 transition-all"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-40 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-lg font-semibold text-light">
                    {cat.icon} {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-light">
              Destacados
            </h2>
            <Link
              to="/catalogo"
              className="text-accent text-sm font-medium hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-primary rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Envío Gratuito', desc: 'En pedidos superiores a 50€ en toda la península.', icon: '🚚' },
              { title: 'Garantía 2 años', desc: 'Todos nuestros productos incluyen garantía oficial.', icon: '🛡️' },
              { title: 'Soporte Experto', desc: 'Asesoramiento personalizado de ciclistas reales.', icon: '👨‍🔧' },
            ].map((feature) => (
              <div key={feature.title} className="bg-primary rounded-xl p-6 border border-white/5">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-light">{feature.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
