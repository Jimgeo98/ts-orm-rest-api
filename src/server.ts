import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-body'
import cors from 'koa2-cors'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core'
import { router } from './routes/router'

export const app = new Koa()

export const DI = {} as {
  orm: MikroORM
  em: EntityManager
}

const init = async () => {
  DI.orm = await MikroORM.init() // CLI config will be used automatically
  DI.em = DI.orm.em
  app.use((_ctx, next) => RequestContext.createAsync(DI.orm.em, next))
  app.use(logger())
  app.use(bodyParser())
  app.use(helmet())
  app.use(cors({ origin: '*' }))
  app.use(router.routes()).use(router.allowedMethods())
  app.use((ctx, _next) => {
    ctx.status = 404
    ctx.body = { message: 'No route found' }
  })
}

init() // Call Run the Init Function

app
  .listen(process.env.SERVER_PORT || 5000, () => {
    console.log('=== SETUP DATABASE AND MySQL SCHEMA ===')
    console.log(`🚀 Server listening here -> ${process.env.URL}`)
  })
  .on('error', err => {
    console.error(err)
  })
