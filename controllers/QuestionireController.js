const Questionire = require("../models/questionire");
const Questions = require("../models/questions");
const Answers = require("../models/answers");
const User  = require("../models/user");
const mongoose = require('mongoose');
const submitQuestionire = async (req, res) => {
    try {
        const {
            user_id,
            questionire_id,
            questionAnswerMap
          } = req.body;
        for(const question in questionAnswerMap) {
            const answers = new Answers({
                answer: questionAnswerMap[question],
                questions_id: question,
                questionire_id: questionire_id,
                user_id: user_id
            })
            await answers.save();
        }
        return res.status(200)
        .json([{ msg: "Questionire response already submitted!!", res: "success", }]);
    } catch (err) {
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const getAllUsersQuestionire = async (req, res) => {
    try {
        const usersData = await User.find({});
        let questionireAnswersResult =  [];
        for(let user of usersData) {
            let questionireAnswers = await Answers.find({ user_id: mongoose.Types.ObjectId(user._doc._id)}).populate("questions_id").populate("questionire_id").exec();
            questionireAnswersResult.push({"user_Id" :  user._doc._id, 
            "questionireAnswers": questionireAnswers.map(q => q._doc)});
        }
        return res.status(200)
        .json({ msg: "Questionire answers response !!", questionireAnswersResult, res: "success", });
    } catch(err) {
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const addQuestions  = async (req, res) => {
    try {
        for(let que of req.body) {
            const {
                questionire_id,
                question,
                type,
                possibleAns
              } = que;
            const questions = new Questions({
                text: question,
                type: type,
                questionire_id: questionire_id,
                possible_answers: possibleAns
            });
            await questions.save();
        }
        return res.status(200)
        .json([{ msg: "Questions submitted!!", res: "success", }]);
    } catch(err) {
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const addQuestionire = async (req, res) => {
    try {
        const {
            isOpen,
            type,
            description
          } = req.body;
        const questionire = new Questionire({
            type: type,
            isOpen: isOpen,
            description: description
        });
        await questionire.save();
        return res.status(200)
        .json([{ msg: "Questionire submitted!!", res: "success", }]);
    } catch(err){
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const questionireId= req.params.questionireId;
        let questions = await Questions.find({questionire_idy: questionireId});
        return res.status(200).send({
            questions,
            messge: "Get all questions",
            success: true,
          });
    } catch(err){
        return res.status(400)
            .json([{ msg: err.message, res: "error" }]);
    }
}

module.exports = {
    submitQuestionire,
    getAllUsersQuestionire,
    addQuestions,
    addQuestionire,
    getAllQuestions
};