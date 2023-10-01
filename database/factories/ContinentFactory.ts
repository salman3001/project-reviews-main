import Continent from 'App/Models/Continent'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CountryFactory from './address/CountryFactory'

export default Factory.define(Continent, ({ faker }) => {
  return {
    name: faker.location.country(),
  }
})
  .relation('country', () => CountryFactory)
  .build()
