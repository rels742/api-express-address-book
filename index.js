// Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
// Include the cors middleware
const cors = require("cors");
//importing contacts.js
const contacts = require("./contacts.js");

// Create a new express application
const app = express();

// tell express we want to use the morgan library
app.use(morgan("dev"));

//tell express we want to use the cors library
app.use(cors());

// now adding routes
app.get("/", (request, response) => {
  console.log("got a GET quest to /");

  response.json({
    message: "great work!",
  });
});

app.get("/contacts", (req, res) => {
  res.json({
    contacts: contacts,
  });
});

// this goes last
// start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
