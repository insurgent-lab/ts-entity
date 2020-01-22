import { Entity } from '../src/Entity'
import { EntityBuilder } from '../src/EntityBuilder'
import { Properties } from '../src/utils/types'
import { Type } from '../src/support/Type'
import { Getter } from '../src/support/Getter'
import { Default } from '../src/support/Default'

class User extends Entity {
    public name: string
    public email: string
    public daysAvailable: string[]
}

class Address extends Entity {
    public street: string
    public city: string
    public zip: string
    public country: string
}

class UserWithAddress extends User {
    public address: Properties<Address>
}

class UserWithAnnotatedAddress extends User {
    @Type(Address)
    public address: Properties<Address>
}

class UserWithOptionalAddress extends User {
  @Type(Address)
  public address?: Properties<Address>
}

class UserWithDefaultValue extends User {
  @Default(() => 'hi')
  public value: string | null
}

interface IUserWithGetter {
  firstName: string
  lastName: string
  readonly fullName: string
}

class UserWithGetter extends Entity implements IUserWithGetter {
  public firstName: string
  public lastName: string

  @Getter()
  get fullName (): string {
    return `${this.firstName} ${this.lastName}`
  }
}

describe('Entity', () => {
  it('can decode a json payload into an entity', () => {
    const jsonData = {
      name: 'Insurgent Lab',
      lol: 'test',
      email: 'hello@insurgent.io',
      daysAvailable: [ 'Monday', 'Wednesday', 'Friday' ],
    }

    const user = EntityBuilder.buildOne(User, jsonData)

    expect(user.name).toEqual('Insurgent Lab')
    expect(user.email).toEqual('hello@insurgent.io')
    expect(user.daysAvailable).toEqual([ 'Monday', 'Wednesday', 'Friday' ])
  })

  it('does not decode a nested object', () => {
    const jsonData = {
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: [ 'Monday', 'Wednesday', 'Friday' ],
      address: {
        street: '20-22 Wenlock Road',
        city: 'London',
        zip: 'N1 7GU',
        country: 'United Kingdom',
      },
    }

    const user = EntityBuilder.buildOne(UserWithAddress, jsonData)

    expect(user.address).toBeUndefined()
  })

  it('decodes an annotated nested object', () => {
    const jsonData = {
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: [ 'Monday', 'Wednesday', 'Friday' ],
      address: {
        street: '20-22 Wenlock Road',
        city: 'London',
        zip: 'N1 7GU',
        country: 'United Kingdom',
      },
    }

    const user = EntityBuilder.buildOne(UserWithAnnotatedAddress, jsonData)

    expect(user.address).toBeDefined()
    expect(user.address.street).toEqual('20-22 Wenlock Road')
    expect(user.address.city).toEqual('London')
    expect(user.address.zip).toEqual('N1 7GU')
    expect(user.address.country).toEqual('United Kingdom')
  })

  // this is testing that Typescript doesn't complain about the fact
  // that user.address can be undefined because we supplied it
  it('infers optional argument has been supplied and will always be present', () => {
    const jsonData = {
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: [ 'Monday', 'Wednesday', 'Friday' ],
      address: {
        street: '20-22 Wenlock Road',
        city: 'London',
        zip: 'N1 7GU',
        country: 'United Kingdom',
      },
    }

    const user = EntityBuilder.buildOne(UserWithOptionalAddress, jsonData)

    expect(user.address.street).toEqual('20-22 Wenlock Road')
    expect(user.address.city).toEqual('London')
    expect(user.address.zip).toEqual('N1 7GU')
    expect(user.address.country).toEqual('United Kingdom')
  })

  it('should assign a default value to null properties', function () {
    const jsonData = {
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: [ 'Monday', 'Wednesday', 'Friday' ],
      value: null,
    }

    const user = EntityBuilder.buildOne(UserWithDefaultValue, jsonData)

    expect(user.value).toEqual('hi')
  })

  it('works with a class containing a getter', function () {
    const jsonData = {
      firstName: 'Sherlock',
      lastName: 'Holmes',
    }

    const user = EntityBuilder.buildOne(UserWithGetter, jsonData)

    expect(user.fullName).toEqual('Sherlock Holmes')
    expect(user.toJson()).toEqual({
      firstName: 'Sherlock',
      lastName: 'Holmes',
      fullName: 'Sherlock Holmes',
    })
  })
})
