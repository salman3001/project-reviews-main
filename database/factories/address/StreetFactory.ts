import Street from 'App/Models/Street'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Street, ({ faker }) => {
  return {
    name: faker.location.street(),
  }
}).build()
