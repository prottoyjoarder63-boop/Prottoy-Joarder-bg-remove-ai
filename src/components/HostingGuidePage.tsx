import React, { useState } from 'react';
import { Globe, Server, Terminal, CheckCircle2, ArrowRight, Copy, Check } from 'lucide-react';

export const HostingGuidePage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Beginner-Friendly Deployment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Host BG Remove AI for Free
          </h1>
          <p className="mt-3 text-base text-slate-600">
            A step-by-step guide for beginners with zero coding experience. Publish this website worldwide on custom domains at zero hosting cost.
          </p>
        </div>

        {/* Step-by-step walkthrough */}
        <div className="space-y-10">
          {/* Step 1: Local Setup */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Test and Run Locally on Your Computer
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              If you have Node.js installed, you can start the development server with just two terminal commands:
            </p>
            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto mb-4">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>Terminal / Command Prompt</span>
                <button
                  onClick={() => copyCode('npm install\nnpm run dev', 1)}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code>
                # 1. Install dependencies<br />
                npm install<br /><br />
                # 2. Launch local dev server<br />
                npm run dev
              </code>
            </div>
            <p className="text-xs text-slate-500">
              Open <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">http://localhost:3000</code> in your browser to test background removal.
            </p>
          </div>

          {/* Step 2: Build for Production */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Build the Static Web Assets
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              To prepare the website for free hosting, bundle the project into optimized HTML, JS, and CSS files:
            </p>
            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto mb-4">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>Terminal</span>
                <button
                  onClick={() => copyCode('npm run build', 2)}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code>npm run build</code>
            </div>
            <p className="text-xs text-slate-500">
              This outputs a standalone production folder called <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">dist/</code> that can be hosted on any static hosting provider.
            </p>
          </div>

          {/* Step 3: Free Hosting Options */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                Choose a Free Hosting Provider
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Because BG Remove AI runs client-side in the visitor&apos;s browser, you do not need expensive GPU servers or database backends. Any free static host works perfectly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Option A: Vercel (Recommended)</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  1. Push your code to GitHub.<br />
                  2. Go to <strong>vercel.com</strong> and click &quot;Add New Project&quot;.<br />
                  3. Select your repository. Framework preset automatically detects Vite.<br />
                  4. Click <strong>Deploy</strong>. In 30 seconds, your site is live with a free SSL certificate.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Option B: Netlify</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  1. Visit <strong>netlify.com</strong> and sign up for free.<br />
                  2. Drag and drop your generated <code className="bg-slate-100 px-1 rounded">dist/</code> folder directly into the Netlify dashboard.<br />
                  3. Netlify will deploy it immediately with free custom domain support.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Option C: Cloudflare Pages</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  1. Go to <strong>pages.cloudflare.com</strong>.<br />
                  2. Connect your Git repository.<br />
                  3. Set Build command to <code className="bg-slate-100 px-1 rounded">npm run build</code> and Build directory to <code className="bg-slate-100 px-1 rounded">dist</code>.<br />
                  4. Enjoy completely unlimited global bandwidth and DDoS protection.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Option D: GitHub Pages</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  1. Go to your repository Settings &gt; Pages.<br />
                  2. Enable GitHub Actions workflow for Vite.<br />
                  3. Your site publishes at <code className="bg-slate-100 px-1 rounded">username.github.io/repo</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: Connecting a custom domain */}
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/60 border border-blue-200">
            <h3 className="text-base font-bold text-blue-950 mb-2">
              Connecting Your Own Custom Domain (.com / .ai / .net)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              To build a professional brand or qualify for Google AdSense, register a custom domain (e.g., from Namecheap, Porkbun, or Google Domains / Squarespace) and point the DNS records:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
              <li><strong>CNAME Record</strong>: Host <code className="bg-blue-100 px-1 rounded font-mono">www</code> points to <code className="bg-blue-100 px-1 rounded font-mono">cname.vercel-dns.com</code> (or Netlify/Cloudflare equivalent).</li>
              <li><strong>A Record</strong>: Host <code className="bg-blue-100 px-1 rounded font-mono">@</code> points to your host&apos;s IP address (e.g. <code className="bg-blue-100 px-1 rounded font-mono">76.76.21.21</code> for Vercel).</li>
              <li>SSL (HTTPS) will automatically provision within 10-30 minutes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
