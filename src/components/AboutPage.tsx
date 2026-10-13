import React from 'react';
import { Layers, ShieldCheck, Heart, Sparkles, Cpu, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Our Mission & Story</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About BG Remove AI
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Democratizing professional computer vision through privacy-first, client-side web technology.
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-50/50 border border-blue-100 text-slate-800">
            <h2 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Why We Built BG Remove AI</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              For years, removing backgrounds from images required either expensive desktop software subscriptions (like Adobe Photoshop) or closed cloud SaaS platforms that charge up to $1.00 per processed image while secretly uploading private photos to remote database servers. We believed there had to be a better, more ethical way.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 pt-2">
            The Revolution of In-Browser AI
          </h3>
          <p>
            With the advent of WebAssembly (WASM), WebGPU, and quantized ONNX neural networks, our modern personal computers and smartphones possess immense computing capability. By bringing deep segmentation neural networks directly into the web browser, BG Remove AI eliminates server costs entirely.
          </p>
          <p>
            This allows us to offer 100% free, unmetered background removal with zero sign-ups and total data privacy: your personal and sensitive commercial images are processed purely in local system memory and never transit over the internet.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">100% Free Forever</h4>
              <p className="text-xs text-slate-600">
                No paywalls, subscription models, or deceptive trial credits. Free for individuals, educators, and businesses.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Zero Data Storage</h4>
              <p className="text-xs text-slate-600">
                We do not maintain image databases. Zero cloud storage means zero risk of data leaks or unauthorized data mining.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Eco-Friendly AI</h4>
              <p className="text-xs text-slate-600">
                By removing centralized GPU server clusters, we prevent unnecessary carbon emissions from idling data center infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
