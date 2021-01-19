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
    return await this.runQuery(query);
  }

  async insertMovie(id, movieName, movieReview) {
    const query = `INSERT INTO movie_reviews (id, movieName, movieReview) VALUES (?, ?, ?);`;
    return await this.runQuery(query, [id, movieName, movieReview]);
  }

  async deleteMovie(idMovie) {
    const query = `DELETE FROM movie_reviews WHERE id = '${idMovie}'`;
    return await this.runQuery(query);
  }
  async updateMovie(id, movieName, movieReview) {
    const query = `UPDATE movie_reviews SET movieName= ?, movieReview= ? WHERE id= ? `;
    return await this.runQuery(query, [movieName, movieReview, id]);
  }
}
