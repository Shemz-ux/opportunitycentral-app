import { Link } from "react-router";
import { Compass } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-20">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Newsletter Section */}
        <div className="mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[48px] md:text-[56px] leading-[1.1] mb-8">
              <span className="font-light text-white">Subscribe to the</span>
              <br />
              <span className="font-light text-white">newsletter.</span>
            </h2>
            <p className="text-base text-gray-400 mb-8 leading-relaxed">
              Stay Up To Date On Our Latest Product Releases, Be First To Find
              Out About Upcoming Launch Dates, And Get Free Insight On Branding
              Strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40"
              />

              <button to="/newsletter" className="px-8 py-4 bg-white text-[#0A0A0A] rounded-full hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
              {/* TODO: Add newsletter subscription functionality + success when submitted */}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#0A0A0A]" />
              </div>
              <span className="text-xl font-light">Opportunity Central</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Transforming talent development through innovative programs and
              strategic consulting services.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-normal mb-6">Pages</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-normal mb-6">Social Media</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Opportunity Central. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <p>Website powered by SD Studios</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
