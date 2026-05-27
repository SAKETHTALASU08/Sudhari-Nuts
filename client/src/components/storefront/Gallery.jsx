import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

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

const GALLERY_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
    alt: 'Raw cashew storage godown',
    title: 'Raw Cashew Storage',
    desc: 'Climate-controlled godowns preserving quality',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=800&fit=crop',
    alt: 'Factory processing line',
    title: 'Processing & Sorting',
    desc: 'State-of-the-art sorting technology',
    span: 'col-span-1 row-span-2 sm:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&h=400&fit=crop',
    alt: 'Premium cashew selection',
    title: 'Quality Grading',
    desc: 'W180 to W400 — graded with precision',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    alt: 'Hygienic packing process',
    title: 'Hygienic Packing',
    desc: 'Buckets and boxes sealed for freshness',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop',
    alt: 'Quality control and certification',
    title: 'FSSAI Certified',
    desc: 'License No: 10126001000035',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=400&fit=crop',
    alt: 'Factory license and documentation',
    title: 'Licensed Factory',
    desc: 'Est. 2000 — Sri Lakshmi Sagar Cashews',
    span: 'col-span-1 row-span-1',
  },
];

const Gallery = () => {
  return (
    <section className="section-padding bg-white" id="gallery">
      <div className="container-app">
        {/* Section Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
              Behind the Scenes
            </span>
            <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2">
              Our Process & Heritage
            </h2>
            <p className="text-charcoal/60 mt-3 max-w-xl mx-auto">
              From raw cashew storage to hygienic packing — a glimpse into our 25+ years of 
              cashew processing excellence at Sri Lakshmi Sagar Cashews.
            </p>
          </div>
        </FadeInSection>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-[250px] sm:auto-rows-[220px]">
          {GALLERY_ITEMS.map((item, i) => (
            <FadeInSection key={item.title} delay={i * 0.08}>
              <div
                className={`relative rounded-2xl overflow-hidden group cursor-pointer h-full ${item.span}`}
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-outfit font-bold text-white text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm font-inter opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-rustic rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Trust badges row */}
        <FadeInSection delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: '🏭', text: 'Est. 2000' },
              { icon: '📋', text: 'FSSAI Certified' },
              { icon: '🥜', text: '11+ Grades' },
              { icon: '🇮🇳', text: 'Made in India' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm text-charcoal/60">
                <span className="text-lg">{badge.icon}</span>
                <span className="font-inter font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Gallery;
