import { getNormasConTipoVia } from '@/lib/normas'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const intervencion = searchParams.get('intervencion')
  const tipoVia = searchParams.get('tipoVia') || ''

  if (!intervencion) {
    return Response.json(
      { error: 'El parámetro "intervencion" es requerido.' },
      { status: 400 }
    )
  }

  const normas = getNormasConTipoVia(intervencion, tipoVia)

  if (!normas) {
    return Response.json(
      { error: `No se encontraron normas para la intervención: ${intervencion}` },
      { status: 404 }
    )
  }

  return Response.json(normas)
}
