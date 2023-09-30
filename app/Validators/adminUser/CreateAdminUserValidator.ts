import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdminUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    image: schema.file.optional({
      extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      size: '2mb',
    }),
    user: schema.object().members({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'admin_users', column: 'email' }),
      ]),
      firstName: schema.string({ trim: true }),
      lastName: schema.string({ trim: true }),
      phone: schema.string.optional({ trim: true }, [rules.minLength(8)]),
      password: schema.string({ trim: true }, [rules.minLength(8), rules.alphaNum()]),
      isActive: schema.boolean.optional(),
    }),
    role: schema.object().members({
      id: schema.string.optional(),
    }),
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

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
