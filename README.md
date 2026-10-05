# Sistema de Fichas Técnicas Profissional & Minimalista

Aplicação web moderna, minimalista e corporativa desenvolvida para criação, edição e emissão de **Fichas Técnicas Industriais de Produtos Alimentícios** em formato PDF de página única A4, seguindo rigorosos padrões de conformidade técnica e auditoria.

Desenvolvido por **[Daniel Von Heldh](https://github.com/VonHeldh)**.

---

## 🌟 Recursos Principais

- **Apresentação do Produto em Janelas Técnicas**:
  - Suporte adaptativo dinâmico para **4, 3, 2 ou 1 imagem** por produto (In Natura, Embalagem Primária, Embalagem Secundária e Palletizado).
  - Alinhamento matemático estrito de proporção (50%/50%) para visualização sem cortes no PDF.
  - Upload de imagens locais direto pelo navegador com prévia e zoom em alta definição.

- **Códigos de Barras Funcionais & Escaneáveis**:
  - Geração vetorial nativa de códigos **GTIN-13 (EAN-13)** e **GTIN-14 (ITF-14)** com números integrados.
  - Opção de ativar ou remover individualmente os GTINs por produto, com **centralização automática** dentro do retângulo técnico.

- **Layout A4 Blindado para Impressão & Exportação PDF**:
  - CSS com regras `@media print` calibradas para página única A4 (210mm x 297mm) sem quebras indesejadas.
  - Rodapé oficial de conformidade: `PRODUTO REVISADO E APROVADO • EMISSÃO: DD/MM/AAAA`.

- **Navegação & Interface Apple Dark Minimalista**:
  - Barra superior refinada com efeito translúcido (*backdrop blur*), ícones interativos e atalhos rápidos.
  - Modos de visualização: **Dividido** (Editor + Prévia), **Folha A4** (Prévia em tela cheia) e **Editor**.

- **Gerenciamento Completo de Fichas (CRUD + Persistência)**:
  - Criação, duplicação e exclusão de fichas técnicas com salvamento automático no `localStorage`.
  - Exportação e importação de backups completos em formato `.json`.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** — Biblioteca UI moderna e performática.
- **[Vite](https://vitejs.dev/)** — Ferramenta de build rápida para front-end.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Framework utilitário de estilização.
- **[JsBarcode](https://lindell.me/JsBarcode/)** — Renderização de códigos de barras vetoriais escaláveis.
- **[Lucide Icons](https://lucide.dev/)** — Conjunto de ícones vetoriais leves e consistentes.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior instalada)

### Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/VonHeldh/sistema-fichas-tecnicas.git
cd sistema-fichas-tecnicas
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```text
http://127.0.0.1:5173
```

> **No Windows**: Você também pode iniciar com dois cliques no arquivo executável `iniciar.bat`.

---

## 🖨️ Instruções para Emissão do PDF Perfeito

1. No topo da tela, clique no botão **"Emitir PDF"** (ou use o atalho `Ctrl + P`).
2. Na caixa de diálogo de impressão do navegador:
   - **Destino**: `Salvar como PDF`
   - **Páginas**: `1` (Tudo)
   - **Layout**: `Retrato`
   - **Mais definições**:
     - **Tamanho do papel**: `A4`
     - **Margens**: `Padrão` ou `Nenhuma`
     - **Gráficos de segundo plano**: **Marcar / Ativar**
3. Clique em **Salvar**.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE). Consulte o arquivo `LICENSE` para mais detalhes.
