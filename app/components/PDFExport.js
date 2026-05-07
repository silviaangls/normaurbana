'use client'

export default function PDFExport({ normas, alcaldia, intervencion }) {
  const handlePrint = () => {
    // Agrega clase al body para señalar estado de impresión
    document.body.classList.add('printing')

    // Remueve la clase cuando el diálogo de impresión se cierra
    window.addEventListener(
      'afterprint',
      () => document.body.classList.remove('printing'),
      { once: true }
    )

    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="no-print inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium rounded-lg border border-slate-600 transition-colors"
      title="Imprimir o guardar como PDF"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" rx="1" />
      </svg>
      Exportar ficha PDF
    </button>
  )
}
