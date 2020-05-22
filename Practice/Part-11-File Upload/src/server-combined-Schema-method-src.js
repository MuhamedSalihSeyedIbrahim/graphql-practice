var express = require("express");
var fs = require("fs");
var graphqlHTTP = require("express-graphql");
var { buildSchema, graphql } = require("graphql");
var { makeExecutableSchema } = require("graphql-tools");

const { graphqlUploadExpress, GraphQLUpload } = require("graphql-upload");

// Construct a schema, using GraphQL schema language
var typeDefs = `

scalar Upload

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

type Query {
  _basic : Boolean
}

type Mutation {
  singleUpload(file: Upload!): File!,
  multiUpload(file: [Upload!]!): [File]!,

}

`;

const BASEPATH = "../uploadedFiles/";


var resolver = {
  Upload: GraphQLUpload,
  Query: { _basic: () => false },
  Mutation: {
    singleUpload: async (parent,args,context,info) => {
      try {
        const file = await args.file;
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();

        fileStream.pipe(fs.createWriteStream(`${BASEPATH}${filename}`));

        return file;
      } catch (err) {
        
      }
    },
    multiUpload: async (parent,args,context,info) => {
      try {
        const files = args.file;
        let res = [];

        const a = await Promise.all(files).then((files) => {
          files.forEach((file) => {
            const { createReadStream, filename, mimetype } = file;
            const fileStream = createReadStream();

            fileStream.pipe(
              fs.createWriteStream(`${BASEPATH}${filename}`)
            );

            res.push(file);
          });
        });

        return res;
      } catch (err) {
        
      }
    },
  },
};

const CombinedSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolver,
});

var app = express();
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
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
    initialQuery: `query{_basic}`,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
