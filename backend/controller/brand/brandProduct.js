const brandModel = require("../../models/brandModel");


async function brandProductController(req, res) {
  try {
    const brandProducts = await brandModel.find({status:true});
    res.json({
      message: "Get all brands have status true successfully",
      data: brandProducts,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = brandProductController;