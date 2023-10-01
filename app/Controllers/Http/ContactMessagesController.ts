import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ContactMessage from 'App/Models/ContactMessage'

export default class ContactMessagesController {
  public async index({ view }: HttpContextContract) {
    const contactMessages = await ContactMessage.all()

    return view.render
  }
}
