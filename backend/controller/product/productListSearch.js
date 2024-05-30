const brandModel = require("../../models/brandModel");
const productModel = require("../../models/productModel");

async function productListSearchController(req, res){
  try {
    const { search } = req.query;
    const query = { status: true }; 

    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }

    const products = await productModel.find(query).populate("brand");

    res.status(200).json({
      message: "Products search successfully",
      data: products,
      success: true,
      error: false,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}


module.exports = productListSearchController;