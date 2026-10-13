import React, { useState, useRef } from 'react';
import { PageTab, ProcessedImageItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroRemover } from './components/HeroRemover';
import { ResultWorkspace } from './components/ResultWorkspace';
import { SampleShowcase } from './components/SampleShowcase';
import { HowItWorksPage } from './components/HowItWorksPage';
import { EducationalSection } from './components/EducationalSection';
import { FAQSection } from './components/FAQSection';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { HostingGuidePage } from './components/HostingGuidePage';
import { AdSenseGuidePage } from './components/AdSenseGuidePage';
import { LicenseGuidePage } from './components/LicenseGuidePage';
import { AdSlot } from './components/AdSlot';
import { Footer } from './components/Footer';
import { SAMPLE_IMAGES } from './data/sampleImages';
import { processImageBackground, getImageDimensions } from './services/imageProcessor';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [processedItem, setProcessedItem] = useState<ProcessedImageItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const handleProcessComplete = (item: ProcessedImageItem) => {
    setProcessedItem(item);
    setCurrentTab('home');
    // Scroll smoothly to workspace
    setTimeout(() => {
      workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTriggerUpload = () => {
    if (currentTab !== 'home') {
      setCurrentTab('home');
    }
    fileInputRef.current?.click();
  };

  const handleSelectSampleFromShowcase = async (sampleIndex: number) => {
    const sample = SAMPLE_IMAGES[sampleIndex];
    if (!sample) return;

    setCurrentTab('home');
    try {
      const res = await fetch(sample.url);
      const blob = await res.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: blob.type || 'image/jpeg' });
      const dims = await getImageDimensions(file);

      // Start processing immediately
      const result = await processImageBackground(file, 'neural_ai');
      const resultUrl = URL.createObjectURL(result.blob);

      const completedItem: ProcessedImageItem = {
        id: sample.id,
        name: `${sample.title}.jpg`,
        originalFile: file,
        originalUrl: sample.url,
        resultBlob: result.blob,
        resultUrl: resultUrl,
        width: dims.width,
        height: dims.height,
        originalSize: file.size,
        resultSize: result.blob.size,
        status: 'done',
        progressPercentage: 100,
        progressMessage: 'Completed!',
        engineUsed: result.engineUsed,
      };

      setProcessedItem(completedItem);
      setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Failed to process sample from showcase:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onTriggerUpload={handleTriggerUpload}
      />

      {/* Main body content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            {/* If an image was processed, display result workspace prominently */}
            {processedItem && (
              <div ref={workspaceRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <ResultWorkspace
                  item={processedItem}
                  onReset={() => {
                    setProcessedItem(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* Hero remover tool (upload dropzone, samples, engine switcher) */}
            <HeroRemover
              onProcessComplete={handleProcessComplete}
              fileInputRef={fileInputRef}
            />

            {/* Separated compliant Google AdSense Space (Header / Mid Section) */}
            <AdSlot placement="content_mid" onOpenAdSenseGuide={setCurrentTab} />

            {/* Sample Showcase & use cases */}
            <SampleShowcase onSelectSample={handleSelectSampleFromShowcase} />

            {/* Educational Section highlight */}
            <EducationalSection />

            {/* Separated compliant Google AdSense Space (Pre-FAQ section) */}
            <AdSlot placement="footer_banner" onOpenAdSenseGuide={setCurrentTab} />

            {/* Frequently Asked Questions */}
            <FAQSection />
          </div>
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage
            onGoToRemover={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPage={setCurrentTab}
          />
        )}

        {currentTab === 'education' && (
          <div>
            <EducationalSection />
            <AdSlot placement="footer_banner" onOpenAdSenseGuide={setCurrentTab} />
          </div>
        )}

        {currentTab === 'faq' && <FAQSection />}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'privacy' && <PrivacyPage />}

        {currentTab === 'terms' && <TermsPage />}

        {currentTab === 'hosting-guide' && <HostingGuidePage />}

        {currentTab === 'adsense-guide' && <AdSenseGuidePage />}

        {currentTab === 'licenses' && <LicenseGuidePage />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setCurrentTab} />
    </div>
  );
}
