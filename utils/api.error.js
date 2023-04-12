class ApiError extends Error {
    constructor(message, statusCode) {
      super();
      this.statusCode = statusCode;
      this.message=message
      this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
    }
  }
  
  module.exports = ApiError;
  