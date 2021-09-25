import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

import userSchema from "./userModel.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

// DB config
const mongoURI =
  "mongodb+srv://admin:AtHaoRroNldFmHr7@cluster0.ghi5h.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB connected");
});

app.post("/users", (req, res) => {
  const userData = req.body;
  console.log(req.body);

  try {
    userSchema.create(userData, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//to check if user having login credentials
app.post("/users/login", (req, res) => {
  MongoClient.connect(mongoURI, (err, db) => {
    if (err) throw err;

    const username = req.body.username;
    const password = req.body.password;

    const dbo = db.db("users");

    dbo.collection("users").findOne({ username }, (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result) {
        if (result.password === password) {
          res.status(200).send(result);
        } else {
          res.status(200).send("Incorrect Password");
        }
      } else {
        res.status(200).send("User not found");
      }
    });
  });
});

// listen
app.listen(port, console.log(`Server running on ${port}`));
