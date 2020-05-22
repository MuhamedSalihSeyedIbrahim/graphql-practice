var express = require("express");
var fs = require("fs");
var graphqlHTTP = require("express-graphql");
var { makeExecutableSchema } = require("graphql-tools");

const  DateTime  = require("./../CustomDataType/DateTime");
// Construct a schema, using GraphQL schema language
var typeDefs = `

scalar DateTime

type Caller{
  name          : String,
  callTimeStamp : DateTime
}

type Query {
  _basic( call : String ) : Caller
}
`;

var resolver = {
  DateTime: DateTime,
  Query: {
    _basic: (root, args, context, info) => ({
      name: args.call,
      callTimeStamp: new Date(new Date().toISOString()),
    }),
  },
};

const CombinedSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolver,
});

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: CombinedSchema,
    graphiql: true,
  })
);

// Mount your altair GraphQL client
const { altairExpress } = require("altair-express-middleware");
app.use(
  "/altair",
  altairExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`,
    initialQuery: `query{_basic(call:"RaJa") {
      name
      callTimeStamp
    }}`,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
