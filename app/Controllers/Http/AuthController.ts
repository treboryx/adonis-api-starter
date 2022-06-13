import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class AuthController {
  public async index({ auth, response }: HttpContextContract) {
    if (await auth.check()) {
      return response.json({ success: true, user: auth.user })
    } else {
      return response.json({ success: false, message: 'Not logged in' })
    }
  }

  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(CreateUserValidator)
      const user = await User.create(data)
      const newUser = await auth.login(user)
      return response.status(201).json(newUser)
    } catch (e) {
      response.badRequest({ success: false, error: e.messages })
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { uid, password } = request.only(['uid', 'password'])

    try {
      await auth.attempt(uid, password)
    } catch (error) {
      return response.json({ success: false, message: 'Credentials incorrect' })
    }

    return response.json({ success: true, user: auth.user })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.json({ success: true })
  }
}
