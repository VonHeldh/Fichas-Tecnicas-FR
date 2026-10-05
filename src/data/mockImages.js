// Ilustrações vetoriais profissionais em formato SVG para demonstração imediata
export const mockImages = {
  // 1. In Natura (Corte de Mocotó / Carne Bovina limpo e profissional)
  inNatura: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <radialGradient id="meatGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="45%" stop-color="#fecdd3"/>
          <stop offset="85%" stop-color="#fda4af"/>
          <stop offset="100%" stop-color="#e11d48"/>
        </radialGradient>
        <radialGradient id="boneGrad" cx="35%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="60%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </radialGradient>
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <g filter="url(#shadow)">
        <!-- Mocotó Bovino / In Natura Peça Central -->
        <path d="M120 40 C170 35, 190 60, 185 95 C182 120, 195 150, 180 200 C170 235, 190 260, 175 270 C155 275, 140 265, 130 250 C118 265, 105 275, 85 270 C70 260, 90 235, 80 200 C65 150, 78 120, 75 95 C70 60, 90 35, 120 40 Z" fill="url(#meatGrad)" stroke="#fb7185" stroke-width="2"/>
        <!-- Osso e cartilagem central -->
        <ellipse cx="130" cy="80" rx="36" ry="26" fill="url(#boneGrad)" stroke="#94a3b8" stroke-width="2"/>
        <ellipse cx="130" cy="80" rx="16" ry="12" fill="#e2e8f0"/>
        <!-- Linhas e texturas naturais -->
        <path d="M100 130 Q130 145 160 135" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.4" stroke-dasharray="3 3"/>
        <path d="M95 180 Q130 195 165 180" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.4" stroke-dasharray="3 3"/>
        <path d="M110 220 Q130 230 150 220" stroke="#f43f5e" stroke-width="2" fill="none" opacity="0.4"/>
      </g>
      <rect x="75" y="24" width="150" height="20" rx="10" fill="#0f172a" opacity="0.85"/>
      <text x="150" y="38" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">1. IN NATURA (BOVINO)</text>
    </svg>
  `)}`,

  // 2. Embalagem Primária (Bolsa termoformada / vácuo com selagem cristal)
  primaria: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <linearGradient id="pouchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="30%" stop-color="#f0f9ff" stop-opacity="0.75"/>
          <stop offset="70%" stop-color="#e0f2fe" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.8"/>
        </linearGradient>
        <filter id="pouchShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" flood-opacity="0.12"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <g filter="url(#pouchShadow)">
        <!-- Saco a Vácuo -->
        <rect x="55" y="45" width="190" height="215" rx="8" fill="url(#pouchGrad)" stroke="#38bdf8" stroke-width="2"/>
        <!-- Aba de selagem superior -->
        <rect x="50" y="45" width="200" height="18" fill="#0284c7" rx="4"/>
        <line x1="55" y1="54" x2="245" y2="54" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4 2"/>
        <!-- Aba de selagem inferior -->
        <rect x="55" y="245" width="190" height="15" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1"/>
        <line x1="58" y1="252" x2="242" y2="252" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3 2"/>
        <!-- Silhueta da carne dentro do vácuo -->
        <path d="M95 100 C130 90, 175 95, 195 125 C215 155, 190 210, 165 220 C140 230, 100 215, 95 180 Z" fill="#fda4af" opacity="0.85"/>
        <ellipse cx="140" cy="135" rx="20" ry="14" fill="#ffffff" opacity="0.9"/>
        <!-- Rótulo Primário Oficial -->
        <rect x="85" y="155" width="130" height="60" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
        <rect x="90" y="160" width="120" height="10" fill="#c5161d"/>
        <text x="150" y="168" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">FRIRED ALIMENTOS</text>
        <text x="150" y="182" font-family="system-ui, sans-serif" font-size="7.5" font-weight="700" fill="#0f172a" text-anchor="middle">MOCOTÓ BOVINO</text>
        <text x="150" y="194" font-family="system-ui, sans-serif" font-size="6" fill="#64748b" text-anchor="middle">PESO LÍQ: SOB PESAGEM</text>
        <text x="150" y="204" font-family="system-ui, sans-serif" font-size="6" font-weight="600" fill="#0369a1" text-anchor="middle">S.I.E 1280 • EMB. PRIMÁRIA</text>
      </g>
      <rect x="65" y="20" width="170" height="20" rx="10" fill="#0369a1"/>
      <text x="150" y="34" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">2. EMBALAGEM PRIMÁRIA</text>
    </svg>
  `)}`,

  // 3. Embalagem Secundária (Caixa master de papelão frigorífica)
  secundaria: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <linearGradient id="kraftTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e4c59e"/>
          <stop offset="100%" stop-color="#d4b285"/>
        </linearGradient>
        <linearGradient id="kraftFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#c99f6b"/>
          <stop offset="100%" stop-color="#b68852"/>
        </linearGradient>
        <linearGradient id="kraftSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b88d57"/>
          <stop offset="100%" stop-color="#9d743f"/>
        </linearGradient>
        <filter id="boxShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <g filter="url(#boxShadow)">
        <!-- Topo da caixa perspectiva 3D -->
        <polygon points="60,95 180,60 255,85 135,120" fill="url(#kraftTop)" stroke="#8c6433" stroke-width="1.5"/>
        <line x1="120" y1="78" x2="195" y2="102" stroke="#b08b59" stroke-width="2"/>
        <!-- Fita adesiva superior -->
        <polygon points="110,81 135,74 210,99 185,106" fill="#cbd5e1" opacity="0.6"/>
        <!-- Frente da caixa -->
        <polygon points="60,95 135,120 135,230 60,200" fill="url(#kraftFront)" stroke="#8c6433" stroke-width="1.5"/>
        <!-- Lado direito da caixa -->
        <polygon points="135,120 255,85 255,190 135,230" fill="url(#kraftSide)" stroke="#8c6433" stroke-width="1.5"/>
        <!-- Impressões no lado direito (marca e dados) -->
        <g transform="matrix(0.9 0 -0.2 0.85 55 45)">
          <rect x="140" y="90" width="85" height="18" fill="#c5161d" rx="2"/>
          <text x="182" y="103" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">FRIRED</text>
          <text x="182" y="120" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#ffffff">ALIMENTOS</text>
          <text x="140" y="135" font-family="system-ui, sans-serif" font-size="6.5" fill="#ffffff">MIÚDOS CONGELADOS</text>
          <text x="140" y="145" font-family="system-ui, sans-serif" font-size="6" fill="#f8fafc">10 UNIDADES • 550x351x156</text>
          <!-- Ícones de manuseio e código de barras -->
          <rect x="140" y="152" width="70" height="14" fill="#ffffff" rx="1"/>
          <text x="175" y="162" font-family="monospace" font-size="6" fill="#0f172a" text-anchor="middle">GTIN-14 MASTER</text>
        </g>
        <!-- Respiro / alça da caixa na frente -->
        <ellipse cx="98" cy="135" rx="14" ry="6" fill="#6b4c23"/>
      </g>
      <rect x="60" y="18" width="180" height="20" rx="10" fill="#b45309"/>
      <text x="150" y="32" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">3. EMBALAGEM SECUNDÁRIA</text>
    </svg>
  `)}`,

  // 4. Palletizado (Pallet padrão PBR com lastro 8 x 5 camadas e filme stretch)
  palletizado: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
      <defs>
        <linearGradient id="palletWood" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#92400e"/>
        </linearGradient>
        <filter id="palletShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <g filter="url(#palletShadow)">
        <!-- Base de Madeira do Pallet PBR -->
        <!-- Tábuas e pés do pallet -->
        <polygon points="50,240 150,265 250,230 150,210" fill="url(#palletWood)"/>
        <polygon points="50,240 150,265 150,278 50,252" fill="#78350f"/>
        <polygon points="150,265 250,230 250,242 150,278" fill="#592509"/>
        
        <!-- Entradas da empilhadeira -->
        <rect x="75" y="250" width="22" height="12" fill="#1e293b" opacity="0.7"/>
        <rect x="115" y="259" width="22" height="12" fill="#1e293b" opacity="0.7"/>
        <rect x="175" y="256" width="22" height="12" fill="#1e293b" opacity="0.7"/>
        <rect x="215" y="244" width="22" height="12" fill="#1e293b" opacity="0.7"/>

        <!-- Bloco de Caixas Empilhadas (8 x 5 camadas) -->
        <!-- Camada 1 a 5 (gradiente kraft) -->
        <path d="M60 215 L150 240 L240 210 L240 85 L150 60 L60 85 Z" fill="#c99f6b" stroke="#a16207" stroke-width="1"/>
        <polygon points="60,85 150,60 240,85 150,110" fill="#e4c59e"/>
        <polygon points="60,85 150,110 150,240 60,215" fill="#b68852"/>
        <polygon points="150,110 240,85 240,210 150,240" fill="#9d743f"/>

        <!-- Divisórias das caixas na frente (5 camadas) -->
        <line x1="60" y1="111" x2="150" y2="136" stroke="#854d0e" stroke-width="1.5"/>
        <line x1="60" y1="137" x2="150" y2="162" stroke="#854d0e" stroke-width="1.5"/>
        <line x1="60" y1="163" x2="150" y2="188" stroke="#854d0e" stroke-width="1.5"/>
        <line x1="60" y1="189" x2="150" y2="214" stroke="#854d0e" stroke-width="1.5"/>
        <!-- Colunas verticais -->
        <line x1="105" y1="98" x2="105" y2="228" stroke="#854d0e" stroke-width="1.5"/>

        <!-- Divisórias no lado direito -->
        <line x1="150" y1="136" x2="240" y2="110" stroke="#78350f" stroke-width="1.5"/>
        <line x1="150" y1="162" x2="240" y2="136" stroke="#78350f" stroke-width="1.5"/>
        <line x1="150" y1="188" x2="240" y2="162" stroke="#78350f" stroke-width="1.5"/>
        <line x1="150" y1="214" x2="240" y2="188" stroke="#78350f" stroke-width="1.5"/>
        <line x1="195" y1="98" x2="195" y2="225" stroke="#78350f" stroke-width="1.5"/>

        <!-- Filme Stretch Transparente envolvendo a carga -->
        <path d="M57 220 L150 245 L243 214 L243 80 L150 55 L57 80 Z" fill="#e0f2fe" opacity="0.32" stroke="#38bdf8" stroke-width="1" stroke-dasharray="6 3"/>
        <line x1="57" y1="140" x2="243" y2="140" stroke="#ffffff" stroke-width="3" opacity="0.5"/>
        <line x1="57" y1="170" x2="243" y2="170" stroke="#ffffff" stroke-width="3" opacity="0.5"/>

        <!-- Rótulo de Identificação do Pallet -->
        <rect x="95" y="130" width="35" height="24" fill="#ffffff" stroke="#047857" stroke-width="1"/>
        <rect x="97" y="132" width="31" height="4" fill="#047857"/>
        <text x="112" y="142" font-family="system-ui, sans-serif" font-size="3.5" font-weight="700" fill="#0f172a" text-anchor="middle">LOTE: 2026-B</text>
        <text x="112" y="148" font-family="system-ui, sans-serif" font-size="3.5" font-weight="600" fill="#047857" text-anchor="middle">40 CXS (8x5)</text>
      </g>
      <rect x="65" y="18" width="170" height="20" rx="10" fill="#047857"/>
      <text x="150" y="32" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">4. PALLETIZADO (8 x 5)</text>
    </svg>
  `)}`,
};
