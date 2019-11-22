import { EntityBuilder } from './EntityBuilder';
import { defaultMetadataStorage } from './support/storage';
import { TypeMetadata } from './support/metadata/TypeMetadata';

export class Entity {

    /**
     * Parse a generic object into an entity object.
     */
    private static jsonParse<T extends any>(sourceObject: T, jsonObject: Omit<T, 'fromJson'|'toJson'>): T {
        for (let key in jsonObject) {
            if (jsonObject.hasOwnProperty(key)) {
                const metadata: TypeMetadata = defaultMetadataStorage.findTypeMetadata(sourceObject.constructor, key);
                const value: any = jsonObject[key];

                // We shouldn't copy objects to our entity, as the entity
                // should be responsible for constructing these itself.
                if (value !== null && typeof value === 'object' && !(value instanceof Array)) {
                    if (metadata) {
                        sourceObject[metadata.propertyName] = EntityBuilder.buildOne(metadata.type, value);
                    }

                    continue;
                }

                // if we have an array, we check if it contains objects,
                // in which case the entity itself should be assumed
                // responsible to construct the array of entities.
                if (value instanceof Array && value.length > 0 && typeof value[0] === 'object') {
                    if (metadata) {
                        sourceObject[metadata.propertyName] = EntityBuilder.buildMany(metadata.type, value);
                    }

                    continue;
                }

                // Since all other scenarios have been exhausted, we're dealing with a primitive of some form.
                // This can be an empty array of objects too, but since it's empty, there's no need for us
                // to build an entity. As such, we can just assign it. The same goes for all primitives.
                if (metadata) {
                    sourceObject[metadata.propertyName] = value;

                    continue;
                }

                if (Object.keys(sourceObject).includes(key)) {
                    sourceObject[key] = value
                }                

                const defaultValueCallback = defaultMetadataStorage.findCallback(sourceObject.constructor, key);
                if (defaultValueCallback && defaultValueCallback.condition(sourceObject[key]) ) {
                    sourceObject[key] = defaultValueCallback.callback();
                }
            }
        }

        return sourceObject;
    }

  /**
   * Convert JSON data to an Entity instance.
   */
    fromJson?(jsonData: Omit<this, 'fromJson'|'toJson'>): this {
        return Entity.jsonParse(this, jsonData);
    }

  /**
   * Convert an Entity to JSON, either in object or string format.
   */
    toJson?<T extends boolean>(asString?:  T ): T extends true ? string : Omit<this, 'fromJson'|'toJson'>
    toJson?(asString: boolean = false): Omit<this, 'fromJson'|'toJson'> | string {
        const data: any = {};

        for (let key in this) {
          if (! this.hasOwnProperty(key)) {
            continue;
          }

          const value: any = this[key];

          if (value instanceof Entity) {
              data[key] = value.toJson(asString);

              continue;
          }

          const metadata: TypeMetadata = defaultMetadataStorage.findTypeMetadata(this.constructor, key);

          if (value instanceof Array && value.length > 0 && value[0] instanceof Object) {
            if (value[0] instanceof Entity) {
              data[key] = value.map((entity: Entity) => entity.toJson(asString));
            }

            if (metadata && metadata.type === Object) {
              data[key] = value;
            }

            continue;
          }

          // If the key has been manually annotated as an object,
          // we will simply output the object itself.
          if (value !== null && typeof value === 'object' && !(value instanceof Array)) {
              if (metadata && metadata.type === Object) {
                  data[key] = value;
              }

              continue;
          }

          data[key] = value;
        }

        return asString ? JSON.stringify(data) : data;
    }
}
