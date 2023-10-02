// import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdminUserFactory from 'Database/factories/AdminUserFactory'
import ContactMessageFactory from 'Database/factories/ContactMessageFactory'
import ContinentFactory from 'Database/factories/ContinentFactory'
import SupportTicketFactory from 'Database/factories/SupportTicketFactory'
import CountryFactory from 'Database/factories/address/CountryFactory'
import BlogCategoryFactory from 'Database/factories/blogs/BlogCategoryFactory'
import KnowledgebaseCategoryFactory from 'Database/factories/knowledgebase/KnowledgebaseCategoryFactory'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    // if (
    //   (!Seeder.default.environment.includes('development') && Application.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && Application.inTest) ||
    //   (!Seeder.default.environment.includes('production') && Application.inProduction)
    // ) {
    //   return
    // }
    await new Seeder.default(this.client).run()
  }
  public async run() {
    // Write your database queries inside the run method
    await this.runSeeder(await import('../Permission'))
    await this.runSeeder(await import('../Role'))
    // await this.runSeeder(await import('../AdminUser'))
    await AdminUserFactory.with('social')
      .merge([{ email: 'salman@gmail.com', isActive: true, roleId: 1 }])
      .createMany(20)
    await ContinentFactory.with('country', 3, (country) => {
      country.with('state', 3, (state) => {
        state.with('city', 3, (city) => {
          city.with('street', 4)
        })
      })
    }).createMany(3)
    await BlogCategoryFactory.with('blogs', 5).createMany(4)
    await KnowledgebaseCategoryFactory.with('contents', 5).createMany(3)
    await ContactMessageFactory.createMany(5)
    await SupportTicketFactory.createMany(3)
  }
}
