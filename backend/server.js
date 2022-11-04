const express = require("express");
const app = express();
const corsOptions = require("./config/corsOptions");
const path = require("path");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const productRouter = require("./routes/api/products");
const registerRouter = require("./routes/api/auth");
const userRouter = require("./routes/api/user");

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("I Love you");
});
app.use("/products", productRouter);
app.use("/auth", registerRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log("server running on port: " + PORT));

module.exports = app;
