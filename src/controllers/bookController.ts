import { Context } from 'vm'
import { Book } from '../entities/Book'
import { wrap } from '@mikro-orm/core'
import { DI } from '../server'
import { validBook } from '../validation/valid'

// Get all Books Controller
export const getAllBooks = async (ctx: Context): Promise<object> => {
  try {
    const books = await DI.orm.em.find(Book, {}, ['author', 'shops'])

    ctx.status = 200
    return (ctx.body = {
      books: books,
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

// Get a Book by Id
export const getBookById = async (ctx: Context): Promise<object> => {
  try {
    const book = await DI.orm.em.findOneOrFail(Book, ctx.params.id, ['bookAuthor'])
    //console.log('author', book.bookAuthor)

    ctx.status = 200
    return (ctx.body = {
      book: book,
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

// Create Book Controller
export const createBook = async (ctx: Context): Promise<object> => {
  try {
    //console.log('ctx body', ctx.request.body)
    //console.log(DI.em)
    // Validation
    const { error } = validBook.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }

    const book = DI.orm.em.create(Book, ctx.request.body) // ctx.body = { bookName: 'Lola Test', pages: test@tes.com ... }
    // DI.orm.em.persist(book)
    // await DI.orm.em.flush()
    await DI.orm.em.persistAndFlush(book)

    ctx.status = 200
    return (ctx.body = {
      book: book,
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

// Edit Book By Id Controller
export const editBookById = async (ctx: Context): Promise<object> => {
  try {
    const book = await DI.orm.em.findOneOrFail(Book, ctx.params.id)

    // Validation
    const { error } = validBook.validate(ctx.request.body)
    if (error) {
      ctx.status = 400
      return (ctx.body = {
        error: error.details[0].message,
        status: ctx.status,
      })
    }

    wrap(book).assign(ctx.request.body)

    await DI.orm.em.persist(book).flush()

    ctx.status = 200
    return (ctx.body = {
      message: `Book with id ${ctx.params.id} updated successfully`,
      book: book,
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

// Delete Book By Id Controller
export const deleteBook = async (ctx: Context): Promise<object> => {
  try {
    // console.log(ctx.request)
    const book = await DI.orm.em.findOneOrFail(Book, ctx.params.id)

    await DI.orm.em.remove(book).flush()

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
