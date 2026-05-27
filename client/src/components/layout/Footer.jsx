import { Link } from 'react-router-dom';
import { ADMIN_WHATSAPP } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-charcoal/95 text-white/80">
      <div className="container-app py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif font-bold text-2xl text-white">
                Sudhari Nuts
              </span>
            </Link>
            <p className="text-xs text-white/40 font-inter mb-3">
              A brand by Sri Lakshmi Sagar Cashews
            </p>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Premium quality cashews processed and packed with care since 2000. 
              Over two decades of trust, quality, and commitment to excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Bulk Orders', path: '/bulk-order' },
                { name: 'Admin Login', path: '/login' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-cashew text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-outfit font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {['Premium Cashews', 'Standard Grade', 'Economy Pack', 'Flavored Range'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      to="/shop"
                      className="text-white/50 hover:text-cashew text-sm transition-colors duration-300"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${ADMIN_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-[#25D366] text-sm transition-colors duration-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  +91 94401 68385
                </a>
              </li>
              <li className="text-white/50 text-sm">
                📧 lakshmisagar@gmail.com
              </li>
              <li>
                <a
                  href="https://share.google/czizkwxkLkKLcGFUw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-cashew text-sm transition-colors duration-300 flex items-start gap-1.5"
                >
                  <span className="mt-0.5">📍</span>
                  <span>Palasa, Kasibugga, Srikakulam Dist., AP 532221</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Manufacturing Details — Sri Lakshmi Sagar Cashews */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-outfit font-semibold text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-rustic/20 rounded-lg flex items-center justify-center text-sm">🏭</span>
                Manufacturing Details
              </h4>
              <div className="space-y-2.5 text-white/40 text-sm leading-relaxed pl-10">
                <p>
                  <span className="text-white/60 font-medium">Manufacturer:</span>{' '}
                  Sri Lakshmi Sagar Cashews (Est. 2000)
                </p>
                <p>
                  <span className="text-white/60 font-medium">Owner:</span>{' '}
                  Talasu Hari Prasad
                </p>
                <p>
                  <span className="text-white/60 font-medium">Address:</span>{' '}
                  <a
                    href="https://share.google/czizkwxkLkKLcGFUw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cashew transition-colors duration-300 underline decoration-white/20 underline-offset-2 hover:decoration-cashew"
                  >
                    Palasa, Kasibugga, Srikakulam District, Andhra Pradesh 532221
                  </a>
                </p>
                <p>
                  <span className="text-white/60 font-medium">Email:</span>{' '}
                  <a href="mailto:lakshmisagar@gmail.com" className="hover:text-cashew transition-colors duration-300">
                    lakshmisagar@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-white/60 font-medium">Phone:</span>{' '}
                  +91 94401 68385
                </p>
                <p>
                  <span className="text-white/60 font-medium">FSSAI License No:</span>{' '}
                  <span className="text-white/60 font-mono">10126001000035</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-outfit font-semibold text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-moss/20 rounded-lg flex items-center justify-center text-sm">📋</span>
                Quality Assurance
              </h4>
              <div className="space-y-2.5 text-white/40 text-sm leading-relaxed pl-10">
                <p>✓ 25+ Years of Cashew Processing Experience</p>
                <p>✓ FSSAI Certified Manufacturing Facility</p>
                <p>✓ Hygienically Processed & Packed</p>
                <p>✓ Multiple Packing Options (Bucket / Box)</p>
                <p>✓ Direct Factory-to-Consumer Supply Chain</p>
                <p>✓ No Artificial Preservatives or Additives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/30 text-xs">
              © 2026 Sudhari Nuts. All rights reserved.
            </p>
            <p className="text-white/20 text-[10px] mt-0.5">
              Manufactured by Sri Lakshmi Sagar Cashews, Palasa, AP — Est. 2000
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-cashew text-xs transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 hover:text-cashew text-xs transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
