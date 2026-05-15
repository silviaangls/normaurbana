export const theme = {
  colores: {
    // Fondos
    fondoPrincipal: '#0a0a0a',
    fondoCard: '#111111',
    fondoCardSecundario: '#1a1a1a',
    fondoBorde: '#2a2a2a',
    fondoInput: '#111111',

    // Texto
    textoPrincipal: '#f5f5f5',
    textoSecundario: '#888888',
    textoTerciario: '#666666',

    // Acento
    acentoPrincipal: '#ffffff',
    acentoSecundario: '#e0e0e0',

    // Categorías de normas
    obligatoria: '#d4a017',
    obligatoriaFondo: 'rgba(212, 160, 23, 0.1)',
    nacional: '#4a9eff',
    nacionalFondo: 'rgba(74, 158, 255, 0.1)',
    internacional: '#2ecc71',
    internacionalFondo: 'rgba(46, 204, 113, 0.1)',

    // Estados
    advertencia: '#f59e0b',
    advertenciaFondo: 'rgba(245, 158, 11, 0.1)',
    error: '#ef4444',
    exito: '#10b981',

    // Botón principal
    botonFondo: '#ffffff',
    botonTexto: '#000000',
    botonHover: 'rgba(255,255,255,0.9)',
  },

  tipografia: {
    fuentes: {
      titulos: 'Space Grotesk, sans-serif',
      cuerpo: 'Inter, sans-serif',
    },
    tamanios: {
      xs: '11px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      xxl: '22px',
      xxxl: '28px',
    },
    pesos: {
      normal: 400,
      medio: 500,
      semibold: 600,
      bold: 700,
    },
  },

  espaciado: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  bordes: {
    radio: {
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    },
  },

  sombras: {
    card: '0 4px 20px rgba(0,0,0,0.3)',
    cardHover: '0 8px 30px rgba(0,0,0,0.4)',
  },
}

// Colores de impresión (PDF)
export const themePrint = {
  fondo: '#ffffff',
  texto: '#111111',
  textoSecundario: '#444444',
  borde: '#cccccc',
  obligatoria: '#92650a',
  nacional: '#1a56a0',
  internacional: '#166534',
}

export default theme
