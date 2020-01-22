import { EntityBuilder } from './EntityBuilder'
import { defaultMetadataStorage } from './support/storage'
// import { TypeMetadata } from './support/metadata/TypeMetadata';

export class Entity {
  /**
     * Parse a generic object into an entity object.
     */
  private static jsonParse<T extends any> (sourceObject: T, jsonObject: Omit<T, 'fromJson'|'toJson'>): T {
    for (const key of Object.keys(sourceObject)) {
      if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
        const metadata = defaultMetadataStorage.findTypeMetadata(sourceObject.constructor, key)
        const value: any = jsonObject[key]

        // We shouldn't copy objects to our entity, as the entity
        // should be responsible for constructing these itself.
        if (value !== null && typeof value === 'object' && !(value instanceof Array)) {
          if (metadata) {
            if (metadata.type === Object) {
              sourceObject[metadata.propertyName] = value
            } else {
              sourceObject[metadata.propertyName] = EntityBuilder.buildOne(metadata.type, value)
            }
          }

          continue
        }

        // if we have an array, we check if it contains objects,
        // in which case the entity itself should be assumed
        // responsible to construct the array of entities.
        if (value instanceof Array && value.length > 0 && typeof value[0] === 'object') {
          if (metadata) {
            if (metadata.type === Object) {
              sourceObject[metadata.propertyName] = value
            } else {
              sourceObject[metadata.propertyName] = EntityBuilder.buildMany(metadata.type, value)
            }
          }

          continue
        }

        // Since all other scenarios have been exhausted, we're dealing with a primitive of some form.
        // This can be an empty array of objects too, but since it's empty, there's no need for us
        // to build an entity. As such, we can just assign it. The same goes for all primitives.
        if (metadata) {
          sourceObject[metadata.propertyName] = value

          continue
        }

        const defaultValueCallback = defaultMetadataStorage.findCallback(sourceObject.constructor, key)
        if (defaultValueCallback && defaultValueCallback.condition(sourceObject[key])) {
          sourceObject[key] = defaultValueCallback.callback()
          continue
        }

        sourceObject[key] = value
      } else {
        const defaultValueCallback = defaultMetadataStorage.findCallback(sourceObject.constructor, key)
        if (defaultValueCallback && defaultValueCallback.condition(sourceObject[key])) {
          sourceObject[key] = defaultValueCallback.callback()
        }
      }
    }

    return sourceObject
  }

  /**
   * Convert JSON data to an Entity instance.
   */
  fromJson (jsonData: Omit<this, 'fromJson'|'toJson'>): this {
    return Entity.jsonParse(this, jsonData)
  }

  /**
   * Convert an Entity to JSON, either in object or string format.
   */
  toJson<T extends boolean>(asString?: T): T extends true ? string : Omit<this, 'fromJson'|'toJson'>
  toJson (asString: boolean = false): Omit<this, 'fromJson'|'toJson'> | string {
    const data: any = {}

    for (const key in this) {
      if (!Object.prototype.hasOwnProperty.call(this, key)) {
        continue
      }

      const value: any = this[key]

      if (value instanceof Entity) {
        data[key] = value.toJson(asString)

        continue
      }

      const metadata = defaultMetadataStorage.findTypeMetadata(this.constructor as new() => this, key)

      if (value instanceof Array && value.length > 0 && value[0] instanceof Object) {
        if (value[0] instanceof Entity) {
          data[key] = value.map((entity: Entity) => entity.toJson(asString))
        }

        if (metadata && metadata.type === Object) {
          data[key] = value
        }

        continue
      }

      // If the key has been manually annotated as an object,
      // we will simply output the object itself.
      if (value !== null && typeof value === 'object' && !(value instanceof Array)) {
        if (metadata && metadata.type === Object) {
          data[key] = value
        }

        continue
      }

      data[key] = value
    }

    // getters are not returned by the for...in loop
    // therefore we find them from metadatas storage
    const getters = defaultMetadataStorage.findGetterMetadatas(this.constructor as new() => this)

    if (getters.length > 0) {
      getters.map(getter => {
        data[getter.sourcePropertyName] = this[getter.propertyName]
      })
    }

    return asString ? JSON.stringify(data) : data
  }
}

