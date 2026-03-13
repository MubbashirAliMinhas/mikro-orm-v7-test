import { FilterDef } from "@mikro-orm/core";
import { Filter } from "@mikro-orm/decorators/legacy";

export function SoftDelete(): ClassDecorator {
  return Filter({
    name: 'softDelete',
    default: true,
    cond: (args: { includeDeleted?: boolean, onlyDeleted?: boolean } = {}) => {
      if (args.includeDeleted) {
        return {}
      }

      if (args.onlyDeleted) {
        return { deleted_at: { $ne: null } }
      }

      return { deleted_at: null }
    }
  })
}

export const softDelete: FilterDef = {
  name: 'softDelete',
  default: true,
  cond: (args: { includeDeleted?: boolean, onlyDeleted?: boolean } = {}) => {
    if (args.includeDeleted) {
      return {}
    }

    if (args.onlyDeleted) {
      return { deleted_at: { $ne: null } }
    }

    return { deleted_at: null }
  }
}