"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuth = exports.checkAdminAuth = void 0;

var _jwt = require("../helpers/jwt");

const checkAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    const payload = (0, _jwt.decodeToken)(token);

    if (payload) {
      return next();
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Not Authorized"
      });
    }
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not Authorized , please login"
    });
  }
};

exports.checkAuth = checkAuth;

const checkAdminAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    const payload = (0, _jwt.decodeToken)(token);

    if (payload) {
      if (payload.role == "admin") {
        return next();
      } else {
        return res.status(401).json({
          status: "fail",
          message: "You don't have permission to perform this action"
        });
      }
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Not Authorized"
      });
    }
  } else {
    return res.status(401).json({
      status: "fail",
      message: "Not Authorized , please login"
    });
  }
};

exports.checkAdminAuth = checkAdminAuth;