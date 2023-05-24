const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    reps: {
      type: Number,
      required: true,
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Exercise',
    },
}, { autoIndex: false, autoCreate: false });

new mongoose.model("Activity", activitySchema);

const workoutSchema = new mongoose.Schema({
    set1: {
        type: [activitySchema],
        required: true,
    },
    numberOfRounds1: {
        type: Number,
        required: true
    },
    set2: {
        type: [activitySchema],
        required: true,
    },
    numberOfRounds2: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    gym_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_BRANCH' },
});

const workout = new mongoose.model("Workout", workoutSchema);
module.exports = workout;