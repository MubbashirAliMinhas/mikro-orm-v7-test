import { defineEntity, EventArgs, Opt, p } from '@mikro-orm/core';
import { UserRepostory } from '../repositories/user.repository';
import { softDelete, SoftDelete } from 'src/db/soft-delete.decorator';
import * as bcrypt from 'bcryptjs'

export const UserStatus = {
  TypeA: 'type_a',
  TypeB: 'type_b',
  TypeC: 'type_c',
} as const

export type UserStatus =
  typeof UserStatus[keyof typeof UserStatus]

export const UserSchema = defineEntity({
  name: 'User',
  properties: {
    id: p.integer().primary(),
    fullName: p.string(),
    email: p.string(),
    password: p.string(),
    bio: p.text().default(''),
    status: p.string().$type<UserStatus>(),
    createdAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    deletedAt: p
      .datetime()
      .nullable()
      .hidden()
      .$type<Date & Opt>()
  },
  repository: () => UserRepostory,
  filters: {
    softDelete,
  }
});

export class User extends UserSchema.class {
  async comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}

async function hashPassword(args: EventArgs<User>) {
  const password = args.changeSet?.payload.password;

  if (password) {
    args.entity.password = await bcrypt.hash(password as string, 12);
  }
}

UserSchema.addHook('beforeCreate', hashPassword)
UserSchema.addHook('beforeUpdate', hashPassword)

UserSchema.setClass(User)