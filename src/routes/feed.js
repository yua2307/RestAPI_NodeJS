const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const feedController = require("../app/controllers/feedController");
const checkValidation = [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
];
router.get("/showAll", feedController.getPosts);
router.post(
    "/create",
    checkValidation,
    feedController.createPost
);
router.put("/:postId", feedController.updatePost);
router.delete("/:postId", feedController.deletePost);
router.get("/:postId", checkValidation, feedController.showDetail);

module.exports = router;
