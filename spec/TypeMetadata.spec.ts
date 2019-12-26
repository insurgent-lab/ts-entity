import { Entity } from '../src/Entity';
import { Type } from '../src/support/Type';
import { defaultMetadataStorage } from '../src/support/storage';

class Address extends Entity {
    public street: string;
    public city: string;
    public zip: string;
    public country: string;
}

class UserWithRegularNestedEntity extends Entity {
    @Type(Address)
    public address: Address;
}

describe('TypeMetadata', () => {
    it('returns type as is when an entity constructor is given', () => {
        const metadata = defaultMetadataStorage.findTypeMetadata(
            UserWithRegularNestedEntity,
            'address'
        );

        expect(metadata?.type).toBe(Address);
    });
});
