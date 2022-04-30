const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("../middlewares/validator");

//======================== Create users =================================================================================//

const createUser = async function (req, res) {
  try {
    let requestBody = req.body;
    const { userName, email, password, confirmPassword } = requestBody;
    const userData = { userName, email, password, confirmPassword };
    const user = await userModel.create(userData);
    res
      .status(201)
      .send({ status: true, message: "user created sucessfully", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};

//======================== log in users =================================================================================//

const login = async function (req, res) {
  try {
    userEmail = req.body.email;
    userPassword = req.body.password;
    let user = await userModel.findOne({
      email: userEmail,
      password: userPassword,
    });

    if (user) {
      let payload = { userId: user._id, email: user.email };
      const generatedToken = jwt.sign(payload, "Oslash");
      res.status(200).send({
        Message: " you have logged in Succesfully",
        YourId: user._id,
        token: generatedToken,
      });
    } else {
      res
        .status(400)
        .send({ status: false, message: "Oops...Invalid credentials" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//======================== EXPORTS =================================================================================//


module.exports={createUser ,login }