const questions = require("inquirer");
const fs = require('fs');
const fetch = require("node-fetch");
var avatar = "";
let userName = "";
let company = "";
let githubHtml = "";
let followers = "";
let following = "";
let stars = "";
let location = "";
let repos = "";
let bio = "";
let url = "";
let myresult = "";

const client_id = "Iv1.9561c002c95d538a";
const client_secret = "5bcfbdab20337ef166ce315369616a6e2fab508a";

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data) {
  return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Document</title>
      <style>
          @page {
            margin: 0;
          }
         *,
         *::after,
         *::before {
         box-sizing: border-box;
         }
         html, body {
         padding: 0;
         margin: 0;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: ${colors[data.color].wrapperBackground};
         padding-top: 100px;
         }
         body {
         background-color: white;
         -webkit-print-color-adjust: exact !important;
         font-family: 'Cabin', sans-serif;
         }
         main {
         background-color: #E9EDEE;
         height: auto;
         padding-top: 30px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'BioRhyme', serif;
         margin: 0;
         }
         h1 {
         font-size: 3em;
         }
         h2 {
         font-size: 2.5em;
         }
         h3 {
         font-size: 2em;
         }
         h4 {
         font-size: 1.5em;
         }
         h5 {
         font-size: 1.3em;
         }
         h6 {
         font-size: 1.2em;
         }
         .photo-header {
         position: relative;
         margin: 0 auto;
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         background-color: ${colors[data.color].headerBackground};
         color: ${colors[data.color].headerColor};
         padding: 10px;
         width: 95%;
         border-radius: 6px;
         }
         .photo-header img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid ${colors[data.color].photoBorderColor};
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         width: 100%;
         text-align: center;
         }
         .photo-header h1 {
         margin-top: 10px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         padding: 20px 0;
         font-size: 1.1em;
         }
         .nav-link {
         display: inline-block;
         margin: 5px 10px;
         }
         .workExp-date {
         font-style: italic;
         font-size: .7em;
         text-align: right;
         margin-top: 10px;
         }
         .container {
         padding: 50px;
         padding-left: 100px;
         padding-right: 100px;
         }

         .row {
           display: flex;
           flex-wrap: wrap;
           justify-content: space-between;
           margin-top: 20px;
           margin-bottom: 20px;
         }

         .card {
           padding: 20px;
           border-radius: 6px;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           margin: 20px;
         }
         
         .col {
         flex: 1;
         text-align: center;
         }

         a, a:hover {
         text-decoration: none;
         color: inherit;
         font-weight: bold;
         }

         @media print { 
          body { 
            zoom: .75; 
          } 
         }
      </style>`
}
function getHTML() {
  return `<body>
  <div class="container">
  <main>
      <div class="row wrapper">
        <div class="col photo-header card">
           <h2>Hi!<br></h2>
           <h3>My name is NANCY ALTER!<br></h3>
           <h4>Currently @ JOB<br></h4>
           <h6>LOCATION GITHUB BLOG<br></h6>
          </div>
      </div>
          <div class="row main">
             <div class="col">
                <h4>I build things and teach people to code.</h4>
             </div>
          </div>
          <div class="row main">
              <div class="col">
                   <div class="card"><h4>Public Repositories<br>XX</h4></div>
                   <div class="card"><h4>GitHub Stars<br>XX</h4></div>
              </div>            
               <div class="col main">
                   <div class="card"><h4>Followers<br>XX</h4></div>
                   <div class="card"><h4>Following<br>XX</h4></div>
              </div>
          </div>
          <div class="row wrapper">
            <div class="col">
            </div>
          </div>
      </div>
      </main>
    </div>

  </body>
</html>`
}
async function getUser(user) {
  const response = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)
  const result = await response.json()
 
  // console.log(result);
  avatar = result.avatar_url;
  userName = result.name;
  company = result.company;
  location = result.location;
  githubHtml = result.html_url;
  followers = result.followers;
  following = result.following;
  stars = result.starred_url;
  repos = result.public_repos;
  url = result.html_url;
  bio = result.bio;
  return `<body>
  <div class="wrapper">
  <h1>Hi!</h1>
  <h2>My name is ${result.name}!</h2>
  </div>
  </body>
  </html>`
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

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), function (err) {

    if (err) {
      return console.log(err);
    }
    console.log("Success!");
    console.log(data.name);
    console.log(data.color);
    getUser(data.name);

  fs.writeFile(data.name + ".html", generateHTML(data), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  fs.appendFile(data.name + ".html", getHTML() + "\r\n", function (err) {
    if (err) throw err;
    console.log('Appended!');
  });
  // fs.appendFile(data.name + ".html", getUser(data.name) + "\r\n", function (err) {
  //   if (err) throw err;
  //   console.log('Appended!');
  // });

});
});
