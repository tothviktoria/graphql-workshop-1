import { GraphQLServer, gql } from "graphql-yoga";
import db from "./db";

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
  }

  type User {
    name: String!
    email: String!
    age: Int
    id: ID!
  }

  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean
    author: User!
  }
`;

const resolvers = {
  Query: {
    users() {
      return db.users;
    },

    posts() {
      return db.posts;
    }
  },

  Post: {
    author(parent) {
      return db.users.find(user => user.id === parent.author);
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up!");
});
