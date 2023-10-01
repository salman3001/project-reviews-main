import State from 'App/Models/State'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CityFactory from './CityFactory'

export default Factory.define(State, ({ faker }) => {
  return {
    name: faker.location.state(),
  }
})
  .relation('city', () => CityFactory)
  .build()
