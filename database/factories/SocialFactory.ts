import Social from 'App/Models/Social'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Social, ({ faker }) => {
  return {
    website: faker.internet.domainName(),
    facebook: faker.internet.domainName(),
    instagram: faker.internet.domainName(),
    telegram: faker.internet.userName(),
    twitter: faker.internet.userName(),
    vk: faker.internet.domainName(),
  }
}).build()
