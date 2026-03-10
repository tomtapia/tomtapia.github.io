(() => {
  'use strict';

  const themeConfig = {
    dark: {
      'editorial-copper': {
        '--bg-primary': '#11110f',
        '--bg-secondary': '#191816',
        '--bg-tertiary': '#22211d',
        '--bg-dark': '#0c0c0b',
        '--bg-darker': '#080807',
        '--text-primary': '#f2ede3',
        '--text-secondary': '#c4bbac',
        '--text-muted': '#8d8579',
        '--accent': '#b06c3e',
        '--accent-hover': '#cb8451',
        '--accent-soft': 'rgba(176, 108, 62, 0.14)',
        '--accent-strong': 'rgba(176, 108, 62, 0.28)',
        '--border-color': '#34312c',
        '--border-strong': '#4a453d',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(12, 12, 11, 0.92)',
        '--nav-bg-scrolled': 'rgba(8, 8, 7, 0.96)',
        '--hero-tint': 'rgba(176, 108, 62, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.025)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.015)',
        '--panel-bg': 'rgba(17, 17, 15, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.2)'
      },
      'graphite-olive': {
        '--bg-primary': '#141512',
        '--bg-secondary': '#1b1d18',
        '--bg-tertiary': '#232720',
        '--bg-dark': '#0f100d',
        '--bg-darker': '#090a08',
        '--text-primary': '#f1efe7',
        '--text-secondary': '#c9c4b5',
        '--text-muted': '#8f8b7b',
        '--accent': '#7b8b53',
        '--accent-hover': '#93a56b',
        '--accent-soft': 'rgba(123, 139, 83, 0.15)',
        '--accent-strong': 'rgba(123, 139, 83, 0.28)',
        '--border-color': '#34392f',
        '--border-strong': '#4a5241',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(15, 16, 13, 0.92)',
        '--nav-bg-scrolled': 'rgba(9, 10, 8, 0.96)',
        '--hero-tint': 'rgba(123, 139, 83, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.025)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.015)',
        '--panel-bg': 'rgba(20, 21, 18, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.2)'
      },
      'stone-terracotta': {
        '--bg-primary': '#171311',
        '--bg-secondary': '#211a17',
        '--bg-tertiary': '#2a211d',
        '--bg-dark': '#100c0a',
        '--bg-darker': '#0a0706',
        '--text-primary': '#f3ece5',
        '--text-secondary': '#d0c0b3',
        '--text-muted': '#9a8578',
        '--accent': '#b86f56',
        '--accent-hover': '#cf8469',
        '--accent-soft': 'rgba(184, 111, 86, 0.16)',
        '--accent-strong': 'rgba(184, 111, 86, 0.28)',
        '--border-color': '#3c2f29',
        '--border-strong': '#554139',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(16, 12, 10, 0.92)',
        '--nav-bg-scrolled': 'rgba(10, 7, 6, 0.96)',
        '--hero-tint': 'rgba(184, 111, 86, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(23, 19, 17, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'slate-ink': {
        '--bg-primary': '#101416',
        '--bg-secondary': '#171d20',
        '--bg-tertiary': '#20292d',
        '--bg-dark': '#0a0d0f',
        '--bg-darker': '#06080a',
        '--text-primary': '#eef1ef',
        '--text-secondary': '#c0c9c8',
        '--text-muted': '#849091',
        '--accent': '#6b8f8f',
        '--accent-hover': '#82a6a6',
        '--accent-soft': 'rgba(107, 143, 143, 0.15)',
        '--accent-strong': 'rgba(107, 143, 143, 0.28)',
        '--border-color': '#2f393d',
        '--border-strong': '#435156',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(10, 13, 15, 0.92)',
        '--nav-bg-scrolled': 'rgba(6, 8, 10, 0.96)',
        '--hero-tint': 'rgba(107, 143, 143, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(16, 20, 22, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'charcoal-brass': {
        '--bg-primary': '#151411',
        '--bg-secondary': '#1d1b16',
        '--bg-tertiary': '#27231d',
        '--bg-dark': '#0d0c09',
        '--bg-darker': '#080705',
        '--text-primary': '#f2eee5',
        '--text-secondary': '#cfc6b8',
        '--text-muted': '#958b7d',
        '--accent': '#a98a4a',
        '--accent-hover': '#c09f5c',
        '--accent-soft': 'rgba(169, 138, 74, 0.15)',
        '--accent-strong': 'rgba(169, 138, 74, 0.28)',
        '--border-color': '#39352d',
        '--border-strong': '#51493d',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(13, 12, 9, 0.92)',
        '--nav-bg-scrolled': 'rgba(8, 7, 5, 0.96)',
        '--hero-tint': 'rgba(169, 138, 74, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(21, 20, 17, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'moss-ember': {
        '--bg-primary': '#121411',
        '--bg-secondary': '#1a1e19',
        '--bg-tertiary': '#242922',
        '--bg-dark': '#0c0e0b',
        '--bg-darker': '#070806',
        '--text-primary': '#f0efe8',
        '--text-secondary': '#c6c7bd',
        '--text-muted': '#8b8f80',
        '--accent': '#8d6a43',
        '--accent-hover': '#a67d51',
        '--accent-soft': 'rgba(141, 106, 67, 0.15)',
        '--accent-strong': 'rgba(141, 106, 67, 0.28)',
        '--border-color': '#343a31',
        '--border-strong': '#4a5145',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(12, 14, 11, 0.92)',
        '--nav-bg-scrolled': 'rgba(7, 8, 6, 0.96)',
        '--hero-tint': 'rgba(141, 106, 67, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(18, 20, 17, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'plum-smoke': {
        '--bg-primary': '#161316',
        '--bg-secondary': '#1e1a1f',
        '--bg-tertiary': '#282228',
        '--bg-dark': '#0f0c10',
        '--bg-darker': '#090709',
        '--text-primary': '#f2ecf0',
        '--text-secondary': '#cbc0c9',
        '--text-muted': '#948893',
        '--accent': '#8f6f7d',
        '--accent-hover': '#a78493',
        '--accent-soft': 'rgba(143, 111, 125, 0.15)',
        '--accent-strong': 'rgba(143, 111, 125, 0.28)',
        '--border-color': '#39313a',
        '--border-strong': '#504551',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(15, 12, 16, 0.92)',
        '--nav-bg-scrolled': 'rgba(9, 7, 9, 0.96)',
        '--hero-tint': 'rgba(143, 111, 125, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(22, 19, 22, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'forest-stone': {
        '--bg-primary': '#101311',
        '--bg-secondary': '#181d1a',
        '--bg-tertiary': '#212824',
        '--bg-dark': '#0a0d0b',
        '--bg-darker': '#060806',
        '--text-primary': '#eef0eb',
        '--text-secondary': '#c3c8c0',
        '--text-muted': '#899186',
        '--accent': '#6f8a72',
        '--accent-hover': '#86a189',
        '--accent-soft': 'rgba(111, 138, 114, 0.15)',
        '--accent-strong': 'rgba(111, 138, 114, 0.28)',
        '--border-color': '#313933',
        '--border-strong': '#465046',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(10, 13, 11, 0.92)',
        '--nav-bg-scrolled': 'rgba(6, 8, 6, 0.96)',
        '--hero-tint': 'rgba(111, 138, 114, 0.12)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(16, 19, 17, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      },
      'minimal-effort': {
        '--bg-primary': '#121417',
        '--bg-secondary': '#1a1d22',
        '--bg-tertiary': '#232831',
        '--bg-dark': '#0d0f12',
        '--bg-darker': '#08090b',
        '--text-primary': '#eef2f7',
        '--text-secondary': '#c3ccd7',
        '--text-muted': '#8893a1',
        '--accent': '#4285f4',
        '--accent-hover': '#34a853',
        '--accent-soft': 'rgba(66, 133, 244, 0.16)',
        '--accent-strong': 'rgba(66, 133, 244, 0.28)',
        '--border-color': '#313845',
        '--border-strong': '#465063',
        '--surface-highlight': 'rgba(255, 255, 255, 0.03)',
        '--shadow-soft': '0 18px 40px rgba(0, 0, 0, 0.22)',
        '--nav-bg': 'rgba(13, 15, 18, 0.92)',
        '--nav-bg-scrolled': 'rgba(8, 9, 11, 0.96)',
        '--hero-tint': 'rgba(66, 133, 244, 0.14)',
        '--hero-grid-strong': 'rgba(255, 255, 255, 0.024)',
        '--hero-grid-soft': 'rgba(255, 255, 255, 0.014)',
        '--panel-bg': 'rgba(18, 20, 23, 0.94)',
        '--panel-shadow': '0 16px 30px rgba(0, 0, 0, 0.22)'
      }
    },
    light: {
      'editorial-copper': {
        '--bg-primary': '#f4ede4',
        '--bg-secondary': '#ecdfd2',
        '--bg-tertiary': '#e3d1c0',
        '--bg-dark': '#e8d9ca',
        '--bg-darker': '#dcc8b5',
        '--text-primary': '#2e2219',
        '--text-secondary': '#5b483b',
        '--text-muted': '#836c5d',
        '--accent': '#b06c3e',
        '--accent-hover': '#955834',
        '--accent-soft': 'rgba(176, 108, 62, 0.12)',
        '--accent-strong': 'rgba(176, 108, 62, 0.24)',
        '--border-color': '#d5c1b0',
        '--border-strong': '#bea692',
        '--surface-highlight': 'rgba(255, 255, 255, 0.36)',
        '--shadow-soft': '0 12px 24px rgba(92, 65, 43, 0.12)',
        '--nav-bg': 'rgba(244, 237, 228, 0.94)',
        '--nav-bg-scrolled': 'rgba(236, 223, 210, 0.98)',
        '--hero-tint': 'rgba(176, 108, 62, 0.1)',
        '--hero-grid-strong': 'rgba(46, 34, 25, 0.08)',
        '--hero-grid-soft': 'rgba(46, 34, 25, 0.04)',
        '--panel-bg': 'rgba(244, 237, 228, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(92, 65, 43, 0.14)'
      },
      'ivory-editorial': {
        '--bg-primary': '#f1ede3',
        '--bg-secondary': '#ece6d9',
        '--bg-tertiary': '#e2dccf',
        '--bg-dark': '#e6dfd0',
        '--bg-darker': '#ddd5c6',
        '--text-primary': '#241f18',
        '--text-secondary': '#4d4438',
        '--text-muted': '#746959',
        '--accent': '#7a8b52',
        '--accent-hover': '#677747',
        '--accent-soft': 'rgba(122, 139, 82, 0.12)',
        '--accent-strong': 'rgba(122, 139, 82, 0.24)',
        '--border-color': '#c9c0b0',
        '--border-strong': '#b5aa97',
        '--surface-highlight': 'rgba(255, 255, 255, 0.35)',
        '--shadow-soft': '0 12px 24px rgba(70, 58, 44, 0.1)',
        '--nav-bg': 'rgba(241, 237, 227, 0.94)',
        '--nav-bg-scrolled': 'rgba(236, 230, 217, 0.98)',
        '--hero-tint': 'rgba(122, 139, 82, 0.1)',
        '--hero-grid-strong': 'rgba(36, 31, 24, 0.08)',
        '--hero-grid-soft': 'rgba(36, 31, 24, 0.04)',
        '--panel-bg': 'rgba(241, 237, 227, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(70, 58, 44, 0.12)'
      },
      'sand-studio': {
        '--bg-primary': '#f7f1e8',
        '--bg-secondary': '#efe6db',
        '--bg-tertiary': '#e7ddcf',
        '--bg-dark': '#ece1d3',
        '--bg-darker': '#e1d5c6',
        '--text-primary': '#2b241c',
        '--text-secondary': '#56493f',
        '--text-muted': '#7d6c5f',
        '--accent': '#b26f4f',
        '--accent-hover': '#985d41',
        '--accent-soft': 'rgba(178, 111, 79, 0.12)',
        '--accent-strong': 'rgba(178, 111, 79, 0.24)',
        '--border-color': '#d2c4b5',
        '--border-strong': '#bfae9c',
        '--surface-highlight': 'rgba(255, 255, 255, 0.38)',
        '--shadow-soft': '0 12px 24px rgba(75, 58, 44, 0.11)',
        '--nav-bg': 'rgba(247, 241, 232, 0.94)',
        '--nav-bg-scrolled': 'rgba(239, 230, 219, 0.98)',
        '--hero-tint': 'rgba(178, 111, 79, 0.1)',
        '--hero-grid-strong': 'rgba(43, 36, 28, 0.08)',
        '--hero-grid-soft': 'rgba(43, 36, 28, 0.04)',
        '--panel-bg': 'rgba(247, 241, 232, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(75, 58, 44, 0.12)'
      },
      'linen-olive': {
        '--bg-primary': '#f4f0e7',
        '--bg-secondary': '#ebe5d8',
        '--bg-tertiary': '#e1dbc9',
        '--bg-dark': '#e7dfcf',
        '--bg-darker': '#ddd3c1',
        '--text-primary': '#262117',
        '--text-secondary': '#51493b',
        '--text-muted': '#776d5c',
        '--accent': '#78855a',
        '--accent-hover': '#647149',
        '--accent-soft': 'rgba(120, 133, 90, 0.12)',
        '--accent-strong': 'rgba(120, 133, 90, 0.24)',
        '--border-color': '#cbc2b0',
        '--border-strong': '#b7ac97',
        '--surface-highlight': 'rgba(255, 255, 255, 0.35)',
        '--shadow-soft': '0 12px 24px rgba(70, 58, 44, 0.1)',
        '--nav-bg': 'rgba(244, 240, 231, 0.94)',
        '--nav-bg-scrolled': 'rgba(235, 229, 216, 0.98)',
        '--hero-tint': 'rgba(120, 133, 90, 0.1)',
        '--hero-grid-strong': 'rgba(38, 33, 23, 0.08)',
        '--hero-grid-soft': 'rgba(38, 33, 23, 0.04)',
        '--panel-bg': 'rgba(244, 240, 231, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(70, 58, 44, 0.12)'
      },
      'paper-plum': {
        '--bg-primary': '#f5eff1',
        '--bg-secondary': '#ede4e8',
        '--bg-tertiary': '#e3d9de',
        '--bg-dark': '#e8dde2',
        '--bg-darker': '#ddd1d7',
        '--text-primary': '#2a1f26',
        '--text-secondary': '#554652',
        '--text-muted': '#7b6976',
        '--accent': '#8d6d7f',
        '--accent-hover': '#75596a',
        '--accent-soft': 'rgba(141, 109, 127, 0.12)',
        '--accent-strong': 'rgba(141, 109, 127, 0.24)',
        '--border-color': '#d1c1c9',
        '--border-strong': '#bcaab3',
        '--surface-highlight': 'rgba(255, 255, 255, 0.35)',
        '--shadow-soft': '0 12px 24px rgba(78, 58, 69, 0.1)',
        '--nav-bg': 'rgba(245, 239, 241, 0.94)',
        '--nav-bg-scrolled': 'rgba(237, 228, 232, 0.98)',
        '--hero-tint': 'rgba(141, 109, 127, 0.1)',
        '--hero-grid-strong': 'rgba(42, 31, 38, 0.08)',
        '--hero-grid-soft': 'rgba(42, 31, 38, 0.04)',
        '--panel-bg': 'rgba(245, 239, 241, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(78, 58, 69, 0.12)'
      },
      'chalk-forest': {
        '--bg-primary': '#f2f4ef',
        '--bg-secondary': '#e8ece4',
        '--bg-tertiary': '#dde2d8',
        '--bg-dark': '#e2e7dc',
        '--bg-darker': '#d5ddcd',
        '--text-primary': '#1f261f',
        '--text-secondary': '#465044',
        '--text-muted': '#697464',
        '--accent': '#5f7d66',
        '--accent-hover': '#4e6854',
        '--accent-soft': 'rgba(95, 125, 102, 0.12)',
        '--accent-strong': 'rgba(95, 125, 102, 0.24)',
        '--border-color': '#c4ccbf',
        '--border-strong': '#aeb8a8',
        '--surface-highlight': 'rgba(255, 255, 255, 0.35)',
        '--shadow-soft': '0 12px 24px rgba(60, 71, 58, 0.1)',
        '--nav-bg': 'rgba(242, 244, 239, 0.94)',
        '--nav-bg-scrolled': 'rgba(232, 236, 228, 0.98)',
        '--hero-tint': 'rgba(95, 125, 102, 0.1)',
        '--hero-grid-strong': 'rgba(31, 38, 31, 0.08)',
        '--hero-grid-soft': 'rgba(31, 38, 31, 0.04)',
        '--panel-bg': 'rgba(242, 244, 239, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(60, 71, 58, 0.12)'
      },
      'minimal-effort': {
        '--bg-primary': '#f8f9fb',
        '--bg-secondary': '#eef2f7',
        '--bg-tertiary': '#e3e9f1',
        '--bg-dark': '#e8edf5',
        '--bg-darker': '#d9e0ea',
        '--text-primary': '#1f2937',
        '--text-secondary': '#475569',
        '--text-muted': '#6b7280',
        '--accent': '#4285f4',
        '--accent-hover': '#ea4335',
        '--accent-soft': 'rgba(66, 133, 244, 0.12)',
        '--accent-strong': 'rgba(66, 133, 244, 0.24)',
        '--border-color': '#cfd8e3',
        '--border-strong': '#b8c5d4',
        '--surface-highlight': 'rgba(255, 255, 255, 0.38)',
        '--shadow-soft': '0 12px 24px rgba(63, 81, 108, 0.1)',
        '--nav-bg': 'rgba(248, 249, 251, 0.94)',
        '--nav-bg-scrolled': 'rgba(238, 242, 247, 0.98)',
        '--hero-tint': 'rgba(66, 133, 244, 0.1)',
        '--hero-grid-strong': 'rgba(31, 41, 55, 0.08)',
        '--hero-grid-soft': 'rgba(31, 41, 55, 0.04)',
        '--panel-bg': 'rgba(248, 249, 251, 0.96)',
        '--panel-shadow': '0 16px 30px rgba(63, 81, 108, 0.12)'
      }
    }
  };

  const themeSwitcher = document.getElementById('themeSwitcher');
  const themeSwitcherToggle = document.getElementById('themeSwitcherToggle');
  const themeSwitcherPanel = document.getElementById('themeSwitcherPanel');
  const themeModeSelect = document.getElementById('themeModeSelect');
  const themePaletteSelect = document.getElementById('themePaletteSelect');
  const root = document.documentElement;
  const themeStorageKey = 'site-theme-preference';
  const defaultPaletteByMode = {
    dark: 'minimal-effort',
    light: 'minimal-effort'
  };

  const paletteOptionsByMode = {
    dark: [
      { value: 'editorial-copper', label: 'Editorial Copper' },
      { value: 'graphite-olive', label: 'Graphite Olive' },
      { value: 'stone-terracotta', label: 'Stone Terracotta' },
      { value: 'slate-ink', label: 'Slate Ink' },
      { value: 'charcoal-brass', label: 'Charcoal Brass' },
      { value: 'moss-ember', label: 'Moss Ember' },
      { value: 'plum-smoke', label: 'Plum Smoke' },
      { value: 'forest-stone', label: 'Forest Stone' },
      { value: 'minimal-effort', label: 'Minimal Effort' }
    ],
    light: [
      { value: 'editorial-copper', label: 'Editorial Copper' },
      { value: 'ivory-editorial', label: 'Ivory Editorial' },
      { value: 'sand-studio', label: 'Sand Studio' },
      { value: 'linen-olive', label: 'Linen Olive' },
      { value: 'paper-plum', label: 'Paper Plum' },
      { value: 'chalk-forest', label: 'Chalk Forest' },
      { value: 'minimal-effort', label: 'Minimal Effort' }
    ]
  };

  const updatePaletteOptions = (mode, selectedPalette) => {
    if (!themePaletteSelect) return;

    themePaletteSelect.innerHTML = '';
    paletteOptionsByMode[mode].forEach((palette) => {
      const option = document.createElement('option');
      option.value = palette.value;
      option.textContent = palette.label;
      option.selected = palette.value === selectedPalette;
      themePaletteSelect.appendChild(option);
    });
  };

  const applyTheme = (mode, palette, options = {}) => {
    const { persist = true } = options;
    const fallbackPalette = defaultPaletteByMode[mode] ?? paletteOptionsByMode[mode]?.[0]?.value;
    const nextPalette = themeConfig[mode]?.[palette] ? palette : fallbackPalette;
    const variables = themeConfig[mode]?.[nextPalette];

    if (!variables) return;

    Object.entries(variables).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });

    document.body.dataset.themeMode = mode;
    document.body.dataset.themePalette = nextPalette;

    if (themeModeSelect) themeModeSelect.value = mode;
    updatePaletteOptions(mode, nextPalette);

    if (!persist) {
      return;
    }

    try {
      window.localStorage.setItem(themeStorageKey, JSON.stringify({ mode, palette: nextPalette }));
    } catch (error) {
      console.warn('Unable to persist theme preference', error);
    }
  };

  const getPreferredMode = () => (
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const restoreThemePreference = () => {
    const fallbackMode = getPreferredMode();
    const fallbackPalette = defaultPaletteByMode[fallbackMode];

    try {
      const storedValue = window.localStorage.getItem(themeStorageKey);
      if (!storedValue) {
        applyTheme(fallbackMode, fallbackPalette, { persist: false });
        return;
      }

      const parsed = JSON.parse(storedValue);
      applyTheme(parsed.mode || fallbackMode, parsed.palette || fallbackPalette);
    } catch (error) {
      applyTheme(fallbackMode, fallbackPalette, { persist: false });
    }
  };

  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-J6YT5K3JHY');

  // Certification Pagination Handling
  const certificationGrid = document.getElementById('certificationGrid');
  const certificationPagination = document.getElementById('certificationPagination');
  const certificationPageItems = Array.from(document.querySelectorAll('.certification-page-item'));
  const CERTIFICATIONS_PER_PAGE = 6;

  const renderCertificationPage = (pageIndex) => {
    certificationPageItems.forEach((item, index) => {
      const startIndex = pageIndex * CERTIFICATIONS_PER_PAGE;
      const endIndex = startIndex + CERTIFICATIONS_PER_PAGE;
      item.classList.toggle('is-hidden', index < startIndex || index >= endIndex);
    });

    const pills = certificationPagination?.querySelectorAll('.certification-page-pill') || [];
    pills.forEach((pill, index) => {
      const isActive = index === pageIndex;
      pill.classList.toggle('is-active', isActive);
      pill.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  };

  if (certificationGrid && certificationPagination && certificationPageItems.length > 0) {
    const totalPages = Math.ceil(certificationPageItems.length / CERTIFICATIONS_PER_PAGE);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 1) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'certification-page-pill';
      pill.setAttribute('aria-label', `Go to certification page ${pageIndex + 1}`);
      pill.addEventListener('click', () => renderCertificationPage(pageIndex));
      certificationPagination.appendChild(pill);
    }

    renderCertificationPage(0);
  }

  // Certification Modal Handling
  const certificationModal = document.getElementById('certificationModal');
  const certificationItems = document.querySelectorAll('.certification-item');

  if (certificationItems.length > 0 && certificationModal) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');
    const modalLink = document.getElementById('modalLink');
    let certificationModalInstance = null;

    const getCertificationModalInstance = () => {
      if (certificationModalInstance) {
        return certificationModalInstance;
      }

      if (!window.bootstrap?.Modal) {
        return null;
      }

      certificationModalInstance = window.bootstrap.Modal.getOrCreateInstance(certificationModal);
      return certificationModalInstance;
    };

    certificationItems.forEach((item) => {
      item.addEventListener('click', () => {
        const modalInstance = getCertificationModalInstance();

        if (!modalInstance) {
          console.error('Bootstrap Modal is not available for certification details.');
          return;
        }

        const title = item.dataset.title;
        const description = item.dataset.description;
        const validationUrl = item.dataset.validationUrl;
        const imgSrc = item.querySelector('img').src;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imgSrc;
        modalImage.alt = title;
        modalLink.href = validationUrl;

        modalInstance.show();
      });
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const showFeedback = (message, isError = false) => {
      const feedbackElement = document.createElement('div');
      feedbackElement.className = `alert alert-${isError ? 'danger' : 'success'} mt-3`;
      feedbackElement.textContent = message;
      contactForm.insertAdjacentElement('afterend', feedbackElement);
      setTimeout(() => feedbackElement.remove(), 5000);
    };

    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input.trim().replace(/[<>]/g, '');
    };

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      const cleanPhone = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
      return /^[+]?[0-9]{10,14}$/.test(cleanPhone);
    };

    const validateForm = () => {
      const name = sanitizeInput(document.getElementById('name').value);
      const email = sanitizeInput(document.getElementById('email').value);
      const phone = sanitizeInput(document.getElementById('phone').value);
      const message = sanitizeInput(document.getElementById('message').value);

      if (!name) {
        showFeedback('Please enter your name', true);
        return null;
      }

      if (!validateEmail(email)) {
        showFeedback('Please enter a valid email address', true);
        return null;
      }

      if (!validatePhone(phone)) {
        showFeedback('Please enter a valid phone number (10-14 digits)', true);
        return null;
      }

      if (!message) {
        showFeedback('Please enter your message', true);
        return null;
      }

      return { name, email, phone, message };
    };

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const formData = validateForm();
      if (!formData) {
        contactForm.classList.add('was-validated');
        return;
      }

      try {
        // Here you would typically send the data to a server
        console.log('Form data:', formData);

        // Clear form and show success message
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        showFeedback('Thank you for your message! I will get back to you soon.');
      } catch (error) {
        console.error('Error submitting form:', error);
        showFeedback('Sorry, there was an error sending your message. Please try again later.', true);
      }
    });
  }

  if (themeSwitcher && themeSwitcherToggle && themeSwitcherPanel && themeModeSelect && themePaletteSelect) {
    const toggleThemeSwitcher = () => {
      const isOpen = !themeSwitcherPanel.hasAttribute('hidden');
      if (isOpen) {
        themeSwitcherPanel.setAttribute('hidden', '');
        themeSwitcherToggle.setAttribute('aria-expanded', 'false');
      } else {
        themeSwitcherPanel.removeAttribute('hidden');
        themeSwitcherToggle.setAttribute('aria-expanded', 'true');
      }
    };

    restoreThemePreference();

    themeSwitcherToggle.addEventListener('click', toggleThemeSwitcher);

    themeModeSelect.addEventListener('change', () => {
      const nextMode = themeModeSelect.value;
      const nextPalette = defaultPaletteByMode[nextMode] ?? paletteOptionsByMode[nextMode][0].value;
      applyTheme(nextMode, nextPalette);
    });

    themePaletteSelect.addEventListener('change', () => {
      applyTheme(themeModeSelect.value, themePaletteSelect.value);
    });

    document.addEventListener('click', (event) => {
      if (!themeSwitcher.contains(event.target)) {
        themeSwitcherPanel.setAttribute('hidden', '');
        themeSwitcherToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        themeSwitcherPanel.setAttribute('hidden', '');
        themeSwitcherToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
