const router = require("express").Router();
const {
  getAllProducts,
  addNewProduct,
  deleteProduct,
  getProduct,
} = require("../../controllers/productsController");
const { verifyAdmin } = require("../../controllers/verifyToken");

router
  .route("/")
  .get(getAllProducts)
  .post(verifyAdmin, addNewProduct)
  .delete(verifyAdmin, deleteProduct);
// .put(updateProduct)

router.route("/:id").get(getProduct);

module.exports = router;
