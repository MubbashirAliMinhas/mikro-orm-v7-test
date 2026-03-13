import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, UserStatus } from 'src/entities/user.entity';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const userRepositiry = em.getRepository(User)

    userRepositiry.create({
      fullName: 'A',
      email: 'a@email.com',
      password: '123',
      status: UserStatus.TypeC,
    })
  }

}
