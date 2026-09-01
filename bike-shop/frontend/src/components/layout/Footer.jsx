import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold text-light">
              Bici<span className="text-accent">Shop</span>
            </span>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Tu tienda de bicicletas de confianza. Calidad, rendimiento y
              pasión por el ciclismo desde 2010.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light mb-3">
              Categorías
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/catalogo?categoria=road" className="hover:text-accent transition-colors">Carretera</Link></li>
              <li><Link to="/catalogo?categoria=mtb" className="hover:text-accent transition-colors">Montaña</Link></li>
              <li><Link to="/catalogo?categoria=city" className="hover:text-accent transition-colors">Ciudad</Link></li>
              <li><Link to="/catalogo?categoria=electric" className="hover:text-accent transition-colors">Eléctricas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light mb-3">Enlaces</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-accent transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-accent transition-colors">Catálogo</Link></li>
              <li><Link to="/carrito" className="hover:text-accent transition-colors">Carrito</Link></li>
              <li><Link to="/login" className="hover:text-accent transition-colors">Cuenta</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-light mb-3">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hola@bicishop.com</li>
              <li>+34 900 123 456</li>
              <li>Calle del Ciclista 42, Madrid</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} BiciShop. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
