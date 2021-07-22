import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { Book } from './Book'

@Entity()
export class Shop extends BaseModel {
  @Property()
  name!: string

  @Property()
  copies!: number

  @ManyToMany(() => Book, book => book.shops)
  books = new Collection<Book>(this)
}
