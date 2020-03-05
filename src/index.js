import { GraphQLServer } from "graphql-yoga";
import gql from "graphql-tag";

import db from "./db";

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(id: ID!, name: String!, email: String!, age: Int): User!
    createPost(
      title: String!
      body: String!
      id: ID!
      published: Boolean!
      author: ID!
    ): Post!
    createComment(id: ID!, text: String!, post: ID!, author: ID!): Comment!
  }

  type User {
    name: String!
    email: String!
    age: Int
    id: ID!
    posts: [Post!]!
    comment: [Comment!]!
  }

  type Post {
    title: String!
    body: String!
    id: ID!
    published: Boolean!
    author: User!
    comment: [Comment!]!
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
    user(_, args) {
      return db.user.find(user => user.id === args.id);
    },

    posts() {
      return db.posts;
    },
    comments() {
      return db.comments;
    }
  },
  Mutation: {
    createUser(_, args) {
      const newUser = {
        id: args.id,
        name: args.name,
        email: args.email,
        age: args.age
      };
      db.users.push(newUser);
      return newUser;
    },
    createPost(_, args) {
      const newPost = {
        id: args.id,
        body: args.body,
        published: args.published,
        author: args.author,
        comment: args.comment
      };
      db.posts.push(newPost);
      return newPost;
    },
    createComment(_, args) {
      const newComment = {
        text: args.text,
        post: args.post,
        author: args.author
      };
      db.comments.push(newComment);
      return newComment;
    }
  },

  Post: {
    author(post) {
      return db.users.find(user => user.id === post.author);
    }
  },
  User: {
    posts(user) {
      return db.posts.find(post => user.id === post.author);
    }
  },
  Comment: {
    author(comment) {
      return db.users.find(user => user.id === comment.author);
    },
    post(comment) {
      return db.post.find(post => post.id === comment.post);
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
