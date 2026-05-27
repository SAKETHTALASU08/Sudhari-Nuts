import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ADMIN_WHATSAPP, PRODUCTS } from '../utils/constants';

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

const PACKING_OPTIONS = ['Bucket', 'Box', 'Other'];

const BulkOrder = () => {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    packingType: '',
    notes: '',
  });
  // Per-grade selection & quantity: { gradeName: quantityInKg }
  const [gradeQuantities, setGradeQuantities] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const selectedGrades = Object.keys(gradeQuantities);

  const handleGradeToggle = (grade) => {
    setGradeQuantities((prev) => {
      const next = { ...prev };
      if (next[grade] !== undefined) {
        delete next[grade];
      } else {
        next[grade] = '';
      }
      return next;
    });
  };

  const handleGradeQty = (grade, value) => {
    setGradeQuantities((prev) => ({ ...prev, [grade]: value }));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.name &&
    form.phone &&
    form.packingType &&
    selectedGrades.length > 0 &&
    selectedGrades.every((g) => gradeQuantities[g] && Number(gradeQuantities[g]) >= 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    let message = `🏢 *Bulk Order / Quote Request*\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 *Name:* ${form.name}\n`;
    if (form.businessName) {
      message += `🏭 *Business:* ${form.businessName}\n`;
    }
    message += `📱 *Phone:* ${form.phone}\n`;
    message += `📦 *Packing:* ${form.packingType}\n\n`;

    message += `🥜 *Order Details:*\n`;
    message += `─────────────────\n`;
    let totalKg = 0;
    selectedGrades.forEach((grade) => {
      const qty = Number(gradeQuantities[grade]);
      const product = PRODUCTS.find((p) => p.name === grade);
      totalKg += qty;
      message += `  • ${grade} — ${qty} kg`;
      if (product) message += ` (₹${product.price}/kg)`;
      message += `\n`;
    });
    message += `─────────────────\n`;
    message += `⚖️ *Total:* ${totalKg} kg across ${selectedGrades.length} grade(s)\n\n`;

    if (form.notes) {
      message += `📝 *Notes:* ${form.notes}\n\n`;
    }
    message += `Please share your best wholesale pricing. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: '', businessName: '', phone: '', packingType: '', notes: '' });
    setGradeQuantities({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bark via-bark/95 to-roast" />
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 right-10 w-72 h-72 bg-rustic rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <FadeInSection>
          <div className="relative container-app text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-inter border border-white/10 mb-6">
              🏢 B2B / Wholesale
            </span>
            <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-4">
              Bulk Orders &
              <br />
              <span className="text-rustic">Wholesale Pricing</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl font-inter max-w-2xl mx-auto">
              Looking for premium cashews in bulk? Select your grades, specify per-grade quantities, 
              and get competitive pricing instantly via WhatsApp.
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cream to-transparent" />
        <div className="container-app">
          <FadeInSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {[
                { icon: '💰', title: 'Wholesale Pricing', desc: 'Get competitive bulk rates. The more you order, the more you save.' },
                { icon: '🚚', title: 'Pan-India Delivery', desc: 'We deliver across India. Reliable logistics for bulk shipments.' },
                { icon: '🤝', title: 'Dedicated Support', desc: 'Personalized support for repeat orders and custom requirements.' },
              ].map((item, i) => (
                <FadeInSection key={item.title} delay={i * 0.1}>
                  <div className="text-center p-8 rounded-2xl bg-cream/50 border border-sand/50 hover:shadow-glass hover:border-rustic/20 transition-all duration-500 group">
                    <div className="w-16 h-16 bg-rustic/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="font-outfit font-bold text-lg text-bark mb-2">{item.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>

          {/* =================== ADVANCED QUOTE FORM =================== */}
          <FadeInSection>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
                  Get Started
                </span>
                <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2">
                  Request a Quote
                </h2>
                <p className="text-charcoal/60 mt-3">
                  Select your grades, enter per-grade quantities, choose packing type, and submit via WhatsApp.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-8 bg-moss/5 border border-moss/20 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="font-outfit font-bold text-2xl text-bark mb-3">
                    Quote Request Sent!
                  </h3>
                  <p className="text-charcoal/60 mb-6 max-w-md mx-auto">
                    Your request has been sent to our team via WhatsApp. We'll review your 
                    requirements and get back to you with the best wholesale pricing.
                  </p>
                  <button onClick={resetForm} className="btn-primary">
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* ---- Contact Details ---- */}
                  <div className="bg-white rounded-2xl border border-sand/50 p-6 sm:p-8 shadow-glass">
                    <h3 className="font-outfit font-bold text-lg text-bark mb-5 flex items-center gap-2">
                      <span className="w-7 h-7 bg-rustic/10 rounded-lg flex items-center justify-center text-sm">👤</span>
                      Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="bulk-name" className="block text-sm font-inter font-medium text-bark mb-2">
                          Your Name <span className="text-chili">*</span>
                        </label>
                        <input
                          id="bulk-name" type="text" name="name" required
                          value={form.name} onChange={handleChange}
                          placeholder="Enter your full name" className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="bulk-business" className="block text-sm font-inter font-medium text-bark mb-2">
                          Business Name
                        </label>
                        <input
                          id="bulk-business" type="text" name="businessName"
                          value={form.businessName} onChange={handleChange}
                          placeholder="Company or store name" className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="bulk-phone" className="block text-sm font-inter font-medium text-bark mb-2">
                          Phone Number <span className="text-chili">*</span>
                        </label>
                        <input
                          id="bulk-phone" type="tel" name="phone" required
                          value={form.phone} onChange={handleChange}
                          placeholder="+91 98765 43210" className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="bulk-packing" className="block text-sm font-inter font-medium text-bark mb-2">
                          Preferred Packing <span className="text-chili">*</span>
                        </label>
                        <select
                          id="bulk-packing" name="packingType" required
                          value={form.packingType} onChange={handleChange}
                          className="input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%235C3D2E%22%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
                        >
                          <option value="">Select packing type</option>
                          {PACKING_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ---- Grade Selection with Per-Grade Quantities ---- */}
                  <div className="bg-white rounded-2xl border border-sand/50 p-6 sm:p-8 shadow-glass">
                    <h3 className="font-outfit font-bold text-lg text-bark mb-2 flex items-center gap-2">
                      <span className="w-7 h-7 bg-rustic/10 rounded-lg flex items-center justify-center text-sm">🥜</span>
                      Select Grades & Quantities
                    </h3>
                    <p className="text-charcoal/50 text-sm mb-5">
                      Tap a grade to select it, then enter the quantity in kg for each.
                    </p>

                    <div className="space-y-3">
                      {PRODUCTS.map((product) => {
                        const isSelected = gradeQuantities[product.name] !== undefined;
                        return (
                          <div
                            key={product.name}
                            className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                              isSelected
                                ? 'border-rustic bg-rustic/[0.03] shadow-sm'
                                : 'border-sand/70 bg-white hover:border-sand'
                            }`}
                          >
                            {/* Grade row — clickable toggle */}
                            <button
                              type="button"
                              onClick={() => handleGradeToggle(product.name)}
                              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200"
                            >
                              {/* Checkbox */}
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                isSelected ? 'bg-rustic border-rustic' : 'border-charcoal/20 bg-white'
                              }`}>
                                {isSelected && (
                                  <motion.svg
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </motion.svg>
                                )}
                              </div>

                              {/* Grade info */}
                              <div className="flex-1 min-w-0">
                                <span className="font-inter font-semibold text-bark text-sm">{product.name}</span>
                                <span className={`ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  product.category === 'Premium' ? 'bg-rustic/10 text-rustic'
                                    : product.category === 'Standard' ? 'bg-wood/10 text-wood'
                                    : product.category === 'Economy' ? 'bg-moss/10 text-moss'
                                    : 'bg-chili/10 text-chili'
                                }`}>
                                  {product.category}
                                </span>
                              </div>

                              {/* Price */}
                              <span className="font-outfit font-bold text-bark text-sm flex-shrink-0">
                                ₹{product.price}/kg
                              </span>
                            </button>

                            {/* Per-grade quantity input — shown only when selected */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-1 flex items-center gap-3 ml-8">
                                    <label className="text-xs text-charcoal/60 font-medium whitespace-nowrap">
                                      Quantity:
                                    </label>
                                    <div className="relative flex-1 max-w-[200px]">
                                      <input
                                        type="number"
                                        min="1"
                                        value={gradeQuantities[product.name]}
                                        onChange={(e) => handleGradeQty(product.name, e.target.value)}
                                        placeholder="Enter kg"
                                        className="input-field py-2 text-sm pr-10"
                                        required
                                      />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/40 font-medium">
                                        kg
                                      </span>
                                    </div>
                                    {gradeQuantities[product.name] && Number(gradeQuantities[product.name]) > 0 && (
                                      <motion.span
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-xs text-charcoal/50 font-medium"
                                      >
                                        ≈ ₹{(Number(gradeQuantities[product.name]) * product.price).toLocaleString('en-IN')}
                                      </motion.span>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selection summary */}
                    {selectedGrades.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 p-4 bg-cream rounded-xl border border-sand/50"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-charcoal/60">
                            <span className="font-semibold text-bark">{selectedGrades.length}</span> grade(s) selected
                          </span>
                          <span className="font-outfit font-bold text-bark">
                            Total: {selectedGrades.reduce((sum, g) => sum + (Number(gradeQuantities[g]) || 0), 0)} kg
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* ---- Notes ---- */}
                  <div className="bg-white rounded-2xl border border-sand/50 p-6 sm:p-8 shadow-glass">
                    <h3 className="font-outfit font-bold text-lg text-bark mb-5 flex items-center gap-2">
                      <span className="w-7 h-7 bg-rustic/10 rounded-lg flex items-center justify-center text-sm">📝</span>
                      Additional Notes
                    </h3>
                    <textarea
                      id="bulk-notes" name="notes" rows={3}
                      value={form.notes} onChange={handleChange}
                      placeholder="Any special requirements, delivery schedule, custom packaging..."
                      className="input-field resize-none"
                    />
                  </div>

                  {/* ---- Submit ---- */}
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full btn-whatsapp py-4 text-lg font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Request Quote via WhatsApp
                  </button>

                  {!isFormValid && selectedGrades.length > 0 && (
                    <p className="text-center text-xs text-chili/70 -mt-4">
                      Please fill all required fields and enter quantity for each selected grade.
                    </p>
                  )}
                </form>
              )}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* =================== PRICING TABLE =================== */}
      <section className="section-padding bg-cream">
        <div className="container-app">
          <FadeInSection>
            <div className="text-center mb-10">
              <span className="text-rustic font-outfit font-semibold text-sm uppercase tracking-widest">
                Our Range
              </span>
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-bark mt-2">
                Available Grades & Pricing
              </h2>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-sand/50 overflow-hidden shadow-glass">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-bark text-white">
                      <th className="px-6 py-4 text-left font-outfit font-semibold text-sm uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-4 text-left font-outfit font-semibold text-sm uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-right font-outfit font-semibold text-sm uppercase tracking-wider">Price / kg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRODUCTS.map((product, i) => (
                      <tr
                        key={product.id}
                        className={`border-b border-sand/30 transition-colors duration-200 hover:bg-rustic/5 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-cream/30'
                        }`}
                      >
                        <td className="px-6 py-4 font-inter font-semibold text-bark">{product.name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            product.category === 'Premium' ? 'bg-rustic/10 text-rustic'
                              : product.category === 'Standard' ? 'bg-wood/10 text-wood'
                              : product.category === 'Economy' ? 'bg-moss/10 text-moss'
                              : 'bg-chili/10 text-chili'
                          }`}>
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-outfit font-bold text-bark text-lg">
                          ₹{product.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-cream/50 text-center text-sm text-charcoal/50">
                * Wholesale pricing available for orders above 50 kg. Contact us for custom rates.
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default BulkOrder;
