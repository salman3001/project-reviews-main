// import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CountryFactory from 'Database/factories/address/CountryFactory'

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
    await this.runSeeder(await import('../AdminUser'))
    await CountryFactory.with('state', 3, (state) => {
      state.with('city', 7, (city) => {
        city.with('street', 9)
      })
    }).createMany(3)
  }
}
