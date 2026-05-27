import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import ProductCard from '../components/storefront/ProductCard';
import Gallery from '../components/storefront/Gallery';
import { PRODUCTS, PRODUCT_IMAGES } from '../utils/constants';

const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const premiumProducts = PRODUCTS.filter((p) => p.category === 'Premium').map((p) => ({
    ...p,
    image: PRODUCT_IMAGES[p.name],
  }));

  const features = [
    {
      icon: '🌿',
      title: 'Organic & Natural',
      desc: 'No artificial preservatives or additives. Pure cashew goodness from nature to your table.',
    },
    {
      icon: '🏭',
      title: 'Farm Fresh',
      desc: 'Sourced directly from cashew farms. We ensure freshness at every step of the process.',
    },
    {
      icon: '📦',
      title: 'Free Delivery',
      desc: 'Free doorstep delivery on all orders. Carefully packed to preserve freshness and quality.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* =================== HERO SECTION — Matching Reference Image =================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image — The actual hero image from reference */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.png"
            alt="Premium Cashew Nuts on rustic wooden table with burlap sack and spices"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay for text readability — keeps the organic feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-cream/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-transparent to-charcoal/20" />
        </div>

        {/* Hero Content — positioned like the reference */}
        <div className="relative container-app py-32 sm:py-0">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-bark leading-[1.1] mb-4">
                Premium Cashew
                <br />
                Nuts
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-charcoal/70 text-lg sm:text-xl font-inter leading-relaxed mb-8 max-w-md"
            >
              Premium, organic, appetizing. From our farms to your table — 
              the finest selection of whole, split, and flavored cashews.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/shop" className="btn-primary text-lg px-8 py-4">
                Shop Now
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link to="/bulk-order" className="btn-secondary text-lg px-8 py-4 border-bark/20 hover:border-rustic/40">
                Bulk Orders
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-bark/30 rounded-full flex justify-center"
          >
            <motion.div className="w-1.5 h-3 bg-bark/40 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* =================== FEATURES SECTION =================== */}
      <section className="section-padding bg-cream relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand/30 to-transparent" />
        <div className="container-app">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
                Why Choose Us
              </span>
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2">
                The Sudhari Difference
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, i) => (
              <FadeInSection key={feat.title} delay={i * 0.15}>
                <div className="text-center p-8 rounded-2xl bg-white border border-sand/60 hover:shadow-glass hover:border-jute/40 transition-all duration-500 group">
                  <div className="w-16 h-16 bg-moss/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-moss/15 transition-all duration-500">
                    <span className="text-3xl">{feat.icon}</span>
                  </div>
                  <h3 className="font-outfit font-bold text-lg text-bark mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* =================== BESTSELLERS SECTION =================== */}
      <section className="section-padding bg-white">
        <div className="container-app">
          <FadeInSection>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
              <div>
                <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
                  Top Picks
                </span>
                <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2">
                  Our Bestsellers
                </h2>
              </div>
              <Link
                to="/shop"
                className="btn-secondary text-sm"
              >
                View All Products
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumProducts.map((product, i) => (
              <FadeInSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* =================== GALLERY SECTION =================== */}
      <Gallery />

      {/* =================== BULK ORDERS CTA =================== */}
      <section className="py-16 sm:py-20 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rustic rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-moss rounded-full blur-3xl" />
        </div>
        <div className="container-app relative">
          <FadeInSection>
            <div className="bg-gradient-to-br from-bark via-bark/95 to-charcoal rounded-3xl p-8 sm:p-12 lg:p-16 text-center sm:text-left overflow-hidden relative">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-6 right-6 w-40 h-40 bg-cashew rounded-full blur-3xl" />
                <div className="absolute bottom-6 left-6 w-60 h-60 bg-jute rounded-full blur-3xl" />
              </div>
              <div className="relative flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs font-inter mb-4">
                    🏢 B2B / Wholesale
                  </span>
                  <h2 className="font-outfit font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-3">
                    Need Cashews in Bulk?
                  </h2>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-lg">
                    Get competitive wholesale pricing for your business, restaurant, or retail store. 
                    We offer custom packaging and pan-India delivery for bulk orders.
                  </p>
                </div>
                <Link
                  to="/bulk-order"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-rustic text-white font-outfit font-bold text-lg rounded-xl shadow-rustic hover:shadow-2xl hover:bg-rustic/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
                >
                  Request a Quote
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =================== ABOUT SECTION =================== */}
      <section id="about" className="section-padding bg-white">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-glass-lg">
                  <img
                    src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=500&fit=crop"
                    alt="Cashew Processing"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl shadow-glass-lg p-5 border border-sand/50">
                  <div className="text-center">
                    <p className="font-outfit font-bold text-3xl text-rustic">500+</p>
                    <p className="text-charcoal/50 text-sm font-medium">Happy Customers</p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div>
                <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
                  Our Story
                </span>
                <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2 mb-6">
                  From Farm to Your Table
                </h2>
                <div className="space-y-4 text-charcoal/70 leading-relaxed">
                  <p>
                    Sudhari Nuts began with a simple mission — to bring the freshest, 
                    highest-quality cashews directly from farms to your doorstep, without 
                    any middlemen or compromises.
                  </p>
                  <p>
                    Every cashew we sell goes through a careful selection process. We work 
                    directly with farmers in the cashew heartlands of India, ensuring fair 
                    prices for farmers and premium quality for our customers.
                  </p>
                  <p>
                    From our premium W180 King Cashews to our deliciously spiced Masala 
                    and Pepper varieties, each product is crafted with care and packaged 
                    fresh for maximum flavor and crunch.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-6">
                  {[
                    { num: '11+', label: 'Products' },
                    { num: '4+', label: 'Years' },
                    { num: '100%', label: 'Natural' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-outfit font-bold text-2xl text-rustic">{stat.num}</p>
                      <p className="text-charcoal/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* =================== CTA SECTION =================== */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-rustic-gradient" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>

        <FadeInSection>
          <div className="relative container-app text-center">
            <h2 className="font-outfit font-bold text-3xl sm:text-5xl text-white mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Browse our premium collection and place your order today via WhatsApp.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rustic font-outfit font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Shop Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default Home;
