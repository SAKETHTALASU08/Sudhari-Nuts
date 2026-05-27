import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/cartStore';
import { formatCurrency } from '../../utils/formatters';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

const CartSlideout = ({ isOpen, onClose }) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const total = getTotal();

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(items, total);
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-cream z-[90] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-sand">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h2 className="font-outfit font-bold text-lg text-bark">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="bg-cashew/10 text-cashew text-xs font-semibold px-2 py-0.5 rounded-full">
                    {items.length} item{items.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-sand/50 transition-colors duration-200"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5 text-charcoal/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-24 h-24 bg-sand/50 rounded-full flex items-center justify-center mb-6">
                    <span className="text-5xl">🛒</span>
                  </div>
                  <h3 className="font-outfit font-semibold text-lg text-bark mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-charcoal/50 text-sm max-w-[200px]">
                    Browse our premium cashew collection and add items to your cart.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 btn-secondary text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-sand/30"
                    >
                      <div className="flex gap-3">
                        {/* Product image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-sand/30 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-outfit font-semibold text-bark text-sm">
                                {item.name}
                              </h4>
                              {item.flavor && (
                                <p className="text-cashew text-xs font-medium mt-0.5">
                                  {item.flavor}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1 rounded-lg hover:bg-chili/10 text-charcoal/30 hover:text-chili transition-colors duration-200 flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          {/* Qty & Price */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-0 bg-sand/30 rounded-lg overflow-hidden border border-sand/50">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                                className="w-7 h-7 flex items-center justify-center text-xs text-bark hover:bg-cashew/20 transition-colors"
                              >
                                −
                              </button>
                              <span className="w-9 h-7 flex items-center justify-center text-xs font-semibold text-bark bg-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                                className="w-7 h-7 flex items-center justify-center text-xs text-bark hover:bg-cashew/20 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-outfit font-bold text-bark text-sm">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sand p-5 space-y-4 bg-white/50">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span className="font-medium text-charcoal">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-outfit font-bold text-bark">Total</span>
                    <span className="font-outfit font-bold text-xl text-bark">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleWhatsApp}
                  className="btn-whatsapp w-full text-base"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-charcoal/40 hover:text-chili transition-colors duration-200 py-1"
                >
                  Clear entire cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSlideout;
