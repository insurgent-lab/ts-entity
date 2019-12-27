import 'reflect-metadata'
import { defaultMetadataStorage } from './storage'
import { DefaultValueCallbackMetadata } from './metadata/MetadataStorage'

export function Default<T> (callback: () => T, condition: (value: T) => boolean = (value) => value === undefined || value === null): (target: Object, propertyKey: string) => void {
  return function (target: Function, propertyKey: keyof Function) {
    defaultMetadataStorage.addDefaultCallback(new DefaultValueCallbackMetadata(target.constructor as new() => any, propertyKey, callback, condition))
  }
}
