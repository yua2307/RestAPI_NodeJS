const { validationResult } = require("express-validator/check");
const post = require("../models/post");
const Post = require("../models/post");
const fs = require("fs");
const path = require('path');

class FeedController {
    // GET /feeds/showAll
    getPosts(req, res, next) {
        Post.find()
            .then((posts) => {
                res
                    .status(200)
                    .json({ message: "get post sucessfully ", posts: posts });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

    // POST /feeds/create
    createPost(req, res, err) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed , entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }
        if (!req.file) {
            const error = new Error("No image provided");
            error.statusCode = 422;
            throw error;
        }
        const title = req.body.title;
        const content = req.body.content;
        const imageUrl = req.file.path;
        const post = new Post({
            title,
            content,
            imageUrl: imageUrl,
            creator: { name: "Van Chinh" },
        });
        post
            .save()
            .then((result) => {
                console.log(result);
                return res.status(201).json({
                    message: "Create successfully",
                    post: result,
                });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

    // GET /feeds/:postId
    showDetail(req, res, next) {
        const postId = req.params.postId;
        console.log("POST ID" + postId);
        Post.findById(postId)
            .then((post) => {
                if (!post) {
                    const error = new Error("Could not find post");
                    error.status = 404;
                    throw error;
                }
                res.status(200).json({ message: "Get Single Post", post: post });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }
    // DELETE /feeds/:postId
    deletePost(req, res, next) {

        const postId = req.params.postId;
        Post.findById(postId)
            .then(post => {
                if (!post) {
                    const error = new Error("Could not find post");
                    error.status = 404;
                    throw error;
                }
                // check logged in user
                clearImage(post.imageUrl)
                return Post.findByIdAndRemove(postId)
            })
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Delete post successfully.',
                })
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });


    }
    // PUT /feeds/:postId
    updatePost(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed , entered data is incorrect");
            error.statusCode = 422;
            throw error;
        }

        const postId = req.params.postId;
        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = req.body.image;

        if (req.file) {
            imageUrl = req.file.path;
        }
        if (!imageUrl) {
            const error = new Error("No file picked");
            error.statusCode = 422;
            throw error;
        }

        Post.findById(postId)
            .then((post) => {
                if (!post) {
                    const error = new Error("Could not find post");
                    error.status = 404;
                    throw error;
                }
                if (imageUrl !== post.imageUrl) {
                    clearImage(post.imageUrl)
                }
                post.title = title;
                post.content = content;
                post.imageUrl = imageUrl;
                post.save();
            })
            .then((result) => {
                res.status(200).json({
                    message: "Updated Success!",
                    post: result,
                });
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }
}
const clearImage = (filePath) => {
    filePath = path.join(__dirname, '../../../', filePath);
    console.log('File  Path' + filePath)
    fs.unlink(filePath, err => console.log(err));
};
module.exports = new FeedController();
