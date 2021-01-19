import DbService from "../models/Movie.js";
const db = DbService.getDbServiceInstance();

const getAllMovieController = (req, res) => {
  db.getAllMovie()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ message: "Not found" });
    });
};

const postMovieController = (req, res) => {
  const { id, movieName, movieReview } = req.body;
  db.insertMovie(id, movieName, movieReview)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

const deleteMovieController = (req, res) => {
  const { id } = req.params;
  db.deleteMovie(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const updateMovieController = (req, res) => {
  const { id, movieName, movieReview } = req.body;
  db.updateMovie(id, movieName, movieReview)
    .then((resuls) => {
      res.send(resuls);
    })
    .catch((err) => console.log(err));
};

export {
  getAllMovieController,
  postMovieController,
  deleteMovieController,
  updateMovieController,
};
