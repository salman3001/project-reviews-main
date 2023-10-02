import BlogCategory from 'App/Models/BlogCategory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import BlogFactory from './BlogFactory'

export default Factory.define(BlogCategory, ({ faker }) => {
  return {
    name: faker.lorem.word(),
    slug: faker.lorem.slug(5),
    metaTitle: faker.lorem.lines(1),
    metaDesc: faker.lorem.sentence(10),
    metaKeywords: faker.lorem.words(10),
  }
})
  .relation('blogs', () => BlogFactory)
  .build()
