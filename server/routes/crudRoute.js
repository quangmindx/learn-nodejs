import express from "express";
import {
  getAllMovieController,
  postMovieController,
  deleteMovieController,
  updateMovieController,
} from "../controllers/CRUDController.js";

const route = express.Router();

route.get("/api/get", getAllMovieController);
route.post("/api/insert", postMovieController);
route.delete("/api/delete/:id", deleteMovieController);
route.put("/api/update", updateMovieController);

export default route;
