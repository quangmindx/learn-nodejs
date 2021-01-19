function DisplayMovieList(props) {
  if (!props.movieList.length) return null;
  return props.movieList.map(({ id, movieName, movieReview }) => {
    return (
      <div key={id}>
        <div className="p-bottom">
          <h3>{movieName}</h3>
          <h5>{movieReview}</h5>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => props.deleteMovie(movieName)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() => props.updateMovie(movieName)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-whatever="@mdo"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  });
}
export default DisplayMovieList;
