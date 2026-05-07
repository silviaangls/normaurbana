export const TIPOS_VIA = [
  {
    value: 'via-primaria',
    label: 'Vía primaria',
    sublabel: 'Avenidas principales, ejes viales',
  },
  {
    value: 'via-secundaria',
    label: 'Vía secundaria',
    sublabel: 'Calles colectoras',
  },
  {
    value: 'calle-local',
    label: 'Calle local',
    sublabel: 'Acceso vecinal, tráfico bajo',
  },
  {
    value: 'corredor-transporte',
    label: 'Corredor de transporte masivo',
    sublabel: 'BRT, Metrobús',
  },
  {
    value: 'zona-patrimonial',
    label: 'Zona patrimonial o histórica',
    sublabel: 'Polígonos de valor histórico, INAH',
  },
]

// ──────────────────────────────────────────────────────────────────────────────
// MODIFICACIONES POR TIPO DE VÍA
// Estructura por intervención → tipoVia → { nota, modificados, adicionales }
//
// "modificados" reemplaza un parámetro base por nombre exacto (campo parametro).
// "adicionales" agrega parámetros nuevos solo aplicables a ese tipo de vía.
// Ambos pueden tener llaves: obligatorias, manualesNacionales, internacionales.
// ──────────────────────────────────────────────────────────────────────────────
export const MODIFICACIONES = {

  /* ══════════════════════════════════════════════════════════
     CRUCE PEATONAL
  ══════════════════════════════════════════════════════════ */
  'cruce-peatonal': {
    'via-primaria': {
      nota: 'En vía primaria el alto volumen peatonal y vehicular eleva el ancho mínimo requerido y hace obligatorio el semáforo peatonal.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo de cruce',
            valor: '4.5',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias de 4 o más carriles se requiere ancho mínimo de 4.5 m para permitir flujos peatonales bidireccionales simultáneos.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Semáforo peatonal con fase exclusiva',
            valor: 'Obligatorio',
            unidad: '—',
            fuente: 'RCDF / Manual de Calles CDMX 2019',
            detalle: 'Vías primarias con más de 4 carriles o velocidad de diseño > 50 km/h requieren semáforo peatonal con fase exclusiva.',
          },
          {
            parametro: 'Isla de refugio peatonal',
            valor: 'Obligatoria si > 4 carriles',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'Si la calzada tiene más de 4 carriles se requiere isla de refugio peatonal de mínimo 1.8 m de ancho a la mitad del cruce.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria se recomienda semáforo peatonal y se eleva ligeramente el ancho de cruce.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo de cruce',
            valor: '3.5',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En calles colectoras se recomienda un ancho de 3.5 m para absorber flujos moderados.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Semáforo peatonal',
            valor: 'Recomendado si > 2 carriles',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías secundarias con más de 2 carriles el semáforo peatonal es recomendado aunque no obligatorio.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local la baja velocidad y el bajo volumen vehicular permiten parámetros simplificados; la señalización horizontal es suficiente.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo de cruce',
            valor: '2.5',
            unidad: 'm',
            fuente: 'RCDF Art. 77',
            detalle: 'En calles locales de baja demanda peatonal se acepta un ancho mínimo de 2.5 m con señalización horizontal.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Velocidad de diseño del cruce',
            valor: '30',
            unidad: 'km/h máximo',
            fuente: 'Manual de Calles CDMX / Zona 30',
            detalle: 'En calle local el cruce se diseña para velocidad máxima de 30 km/h; la señalización horizontal es suficiente sin semáforo.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredores BRT o Metrobús los cruces peatonales deben manejar volúmenes de intercambio modal muy altos con fase semafórica coordinada.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo de cruce',
            valor: '5.0',
            unidad: 'm',
            fuente: 'NACTO Transit Street Design Guide / Manual CDMX',
            detalle: 'En corredores de transporte masivo el cruce peatonal debe tener mínimo 5.0 m por los altos flujos de intercambio modal.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Semáforo peatonal con cuenta regresiva',
            valor: 'Obligatorio',
            unidad: '—',
            fuente: 'ITDP BRT Standard / Manual CDMX',
            detalle: 'Se requiere semáforo peatonal con cuenta regresiva visible coordinado con la fase del corredor BRT.',
          },
          {
            parametro: 'Isla de refugio en corredor BRT',
            valor: '2.5',
            unidad: 'm ancho mínimo',
            fuente: 'NACTO Transit Street Design Guide',
            detalle: 'La isla de refugio en cruce sobre corredor BRT debe ser mínimo 2.5 m para acomodar usuarios con movilidad reducida y equipaje.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zonas patrimoniales la señalización del cruce debe respetar la imagen urbana histórica; se permite pavimento diferenciado como demarcación.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Franjas de señalización horizontal',
            valor: 'Pavimento diferenciado compatible',
            unidad: '—',
            fuente: 'RCDF / Criterios INAH-SEDUVI',
            detalle: 'En polígonos patrimoniales se permite adoquín, cantera u otro material histórico como demarcación del cruce en lugar de pintura retroreflectante estándar.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Señalización vertical en zona histórica',
            valor: 'No intrusiva, baja altura',
            unidad: '—',
            fuente: 'Criterios INAH / SEDATU',
            detalle: 'La señalización vertical debe integrarse al entorno patrimonial; se prohíben postes de altura estándar que alteren la imagen urbana declarada.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     CICLOVÍA
  ══════════════════════════════════════════════════════════ */
  'ciclovia': {
    'via-primaria': {
      nota: 'En vía primaria la ciclovía debe segregarse físicamente del tráfico vehicular y ampliarse para mayor seguridad.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo carril unidireccional',
            valor: '2.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019 / NOM-034',
            detalle: 'En vías primarias el carril ciclista unidireccional debe medir mínimo 2.0 m por las velocidades vehiculares y la intensidad de tráfico.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Separación de tráfico vehicular',
            valor: '1.0',
            unidad: 'm (separador físico)',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias la separación debe ser un elemento físico (bordillo, bolardos o jardinera) de mínimo 1.0 m de ancho.',
          },
          {
            parametro: 'Señalización en pavimento',
            valor: 'Cada 30',
            unidad: 'm',
            fuente: 'NOM-034-SCT2-2011 / Manual CDMX',
            detalle: 'En vías primarias la marca de ciclopista se repite cada 30 m (mayor frecuencia que en vías secundarias) y debe ser termoplástica.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Separación física del tráfico',
            valor: 'Obligatoria',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias es obligatorio un elemento físico continuo (bordillo elevado, bolardos o jardinera) que separe la ciclovía del carril vehicular.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Iluminación dedicada del carril ciclista',
            valor: 'Requerida',
            unidad: 'mín. 30 lux',
            fuente: 'SEDATU Manual de Infraestructura Ciclista',
            detalle: 'En vías primarias la ciclovía requiere iluminación propia mínima de 30 lux en la superficie del carril durante horas nocturnas.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria se aumenta el ancho del carril y se recomienda separación física mínima.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo carril unidireccional',
            valor: '1.8',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías secundarias el carril ciclista unidireccional mide mínimo 1.8 m; se recomienda bordillo o franja pintada de separación.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Separación recomendada',
            valor: 'Bordillo o franja pintada 0.5 m',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'Se recomienda separación mínima de 0.5 m mediante bordillo o franja pintada en vías colectoras con velocidad diseño ≤ 50 km/h.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local con velocidad ≤ 30 km/h se permite el carril compartido (sharrow) en lugar de ciclovía segregada.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo carril unidireccional',
            valor: '1.5',
            unidad: 'm (o carril compartido)',
            fuente: 'RCDF / Manual de Calles CDMX',
            detalle: 'En calle local con velocidad diseño ≤ 30 km/h se acepta carril compartido con marca "sharrow"; ancho mínimo de carril vehicular 3.0 m.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Carril compartido bici-auto (sharrow)',
            valor: 'Permitido si velocidad ≤ 30 km/h',
            unidad: '—',
            fuente: 'SEDATU Manual de Infraestructura Ciclista / NACTO',
            detalle: 'En zonas de tráfico calmado se permite el carril compartido con pictograma de bicicleta y flecha (sharrow) sin segregación física.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT la ciclovía debe estar completamente separada del carril exclusivo de transporte y tener mayor ancho.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Ancho carril bidireccional',
            valor: '3.0',
            unidad: 'm',
            fuente: 'NACTO Transit Street Design Guide / Manual CDMX',
            detalle: 'En corredores de transporte masivo la ciclovía bidireccional debe medir mínimo 3.0 m por los volúmenes ciclistas asociados al intercambio modal.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Separación física del carril BRT',
            valor: 'Obligatoria (separador continuo)',
            unidad: '—',
            fuente: 'ITDP BRT Standard / Manual CDMX',
            detalle: 'La ciclovía debe estar completamente separada del carril exclusivo BRT por un elemento físico continuo; se prohíbe el contacto entre el flujo ciclista y las unidades BRT.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la señalización ciclista no debe alterar la imagen urbana declarada; se restringen elementos metálicos expuestos.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Señalización en pavimento',
            valor: 'Compatible con pavimento histórico',
            unidad: '—',
            fuente: 'Criterios INAH / NOM-034-SCT2',
            detalle: 'En polígonos patrimoniales se prohíbe pintura estándar sobre adoquín o cantera original; usar señalización integrada no permanente o marcas de bajo impacto.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Separadores en zona histórica',
            valor: 'Sin elementos metálicos expuestos',
            unidad: '—',
            fuente: 'Criterios INAH / SEDATU',
            detalle: 'En zonas patrimoniales se prohíben bolardos o separadores metálicos estándar; usar bolardos de piedra o materiales compatibles con la declaratoria.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     BANQUETAS
  ══════════════════════════════════════════════════════════ */
  'banquetas': {
    'via-primaria': {
      nota: 'Las vías primarias concentran los flujos peatonales más altos y requieren banquetas más anchas con arbolado obligatorio.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo zona libre peatonal',
            valor: '2.5',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias la zona libre peatonal mínima sube a 2.5 m para absorber flujos peatonales altos sin obstáculos.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Ancho total banqueta (vía primaria)',
            valor: '4.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'Ancho total de banqueta en vías primarias aumenta a 4.0 m (zona libre + equipamiento + franja de activación).',
          },
          {
            parametro: 'Zona de equipamiento urbano',
            valor: '1.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias la zona de equipamiento (postes, señales, mobiliario, arbolado) se amplía a 1.0 m.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Arbolado de sombra',
            valor: 'Requerido cada 6 m',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En vías primarias el arbolado de sombra es requerido (no optativo) a una distancia máxima de 6 m entre árboles.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria el ancho de zona libre peatonal sube a 2.0 m recomendado.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Zona libre peatonal recomendada',
            valor: '2.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías secundarias se recomienda ampliar la zona libre peatonal a 2.0 m aunque el mínimo normativo sea 1.5 m.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local con tráfico muy bajo el ancho total de banqueta puede reducirse a 2.0 m conservando el mínimo libre de 1.5 m.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Ancho total mínimo en calle local',
            valor: '2.0',
            unidad: 'm',
            fuente: 'RCDF / Manual de Calles CDMX',
            detalle: 'En calles locales de muy bajo tráfico peatonal el ancho total de banqueta puede ser de 2.0 m, manteniendo siempre la zona libre de 1.5 m.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredores BRT los flujos de intercambio modal demandan banquetas amplias con zona de preembarque integrada.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Ancho mínimo zona libre peatonal',
            valor: '3.0',
            unidad: 'm',
            fuente: 'NACTO Transit Street Design Guide',
            detalle: 'En corredores de transporte masivo la zona libre peatonal mínima es de 3.0 m por los altos flujos de usuarios en intercambio modal.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Ancho total banqueta (vía primaria)',
            valor: '5.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / ITDP BRT Standard',
            detalle: 'En corredores BRT el ancho total de la banqueta debe ser mínimo 5.0 m incluyendo zona de preembarque.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Zona de preembarque integrada',
            valor: 'Requerida (mín. 2.0 m)',
            unidad: 'm',
            fuente: 'ITDP BRT Standard',
            detalle: 'El diseño de banqueta en corredor BRT debe incluir una zona de preembarque de mínimo 2.0 m de ancho integrada al espacio peatonal.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial los materiales de banqueta deben ser compatibles con la declaratoria histórica y requerir validación de INAH.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Material de superficie',
            valor: 'Compatible con zona histórica (adoquín, cantera, tezontle)',
            unidad: '—',
            fuente: 'Criterios INAH / SEDUVI',
            detalle: 'En polígonos patrimoniales el material de banqueta debe ser compatible con la declaratoria; se prohíbe concreto escobillado estándar si no es el material histórico.',
          },
          {
            parametro: 'Altura de guarnición',
            valor: 'Según perfil histórico existente',
            unidad: 'm',
            fuente: 'Criterios INAH / RCDF',
            detalle: 'En zonas patrimoniales la altura de guarnición debe respetar el perfil histórico documentado; puede diferir del estándar de 0.15 m.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Validación de INAH',
            valor: 'Obligatoria antes de modificar',
            unidad: '—',
            fuente: 'Ley Federal sobre Monumentos y Zonas Arqueológicos',
            detalle: 'Cualquier modificación de banqueta en zona patrimonial requiere dictamen previo del INAH o del organismo de protección patrimonial competente.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     PEATONALIZACIÓN DE CALLES
  ══════════════════════════════════════════════════════════ */
  'peatonalizacion': {
    'via-primaria': {
      nota: 'Peatonalizar una vía primaria requiere Estudio de Impacto Vial y exige pasos de emergencia más amplios por los flujos de evacuación.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Paso libre mínimo continuo',
            valor: '4.5',
            unidad: 'm',
            fuente: 'RCDF / Protección Civil CDMX',
            detalle: 'En vías primarias peatonalizadas el paso libre mínimo continuo sube a 4.5 m para garantizar rutas de evacuación y acceso de vehículos de emergencia.',
          },
          {
            parametro: 'Acceso para vehículos de emergencia',
            valor: '4.5 m garantizados',
            unidad: 'm',
            fuente: 'Ley de Protección Civil CDMX / RCDF',
            detalle: 'En vías primarias el acceso de vehículos de emergencia debe garantizarse con un paso libre de 4.5 m en toda la longitud de la calle peatonalizada.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Superficie peatonal mínima',
            valor: '60',
            unidad: '% de la sección',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias peatonalizadas al menos el 60 % de la sección transversal debe destinarse a circulación peatonal libre.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Estudio de Impacto Vial (EIVT)',
            valor: 'Obligatorio y aprobado',
            unidad: '—',
            fuente: 'Reglamento de Tránsito CDMX / SEMOVI',
            detalle: 'La peatonalización de una vía primaria requiere Estudio de Impacto Vial aprobado por SEMOVI con análisis de rutas alternativas de circulación vehicular.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria el proceso es menos restrictivo pero se requiere análisis básico de circulación.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Paso libre mínimo continuo',
            valor: '3.5',
            unidad: 'm',
            fuente: 'RCDF / Manual de Calles CDMX',
            detalle: 'En vías secundarias peatonalizadas el paso libre mínimo es de 3.5 m para acceso de vehículos de emergencia y carga/descarga.',
          },
        ],
      },
      adicionales: {},
    },

    'calle-local': {
      nota: 'En calle local el proceso de peatonalización es simplificado y no requiere EIVT completo.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Proceso de implementación',
            valor: 'Simplificado (sin EIVT)',
            unidad: '—',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En calles locales la peatonalización puede implementarse mediante programa piloto temporal de 6 meses sin requerir Estudio de Impacto Vial completo.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'La peatonalización adyacente a un corredor de transporte debe coordinar accesos con la autoridad de transporte y garantizar paso amplio de emergencia.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Paso libre mínimo continuo',
            valor: '5.0',
            unidad: 'm',
            fuente: 'ITDP / SEMOVI',
            detalle: 'Junto a corredores BRT el paso libre mínimo debe ser de 5.0 m para garantizar la evacuación de pasajeros y el acceso de vehículos de emergencia al corredor.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Coordinación con autoridad de transporte',
            valor: 'Obligatoria (SEMOVI/STC)',
            unidad: '—',
            fuente: 'Ley de Movilidad CDMX / SEMOVI',
            detalle: 'Cualquier peatonalización en zona de influencia de un corredor BRT debe ser validada por SEMOVI o el organismo operador del sistema de transporte.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la peatonalización debe usar materiales históricos y ser reversible; requiere dictamen de INAH.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Iluminación promedio mínima',
            valor: '30',
            unidad: 'lux (diseño patrimonial)',
            fuente: 'Criterios INAH / NOM-013-ENER',
            detalle: 'En zonas patrimoniales la iluminación debe alcanzar mínimo 30 lux con luminarias de diseño compatible con la declaratoria histórica.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Reversibilidad del diseño',
            valor: 'Requerida',
            unidad: '—',
            fuente: 'Criterios INAH / SEDUVI',
            detalle: 'El diseño de peatonalización en zona patrimonial debe poder revertirse sin daño al tejido histórico; se prohíben modificaciones permanentes sin dictamen de INAH.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Validación previa de INAH',
            valor: 'Obligatoria',
            unidad: '—',
            fuente: 'Ley Federal sobre Monumentos y Zonas Arqueológicos',
            detalle: 'Toda intervención permanente en calle patrimonial peatonalizada requiere dictamen previo favorable del INAH o de la autoridad patrimonial correspondiente.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     INTEGRACIÓN DE TRANSPORTE PÚBLICO
  ══════════════════════════════════════════════════════════ */
  'transporte-publico': {
    'via-primaria': {
      nota: 'En vía primaria se requiere integración multimodal completa y radios de cobertura más amplios por la escala de los flujos.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Radio máximo de cobertura de parada',
            valor: '500',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / ITDP',
            detalle: 'En vías primarias de alta demanda el radio de cobertura puede ampliarse a 500 m si se garantiza calidad de caminata peatonal.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Separación entre paradas',
            valor: '400–600',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías primarias la separación entre paradas se amplía a 400–600 m para favorecer velocidad comercial del transporte.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Integración multimodal',
            valor: 'Completa (bici, peatón, auto)',
            unidad: '—',
            fuente: 'SEDATU Plan de Movilidad 2019',
            detalle: 'En vías primarias las paradas deben integrar bicicletas (estacionamiento), conexión peatonal accesible y, donde aplique, acceso vehicular de P+R.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local la separación entre paradas es menor y se limita el tamaño de las unidades sin estudio previo.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Separación entre paradas',
            valor: '200–400',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En calles locales la menor velocidad permite paradas más frecuentes; la separación recomendada se reduce a 200–400 m.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Tamaño máximo de unidades',
            valor: '≤ 9 m sin estudio de factibilidad',
            unidad: 'm',
            fuente: 'RCDF / Reglamento de Tránsito CDMX',
            detalle: 'En calles locales no se permiten unidades de más de 9 m de longitud sin un estudio de factibilidad geométrica y estructural previo.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT los estándares de ITDP BRT Standard aplican; la separación entre estaciones es mayor y se requiere pago previo.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Separación entre paradas',
            valor: '500–800',
            unidad: 'm',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'En sistemas BRT las estaciones se ubican cada 500–800 m para optimizar la velocidad comercial del corredor.',
          },
          {
            parametro: 'Área de intercambio modal',
            valor: '150',
            unidad: 'm² mínimo',
            fuente: 'ITDP BRT Standard / Manual CDMX',
            detalle: 'Las estaciones BRT de alta demanda deben tener un área de intercambio modal mínima de 150 m² para absorber los flujos de transferencia.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Pago previo al abordaje',
            valor: 'Obligatorio en estaciones BRT',
            unidad: '—',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'El pago se realiza antes de ingresar al andén; se requieren torniquetes y validadoras en todos los accesos a la estación.',
          },
          {
            parametro: 'Sistema de información en tiempo real',
            valor: 'Obligatorio en andén',
            unidad: '—',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'Cada estación BRT debe contar con panel de información en tiempo real visible desde el andén que muestre el tiempo de llegada de la próxima unidad.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la infraestructura de transporte debe integrarse al entorno histórico con validación de INAH para instalaciones permanentes.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Infraestructura compatible con zona histórica',
            valor: 'Diseño integrado',
            unidad: '—',
            fuente: 'Criterios INAH / SEDUVI',
            detalle: 'Las paradas, kioscos de información y elementos de infraestructura de transporte en zona patrimonial deben tener diseño compatible con la declaratoria histórica.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria los parámetros base aplican en su mayoría; se recomienda verificar integración con rutas troncales en vías primarias adyacentes.',
      modificados: {},
      adicionales: {},
    },
  },

  /* ══════════════════════════════════════════════════════════
     INTERSECCIONES VIALES
  ══════════════════════════════════════════════════════════ */
  'intersecciones': {
    'via-primaria': {
      nota: 'En vía primaria se requiere análisis de capacidad vial y la longitud de carriles de giro aumenta para absorber los volúmenes de demanda.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Longitud carril de giro exclusivo',
            valor: '60',
            unidad: 'm mínimo',
            fuente: 'SEDATU Manual de Vialidades 2019',
            detalle: 'En vías primarias la longitud mínima del carril de giro sube a 60 m para absorber colas en hora pico sin afectar el flujo de tránsito directo.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Análisis de capacidad vial',
            valor: 'Obligatorio (método HCM)',
            unidad: '—',
            fuente: 'Manual de Vialidades SCT / SEDATU',
            detalle: 'Las intersecciones de vías primarias requieren análisis de capacidad mediante metodología HCM o equivalente antes de cualquier modificación geométrica.',
          },
          {
            parametro: 'Semáforo con detección peatonal',
            valor: 'Requerido',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En intersecciones de vías primarias el semáforo debe incluir botón o detección automática de peatones y fase exclusiva de cruce.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria el radio de giro se reduce ligeramente y se realiza verificación básica de visibilidad.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Radio de giro máximo en esquina',
            valor: '5.0',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías secundarias el radio de giro máximo se reduce a 5.0 m para favorecer la protección peatonal sin comprometer la circulación.',
          },
        ],
      },
      adicionales: {},
    },

    'calle-local': {
      nota: 'En calle local se aplica velocidad de diseño de 30 km/h; el radio de giro es menor para calmar el tráfico en zona residencial.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Radio de giro máximo en esquina',
            valor: '4.5',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / Zona 30',
            detalle: 'En calles locales el radio de giro máximo de 4.5 m reduce la velocidad de giro vehicular para proteger a peatones en zonas residenciales.',
          },
          {
            parametro: 'Triángulo de visibilidad libre',
            valor: '15 × 15',
            unidad: 'm',
            fuente: 'NOM-034-SCT2 / Manual de Calles CDMX',
            detalle: 'En calles locales con velocidad de diseño de 30 km/h el triángulo de visibilidad se reduce a 15 × 15 m respecto al estándar de 30 × 30 m.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Velocidad de diseño en intersección',
            valor: '30',
            unidad: 'km/h (Zona 30)',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En calles locales se aplica el régimen de Zona 30; se recomienda complementar con medidas físicas de calmado de tráfico (resaltos, orejas, cambios de pavimento).',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT las intersecciones requieren fase semafórica exclusiva para el transporte masivo y carriles de giro más largos.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Longitud carril de giro exclusivo',
            valor: '80',
            unidad: 'm mínimo',
            fuente: 'ITDP BRT Standard / Manual de Vialidades',
            detalle: 'Las unidades BRT (hasta 18 m) requieren carriles de giro más largos; el mínimo en corredores de transporte masivo es de 80 m.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Fase semafórica exclusiva BRT',
            valor: 'Obligatoria',
            unidad: '—',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'Las intersecciones en corredor BRT deben tener fase semafórica exclusiva coordinada con el corredor; se permite prioridad semafórica activa con detector de unidades.',
          },
          {
            parametro: 'Prohibición de giro en U en corredor',
            valor: 'Prohibido en intersecciones BRT',
            unidad: '—',
            fuente: 'SEMOVI / Reglamento de Tránsito CDMX',
            detalle: 'Se prohíbe el giro en U en intersecciones sobre el corredor BRT para evitar conflictos con las unidades de transporte masivo.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la geometría de las intersecciones debe preservarse; la señalización debe ser de baja altura e integrada al entorno.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Señalización de prioridad',
            valor: 'No intrusiva, baja altura',
            unidad: '—',
            fuente: 'Criterios INAH / NOM-034-SCT2',
            detalle: 'En zona patrimonial las señales de ALTO y CEDA deben ser de diseño compatible y baja altura; se prohíben postes estándar que alteren la imagen urbana histórica.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Preservación de geometría histórica',
            valor: 'Obligatoria sin ampliaciones',
            unidad: '—',
            fuente: 'Criterios INAH / SEDUVI',
            detalle: 'No se permite ampliar ni modificar la geometría de intersecciones en zona patrimonial sin dictamen previo favorable del INAH.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     JARDINES DE INFILTRACIÓN
  ══════════════════════════════════════════════════════════ */
  'jardines-infiltracion': {
    'via-primaria': {
      nota: 'En vía primaria la alta contaminación vehicular exige mayor capacidad de infiltración y trampa de aceites previa.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Capacidad de infiltración mínima',
            valor: '50',
            unidad: 'mm/hr',
            fuente: 'SEDATU Manual de Infraestructura Verde / EPA',
            detalle: 'En vías primarias la mayor carga de contaminantes vehiculares exige una capacidad de infiltración mínima de 50 mm/hr para garantizar la calidad del agua infiltrada.',
          },
        ],
        obligatorias: [
          {
            parametro: 'Distancia mínima a cimentaciones',
            valor: '4.0',
            unidad: 'm',
            fuente: 'RCDF Art. 169',
            detalle: 'En vías primarias la distancia mínima de separación a cimentaciones aumenta a 4.0 m por los mayores volúmenes de agua infiltrada.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Trampa de sólidos y aceites',
            valor: 'Obligatoria previa al jardín',
            unidad: '—',
            fuente: 'SACMEX / Normas de Descarga CDMX',
            detalle: 'En vías primarias es obligatorio un pretratamiento (trampa de sólidos y aceites) antes del ingreso del agua al jardín de infiltración.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria los parámetros base aplican con recomendación de pretratamiento básico de aceites.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Pretratamiento de aceites',
            valor: 'Recomendado',
            unidad: '—',
            fuente: 'SEDATU / EPA Stormwater',
            detalle: 'En vías secundarias se recomienda instalar un separador básico de aceites antes del ingreso del escurrimiento al jardín de infiltración.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local se permite la versión simplificada integrada en cajetes de árbol ampliados.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Esquema simplificado en cajete ampliado',
            valor: 'Permitido (mín. 2 m²)',
            unidad: 'm²',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En calles locales se acepta el esquema de cajete ampliado tipo "sponge" con sustrato drenante de mínimo 2 m² como jardín de infiltración simplificado.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT la alta carga de hidrocarburos exige trampa certificada y mayor separación a infraestructura.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Capacidad de infiltración mínima',
            valor: '75',
            unidad: 'mm/hr',
            fuente: 'EPA Stormwater / NACTO Stormwater Guide',
            detalle: 'En corredores de transporte masivo la capacidad de infiltración mínima es de 75 mm/hr por la alta carga de hidrocarburos de las unidades.',
          },
        ],
        obligatorias: [
          {
            parametro: 'Distancia mínima a cimentaciones',
            valor: '5.0',
            unidad: 'm',
            fuente: 'RCDF Art. 169',
            detalle: 'En zonas de infraestructura de transporte masivo la distancia mínima a cimentaciones aumenta a 5.0 m.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Trampa de hidrocarburos certificada',
            valor: 'Obligatoria (norma ANCE o equivalente)',
            unidad: '—',
            fuente: 'SACMEX / NMX-AA-120',
            detalle: 'En corredores BRT se requiere trampa de hidrocarburos certificada bajo norma NMX-AA-120 o equivalente antes del ingreso al jardín de infiltración.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial las excavaciones son limitadas por restricciones arqueológicas; se requiere consulta previa de INAH.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Profundidad de sustrato drenante',
            valor: '0.2–0.4',
            unidad: 'm',
            fuente: 'Criterios INAH / SEDATU',
            detalle: 'En zona patrimonial la profundidad del sustrato se limita a 0.2–0.4 m para evitar afectaciones a estratos arqueológicos o históricos.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Consulta arqueológica previa (INAH)',
            valor: 'Obligatoria antes de excavar',
            unidad: '—',
            fuente: 'Ley Federal sobre Monumentos y Zonas Arqueológicos',
            detalle: 'Cualquier excavación para jardín de infiltración en zona patrimonial requiere consulta arqueológica previa con el INAH; excavaciones > 0.6 m requieren permiso expreso.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     ESTACIONAMIENTO PÚBLICO EN VÍA
  ══════════════════════════════════════════════════════════ */
  'estacionamiento': {
    'via-primaria': {
      nota: 'El estacionamiento en vía está prohibido en vías primarias según el Manual de Calles CDMX 2019.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Cajón paralelo (ancho × largo)',
            valor: 'PROHIBIDO en vía primaria',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'El estacionamiento en vía pública está prohibido en vías primarias y arteriales; los cajones existentes deben relocalizarse.',
          },
          {
            parametro: 'Cajón perpendicular (ancho × largo)',
            valor: 'PROHIBIDO en vía primaria',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'El estacionamiento perpendicular en vía pública está prohibido en vías primarias sin excepción.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Relocalización de cajones existentes',
            valor: 'Obligatoria a calles paralelas',
            unidad: '—',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'Los cajones de estacionamiento en vía primaria deben relocalizarse a estacionamientos públicos o calles paralelas; se aplica sanción y remoción inmediata.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria el estacionamiento en vía está permitido con restricciones de lado y horario.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Restricción de lado en vía estrecha',
            valor: 'Solo un lado si sección total < 10 m',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX 2019',
            detalle: 'En vías secundarias con sección total menor a 10 m el estacionamiento en vía solo se permite en un lado de la calle para mantener circulación bidireccional.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local el estacionamiento en vía se permite en ambas modalidades si la velocidad de la zona es ≤ 30 km/h.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Velocidad de zona requerida',
            valor: '≤ 30 km/h (Zona 30)',
            unidad: 'km/h',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'El estacionamiento en vía en calle local solo es compatible con régimen de velocidad máxima de 30 km/h; se recomienda implementar Zona 30 de manera integral.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'El estacionamiento está prohibido en la franja de influencia del corredor BRT; se relocaliza a calles paralelas.',
      modificados: {
        manualesNacionales: [
          {
            parametro: 'Restricción en vialidades primarias',
            valor: 'PROHIBIDO en franja BRT (50 m)',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / ITDP BRT Standard',
            detalle: 'El estacionamiento en vía está prohibido en toda la franja de influencia del corredor BRT (50 m a cada lado del eje), no solo en la vialidad primaria.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Plan de gestión de estacionamiento',
            valor: 'Obligatorio en corredor',
            unidad: '—',
            fuente: 'ITDP Guía de Estacionamiento / SEMOVI',
            detalle: 'La implementación de un corredor BRT requiere un plan de gestión de estacionamiento que identifique la relocalización de cajones y zonas de carga/descarga.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la señalización y los elementos de estacionamiento deben ser compatibles con la imagen urbana histórica.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Diseño de señalización en zona histórica',
            valor: 'Compatible con declaratoria',
            unidad: '—',
            fuente: 'Criterios INAH / SEDUVI',
            detalle: 'Las señales, bolardos y demarcaciones de cajones en zona patrimonial deben usar materiales y diseño compatible con la declaratoria; se prohíben bolardos metálicos estándar.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     PARADAS DE TRANSPORTE PÚBLICO
  ══════════════════════════════════════════════════════════ */
  'paradas-transporte': {
    'via-primaria': {
      nota: 'En vía primaria la bahía aumenta a 22 m para unidades articuladas y se requiere cubierta con información digital.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de bahía',
            valor: '22',
            unidad: 'm',
            fuente: 'RCDF / Manual SCT',
            detalle: 'En vías primarias con unidades articuladas de hasta 18 m la bahía mínima sube a 22 m para garantizar la maniobra segura de entrada y salida.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Área de espera por usuario',
            valor: '3',
            unidad: 'm² por usuario',
            fuente: 'SEDATU Manual de Paradas 2020',
            detalle: 'En vías primarias de alta demanda el área de espera techada debe calcularse con 3 m² por usuario en hora pico.',
          },
          {
            parametro: 'Iluminación en área de espera',
            valor: '100',
            unidad: 'lux mínimo',
            fuente: 'NOM-013-ENER / Manual SEDATU',
            detalle: 'En vías primarias la iluminación del área de espera se incrementa a 100 lux mínimo por la mayor actividad nocturna.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Cubierta con panel de información',
            valor: 'Obligatoria con información de rutas',
            unidad: '—',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En vías primarias la cubierta debe incluir panel de información digital o impreso con todas las rutas que pasan por la parada, horarios y mapa de red.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local la bahía no es obligatoria; basta con señalización básica y una plataforma accesible mínima.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de bahía',
            valor: 'No requerida',
            unidad: '—',
            fuente: 'RCDF / Manual de Calles CDMX',
            detalle: 'En calles locales de baja demanda la bahía no es obligatoria; puede sustituirse por una zona de parada señalizada en la calzada si la velocidad es ≤ 30 km/h.',
          },
          {
            parametro: 'Cubierta en rutas de alta demanda',
            valor: 'No obligatoria en baja demanda',
            unidad: '—',
            fuente: 'NOM-233-SSA1-2003',
            detalle: 'En rutas de baja demanda (< 50 usuarios/hr) en calle local la cubierta no es obligatoria; basta con señalización vertical y plataforma accesible.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Plataforma accesible mínima',
            valor: '1.5 × 2.0',
            unidad: 'm',
            fuente: 'NOM-233-SSA1 / Manual de Calles CDMX',
            detalle: 'Aun sin bahía, en calle local debe existir una plataforma accesible pavimentada de mínimo 1.5 × 2.0 m en el punto de parada.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT aplican los estándares de estación: bahía de 30 m, plataforma nivelada y pago previo.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de bahía',
            valor: '30',
            unidad: 'm (módulo básico BRT)',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'Las estaciones BRT tienen una longitud mínima de 30 m correspondiente a un módulo básico; estaciones de alta demanda pueden requerir 45 m o más.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Área de espera por usuario',
            valor: '4',
            unidad: 'm² por usuario',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'Las estaciones BRT de alta demanda deben calcularse con 4 m² por usuario en hora pico para evitar hacinamiento.',
          },
          {
            parametro: 'Iluminación en área de espera',
            valor: '150',
            unidad: 'lux mínimo',
            fuente: 'ITDP BRT Standard / NOM-013-ENER',
            detalle: 'Las estaciones BRT requieren mínimo 150 lux en el área de espera para garantizar seguridad y legibilidad de la señalética.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Plataforma nivelada (desnivel máximo)',
            valor: '10',
            unidad: 'mm',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'Las estaciones BRT deben garantizar un desnivel máximo de 10 mm entre el piso de la plataforma y el piso de la unidad para abordaje sin asistencia.',
          },
          {
            parametro: 'Pago previo al abordaje (torniquetes)',
            valor: 'Obligatorio',
            unidad: '—',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'El pago se realiza en los accesos a la estación; se requieren torniquetes y lectoras de tarjeta en todos los ingresos al andén.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial la cubierta de la parada debe integrarse al entorno histórico y requiere validación de INAH para instalaciones permanentes.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Cubierta en rutas de alta demanda',
            valor: 'Diseño compatible con zona histórica',
            unidad: '—',
            fuente: 'Criterios INAH / NOM-233-SSA1',
            detalle: 'En zonas patrimoniales la cubierta debe tener diseño arquitectónico compatible con la declaratoria histórica; se prohíben estructuras de acero galvanizado o PVC estándar.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Validación de INAH para instalación permanente',
            valor: 'Obligatoria',
            unidad: '—',
            fuente: 'Ley Federal sobre Monumentos y Zonas Arqueológicos',
            detalle: 'La instalación de cubiertas, módulos de información o cualquier elemento permanente de parada en zona patrimonial requiere dictamen previo del INAH.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria la bahía puede sustituirse por balizamiento pintado si la demanda es moderada.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Bahía o balizamiento pintado',
            valor: 'Bahía si demanda > 50 usuarios/hr',
            unidad: 'usuarios/hr',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'En vía secundaria se permite balizamiento pintado en lugar de bahía física si la demanda no supera los 50 usuarios por hora en hora pico.',
          },
        ],
      },
    },
  },

  /* ══════════════════════════════════════════════════════════
     REDUCCIÓN / AUMENTO DE CARRILES
  ══════════════════════════════════════════════════════════ */
  'reduccion-carriles': {
    'via-primaria': {
      nota: 'En vía primaria cualquier modificación de carriles requiere estudio de tránsito y señalización de mayor longitud.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de transición',
            valor: '80',
            unidad: 'm (a 50 km/h)',
            fuente: 'NOM-034-SCT2-2011',
            detalle: 'En vías primarias con mayor velocidad de diseño la longitud mínima de transición sube a 80 m para garantizar una reducción progresiva segura.',
          },
          {
            parametro: 'Ancho mínimo de carril urbano',
            valor: '3.5',
            unidad: 'm',
            fuente: 'NOM-034-SCT2-2011',
            detalle: 'En vías primarias el ancho mínimo de carril después de la reducción debe ser de 3.5 m para mantener la capacidad de circulación.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Estudio de tránsito previo',
            valor: 'Obligatorio (aforo 24h mínimo)',
            unidad: '—',
            fuente: 'Manual de Vialidades SCT / SEMOVI',
            detalle: 'Cualquier reducción o aumento de carriles en vía primaria requiere estudio de tránsito con aforo mínimo de 24 horas y proyección a 20 años.',
          },
        ],
      },
    },

    'via-secundaria': {
      nota: 'En vía secundaria la transición estándar aplica con análisis básico de capacidad recomendado.',
      modificados: {},
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Análisis de capacidad básico',
            valor: 'Recomendado',
            unidad: '—',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'Se recomienda realizar un análisis básico de capacidad vial antes de reducir carriles en vías secundarias para dimensionar correctamente los efectos en la operación.',
          },
        ],
      },
    },

    'calle-local': {
      nota: 'En calle local la velocidad de diseño de 30 km/h permite reducir la longitud de transición y el ancho mínimo de carril.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de transición',
            valor: '40',
            unidad: 'm (a 30 km/h)',
            fuente: 'NOM-034-SCT2-2011',
            detalle: 'En calles locales con velocidad de diseño de 30 km/h la longitud mínima de transición se reduce a 40 m.',
          },
          {
            parametro: 'Ancho mínimo de carril urbano',
            valor: '2.75',
            unidad: 'm',
            fuente: 'Manual de Calles CDMX / NACTO',
            detalle: 'En calles locales con velocidad ≤ 30 km/h se acepta un ancho de carril de 2.75 m que permite la reducción manteniendo la circulación bidireccional.',
          },
        ],
      },
      adicionales: {
        manualesNacionales: [
          {
            parametro: 'Calmado de tráfico integrado',
            valor: 'Recomendado (Zona 30)',
            unidad: '—',
            fuente: 'Manual de Calles CDMX / SEDATU',
            detalle: 'La reducción de carriles en calle local debe complementarse con medidas de calmado de tráfico (resaltos, cambios de pavimento, orejas) para reforzar la Zona 30.',
          },
        ],
      },
    },

    'corredor-transporte': {
      nota: 'En corredor BRT se requiere carril exclusivo protegido de 3.5 m con separador físico obligatorio.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Longitud mínima de transición',
            valor: '100',
            unidad: 'm',
            fuente: 'ITDP BRT Standard / NOM-034-SCT2',
            detalle: 'Las unidades BRT articuladas de hasta 18 m requieren zonas de transición más largas; el mínimo en corredores BRT es de 100 m.',
          },
        ],
        manualesNacionales: [
          {
            parametro: 'Ancho de carril recomendado',
            valor: '3.5',
            unidad: 'm (carril BRT exclusivo)',
            fuente: 'ITDP BRT Standard / Manual de Calles CDMX',
            detalle: 'El carril exclusivo BRT debe tener un ancho mínimo de 3.5 m para la circulación segura de unidades de 2.6 m de ancho con márgenes de seguridad.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Separador físico del carril BRT',
            valor: 'Obligatorio (mín. 0.5 m)',
            unidad: 'm',
            fuente: 'ITDP BRT Standard 2016',
            detalle: 'El carril exclusivo BRT debe estar separado del tráfico general por un elemento físico continuo de mínimo 0.5 m de ancho (bordillo, jardinera o balizamiento rígido).',
          },
          {
            parametro: 'Señalización exclusiva de corredor BRT',
            valor: 'Color diferenciado y señales específicas',
            unidad: '—',
            fuente: 'ITDP BRT Standard / SEMOVI',
            detalle: 'El carril BRT debe señalizarse con color de pavimento diferenciado (rojo o amarillo) y señales verticales específicas de corredor exclusivo.',
          },
        ],
      },
    },

    'zona-patrimonial': {
      nota: 'En zona patrimonial no se permite ampliar la calzada; la señalización de transición debe integrarse al entorno histórico.',
      modificados: {
        obligatorias: [
          {
            parametro: 'Señalización de zona de transición',
            valor: 'Integrada, no intrusiva',
            unidad: '—',
            fuente: 'Criterios INAH / NOM-034-SCT2',
            detalle: 'En zona patrimonial la señalización de transición debe ser de diseño integrado al entorno; se prohíben conos naranjas estándar permanentes y señales de altura estándar.',
          },
        ],
      },
      adicionales: {
        obligatorias: [
          {
            parametro: 'Prohibición de ampliación de calzada',
            valor: 'Prohibida sin dictamen INAH',
            unidad: '—',
            fuente: 'Ley Federal sobre Monumentos / SEDUVI',
            detalle: 'En zona patrimonial queda prohibido ampliar la sección de la calzada para agregar carriles; cualquier modificación al perfil vial histórico requiere dictamen favorable de INAH.',
          },
        ],
      },
    },
  },
}

// ──────────────────────────────────────────────────────────────────────────────
// FUNCIÓN DE MERGE
// Toma los datos base de una intervención y aplica las modificaciones del
// tipo de vía seleccionado, marcando cada parámetro como modificado o adicional.
// ──────────────────────────────────────────────────────────────────────────────
export function aplicarModificaciones(base, intervencion, tipoVia) {
  const tipoViaInfo = TIPOS_VIA.find((t) => t.value === tipoVia)
  const tipoViaLabel = tipoViaInfo ? tipoViaInfo.label : ''

  const modIntervencion = MODIFICACIONES[intervencion]
  if (!tipoVia || !modIntervencion || !modIntervencion[tipoVia]) {
    return { ...base, tipoViaLabel }
  }

  const mod = modIntervencion[tipoVia]
  const CATEGORIAS = ['obligatorias', 'manualesNacionales', 'internacionales']

  const resultado = {}
  for (const cat of CATEGORIAS) {
    // Copia profunda de los parámetros base
    const params = (base[cat] || []).map((p) => ({ ...p }))

    // Aplicar reemplazos (modificados) — busca por nombre exacto de parametro
    for (const override of (mod.modificados?.[cat] || [])) {
      const idx = params.findIndex((p) => p.parametro === override.parametro)
      if (idx >= 0) {
        params[idx] = {
          ...override,
          tipoViaModificado: true,
          valorBase: params[idx].valor,
          tipoViaLabel,
        }
      } else {
        // Si no existe en la base, se agrega como adicional implícito
        params.push({ ...override, tipoViaAdicional: true, tipoViaLabel })
      }
    }

    // Agregar parámetros adicionales (específicos de este tipo de vía)
    for (const adicional of (mod.adicionales?.[cat] || [])) {
      params.push({ ...adicional, tipoViaAdicional: true, tipoViaLabel })
    }

    resultado[cat] = params
  }

  return {
    ...base,
    ...resultado,
    tipoViaNota: mod.nota,
    tipoViaLabel,
  }
}
