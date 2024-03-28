const { validationResult } = require("express-validator");

class HelperClass {
  static checkForValidationResult = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const newError = new Error("Invaild User Data");
      newError.statusCode = 422;
      newError.data = errors.array();
      throw newError;
    }
  };

  static throwError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };
}


module.exports = HelperClass;