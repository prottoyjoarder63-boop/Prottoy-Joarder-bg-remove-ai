import React from 'react';
import { ShieldCheck, Lock, EyeOff, ServerOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>GDPR & CCPA Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: October 2026 · Effective Immediately
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-emerald-900">
                Core Privacy Guarantee: Zero Remote Image Processing
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                BG Remove AI does not transmit, upload, or store your photos on any external web server. All image decoding and neural segmentation algorithms run locally within your web browser’s memory.
              </p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike conventional cloud SaaS applications, we do not require you to register an account, provide your name, or upload your media to remote cloud buckets (such as Amazon S3 or Google Cloud Storage). Your photos are read using the HTML5 File API and processed via WebAssembly in volatile RAM.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            2. Local Browser Storage & Caching
          </h2>
          <p>
            To prevent re-downloading the neural network model weights (~20MB) upon every visit, your browser may save the static WebAssembly compiled binaries in standard browser caches (CacheStorage / IndexedDB). No user images, personal telemetry, or browsing history are stored in this cache.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            3. Google AdSense & Third-Party Cookies
          </h2>
          <p>
            We may partner with third-party advertising networks, including <strong>Google AdSense</strong>, to serve advertisements when you visit our website. These companies may use cookies, web beacons, and similar technologies to measure ad effectiveness and serve advertisements based on your prior visits to this website or other websites on the internet.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-blue-600 underline">Google Ads Settings</a>.</li>
            <li>Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-600 underline">www.aboutads.info</a>.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            4. Web Server Access Logs
          </h2>
          <p>
            Standard web hosting infrastructure (e.g., Cloudflare, Vercel, or Netlify) automatically generates standard server logs recording IP addresses, browser types, referring pages, and access timestamps to ensure uptime, network security, and DDoS protection. These logs do not contain user images or identifying metadata.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            5. Contact Information
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or your privacy rights, contact our Data Protection Officer at: <strong className="text-slate-900">privacy@bgremove.ai</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
