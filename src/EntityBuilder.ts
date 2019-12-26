export class EntityBuilder {
    /**
     * Build an entity object from source data.
     */
    public static buildOne<T extends any>(buildClass: T, sourceData: Omit<T, 'fromJson'|'toJson'>): T {
        this.checkClassValidity(buildClass);

        const entity: any = new buildClass();

        // we ensure that `fromJson` is available as this
        // could simply be annotated with `@Type(Object)`
        if (typeof entity.fromJson === 'function') {
          entity.fromJson(sourceData);
          return entity;
        } else {
          return sourceData as T
        }
    }

    /**
     * Build multiple entities from an array of source data.
     */
    public static buildMany<T extends any>(buildClass: T, sourceData: Omit<T, 'fromJson'|'toJson'>[]): T[] {
        this.checkClassValidity(buildClass);

        return sourceData.map(entityData => this.buildOne<T>(buildClass, entityData));
    }

    /**
     * Check if a valid class was passed through.
     */
    private static checkClassValidity(buildClass: any) {
        if (typeof buildClass !== 'function') {
            throw new Error('Class could not be found');
        }
    }
}
