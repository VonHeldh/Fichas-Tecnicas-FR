import React, { useState, useMemo } from 'react';
import { FunctionalBarcode } from './BarcodeBoxes';
import {
  Image as ImageIcon,
  FileText,
  Package,
  Layers,
  Scale,
  Activity,
  Upload,
  Trash2,
  Plus,
  Building2,
  CheckCircle2
} from 'lucide-react';

export function FichaEditor({ ficha, onChange, company, onCompanyChange }) {
  const [activeTab, setActiveTab] = useState('apresentacao');
  const dataHojePlaceholder = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);

  // Auxiliares para atualizar campos aninhados da ficha
  const updateFichaField = (field, value) => {
    onChange({ ...ficha, [field]: value });
  };

  const updateNestedField = (section, field, value) => {
    onChange({
      ...ficha,
      [section]: {
        ...ficha[section],
        [field]: value,
      },
    });
  };

  // Upload de imagem para uma das 4 janelas
  const handleImageUpload = (windowKey, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({
        ...ficha,
        apresentacao: {
          ...ficha.apresentacao,
          [windowKey]: {
            ...ficha.apresentacao[windowKey],
            imagem: e.target.result,
          },
        },
      });
    };
    reader.readAsDataURL(file);
  };

  // Upload da logo da empresa
  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onCompanyChange({
        ...company,
        logoUrl: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  // Manipular parâmetros físico-químicos
  const handleParamChange = (index, key, value) => {
    const newParams = [...ficha.parametros];
    newParams[index][key] = value;
    onChange({ ...ficha, parametros: newParams });
  };

  const addParam = () => {
    onChange({
      ...ficha,
      parametros: [...ficha.parametros, { parametro: 'Novo Parâmetro', valor: '-' }],
    });
  };

  const removeParam = (index) => {
    const newParams = ficha.parametros.filter((_, idx) => idx !== index);
    onChange({ ...ficha, parametros: newParams });
  };

  // Manipular itens nutricionais
  const handleNutriChange = (index, key, value) => {
    const newItens = [...ficha.nutricional.itens];
    newItens[index][key] = value;
    onChange({
      ...ficha,
      nutricional: {
        ...ficha.nutricional,
        itens: newItens,
      },
    });
  };

  const addNutriItem = () => {
    onChange({
      ...ficha,
      nutricional: {
        ...ficha.nutricional,
        itens: [
          ...ficha.nutricional.itens,
          { nutriente: 'Novo Nutriente (g)', qtd100g: '0', qtdPorcao: '0', vd: '0' },
        ],
      },
    });
  };

  const removeNutriItem = (index) => {
    const newItens = ficha.nutricional.itens.filter((_, idx) => idx !== index);
    onChange({
      ...ficha,
      nutricional: {
        ...ficha.nutricional,
        itens: newItens,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
      {/* Barra de Abas do Editor */}
      <div className="flex border-b border-slate-200 bg-slate-50/80 overflow-x-auto scrollbar-none px-2 py-1 gap-1">
        {[
          { id: 'apresentacao', label: '1. Apresentação (4 Janelas)', icon: ImageIcon },
          { id: 'identificacao', label: 'Identificação', icon: FileText },
          { id: 'pesos', label: 'Pesos & Embalagem', icon: Package },
          { id: 'fiscal', label: 'Fiscal & GTIN', icon: Scale },
          { id: 'parametros', label: 'Físico-Química', icon: Activity },
          { id: 'nutricional', label: 'Nutricional', icon: Layers },
          { id: 'empresa', label: 'Empresa & Cores', icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 transition-colors ${
                  isActive
                    ? 'text-rose-600'
                    : 'text-slate-500 group-hover:text-rose-600'
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aba Ativa */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        
        {/* =========================================================
            ABA 1: APRESENTAÇÃO DO PRODUTO (AS 4 PARTES EM ESTILO JANELA)
            ========================================================= */}
        {activeTab === 'apresentacao' && (
          <div className="space-y-4">
            <div className="bg-rose-50/60 border border-rose-200 rounded-lg p-3">
              <h3 className="text-xs font-bold text-rose-900 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                Apresentação do Produto • 4 Janelas Técnicas
              </h3>
              <p className="text-xs text-rose-700 mt-1">
                Conforme seu requisito, o quadrante principal foi dividido em 4 partes iguais. Adicione as fotos reais ou renderizações de cada estágio:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: 'inNatura',
                  defaultNumber: '1',
                  label: 'In Natura',
                  placeholder: 'Ex: Mocotó bovino higienizado',
                  accent: 'border-rose-300 text-rose-700',
                },
                {
                  key: 'primaria',
                  defaultNumber: '2',
                  label: 'Embalagem Primária',
                  placeholder: 'Ex: Bolsa a vácuo termoformada',
                  accent: 'border-blue-300 text-blue-700',
                },
                {
                  key: 'secundaria',
                  defaultNumber: '3',
                  label: 'Embalagem Secundária',
                  placeholder: 'Ex: Caixa master de papelão kraft',
                  accent: 'border-amber-300 text-amber-700',
                },
                {
                  key: 'palletizado',
                  defaultNumber: '4',
                  label: 'Palletizado',
                  placeholder: 'Ex: Palete padrão PBR com stretch',
                  accent: 'border-emerald-300 text-emerald-700',
                },
              ].map((win) => {
                const data = ficha.apresentacao?.[win.key] || {};
                const isAtivo = data.ativo !== false;
                return (
                  <div
                    key={win.key}
                    className={`border rounded-xl p-3 transition-all space-y-3 ${
                      isAtivo
                        ? 'border-slate-200 bg-slate-50/50 hover:bg-white shadow-xs'
                        : 'border-dashed border-slate-300 bg-slate-100/60 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`toggle-win-${win.key}`}
                          checked={isAtivo}
                          onChange={(e) => {
                            onChange({
                              ...ficha,
                              apresentacao: {
                                ...ficha.apresentacao,
                                [win.key]: { ...data, ativo: e.target.checked },
                              },
                            });
                          }}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                        />
                        <label
                          htmlFor={`toggle-win-${win.key}`}
                          className="font-bold text-xs text-slate-800 uppercase cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{win.label}</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onChange({
                              ...ficha,
                              apresentacao: {
                                ...ficha.apresentacao,
                                [win.key]: { ...data, ativo: !isAtivo },
                              },
                            });
                          }}
                          className={`text-[10px] px-2 py-0.5 rounded font-semibold transition cursor-pointer ${
                            isAtivo
                              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {isAtivo ? '✕ Ocultar da Ficha' : '+ Exibir na Ficha'}
                        </button>

                        {data.imagem && isAtivo && (
                          <button
                            type="button"
                            onClick={() => {
                              onChange({
                                ...ficha,
                                apresentacao: {
                                  ...ficha.apresentacao,
                                  [win.key]: { ...data, imagem: '' },
                                },
                              });
                            }}
                            className="text-[10px] text-slate-500 hover:text-rose-600 flex items-center gap-0.5 ml-1"
                            title="Remover foto atual"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Preview da Imagem */}
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-lg overflow-hidden bg-white flex items-center justify-center relative group">
                      {data.imagem ? (
                        <img
                          src={data.imagem}
                          alt={data.titulo}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="text-center p-3 text-slate-400">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span className="text-[11px] block">Nenhuma imagem carregada</span>
                        </div>
                      )}
                      
                      {/* Botão de Upload Flutuante */}
                      <label className="absolute inset-0 bg-slate-900/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-xs font-semibold gap-1.5 backdrop-blur-[1px]">
                        <Upload className="w-4 h-4" />
                        <span>Carregar do Computador</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(win.key, e.target.files[0])}
                        />
                      </label>
                    </div>

                    {/* Campos de Título e Descrição */}
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase">
                          Título Exibido
                        </label>
                        <input
                          type="text"
                          value={data.titulo || ''}
                          onChange={(e) => {
                            onChange({
                              ...ficha,
                              apresentacao: {
                                ...ficha.apresentacao,
                                [win.key]: { ...data, titulo: e.target.value },
                              },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase">
                          Legenda Técnica
                        </label>
                        <input
                          type="text"
                          value={data.descricao || ''}
                          placeholder={win.placeholder}
                          onChange={(e) => {
                            onChange({
                              ...ficha,
                              apresentacao: {
                                ...ficha.apresentacao,
                                [win.key]: { ...data, descricao: e.target.value },
                              },
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-slate-900 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 2: IDENTIFICAÇÃO DO PRODUTO
            ========================================================= */}
        {activeTab === 'identificacao' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Código do Produto</label>
                <input
                  type="text"
                  value={ficha.codigo}
                  onChange={(e) => updateFichaField('codigo', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none font-mono"
                />
              </div>
              <div className="md:col-span-2">
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo do Produto</label>
                <input
                  type="text"
                  value={ficha.nome}
                  onChange={(e) => updateFichaField('nome', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nº Registro no S.I.E / S.I.F</label>
                <input
                  type="text"
                  value={ficha.registroOrgao}
                  onChange={(e) => updateFichaField('registroOrgao', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Classificação Fiscal/Técnica</label>
                <input
                  type="text"
                  value={ficha.classificacao}
                  onChange={(e) => updateFichaField('classificacao', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Definição do Produto & Processo</label>
              <textarea
                rows={5}
                value={ficha.definicao}
                onChange={(e) => updateFichaField('definicao', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none text-xs leading-relaxed"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Ingredientes</label>
              <input
                type="text"
                value={ficha.ingredientes}
                onChange={(e) => updateFichaField('ingredientes', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Advertência de Alérgicos / Glúten</label>
              <input
                type="text"
                value={ficha.alergicos}
                onChange={(e) => updateFichaField('alergicos', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Data de Emissão (deixe vazio para usar a data do dia automaticamente)</label>
              <input
                type="text"
                placeholder={dataHojePlaceholder}
                value={ficha.dataEmissao || ''}
                onChange={(e) => updateFichaField('dataEmissao', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 focus:ring-1 focus:ring-slate-900 outline-none font-mono text-xs"
              />
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 3: PESOS & EMBALAGEM
            ========================================================= */}
        {activeTab === 'pesos' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Unid. na Caixa</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.unidCaixa}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'unidCaixa', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Peso Líq. Embalagem</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.pesoLiqEmb}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'pesoLiqEmb', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Peso Líq. Final Caixa</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.pesoLiqFinalCx}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'pesoLiqFinalCx', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Peso Emb. Primária</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.pesoEmbPrimaria}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'pesoEmbPrimaria', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tipo Emb. Master</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.tipoEmbMaster}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'tipoEmbMaster', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dimensões Cx (mm)</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.dimensoesCx}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'dimensoesCx', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Peso Emb. Master</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.pesoEmbMaster}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'pesoEmbMaster', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Peso Bruto</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.pesoBruto}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'pesoBruto', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Paletização (Lastro x Camada)</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.paletizacao}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'paletizacao', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Validade do Produto</label>
                <input
                  type="text"
                  value={ficha.pesosEmbalagem.validade}
                  onChange={(e) => updateNestedField('pesosEmbalagem', 'validade', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 4: FISCAL & CÓDIGOS DE BARRA
            ========================================================= */}
        {activeTab === 'fiscal' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">% ICMS</label>
                <input
                  type="text"
                  value={ficha.fiscal.icms}
                  onChange={(e) => updateNestedField('fiscal', 'icms', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">% ICMS Reduz</label>
                <input
                  type="text"
                  value={ficha.fiscal.icmsReduz}
                  onChange={(e) => updateNestedField('fiscal', 'icmsReduz', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">% IVA (Produt)</label>
                <input
                  type="text"
                  value={ficha.fiscal.iva}
                  onChange={(e) => updateNestedField('fiscal', 'iva', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">% PIS</label>
                <input
                  type="text"
                  value={ficha.fiscal.pis}
                  onChange={(e) => updateNestedField('fiscal', 'pis', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">% COFINS</label>
                <input
                  type="text"
                  value={ficha.fiscal.cofins}
                  onChange={(e) => updateNestedField('fiscal', 'cofins', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CST ICMS</label>
                <input
                  type="text"
                  value={ficha.fiscal.cstIcms}
                  onChange={(e) => updateNestedField('fiscal', 'cstIcms', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CST PIS/COFINS</label>
                <input
                  type="text"
                  value={ficha.fiscal.cstPisCofins}
                  onChange={(e) => updateNestedField('fiscal', 'cstPisCofins', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">CEOP (4 dígitos)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={ficha.fiscal.ceop ?? ficha.fiscal.cfop ?? ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange({
                      ...ficha,
                      fiscal: {
                        ...ficha.fiscal,
                        ceop: val,
                        cfop: val,
                      },
                    });
                  }}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Código NCM (8 dígitos)</label>
                <input
                  type="text"
                  maxLength={8}
                  value={ficha.fiscal.ncm}
                  onChange={(e) => updateNestedField('fiscal', 'ncm', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono font-bold"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Códigos de Barras Funcionais (GTIN)</h4>
                  <p className="text-[11px] text-slate-500">
                    Ative ou remova os GTINs conforme o produto. Se deixar apenas um, ele será automaticamente centralizado na ficha técnica.
                  </p>
                </div>
              </div>

              {/* Bloco GTIN-13 */}
              <div className={`p-3 rounded-lg border transition-all ${
                ficha.codigosBarra?.habilitarGtin13 !== false
                  ? 'bg-white border-slate-300 shadow-xs'
                  : 'bg-slate-50 border-dashed border-slate-200 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="toggle-gtin13"
                      checked={ficha.codigosBarra?.habilitarGtin13 !== false}
                      onChange={(e) => {
                        updateNestedField('codigosBarra', 'habilitarGtin13', e.target.checked);
                      }}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <label htmlFor="toggle-gtin13" className="font-bold text-slate-800 cursor-pointer">
                      GTIN-13 (Menor Unidade de Venda)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentStatus = ficha.codigosBarra?.habilitarGtin13 !== false;
                      updateNestedField('codigosBarra', 'habilitarGtin13', !currentStatus);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded font-semibold transition cursor-pointer ${
                      ficha.codigosBarra?.habilitarGtin13 !== false
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {ficha.codigosBarra?.habilitarGtin13 !== false ? '✕ Remover da Ficha' : '+ Adicionar à Ficha'}
                  </button>
                </div>

                {ficha.codigosBarra?.habilitarGtin13 !== false ? (
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="text"
                      maxLength={13}
                      value={ficha.codigosBarra?.gtin13 || ''}
                      onChange={(e) => updateNestedField('codigosBarra', 'gtin13', e.target.value)}
                      placeholder="Ex: 7898996109653 (13 dígitos)"
                      className="flex-1 px-2.5 py-1.5 rounded border border-slate-200 font-sans font-semibold"
                    />
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200 flex items-center justify-center">
                      <FunctionalBarcode code={ficha.codigosBarra?.gtin13} type="GTIN-13" height={28} width={1.1} />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    GTIN-13 desativado para este produto. O GTIN-14 (se ativo) ficará centralizado no retângulo.
                  </p>
                )}
              </div>

              {/* Bloco GTIN-14 */}
              <div className={`p-3 rounded-lg border transition-all ${
                ficha.codigosBarra?.habilitarGtin14 !== false
                  ? 'bg-white border-slate-300 shadow-xs'
                  : 'bg-slate-50 border-dashed border-slate-200 opacity-75'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="toggle-gtin14"
                      checked={ficha.codigosBarra?.habilitarGtin14 !== false}
                      onChange={(e) => {
                        updateNestedField('codigosBarra', 'habilitarGtin14', e.target.checked);
                      }}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <label htmlFor="toggle-gtin14" className="font-bold text-slate-800 cursor-pointer">
                      GTIN-14 (Embalagem Master Caixa)
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentStatus = ficha.codigosBarra?.habilitarGtin14 !== false;
                      updateNestedField('codigosBarra', 'habilitarGtin14', !currentStatus);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded font-semibold transition cursor-pointer ${
                      ficha.codigosBarra?.habilitarGtin14 !== false
                        ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    {ficha.codigosBarra?.habilitarGtin14 !== false ? '✕ Remover da Ficha' : '+ Adicionar à Ficha'}
                  </button>
                </div>

                {ficha.codigosBarra?.habilitarGtin14 !== false ? (
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="text"
                      maxLength={14}
                      value={ficha.codigosBarra?.gtin14 || ''}
                      onChange={(e) => updateNestedField('codigosBarra', 'gtin14', e.target.value)}
                      placeholder="Ex: 97898996109656 (14 dígitos)"
                      className="flex-1 px-2.5 py-1.5 rounded border border-slate-200 font-sans font-semibold"
                    />
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-200 flex items-center justify-center">
                      <FunctionalBarcode code={ficha.codigosBarra?.gtin14} type="GTIN-14" height={28} width={1.1} />
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 italic">
                    GTIN-14 desativado para este produto. O GTIN-13 (se ativo) ficará centralizado no retângulo.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 5: FÍSICO-QUÍMICA & CONSERVAÇÃO
            ========================================================= */}
        {activeTab === 'parametros' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Temperatura de Conservação</label>
                <input
                  type="text"
                  value={ficha.conservacao.temperatura}
                  onChange={(e) => updateNestedField('conservacao', 'temperatura', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 uppercase font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Dias de Validade (Ex: 365)</label>
                <input
                  type="text"
                  value={ficha.conservacao.diasValidade}
                  onChange={(e) => updateNestedField('conservacao', 'diasValidade', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-800">Características Físico-Químicas e Microbiológicas</h4>
                <button
                  type="button"
                  onClick={addParam}
                  className="px-2 py-1 bg-slate-800 text-white rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-slate-900"
                >
                  <Plus className="w-3 h-3" /> Adicionar Parâmetro
                </button>
              </div>

              <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                {ficha.parametros.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={p.parametro}
                      onChange={(e) => handleParamChange(idx, 'parametro', e.target.value)}
                      placeholder="Nome do Parâmetro (ex: pH)"
                      className="flex-1 px-2.5 py-1 rounded border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={p.valor}
                      onChange={(e) => handleParamChange(idx, 'valor', e.target.value)}
                      placeholder="Limite / Padrão (ex: 5,4 a 5,8)"
                      className="w-48 px-2.5 py-1 rounded border border-slate-200 text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => removeParam(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 6: TABELA NUTRICIONAL
            ========================================================= */}
        {activeTab === 'nutricional' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Porções por Embalagem</label>
                <input
                  type="text"
                  value={ficha.nutricional.porcoesPorEmbalagem}
                  onChange={(e) => updateNestedField('nutricional', 'porcoesPorEmbalagem', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tamanho da Porção</label>
                <input
                  type="text"
                  value={ficha.nutricional.tamanhoPorcao}
                  onChange={(e) => updateNestedField('nutricional', 'tamanhoPorcao', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-800">Itens Nutricionais</h4>
                <button
                  type="button"
                  onClick={addNutriItem}
                  className="px-2 py-1 bg-slate-800 text-white rounded text-[11px] font-semibold flex items-center gap-1 hover:bg-slate-900"
                >
                  <Plus className="w-3 h-3" /> Adicionar Nutriente
                </button>
              </div>

              <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                {ficha.nutricional.itens.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.nutriente}
                      onChange={(e) => handleNutriChange(idx, 'nutriente', e.target.value)}
                      placeholder="Nutriente"
                      className="flex-1 px-2.5 py-1 rounded border border-slate-200 text-xs font-medium"
                    />
                    <input
                      type="text"
                      value={item.qtd100g}
                      onChange={(e) => handleNutriChange(idx, 'qtd100g', e.target.value)}
                      placeholder="100g"
                      className="w-16 px-2 py-1 rounded border border-slate-200 text-xs font-mono text-center"
                    />
                    <input
                      type="text"
                      value={item.qtdPorcao}
                      onChange={(e) => handleNutriChange(idx, 'qtdPorcao', e.target.value)}
                      placeholder="Porção"
                      className="w-16 px-2 py-1 rounded border border-slate-200 text-xs font-mono text-center"
                    />
                    <input
                      type="text"
                      value={item.vd}
                      onChange={(e) => handleNutriChange(idx, 'vd', e.target.value)}
                      placeholder="%VD"
                      className="w-14 px-2 py-1 rounded border border-slate-200 text-xs font-mono font-semibold text-center"
                    />
                    <button
                      type="button"
                      onClick={() => removeNutriItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            ABA 7: EMPRESA, CABEÇALHO & IDENTIDADE VISUAL
            ========================================================= */}
        {activeTab === 'empresa' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Razão Social da Empresa</label>
              <input
                type="text"
                value={company.razaoSocial}
                onChange={(e) => onCompanyChange({ ...company, razaoSocial: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Endereço Completo</label>
              <input
                type="text"
                value={company.endereco}
                onChange={(e) => onCompanyChange({ ...company, endereco: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dados Fiscais (CEP, CNPJ, IE)</label>
              <input
                type="text"
                value={company.dadosFiscais}
                onChange={(e) => onCompanyChange({ ...company, dadosFiscais: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Órgão de Inspeção</label>
                <input
                  type="text"
                  value={company.orgaoInspecao}
                  placeholder="S.I.E ou S.I.F"
                  onChange={(e) => onCompanyChange({ ...company, orgaoInspecao: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 uppercase font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Número Inspeção</label>
                <input
                  type="text"
                  value={company.numInspecao}
                  placeholder="Ex: 1280"
                  onChange={(e) => onCompanyChange({ ...company, numInspecao: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Código Empresa</label>
                <input
                  type="text"
                  value={company.codigoEmpresa}
                  placeholder="Ex: 065"
                  onChange={(e) => onCompanyChange({ ...company, codigoEmpresa: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-bold"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <label className="font-semibold text-slate-700 block mb-1">Logotipo da Empresa</label>
              <div className="flex items-center gap-3">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt="Logo"
                    className="h-10 max-w-[120px] object-contain border border-slate-200 rounded p-1 bg-white"
                  />
                ) : (
                  <div className="h-10 w-24 bg-slate-100 rounded border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-[10px]">
                    Sem logo
                  </div>
                )}
                <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded cursor-pointer font-semibold flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Logotipo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleLogoUpload(e.target.files[0])}
                  />
                </label>
                {company.logoUrl && (
                  <button
                    type="button"
                    onClick={() => onCompanyChange({ ...company, logoUrl: '' })}
                    className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <label className="font-semibold text-slate-700 block mb-1">Cor Primária do Tema da Ficha</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={company.corPrimaria}
                  onChange={(e) => onCompanyChange({ ...company, corPrimaria: e.target.value })}
                  className="w-10 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                />
                <span className="font-mono text-slate-700 font-semibold">{company.corPrimaria}</span>
                <div className="flex gap-1 ml-auto">
                  {['#c5161d', '#1e3a8a', '#047857', '#0f172a', '#b45309'].map((cor) => (
                    <button
                      key={cor}
                      type="button"
                      onClick={() => onCompanyChange({ ...company, corPrimaria: cor })}
                      className="w-6 h-6 rounded-full border border-slate-300 shadow-sm"
                      style={{ backgroundColor: cor }}
                      title={`Selecionar ${cor}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
