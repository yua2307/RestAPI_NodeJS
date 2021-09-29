const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const feedController = require("../app/controllers/feedController");
const checkValidation = [
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
];
const isAuthor = require("../middleware/is-auth");
router.get("/showAll", isAuthor, feedController.getPosts);
router.post("/create", isAuthor, checkValidation, feedController.createPost);
router.put("/:postId", isAuthor, feedController.updatePost);
router.delete("/:postId", isAuthor, feedController.deletePost);
router.get("/:postId", isAuthor, checkValidation, feedController.showDetail);

module.exports = router;
