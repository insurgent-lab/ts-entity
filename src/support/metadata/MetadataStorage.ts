import { TypeMetadata } from './TypeMetadata'
import { GetterMetadata } from './GetterMetadata'

export class DefaultValueCallbackMetadata <T extends any> {
  constructor (public target: new() => T,
                public propertyName: keyof T,
                public callback: () => any,
                public condition: (value: any) => boolean) {}
}

/**
 * Storage all library metadata.
 */
export class MetadataStorage {
    /**
     * All the type metadata.
     *
     * @type {Array}
     */
    private typeMetadatas: TypeMetadata<any>[] = []
    private getterMetadatas: GetterMetadata<any>[] = []
    private defaultCallbacks: DefaultValueCallbackMetadata<any>[] = []

    /**
     * Append type metadata.
     *
     * @param metadata
     */
    addTypeMetadata (metadata: TypeMetadata<any>) {
      this.typeMetadatas.push(metadata)
    }

    addGetterMetadata (metadata: GetterMetadata<any>) {
      this.getterMetadatas.push(metadata)
    }

    addDefaultCallback (callbackMetadata: DefaultValueCallbackMetadata<any>) {
      this.defaultCallbacks.push(callbackMetadata)
    }

    /**
     * Find a type metadata.
     *
     * @param target
     * @param propertyName
     * @returns {TypeMetadata}
     */
    findTypeMetadata<T extends any> (target: new() => T, propertyName: string): TypeMetadata<T> | undefined {
      const metadataFromTarget = this.typeMetadatas.find(meta =>
        meta.target === target && meta.sourcePropertyName === propertyName,
      )

      const metadataFromChildren = this.typeMetadatas.find(meta =>
        target.prototype instanceof meta.target && meta.sourcePropertyName === propertyName,
      )

      return metadataFromTarget || metadataFromChildren
    }

    findGetterMetadatas<T extends any> (target: new() => T): GetterMetadata<T>[] {
      const metadatasFromTarget = this.getterMetadatas.filter(meta => meta.target === target)

      return metadatasFromTarget
    }

    findCallback<T extends any> (target: new() => T, propertyName: string): DefaultValueCallbackMetadata<T> | undefined {
      return this.defaultCallbacks.find(cbmeta => cbmeta.target === target && cbmeta.propertyName === propertyName)
            || this.defaultCallbacks.find(cbmeta => target.prototype instanceof cbmeta.target && cbmeta.propertyName === propertyName)
    }
}
