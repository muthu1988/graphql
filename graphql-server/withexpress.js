const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

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
const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');