//required imports

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));
app.get("/", (req, res) => res.send("MERN Twitter"));


//import routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);


//routes
app.use("/api/users", users);
app.use("/api/tweets", tweets);


//define localport
const port = process.env.PORT || 5000;


//print success message
app.listen(port, () => console.log(`Server is running on port ${port}`));