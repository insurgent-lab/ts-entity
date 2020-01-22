import { defaultMetadataStorage } from './storage'
import { GetterMetadata } from './metadata/GetterMetadata'

export function Getter () {
  return function (target: any, key: string) {
    const metadata = new GetterMetadata(target.constructor, key, key)
    defaultMetadataStorage.addGetterMetadata(metadata)
  }
}
