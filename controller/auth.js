const jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.user;
const fs = require("fs");
const privateKey = fs.readFileSync("./private.key", "utf-8");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    var token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
    });
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      token,
    });

    const doc = await user.save();
    res.status(201).json({
      data: token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      await doc.save();
      res.json(token);
    } else {
      res.sendStatus(500).json({
        error: err.message,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
