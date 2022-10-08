const express = require("express");
const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
    // console.log(token);
    //Authorization: 'Bearer TOKEN'
    if (!req.headers.authorization) {
        return res.status(200)
        .json([{ msg: "Token has not been provided.", res: "error", }]);
    } else {
        try {
            const token = req.headers.authorization.split(' ')[1];

            const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (verified) {
                next()

            } else {
                return res.status(401)
                    .json([{ msg: error.message, res: "error" }]);
            }
        } catch (error) {
            return res.status(401)
                .json([{ msg: error.message, res: "error" }]);
        }

    }


}
module.exports = { verifytoken };