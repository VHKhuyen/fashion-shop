const { ReasonStatus, StatusCodes } = require("./httpStatusCode");
const statusCodes = require("./httpStatusCode/statusCodes");

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reasonStatus = ReasonStatus.OK,
    metadata = {},
    options = {},
  }) {
    this.options = options;
    this.message = !message ? reasonStatus : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata, options = {} }) {
    super({ message, metadata, options });
  }
}

class Create extends SuccessResponse {
  constructor({
    message,
    statusCode = statusCodes.CREATED,
    reasonStatus = ReasonStatus.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, reasonStatus, metadata, options });
  }
}

module.exports = { Ok, Create };
