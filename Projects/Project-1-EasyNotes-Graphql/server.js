const express = require("express");
const bodyParser = require("body-parser");

//env
const { PORT } = require("./src/config/env.config");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const { url, options } = require("./src/config/database.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(url, options)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

//Normal Api Route Method
const route = require("./src/routes/note.routes");
app.use(route);

//Graphql Api Method
var graphqlHTTP = require("express-graphql");
const { root: resolvers } = require("./src/graphql/notes/notes.resolver");
const { schema } = require("./src/graphql/notes/notes.schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,  
    context: (req,res) =>({req,res}),
    customFormatErrorFn: error => ({
        message: error.message,
       
      }) 
  })
);

// Mount your altair GraphQL client
const { altairExpress } = require ('altair-express-middleware');
app.use('/altair', altairExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  initialQuery: `{ getData { id name surname } }`,
}));


// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
