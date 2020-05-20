let { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language

/*function specification of query resolver
type Query {
    function_name : return type
}
*/

let schema = buildSchema(`
  type Query { 
    hello: String 
    hai : String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return "Hello world!";
  },
  hai: () => {
    return "Hai world";
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, "{ hello }", root).then((response) => {
  console.log(response);
});

// Run the GraphQL query '{ hai }' and print out the response
graphql(schema, "{ hai }", root).then((response) => {
  console.log(response);
});
