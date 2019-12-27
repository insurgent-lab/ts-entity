import {Entity,Properties} from '../src/Entity';
import {Type} from '../src/support/Type';
import {Default} from "../src/support/Default";

class User extends Entity {
    public name: string;
    public email: string;
    public daysAvailable: string[];
}

class Address extends Entity {
    public street: string;
    public city: string;
    public zip: string;
    public country: string;
}

class Post extends Entity {
    public title: string;
    public content: string;
}

class UserWithAddress extends User {
    public address: Properties<Address>;
}

class UserWithNumbers extends User {
  public numbers: Array<number>;
}

class UserWithAddresses extends User {
  public addresses: Properties<Address>[];
}

class UserWithAnnotatedAddress extends User {
    @Type(Address)
    public address: Properties<Address> | null;
}

class UserWithAnnotatedPosts extends User {
    @Type(Post)
    public posts?: Properties<Post>[];
}

class UserWithAnnotatedObject extends User {
    @Type(Object)
    public address: {[key: string]: string};
}

class UserWithAnnotatedObjectArray extends User {
    @Type(Object)
    public addresses: {[key: string]: string}[];
}

class UserWithDefaultValue extends User {
    @Default(() => 'hi')
    public value?: string | null;
}

describe('Entity', () => {
    it('can decode a json payload into an entity', () => {
        const user = new User;

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday']
        });
        

        expect(user.name).toEqual('Insurgent Lab');
        expect(user.email).toEqual('hello@insurgent.io');
        expect(user.daysAvailable).toEqual(['Monday', 'Wednesday', 'Friday']);
    });

    it('does not decode a nested object', () => {
        const user = new UserWithAddress;

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            address: {
                street: '20-22 Wenlock Road',
                city: 'London',
                zip: 'N1 7GU',
                country: 'United Kingdom'
            }
        });

        expect(user.address).toBeUndefined();
    });

    it('does not decode a nested array of objects', () => {
      const user = new UserWithAddresses;

      user.fromJson({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday'],
        addresses: [{
            street: '20-22 Wenlock Road',
            city: 'London',
            zip: 'N1 7GU',
            country: 'United Kingdom'
        }]
      });

      expect(user.addresses).toBeUndefined();
  });

  it('does decode a nested array of primitives', () => {
    const user = new UserWithNumbers;

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday'],
      numbers: [1, 2, 3]
    });

    expect(user.numbers).toBeDefined();
    expect(user.numbers).toEqual([1, 2, 3])
});

    it('decodes an annotated nested object', () => {
        const user = new UserWithAnnotatedAddress();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            address: {
                street: '20-22 Wenlock Road',
                city: 'London',
                zip: 'N1 7GU',
                country: 'United Kingdom'
            }
        });

        expect(user.address).toBeDefined();
        expect(user.address?.street).toEqual('20-22 Wenlock Road');
        expect(user.address?.city).toEqual('London');
        expect(user.address?.zip).toEqual('N1 7GU');
        expect(user.address?.country).toEqual('United Kingdom');
    });

    it('decodes an annotated optional nested array object', () => {
        const user = new UserWithAnnotatedPosts();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            posts: [{
                title: 'About',
                content: 'Lorem ipsum dolor sit amet'
            }]
        });

        expect(user.posts).toBeDefined();
        expect(user.posts?.[0]).toBeDefined();
        expect(user.posts?.[0].title).toEqual('About');
        expect(user.posts?.[0].content).toEqual('Lorem ipsum dolor sit amet');
    });

    it('decodes an annotated optional nested array object to empty array', () => {
        const user = new UserWithAnnotatedPosts();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            posts: []
        });

        expect(user.posts).toBeDefined();
        expect(user.posts).toEqual([]);
    });

    it('can decode an annotated Object, without being an entity', () => {
        const user = new UserWithAnnotatedObject();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            address: {
                street: '20-22 Wenlock Road',
                city: 'London',
                zip: 'N1 7GU',
                country: 'United Kingdom'
            }
        });

        expect(user.address).toBeDefined();
        expect(user.address['street']).toEqual('20-22 Wenlock Road');
        expect(user.address['city']).toEqual('London');
        expect(user.address['zip']).toEqual('N1 7GU');
        expect(user.address['country']).toEqual('United Kingdom');
    });

    it('can decode an annotated array of Objects, without being an entity', () => {
      const user = new UserWithAnnotatedObjectArray();

      user.fromJson({
          name: 'Insurgent Lab',
          email: 'hello@insurgent.io',
          daysAvailable: ['Monday', 'Wednesday', 'Friday'],
          addresses: [{
              street: '20-22 Wenlock Road',
              city: 'London',
              zip: 'N1 7GU',
              country: 'United Kingdom'
          }, {
            street: '221B Baker Street',
            city: 'London',
            zip: 'NW1 6XE',
            country: 'United Kingdom'
        }]
      });

      expect(user.addresses).toBeDefined();

      expect(user.addresses[0]['street']).toEqual('20-22 Wenlock Road');
      expect(user.addresses[0]['city']).toEqual('London');
      expect(user.addresses[0]['zip']).toEqual('N1 7GU');
      expect(user.addresses[0]['country']).toEqual('United Kingdom');

      expect(user.addresses[1]['street']).toEqual('221B Baker Street');
      expect(user.addresses[1]['city']).toEqual('London');
      expect(user.addresses[1]['zip']).toEqual('NW1 6XE');
      expect(user.addresses[1]['country']).toEqual('United Kingdom');
  });

    it('can encode itself to a plain object', () => {
      const user = new User;

      user.fromJson({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday']
      });

      expect(user.toJson())
        .toEqual({
          name: 'Insurgent Lab',
          email: 'hello@insurgent.io',
          daysAvailable: ['Monday', 'Wednesday', 'Friday']
        });
    });

  it('can encode itself to a plain object while maintaining camelCase', () => {
    const user = new User;

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday']
    });

    expect(user.toJson(false))
      .toEqual({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday']
      });
  });

  it('can encode itself to a plain object and convert to a json string', () => {
    const user = new User;

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday']
    });

    expect(user.toJson(true))
      .toEqual(JSON.stringify({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday']
      }));
  });

  it('can encode itself to a plain object and convert to a json string without converting to snake case', () => {
    const user = new User;

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday']
    });

    expect(user.toJson(true))
      .toEqual(JSON.stringify({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday'],
      }))
  });

  it('can encode itself and its children to a plain object', () => {
    const user = new UserWithAnnotatedAddress();

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday'],
      address: {
        street: '20-22 Wenlock Road',
        city: 'London',
        zip: 'N1 7GU',
        country: 'United Kingdom'
      }
    });

    expect(user.toJson())
      .toEqual({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday'],
        address: {
          street: '20-22 Wenlock Road',
          city: 'London',
          zip: 'N1 7GU',
          country: 'United Kingdom'
        }
      });
  });

  it('can encode itself and its array children to a plain object', () => {
    const user = new UserWithAnnotatedPosts();

    user.fromJson({
      name: 'Insurgent Lab',
      email: 'hello@insurgent.io',
      daysAvailable: ['Monday', 'Wednesday', 'Friday'],
      posts: [{
        title: 'About',
        content: 'Lorem ipsum dolor sit amet'
      }]
    });

    expect(user.toJson())
      .toEqual({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday'],
        posts: [{
          title: 'About',
          content: 'Lorem ipsum dolor sit amet'
        }]
      });
  });

    it('should not preserve null values for annotated attributes', function () {
        const user = new UserWithAnnotatedAddress();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            // @ts-ignore (test case when strictNullChecks is disabled)
            address: null,
        });

        expect(user.toJson())
          .toEqual({
              name: 'Insurgent Lab',
              email: 'hello@insurgent.io',
              daysAvailable: ['Monday', 'Wednesday', 'Friday'],
              address: null,
          });
    });

    it('should preserve null values for non-annotated attributes', function () {
        const user = new UserWithAnnotatedAddress();

        user.fromJson({
            name: 'Insurgent Lab',
            // @ts-ignore (test case when strictNullChecks is disabled)
            email: null,
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
            address: {
                street: '20-22 Wenlock Road',
                city: 'London',
                zip: 'N1 7GU',
                country: 'United Kingdom'
            }
        });

        expect(user.toJson())
          // @ts-ignore (test case when strictNullChecks is disabled)
          .toEqual({
              name: 'Insurgent Lab',
              email: null,
              daysAvailable: ['Monday', 'Wednesday', 'Friday'],
              address: {
                  street: '20-22 Wenlock Road',
                  city: 'London',
                  zip: 'N1 7GU',
                  country: 'United Kingdom'
              }
          });
    });

    it('should assign a default value to null properties', function () {
      const user = new UserWithDefaultValue;
      user.fromJson({
        name: 'Insurgent Lab',
        email: 'hello@insurgent.io',
        daysAvailable: ['Monday', 'Wednesday', 'Friday'],
        value: null
      });
      
      expect(user.value).toEqual('hi');
  });
});
