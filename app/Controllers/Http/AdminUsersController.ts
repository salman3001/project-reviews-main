import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Drive from '@ioc:Adonis/Core/Drive'
import AdminUser from 'App/Models/AdminUser'
import Role from 'App/Models/Role'
import Country from 'App/Models/Country'

export default class AdminUsersController {
  public async index({ view, request }: HttpContextContract) {
    const { orderBy, roleId, search, isActive, page } = request.qs()

    const query = AdminUser.query()

    if (search) {
      query.whereLike('firstName', `%${search}%`).orWhereLike('lastName', `%${search}%`)
    }

    if (roleId) {
      query.whereHas('role', (q) => {
        q.where('id', roleId)
      })
    }

    if (isActive) {
      query.where('is_active', +isActive)
    }

    const users = await query.orderBy(orderBy || 'first_name').paginate(page || 1, 2)
    users.baseUrl('/admin/admin-users')
    const roles = await Role.all()

    return view.render('admin/admin-users/index', { users, roles, query: { ...request.qs() } })
  }

  public async create({ view }: HttpContextContract) {
    const roles = await Role.all()
    const countries = await Country.all()

    return view.render('admin/admin-users/create', { roles, countries })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const userSchema = schema.create({
      image: schema.file.optional({
        extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        size: '2mb',
      }),
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'admin_users', column: 'email' }),
      ]),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      phone: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      password: schema.string({ trim: true }, [rules.minLength(8), rules.alphaNum()]),
      isActive: schema.string.optional(),
    })

    const roleSchema = schema.create({
      id: schema.string.optional(),
    })

    const addressSchema = schema.create({
      address: schema.string.optional(),
      cityId: schema.number.optional(),
      stateId: schema.number.optional(),
      countryId: schema.number.optional(),
      zip: schema.string.optional(),
    })

    const socialSchema = schema.create({
      website: schema.string.optional(),
      facebook: schema.string.optional(),
      twitter: schema.string.optional(),
      instagram: schema.string.optional(),
      pintrest: schema.string.optional(),
      vk: schema.string.optional(),
      whatsapp: schema.string.optional(),
      telegram: schema.string.optional(),
    })

    const userPayload = await request.validate({ schema: userSchema })
    const rolePayload = await request.validate({ schema: roleSchema })
    const addressPayload = await request.validate({ schema: addressSchema })
    const socialPayload = await request.validate({ schema: socialSchema })

    // const user = await AdminUser.create({})

    const user = await prisma.adminUser.create({
      data: {
        email: payload.email.toLocaleLowerCase(),
        password: Hashedpassword,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        isActive: payload.isActive ? JSON.parse(payload.isActive) : false,
        roleId: Number(payload.roleId),
        address: {
          create: { ...payload.address },
        },
        Social: { create: { ...payload.social } },
      },
    })

    if (payload.image) {
      await payload.image.moveToDisk('./admin_users/', {
        name: user.firstName + Date.now() + '.' + payload.image.extname,
      })
      const imageName = payload.image?.fileName
      const createdImage = await prisma.image.create({
        data: { url: '/admin_users/' + imageName, url_sm: '' },
      })

      await prisma.adminUser.update({
        where: { id: user.id },
        data: { avatar: { connect: { id: createdImage.id } } },
      })
    }

    session.flash('message', { type: 'success', title: 'User Created Successfully' })
    return response.redirect().toRoute('admin_users.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const user = await prisma.adminUser.findUnique({
      where: { id: Number(params.id) },
      include: { address: true, Social: true, avatar: true },
    })

    const cities = await prisma.city.findMany()
    const states = await prisma.state.findMany()
    const countries = await prisma.country.findMany()
    const roles = await prisma.role.findMany()

    return view.render('admin/admin-users/edit', { user, cities, states, countries, roles })
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    const id = Number(params.id)
    console.log(id)

    const validationSchema = schema.create({
      image: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'], size: '2mb' }),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      phone: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      isActive: schema.string.optional(),
      roleId: schema.string.optional(),
      address: schema.create({
        address: schema.string.optional(),
        cityId: schema.number.optional(),
        stateId: schema.number.optional(),
        countryId: schema.number.optional(),
        zip: schema.string.optional(),
      }),
      social: schema.create({
        website: schema.string.optional(),
        facebook: schema.string.optional(),
        twitter: schema.string.optional(),
        instagram: schema.string.optional(),
        pintrest: schema.string.optional(),
        vk: schema.string.optional(),
        whatsapp: schema.string.optional(),
        telegram: schema.string.optional(),
      }),
    })

    const payload = await request.validate({ schema: validationSchema })

    const user = await prisma.adminUser.update({
      where: { id },
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        isActive: payload.isActive ? JSON.parse(payload.isActive) : false,
        roleId: Number(payload.roleId),
        address: {
          upsert: {
            update: { ...payload.address },
            create: { ...payload.address },
          },
        },
        Social: {
          upsert: {
            update: { ...payload.social },
            create: { ...payload.social },
          },
        },
      },
      include: { avatar: true },
    })

    if (payload.image) {
      if (user?.avatar) {
        await Drive.delete(user.avatar.url)
      }

      await payload.image.moveToDisk('./admin_users/', {
        name: user.firstName + Date.now() + '.' + payload.image.extname,
      })
      const imageName = payload.image?.fileName

      await prisma.adminUser.update({
        where: { id: user.id },
        data: {
          avatar: {
            upsert: {
              create: { url: '/admin_users/' + imageName, url_sm: '' },
              update: { url: '/admin_users/' + imageName },
            },
          },
        },
      })
    }

    session.flash('message', { type: 'success', title: 'User updated successfully' })

    return response.redirect().toRoute('admin_users.index')
  }

  public async destroy({ params, response, session }: HttpContextContract) {
    console.log('Ran')

    const deletedUser = await prisma.adminUser.delete({
      where: { id: Number(params.id) },
      include: { avatar: true },
    })

    if (deletedUser?.avatar) {
      await Drive.delete(deletedUser.avatar.url)
      await prisma.image.delete({ where: { id: deletedUser.avatar.id } })
    }

    session.flash('message', { type: 'success', title: 'User deleted successfully' })
    return response.redirect('back')
  }

  public async banUser({ params, session, response }: HttpContextContract) {
    await prisma.adminUser.update({
      where: { id: Number(params.id) },
      data: {
        isActive: false,
      },
    })
    session.flash('message', { type: 'success', title: 'User Banned' })
    return response.redirect('back')
  }

  public async changeRole({ params, session, response, request }: HttpContextContract) {
    const roleId = request.input('roleId')
    await prisma.adminUser.update({
      where: { id: Number(params.id) },
      data: { roleId: Number(roleId) },
    })
    session.flash('message', { type: 'success', title: 'Role Updated' })
    return response.redirect('back')
  }
}
