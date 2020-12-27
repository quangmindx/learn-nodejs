const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const courses = [
  { id: 1, name: "courses 1" },
  { id: 2, name: "courses 2" },
  { id: 3, name: "courses 3" },
  { id: 4, name: "courses 4" },
];
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
  res.status(200).json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  const result = courses.find((course) => course.id === parseInt(id));
  console.log(result);
  if (result) return res.status(200).json(result);
  return res
    .status(404)
    .json({ error: "The course with the give ID was not found." });
});

app.post("/api/courses", (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});
app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
