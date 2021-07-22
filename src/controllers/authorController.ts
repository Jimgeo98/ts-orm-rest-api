import { Context } from 'koa'
import { Author } from '../entities/Author'
import { wrap } from '@mikro-orm/core'
import { DI } from '../server'
import { validAuthor } from '../validation/valid'

// Get all Author Controller
export const getAllAuthors = async (ctx: Context): Promise<object> => {
  try {
    const authors = await DI.orm.em.find(Author, {}, ['books', 'books.shops'])

    ctx.status = 200
    return (ctx.body = {
      authors: authors,
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

// Get an Author By Id Controller
export const getAuthorById = async (ctx: Context): Promise<object> => {
  try {
    const author = await DI.orm.em.findOneOrFail(Author, ctx.params.id, ['books'])

    ctx.status = 200
    return (ctx.body = {
      author: author,
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

// Create Author Controller
export const createAuthor = async (ctx: Context): Promise<object> => {
  try {
    //console.log('ctx body', ctx.request.body)
    //console.log(DI.em)
    // Validation
    const { error } = validAuthor.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }

    const author = DI.orm.em.create(Author, ctx.request.body) // ctx.body = { fullName: 'Test', email: test@tes.com ... }
    // DI.orm.em.persist(created)
    // await DI.orm.em.flush()
    await DI.orm.em.persistAndFlush(author)
    ctx.status = 200
    return (ctx.body = {
      author: author,
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

// Edit Author By Id Controller
export const editAuthorById = async (ctx: Context): Promise<object> => {
  try {
    const author = await DI.orm.em.findOneOrFail(Author, ctx.params.id)

    // Validation
    const { error } = validAuthor.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }

    wrap(author).assign(ctx.request.body)

    await DI.orm.em.persist(author).flush()

    ctx.status = 200
    return (ctx.body = {
      message: `Author with id ${ctx.params.id} updated successfully`,
      author: author,
      status: ctx.status,
      method: ctx.request.method,
    })
  } catch (error) {
    console.log(error.message)
    return (ctx.body = {
      Error: error,
      status: ctx.status,
    })
    // return ctx.throw(400, { message: e.message })
  }
}

// Delete an Author By Id
export const deleteAuthor = async (ctx: Context): Promise<object> => {
  try {
    //console.log(ctx.request)
    const author = await DI.orm.em.findOneOrFail(Author, ctx.params.id)

    await DI.orm.em.remove(author).flush()

    ctx.status = 200
    return (ctx.body = {
      message: `Author with id ${ctx.params.id} deleted successfully`,
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
