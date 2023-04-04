const express = require("express");
const router = express.Router();
const CourseController = require("../app/controllers/CourseController");

router
  .get("/", CourseController.getCourses)
  .get("/:id", CourseController.getCourse)
  .post("/", CourseController.create);
router
  .delete("/:id", CourseController.delete)
  .put("/:id", CourseController.update);
module.exports = router;
