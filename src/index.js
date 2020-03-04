import { GraphQLServer } from "graphql-yoga";
import gql from "graphql-tag";

import db from "./db";

const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
    id: ID!
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
    published: Boolean!
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

  Mutation: {
    createUser(parent, { data }) {
      const newUser = {
        id: data.id,
        name: data.name,
        age: data.age,
        email: data.email
      };
      db.users.push(newUser);
      return newUser;
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author);
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
