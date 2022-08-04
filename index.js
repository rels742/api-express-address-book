// Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
// Include the cors middleware
const cors = require("cors");
//importing contacts.js
const contacts = require("./contacts.js");
const meetings = require("./meetings.js");

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

  response.json({});
});

// route created for GET /contacts
app.get("/contacts", (req, res) => {
  // const Id = contacts.length + 1;

  // const contactMeetings = meetings.filter(
  //   (meeting) => meeting.contactId === Id
  // );
  // console.log("here are the meetings", contactMeetings);

  res.json({
    contacts: contacts,
    // meetings: contactMeetings,
  });
});

//post request for POST /contacts
//putting things into a request body
app.post("/contacts", (req, res) => {
  // console.log(req.body);

  //creating the id
  const nextID = contacts.length + 1;
  // const contactMeetings = meetings.filter(
  //   (meeting) => meeting.contactId === nextID
  // );

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
    // meetings: contactMeetings,
  };

  contacts.push(newContact);

  res.status(201).json({ contact: newContact });
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

// route for DELETE a contact by ID
app.delete("/contacts/:id", (req, res) => {
  //find the contact with the params id and id from contacts.id
  const matchContact = contacts.find(
    (contact) => contact.id === Number(req.params.id)
  );

  //to do splice, we need the index from the array of contacts.js that was found in matchContact. Set it in a variable
  const indexOfArray = contacts.indexOf(matchContact);

  // use splice to update it
  contacts.splice(indexOfArray, 1);

  // set the status return with the contact
  res.status(200).json({
    contact: {
      ...matchContact,
    },
  });
});

// PUT route
//Update a contact by ID
app.put("/contacts/:id", (req, res) => {
  //need a body in insomnia for PUT
  // find the old contact and match with the params

  const oldContact = contacts.find(
    (contact) => contact.id === Number(req.params.id)
  );

  const indexOfArray = contacts.indexOf(oldContact);

  //update it with splice, replacing the content with the req.body
  contacts.splice(indexOfArray, 1, { ...req.body, id: oldContact.id });

  //set the updated contact
  const update = contacts.find(
    (contact) => contact.id === Number(req.params.id)
  );

  //set the response with status code
  res.status(201).json({
    contact: {
      ...update,
    },
  });
});

// this goes last
// start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

//nts - you usually dont need anything in the body for a get request
