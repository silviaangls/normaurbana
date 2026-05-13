// Reporte de fuentes citadas en normasDB
// Uso: node scripts/reporte-fuentes.js

const SECCIONES_CATEGORIAS = {
  obligatorias:     'Obligatorias',
  manualesNacionales: 'Manuales Nacionales',
  internacionales:  'Internacionales',
}

function limpiarFuente(fuente) {
  // Normaliza variantes menores para agrupar: "RCDF Art. 77" → "RCDF"
  // pero mantenemos la fuente completa tal cual para el reporte
  return fuente.trim()
}

function construirIndice(normasDB) {
  // indice[fuente] = { total, secciones: Set, intervenciones: Set, parametros: [] }
  const indice = new Map()

  for (const [claveIntervencion, intervencion] of Object.entries(normasDB)) {
    const nombreIntervencion = intervencion.nombre

    for (const categoria of Object.keys(SECCIONES_CATEGORIAS)) {
      const lista = intervencion[categoria] ?? []

      for (const param of lista) {
        const fuente = limpiarFuente(param.fuente)

        if (!indice.has(fuente)) {
          indice.set(fuente, {
            fuente,
            total: 0,
            secciones: new Set(),
            intervenciones: new Set(),
            parametros: [],
          })
        }

        const entrada = indice.get(fuente)
        entrada.total++
        if (param.referencia) entrada.secciones.add(param.referencia)
        entrada.intervenciones.add(nombreIntervencion)
        entrada.parametros.push({
          intervencion: nombreIntervencion,
          categoria: SECCIONES_CATEGORIAS[categoria],
          parametro: param.parametro,
          referencia: param.referencia ?? '—',
        })
      }
    }
  }

  // Orden descendente por número de citas
  return [...indice.values()].sort((a, b) => b.total - a.total)
}

function linea(char = '─', ancho = 72) {
  return char.repeat(ancho)
}

function imprimirReporte(entradas) {
  const totalParametros = entradas.reduce((s, e) => s + e.total, 0)
  const masCitada = entradas[0]

  console.log()
  console.log('═'.repeat(72))
  console.log('  REPORTE DE FUENTES — NormaUrb')
  console.log('═'.repeat(72))
  console.log()

  for (let i = 0; i < entradas.length; i++) {
    const e = entradas[i]

    console.log(linea('─'))
    console.log(`  ${String(i + 1).padStart(2, '0')}  ${e.fuente}`)
    console.log(linea('─'))
    console.log(`  Citas totales : ${e.total}`)
    console.log(`  Intervenciones: ${[...e.intervenciones].join(' · ')}`)

    const secciones = [...e.secciones]
    if (secciones.length > 0) {
      console.log(`  Secciones/artículos citados (${secciones.length}):`)
      for (const s of secciones) {
        console.log(`    · ${s}`)
      }
    } else {
      console.log('  Secciones/artículos citados: —')
    }
    console.log()
  }

  console.log('═'.repeat(72))
  console.log('  RESUMEN')
  console.log('═'.repeat(72))
  console.log(`  Fuentes únicas         : ${entradas.length}`)
  console.log(`  Parámetros totales     : ${totalParametros}`)
  console.log(`  Fuente más citada      : ${masCitada.fuente} (${masCitada.total} citas)`)
  console.log('═'.repeat(72))
  console.log()
}

;(async () => {
  try {
    const { normasDB } = await import('../lib/normas.js')
    const entradas = construirIndice(normasDB)
    imprimirReporte(entradas)
  } catch (err) {
    console.error('Error al cargar normas.js:', err.message)
    process.exit(1)
  }
})()
