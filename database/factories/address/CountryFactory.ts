import Country from 'App/Models/Country'
import Factory from '@ioc:Adonis/Lucid/Factory'
import StateFactory from './StateFactory'

export default Factory.define(Country, ({ faker }) => {
  return {
    name: faker.location.country(),
  }
})
  .relation('state', () => StateFactory)
  .build()
