const fetch = require("node-fetch");

var sides = 3;
var roll = 6;
var query = `query getDie($sides :Int,$roll:Int!){
    getDie(numSides:$sides){
      numSides
      rollOnce
      roll(numRolls:$roll)
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
      sides,
      roll,
    },
  }),
})
  .then((r) => r.json())
  .then((data) => console.log("data returned:", data));
