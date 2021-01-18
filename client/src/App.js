import "./App.css";
import { React, useState, useEffect } from "react";
import Axios from "axios";
import DisplayMovieList from "./Components/DisplayMovieList";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  // const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3030/api/get")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "name-movie") {
      setMovieName(value);
    }
    if (name === "review") {
      setMovieReview(value);
    }
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:3030/api/insert", { movieName, movieReview })
      .then(() => {
        console.log("Done");
      })
      .catch((err) => console.log(err));
    setMovieList([...movieList, { movieName, movieReview }]);
    setMovieName("");
    setMovieReview("");
  };

  const deleteMovie = (name) => {
    const movieIndex = movieList.findIndex((movie) => movie.movieName === name);
    if (movieIndex !== -1) {
      Axios.delete(`http://localhost:3030/api/delete/${name}`);
      movieList.splice(movieIndex, 1);
      setMovieList([...movieList]);
    }
  };

  const updateMovie = (name) => {
    const movieIndex = movieList.findIndex((movie) => movie.movieName === name);
    if (movieIndex !== -1) {
      Axios.put(`http://localhost:3030/api/update/${name}`);
      // movieList.splice(movieIndex, 1);
      // setMovieList([...movieList]);
    }
  };

  return (
    <div className="App">
      <div className="container d-flex j-center m-t">
        <div className="form-container">
          <h1>CRUD APPLICATION</h1>
          <div className="form">
            <div className="form-control d-flex f-col m-t">
              <label>Movie Name</label>
              <input
                type="text"
                name="name-movie"
                placeholder="Movie name"
                onChange={handleChange}
                value={movieName}
              />
            </div>
            <div className="form-control d-flex f-col m-t">
              <label>Review</label>
              <input
                type="text"
                name="review"
                placeholder="Review"
                onChange={handleChange}
                value={movieReview}
              />
            </div>

            <div className="form-control m-t">
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex f-col m-t">
        <DisplayMovieList
          movieList={movieList}
          deleteMovie={deleteMovie}
          updateMovie={updateMovie}
        />
      </div>
    </div>
  );
}

export default App;
