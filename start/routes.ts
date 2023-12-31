import { prisma } from '@ioc:Adonis/Addons/Prisma'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import '../routes/adminRoutes'

Route.get('/', async ({ view }) => {
  return view.render('front/home')
}).as('home')

Route.get('partials/:name', 'PartialsController.getPartial')
Route.get('location/states', 'AddressesController.getStates')
Route.get('location/cities', 'AddressesController.getCities')
Route.get('location/streets', 'AddressesController.getStreets')
