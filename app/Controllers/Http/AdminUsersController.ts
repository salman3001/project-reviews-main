import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Drive from '@ioc:Adonis/Core/Drive'
import AdminUser from 'App/Models/AdminUser'
import Role from 'App/Models/Role'
import Country from 'App/Models/Country'
import Image from 'App/Models/Image'
import AdminUserValidator from 'App/Validators/adminUser/AdminUserValidator'
import AdminUserUpdateValidator from 'App/Validators/adminUser/AdminUserUpdateValidator'
import Address from 'App/Models/Address'
import Social from 'App/Models/Social'

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

    await query.preload('avatar').preload('role')
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
    const payload = await request.validate(AdminUserValidator)

    const user = await AdminUser.create({ ...payload.user })

    if (payload.address) {
      user.related('address').create({
        ...payload.address,
      })
    }

    if (payload.social) {
      user.related('social').create({
        ...payload.social,
      })
    }

    if (payload.role) {
      const role = await Role.find(payload.role.id)
      if (role) await user.related('role').associate(role)
    }

    if (payload.image) {
      await payload.image.moveToDisk('./admin_users/', {
        name: user.firstName + Date.now() + '.' + payload.image.extname,
      })
      const imageName = payload.image?.fileName
      const image = await Image.create({ url: '/admin_users/' + imageName })
      await user.related('avatar').save(image)
    }

    session.flash('message', { type: 'success', title: 'User Created Successfully' })
    return response.redirect().toRoute('admin_users.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view, params }: HttpContextContract) {
    const user = await AdminUser.find(+params.id)
    await user?.load((loader) => {
      loader.load('address').load('avatar').load('social')
    })
    const cities = []
    const states = []
    const countries = []
    const roles = await Role.all()

    return view.render('admin/admin-users/edit', { user, cities, states, countries, roles })
  }

  public async update({ request, response, session, params }: HttpContextContract) {
    const id = Number(params.id)
    const payload = await request.validate(AdminUserUpdateValidator)
    let user = await AdminUser.query().where('id', id).preload('address').first()
    console.log(payload)

    if (user) {
      user.merge({ ...payload.user })
      if (payload.address) {
        if (user.address) {
          user.address.merge(payload.address)
        } else {
          const address = await Address.create(payload.address)
          user.related('address').save(address)
        }
      }
      if (payload.social) {
        await user.load('social')
        if (user.social) {
          user.social.merge({ ...payload.social })
        } else {
          const social = await Social.create(payload.social)
          user.related('social').save(social)
        }
      }
      if (payload.role?.id) {
        user.roleId = +payload.role.id
      }

      if (payload.image) {
        console.log('ran')

        await payload.image.moveToDisk('./admin_users/', {
          name: user.firstName + Date.now() + '.' + payload.image.extname,
        })
        const imageName = payload.image?.fileName

        await user.load('avatar')
        if (user.avatar) {
          await Drive.delete(user.avatar.url)
          user.avatar.url = '/admin_users/' + imageName
        } else {
          user.related('avatar').create({ url: '/admin_users/' + imageName })
        }
      }
    }

    await user?.save()
    await user?.address?.save()
    await user?.social?.save()
    await user?.avatar?.save()

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
