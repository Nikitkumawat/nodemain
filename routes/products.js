const express = require("express");
const productsController = require("../controller/products");

const router = express.Router();

router
  .post("/", productsController.createProducts)
  .get("/", productsController.getAllProducts)
  .get("/:id", productsController.getProducts)
  .put("/:id", productsController.replaceProducts)
  .patch("/:id", productsController.updateProducts)
  .delete("/:id", productsController.deleteProducts);

exports.router = router;
