import KnowledgebaseCategory from 'App/Models/KnowledgeBaseCategory'
import Factory from '@ioc:Adonis/Lucid/Factory'
import KnowledgeBaseContent from 'App/Models/KnowledgeBaseContent'

export default Factory.define(KnowledgebaseCategory, ({ faker }) => {
  return {
    name: faker.lorem.word(),
    slug: faker.lorem.slug(5),
    metaTitle: faker.lorem.lines(1),
    metaDesc: faker.lorem.sentence(10),
    metaKeywords: faker.lorem.words(10),
  }
})
  .relation('contents', () => KnowledgeBaseContent)
  .build()
