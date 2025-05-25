/**
 * api/utils/errors.js
 *
 * @description
 * Zentrale Definition eigener Fehlerklassen mit HTTP-Statuscodes.
 * Wird im gesamten Projekt für konsistente Fehlerbehandlung verwendet.
 */

class CustomError extends Error {
    constructor(message, status) {
      super(message);
      this.name = this.constructor.name;
      this.status = status || 500;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message = 'Ungültige Anfrage') {
      super(message, 400);
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Nicht gefunden') {
      super(message, 404);
    }
  }
  
  class UnauthorizedError extends CustomError {
    constructor(message = 'Nicht autorisiert') {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends CustomError {
    constructor(message = 'Zugriff verweigert') {
      super(message, 403);
    }
  }
  
  class ConflictError extends CustomError {
    constructor(message = 'Konflikt') {
      super(message, 409);
    }
  }
  
  module.exports = {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError
  };
  