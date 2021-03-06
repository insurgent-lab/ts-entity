import { defaultMetadataStorage } from './storage'
import { TypeMetadata } from './metadata/TypeMetadata'

export function Type (type: new() => any) {
  return function (target: any, key: string) {
    const metadata = new TypeMetadata(target.constructor, key, key, type)
    defaultMetadataStorage.addTypeMetadata(metadata)
  }
}
