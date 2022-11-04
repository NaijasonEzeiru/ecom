const Prisma = require("@prisma/client").PrismaClient;
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const prisma = new Prisma();

exports.registerUser = async (req, res) => {
  const { password, first_name, last_name, email } = req.body;
  if (!password || !first_name || !last_name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  } else {
    try {
      const register = await prisma.user.create({
        data: {
          password_hash: CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET
          ).toString(),
          first_name,
          last_name,
          email,
        },
      });
      res.status(201).json(register);
    } catch (error) {
      if (error.code === "P2002") {
        return res
          .status(500)
          .json({ message: "A user with this email already exists" });
      }
      res.status(500).json({ error, message: error.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    !user && res.status(401).json("Email address is not registered");
    const { password_hash, ...rest } = user;
    const unhashedPassword = CryptoJS.AES.decrypt(
      password_hash,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);
    if (password !== unhashedPassword) {
      res.status(401).json({ message: "Incorrect email or password" });
    } else {
      const accessToken = jwt.sign(
        {
          id: user.id,
          is_admin: user.is_admin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(201)
        .json({ ...rest, Message: "logged in successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.logout = () => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "You have successfully logged out" });
};
