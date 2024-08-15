const fs = require("fs");
const model = require("../model/product");
const Product = model.product;
// const { products } = JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.createProducts = async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;
  try {
    const product = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
      thumbnail,
      images,
    });
    const doc = await product.save();
    res.status(201).json({
      data: doc,
    });
  } catch (err) {
    res.status(501).json({
      error: err.message,
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    let query = Product.find();
    let pageSize = 2;
    let currentPage = req.query.page;
    let skip = (currentPage - 1) * pageSize;
    if (req.query && req.query.sort) {
      const products = await query
        .sort({ [req.query.sort]: req.query.order })
        .skip(skip)
        .limit(pageSize)
        .exec(); // { price: { $gt: 500 } } finde k ander ye lgane se price k according fillter kr skte h
      res.status(200).json({
        data: products,
      });
    } else if (req.query.page) {
      const products = await query.skip(skip).limit(pageSize).exec();
      res.status(200).json({
        data: products,
      });
    } else {
      const products = await query.exec();
      res.status(200).json({
        data: products,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).json({
      data: products,
    });
  } catch (err) {
    res.status(501).json({
      error: err.message,
    });
  }
};

exports.replaceProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOneAndReplace({ _id: id }, req.body);

    res.status(201).json({
      data: products,
    });
  } catch (err) {
    res.status(402).json();
  }
};
exports.updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOneAndUpdate({ _id: id }, req.body);

    res.status(201).json({
      data: products,
    });
  } catch (err) {
    res.status(402).json();
  }
};
exports.deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOneAndDelete({ _id: id });
    res.status(201).json({
      data: products,
    });
  } catch (err) {
    res.status(402).json();
  }
};
