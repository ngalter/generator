const questions = require("inquirer");
const fs = require('fs');
// const fetch = require("node-fetch");
// const jspdf = require("jspdf");
const axios = require("axios");
// const util = require("util");
const generateHTML = require("./generateHTML");
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
      var filetxt = data.name.toLowerCase().split(' ').join('') + ".txt";
      fs.writeFile(filehtml, generateHTML(data, res),
        function (err) {
          if (err) {
            throw err;
          }
          console.log("Saved!");

        });
    });
  });

        //   var doc = new jsPDF();
 
        //   doc.text(filename + ".txt", 10, 10);
        //   doc.save(filename + ".pdf");
