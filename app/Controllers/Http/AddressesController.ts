import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import State from 'App/Models/State'
import Street from 'App/Models/Street'

export default class AddressesController {
  public async getStates({ response, request }: HttpContextContract) {
    const countryId = request.qs().countryId
    const states = await State.query().where('countryId', countryId)

    response.json({ states })
  }

  public async getCities({ response, request }: HttpContextContract) {
    const stateId = request.qs().stateId
    const cities = await City.query().where('stateId', stateId)

    response.json({ cities })
  }

  public async getStreets({ response, request }: HttpContextContract) {
    const cityId = request.qs().cityId
    const streets = await Street.query().where('cityId', cityId)

    response.json({ streets })
  }
}
