import { User } from "../../models/index.js";
import { SECRET } from "../../config/index.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const usersController = {
  async login(req, res) {
    try {
      const userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.json({ message: "invalid email id", status: false });
      }

      const match = await bcrypt.compare(req.body.password, userData.password);
      if (!match) {
        return res.json({ message: "invalid login password", status: false });
      }

      const token = Jwt.sign(
        { _id: userData._id, role: userData.role },
        SECRET
      );

      return res.status(200).json({
        token: token,
        status: true,
        message: "User login successful",
      });
    } catch (error) {
      return res.json({ message: error.message, status: false });
    }
  },

  async register(req, res) {
    const { name, email, password, role } = req.body;

    const exist = await User.exists({ email: email });

    try {
      if (exist) {
        return res.json({ message: "User exist", status: false });
      }
    } catch (error) {
      return res.json({ message: error.message, status: false });
    }

    let hashpassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashpassword,
      role,
    });
    let token;
    try {
      const result = await user.save();
      token = Jwt.sign({ _id: result._id, role: result.role }, SECRET);
    } catch (err) {
      return res.json({ status: false, message: err.message });
    }

    return res.json({
      status: true,
      token: token,
      message: "register success",
    });
  },
};

export default usersController;
