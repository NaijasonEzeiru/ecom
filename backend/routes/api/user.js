const {
  verifyToken,
  verifyTokenAndAuth,
} = require("../../controllers/verifyToken");
const { updateUser } = require("../../controllers/usersController");

const router = require("express").Router();

router.route("/");

router.route("/:id").get().put(verifyTokenAndAuth, updateUser);

module.exports = router;
