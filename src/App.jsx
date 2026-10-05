import React, { useState, useEffect } from 'react';
import { sampleFichas, defaultCompany } from './data/sampleFichas';
import { FichaPreview } from './components/FichaPreview';
import { FichaEditor } from './components/FichaEditor';
import { ImageModal } from './components/ImageModal';
import {
  Printer,
  Plus,
  Copy,
  Trash2,
  Download,
  Upload,
  Eye,
  Edit3,
  Columns,
  RotateCcw,
  Check,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export default function App() {
  // Carrega lista de fichas do localStorage ou padrão
  const [fichas, setFichas] = useState(() => {
    try {
      const saved = localStorage.getItem('fichas_tecnicas_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((f) => {
          if (f.nutricional?.tamanhoPorcao) {
            f.nutricional.tamanhoPorcao = f.nutricional.tamanhoPorcao.replace(/\s*\([^)]*pedaço[^)]*\)/gi, '').trim();
          }
          return f;
        });
      }
      return sampleFichas;
    } catch {
      return sampleFichas;
    }
  });

  const [company, setCompany] = useState(() => {
    try {
      const saved = localStorage.getItem('fichas_tecnicas_company');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.logoUrl || parsed.logoUrl === '') {
          parsed.logoUrl = defaultCompany.logoUrl;
        }
        return parsed;
      }
      return defaultCompany;
    } catch {
      return defaultCompany;
    }
  });

  const [selectedId, setSelectedId] = useState(() => {
    return fichas[0]?.id || 'ficha-13003';
  });

  const [viewMode, setViewMode] = useState('split'); // 'split' | 'preview' | 'editor'
  const [zoomScale, setZoomScale] = useState(0.92);
  const [modalItem, setModalItem] = useState(null);
  const [saveToast, setSaveToast] = useState(false);

  // Persistência automática no localStorage
  useEffect(() => {
    localStorage.setItem('fichas_tecnicas_data', JSON.stringify(fichas));
  }, [fichas]);

  useEffect(() => {
    localStorage.setItem('fichas_tecnicas_company', JSON.stringify(company));
  }, [company]);

  const currentFicha = fichas.find((f) => f.id === selectedId) || fichas[0];

  const handleUpdateCurrentFicha = (updated) => {
    setFichas((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleNewFicha = () => {
    const newId = `ficha-${Date.now()}`;
    const nova = {
      ...JSON.parse(JSON.stringify(sampleFichas[0])),
      id: newId,
      codigo: String(Math.floor(10000 + Math.random() * 90000)),
      nome: 'NOVO PRODUTO ALIMENTÍCIO',
      dataCriacao: new Date().toISOString().split('T')[0],
      versao: '1.0',
    };
    setFichas((prev) => [nova, ...prev]);
    setSelectedId(newId);
  };

  const handleDuplicateFicha = () => {
    if (!currentFicha) return;
    const newId = `ficha-${Date.now()}`;
    const duplicada = {
      ...JSON.parse(JSON.stringify(currentFicha)),
      id: newId,
      codigo: `${currentFicha.codigo}-CÓPIA`,
      nome: `${currentFicha.nome} (CÓPIA)`,
      dataCriacao: new Date().toISOString().split('T')[0],
    };
    setFichas((prev) => [duplicada, ...prev]);
    setSelectedId(newId);
  };

  const handleDeleteFicha = () => {
    if (fichas.length <= 1) {
      alert('Você deve manter pelo menos uma ficha técnica cadastrada.');
      return;
    }
    if (confirm(`Deseja realmente excluir a ficha "${currentFicha.nome}"?`)) {
      const remaining = fichas.filter((f) => f.id !== selectedId);
      setFichas(remaining);
      setSelectedId(remaining[0].id);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Deseja restaurar a ficha técnica padrão original (Mocotó Bovino FRIRED)?')) {
      setFichas(sampleFichas);
      setCompany(defaultCompany);
      setSelectedId(sampleFichas[0].id);
    }
  };

  const handleExportJSON = () => {
    const exportData = {
      company,
      fichas,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fichas-tecnicas-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.fichas && Array.isArray(parsed.fichas)) {
          setFichas(parsed.fichas);
          if (parsed.company) setCompany(parsed.company);
          if (parsed.fichas.length > 0) setSelectedId(parsed.fichas[0].id);
          alert('Fichas técnicas importadas com sucesso!');
        } else {
          alert('Arquivo JSON inválido ou incompatível.');
        }
      } catch {
        alert('Erro ao ler arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* ========================================================
          BARRA DE NAVEGAÇÃO SUPERIOR ESTILO APPLE (NO-PRINT)
          ======================================================== */}
      <header className="no-print sticky top-0 z-50 bg-[#161617]/90 backdrop-blur-md border-b border-white/[0.08] text-[#e8e8ed] text-[12px] transition-colors select-none">
        <div className="max-w-[1400px] mx-auto px-4 h-11 flex items-center justify-between gap-4">
          
          {/* Logo Minimalista Apple-Style */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setViewMode('split')}
              className="flex items-center gap-2 group cursor-pointer focus:outline-none"
              title="FichaTécnica Pro"
            >
              <img
                src="/favicon.png"
                alt="Logo"
                className="w-5 h-5 rounded-md object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-medium text-[13px] tracking-tight text-white/90 group-hover:text-white transition-colors flex items-center gap-1.5">
                <span>FichaTécnica</span>
                <span className="text-[10px] text-white/50 font-normal tracking-normal bg-white/[0.06] px-1.5 py-0.5 rounded">Pro</span>
              </span>
            </button>
          </div>

          {/* Menu Central no Estilo de Links Apple */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[12px] text-white/75 font-normal tracking-tight">
            {/* Seletor de Fichas com visual discreto */}
            <div className="flex items-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.08] px-2.5 py-1 rounded-md transition-colors border border-white/[0.05]">
              <span className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Produto:</span>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="bg-transparent text-white/90 text-[12px] font-medium max-w-[210px] truncate outline-none cursor-pointer"
              >
                {fichas.map((f) => (
                  <option key={f.id} value={f.id} className="bg-[#1d1d1f] text-white">
                    {f.codigo} - {f.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Alternadores de Modo em visual de texto minimalista */}
            <button
              onClick={() => setViewMode('split')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'split' ? 'text-white font-medium' : 'text-white/60'
              }`}
            >
              <Columns className="w-3.5 h-3.5 opacity-70" />
              <span>Dividido</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'preview' ? 'text-white font-medium' : 'text-white/60'
              }`}
            >
              <Eye className="w-3.5 h-3.5 opacity-70" />
              <span>Folha A4</span>
            </button>

            <button
              onClick={() => setViewMode('editor')}
              className={`hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'editor' ? 'text-white font-medium' : 'text-white/60'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 opacity-70" />
              <span>Editor</span>
            </button>

            {/* Ações de Ficha: Nova / Duplicar */}
            <button
              onClick={handleNewFicha}
              className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Nova Ficha Técnica"
            >
              <Plus className="w-3.5 h-3.5 opacity-80" />
              <span>Nova</span>
            </button>

            <button
              onClick={handleDuplicateFicha}
              className="text-white/60 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Duplicar ficha atual"
            >
              <Copy className="w-3.5 h-3.5 opacity-80" />
              <span>Duplicar</span>
            </button>

            {/* Zoom da Prévia */}
            {viewMode !== 'editor' && (
              <div className="hidden lg:flex items-center gap-1 text-white/50 bg-white/[0.04] px-2 py-0.5 rounded text-[11px]">
                <button
                  onClick={() => setZoomScale((z) => Math.max(0.6, z - 0.05))}
                  className="hover:text-white transition-colors p-0.5"
                  title="Diminuir Zoom"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="font-mono w-7 text-center text-white/80">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale((z) => Math.min(1.3, z + 0.05))}
                  className="hover:text-white transition-colors p-0.5"
                  title="Aumentar Zoom"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
            )}
          </nav>

          {/* Lado Direito: Ferramentas & Botão Emitir PDF */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ícones de Ação estilo Apple (Download/Upload/Excluir) */}
            <div className="flex items-center gap-2 text-white/70">
              <button
                onClick={handleExportJSON}
                title="Exportar Backup (JSON)"
                className="hover:text-white transition-colors p-1"
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              <label
                title="Importar Backup (JSON)"
                className="hover:text-white transition-colors p-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportJSON}
                />
              </label>

              <button
                onClick={handleDeleteFicha}
                title="Excluir ficha técnica"
                className="hover:text-rose-400 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>

            {/* Botão de Emitir PDF elegante estilo botão Apple (Clean e sofisticado) */}
            <button
              onClick={handlePrint}
              className="bg-white text-[#161617] hover:bg-white/90 active:scale-95 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Emitir PDF de página única A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Emitir PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-barra de utilidades discreta */}
      <div className="no-print bg-[#1c1c1e] text-white/55 text-[11px] px-4 py-1.5 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-1.5 max-w-4xl mx-auto text-center font-normal">
          <strong className="font-bold text-white/80">Desenvolvido por </strong>
          <a
            href="https://github.com/VonHeldh"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white hover:text-rose-400 underline underline-offset-2 transition-colors cursor-pointer"
            title="Abrir perfil de Daniel Von Heldh"
          >
            Daniel Von Heldh
          </a>
        </div>
        <button
          onClick={handleResetToDefault}
          className="text-[10px] text-white/40 hover:text-white/80 flex items-center gap-1 shrink-0 transition-colors"
          title="Restaurar padrão original"
        >
          <RotateCcw className="w-2.5 h-2.5" /> Restaurar Padrão
        </button>
      </div>

      {/* ========================================================
          CORPO PRINCIPAL (SPLIT OU FULL)
          ======================================================== */}
      <main className="flex-1 flex overflow-hidden p-3 gap-3 max-w-[1900px] w-full mx-auto">
        
        {/* Painel do Editor */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div
            className={`no-print flex flex-col ${
              viewMode === 'split' ? 'w-full lg:w-[48%] xl:w-[44%]' : 'w-full max-w-4xl mx-auto'
            }`}
          >
            <FichaEditor
              ficha={currentFicha}
              onChange={handleUpdateCurrentFicha}
              company={company}
              onCompanyChange={setCompany}
            />
          </div>
        )}

        {/* Painel de Visualização A4 */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div
            className={`flex-1 flex flex-col items-center overflow-y-auto bg-slate-200/80 rounded-xl p-4 shadow-inner border border-slate-300/80 ${
              viewMode === 'preview' ? 'w-full' : ''
            }`}
          >
            <div className="print-page-container">
              <FichaPreview
                ficha={currentFicha}
                company={company}
                zoomScale={viewMode === 'split' ? zoomScale : 1}
                onImageClick={(item) => setModalItem(item)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Modal de Zoom de Imagens */}
      <ImageModal item={modalItem} onClose={() => setModalItem(null)} />

      {/* Toast sutil de Salvamento Automático */}
      {saveToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-xl border border-slate-700 flex items-center gap-1.5 animate-fade-in no-print">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Alterações salvas automaticamente</span>
        </div>
      )}
    </div>
  );
}
