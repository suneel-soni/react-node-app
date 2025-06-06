import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import axios from 'axios'

// Type definitions (schema)
const typeDefs = `
   type User {
    id: ID
    name: String
    username: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    updateUserName(id: ID!, name: String!): User
  }
`;

// Resolvers define how to fetch the data
const resolvers = {
    Query: {
        users: async () => {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            return data;
        },
        user: async (_, { id }) => {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            return data;
        },

    },
    Mutation: {
        updateUserName: async (_, { id, name }) => {
            const { data: existingUser } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            const updatedUser = { ...existingUser, name };
            const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
            return data;
        },
    }
};

// Create the Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
