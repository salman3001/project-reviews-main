import ContactMessage from 'App/Models/ContactMessage'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(ContactMessage, ({ faker }) => {
  return {
    email: faker.internet.email(),
    title: faker.lorem.lines(1),
    message: faker.lorem.sentence(),
  }
}).build()
