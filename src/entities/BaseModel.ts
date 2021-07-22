import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { nanoid } from 'nanoid'

@Entity()
export class BaseModel {
  @PrimaryKey()
  id: string = nanoid()

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
