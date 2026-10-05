import { mockImages } from './mockImages';

// Dados padrão e de exemplo baseados na ficha técnica original
export const defaultCompany = {
  razaoSocial: "FRIRED ALIMENTOS LTDA",
  endereco: "LOTEAMENTO 02 S/N - POLO INDUSTRIAL II - MIRACEMA RJ",
  dadosFiscais: "CEP: 28.460-000  •  CNPJ: 19.780.007/0001-00  •  Inscr. Estadual: 86.910546",
  orgaoInspecao: "S.I.E",
  numInspecao: "1280",
  codigoEmpresa: "065",
  logoText: "FRIRED",
  logoSubtext: "ALIMENTOS",
  logoUrl: "/logo.jpg", // Imagem oficial anexada pelo usuário
  corPrimaria: "#8b181b", // Vermelho escuro corporativo da nova logo Frired
  corSecundaria: "#0f172a", // Slate escuro
};

export const sampleFichas = [
  {
    id: "ficha-13003",
    codigo: "13003",
    nome: "MIÚDOS CONGELADOS DE BOVINO (MOCOTÓ)",
    registroOrgao: "065/1280",
    categoria: "Bovinos Congelados",
    dataCriacao: "2026-03-15",
    versao: "1.0",
    
    // Pesos e Embalagem
    pesosEmbalagem: {
      unidCaixa: "10",
      pesoLiqEmb: "DEVE SER PESADO NA PRESENÇA DO CONSUMIDOR",
      pesoLiqFinalCx: "DEVE SER PESADO NA PRESENÇA DO CONSUMIDOR",
      pesoEmbPrimaria: "0,017 kg",
      tipoEmbMaster: "CAIXA DE PAPELÃO",
      dimensoesCx: "550 x 351 x 156 mm",
      pesoEmbMaster: "0,844 kg",
      pesoBruto: "0,844 kg",
      paletizacao: "8 x 5 (40 cx)",
      validade: "365 DIAS",
    },

    // Dados Fiscais / Tributários
    fiscal: {
      icms: "0%",
      icmsReduz: "-",
      iva: "-",
      pis: "0%",
      cofins: "0%",
      cstIcms: "040",
      cstPisCofins: "08",
      ceop: "",
      cfop: "",
      ncm: "02062990",
    },

    // Códigos de Barras
    codigosBarra: {
      gtin13: "7898996109653",
      gtin14: "97898996109656",
    },

    // Definição e Classificação
    definicao:
      "Mocotó é de origem animal comestível obtido no abate de bovinos. Procedimento acompanhado pelo controle de qualidade, inspecionados. Exame \"ante mortem\", checagem do GTA, repouso, jejum alimentar e dieta hídrica, inspeção \"post mortem\", carcaças e vísceras. Os miúdos são obtidos na evisceração, inspecionados, conduzidos a salas de desossa/corte e imediatamente resfriados/congelados.",
    classificacao: "MIÚDOS CONGELADOS DE BOVINO",

    // Conservação
    conservacao: {
      temperatura: "MANTENHA O PRODUTO CONGELADO, -12°C OU MAIS FRIO",
      diasValidade: "365",
    },

    // Características Físico-Químicas e Microbiológicas
    parametros: [
      { parametro: "Umidade", valor: "78%" },
      { parametro: "Gordura", valor: "até 5%" },
      { parametro: "Proteína", valor: "18% a 22%" },
      { parametro: "Amido", valor: "Ausente (0%)" },
      { parametro: "Cinzas", valor: "0,8% a 1,5%" },
      { parametro: "Nitrito residual", valor: "Ausente (0 ppm)" },
      { parametro: "pH", valor: "5,4 a 5,8" },
      { parametro: "Salmonella sp.", valor: "Ausência em 25g" },
      { parametro: "Listeria monocytogenes", valor: "Não estabelecido para in natura" },
      { parametro: "Estafilococos coagulase positiva", valor: "Máx. 5 x 10³ UFC/g" },
      { parametro: "Contagem de aeróbios mesófilos", valor: "Máx. 5 x 10⁶ UFC/g" },
    ],

    // Ingredientes & Alérgenos
    ingredientes: "MIÚDOS CONGELADOS DE BOVINO",
    alergicos: "NÃO CONTÉM GLÚTEN",

    // Informação Nutricional
    nutricional: {
      porcoesPorEmbalagem: "100",
      tamanhoPorcao: "100g",
      itens: [
        { nutriente: "VALOR ENERGÉTICO (KCAL)", qtd100g: "150", qtdPorcao: "75", vd: "4" },
        { nutriente: "CARBOIDRATOS (G)", qtd100g: "0", qtdPorcao: "0", vd: "0" },
        { nutriente: "AÇÚCARES TOTAIS (G)", qtd100g: "0", qtdPorcao: "0", vd: "-" },
        { nutriente: "AÇÚCARES ADICIONADOS (G)", qtd100g: "0", qtdPorcao: "0", vd: "0" },
        { nutriente: "PROTEÍNAS (G)", qtd100g: "19", qtdPorcao: "9,5", vd: "19" },
        { nutriente: "GORDURAS TOTAIS (G)", qtd100g: "8", qtdPorcao: "4", vd: "6" },
        { nutriente: "GORDURAS SATURADAS (G)", qtd100g: "3,5", qtdPorcao: "1,8", vd: "9" },
        { nutriente: "GORDURAS TRANS (G)", qtd100g: "0", qtdPorcao: "0", vd: "0" },
        { nutriente: "FIBRAS ALIMENTARES (G)", qtd100g: "0", qtdPorcao: "0", vd: "0" },
        { nutriente: "SÓDIO (MG)", qtd100g: "70", qtdPorcao: "35", vd: "2" },
      ],
    },

    // Apresentação do Produto (As 4 partes estilo janela solicitadas)
    apresentacao: {
      inNatura: {
        titulo: "IN NATURA",
        descricao: "MOCOTÓ BOVINO HIGIENIZADO",
        imagem: mockImages.inNatura,
      },
      primaria: {
        titulo: "EMBALAGEM PRIMÁRIA",
        descricao: "BOLSA PLÁSTICA A VÁCUO TERMOFORMADA",
        imagem: mockImages.primaria,
      },
      secundaria: {
        titulo: "EMBALAGEM SECUNDÁRIA",
        descricao: "CAIXA MASTER DE PAPELÃO 550x351x156",
        imagem: mockImages.secundaria,
      },
      palletizado: {
        titulo: "PALLETIZADO",
        descricao: "PALLET PBR 8 x 5 COM FILME STRETCH",
        imagem: mockImages.palletizado,
      },
    },
  },
];
