const express = require('express');
const GithubApi = require('github');

const server = express();

const github = new GithubApi({
  debug: true
});

github.authenticate({
  type: 'oauth',
  token: process.env.OAUTH_TOKEN
});

github.gists.create({
  description: 'the description for this gist',
  public: false,
  files: {
    'TEST.md': {
      content: '<html><h1>This is a Test!</h1><b>Hello</b></html>'
    }
  }
}).then((response) => {
  console.log(response);
})
.catch((err) => {
  console.log(err);
});

server.get('/', (req, res) => {
  github.gists.getForUser({ username: 'Chooster' })
  .then((response) => {
    res.status(200);
    res.json(response);
  })
  .catch((err) => {
    console.log(err);
  });
});

server.post('/login', (req, res) => {
  const { username, oauth } = req.body;
  // TODO log in to GitHub, return success/failure response
});

server.get('/gists', (req, res) => {
  // TODO retrieve a list of gists for the currently authed user

});

server.listen(3000);
