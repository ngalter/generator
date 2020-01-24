const questions = require("inquirer");
const fs = require('fs');
const fetch = require("node-fetch");
const jspdf = require("jspdf");
const axios = require("axios");
const util = require("util");
const generateHTML = require("generateHTML");
const generateMoreHTML = require("generateMoreHTML");

const client_id = "Iv1.9561c002c95d538a";
const client_secret = "5bcfbdab20337ef166ce315369616a6e2fab508a";

//---------from original hw assignment---------------
const questions = [
  
];

function writeToFile(fileName, data) {
 
}

function init() {

  init();

  //---------from original hw assignment---------------


  const fetchUser = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();
    return { data };
  };
  const getGitData = (user) => {
    fetchUser(user).then((res) => {
      userData.name = res.data.name;
      console.log(res);
      console.log(res.data.name);
      console.log(userData.name);
    }).then().then()
  };



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
  ]).then(function ({ data }) {
    const queryURL = `https://api.github.com/users/${data.name}?client_id=${client_id}&client_secret=${client_secret}`;
    axios.get(queryURL).then(function (res) {
      const res = {
        name: res.data.name
      }
      generateHTML(data, res);
      var filename = data.name.toLowerCase().split(' ').join('') + ".json";

      fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {
  
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
        console.log(data.name);
        console.log(data.color);
  
        fs.writeFile(data.name + ".html", generateHTML(data), function (err) {
          if (err) throw err;
          console.log('Saved!');
          var doc = new jsPDF();
 
          doc.text(data.name + ".html", 10, 10);
          doc.save('a4.pdf');
        });
    });
   

    
    
    
    
    
    var filename = data.name.toLowerCase().split(' ').join('') + ".json";

    fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {

      if (err) {
        return console.log(err);
      }
      console.log("Success!");
      console.log(data.name);
      console.log(data.color);

      fs.writeFile(data.name + ".html", generateHTML(data), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      fs.appendFile(data.name + ".html", generateMoreHTML() + "\r\n", function (err) {
        if (err) throw err;
        console.log('Appended!');

      });
      var doc = new jsPDF()
 
      doc.text('Hello world!', 10, 10)
      doc.save('a4.pdf')
    });
  });
};
