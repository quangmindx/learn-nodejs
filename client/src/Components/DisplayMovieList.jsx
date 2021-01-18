function DisplayMovieList(props) {
    if (!props.movieList.length) return null;
    return props.movieList.map(({ id, movieName, movieReview }) => {
        return (
            <div className="p-bottom" key={id}>
                <h3>{movieName}</h3>
                <h5>{movieReview}</h5>
                <div>
                    <button onClick={() => props.deleteMovie(movieName)}>Delete</button>
                    <button onClick={() => props.updateMovie(movieName)}>Update</button>
                </div>
            </div>
        )
    });
   
}

export default DisplayMovieList;