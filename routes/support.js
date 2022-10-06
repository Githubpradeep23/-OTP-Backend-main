const express = require("express");
const Question = require("../models/support");
const supportRouter = express.Router();

// create one quiz question
supportRouter.post("/addQuestions", async (req, res) => {
  try {
    const { description, alternatives } = req.body;
    if (
      description !== "" &&
      description !== undefined &&
      description !== null &&
      alternatives !== null &&
      alternatives !== undefined &&
      alternatives !== ""
    ) {
      const question = await Question.create({
        description,
        alternatives,
      });
      return res.status(200).json({
        question,
        message: "Add Question Successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Empty Field found. Id And Image field are required !!!",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// get all quiz questions
supportRouter.get("/getAllQuestions", async (req, res) => {
  try {
    const questions = await Question.find();
    if (
      questions.length === 0 ||
      questions === undefined ||
      questions === null
    ) {
      return res.status(200).json({
        questions,
        message: "Question Not Exist",
        success: false,
      });
    } else {
      return res.status(200).json({
        questions,
        message: "Get All Qestions Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// get one quiz question
supportRouter.get("/getQuestion/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("🚀 ~ file: support.js ~ line 73 ~ supportRouter.get ~ _id", _id)

    const question = await Question.findOne({ _id });
    if (!question) {
      return res.status(200).json({
        question,
        message: "Qestion Not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        question,
        message: "Get Question Successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// update one quiz question
supportRouter.put("/updateQuestion/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const { description, alternatives } = req.body;

    let question = await Question.findOne({ _id });

    if (!question) {
      question = await Question.create({
        description,
        alternatives,
      });
      return res.status(200).json({
        question,
        message: "Qestion Not found",
        success: false,
      });
    } else {
      question.description = description;
      question.alternatives = alternatives;
      await question.save();
      return res.status(200).json({
        question,
        message: "Question Updated",
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

// delete one quiz question
supportRouter.delete("/deleteQuestion/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const question = await Question.deleteOne({ _id });

    if (question.deletedCount === 0) {
      return res.status(200).json({
        message: "Question Not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "Delete Question",
        success: true,
      });
    }
  } catch (error) {
    return res.status(200).send({
      messge: "Somethig went wrong",
      success: false,
    });
  }
});

module.exports = supportRouter;
