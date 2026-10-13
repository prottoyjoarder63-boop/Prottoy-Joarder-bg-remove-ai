import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is BG Remove AI completely free to use?',
      a: 'Yes, 100% free with no hidden charges, subscription tiers, daily quota limits, or watermarks. Because the AI model runs locally inside your web browser using WebAssembly rather than expensive remote GPU servers, we do not incur server processing costs for your images.',
    },
    {
      q: 'Are my private photos uploaded or stored on any server?',
      a: 'Never. Your photos never leave your device. All neural network tensor computation happens directly inside your browser’s local memory (RAM) and graphics card (WebGL/WebGPU). Once you close or refresh your tab, memory is cleared.',
    },
    {
      q: 'Can I legally use the cutouts for commercial projects?',
      a: 'Yes. You retain full copyright ownership of your source imagery and the resulting background-removed transparent PNGs. You are completely free to use them for e-commerce listings (Amazon, Shopify, Etsy), client design deliverables, social media marketing, and commercial advertising.',
    },
    {
      q: 'What image formats and file sizes are supported?',
      a: 'We support all major web and camera formats: JPG, JPEG, PNG, and modern WEBP files. You can upload photos up to 30 megabytes and up to 4K+ resolutions without arbitrary downscaling.',
    },
    {
      q: 'Why does the very first image take a few seconds to load?',
      a: 'During your first removal session, your browser downloads the lightweight AI model weights (~20MB) and compiles the WebAssembly inference engine. Once loaded, the model is cached in your browser cache so subsequent images process almost instantly without re-downloading.',
    },
    {
      q: 'Does it work smoothly on mobile devices and tablets?',
      a: 'Yes. The interface is completely responsive and optimized for touch interactions on mobile browsers including Safari for iOS and Google Chrome for Android.',
    },
    {
      q: 'How can I replace the background with a pure white color for Amazon?',
      a: 'In the result workspace, simply click "Pure White (Shopify/Amazon)" under Backdrop Options. This sets the background to standard studio RGB(255, 255, 255) as required by marketplace seller guidelines.',
    },
    {
      q: 'How can I host this website on my own domain and monetize with AdSense?',
      a: 'You can host this entire site for free on platforms like Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Check our "Hosting Guide" and "AdSense Guide" tabs in the navigation bar for step-by-step instructions designed for beginners.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Got Questions? We Have Answers.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Everything you need to know about browser-based AI background removal, privacy guarantees, and commercial usage.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
