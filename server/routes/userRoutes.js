const { Router } = require("express");
const controller = require("../controller/user-controller");
const { protect } = require("../middleware/auth-middleware");
const router = Router();

router.route("/").post(controller.registerUser);
router.route("/login").post(controller.loginUser);
router.route("/me").get(protect, controller.getMe);

module.exports = router;
