import express from 'express';
import * as dotenv from 'dotenv';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// GET
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        console.log(`Posts fetched:`, posts.length);
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// POST
router.route('/').post(async (req, res) => {
    try {
        const { name } = req.body;
        const newPost = await Post.create({
            name: name,
        });
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// PUT
router.route('/:id').put(async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        console.log(`Updated Post:`, updatedPost)
        res.status(201).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// DELETE
router.route('/:id').delete(async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndRemove(req.params.id);
        console.log(`Removed Post:`, removedPost)
        res.status(201).json({ success: true, data: removedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});


export default router;