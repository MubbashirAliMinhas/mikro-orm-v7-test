import { EntityData, EntityRepository, FilterQuery } from "@mikro-orm/postgresql";

export class ExtendedEntityRepository<T extends object> extends EntityRepository<T> {
  async softDelete(where: FilterQuery<T>) {
    const data = { deleted_at: new Date() }
    return this.nativeUpdate(where, data as any)
  }

  async update(where: FilterQuery<T>, data: EntityData<T>) {
    return this.nativeUpdate(where, { ...data, updated_at: new Date() })
  }
}