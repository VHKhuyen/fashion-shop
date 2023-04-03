import Joi from "joi";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import { config } from "../config.js";
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection(config);
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({
      status: "false",
      mes: `not found course with id ${req.params.id} `,
    });
  }
  res.json(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse({ name: req.body.name });

  if (error)
    return res.status(400).json({
      status: "false",
      mes: error.details[0].message,
    });
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.json(course);
});

app.put("/api/courses/:id", (req, res) => {
  //look for course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).json({
      status: "false",
      mes: `not found course with id ${req.params.id} `,
    });

  //validate
  const { error } = validateCourse({ name: req.body.name });

  if (error)
    return res.status(400).json({
      status: "false",
      mes: error.details[0].message,
    });

  //update course
  course.name = req.body.name;
  res.json(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look for course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).json({
      status: "false",
      mes: `not found course with id ${req.params.id} `,
    });

  //delete course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.json(course);
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(course);
};
