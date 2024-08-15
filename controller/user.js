const fs = require("fs");
const model = require("../model/user");
const User = model.user;

exports.getAllUser = async (req, res) => {
  try {
    let pageSize = 2;
    let currentPage = req.query.pageSize;
    let skip = (currentPage - 1) * pageSize;
    const user = await User.find().skip(skip).limit(pageSize).exec();
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.getAllUserAsc = async (req, res) => {
  try {
    const sortOrder = req.query.order === "asc" ? -1 : 1;
    const searchQuery = req.query.search || "";
    const user = await User.find({
      lastName: { $regex: searchQuery, $options: "i" },
    }).sort({ firstName: sortOrder });
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("cart");
    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.replaceUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userIndex = await User.findOneAndReplace({ _id: id }, req.body);
    res.status(201).json({
      data: userIndex,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userIndex = await User.findOneAndUpdate({ _id: id }, req.body);
    res.status(201).json({
      data: userIndex,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userIndex = await User.findOneAndDelete({ _id: id });
    res.status(201).json({
      data: userIndex,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
