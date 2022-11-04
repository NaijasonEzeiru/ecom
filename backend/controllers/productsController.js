const Prisma = require("@prisma/client").PrismaClient;

const prisma = new Prisma();

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(allProducts);
  } catch (error) {
    next(error);
  }
};

exports.addNewProduct = async (req, res) => {
  const newProduct = ({ name, price, desc } = req.body);
  if (!name || !price || !desc) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    try {
      const addNewProduct = await prisma.product.create({
        data: newProduct,
      });
      res.status(201).json(addNewProduct);
    } catch (error) {
      res.json(error);
    }
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await prisma.product.update({
      where: {
        id: req.body.id,
      },
      data: {},
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
  res.json();
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        category: true,
      },
    });
    if (!product) {
      return res.status(400).json({ message: "Product does not exist" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};
