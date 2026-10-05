import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

/**
 * Renderiza uma sequência de dígitos em caixas individuais estilizadas
 * (utilizado em campos fiscais como NCM/CEOP).
 */
export function DigitBoxes({ value = '', length = 0, size = 'md', className = '' }) {
  const digits = String(value || '').replace(/\D/g, '').split('');
  const totalSlots = length || Math.max(digits.length, 1);
  const slots = Array.from({ length: totalSlots }, (_, i) => digits[i] || '');

  const sizeClasses = {
    sm: 'w-4 h-5 text-[10px]',
    md: 'w-5 h-6 text-xs',
    lg: 'w-6 h-7 text-sm font-semibold',
  };

  return (
    <div className={`inline-flex items-center gap-[2px] ${className}`}>
      {slots.map((digit, idx) => (
        <span
          key={idx}
          className={`flex items-center justify-center font-sans font-medium border border-slate-300 bg-white text-slate-800 rounded-[2px] select-all transition-colors ${sizeClasses[size] || sizeClasses.md}`}
        >
          {digit || '\u00A0'}
        </span>
      ))}
    </div>
  );
}

/**
 * Renderizador de Código de Barras Real, Funcional e Escaneável
 * com números integrados diretamente no próprio código de barras.
 * Suporta EAN-13 (GTIN-13) e ITF-14 (GTIN-14).
 */
export function FunctionalBarcode({
  code = '',
  type = 'GTIN-13',
  height = 28,
  width = 1.15,
  displayValue = true,
  fontSize = 10,
  className = '',
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const clean = String(code || '').trim().replace(/\D/g, '');
    if (!clean) {
      if (svgRef.current) svgRef.current.innerHTML = '';
      return;
    }

    const baseOpts = {
      width: width,
      height: height,
      displayValue: displayValue,
      font: 'Plus Jakarta Sans',
      fontOptions: 'bold',
      fontSize: fontSize,
      textMargin: 2,
      margin: 2,
      lineColor: '#000000',
      background: 'transparent',
    };

    try {
      if (type === 'GTIN-13' && clean.length === 13) {
        JsBarcode(svgRef.current, clean, {
          ...baseOpts,
          format: 'EAN13',
        });
      } else if (type === 'GTIN-14' && clean.length === 14) {
        JsBarcode(svgRef.current, clean, {
          ...baseOpts,
          format: 'ITF14',
        });
      } else {
        // Fallback automático para Code 128
        JsBarcode(svgRef.current, clean, {
          ...baseOpts,
          format: 'CODE128',
        });
      }
    } catch {
      try {
        JsBarcode(svgRef.current, clean, {
          ...baseOpts,
          format: 'CODE128',
        });
      } catch {
        // Falha silenciosa se código estiver sendo digitado
      }
    }
  }, [code, type, height, width, displayValue, fontSize]);

  if (!code) return null;

  return (
    <div
      className={`flex items-center justify-center bg-white px-2 py-0.5 rounded border border-slate-300 shadow-2xs select-none ${className}`}
      title={`Código de Barras Escaneável (${type}): ${code}`}
    >
      <svg ref={svgRef} className="block overflow-visible max-h-[46px]" />
    </div>
  );
}

/**
 * Renderizador de código de barras minimalista visual (legado / fallback)
 */
export function BarcodeVisual({ code = '', type = 'GTIN-13', height = 30 }) {
  return <FunctionalBarcode code={code} type={type} height={height} displayValue={true} />;
}
