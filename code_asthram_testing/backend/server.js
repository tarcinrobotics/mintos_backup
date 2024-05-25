var express = require("express");
var app = express();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cors = require("cors");
const webpush = require('web-push');
const { spawn } = require('child_process');
const { execFile } = require('child_process');

var multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require("path");

  const fs = require("fs");
  const https = require("https");


const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/?retryWrites=true&w=majority";
//const mongoURI = "mongodb://localhost:27017";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
app.use(cors({
  origin: '*'
}));
app.use(express.json())

const User = require('./userModel.js');



async function insert() {
  const usersToAdd = [
    {
      username: 'admin@tarcin.com',
      password: await bcrypt.hash('tarcin301', 10),
      isSuperuser: true,
    },
    {
      username: 'tarcinadmin',
      password: await bcrypt.hash('tarcinadmin', 10),
      isSuperuser: true,
    },
    // Add more users as needed
    // { username: 'alcarsath@gmail.com', password: await bcrypt.hash('arsath', 10) }
  ];

  for (const user of usersToAdd) {
    try {
      const existingUser = await User.findOne({ username: user.username });
      if (!existingUser) {
        await User.create(user);
        console.log(`User added successfully: ${user.username}`);
      } else {
        console.log(`User already exists: ${user.username}`);
      }
    } catch (err) {
      console.error(`Error adding user ${user.username}:`, err);
    }
  }
}

insert();
require('dotenv').config();


// Set VAPID keys
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};


// Set VAPID keys in the web push library
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Store the subscription details in your database (optional)

  // Send a welcome push notification (optional)
  const payload = JSON.stringify({ title: 'Welcome to our app!' });
  webpush.sendNotification(subscription, payload)
    .catch(error => console.error('Error sending push notification:', error));
});


mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

var product = require("./model/product.js");
var user = require("./model/user.js");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }
  jwt.verify(token, 'shhhhh11111', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.post("/subscribe", authenticateUser, async (req, res) => {
  const subscription = req.body;
  const username = req.user.user; // Assuming username is stored in user object

  // Send 201 - resource created
  res.status(201).json({});

  // Fetch user details using username (which is assumed to be an email) and send push notifications accordingly
  const payload = JSON.stringify({ title: 'Welcome to our app!' });
  webpush.sendNotification(subscription, payload)
    .catch(error => console.error('Error sending push notification:', error));
});




app.get("/api", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});
app.post("/api/login", async (req, res) => {
  console.log('Received login request:', req.body);
  try {
    if (req.body && req.body.username && req.body.password) {
      // Query MongoDB to find the user
      const foundUser = await user.findOne({ username: req.body.username });

      console.log('Found user:', foundUser);

      if (foundUser && bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log('Password matched');

        // Generate token
        jwt.sign(
          {
            user: foundUser.username,
            id: foundUser._id,
            isSuperuser: foundUser.isSuperuser || false,
          },
          "shhhhh11111",
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              console.error('Token generation error:', err);
              res.status(400).json({
                status: false,
                errorMessage: err,
              });
            } else {
              console.log('Generated token:', token);
              res.json({
                message: "Login Successfully.",
                token: token,
                status: true,
              });
            }
          }
        );
      } else {
        console.error("Incorrect username or password");
        res.status(400).json({
          errorMessage: "Username or password is incorrect!",
          status: false,
        });
      }
    } else {
      console.error("Invalid request parameters");
      res.status(400).json({
        errorMessage: "Add proper parameters first!",
        status: false,
      });
    }
  } catch (e) {
    console.error("Unexpected error:", e);
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.use("/", (req, res, next) => {
  try {
    if (req.path === "/login" || req.path === "/register" || req.path === "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "shhhhh11111", function (err, decoded) {
        console.log('Decoded token:', decoded); // Add this line for debugging
      
        if (decoded && decoded.user) {
          req.user = decoded;
          // Check if the user is a superuser
          if (decoded.isSuperuser !== undefined) {
            if (decoded.isSuperuser) {
              next();
            } else {
              console.log(req.url);
              return res.status(401).json({
                errorMessage: "User unauthorized!",
                status: false,
              });
            }
          } else {
            return res.status(401).json({
              errorMessage: 'User unauthorized!',
              status: false,
            });
          }
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false,
          });
        }        

        
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});


/* login api */
/* login api */



/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, async (err, data) => {
        if (data.length == 0) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);

          let User = new user({
            username: req.body.username,
            password: hashedPassword,
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  if (data.isSuperuser) {
    jwt.sign(
      {
        user: foundUser.username,
        id: foundUser._id,
        isSuperuser: foundUser.isSuperuser || false,
      },
      "shhhhh11111",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.error('Token generation error:', err);
          res.status(400).json({
            status: false,
            errorMessage: err,
          });
        } else {
          console.log('Generated token:', token);
          res.json({
            message: "Login Successfully.",
            token: token,
            status: true,
          });
        }
      }
    );
  }}

  app.post('/execute-python', (req, res) => {
    const { script } = req.body;
  
    // Write the script content to a temporary file
    const scriptPath = '/tmp/script.py';
    fs.writeFile(scriptPath, script, (err) => {
      if (err) {
        console.error('Error writing script to file:', err);
        return res.status(500).json({ error: 'Error writing script to file' });
      }
  
      // Execute the Python script file
      execFile('docker', ['exec', '-i', 'my-python-env', 'python', scriptPath], (error, stdout, stderr) => {
        if (error) {
          console.error('Error executing Python script:', error);
          return res.status(500).json({ error: 'Error executing Python script' });
        }
  
        // Send the output back to the client
        res.json({ output: stdout });
      });
    });
  });


// start HTTPS server
const PORT = 2000;

app.listen(PORT, () => {
  console.log("Server is Runing On port 2000");
});
