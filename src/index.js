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
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
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
    createUser(_, { data }) {
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

  User: {
    posts(user) {
      return db.posts.filter(post => post.author === user.id);
    },
    comments(user) {
      return db.comments.filter(comment => comment.author === user.id);
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author);
    },
    comments(post) {
      return db.comments.filter(comment => comment.post === post.id);
    }
  },

  Comment: {
    post(comment) {
      return db.posts.find(post => post.id === comment.post);
    },
    author(comment) {
      return db.users.find(user => user.id === comment.author);
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
