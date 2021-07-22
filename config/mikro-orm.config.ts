import { Options } from '@mikro-orm/core'
import { Author } from '../src/entities/Author'
import { Book } from '../src/entities/Book'
import { Shop } from '../src/entities/Shop'

const config: Options = {
  dbName: "libra",
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  entities: [Author, Book, Shop],
  debug: true,
};

export default config
