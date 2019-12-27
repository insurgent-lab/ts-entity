# Typescript Entity

## :warning: **This library is solely designed for Node v13.2 and above** :warning:

This package provides a convenient way to convert JSON retrieved from your API or similar into a TypeScript entity class instance, with proper type inference / checking.

Each class is self-encoding, which means that it knows how to encode itself. As such, each class should extend the `Entity` class in order to work, as it deals with the heavy lifting. Alternatively, your class may implement its own `.fromJson()` method.


## Installation
Install the package from npm under the name `@insurgent/entity`:
```bash
yarn add @insurgent/entity
```


## Typescript / Node configuration
In order to use the power of this library, you must use *at least*:
- NodeJS: 13.2
- Typescript: 3.7


## Usage
The basic usage is very straightforward: make your class extend `Entity`, and use the `EntityBuilder` to hydrate instances of it:

```typescript
import { Entity, EntityBuilder } from '@insurgent/entity'

class User extends Entity {
  public name: string
  public email: string
}

fetch('https://api.service.com/v1/users/1')
  .then(response => response.Body.json())
  .then(jsonData => EntityBuilder.buildOne(User, jsonData))
```

You can also build an array of entities:

```typescript
fetch('https://api.service.com/v1/users')
  .then(response => response.Body.json())
  .then(jsonData => EntityBuilder.buildMany(User, jsonData))
```


### Annotating nested entities

If your endpoint returns a nested object, such as:
```json
{
  "name": "Insurgent Lab",
  "email": "hello@insurgent.io",
  "address": {
    "street": "221B Baker Street",
    "city": "London",
    "zip": "NW1 6XE",
    "country": "United Kingdom"
  }
}
```
The JSON decoding process will _ignore_ the nested object (`address`). This also applies to arrays of objects (but **not** to arrays of primitives, which are automatically decoded).

There are two ways to solve this. The first one is to simply override the `.fromJson()` method:
```typescript
import { Entity, Properties, EntityBuilder } from '@insurgent/entity'

class User extends Entity {
  public name: string
  public email: string
  public address: Properties<Address>
  
  public fromJson(jsonData: any): User {
    super.fromJson(jsonData)
  
    if (jsonData.hasOwnProperty('address')) {
      this.address = EntityBuilder.buildOne(Address, jsonData['address'])
    }

    return this
  }
}
```

However, this is quite verbose. Instead, a `@Type` decorator is provided for nested decoding:

```typescript
class User extends Entity {
  public name: string
  public email: string
  @Type(Address)
  public address: Properties<Address>
}
```

The library also provides a `Properties` type that returns the properties of your entity as an interface to enable proper type checking.

#### Note about `Object` (or arrays of `Object`)
If your entity has a nested object (or array of objects) that is **not** represented by another entity, you can also use `@Type(Object)` to annotate that the object should simply be stored as is.


### Annotating default values

You can specify default values as follow:
```typescript
import { Entity, EntityBuilder } from '@insurgent/entity'

class DefaultValue extends Entity {
  @Default(() => 'hi')
  public value: string | null;
}

const jsonData = {
  value: null
}

const user = EntityBuilder.buildOne(DefaultValue, jsonData)

console.log(user.value) // "hi"
```
You must initialize annotated default values with `null` as it is currently impossible to mutate the type using a decorator ([Github issue](https://github.com/Microsoft/TypeScript/issues/4881)).


### Encoding back to JSON

Entity objects can also be encoded back to a plain JavaScript Object, or as a JSON string. You can call `entity.toJson()` on any entity to convert it to a plain JS object.

The method accepts a boolean argument that lets you specify if the output should be as a JSON string. `entity.toJson(true)` is identical to `JSON.stringify(entity.toJson())`.


## TODO
- [x] Remove the need to initialize everything to `null`.
- [x] Add `strictNullCheck` (depending on the preceding TODO, and may be pretty hard because of the way the lib works)
- [ ] Add ESLint
- [ ] Add a cleanup function that picks only existing class properties from an object literal

## Disabled features (from fork)
These features were disabled because they were blocking the type validation (which is the whole point of Typescript).
We are now waiting for Typescript to implement proper ways for us to do that (see linked Github issues).
- Disabled **annotated aliases**, as it is currently impossible to mutate the type using a decorator ([Github issue](https://github.com/Microsoft/TypeScript/issues/4881))
- Disabled **snake_case <=> camelCase conversions**, as it is currently impossible to mutate type keys with a MappedType ([Github issue](https://github.com/Microsoft/TypeScript/issues/12754), [similar case comment](https://github.com/Microsoft/TypeScript/issues/12754#issuecomment-517435342))


## Contributing

Run the build and the tests using the following commands:

```
$ yarn build
$ yarn test
```


# Credits

This package was originaly forked from [decahedronio/entity](https://github.com/decahedronio/entity).