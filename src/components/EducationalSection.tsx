import React, { useState } from 'react';
import { 
  BookOpen, 
  Camera, 
  Layers, 
  Lightbulb, 
  Palette, 
  Sparkles, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const EducationalSection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<'science' | 'photo' | 'design'>('science');

  return (
    <div className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Educational Academy</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Complete Guide to Background Removal, Photography & Editing
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Learn the foundational principles behind deep computer vision segmentation, studio product photography setups, and professional graphic design composite workflows.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveChapter('science')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeChapter === 'science'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>1. How AI Background Removal Works</span>
          </button>
          <button
            onClick={() => setActiveChapter('photo')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeChapter === 'photo'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>2. Product Photography Masterclass</span>
          </button>
          <button
            onClick={() => setActiveChapter('design')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeChapter === 'design'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>3. Image Editing & Composite Design</span>
          </button>
        </div>

        {/* Chapter 1: The Science of Neural Background Removal */}
        {activeChapter === 'science' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Chapter 01</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                The Science of Computer Vision & Alpha Matting
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Background removal has evolved dramatically from primitive green-screen chroma keying and manual lasso tools into sophisticated deep neural networks capable of understanding semantic depth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>Dichotomous Image Segmentation (DIS)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Traditional segmentation models (like Mask R-CNN) categorize coarse object bounding boxes. DIS architectures (like IS-Net) are specially designed for high-frequency boundaries, capturing intricate features such as single hair strands, transparent veils, and chain links with structural precision.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span>The Matting Equation & Alpha Channels</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every pixel $C$ in a digital image is modeled as a linear combination: <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">C = αF + (1 - α)B</code>, where $F$ is foreground, $B$ is background, and $\alpha \in [0, 1]$ represents opacity. The model solves for the continuous $\alpha$ value at each coordinate to avoid jagged stair-stepped halos.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-base font-bold text-slate-900 mb-3">
                Why Running Models Client-Side in WebAssembly Matters
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Historically, deep learning required massive server-side GPU clusters running Python/PyTorch. Advances in WebAssembly (WASM), SIMD optimizations, and WebGPU now allow modern browsers to execute optimized ONNX neural networks directly on the client machine. This completely eliminates server hosting expenses, guarantees complete user data confidentiality, and delivers instantaneous cutouts without upload queues.
              </p>
            </div>
          </div>
        )}

        {/* Chapter 2: Product Photography Masterclass */}
        {activeChapter === 'photo' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Chapter 02</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Studio Product Photography: Shooting for Clean Cutouts
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                The quality of AI background removal is directly influenced by initial capture conditions. Follow these proven commercial studio practices to achieve razor-sharp cutouts every time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-3">
                  01
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Lighting & Contrast Separation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid shooting a white product against a white wall without a rim light. Ensure at least a 20% tonal value difference between the product perimeter and the background backdrop.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-3">
                  02
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Depth of Field (Aperture)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Do not shoot commercial product photos wide open at $f/1.8$. Use $f/8$ to $f/11$ so the front and back edges of your product stay tack-sharp and prevent blurry edges from getting clipped.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-3">
                  03
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                  Amazon & Marketplace Rules
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Amazon requires primary hero images to feature a pure seamless white background (RGB 255, 255, 255) with the product filling at least 85% of the frame. BG Remove AI produces this in one click.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200 text-slate-800 text-xs sm:text-sm">
              <h4 className="font-bold text-blue-900 mb-1">
                Pro-Tip: Managing Reflections on Glass & Polished Metals
              </h4>
              <p className="text-slate-700 leading-relaxed">
                When photographing reflective items (such as watches, jewelry, or sunglasses), use large diffuser scrims or a light tent rather than direct point lights. This prevents hot specular glare along the perimeter that can confuse edge-detection algorithms.
              </p>
            </div>
          </div>
        )}

        {/* Chapter 3: Image Editing & Composite Design */}
        {activeChapter === 'design' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Chapter 03</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Composite Graphic Design: What to Do After Removing Backgrounds
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                A transparent PNG is just the beginning. Discover how top digital marketers and graphic designers turn raw cutouts into high-converting visual assets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">
                  YouTube Thumbnails & Social Graphics
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Add a 3px to 6px solid white or neon stroke around your isolated portrait subject, increase foreground saturation by +15%, and place an eye-catching gradient or high-contrast background to maximize click-through rate (CTR).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Natural Contact Shadows (Grounding)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Floating cutouts look artificial without shadows. Add a subtle dark radial gradient directly beneath the product base with 30% opacity and 12px Gaussian blur to give the object physical weight and realism.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Color Grading & Ambient Light Bleed
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When placing a cutout onto a warm sunset background, apply a subtle warm tint (Curves or Color Balance) to the subject. Color harmonization prevents the subject from looking disconnected from its environment.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">
                  High-DPI Exporting for Print & Web
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Always preserve the original pixel resolution of your cutout. BG Remove AI never downsizes your final exported PNG, allowing you to use the assets for physical packaging, billboard print, or retina screens.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
