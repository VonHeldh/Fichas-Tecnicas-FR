import React from 'react';
import { Package, Box, Layers, Beef, Image as ImageIcon } from 'lucide-react';

export function ProductPresentation({ apresentacao, corPrimaria = '#c5161d', onImageClick }) {
  const allItems = [
    {
      key: 'inNatura',
      defaultNumber: '1',
      title: apresentacao?.inNatura?.titulo || 'In Natura',
      subtitle: apresentacao?.inNatura?.descricao || 'Produto in natura',
      imagem: apresentacao?.inNatura?.imagem,
      icon: Beef,
      fallbackColor: 'text-rose-500 bg-rose-50',
      ativo: apresentacao?.inNatura?.ativo !== false,
    },
    {
      key: 'primaria',
      defaultNumber: '2',
      title: apresentacao?.primaria?.titulo || 'Embalagem Primária',
      subtitle: apresentacao?.primaria?.descricao || 'Filme a vácuo / termoformado',
      imagem: apresentacao?.primaria?.imagem,
      icon: Package,
      fallbackColor: 'text-blue-500 bg-blue-50',
      ativo: apresentacao?.primaria?.ativo !== false,
    },
    {
      key: 'secundaria',
      defaultNumber: '3',
      title: apresentacao?.secundaria?.titulo || 'Embalagem Secundária',
      subtitle: apresentacao?.secundaria?.descricao || 'Caixa master frigorífica',
      imagem: apresentacao?.secundaria?.imagem,
      icon: Box,
      fallbackColor: 'text-amber-500 bg-amber-50',
      ativo: apresentacao?.secundaria?.ativo !== false,
    },
    {
      key: 'palletizado',
      defaultNumber: '4',
      title: apresentacao?.palletizado?.titulo || 'Palletizado',
      subtitle: apresentacao?.palletizado?.descricao || 'Pallet padrão PBR filme stretch',
      imagem: apresentacao?.palletizado?.imagem,
      icon: Layers,
      fallbackColor: 'text-emerald-500 bg-emerald-50',
      ativo: apresentacao?.palletizado?.ativo !== false,
    },
  ];

  // Filtra apenas os itens ativos (com número sequencial 1, 2, 3...)
  const activeItems = allItems
    .filter((item) => item.ativo)
    .map((item, index) => ({
      ...item,
      displayNumber: String(index + 1),
    }));

  const count = activeItems.length;

  // Função para renderizar cada janela de produto com dimensões padronizadas
  const renderItemCard = (item, isColSpan2 = false) => {
    const Icon = item.icon;
    return (
      <div
        key={item.key}
        className={`bg-white flex flex-col p-1.5 relative group hover:bg-slate-50/50 transition-colors h-full min-h-0 overflow-hidden ${
          isColSpan2 ? 'col-span-2' : ''
        }`}
      >
        {/* Barra de identificação da janela */}
        <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-tight text-slate-800 flex items-center gap-1.5 truncate">
            <span
              className="w-3.5 h-3.5 shrink-0 rounded-full text-white text-[8.5px] flex items-center justify-center font-bold"
              style={{ backgroundColor: corPrimaria }}
            >
              {item.displayNumber}
            </span>
            <span className="truncate">{item.title}</span>
          </span>
        </div>

        {/* Área visual da imagem com tamanho e proporção rigorosamente padronizados */}
        <div
          className="flex-1 w-full min-h-0 rounded bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative cursor-pointer p-1"
          onClick={() => onImageClick && onImageClick(item)}
          title={item.imagem ? 'Clique para expandir imagem' : 'Sem foto cadastrada'}
        >
          {item.imagem ? (
            <img
              src={item.imagem}
              alt={item.title}
              className="w-full h-full max-h-full object-contain transition-transform group-hover:scale-105 duration-200"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-1">
              <div className={`p-1.5 rounded-full mb-0.5 ${item.fallbackColor}`}>
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="text-[8px] font-medium text-slate-400">
                Foto não informada
              </span>
            </div>
          )}
        </div>

        {/* Legenda técnica padronizada */}
        {item.subtitle && (
          <div className="pt-1 text-center shrink-0">
            <span className="text-[7.5px] text-slate-500 leading-tight block truncate uppercase font-medium">
              {item.subtitle}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full border border-slate-300 rounded overflow-hidden bg-white min-h-0">
      {/* Título de Cabeçalho Superior: "APRESENTAÇÃO DO PRODUTO" */}
      <div
        className="px-2 py-1 text-center font-bold text-xs uppercase tracking-wider text-white shadow-sm flex items-center justify-center gap-1.5 shrink-0"
        style={{ backgroundColor: corPrimaria }}
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>APRESENTAÇÃO DO PRODUTO</span>
      </div>

      {/* Grid Dinâmica com linhas estritamente 1fr 1fr de altura exata */}
      {count === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 text-slate-400 text-xs">
          <ImageIcon className="w-8 h-8 mb-1 opacity-40" />
          <span>Nenhuma apresentação configurada</span>
        </div>
      ) : count === 4 ? (
        // Padrão 4 Imagens: 2 colunas e 2 linhas estritamente iguais (1fr 1fr)
        <div
          className="flex-1 p-0 min-h-0 bg-slate-300 gap-[1px]"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            height: '100%',
          }}
        >
          {activeItems.map((item) => renderItemCard(item, false))}
        </div>
      ) : count === 3 ? (
        // 3 Imagens: 2 linhas estritamente iguais (1fr 1fr)
        <div
          className="flex-1 p-0 min-h-0 bg-slate-300 gap-[1px]"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            height: '100%',
          }}
        >
          {renderItemCard(activeItems[0], false)}
          {renderItemCard(activeItems[1], false)}
          {renderItemCard(activeItems[2], true)}
        </div>
      ) : count === 2 ? (
        // 2 Imagens: 2 colunas simétricas em altura total
        <div
          className="flex-1 p-0 min-h-0 bg-slate-300 gap-[1px]"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr',
            height: '100%',
          }}
        >
          {activeItems.map((item) => renderItemCard(item, false))}
        </div>
      ) : (
        // 1 Imagem: Destaque total
        <div className="flex-1 bg-slate-300 p-0 flex flex-col min-h-0 h-full">
          {renderItemCard(activeItems[0], false)}
        </div>
      )}
    </div>
  );
}
