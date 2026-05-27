import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/storefront/ProductCard';
import CartSlideout from '../components/storefront/CartSlideout';
import { PRODUCTS, PRODUCT_IMAGES, CATEGORIES } from '../utils/constants';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  const categories = Object.values(CATEGORIES);

  const filteredProducts = useMemo(() => {
    const products = PRODUCTS.map((p) => ({
      ...p,
      image: PRODUCT_IMAGES[p.name],
    }));

    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-cream pt-24 sm:pt-28">
      {/* Header */}
      <div className="container-app mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
            Browse & Order
          </span>
          <h1 className="font-outfit font-bold text-3xl sm:text-4xl lg:text-5xl text-bark mt-2">
            Our Collection
          </h1>
          <p className="text-charcoal/60 mt-2 max-w-lg">
            Premium cashews in every grade and flavor. Select your favorites and order via WhatsApp.
          </p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="container-app mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-xl font-inter font-medium text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-rustic text-white shadow-rustic'
                  : 'bg-white text-charcoal/60 hover:text-bark hover:bg-sand/50 border border-sand/50'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-rustic rounded-xl -z-10"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="container-app pb-16 sm:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-sand/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🥜</span>
            </div>
            <h3 className="font-outfit font-semibold text-lg text-bark">
              No products found
            </h3>
            <p className="text-charcoal/50 text-sm mt-1">
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </div>

      {/* Cart Slideout */}
      <CartSlideout isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Shop;
