import React from 'react';
import { Layers, ShieldCheck, Heart } from 'lucide-react';
import { PageTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (tab: PageTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand and privacy statement */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                BG Remove AI
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              100% Free browser-based AI background removal. Powered by client-side neural networks for complete user privacy and instant transparent PNG exports.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Server Uploads</span>
            </div>
          </div>

          {/* Product & features */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Application & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Background Remover
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-blue-600 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('education')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Educational Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('faq')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Publishers & Hosting */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Webmaster & Publisher
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('hosting-guide')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Free Hosting Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('adsense-guide')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Google AdSense Setup
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('licenses')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Licenses & Commercial Rights
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy (GDPR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} BG Remove AI. Open Source & Free for Commercial Use.</p>
          <div className="flex items-center gap-4">
            <span>Powered by WebAssembly & ONNX Runtime</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
