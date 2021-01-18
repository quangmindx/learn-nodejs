import db from "../config/DbConfig.js";
let instance = null;

export default class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  runQuery(query, data) {
    return new Promise((resolve, reject) => {
      db.query(query, data, (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });
  }
  async getAllMovie() {
    const query = `SELECT * FROM movie_reviews;`;
    const response = await this.runQuery(query);
    return response;
  }

  async insertMovie(id, movieName, movieReview) {
    const query = `INSERT INTO movie_reviews (id, movieName, movieReview) VALUES (?, ?, ?);`;
    const response = await this.runQuery(query, [id, movieName, movieReview]);
    return response;
  }

  async deleteMovie(movieName) {
    const query = `DELETE FROM movie_reviews WHERE movieName = '${movieName}'`;
    const response = await this.runQuery(query);
    return response;
  }

  // async updateMovie()
}
