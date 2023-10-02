import Blog from 'App/Models/Blog'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Blog, ({ faker }) => {
  return {
    title: faker.lorem.sentence(10),
    slug: faker.lorem.slug(5),
    shortDesc: faker.lorem.paragraph(3),
    longDesc: faker.lorem.paragraphs(3, '<br/>\n'),
    metaTitle: faker.lorem.lines(1),
    metaKeywords: faker.lorem.words(5),
    metaDesc: faker.lorem.words(10),
  }
}).build()
