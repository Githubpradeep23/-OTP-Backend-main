const { isEmpty } = require("lodash");
const workout = require("../../models/trainer/workout");
const mongoose = require('mongoose');

const mapActivity = (activities) => {
    let sets = [];
    for(let activity of activities) {
        if(!isEmpty(activity.exercise) && !isNaN(activity.reps)) {
            sets.push({
                exercise: activity.exercise,
                reps: activity.reps
            })
        }
    }
    return sets;
}

const submit = async (req, res) => {
    try {
        const { day, name, set1, numberOfRounds1, set2, numberOfRounds2, gym_branch } = req.body;
        if (isEmpty(day) || isEmpty(set1) || isNaN(numberOfRounds1) || isEmpty(set2) || isNaN(numberOfRounds2)) {
            return res.status(400).json({
                message: "Empty Fields found. Either day, set1, numberOfRounds1, set2 or numberOfRounds2 is missing.",
                success: false,
            });
        }
        let workoutModel = {
            day,
            numberOfRounds1,
            numberOfRounds2,
            name: !isEmpty(name) ? name : undefined,
            set1: mapActivity(JSON.parse(set1)),
            set2: mapActivity(JSON.parse(set2)),
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        
        let workoutResponse = await workout.create(workoutModel);
        return res.status(200).json({
          workout: workoutResponse,
          message: "Added New Workout Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Workout Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteWorkout= await workout.deleteOne({ _id: id });
          if (
            deleteWorkout["deletedCount"] === 0 ||
            deleteWorkout === null ||
            deleteWorkout === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Workout Not found ",
              success: true,
            });
          } else if (
            deleteWorkout["deletedCount"] === 1 ||
            deleteWorkout !== null ||
            deleteWorkout !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Workout deleted Successfully !!! ",
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
        let workouts = await workout.find().populate({ path: 'set1',
            populate: [{ path: 'exercise', model: 'Exercise'}]
        }).populate({ path: 'set2',
            populate: [{ path: 'exercise', model: 'Exercise'}]
        }).populate('gym_branch');
        if (
            workouts !== undefined &&
            workouts.length !== 0 &&
            workouts !== null
        ) {
          return res.status(200).send({
            workouts ,
            messge: "All Workouts by day",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Workouts does not exist",
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

const getAllWorkoutsByDay = async (req, res) => {
    try {
        const day = req.params['day'];
        let workoutByDay = await workout.findOne({ day }).populate({ path: 'set1',
        populate: [{ path: 'exercise', model: 'Exercise'}]
        }).populate({ path: 'set2',
            populate: [{ path: 'exercise', model: 'Exercise'}]
        }).populate('gym_branch');
        if (
            workoutByDay !== undefined &&
            workoutByDay.length !== 0 &&
            workoutByDay !== null
        ) {
          return res.status(200).send({
            workoutByDay ,
            messge: "All Workout by day",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Workout does not exist",
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

const updateWorkout = async (req, res) => {
    try {
        const { workoutId, day, name, set1, numberOfRounds1, set2, numberOfRounds2, gym_branch } = req.body;
        if (!workoutId) {
            return res.status(400)
                .json([{ msg: "Workout ID is required", res: "error", }]);
        }
        const updateWorkout = {}
        const workoutExists = await workout.findOne({ _id: mongoose.Types.ObjectId(workoutId) });
        if (isEmpty(workoutExists)) {
            return res.status(400)
                .json([{ msg: "Workout not found.", res: "error", }]);
        }
        updateWorkout.day = isEmpty(day) ? undefined : day;
        updateWorkout.name = isEmpty(name) ? undefined : name;
        updateWorkout.set1 = isEmpty(set1) ? undefined : mapActivity(JSON.parse(set1));
        updateWorkout.set2 = isEmpty(set2) ? undefined : mapActivity(JSON.parse(set2));
        updateWorkout.numberOfRounds1 = isNaN(numberOfRounds1) ? 0 : Number(numberOfRounds1);
        updateWorkout.numberOfRounds2 = isNaN(numberOfRounds2) ? 0 : Number(numberOfRounds2);
        updateWorkout.gym_branch = isEmpty(gym_branch) ? undefined : gym_branch;
        
        let updatedWorkout = await workout.findOneAndUpdate(
            { _id: workoutId },
            { $set : updateWorkout}
        );
        if (
            updatedWorkout.length === 0 ||
            updatedWorkout === undefined ||
            updatedWorkout === null ||
            updatedWorkout === ""
        ) {
            return res.status(200)
                .json([{ msg: "Workout not found!!!", res: "error", }]);
        } else {
            const workoutData = await workout.findOne({ _id: workoutId })
            return res.status(200)
                .json([{ msg: "Workout updated successflly", data: workoutData, res: "success" }]);
        }
    } catch(err) {
      return res.status(500)
              .json([{ msg: err.message, res: "error" }]);
    }
}

module.exports = { submit, deleteWorkout, getAll, getAllWorkoutsByDay, updateWorkout };