// from https://stackoverflow.com/a/52473108/5567941
// -------------------------------------------------
type IfEquals<X, Y, A, B> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B
type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T]
export type WritableKeys<T> = Pick<T, WritableKeysOf<T>>
// -------------------------------------------------

export type Properties<T> = Omit<T, 'fromJson'|'toJson'>
