const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const feedController = require("../app/controllers/feedController");

router.get("/showAll", feedController.getPosts);
router.post(
    "/create",
    [
        body("title").trim().isLength({ min: 5 }),
        body("content").trim().isLength({ min: 5 }),
    ],
    feedController.createPost
);

router.get("/:postId", feedController.showDetail);

module.exports = router;
