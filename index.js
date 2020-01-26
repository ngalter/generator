const questions = require("inquirer");
const fs = require('fs');
const convertFactory = require('electron-html-to');
const generateHTML = require("./generateHTML");
const axios = require("axios");

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
 
      const datatxt = generateHTML(data, res);

      var newData = datatxt.slice(0, -1);

      var filehtml = data.name.toLowerCase().split(' ').join('') + ".html";
      fs.writeFile(filehtml, newData,
        function (err) {
          if (err) {
            throw err;
          }
        })
      console.log("Saved HTML!");

      var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });

      conversion({ html: newData }, function (err, result) {
        if (err) {
          return console.error(err);
        }
        
        result.stream.pipe(fs.createWriteStream("./" + data.name + ".pdf"));
        conversion.kill();
      });
    });
  });

