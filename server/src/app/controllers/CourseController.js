const Joi = require("joi");

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(course);
};

class CourseController {
  getCourses(req, res, next) {
    res.json(courses);
  }

  getCourse(req, res, next) {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).json({
        status: "false",
        mes: `not found course with id ${req.params.id} `,
      });
    }
    res.json(course);
  }

  create(req, res, next) {
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
  }

  update(req, res, next) {
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
  }

  delete(req, res, next) {
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
  }
}

module.exports = new CourseController();
