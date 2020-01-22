export class EntityBuilder {
  /**
     * Build an entity object from source data.
     */
  public static buildOne<T extends any, S extends Omit<T, 'fromJson'|'toJson'>> (BuildClass: new () => T, sourceData: S): Required<T | S> {
    this.checkClassValidity(BuildClass)

    const entity: any = new BuildClass()

    // we ensure that `fromJson` is available as this
    // could simply be annotated with `@Type(Object)`
    if (typeof entity.fromJson === 'function') {
      entity.fromJson(sourceData)
      return entity
    } else {
      return sourceData as Required<T & S>
    }
  }

  /**
     * Build multiple entities from an array of source data.
     */
  public static buildMany<T extends any, S extends Omit<T, 'fromJson'|'toJson'>> (BuildClass: new () => T, sourceData: S[]): Array<Required<T | S>> {
    this.checkClassValidity(BuildClass)

    return sourceData.map(entityData => this.buildOne<T, S>(BuildClass, entityData))
  }

  /**
     * Check if a valid class was passed through.
     */
  private static checkClassValidity (BuildClass: any) {
    if (typeof BuildClass !== 'function') {
      throw new Error('Class could not be found')
    }
  }
}
