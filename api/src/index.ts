import { any } from "bluebird";
import { user } from "./database";

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const config = require("./config");
const database = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((request: any, response: any, next: any) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, config.tokenKey, (error: any, payload: any) => {
      console.log(payload);
      if (payload) {
        user.findByEmail(payload.email).then(doc => {
          request.user = doc;
          next();
        });
      }
    });
  } catch (error) {
    console.log("No token.");
    next();
  }
});

app.get("/ok", function(request: any, response: any) {
  return response.send("ok");
});

app.get("/", function(request: any, response: any) {
  return response.send("home");
});

app.get("/movies", (request: any, response: any) => {
  database.movie
    .getList()
    .then((movies: any) => response.send({ success: true, movies }));
});

app.post("/login", async (request: any, response: any) => {
  const user = await database.user.findByEmail(request.body.email);
  if (user) {
    if (request.body.password === user.password) {
      const token = jwt.sign(
        { email: user.email, first_name: user.first_name, id: user.id },
        config.tokenKey
      );
      response.send({
        success: true,
        message: "Welcome!",
        token
      });
    } else {
      response.send({
        success: false,
        message:
          "That email or password is incorrect or that user does not exist."
      });
    }
  } else {
    response.send({
      success: false,
      message:
        "That email or password is incorrect or that user does not exist."
    });
  }
});

app.post("/validate_token", async (request: any, response: any) => {
  const token = request.body.token;

  if (!token) {
    return response
      .status(401)
      .send({ success: false, message: "Must pass token" });
  }

  jwt.verify(token, config.tokenKey, (error: any, user: any) => {
    if (error) {
      console.log(error);
      return response
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }

    return response.status(200).send({
      success: true,
      user,
      token
    });
  });
});

app.post("/like", async (request: any, response: any) => {
  const record = await database.like.create({ ...request.body });
  console.log(record);
  response.send("recorded");
});

app.post("/register", async (request: any, response: any) => {
  const user = await database.user.findByEmail(request.body.email);
  if (user) {
    return response.send({
      success: false,
      message:
        "A user with that email address already exists. Please login instead."
    });
  } else {
    database.user.create(request.body).then((dbResponse: any) => {
      const token = jwt.sign(
        {
          id: request.body.id,
          email: request.body.email,
          first_name: request.body.first_name
        },
        config.tokenKey
      );

      return response.send({
        success: true,
        message: "User registration successful!",
        token
      });
    });
  }
});

export default app;
