const { connect } = require("mongoose");
require("dotenv").config();
const Products = require("./schema");
const getProducts = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const products = await Products.find();
    res.json({ products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postProducts = async (req, res) => {
  const {
    productName,
    thumbnail,
    description,
    price,
    category,
    brand,
    images,
  } = req.body;

  if (
    !productName ||
    !thumbnail ||
    !description ||
    !price ||
    !category ||
    !brand ||
    !images
  ) {
    res.status(400).json({ message: "Invalid Payload" });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      const checkExisting = await Products.exists({ productName });
      if (checkExisting) {
        res.status(403).json({ message: "Product Already Exists" });
      } else {
        await Products.create({
          productName,
          thumbnail,
          description,
          price,
          category,
          brand,
          images,
        });
        const products = await Products.find();
        res.status(201).json({
          message: "Product Created Successfully",
          products,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const ProductbyBrand = async (req, res) => {
  const { brand } = req.params;
  if (!brand) {
    res.status(403).json({ message: "Please Give BrandName" });
  } else {
    await connect(process.env.MONGO_URI);
    const products = await Products.find({ brand });
    res.json({ products });
  }
};

const ProductbyCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    res.status(403).json({ message: "Please Give Category Name" });
  } else {
    await connect(process.env.MONGO_URI);
    const products = await Products.find({ category });
    res.json({ products });
  }
};

const ProductbyId = async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    res.status(403).json({ message: "Please Give Product id" });
  } else {
    await connect(process.env.MONGO_URI);
    const products = await Products.findOne({ _id });
    res.json({ products });
  }
};
const deletePro = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    res.status(400).json({
      message: "Please give the PRODUCT ID",
    });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      await Products.deleteOne({ _id });
      const allproducts = await Products.find();

      res.json({
        message: "Successfully Deleted",
        products: allproducts,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};

const updatePro = async (req, res) => {
  const { _id, productName, description, price, category, brand } = req.body;

  const filter = { _id };
  const update = { productName, description, price, category, brand };
  if (!_id) {
    res.status(400).json({
      message: "Please give the product ID",
    });
  } else {
    try {
      await connect(process.env.MONGO_URI);
      await Products.findOneAndUpdate(filter, update, { new: true });
      const allproducts = await Products.find();

      res.json({
        message: "Sucess",
        products: allproducts,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
};

const AddReviews = async (req, res) => {
  try {
    const { _id, Review, UserEmail, Rating } = req.body;
    await connect(process.env.MONGO_URI);
    const product = await Products.findOne({ _id });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      product.reviews.push({
        review: Review,
        userEmail: UserEmail,
        rating: Rating,
      });

      // Save the updated product with the new review
      await product.save();

      res.status(201).json({ message: "Review added successfully", product });

      // res.json({
      //     product
      // })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AddReviews,
  getProducts,
  postProducts,
  ProductbyBrand,
  ProductbyCategory,
  ProductbyId,
  deletePro,
  updatePro,
};
