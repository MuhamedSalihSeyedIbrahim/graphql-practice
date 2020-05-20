var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");
const { mergeSchemas } = require('graphql-tools');

// Maps id to User object
var fakeDatabase = {
  a: {
    id: "a",
    name: "alice",
  },
  b: {
    id: "b",
    name: "bob",
  },
};

var schema_1 = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

var schema_2 = buildSchema(`
  type Query {
    echo(id: String) : String
  }
`);



var root_resolver_1 = {
  user: ({ id }) => {
    return fakeDatabase[id];
  },
};

var root_resolver_2 = {
  echo: ({ id }) => {
    return id;
  },
};

//merge all schemas
const merged_schema = mergeSchemas({
  schemas: [
    schema_1,
    schema_2
  ],
});

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: merged_schema,
    rootValue: {
      ...root_resolver_1,
      ...root_resolver_2
    },
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
