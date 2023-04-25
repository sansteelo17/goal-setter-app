const { Router } = require("express");
const controller = require("../controller/goals-controller");
const { protect } = require("../middleware/auth-middleware");
const router = Router();

router
  .route("/")
  .get(protect, controller.getAllGoals)
  .post(protect, controller.createGoal);
router
  .route("/:id")
  .put(protect, controller.updateGoal)
  .delete(protect, controller.deleteGoal);

module.exports = router;
