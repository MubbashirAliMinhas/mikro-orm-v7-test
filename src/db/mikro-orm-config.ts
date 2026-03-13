import { Migrator } from "@mikro-orm/migrations";
import { PostgreSqlDriver, TextType, Type, UnderscoreNamingStrategy } from "@mikro-orm/postgresql";
import 'dotenv/config'
import { ExtendedEntityRepository } from "./extended-entity-repository";
import { defineConfig } from "@mikro-orm/core";
import { SeedManager } from "@mikro-orm/seeder";

const mikroOrmConfig = defineConfig({
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    tableName: 'migrations',
    path: './src/db/migrations',
  },
  seeder: {
    path: './src/db/seeders',
  },
  driver: PostgreSqlDriver,
  namingStrategy: UnderscoreNamingStrategy,
  clientUrl: process.env.DATABASE_URL!,
  extensions: [Migrator, SeedManager],
  entityRepository: ExtendedEntityRepository,
  forceUtcTimezone: true,
  discovery: {
    getMappedType(type, platform) {
      if (type == 'string') {
        return Type.getType(TextType)
      }
      return platform.getDefaultMappedType(type)
    }
  },
  ignoreUndefinedInQuery: true,
  assign: {
    ignoreUndefined: true
  },
  debug: process.env.DEBUG_ORM == 'true',
})

export default mikroOrmConfig