import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Code, ExternalLink } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  embedUrl: string;
  canonicalUrl: string;
}

export default function EmbedModal({
  isOpen,
  onClose,
  title,
  embedUrl,
  canonicalUrl,
}: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState('620');

  const snippet = `<!-- BanksCart ${title} Widget -->
<iframe src="${embedUrl}" width="100%" height="${height}" frameborder="0" style="border:1px solid #e2e8f0; border-radius:12px; max-width:100%;" title="${title} - BanksCart" loading="lazy"></iframe>
<div style="font-size:12px; font-family:sans-serif; color:#64748b; margin-top:6px; text-align:right;">
  Calculation engine powered by <a href="${canonicalUrl}" target="_blank" rel="noopener" style="color:#2563eb; font-weight:600; text-decoration:none;">BanksCart ${title}</a>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative border border-gray-100"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Embed this Calculator</h3>
              <p className="text-sm text-gray-500">Free, responsive widget for finance bloggers & webmasters</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Embed this interactive <strong>{title}</strong> directly on your website or blog. Includes automatic calculation updates, mobile responsiveness, and zero maintenance.
          </p>

          <div className="flex items-center gap-4 mb-3">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Widget Height:</label>
            <div className="flex gap-2">
              {['550', '620', '700'].map((h) => (
                <button
                  key={h}
                  onClick={() => setHeight(h)}
                  className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                    height === h ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {h}px
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-4">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed max-h-48">
              {snippet}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied HTML!' : 'Copy Code'}
            </button>
          </div>

          <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 flex items-start gap-2">
            <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              By embedding this widget, you provide your readers with instant calculations while retaining full compliance with BanksCart attribution terms.
            </span>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
