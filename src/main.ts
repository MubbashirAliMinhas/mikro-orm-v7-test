import { MikroORM } from "@mikro-orm/postgresql"
import mikroOrmConfig from './db/mikro-orm-config'
import { User } from './entities/user.entity'

async function run() {
  const orm = await MikroORM.init(mikroOrmConfig)

  const em = orm.em.fork()

  const userRepostory = em.getRepository(User)

  const users = await userRepostory.find({})

  console.log(users)

  await orm.close()
}

run()