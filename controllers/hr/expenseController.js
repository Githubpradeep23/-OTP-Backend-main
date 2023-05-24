const { isEmpty } = require("lodash");
const expenseDb = require("../../models/hr/expense");
const mongoose = require('mongoose');

const submit = async (req, res) => {
    try {
        const { expense, description, billAmount, employeeId, status, gym_branch } = req.body;
        if ( isNaN(expense) ||  isNaN(billAmount) || isEmpty(employeeId)) {
            return res.status(400).json({
                message: "Empty Fields found. Either expense, billAmount, or employeeId is missing.",
                success: false,
            });
        }
        let expenseModel = {
            expense: Number(expense),
            description: isEmpty(description) ? undefined : description, 
            billAmount : Number(billAmount),
            employeeId,
            status: isEmpty(status) ? 'PENDING' : status,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch,
        };
        
        let expenseResponse = await expenseDb.create(expenseModel);
        return res.status(200).json({
          expense: expenseResponse,
          message: "Added new Expense Successfully",
          success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Expense Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteExpense = await expenseDb.deleteOne({ _id: id });
          if (
            deleteExpense["deletedCount"] === 0 ||
            deleteExpense === null ||
            deleteExpense === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Expense Not found ",
              success: true,
            });
          } else if (
            deleteExpense["deletedCount"] === 1 ||
            deleteExpense !== null ||
            deleteExpense !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Expense Deleted Successfully !!! ",
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
        let expenses = await expenseDb.find().populate('employeeId').populate('gym_branch').exec();
        if (
            expenses !== undefined &&
            expenses.length !== 0 &&
            expenses !== null
        ) {
          return res.status(200).send({
            expenses ,
            messge: "All expenses",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Expenses does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Something went wrong",
          success: false,
        });
      }
}

const getAllByEmployeeId = async (req, res) => {
    try {
        const userId = req.params['userId'];
        let expenses = await expenseDb.find({employeeId}).populate('employeeId').populate('gym_branch').exec();
        if (
            expenses !== undefined &&
            expenses.length !== 0 &&
            expenses !== null
        ) {
          return res.status(200).send({
            expenses ,
            messge: "All expenses by employeeId",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Expenses does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Something went wrong",
          success: false,
        });
      }
}

const updateStatus = async (req, res) => {
    try {
        const id = req.params['id'];
        const { status } = req.body;
        if(id === null || id === undefined || isEmpty(id) || isEmpty(status)) {
            return res.status(400).send({
                messge: "Please enter correct id and status",
                success: false,
              });
        }
        const updatedExpenseStatus = await expenseDb.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { $set: {status}}
        );
        if (
            updatedExpenseStatus.length === 0 ||
            updatedExpenseStatus === undefined ||
            updatedExpenseStatus === null ||
            updatedExpenseStatus === ""
        ) {
            return res.status(200)
                .json([{ msg: "Expense not found!!!", res: "error", }]);
        } else {
            const expenseData = await expenseDb.findOne({ _id: mongoose.Types.ObjectId(id) }).populate('employeeId').exec()
            return res.status(200)
                .json({ msg: "Expense status updated successflly", data: expenseData, res: "success" });
        }
    } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submit, deleteExpense, getAll, getAllByEmployeeId, updateStatus };