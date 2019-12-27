export class TypeMetadata <T extends any> {
    constructor(public target: Function,
                public propertyName: keyof T,
                public sourcePropertyName: string,
                private _type: new() => any) {
    }

    public get type(): new() => any
    {
        return this._type;
    }
}
