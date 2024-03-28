const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HelperClass = require("../../util/helper");

const User = require("../../models/users");
const Post = require("../../models/post");

const login = async (req, res, next) => {
  try {
    HelperClass.checkForValidationResult(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      HelperClass.throwError(404, "Data not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      HelperClass.throwError(401, "Invalid credentials");
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token: token,
        expiresIn: (decode.exp - decode.iat) * 1000,
        createdat: decode.iat * 1000,
        expireeDate: decode.exp * 1000,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const singup = async (req, res, next) => {
  try {
    HelperClass.checkForValidationResult(req);
    const { name, email, password } = req.body;
    const imageUrl =
      "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png";

    const hashPassword = await bcrypt.hash(password, 12);

    const createNewUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      image: imageUrl,
    });

    await createNewUser.save();

    const token = jwt.sign(
      {
        userId: createNewUser._id.toString(),
        name: createNewUser.name,
        email: createNewUser.email,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: {
        token: token,
        expiresIn: (decode.exp - decode.iat) * 1000,
        createdat: decode.iat * 1000,
        expireeDate: decode.exp * 1000,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      HelperClass.throwError(404, "Data not found");
    }

    const userPostes = await Post.find({ auther: req.userId });

    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: {
        user: user,
        posts: userPostes,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const { feild, value } = req.body;
    console.log(feild, value);
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      HelperClass.throwError(404, "Data not found");
    }

    if (feild === "name") {
      user.$set({ name: value });
    } else if (feild === "image") {
      user.$set({ image: value });
    } else if (feild === "password") {
      const isPasswordCorrect = await bcrypt.compare(value.old, user.password);
      if (!isPasswordCorrect) {
        HelperClass.throwError(401, "Invalid credentials");
      }

      const hashPassword = await bcrypt.hash(value.new, 12);
      user.$set({ password: hashPassword });
    } else {
      HelperClass.throwError(404, "Data not found");
    }

    await user.save();
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = {
  login,
  singup,
  getUser,
  updateUser,
};
