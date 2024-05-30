const express = require('express');
const router = express.Router();

//import in project
const userSignupController = require('../controller/user/userSignup');
const userSininController = require('../controller/user/userSignin');
const userSignInGoogleController = require('../controller/user/userSigninGoogle');
const userDetailController = require('../controller/user/userDetail');
const userLogoutController = require("../controller/user/userLogout");
const userListController = require("../controller/user/userList");
const userDeleteController = require("../controller/user/userDelete");
const userUpdateController = require("../controller/user/userUpdate");

const brandListController = require("../controller/brand/brandList");
const brandProductController = require("../controller/brand/brandProduct");
const brandDetailsController = require("../controller/brand/brandDetail");
const brandCreateController = require("../controller/brand/brandCreate");
const brandDeleteController = require("../controller/brand/brandDelete");
const brandUpdateController = require("../controller/brand/brandUpdate");

const productAllController = require("../controller/product/productList");
const productCreateController = require("../controller/product/productCreate");
const deleteProductController = require("../controller/product/productDelete");
const productUpdateController = require("../controller/product/productUpdate");
const productDetailsController = require("../controller/product/productDetail");
const productAllUserController = require("../controller/product/productListHome");
const productListSearchController = require("../controller/product/productListSearch");


const authToken = require('../middleware/authToken');



//use controller

//auth
router.post('/signup', userSignupController);
router.post('/signin', userSininController);
router.post('/google', userSignInGoogleController);
router.get('/logout', userLogoutController);
router.get('/user-detail', authToken, userDetailController);


//user admin
router.get("/all-user", authToken, userListController);
router.delete("/delete-user/:userId", authToken, userDeleteController);
router.put("/update-user/:id", authToken, userUpdateController);


//brand
router.get("/brand", authToken, brandListController);
router.get("/brand-product", authToken, brandProductController);
router.get("/brand/:id", authToken, brandDetailsController);
router.post("/brand/create", authToken, brandCreateController);
router.delete("/brand/delete/:id", authToken, brandDeleteController);
router.put("/brand/update/:id", authToken, brandUpdateController);



//product
router.get("/products", authToken, productAllController);
router.post("/product/create", authToken, productCreateController);
router.delete("/product/delete/:productId", authToken, deleteProductController);
router.put("/product/update/:productId", authToken, productUpdateController);

router.get("/product/:productId", productDetailsController);
router.get("/product", productAllUserController);


router.get("/search", productListSearchController);




module.exports = router;