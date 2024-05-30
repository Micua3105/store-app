const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token; //optional chaining (?.) để tránh lỗi nếu req.cookies không tồn tại.
    if (!token) {
       return res.status(200).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }
    
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) { //wt.verify() để xác thực token, allback để xử lý kết quả xác thực
      if (err) {
        console.log("error auth", err);
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
