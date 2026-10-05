import React, { useMemo } from 'react';
import { FunctionalBarcode } from './BarcodeBoxes';
import { ProductPresentation } from './ProductPresentation';

export function FichaPreview({ ficha, company, onImageClick, zoomScale = 1 }) {
  const dataHoje = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);

  if (!ficha) return null;

  const corPrimaria = company?.corPrimaria || '#c5161d';

  return (
    <div
      className="ficha-page-a4 bg-white text-slate-900 mx-auto select-text shadow-xl print:shadow-none border border-slate-300 print:border-none transition-transform origin-top flex flex-col justify-between overflow-hidden"
      style={{
        width: '210mm',
        height: '297mm',
        maxHeight: '297mm',
        padding: '5mm 6mm 4mm 6mm',
        transform: zoomScale !== 1 ? `scale(${zoomScale})` : undefined,
        boxSizing: 'border-box',
      }}
    >
      {/* Moldura estrutural minimalista externa */}
      <div className="border-[1.5px] border-slate-800 flex-1 flex flex-col justify-between text-[10px] leading-tight font-sans overflow-hidden">
        
        {/* ========================================================
            1. CABEÇALHO (HEADER EMPRESA + S.I.E + FICHA TÉCNICA)
            ======================================================== */}
        <div className="border-b-[1.5px] border-slate-800">
          <div className="flex items-stretch min-h-[58px]">
            {/* Logo da Empresa */}
            <div className="w-[185px] border-r-[1.5px] border-slate-800 p-1 flex items-center justify-center bg-white overflow-hidden">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.razaoSocial}
                  className="w-full h-full max-h-[55px] object-contain p-0.5"
                />
              ) : (
                <div className="flex items-center gap-1.5 text-left">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-sm"
                    style={{ backgroundColor: corPrimaria }}
                  >
                    {company.logoText?.slice(0, 3) || 'FRI'}
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block tracking-tight leading-none">
                      {company.logoText || 'FRIRED'}
                    </span>
                    <span className="text-[8px] font-semibold text-slate-500 tracking-widest block uppercase">
                      {company.logoSubtext || 'ALIMENTOS'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Informações da Empresa / Endereço / CNPJ */}
            <div className="flex-1 p-2 flex flex-col justify-center text-center px-3 border-r-[1.5px] border-slate-800 bg-white">
              <h1 className="font-black text-[13px] tracking-wide text-slate-900 uppercase">
                {company.razaoSocial}
              </h1>
              <p className="text-[8px] text-slate-600 font-medium mt-0.5 tracking-tight uppercase">
                {company.endereco}
              </p>
              <p className="text-[8px] text-slate-500 font-medium mt-0.5">
                {company.dadosFiscais}
              </p>
            </div>

            {/* Selo de Inspeção Oficial (S.I.E / S.I.F) */}
            <div className="w-[145px] flex items-stretch">
              <div className="flex-1 bg-sky-700 text-white flex flex-col items-center justify-center p-1 border-r border-slate-800 text-center font-bold">
                <span className="text-[9px] tracking-widest uppercase opacity-90">
                  {company.orgaoInspecao || 'S.I.E'}
                </span>
                <span className="text-base font-black tracking-tight leading-none mt-0.5">
                  {company.numInspecao || '1280'}
                </span>
              </div>
              <div className="w-14 flex items-center justify-center font-black text-sm text-slate-900 bg-white">
                {company.codigoEmpresa || '065'}
              </div>
            </div>
          </div>

          {/* Faixa Título FICHA TÉCNICA */}
          <div
            className="py-1 text-center font-black text-[12px] tracking-[0.25em] text-white shadow-inner uppercase border-t border-slate-800"
            style={{ backgroundColor: corPrimaria }}
          >
            FICHA TÉCNICA
          </div>
        </div>

        {/* ========================================================
            2. IDENTIFICAÇÃO BÁSICA DO PRODUTO
            ======================================================== */}
        <div className="grid grid-cols-12 border-b-[1.5px] border-slate-800 bg-white font-semibold">
          <div className="col-span-3 border-r border-slate-800 px-2 py-1 flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase">CÓDIGO:</span>
            <span className="font-sans font-bold text-xs text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              {ficha.codigo}
            </span>
          </div>
          <div className="col-span-6 border-r border-slate-800 px-2 py-1 flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase">PRODUTO:</span>
            <span className="font-extrabold text-[11px] text-slate-900 tracking-tight uppercase truncate">
              {ficha.nome}
            </span>
          </div>
          <div className="col-span-3 px-2 py-1 flex items-center justify-between text-right">
            <span className="text-[8.5px] font-bold text-slate-500 uppercase">
              Nº DE REGISTRO {company.orgaoInspecao || 'S.I.E'}:
            </span>
            <span className="font-bold text-[10px] text-slate-900 font-sans">
              {ficha.registroOrgao}
            </span>
          </div>
        </div>

        {/* ========================================================
            3. TABELA DE PESO DO PRODUTO & EMBALAGEM
            ======================================================== */}
        <div className="border-b-[1.5px] border-slate-800 bg-white">
          {/* Cabeçalho da Tabela */}
          <div className="grid grid-cols-10 text-center font-black text-[9px] border-b border-slate-800 bg-slate-100 text-slate-900 uppercase">
            <div className="col-span-3 border-r border-slate-800 py-1 bg-slate-200/90 tracking-wider font-extrabold text-slate-950">
              PESO DO PRODUTO
            </div>
            <div className="col-span-7 py-1 bg-slate-200/90 tracking-wider font-extrabold text-slate-950">
              EMBALAGEM
            </div>
          </div>

          {/* Subtítulos das Colunas */}
          <div className="grid grid-cols-10 text-center text-[7.5px] font-bold border-b border-slate-300 bg-slate-50 text-slate-700 uppercase">
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">UNID. NA CAIXA</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">PESO LÍQ. EMBALAGEM</div>
            <div className="border-r border-slate-800 px-1 py-1 flex items-center justify-center">PESO LÍQ. FINAL CX.</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">PESO EMB. PRIMÁRIA</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">EMBALAGEM MASTER CAIXA</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">DIMENSÕES CX. PAPELÃO</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">PESO EMB. MASTER</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">PESO BRUTO</div>
            <div className="border-r border-slate-300 px-1 py-1 flex items-center justify-center">PALETIZAÇÃO</div>
            <div className="px-1 py-1 flex items-center justify-center">VALIDADE</div>
          </div>

          {/* Dados das Colunas */}
          <div className="grid grid-cols-10 text-center text-[8px] text-slate-900 min-h-[26px]">
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-bold">
              {ficha.pesosEmbalagem.unidCaixa}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center text-[7.5px] leading-tight font-medium uppercase">
              {ficha.pesosEmbalagem.pesoLiqEmb}
            </div>
            <div className="border-r border-slate-800 px-1 py-1.5 flex items-center justify-center text-[7.5px] leading-tight font-medium uppercase">
              {ficha.pesosEmbalagem.pesoLiqFinalCx}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-sans font-medium">
              {ficha.pesosEmbalagem.pesoEmbPrimaria}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center leading-tight font-medium uppercase">
              {ficha.pesosEmbalagem.tipoEmbMaster}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-sans text-[7.5px] font-medium">
              {ficha.pesosEmbalagem.dimensoesCx}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-sans font-medium">
              {ficha.pesosEmbalagem.pesoEmbMaster}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-sans font-semibold">
              {ficha.pesosEmbalagem.pesoBruto}
            </div>
            <div className="border-r border-slate-300 px-1 py-1.5 flex items-center justify-center font-semibold uppercase">
              {ficha.pesosEmbalagem.paletizacao}
            </div>
            <div className="px-1 py-1.5 flex items-center justify-center font-bold text-slate-900 uppercase">
              {ficha.pesosEmbalagem.validade}
            </div>
          </div>
        </div>

        {/* ========================================================
            4. DADOS TRIBUTÁRIOS / FISCAIS
            ======================================================== */}
        <div className="border-b-[1.5px] border-slate-800 bg-white">
          <div className="grid grid-cols-12 text-center text-[7.5px] font-bold border-b border-slate-300 bg-slate-50 text-slate-700 uppercase">
            <div className="border-r border-slate-300 py-1">% ICMS</div>
            <div className="border-r border-slate-300 py-1">% ICMS REDUZ</div>
            <div className="border-r border-slate-300 py-1">% IVA (PRODUT)</div>
            <div className="border-r border-slate-300 py-1">% PIS</div>
            <div className="border-r border-slate-800 py-1">% COFINS</div>
            <div className="border-r border-slate-300 py-1">CST ICMS</div>
            <div className="border-r border-slate-800 py-1">CST PIS/COFINS</div>
            <div className="col-span-2 border-r border-slate-800 py-1">CEOP</div>
            <div className="col-span-3 py-1">CÓDIGO NCM</div>
          </div>

          <div className="grid grid-cols-12 text-center text-[8.5px] min-h-[24px] items-center">
            <div className="border-r border-slate-300 py-1 font-sans">{ficha.fiscal.icms}</div>
            <div className="border-r border-slate-300 py-1 font-sans">{ficha.fiscal.icmsReduz}</div>
            <div className="border-r border-slate-300 py-1 font-sans">{ficha.fiscal.iva}</div>
            <div className="border-r border-slate-300 py-1 font-sans">{ficha.fiscal.pis}</div>
            <div className="border-r border-slate-800 py-1 font-sans">{ficha.fiscal.cofins}</div>
            <div className="border-r border-slate-300 py-1 font-sans font-bold text-slate-900">
              {ficha.fiscal.cstIcms}
            </div>
            <div className="border-r border-slate-800 py-1 font-sans font-bold text-slate-900">
              {ficha.fiscal.cstPisCofins}
            </div>
            {/* CEOP: Limpo e minimalista sem quadradinhos */}
            <div className="col-span-2 border-r border-slate-800 py-1 font-sans font-bold text-slate-900">
              {ficha.fiscal.ceop || ''}
            </div>
            {/* CÓDIGO NCM: Limpo e minimalista sem quadradinhos */}
            <div className="col-span-3 py-1 font-sans font-bold text-slate-900 tracking-widest text-[9px]">
              {ficha.fiscal.ncm || ''}
            </div>
          </div>
        </div>

        {/* ========================================================
            5. CÓDIGOS DE BARRAS (GTIN-13 E GTIN-14 CENTRALIZADOS)
            ======================================================== */}
        {(() => {
          const hasGtin13 = ficha.codigosBarra?.habilitarGtin13 ?? (ficha.codigosBarra?.gtin13 !== '' && ficha.codigosBarra?.gtin13 !== undefined);
          const hasGtin14 = ficha.codigosBarra?.habilitarGtin14 ?? (ficha.codigosBarra?.gtin14 !== '' && ficha.codigosBarra?.gtin14 !== undefined);
          const bothActive = hasGtin13 && hasGtin14;
          const noneActive = !hasGtin13 && !hasGtin14;

          if (noneActive) {
            return (
              <div className="border-b-[1.5px] border-slate-800 bg-slate-50/50 py-3 text-center text-[8px] font-semibold text-slate-400 uppercase tracking-widest">
                SEM CÓDIGOS DE BARRAS REGISTRADOS
              </div>
            );
          }

          return (
            <div className="border-b-[1.5px] border-slate-800 bg-white flex flex-col justify-center">
              {/* GTIN-13 (EAN-13 Centralizado) */}
              {hasGtin13 && (
                <div className={`relative flex items-center justify-center px-3 ${bothActive ? 'py-1.5 border-b border-slate-200' : 'py-3'}`}>
                  <span className="absolute left-3 font-bold text-[8.5px] text-slate-500 uppercase tracking-wider">
                    GTIN-13
                  </span>
                  <div className="flex items-center justify-center">
                    <FunctionalBarcode
                      code={ficha.codigosBarra?.gtin13}
                      type="GTIN-13"
                      height={bothActive ? 26 : 32}
                      width={bothActive ? 1.25 : 1.4}
                      displayValue={true}
                      fontSize={10}
                    />
                  </div>
                </div>
              )}

              {/* GTIN-14 (ITF-14 Centralizado) */}
              {hasGtin14 && (
                <div className={`relative flex items-center justify-center px-3 ${bothActive ? 'py-1.5' : 'py-3'}`}>
                  <span className="absolute left-3 font-bold text-[8.5px] text-slate-500 uppercase tracking-wider">
                    GTIN-14
                  </span>
                  <div className="flex items-center justify-center">
                    <FunctionalBarcode
                      code={ficha.codigosBarra?.gtin14}
                      type="GTIN-14"
                      height={bothActive ? 26 : 32}
                      width={bothActive ? 1.2 : 1.35}
                      displayValue={true}
                      fontSize={10}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ========================================================
            6. SEÇÃO CENTRAL (DEFINIÇÃO / CONSERVAÇÃO vs CLASSIFICAÇÃO / PARÂMETROS)
            ======================================================== */}
        <div className="grid grid-cols-2 border-b-[1.5px] border-slate-800 bg-white items-stretch">
          {/* Coluna Esquerda: Definição e Conservação */}
          <div className="border-r-[1.5px] border-slate-800 flex flex-col justify-between">
            {/* Bloco Definição */}
            <div className="flex-1 flex flex-col">
              <div className="bg-slate-100 border-b border-slate-800 py-0.5 text-center font-bold text-[8.5px] tracking-wider uppercase text-slate-800">
                DEFINIÇÃO
              </div>
              <div className="p-2.5 text-[9px] text-left leading-relaxed text-slate-800 flex-1">
                <p className="font-normal leading-relaxed">
                  {ficha.definicao}
                </p>
              </div>
            </div>

            {/* Bloco Conservação */}
            <div className="border-t-[1.5px] border-slate-800">
              <div className="bg-slate-100 border-b border-slate-800 py-0.5 text-center font-bold text-[8.5px] tracking-wider uppercase text-slate-800">
                CONSERVAÇÃO
              </div>
              <div className="grid grid-cols-12 text-[8px]">
                <div className="col-span-9 p-1.5 font-bold uppercase text-slate-800 border-r border-slate-800 flex items-center">
                  {ficha.conservacao.temperatura}
                </div>
                <div className="col-span-3 p-1.5 flex flex-col items-center justify-center text-center bg-slate-50">
                  <span className="text-[7px] text-slate-500 font-semibold uppercase">DIAS</span>
                  <span className="font-extrabold text-xs text-slate-900 font-sans">
                    {ficha.conservacao.diasValidade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Classificação e Parâmetros Físico-Químicos / Microbiológicos */}
          <div className="flex flex-col">
            {/* Bloco Classificação */}
            <div className="border-b border-slate-800">
              <div className="bg-slate-100 border-b border-slate-800 py-0.5 text-center font-bold text-[8.5px] tracking-wider uppercase text-slate-800">
                CLASSIFICAÇÃO
              </div>
              <div className="p-1.5 text-center font-bold text-[9px] uppercase tracking-wide text-slate-900">
                {ficha.classificacao}
              </div>
            </div>

            {/* Bloco Características Físico-Químicas e Microbiológicas */}
            <div className="flex-1 flex flex-col">
              <div className="bg-slate-100 border-b border-slate-800 py-0.5 text-center font-bold text-[8px] tracking-wider uppercase text-slate-800">
                CARACTERÍSTICAS FÍSICO-QUÍMICAS E MICROBIOLÓGICAS
              </div>
              <div className="flex-1 flex flex-col divide-y divide-slate-200 text-[7.5px]">
                {ficha.parametros.map((p, idx) => (
                  <div key={idx} className="flex justify-between px-2 py-[2.5px] hover:bg-slate-50">
                    <span className="text-slate-700 font-medium uppercase">{p.parametro}</span>
                    <span className="font-semibold text-slate-900 text-right uppercase">{p.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            7. SEÇÃO INFERIOR:
               ESQUERDA: INGREDIENTES + TABELA NUTRICIONAL + ALÉRGICOS
               DIREITA:  APRESENTAÇÃO DO PRODUTO (JANELA 4 PARTES)
            ======================================================== */}
        <div className="grid grid-cols-2 bg-white items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Coluna Esquerda: Ingredientes, Nutricional e Alérgicos */}
          <div className="border-r-[1.5px] border-slate-800 flex flex-col justify-between min-h-0 overflow-hidden">
            {/* Ingredientes */}
            <div className="border-b-[1.5px] border-slate-800">
              <div className="bg-slate-100 border-b border-slate-800 py-0.5 text-center font-bold text-[8.5px] tracking-wider uppercase text-slate-800">
                INGREDIENTES
              </div>
              <div className="p-2 text-[8px] font-semibold text-center uppercase tracking-wide text-slate-800">
                {ficha.ingredientes}
              </div>
            </div>

            {/* Informação Nutricional RDC/Anvisa */}
            <div className="flex-1 p-2 flex flex-col justify-between">
              <div className="border border-slate-300 rounded overflow-hidden">
                <div className="bg-slate-100 border-b border-slate-300 px-2 py-1 flex justify-between items-center text-[8px]">
                  <span className="font-extrabold uppercase tracking-tight text-slate-900">
                    INFORMAÇÃO NUTRICIONAL
                  </span>
                  <span className="text-slate-600 text-[7px] uppercase">
                    Porções por emb.: <strong className="text-slate-900">{ficha.nutricional.porcoesPorEmbalagem}</strong>
                  </span>
                </div>
                <div className="px-2 py-0.5 text-[7px] text-slate-500 border-b border-slate-200 bg-white uppercase">
                  Porção: <strong className="text-slate-800">{ficha.nutricional.tamanhoPorcao?.replace(/\s*\([^)]*pedaço[^)]*\)/gi, '').trim()}</strong>
                </div>

                {/* Tabela de Nutrientes */}
                <table className="w-full text-[7.5px] text-left">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-50 font-bold text-slate-700 uppercase">
                      <th className="py-0.5 px-2">Nutriente</th>
                      <th className="py-0.5 px-1 text-center">100g</th>
                      <th className="py-0.5 px-1 text-center">Porção</th>
                      <th className="py-0.5 px-2 text-right">%VD*</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ficha.nutricional.itens.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                        <td className="py-[1.8px] px-2 text-slate-800 font-medium uppercase">{item.nutriente}</td>
                        <td className="py-[1.8px] px-1 text-center font-sans text-slate-700">{item.qtd100g}</td>
                        <td className="py-[1.8px] px-1 text-center font-sans text-slate-700">{item.qtdPorcao}</td>
                        <td className="py-[1.8px] px-2 text-right font-sans font-semibold text-slate-900">{item.vd}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[6.5px] text-slate-400 mt-1 leading-tight uppercase">
                * Percentual de valores diários fornecidos pela porção.
              </p>
            </div>

            {/* Caixa de Alérgicos */}
            <div className="border-t-[1.5px] border-slate-800 p-2 text-center bg-slate-50">
              <span className="font-bold text-[8.5px] text-slate-700 uppercase tracking-wider mr-1">
                ALÉRGICOS:
              </span>
              <span className="font-extrabold text-[9px] text-slate-900 uppercase">
                {ficha.alergicos}
              </span>
            </div>
          </div>

          {/* Coluna Direita: APRESENTAÇÃO DO PRODUTO (JANELA COM AS 4 PARTES) */}
          <div className="p-2 flex-1 flex flex-col justify-stretch min-h-0 overflow-hidden">
            <ProductPresentation
              apresentacao={ficha.apresentacao}
              corPrimaria={corPrimaria}
              onImageClick={onImageClick}
            />
          </div>
        </div>

      </div>

      {/* Rodapé técnico sutil para rastreabilidade */}
      <div className="flex justify-between items-center text-[7px] text-slate-400 mt-1.5 px-1 font-sans uppercase">
        <span>Documento emitido eletronicamente • {company.razaoSocial}</span>
        <span>
          PRODUTO REVISADO E APROVADO • EMISSÃO: {ficha.dataEmissao || dataHoje}
        </span>
      </div>
    </div>
  );
}
