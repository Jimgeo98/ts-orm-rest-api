import { Context } from 'koa'

export const home = (ctx: Context): object => {
  return (ctx.body = {
    message:
      'Welcome to Node / MikroORM / Koa.js / TypeScript / MySQL example, try CRUD on /authors, /books, /shops endpoints and make relationships!',
  })
}
