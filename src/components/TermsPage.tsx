import React from 'react';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: October 2026 · Please read carefully before using BG Remove AI
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the BG Remove AI website and browser tools, you agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue using the service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            2. Intellectual Property & Ownership of Content
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <p className="font-semibold text-slate-900 text-sm">
              You Own 100% of Your Images and Output
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              BG Remove AI makes no claim of ownership or intellectual property rights over any images, graphics, or content you process through this website. You retain complete and unencumbered copyright over your source files and any resulting transparent PNG files created using the tool.
            </p>
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            3. Commercial & Personal Use Grant
          </h2>
          <p>
            You are granted a royalty-free, worldwide license to use the background-removed output images for any lawful commercial, personal, educational, or artistic purpose. This includes selling products on Amazon, Shopify, eBay, Etsy, printing physical merchandise, and delivering client agency projects.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            4. Acceptable Use Policy
          </h2>
          <p>
            You agree not to use the application to process, generate, or distribute:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            <li>Content that infringes on third-party trademarks, copyrights, or privacy rights without proper authorization.</li>
            <li>Unlawful, harassing, defamatory, or abusive imagery.</li>
            <li>Any automated scripts or scraping tools designed to degrade site performance for other users.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            5. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p>
            The software and in-browser AI processing are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. In no event shall BG Remove AI or its contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4">
            6. Modifications to Service
          </h2>
          <p>
            We reserve the right to update, modify, or discontinue features of the website at any time without prior notice. Continued use of the website following any changes signifies your acceptance of the revised Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
};
