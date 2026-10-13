import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Download, 
  Layers, 
  Lock, 
  Globe, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PageTab } from '../types';

interface HowItWorksPageProps {
  onGoToRemover: () => void;
  onOpenPage: (page: PageTab) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onGoToRemover, onOpenPage }) => {
  const steps = [
    {
      num: '01',
      title: 'Local Client-Side Image Ingestion',
      description:
        'When you drop an image into BG Remove AI, your browser decodes the file directly into HTML5 canvas memory. Unlike traditional web converters, not a single byte of your photo leaves your computer or phone.',
      icon: Lock,
    },
    {
      num: '02',
      title: 'In-Browser Neural Tensor Inference',
      description:
        'The app loads the IS-Net deep learning model through WebAssembly (WASM) and ONNX Runtime Web. Inference runs on your device graphics chip (WebGPU/WebGL) or multi-threaded CPU for instant saliency detection.',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Dichotomous Segmentation & Edge Matting',
      description:
        'The neural network predicts pixel-level probability masks, isolating complex foregrounds like flyaway hair strands, clothing textures, and transparent glasses from cluttered backdrops with sub-pixel precision.',
      icon: Layers,
    },
    {
      num: '04',
      title: 'Instant Alpha Channel & PNG Compositing',
      description:
        'The computed alpha matte is merged with the original color buffers. You can preview with our interactive before/after split slider, swap in clean white for Amazon listings, or export lossless transparent PNGs.',
      icon: Download,
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Architecture & Technology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How Browser-Based AI Background Removal Works
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Discover why running computer vision locally in the browser provides unmatched privacy, instantaneous response times, and zero operational fees.
          </p>
        </div>

        {/* 4 Steps timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-blue-600 px-2 py-0.5 rounded bg-blue-100">
                    Step {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white text-slate-700 border border-slate-200 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Why In-Browser AI Wins Over Cloud APIs
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Comparing client-side WebAssembly against traditional paid SaaS background removers
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Metric</th>
                  <th className="py-3 px-4 text-blue-700 bg-blue-50/50">BG Remove AI (Client-Side)</th>
                  <th className="py-3 px-4 text-slate-500">Traditional Cloud Services (SaaS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 text-xs sm:text-sm">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Data Privacy</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/20 font-medium">
                    100% Private (never leaves your browser RAM)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Transferred across internet to 3rd-party servers
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Pricing & Usage Limits</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/20 font-medium">
                    100% Free & Unlimited (no credit card or signup)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    $0.20 - $1.00 per image or monthly subscription
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Execution Speed</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/20 font-medium">
                    Instant (model cached locally in browser cache)
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Subject to upload latency and queue congestion
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Carbon & Server Footprint</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/20 font-medium">
                    Zero server GPU emissions; powered on-demand
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Heavy data center electricity consumption
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">Commercial Use Rights</td>
                  <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/20 font-medium">
                    Allowed for personal, e-commerce, and agency work
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    Restricted by tier or enterprise license agreements
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-10 text-white text-center shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Ready to test in-browser background removal?
          </h3>
          <p className="text-blue-100 text-sm max-w-xl mx-auto mb-6">
            Upload your first photo or try one of our instant sample images. No software installation or accounts required.
          </p>
          <button
            onClick={onGoToRemover}
            className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Launch Remover Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
