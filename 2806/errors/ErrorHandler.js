class ErrorHandler extends Error {
  constructor(status, message, code) {
    super(message);
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

module.exports = ErrorHandler;
