import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

export default db;
