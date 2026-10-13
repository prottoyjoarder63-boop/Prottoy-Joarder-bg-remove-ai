export type PageTab = 
  | 'home' 
  | 'how-it-works' 
  | 'education' 
  | 'faq' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms'
  | 'hosting-guide'
  | 'adsense-guide'
  | 'licenses';

export type ProcessorEngine = 'neural_ai' | 'smart_canvas';

export type BackgroundType = 'transparent' | 'color' | 'gradient' | 'blur' | 'custom_image';

export interface BackgroundSettings {
  type: BackgroundType;
  color: string;
  gradient: string;
  blurAmount: number;
  customImageUrl?: string;
  featherRadius: number; // edge smoothing 0-10px
}

export interface ProcessedImageItem {
  id: string;
  name: string;
  originalFile?: File;
  originalUrl: string;
  resultBlob?: Blob;
  resultUrl?: string;
  width: number;
  height: number;
  originalSize: number;
  resultSize?: number;
  status: 'idle' | 'loading_model' | 'segmenting' | 'refining' | 'done' | 'error';
  progressPercentage: number;
  progressMessage: string;
  errorMessage?: string;
  engineUsed?: ProcessorEngine;
}

export interface SampleImage {
  id: string;
  title: string;
  category: 'Portrait' | 'E-Commerce' | 'Pet' | 'Product';
  url: string;
  description: string;
}
