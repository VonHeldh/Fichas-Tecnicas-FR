import React from 'react';
import { X } from 'lucide-react';

export function ImageModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
              {item.number}
            </span>
            <h3 className="font-bold text-sm text-slate-900 uppercase">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-100 flex items-center justify-center min-h-[300px] max-h-[500px]">
          {item.imagem ? (
            <img
              src={item.imagem}
              alt={item.title}
              className="max-h-[460px] max-w-full object-contain rounded-lg shadow-sm bg-white p-2"
            />
          ) : (
            <div className="text-center text-slate-400">
              <p>Nenhuma imagem disponível para visualização ampliada.</p>
            </div>
          )}
        </div>

        {item.subtitle && (
          <div className="px-4 py-2.5 bg-white border-t border-slate-200 text-xs text-slate-600 font-medium text-center">
            {item.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
