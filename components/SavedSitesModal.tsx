'use client';

import React from 'react';
import { OptimizedSeoResult, ExtractedMeta } from '@/types/seo';
import { X, Trash2, Globe, ArrowRight, Clock } from 'lucide-react';

export interface SavedAnalysis {
  id: string;
  url: string;
  timestamp: string;
  businessName: string;
  category: string;
  score: number;
  result: OptimizedSeoResult;
  extracted: ExtractedMeta;
}

interface SavedSitesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSites: SavedAnalysis[];
  onSelectSite: (site: SavedAnalysis) => void;
  onDeleteSite: (id: string) => void;
}

export const SavedSitesModal: React.FC<SavedSitesModalProps> = ({
  isOpen,
  onClose,
  savedSites,
  onSelectSite,
  onDeleteSite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 max-h-[85vh] flex flex-col justify-between border border-slate-200">
        <div className="space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-[#0F172A] uppercase tracking-wider">
                PREVIOUSLY ANALYZED WEBSITES
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Switch back to any saved audit or export its metadata
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {savedSites.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              No saved analyses yet. Crawl a website to store it here.
            </div>
          ) : (
            <div className="space-y-3">
              {savedSites.map((site) => (
                <div
                  key={site.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/20 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="truncate flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#0F172A] truncate">
                        {site.businessName}
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {site.category}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 truncate mt-1">
                      {site.url}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1.5 mt-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(site.timestamp).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectSite(site);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#2563EB] hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteSite(site.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete saved site"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-black uppercase tracking-wider text-slate-600 hover:text-[#0F172A] px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
