import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    next(err);
  }
};

const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // generate token
      let token = jwt.sign({ userId: user._id }, "12345", {
        expiresIn: "1d",
      });

      res.cookie("jwt", token, {
        secure: false,
        sameSite: "strict", //prevent csrf attacks
        maxage: 60 * 60 * 1000, //1 day in milliseconds
        httpOnly: true, //after login ,jwt is stored in the frontend;s cookies as httplOnly cookie,so request after login will be attatched with the jwt token stored in the cookies
      });
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email and password");
    }
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
};

export { registerUser, authUser, logout };
