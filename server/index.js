import express from "express";
import cors from "cors";
import crudRoute from "./routes/crudRoute.js";

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", crudRoute);

app.listen(3030, () => console.log(`Server running on port 3030`));
