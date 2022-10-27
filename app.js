const express = require('express');
const app = express();

// -----

// Exact match (match 'index' respectively)
app.all('/index', function (req, res) {
  res.send('Looking for index?');
});

// String patterns matching
// '?': this character/string can exist or not
app.all('/csci?2720', function (req, res) {
  res.send('csci2720 or csc2720?');
});
app.all('/cs(ci)?2720', function (req, res) {
  res.send('cs2720 or csci2720?');
});

// '+': this character/string can occur multiple times
app.all('cu+hk', function (req, res) {
  res.send(' cuhk or cuuhk or cuuuuuuhk');
});

// '*': any character/string
app.all('/dir1/*', function (req, res) {
  res.send('This is something in dir1');
});

// Regular expression matching: e.g. any path that ends with .jpg
// Note: The expression is not enclosed by any quotes
app.all(/.*\.jpg$/, function (req, res) {
  res.send('You requested a JPG file');
});
// Route parameters matching
// e.g. http://hostname/course/2720/lecture/6
app.all('/course/:cID/lecture/:lID', function (req, res) {
  res.send(req.params);
  // Output: {"cID":"2720", lID":"6"}
});
// hyphen and dot (- and .) are interpreted literally
// e.g. http://hostname/csci2720-t2
app.all('/:course-:tutorial', function (req, res) {
  res.send(req.params);
  // Output: {"course":"csci2720", "tutorial":"t2"}
});

app.get('/content.html', function (req, res) {
  var buf = '';

  // Create the content of a file as a string here
  buf += 'Hello ';
  buf += 'CSCI2720<br>';
  var today = new Date();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  buf += "It's now " + time;

  // Send the string in the HTTP response
  // By default, it’s treated as the content of an HTML file
  res.send(buf); // Note: send() can only be called once!
});

// -----

// To handle a GET request for /path1
app.get('/path1', function (req, res) {
  res.send('You made a GET request');
});

// To handle a POST request for /path2
app.post('/path2', function (req, res) {
  res.send('You made a POST request');
});

// To handle all requests (regardless of request method)
app.all('/*', function (req, res) {
  res.send('You made a request');
});

// The order in which routes are set up is important!
app.get('/path3', function (req, res) {
  res.send('You will not see this');
});
// In this example, a GET request for /path3 will be intercepted by app.all('/*', ...)

// -----

const server = app.listen(3000);
