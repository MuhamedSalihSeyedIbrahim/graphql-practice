const fetch = require("node-fetch");
var author = "andy";
var content = "hope is a good thing";
var query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch("http://localhost:4000/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      },
    },
  }),
})
  .then((r) => r.json())
  .then((data) => console.log("data returned:", data));
