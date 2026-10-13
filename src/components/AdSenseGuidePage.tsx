import React, { useState } from 'react';
import { DollarSign, AlertCircle, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

export const AdSenseGuidePage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Website Monetization Blueprint</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Connect Google AdSense & Earn Revenue
          </h1>
          <p className="mt-3 text-base text-slate-600">
            A comprehensive, policy-compliant publisher guide on getting approved by Google AdSense and placing ads safely without getting banned.
          </p>
        </div>

        {/* Golden Rule Warning Callout */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 mb-10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Crucial Google AdSense Policy Rule: Avoid Accidental Clicks
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                Google strictly penalizes websites that place banner ads directly adjacent to functional &quot;Upload&quot; or &quot;Download&quot; buttons. In BG Remove AI, all advertisement spaces are kept in clearly labeled, isolated sections with explicit &quot;Advertisement&quot; markers to ensure 100% adherence to Google Publisher Policies.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-step publisher guide */}
        <div className="space-y-10">
          {/* Phase 1: Prerequisites */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <span>AdSense Approval Prerequisites Checklist</span>
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Before submitting your website to Google AdSense, make sure all the following standards are satisfied:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom top-level domain (.com, .net, .ai, .io)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Original educational guides & photography articles</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Working Privacy Policy (already included)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terms of Use & Contact Us pages (already included)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fully mobile responsive design (already included)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero broken links or non-functioning mock buttons</span>
              </div>
            </div>
          </div>

          {/* Phase 2: Sign Up */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>Submit Your Site at Google AdSense</span>
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li>Visit <a href="https://www.google.com/adsense/start/" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline inline-flex items-center gap-1">google.com/adsense <ExternalLink className="w-3 h-3" /></a> and sign in with your Google account.</li>
              <li>Click <strong>&quot;Sites&quot;</strong> in the left sidebar, then click <strong>&quot;Add site&quot;</strong>.</li>
              <li>Enter your website URL (for example: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">https://yourdomain.com</code>).</li>
              <li>Google will generate your unique Publisher ID in the format: <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">ca-pub-XXXXXXXXXXXXXXXX</code>.</li>
            </ol>
          </div>

          {/* Phase 3: Insert Code in index.html */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>Insert Your AdSense Script into index.html</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
              Open your project&apos;s <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">index.html</code> file and paste your AdSense verification script inside the <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">&lt;head&gt;</code> section:
            </p>

            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto mb-3">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>index.html</span>
                <button
                  onClick={() => copySnippet('<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>', 'script')}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedCode === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'script' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code>
                &lt;!-- Google AdSense Tag (Replace with your actual ca-pub ID) --&gt;<br />
                &lt;script async src=&quot;https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;
              </code>
            </div>
          </div>

          {/* Phase 4: Setting up ads.txt */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                4
              </span>
              <span>Configure Your ads.txt File</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
              Google requires an authorized digital seller file (<code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">ads.txt</code>) placed in your public root folder. We have already pre-created <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">public/ads.txt</code>. Simply replace the placeholder with your publisher ID:
            </p>

            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto mb-3">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>public/ads.txt</span>
                <button
                  onClick={() => copySnippet('google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0', 'adstxt')}
                  className="hover:text-white flex items-center gap-1"
                >
                  {copiedCode === 'adstxt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'adstxt' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <code>google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0</code>
            </div>
            <p className="text-xs text-slate-500">
              You can verify it by visiting <code className="bg-slate-100 px-1 rounded font-mono">https://yourdomain.com/ads.txt</code> in your browser.
            </p>
          </div>

          {/* Phase 5: Ad Unit Implementation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                5
              </span>
              <span>Inserting Live Ad Units into AdSlot.tsx</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
              Once approved (usually 3 to 14 days), go to <strong>AdSense &gt; Ads &gt; By ad unit</strong>, create a &quot;Responsive Display Ad&quot;, and replace the placeholder inside <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-slate-800">src/components/AdSlot.tsx</code> with:
            </p>

            <div className="relative bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <code>
                &lt;ins class=&quot;adsbygoogle&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;style=&#123;&#123; display: &apos;block&apos; &#125;&#125;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data-ad-client=&quot;ca-pub-XXXXXXXXXXXXXXXX&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data-ad-slot=&quot;1234567890&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data-ad-format=&quot;auto&quot;<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data-full-width-responsive=&quot;true&quot;&gt;&lt;/ins&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
