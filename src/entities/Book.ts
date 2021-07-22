import { Collection, Entity, ManyToMany, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { Author } from './Author'
import { BaseModel } from './BaseModel'
import { Shop } from './Shop'

@Entity()
export class Book extends BaseModel {
  @Property()
  @Unique()
  title!: string

  @Property()
  pages!: number

  @Property({ nullable: true })
  year: number

  @Property({ nullable: true })
  rating: number

  @ManyToOne(() => Author)
  author!: Author

  @ManyToMany(() => Shop, 'books', { owner: true })
  shops = new Collection<Shop>(this)
}
