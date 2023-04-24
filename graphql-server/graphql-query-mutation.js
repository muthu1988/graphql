const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
    type Person {
        id: Int
        name: String
        age: Int,
        gender: String
    }
    type Query {
        getPerson(name: String): [Person]
    }
    type Mutation {
        createPerson(name: String, age: Int, gender: String): Person
    }
`);

let data = [
    { id: 1, name: "tom", age: 10, gender: "M" },
    { id: 2, name: "jerry", age: 20, gender: "M" },
    { id: 3, name: "micky", age: 30, gender: "M" },
    { id: 4, name: "mini", age: 40, gender: "F" },
]
const rootValue = {
    getPerson: ({ name }) => {
        let persons = data;
        if (name) persons = persons.filter((d) => d.name === name)
        return persons;
    },
    createPerson: ({ name, age, gender }) => {
        const person = {
            id: data[data.length - 1].id + 1,
            name,
            age,
            gender
        }
        data.push(person);
        return person;
    }
};
const app = express();
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');



// Test Queries:

// query GetPerson($name: String) {
//     getPerson(name: $name) {
//         id
//         name
//         age
//     }
// }

// mutation CreatePerson($name: String, $age: Int, $gender: String) {
//     createPerson(name: $name, age: $age, gender: $gender) {
//       id
//       name
//       age
//       gender
//     }
//   }