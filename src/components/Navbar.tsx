import React, { useState } from 'react';
import { Layers, Menu, X, ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onTriggerUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onTriggerUpload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ label: string; tab: PageTab }> = [
    { label: 'How It Works', tab: 'how-it-works' },
    { label: 'Guides & Tips', tab: 'education' },
    { label: 'FAQ', tab: 'faq' },
    { label: 'About', tab: 'about' },
    { label: 'Commercial & Ads', tab: 'adsense-guide' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 block leading-tight">
              BG Remove AI
            </span>
            <span className="text-[11px] text-slate-500 font-medium block">
              100% In-Browser Privacy
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentTab === link.tab;
            return (
              <button
                key={link.tab}
                onClick={() => handleNavClick(link.tab)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-blue-600 border-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 border-transparent'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (currentTab !== 'home') {
                onSelectTab('home');
              }
              onTriggerUpload();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <span>Upload Image</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              if (currentTab !== 'home') onSelectTab('home');
              onTriggerUpload();
            }}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
              currentTab === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home / Remover
          </button>
          {navLinks.map((link) => (
            <button
              key={link.tab}
              onClick={() => handleNavClick(link.tab)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                currentTab === link.tab
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-500">
            <button
              onClick={() => handleNavClick('privacy')}
              className="text-left px-3 py-1 hover:text-slate-900"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavClick('terms')}
              className="text-left px-3 py-1 hover:text-slate-900"
            >
              Terms of Use
            </button>
            <button
              onClick={() => handleNavClick('hosting-guide')}
              className="text-left px-3 py-1 hover:text-slate-900"
            >
              Hosting Guide
            </button>
            <button
              onClick={() => handleNavClick('licenses')}
              className="text-left px-3 py-1 hover:text-slate-900"
            >
              Licenses & Legal
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-1 hover:text-slate-900 col-span-2 text-blue-600 font-medium"
            >
              Contact & Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
