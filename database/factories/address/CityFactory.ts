import City from 'App/Models/City'
import Factory from '@ioc:Adonis/Lucid/Factory'
import StreetFactory from './StreetFactory'

export default Factory.define(City, ({ faker }) => {
  return {
    name: faker.location.city(),
  }
})
  .relation('street', () => StreetFactory)
  .build()
