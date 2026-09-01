import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ui/ProductCard';

const categories = [
  { id: '', name: 'Todos' },
  { id: 'road', name: 'Carretera' },
  { id: 'mtb', name: 'Montaña' },
  { id: 'city', name: 'Ciudad' },
  { id: 'electric', name: 'Eléctricas' },
  { id: 'children', name: 'Infantil' },
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const category = searchParams.get('categoria') || '';

  useEffect(() => {
    setLoading(true);
    getProducts({ category: category || undefined, search: search || undefined })
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search]);

  const handleCategoryChange = (cat) => {
    if (cat) {
      setSearchParams({ categoria: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-light mb-2">Catálogo</h1>
      <p className="text-gray-400 mb-8">
        Encuentra la bicicleta perfecta para ti.
      </p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat.id
                  ? 'bg-accent text-bg'
                  : 'bg-primary text-gray-300 hover:bg-primary/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar bicicletas..."
          className="flex-1 min-w-[200px] bg-primary border border-white/10 rounded-lg px-4 py-2 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-accent"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-primary rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No se encontraron productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
