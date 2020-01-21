const questions = require("inquirer");
const fs = require('fs');
const fetch = require("node-fetch");

const client_id = "Iv1.9561c002c95d538a";
const client_secret = "5bcfbdab20337ef166ce315369616a6e2fab508a";

async function getUser(user) {
    const response = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
    const result = await response.json()
        console.log(result);
}

questions.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your GitHub User Name?"
  },
  {
    type: "checkbox",
    message: "What is your favorite color?",
    name: "color",
    choices: [
        "red",
        "pink",
        "blue",
        "green"
    ]
  }
]).then(function(data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".json";

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }
      console.log("Success!");
      console.log(data.name);
      console.log(data.color);
    getUser(data.name);
  });
});


