import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { PRODUCT_IMAGES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import FlavorSelector from './FlavorSelector';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0.5);
  const [flavor, setFlavor] = useState('');
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const image = PRODUCT_IMAGES[product.name] || PRODUCT_IMAGES['W320'];

  const handleAdd = () => {
    if (product.has_flavors && !flavor) return;

    addItem(
      { ...product, image },
      quantity,
      product.has_flavors ? flavor : null
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getCategoryColor = () => {
    switch (product.category) {
      case 'Premium': return 'bg-rustic/10 text-rustic';
      case 'Standard': return 'bg-wood/10 text-wood';
      case 'Economy': return 'bg-moss/10 text-moss';
      case 'Flavored': return 'bg-chili/10 text-chili';
      default: return 'bg-sand text-bark';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card-premium overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-sand/30">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`badge ${getCategoryColor()}`}>
            {product.category}
          </span>
        </div>
        {/* Price tag */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-bark font-outfit font-bold px-2.5 py-1 rounded-lg text-sm shadow-sm">
            {formatCurrency(product.price)}/kg
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-outfit font-bold text-lg text-bark mb-1">
          {product.name}
        </h3>
        <p className="text-charcoal/50 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Flavor selector */}
        {product.has_flavors && (
          <div className="mb-4">
            <FlavorSelector value={flavor} onChange={setFlavor} />
          </div>
        )}

        {/* Quantity stepper */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-charcoal/60 font-medium">Quantity (kg)</span>
          <div className="flex items-center gap-0 bg-sand/50 rounded-xl overflow-hidden border border-sand">
            <button
              onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
              className="w-10 h-10 flex items-center justify-center text-bark hover:bg-cashew/20 transition-colors duration-200 font-semibold text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-14 h-10 flex items-center justify-center font-inter font-semibold text-bark bg-white text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 0.5)}
              className="w-10 h-10 flex items-center justify-center text-bark hover:bg-cashew/20 transition-colors duration-200 font-semibold text-lg"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-sand/50">
          <span className="text-sm text-charcoal/50">Subtotal</span>
          <span className="font-outfit font-bold text-bark text-lg">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          disabled={product.has_flavors && !flavor}
          className={`w-full py-3 rounded-xl font-outfit font-semibold text-sm
                     flex items-center justify-center gap-2
                     transition-all duration-300 
                     ${added
                       ? 'bg-moss text-white shadow-moss'
                       : product.has_flavors && !flavor
                         ? 'bg-sand/50 text-charcoal/30 cursor-not-allowed'
                         : 'bg-rustic text-white shadow-rustic hover:bg-rustic/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                     }`}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </motion.span>
            ) : (
              <motion.span
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {product.has_flavors && !flavor ? 'Select a Flavor' : 'Add to Cart'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
