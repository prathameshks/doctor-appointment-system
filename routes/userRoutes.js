const express = require("express");
const { loginController, registerController, authController,applyDoctorController } = require("../controllers/userCtrl");
const authMiddleware = require("../middleware/authMiddleware");

// router object
const router = express.Router();

// routes
// login POST
router.post('/login', loginController);

// register POST
router.post('/register', registerController);

// Auth POST
router.post('/getUserData', authMiddleware, authController);

// Apply Doctor POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

module.exports = router;