const PrismaClient = require("@prisma/client").PrismaClient;
const CryptoJS = require("crypto-js");

const prisma = new PrismaClient();

// const getUser = (res, req) => {
//     const user = await prisma.user.findUnique
// }

exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  const { ...all } = req.body;
  console.log(all);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: all,
    });
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err, message: "Operation failed" });
  }
};
