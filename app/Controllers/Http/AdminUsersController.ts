import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { paginate } from 'App/Helpers/Paginate'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Drive from '@ioc:Adonis/Core/Drive'

export default class AdminUsersController {
  public async index({ view, request }: HttpContextContract) {
    const query = request.qs()
    const sortBy = query.sortBy
    const roleId = Number(query.roleId)
    const search = query.search
    const isActive = query.isActive ? JSON.parse(query.isActive) : undefined
    const page = Number(query.page) || 1
    const take = 3
    let pagination = {}

    let users: any[] = []
    let count = 0

    if (search) {
      users = await prisma.adminUser.findMany({
        where: { OR: [{ firstName: { contains: search } }, { lastName: { contains: search } }] },
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({
        where: {
          OR: [{ firstName: { contains: search } }, { lastName: { contains: search } }],
        },
      })
      pagination = paginate(count, page, take, 'admin_users.index')
    } else if (sortBy) {
      users = await prisma.adminUser.findMany({
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        orderBy: { [sortBy]: true },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({})
      pagination = paginate(count, page, take, 'admin_users.index')
    } else if (roleId) {
      users = await prisma.adminUser.findMany({
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        where: { roleId: roleId },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({ where: { roleId: roleId } })
      pagination = paginate(count, page, take, 'admin_users.index')
    } else if (sortBy) {
      users = await prisma.adminUser.findMany({
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        orderBy: { [sortBy]: true },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({})
      pagination = paginate(count, page, take, 'admin_users.index')
    } else if (isActive !== undefined) {
      users = await prisma.adminUser.findMany({
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        where: { isActive },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({ where: { isActive } })
      pagination = paginate(count, page, take, 'admin_users.index')
    } else {
      users = await prisma.adminUser.findMany({
        include: { role: { select: { name: true } }, avatar: { select: { url: true } } },
        skip: take * (page - 1),
        take,
      })
      count = await prisma.adminUser.count({})
      pagination = paginate(count, page, take, 'admin_users.index')
    }

    const roles = await prisma.role.findMany()
    return view.render('admin/admin-users/index', { users, roles, pagination, query })
  }

  public async create({ view }: HttpContextContract) {
    const roles = await prisma.role.findMany()
    const cities = await prisma.city.findMany()
    const states = await prisma.state.findMany()
    const country = await prisma.country.findMany()

    return view.render('admin/admin-users/create', { roles, cities, states, country })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      image: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'], size: '2mb' }),
      email: schema.string({ trim: true }, [rules.email()]),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      phone: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      password: schema.string({ trim: true }, [rules.minLength(8), rules.alphaNum()]),
      isActive: schema.string.optional(),
      roleId: schema.string.optional(),
      address: schema.object().members({
        address: schema.string.optional(),
        cityId: schema.number.optional(),
        stateId: schema.number.optional(),
        countryId: schema.number.optional(),
        zip: schema.string.optional(),
      }),
      social: schema.object().members({
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

    const isEmailExist = await prisma.adminUser.findFirst({ where: { email: payload.email } })
    if (isEmailExist) {
      session.flashAll()
      session.flash('errors.email', 'Email already taken')
      return response.redirect('back')
    }

    const Hashedpassword = await Hash.make(payload.password)

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
      address: schema.object().members({
        address: schema.string.optional(),
        cityId: schema.number.optional(),
        stateId: schema.number.optional(),
        countryId: schema.number.optional(),
        zip: schema.string.optional(),
      }),
      social: schema.object().members({
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
