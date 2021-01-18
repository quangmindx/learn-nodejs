import express from "express";
import { v4 as uuidv4 } from "uuid";
import DbService from "../models/Movie.js";
const db = DbService.getDbServiceInstance();

const route = express.Router();

route.get("/api/get", (req, res) => {
  db.getAllMovie()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ message: "Not found" });
    });
});

route.post("/api/insert", (req, res) => {
  const { movieName, movieReview } = req.body;
  const id = uuidv4();
  db.insertMovie(id, movieName, movieReview)
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
});

route.delete("/api/delete/:movieName", (req, res) => {
  const { movieName } = req.params;
  db.deleteMovie(movieName)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
});

route.put("/api/update/:movieName", (req, res) => {
  console.log(req.params.movieName);
});
export default route;
