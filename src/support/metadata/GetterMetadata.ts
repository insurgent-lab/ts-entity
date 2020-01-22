export class GetterMetadata <T extends any> {
  constructor (public target: Function,
                public propertyName: keyof T,
                public sourcePropertyName: string) {
  }
}
