import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  SplitSquareVertical, 
  Columns, 
  Eye, 
  Sparkles, 
  Palette, 
  Upload, 
  Sliders, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { BackgroundSettings, BackgroundType, ProcessedImageItem } from '../types';
import { renderCompositeImage } from '../services/imageProcessor';

interface ResultWorkspaceProps {
  item: ProcessedImageItem;
  onReset: () => void;
}

export const ResultWorkspace: React.FC<ResultWorkspaceProps> = ({ item, onReset }) => {
  const [viewMode, setViewMode] = useState<'split' | 'side' | 'toggle'>('split');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isHoldingOriginal, setIsHoldingOriginal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [compositePreviewUrl, setCompositePreviewUrl] = useState<string | null>(null);

  // Background customization state
  const [bgSettings, setBgSettings] = useState<BackgroundSettings>({
    type: 'transparent',
    color: '#ffffff',
    gradient: 'studio-soft',
    blurAmount: 14,
    featherRadius: 0,
  });

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef<boolean>(false);
  const customBgInputRef = useRef<HTMLInputElement>(null);

  // Update composite preview when background settings change
  useEffect(() => {
    let active = true;
    if (bgSettings.type === 'transparent') {
      setCompositePreviewUrl(null);
      return;
    }

    const generatePreview = async () => {
      try {
        if (!item.resultBlob) return;
        const compBlob = await renderCompositeImage(
          item.resultBlob,
          item.originalUrl,
          bgSettings,
          'image/png'
        );
        if (active) {
          const url = URL.createObjectURL(compBlob);
          setCompositePreviewUrl(url);
        }
      } catch (err) {
        console.error('Failed to update composite preview:', err);
      }
    };

    generatePreview();
    return () => {
      active = false;
    };
  }, [bgSettings, item.resultBlob, item.originalUrl]);

  // Handle slider drag interaction
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    isDraggingSlider.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider.current) {
        handleSliderMove(e.clientX);
      }
    };
    const handleMouseUp = () => {
      isDraggingSlider.current = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingSlider.current && e.touches[0]) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  // Download transparent PNG
  const handleDownloadTransparent = () => {
    if (!item.resultBlob) return;
    const url = URL.createObjectURL(item.resultBlob);
    const link = document.createElement('a');
    link.href = url;
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}-transparent.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download with custom background
  const handleDownloadCustom = async () => {
    if (!item.resultBlob) return;
    setIsExporting(true);
    try {
      const finalBlob = await renderCompositeImage(
        item.resultBlob,
        item.originalUrl,
        bgSettings,
        'image/png'
      );
      const url = URL.createObjectURL(finalBlob);
      const link = document.createElement('a');
      link.href = url;
      const baseName = item.name.replace(/\.[^/.]+$/, '');
      link.download = `${baseName}-edited.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download custom error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy PNG to system clipboard
  const handleCopyToClipboard = async () => {
    if (!item.resultBlob || !navigator.clipboard) return;
    try {
      // Browsers require image/png for ClipboardItem
      const itemToCopy = new ClipboardItem({ 'image/png': item.resultBlob });
      await navigator.clipboard.write([itemToCopy]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  // Handle custom background image file selection
  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgSettings((prev) => ({
        ...prev,
        type: 'custom_image',
        customImageUrl: url,
      }));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const activeResultDisplayUrl = compositePreviewUrl || item.resultUrl || '';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      {/* Top action header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500">
              <span>{item.width} × {item.height} px</span>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>{formatFileSize(item.originalSize)}</span>
              {item.engineUsed && (
                <>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span className="text-blue-600 font-medium">
                    {item.engineUsed === 'neural_ai' ? 'Neural IS-Net AI' : 'Smart Edge Canvas'}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* View Mode controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Split comparison slider"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slider</span>
          </button>
          <button
            onClick={() => setViewMode('side')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'side' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Side-by-side view"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Side by Side</span>
          </button>
          <button
            onClick={() => setViewMode('toggle')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'toggle' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Press and hold to view original"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Toggle</span>
          </button>
        </div>

        {/* Reset / upload new button */}
        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Upload New</span>
        </button>
      </div>

      {/* Main preview viewport */}
      <div className="p-4 sm:p-6 bg-slate-100/50 flex flex-col items-center justify-center">
        {/* Split comparison mode */}
        {viewMode === 'split' && (
          <div
            ref={sliderContainerRef}
            className="relative w-full max-w-2xl aspect-square sm:aspect-4/3 rounded-xl overflow-hidden shadow-xs border border-slate-200 cursor-ew-resize select-none touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* Cutout (Bottom layer) */}
            <div
              className={`absolute inset-0 w-full h-full flex items-center justify-center ${
                bgSettings.type === 'transparent' ? 'bg-checkerboard' : ''
              }`}
            >
              <img
                src={activeResultDisplayUrl}
                alt="Cutout background removed result"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Original image (Top layer clipped by slider) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden bg-white"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={item.originalUrl}
                alt="Original photo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Vertical dividing slider bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-300 flex items-center justify-center text-slate-700">
                <SplitSquareVertical className="w-4 h-4" />
              </div>
            </div>

            {/* Floating labels */}
            <div className="absolute bottom-3 left-3 bg-slate-900/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium pointer-events-none">
              Original
            </div>
            <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium pointer-events-none">
              Transparent Cutout
            </div>
          </div>
        )}

        {/* Side-by-side mode */}
        {viewMode === 'side' && (
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 mb-2">Original Photo</span>
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-2">
                <img
                  src={item.originalUrl}
                  alt="Original input"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold text-blue-600 mb-2">Background Removed</span>
              <div
                className={`w-full aspect-square rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center p-2 ${
                  bgSettings.type === 'transparent' ? 'bg-checkerboard' : ''
                }`}
              >
                <img
                  src={activeResultDisplayUrl}
                  alt="Background removed cutout"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Toggle mode */}
        {viewMode === 'toggle' && (
          <div className="w-full max-w-2xl flex flex-col items-center">
            <div
              className={`w-full aspect-square sm:aspect-4/3 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center ${
                bgSettings.type === 'transparent' && !isHoldingOriginal ? 'bg-checkerboard' : 'bg-white'
              }`}
            >
              <img
                src={isHoldingOriginal ? item.originalUrl : activeResultDisplayUrl}
                alt={isHoldingOriginal ? 'Original photo' : 'Removed background cutout'}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onMouseDown={() => setIsHoldingOriginal(true)}
                onMouseUp={() => setIsHoldingOriginal(false)}
                onTouchStart={() => setIsHoldingOriginal(true)}
                onTouchEnd={() => setIsHoldingOriginal(false)}
                className="px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors select-none"
              >
                Hold to View Original
              </button>
              <span className="text-xs text-slate-500">
                {isHoldingOriginal ? 'Viewing Original' : 'Viewing Cutout'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Background replacement & customization tools */}
      <div className="p-4 sm:p-6 border-t border-slate-100 bg-white space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <span>Backdrop Options</span>
            </h4>
            <span className="text-xs text-slate-500">
              Preview before downloading
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Transparent option */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'transparent' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'transparent'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-checkerboard border border-slate-300 inline-block shrink-0" />
              <span>Transparent PNG</span>
            </button>

            {/* Pure White (E-commerce standard) */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'color', color: '#ffffff' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'color' && bgSettings.color === '#ffffff'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white border border-slate-300 inline-block shrink-0" />
              <span>Pure White (Shopify/Amazon)</span>
            </button>

            {/* Studio Neutral Grey */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'color', color: '#f1f5f9' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'color' && bgSettings.color === '#f1f5f9'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-100 border border-slate-300 inline-block shrink-0" />
              <span>Studio Gray</span>
            </button>

            {/* Dark Charcoal */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'color', color: '#0f172a' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'color' && bgSettings.color === '#0f172a'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 inline-block shrink-0" />
              <span>Charcoal Dark</span>
            </button>

            {/* Custom Color Picker */}
            <label
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border cursor-pointer transition-all ${
                bgSettings.type === 'color' && !['#ffffff', '#f1f5f9', '#0f172a'].includes(bgSettings.color)
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <input
                type="color"
                value={bgSettings.color}
                onChange={(e) => setBgSettings((s) => ({ ...s, type: 'color', color: e.target.value }))}
                className="w-4 h-4 rounded-full border-0 p-0 cursor-pointer"
              />
              <span>Custom Color</span>
            </label>

            {/* Gradient options */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'gradient', gradient: 'studio-soft' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'gradient' && bgSettings.gradient === 'studio-soft'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-slate-200 to-white border border-slate-300 inline-block shrink-0" />
              <span>Soft Gradient</span>
            </button>

            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'gradient', gradient: 'warm-sunrise' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'gradient' && bgSettings.gradient === 'warm-sunrise'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-200 to-amber-100 border border-slate-300 inline-block shrink-0" />
              <span>Sunrise</span>
            </button>

            {/* Blur original background */}
            <button
              onClick={() => setBgSettings((s) => ({ ...s, type: 'blur' }))}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'blur'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Portrait Bokeh (Blur Original)</span>
            </button>

            {/* Upload custom backdrop */}
            <button
              onClick={() => customBgInputRef.current?.click()}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all ${
                bgSettings.type === 'custom_image'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Upload Backdrop</span>
            </button>
            <input
              ref={customBgInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCustomBgUpload}
            />
          </div>
        </div>

        {/* Blur slider if blur is chosen */}
        {bgSettings.type === 'blur' && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
            <span className="text-xs font-medium text-slate-700 shrink-0">Bokeh Intensity:</span>
            <input
              type="range"
              min="4"
              max="35"
              value={bgSettings.blurAmount}
              onChange={(e) => setBgSettings((s) => ({ ...s, blurAmount: Number(e.target.value) }))}
              className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs font-mono text-slate-500 w-8 text-right">{bgSettings.blurAmount}px</span>
          </div>
        )}

        {/* Action download buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyToClipboard}
              disabled={copied}
              className="px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 focus:outline-none"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy PNG'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {bgSettings.type !== 'transparent' && (
              <button
                onClick={handleDownloadCustom}
                disabled={isExporting}
                className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 border border-slate-300 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download With Background</span>
              </button>
            )}

            <button
              onClick={handleDownloadTransparent}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Download className="w-4 h-4" />
              <span>Download Transparent PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
