const express = require("express");
const router = express.Router();

const agencyController = require("../Controller/profileController");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/", agencyController.registerProfile);
router.get("/", agencyController.getAllProfile);
router.delete("/delete", agencyController.deleteProfile);
router.get("/:id", agencyController.getProfileById);

const carRoute = router;
module.exports = carRoute;
