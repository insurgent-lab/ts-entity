export class TypeMetadata <T extends any> {
  public target: Function
  public propertyName: keyof T
  public sourcePropertyName: string
  private _type: new() => any

  public get type (): new() => any {
    return this._type
  }
}
