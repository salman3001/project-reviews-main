import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { paginate } from 'App/Helpers/Paginate'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'

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
    return view.render('admin/admin-users/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const validationSchema = schema.create({
      image: schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'], size: '2mb' }),
      email: schema.string({ trim: true }, [rules.email()]),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      phone: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      password: schema.string({ trim: true }, [rules.minLength(8), rules.alphaNum()]),

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
        address: {
          create: { ...payload.address },
        },
        Social: { create: { ...payload.social } },
      },
    })

    if (payload.image) {
      await payload.image.moveToDisk('./admin_users/')
      const imageName = payload.image?.fileName
      const createdImage = await prisma.image.create({
        data: { url: '/uploads/admin_users/' + imageName, url_sm: '' },
      })

      await prisma.adminUser.update({
        where: { id: user.id },
        data: { avatar: { connect: { id: createdImage.id } } },
      })
    }

    session.flash('message', 'User Created Successfully')
    return response.redirect().toRoute('admin_users.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
