const express = require("express");
const router = express.Router();

const userController = require("../Controller/userController");
const authmiddleware = require("../middleware/authmiddleware");

router.get("/", userController.users);
router.post("/login", authmiddleware.protect, userController.authUser);
router.post("/register", authmiddleware.protect, userController.registerUser);
router.post("/update", userController.updateProfile);
router.post("/filter", userController.filterUsers);
router.post("/test", userController.filter);
router.get("/:id", userController.getUser);

const userRoute = router;
module.exports = userRoute;
