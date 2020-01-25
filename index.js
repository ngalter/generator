const questions = require("inquirer");
const fs = require('fs');
const generateHTML = require("./generateHTML");
const axios = require("axios");
// var pdf = require('html-pdf');

const client_id = "Iv1.9561c002c95d538a";
const client_secret = "5bcfbdab20337ef166ce315369616a6e2fab508a";

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
]).then(function (data) {
  console.log(data);
  const queryURL = `https://api.github.com/users/${data.name}?client_id=${client_id}&client_secret=${client_secret}`;
  axios.get(queryURL).then(function (res) {
    console.log(res);
    var filehtml = data.name.toLowerCase().split(' ').join('') + ".html";
    fs.writeFile(filehtml, generateHTML(data, res),
      function (err) {
        if (err) {
          throw err;
        }
        console.log("Saved HTML!");
        
        var html = fs.readFileSync(filehtml, "utf8");
        var options = { format: 'Letter' };
        // pdf.create(html, options).toFile(data.name + ".pdf", function (err, res) {
        //   if (err) {
        //     throw err;
        //   }
        //   console.log(res); 
        // });

      });
  });
});
