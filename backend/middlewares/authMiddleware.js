import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorsied,Invalid Token");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorsied,No Token");
    }
  } catch (err) {
    next(err);
  }
};

export { protect };
