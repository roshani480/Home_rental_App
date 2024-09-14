const express = require("express");
const router = express.Router();
const Users = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/hi", (req, res) => {
  res.send("hello world");
});

router.post("/register", upload.single("profileImage"), async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  const profileImage = req.file;

  const profileImagePath = profileImage.path;

  console.log(profileImage);
  if (!profileImage) {
    return res.status(400).send("No file uploaded");
  }

  //creating hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Users.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    confirmpassword,
    profileImagePath,
  });
  console.log(newUser);
  res.send("user added successfully");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExist = await Users.findOne({ email });
  if (!userExist) {
    console.log("user does not exist");
  }

  //password check

  const isMatch = await bcrypt.compare(password, userExist.password); //sequence of password followed
  // by userexist.password is important
  if (!isMatch) {
    res.status(404).send("incorrect password");
  }

  //using JWT token
  const token = jwt.sign({ email: userExist.email }, "secret_key", {
    expiresIn: "1h",
  });

  res.send({ token, userExist });
});

router.get("/addtocart", (req, res) => {
  const token = req.header("Authorization")?.split("")[1];

  jwt.verify(token, "secret_key");

  res.send(token);
});

module.exports = router;
