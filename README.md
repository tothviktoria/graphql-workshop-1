# GraphQL-workshop-1

## Setup

1. Fork repo
2. Clone repo from your repositories
3. run `npm install`

## Instructions

# Part 1

1. Run `npm start` and visit `http://localhost:4000/`
2. Run a query to fetch the name and email for all users
3. Run a query to fetch the title and author for all posts and for each author return their name and ID
4. Add `posts` to the `User` type, what type should it return?
5. Add a resolver for `posts` on `User`
6. Create a new type, `Comment` with fields `id`, `text`, `post` and `author`
7. Add some fake comment data to the database file
8. Add resolvers for the necessary fields on the `Comment` type
9. Add comment fields to `User` and `Post` and add the required resolvers
10. Make some queries for your new types

# Part 2

1. Create a new mutation `createPost` with the required arguments
2. Create a resolver for `createPost`. Make sure to check that an author exists for the author id argument.
3. If you haven't used an `input` type, refactor your code to use one.
4. Test your code by creating some users. (Remember, since we are not writing to a database or file, once you refresh the server, the newly created users will have disappeared)
5. Repeat steps 1 to 4 for `createComment`

# Part 3

1.
