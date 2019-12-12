const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });

  function generateHTML(answers) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${res.name}</h1>
      <p class="lead">I am from ${res.location}.</p>
      <ul class="list-group">
      <li class="list-group-item">Public Repositories: ${res.public_repos}</li>
        <li class="list-group-item">Followers ${res.followers}</li>
        <li class="list-group-item">GitHub Stars: ${res.public_gists}</li>
        <li class="list-group-item">Following: ${res.following}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
  }
  
  promptUser()
    .then(function(res) {
      const html = generateHTML(res);
  
      return writeFileAsync("index.html", html);
    })
    .then(function() {
      console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
      console.log(err);
    });
