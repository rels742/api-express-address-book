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

//middleware to process json
app.use(express.json());

// now adding routes
app.get("/", (request, response) => {
  // console.log("got a GET quest to /");

  response.json({
    message: "great work!",
  });
});

// route created for GET /contacts
app.get("/contacts", (req, res) => {
  res.json({
    contacts: contacts,
  });
});

//post request for POST /contacts
//putting things into a request body
app.post("/contacts", (req, res) => {
  // console.log(req.body);

  //creating the id
  const nextID = contacts.length + 1;

  const newContact = {
    id: nextID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    street: req.body.street,
    city: req.body.city,
    type: req.body.type,
    email: req.body.email,
    linkedin: req.body.linkedin,
    twitter: req.body.twitter,
  };

  contacts.push(newContact);

  res.json({ contact: newContact });
});

//route for GET/ contacts/:id
// the sort of route needed for requests where I need to identify a specifc item to make changes or GET
app.get("/contacts/:id", (req, res) => {
  // console.log();

  const contactId = Number(req.params.id);

  const contact = contacts.find((contact) => {
    return contact.id === contactId;
  });

  if (contact) {
    res.json({ contact: contact });
  } else {
    res.status(404).json("");
  }

  //contacts.find goes through each contact and finds a match for the id, if it matches then it will return the individual contacts info which is seen in the if statement, if not will return an status 404.

  // could have also done a for each loop
});

// this goes last
// start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

//nts - you usually dont need anything in the body for a get request
