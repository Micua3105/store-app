const userModel = require("../../models/userModel");

async function userUpdateController(req, res) {
  const { id } = req.params;
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      message: "Role and name are required",
      error: true,
      success: false,
    });
  }


  try {
    const updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { role, name },
      },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updateUser,
      message: "User updated successfully",
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

module.exports = userUpdateController;
