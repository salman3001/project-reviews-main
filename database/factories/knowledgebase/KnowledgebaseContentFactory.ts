import KnowledgebaseContent from 'App/Models/KnowledgeBaseContent'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(KnowledgebaseContent, ({ faker }) => {
  return {
    title: faker.lorem.lines(),
    slug: faker.lorem.slug(5),
    metaTitle: faker.lorem.lines(1),
    metaDesc: faker.lorem.sentence(10),
    metaKeywords: faker.lorem.words(10),
  }
}).build()
