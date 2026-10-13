import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { PageTab } from '../types';

interface AdSlotProps {
  placement: 'header_banner' | 'content_mid' | 'sidebar' | 'footer_banner';
  onOpenAdSenseGuide?: (tab: PageTab) => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, onOpenAdSenseGuide }) => {
  const getDimensions = () => {
    switch (placement) {
      case 'header_banner':
        return 'min-h-[90px] max-w-4xl';
      case 'content_mid':
        return 'min-h-[100px] max-w-3xl';
      case 'sidebar':
        return 'min-h-[250px] max-w-xs';
      case 'footer_banner':
        return 'min-h-[90px] max-w-4xl';
      default:
        return 'min-h-[90px] max-w-3xl';
    }
  };

  return (
    <div className={`mx-auto w-full my-6 px-4 ${getDimensions()}`}>
      <div className="border border-dashed border-slate-300 bg-slate-50/80 rounded-xl p-4 text-center flex flex-col items-center justify-center relative overflow-hidden transition-all hover:border-slate-400">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          <Info className="w-3.5 h-3.5" />
          <span>Advertisement Space · Separate from Action Controls</span>
        </div>

        <p className="text-xs text-slate-600 max-w-md">
          Compliant Google AdSense slot reserved. Once your AdSense publisher account is approved, insert your <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono text-slate-800">&lt;ins class=&quot;adsbygoogle&quot;&gt;</code> script here.
        </p>

        {onOpenAdSenseGuide && (
          <button
            onClick={() => onOpenAdSenseGuide('adsense-guide')}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 hover:underline focus:outline-none"
          >
            <span>Read AdSense Setup & Monetization Guide</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
