const { validationResult } = require('express-validator/check');
const Post = require('../models/post');


class FeedController {

    // GET /feeds/showAll
    getPosts(req, res, next) {
        Post.find()
            .then(posts => {
                res.status(200).json({ message: "get post sucessfully ", posts: posts });
            })
            .catch(err => {
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
            const error = new Error('Validtion failed , entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const title = req.body.title;
        const content = req.body.content;
        const post = new Post({
            title,
            content,
            imageUrl: 'public/img/fanLiver.jpeg',
            creator: { name: 'Van Chinh' },
        });
        post.save()
            .then((result) => {
                console.log(result);
                return res.status(201).json({
                    message: 'Create successfully',
                    post: result
                });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    }

    // GET /feeds/:postId
    showDetail(req, res, next) {

        const postId = req.params.postId;
        console.log('POST ID' + postId);
        Post.findById(postId)
            .then(post => {
                if (!post) {
                    const error = new Error('Could not find post');
                    error.status = 404;
                    throw error;
                }
                res.status(200).json({ message: 'Get Single Post', post: post });
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });

    }
}

module.exports = new FeedController();