const { isEmpty } = require("lodash");
const exercise = require("../../models/trainer/exercise");

const submit = async (req, res) => {
    try {
        const { name, type, bodyPart, gym_branch } = req.body;
        if ( isEmpty(name)) {
            return res.status(400).json({
                message: "Empty Fields found. Either employee_role or totalLeaves is missing.",
                success: false,
            });
        }
        let exerciseModel = {
            name,
            type: !isEmpty(type) ? type : undefined,
            bodyPart: !isEmpty(bodyPart) ? bodyPart : undefined,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        
        let exerciseResponse = await exercise.create(exerciseModel);
        return res.status(200).json({
          exercise: exerciseResponse,
          message: "Added New Exercise Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteExercise = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Exercise Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteExercise = await exercise.deleteOne({ _id: id });
          if (
            deleteExercise["deletedCount"] === 0 ||
            deleteExercise === null ||
            deleteExercise === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Exercise Not found ",
              success: true,
            });
          } else if (
            deleteExercise["deletedCount"] === 1 ||
            deleteExercise !== null ||
            deleteExercise !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Exercise Deleted Successfully !!! ",
              success: true,
            });
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Something went wrong",
          success: false,
        });
      }
}

const getAll = async (req, res) => {
    try {
        let exercises = await exercise.find().populate('gym_branch');
        if (
            exercises !== undefined &&
            exercises.length !== 0 &&
            exercises !== null
        ) {
          return res.status(200).send({
            exercises ,
            messge: "All Exercises",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Exercises does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submit, deleteExercise, getAll };