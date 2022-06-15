const express = require("express");
const router = express.Router();

const userController = require("../Controller/userController");
const authmiddleware = require("../middleware/authmiddleware");

router.get("/", userController.users);
router.post("/login", authmiddleware.protect, userController.authUser);
router.post("/register", authmiddleware.protect, userController.registerUser);
router.get("/:id", userController.getUser);

const userRoute = router;
module.exports = userRoute;
