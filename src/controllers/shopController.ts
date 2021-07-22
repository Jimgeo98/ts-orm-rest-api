import { Context } from 'vm'
import { Shop } from '../entities/Shop'
import { wrap } from '@mikro-orm/core'
import { DI } from '../server'
import { Book } from '../entities/Book'
import { validShop } from '../validation/valid'

// Get all Shops Controller
export const getAllShops = async (ctx: Context): Promise<object> => {
  try {
    const shops = await DI.orm.em.find(Shop, {}, ['books'])

    ctx.status = 200
    return (ctx.body = {
      shops: shops,
      response: ctx.response.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
  }
}

// Get a Shop by Id
export const getShopById = async (ctx: Context): Promise<object> => {
  try {
    const shop = await DI.orm.em.findOneOrFail(Shop, ctx.params.id, ['author, book'])

    ctx.status = 200
    return (ctx.body = {
      shop: shop,
      status: ctx.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
  }
}

// Create Shop Controller
export const createShop = async (ctx: Context): Promise<object> => {
  try {
    // Validation
    const { error } = validShop.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }
    const shop = DI.orm.em.create(Shop, ctx.request.body)
    const book = await DI.orm.em.findOneOrFail(Book, ctx.request.body.books)

    // Many to Many
    book.shops.add(shop)
    await DI.orm.em.persistAndFlush(shop)

    ctx.status = 200
    return (ctx.body = {
      shop: shop,
      status: ctx.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
  }
}

// Edit Shop By Id Controller
export const editShopById = async (ctx: Context): Promise<object> => {
  try {
    const shop = await DI.orm.em.findOneOrFail(Shop, ctx.params.id)

    // Validation
    const { error } = validShop.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }

    wrap(shop).assign(ctx.request.body)

    await DI.orm.em.persist(shop).flush()

    ctx.status = 200
    return (ctx.body = {
      message: `Shop with id ${ctx.params.id} updated successfully`,
      shop: shop,
      status: ctx.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
  }
}

// Delete Shop By Id Controller
export const deleteShop = async (ctx: Context): Promise<object> => {
  try {
    const shop = await DI.orm.em.findOneOrFail(Shop, ctx.params.id)

    await DI.orm.em.remove(shop).flush()

    ctx.status = 200
    return (ctx.body = {
      message: `entity with id ${ctx.params.id} deleted successfully`,
      status: ctx.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
  }
}
