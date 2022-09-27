require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(express.json());
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var Twitter = require("twitter");
const Queue = require("bee-queue");
// Logic goes here
const User = require("./model/user");
const Task = require("./model/task");
// Register
app.post("/user/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
app.post("/user/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("Input is missing");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});

app.post("/user/logout", auth, async (req, res) => {
  const authHeader = req.headers["access-token"];

  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been Logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
});

app.post("/tasks/createTask/", auth, async (req, res) => {
  try {
    // Get user input
    const { title, desc, completed } = req.body;

    // Validate user input
    if (!title && !completed) {
      res.status(400).send("All input is required");
    }

    // check if task already exist
    // Validate if task exist in our database
    const oldTask = await Task.findOne({ title });

    if (oldTask) {
      return res.status(409).send("Task Already Exists. Please Complete ASAP");
    }

    // Create Task in our database
    const task = await Task.create({
      title,
      desc,
      completed,
    });

    // Create token
    const token = jwt.sign({ title }, process.env.JWT_TOKEN_KEY, {
      expiresIn: "2h",
    });
    // save user token
    task.token = token;

    // return new user
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
  }
});

app.get("/tasks/createTask/fetchTweet", auth, async (req, res) => {
  const queue = new Queue("fetch-tweet");
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN,
  });
  const job = queue.createJob({
    data: client.get(
      "search/tweets",
      { q: "Bangalore" },
      function (error, tweets, res) {
        console.log(tweets);
      }
    ),
  });

  job.save();
  job.on("succeeded", (result) => {
    console.log("Data fetched");
  });
  res.status(201).json(data);
});

app.get("/tasks/listTask", auth, async (req, res) => {
  try {
    const data = await Task.find({});
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/tasks/completedTask", auth, async (req, res) => {
  try {
    const output = await Task.find({ completed: true });
    res.status(201).json(output);
  } catch (err) {
    console.log(err);
  }
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
module.exports = app;
