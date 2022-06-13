import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Logger {
  public async handle({ logger, routeKey }: HttpContextContract, next: () => Promise<void>) {
    logger.info(routeKey)
    await next()
  }
}
