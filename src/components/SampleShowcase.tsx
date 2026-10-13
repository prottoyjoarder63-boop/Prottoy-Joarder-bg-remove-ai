import React from 'react';
import { Camera, ShoppingBag, Sparkles, Feather, ArrowRight } from 'lucide-react';
import { SAMPLE_IMAGES } from '../data/sampleImages';

interface SampleShowcaseProps {
  onSelectSample: (index: number) => void;
}

export const SampleShowcase: React.FC<SampleShowcaseProps> = ({ onSelectSample }) => {
  const useCases = [
    {
      title: 'E-Commerce & Amazon Listings',
      description: 'Isolate products on clean white backdrops to satisfy Amazon, eBay, and Shopify seller guidelines.',
      icon: ShoppingBag,
    },
    {
      title: 'Portraits & Profile Avatars',
      description: 'Accurately segment fine flyaway hair and headshots for LinkedIn resumes and professional portfolios.',
      icon: Camera,
    },
    {
      title: 'Pets & Complex Textures',
      description: 'Preserve whiskers, intricate cat and dog fur, and fine edges without harsh jagged cut lines.',
      icon: Feather,
    },
    {
      title: 'Marketing Collateral & Banners',
      description: 'Create transparent assets ready to drop into Canva, Figma, social media posts, and YouTube thumbnails.',
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Engineered for Precision Across Every Subject
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Trained on high-resolution dichotomous segmentation datasets to separate complex silhouettes from intricate backgrounds.
          </p>
        </div>

        {/* Feature cards bento */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {useCases.map((useCase, idx) => {
            const IconComponent = useCase.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Before / After Showcase Cards */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Curated Demo Comparisons
              </h3>
              <p className="text-xs text-slate-500">
                Click any asset to load it into the background remover workspace.
              </p>
            </div>
            <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
              <span>Interactive Previews</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SAMPLE_IMAGES.map((sample, index) => (
              <div
                key={sample.id}
                onClick={() => onSelectSample(index)}
                className="group cursor-pointer rounded-xl bg-white border border-slate-200 p-3 hover:border-blue-500 hover:shadow-xs transition-all text-left"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-3 relative">
                  <img
                    src={sample.url}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-white/95 text-xs font-semibold text-blue-700 shadow-xs">
                      Process in App
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                    {sample.title}
                  </span>
                  <span className="text-[11px] text-slate-500 shrink-0">
                    {sample.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {sample.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
