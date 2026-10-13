import React from 'react';
import { Scale, CheckCircle2, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const LicenseGuidePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Open Source & Legal Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Software Licenses & Commercial Use Guide
          </h1>
          <p className="mt-3 text-base text-slate-600">
            A comprehensive breakdown of all software licenses, open-source dependencies, and legal requirements for commercial usage.
          </p>
        </div>

        <div className="space-y-8">
          {/* Summary Box */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
            <h2 className="text-base font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Can I Legally Use BG Remove AI for Commercial Purposes?</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
              <strong>Yes.</strong> You have full commercial rights to use the background-removed output images for your business, e-commerce stores, client projects, and advertising. Furthermore, the website codebase itself is built on permissive open-source licenses (MIT and Apache 2.0).
            </p>
          </div>

          {/* Software Component Breakdown */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              1. Open Source Licenses in the Technology Stack
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Application Codebase & UI Components
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    MIT License
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Permits free use, copying, modification, merging, publishing, distribution, and sublicensing for both personal and commercial projects, with no royalty requirements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    ONNX Runtime Web Inference Engine
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    MIT / Apache 2.0 License
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Developed by Microsoft and the ONNX Open Consortium. Licensed under the permissive MIT/Apache 2.0 licenses, allowing client-side execution in commercial web browsers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Neural Matting Network (IS-Net / DIS)
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Permissive Open Weights
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  The underlying dichotomous image segmentation weights are publicly available for high-accuracy background matting.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Checklist for Commercial Work */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              2. Commercial Use Checklist
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>E-Commerce Sellers:</strong> You may freely use cutouts for Amazon, Shopify, eBay, and Etsy listings. Ensure you own the rights to the product photograph.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Agency & Freelance Designers:</strong> You may deliver transparent PNGs and composites directly to paying clients without attributing BG Remove AI.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Print-on-Demand (POD):</strong> You may print isolated designs on T-shirts, mugs, and posters, provided the underlying artwork is your original creation or licensed.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
