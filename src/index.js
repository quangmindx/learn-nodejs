import cors from "cors";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

// Import application constants
import { DB, PORT } from "./constants";

// Initialize express application
const app = express();

// Router exports

import userApis from "./apis/users";

// Apply aplication middlewares
app.use(cors());
app.use(json());

// Inject sub router and apis
app.use("/users", userApis);

// Main function
const main = async () => {
  try {
    // Connect with the  database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    consola.success("DATABASE CONNECTED");
    // Start application listening for request on server
    app.listen(PORT, () => consola.success(`Server running on port ${PORT}`));
  } catch (err) {
    consola.error(`Unable to start the server \n${err.message}`);
  }
};

main();
