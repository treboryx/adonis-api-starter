import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createIPX, handleRequest } from 'ipx'
import type { IPXHRequest } from 'ipx'
const ipx = createIPX({ dir: false })

export default class ImagesController {
  public async index({ request, response }: HttpContextContract) {
    const req: IPXHRequest = {
      url: request.url().replace('/image/', ''),
      headers: request.headers() as Record<string, string>,
    }
    const image = await handleRequest(req, ipx)

    response.header('Content-Type', image.headers['Content-Type'])
    response.header('Content-Length', image.headers['Content-Length'])

    return response.send(image.body)
  }
}
