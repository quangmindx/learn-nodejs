import { useState, useEffect } from "react";
import Axios from "axios";
function MovieModal(props) {
  const { id, movieName, movieReview } = props.movieUpdate;

  let [newMovieName, setNewMovieName] = useState("");
  let [newMovieReview, setNewMovieReview] = useState("");

  useEffect(() => {
    setNewMovieName(movieName);
    setNewMovieReview(movieReview);
  }, [movieName, movieReview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name-movie") {
      setNewMovieName(value);
    }
    if (name === "review") {
      setNewMovieReview(value);
    }
  };

  const handleUpdate = () => {
    const movieUpdate = props.movieList.find((movie) => movie.id === id);
    movieUpdate.movieName = newMovieName;
    movieUpdate.movieReview = newMovieReview;
    props.setMovieList([...props.movieList]);
    Axios.put(`http://localhost:3030/api/update`, {
      id,
      movieName: newMovieName,
      movieReview: newMovieReview,
    });
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Update
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Movie name:
                </label>
                <input
                  type="text"
                  className="form-control border"
                  id="recipient-name"
                  name="name-movie"
                  value={newMovieName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Movie review:
                </label>
                <textarea
                  className="form-control border"
                  id="message-text"
                  name="review"
                  value={newMovieReview}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleUpdate}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
