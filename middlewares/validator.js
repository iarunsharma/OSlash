const mongoose = require('mongoose');
const userModel = require('../models/userModel')
const validator = require("email-validator");


const isvalid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.length === 0) return false
    return true;
}

const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidSyntaxOfEmail = function (value) {
    if (!(validator.validate(value))) {
        return false
    }
    return true
}

function isValidURL(string) {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }


//--------------------------------------------------------------------------------------------------------------------//

const checkuser = async (req, res, next) => {
    try {
        let requestBody = req.body;
        if (!isvalidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please Provide Data" })
        }
        const { userName, email, password, confirmPassword } = requestBody;

        if (!isvalid(userName)) {
            return res.status(400).send({ status: false, msg: "Please fill the userName" })
        }

        if (!isvalid(email)) {
            return res.status(400).send({ status: false, msg: "Please fill the email" })
        }

        if (!isValidSyntaxOfEmail(email)) {
            return res.status(404).send({ status: false, message: "Please provide a valid Email Id" });
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email });

        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })
        }

        if (!isvalid(password)) {
            return res.status(400).send({ status: false, msg: "Please fill the password" })
        }

        if (!isvalid(confirmPassword)) {
            return res.status(400).send({ status: false, msg: "Please fill the confirmPassword" })
        }
        if (confirmPassword !== password) {
            return res.status(400).send({ status: false, msg: "Please fill the same password" })
        }

        next();
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}


//-------------------------------------------------------------------------------------------------------------------//

module.exports = {
    isvalid, isvalidRequestBody, isValidObjectId, checkuser,isValidURL
}