const { graphql, buildSchema } = require('graphql');
const schema = buildSchema(`
    type Person {
        id: Int
        name: String
        age: Int,
        gender: String,
        address: Address
    }
    type Address {
        city: String,
        state: String,
        country: String
    }
    type Query {
        person: Person
    }
`);
const rootValue = {
    person: () => {
        return {
            name: "muthu", age: 30, gender: "M",
            address: { city: 'CH', state: 'TN', country: 'IN' }
        }
    }
};
const source = `{ 
    person {
        name,
        age,
        address {
            city,
            state,
            country
        }
    }
}`;
graphql({ schema, source, rootValue }).then((response) => {
    console.log()
    console.log(JSON.stringify(response));
    console.log()
});