import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2,
  FileImage,
  Cpu
} from 'lucide-react';
import { ProcessedImageItem, ProcessorEngine, SampleImage } from '../types';
import { processImageBackground, getImageDimensions } from '../services/imageProcessor';
import { SAMPLE_IMAGES } from '../data/sampleImages';

interface HeroRemoverProps {
  onProcessComplete: (item: ProcessedImageItem) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const HeroRemover: React.FC<HeroRemoverProps> = ({
  onProcessComplete,
  fileInputRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [engine, setEngine] = useState<ProcessorEngine>('neural_ai');
  const [activeItem, setActiveItem] = useState<ProcessedImageItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Global paste handler (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileSelect(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [engine]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcess(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcess(file);
    }
    // reset input so re-selecting same file triggers change
    e.target.value = '';
  };

  const validateAndProcess = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setErrorMessage('Please upload a valid JPG, JPEG, PNG, or WEBP image file.');
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 30MB limit. Please upload a smaller file.');
      return;
    }
    setErrorMessage(null);
    handleFileSelect(file);
  };

  const handleFileSelect = async (file: File) => {
    try {
      const dims = await getImageDimensions(file);
      const url = URL.createObjectURL(file);

      const newItem: ProcessedImageItem = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        originalFile: file,
        originalUrl: url,
        width: dims.width,
        height: dims.height,
        originalSize: file.size,
        status: 'loading_model',
        progressPercentage: 10,
        progressMessage: 'Initializing AI model in browser...',
      };

      setActiveItem(newItem);
      runProcessing(newItem, file);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Could not read image file.');
      setActiveItem(null);
    }
  };

  const handleSampleClick = async (sample: SampleImage) => {
    setErrorMessage(null);
    try {
      setActiveItem({
        id: sample.id,
        name: `${sample.title}.jpg`,
        originalUrl: sample.url,
        width: 1024,
        height: 1024,
        originalSize: 450000,
        status: 'loading_model',
        progressPercentage: 15,
        progressMessage: 'Loading sample image...',
      });

      // Fetch the sample asset as blob
      const res = await fetch(sample.url);
      const blob = await res.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: blob.type || 'image/jpeg' });
      const dims = await getImageDimensions(file);

      const item: ProcessedImageItem = {
        id: sample.id,
        name: `${sample.title}.jpg`,
        originalFile: file,
        originalUrl: sample.url,
        width: dims.width,
        height: dims.height,
        originalSize: file.size,
        status: 'loading_model',
        progressPercentage: 20,
        progressMessage: 'Starting background removal...',
      };

      setActiveItem(item);
      runProcessing(item, file);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to load sample image.');
      setActiveItem(null);
    }
  };

  const runProcessing = async (item: ProcessedImageItem, file: File) => {
    try {
      const result = await processImageBackground(
        file,
        engine,
        (percentage, statusText) => {
          setActiveItem((prev) =>
            prev
              ? {
                  ...prev,
                  progressPercentage: percentage,
                  progressMessage: statusText,
                  status: percentage > 70 ? 'refining' : 'segmenting',
                }
              : null
          );
        }
      );

      const resultUrl = URL.createObjectURL(result.blob);
      const completedItem: ProcessedImageItem = {
        ...item,
        resultBlob: result.blob,
        resultUrl: resultUrl,
        resultSize: result.blob.size,
        status: 'done',
        progressPercentage: 100,
        progressMessage: 'Finished!',
        engineUsed: result.engineUsed,
      };

      setActiveItem(null);
      onProcessComplete(completedItem);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Image processing failed.';
      setErrorMessage(msg);
      setActiveItem((prev) =>
        prev
          ? {
              ...prev,
              status: 'error',
              progressMessage: msg,
              errorMessage: msg,
            }
          : null
      );
    }
  };

  return (
    <div className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value proposition & hero headline */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/70 border border-blue-200/60 px-3 py-1 rounded-full mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero Server Uploads · 100% Client-Side Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
            Free AI Background Removal <br className="hidden sm:inline" />
            <span className="text-blue-600">Directly in Your Browser</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Erase backgrounds from portraits, e-commerce products, and pets in seconds. Powered by client-side neural networks with high-resolution transparent PNG downloads.
          </p>
        </div>

        {/* Engine Switcher bar */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="inline-flex p-1 bg-slate-200/70 rounded-xl border border-slate-300/60 shadow-xs">
            <button
              onClick={() => setEngine('neural_ai')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                engine === 'neural_ai'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Neural AI (IS-Net ONNX)</span>
            </button>
            <button
              onClick={() => setEngine('smart_canvas')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                engine === 'smart_canvas'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Edge (Ultra Fast)</span>
            </button>
          </div>
        </div>

        {/* Main dropzone & upload container */}
        <div className="max-w-2xl mx-auto">
          {/* Active processing progress state */}
          {activeItem && activeItem.status !== 'error' ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-5 animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                Processing {activeItem.name}
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-mono">
                {activeItem.progressMessage}
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 mb-3">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${activeItem.progressPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 max-w-md mx-auto">
                <span>Model Execution</span>
                <span className="font-mono font-medium text-slate-700">{activeItem.progressPercentage}%</span>
              </div>
            </div>
          ) : (
            /* Upload dropzone card */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative bg-white border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 group ${
                isDragging
                  ? 'border-blue-600 bg-blue-50/60 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50/60 shadow-xs'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-blue-100 transition-all">
                <Upload className="w-8 h-8" />
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                Upload an image or drag & drop here
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Supports JPG, JPEG, PNG, and WEBP · Or press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-slate-100 border border-slate-300 rounded text-slate-700">Ctrl+V</kbd> to paste
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs inline-flex items-center gap-2 group-hover:shadow-md"
              >
                <FileImage className="w-4 h-4" />
                <span>Select Image from Computer</span>
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                <span>Free & Unlimited</span>
                <span aria-hidden="true">·</span>
                <span>Max 30MB</span>
                <span aria-hidden="true">·</span>
                <span>Zero Data Uploaded to Cloud</span>
              </div>
            </div>
          )}

          {/* Error notification banner */}
          {errorMessage && (
            <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="mt-0.5 text-rose-600">
                  Tip: Ensure the image has a clear subject, or switch to the Instant Edge engine above for faster client processing.
                </p>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-500 hover:text-rose-700 font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* One-click Sample Gallery */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Or try with a sample photo:
              </span>
              <span className="text-xs text-slate-400">1-click instant preview</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleClick(sample)}
                  className="group relative rounded-xl border border-slate-200 bg-white p-2 text-left hover:border-blue-500 hover:shadow-xs transition-all overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-2 relative">
                    <img
                      src={sample.url}
                      alt={sample.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 bg-slate-900/70 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                      {sample.category}
                    </div>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 truncate">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Click to test
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
