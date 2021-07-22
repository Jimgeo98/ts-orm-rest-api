import { Cascade, Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'
import { BaseModel } from './BaseModel'
import { Book } from './Book'

@Entity()
export class Author extends BaseModel {
  @Property()
  @Unique()
  name!: string

  @Property({ nullable: true })
  age: number

  @OneToMany({
    entity: () => Book,
    mappedBy: 'author',
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  books = new Collection<Book>(this)
}
