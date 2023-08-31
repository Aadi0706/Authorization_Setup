const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect.js");
const User = require("./db/userModel");
const Issue = require("./db/issueModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//execute database connection
dbConnect();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.post("/login", (request, response) => {
  //checking if email exits.
  User.findOne({ email: request.body.email })
    .then((user) => {
      // comparing the password entered with password in db.
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          // if the password is not correct
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Password does not match",
              error,
            });
          }

          //creating the json web token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            {
              expiresIn: "24h",
            }
          );

          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })

        .catch((error) => {
          response.status(400).send({
            message: "Password does not match",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(400).send({
        message: "Email doesnot exist.",
        error,
      });
    });
});

app.post("/issue", async (request, response) => {
  const issue = new Issue({
    brandName: request.body.brandName,
    productGroup: request.body.productGroup,
    modelNumber: request.body.modelNumber,
    caseId: request.body.caseId,
    issue: request.body.issue,
  });

  // issue.save()
  // .then((result) => {
  //   response
  //     .status(201)
  //     .send({
  //       message: "Issue Created Successfully",
  //       result,
  //     })
  //     .catch((error) => {
  //       response.status(500).send({
  //         message: "Error",
  //         error,
  //       });
  //     });
  // });
  try {
    const dataToSave= await issue.save();
    response.status(200).json(dataToSave);

  } catch (error) {
    response.status(400).json({message: error.message})
  }
});
module.exports = app;
