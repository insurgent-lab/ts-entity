import {Entity} from '../src/Entity';
import {Type} from '../src/support/Type';
import {Default} from "../src/support/Default";

class User extends Entity {
    public name: string = null;
    public email: string = null;
    public daysAvailable: string[] = [];
}

class Address extends Entity {
    public street: string = null;
    public city: string = null;
    public zip: string = null;
    public country: string = null;
}

class Post extends Entity {
    public title: string = null;
    public content: string = null;
}

class UserWithAddress extends User {
    public address: Address = null;
}

class UserWithAnnotatedAddress extends User {
    @Type(Address)
    public address: Address = null;
}

class UserWithAnnotatedPosts extends User {
    @Type(Post)
    public posts?: Post[] = null;
}

class UserWithAnnotatedObject extends User {
    @Type(Object)
    public address: {[key: string]: string} = null;
}

class UserWithDefaultValue extends User {
    @Default(() => 'hi')
    public value: string = null;
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

        expect(user.address).toBeNull();
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
        expect(user.address.street).toEqual('20-22 Wenlock Road');
        expect(user.address.city).toEqual('London');
        expect(user.address.zip).toEqual('N1 7GU');
        expect(user.address.country).toEqual('United Kingdom');
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
        expect(user.posts[0]).toBeDefined();
        expect(user.posts[0].title).toEqual('About');
        expect(user.posts[0].content).toEqual('Lorem ipsum dolor sit amet');
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

    it('should preserve null values for annotated attributes', function () {
        const user = new UserWithAnnotatedAddress();

        user.fromJson({
            name: 'Insurgent Lab',
            email: 'hello@insurgent.io',
            daysAvailable: ['Monday', 'Wednesday', 'Friday'],
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

    it('should assign a default value to properties with a null value', function () {
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
