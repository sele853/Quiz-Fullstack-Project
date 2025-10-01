const express =require('express')
const router = express.Router()
const Quiz = require('../models/quiz.js')

//get all quizs
router.get('/',async(req,res)=>{
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({message : 'Server error'});
    }
})

//create new quizs
router.post('/',async(req,res)=>{
    try {
        const quiz = new Quiz(req.body)
        await quiz.save();
        res.status(201).json(quiz)
    } catch (error) {
        res.status(400).json({ message: 'Invalid quiz data' });
    }
})


module.exports = router;