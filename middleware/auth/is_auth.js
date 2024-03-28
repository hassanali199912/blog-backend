const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("No Authenticated");
      error.stateusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("No Authenticated");
      error.stateusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    error.stateusCode = 500;
    next(error);
  }
};

module.exports = checkToken;
