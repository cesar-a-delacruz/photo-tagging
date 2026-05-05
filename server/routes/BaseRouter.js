const { Router } = require("express");

module.exports = class BaseRouter {
  constructor(basePath, controller) {
    this.basePath = basePath;
    this.controller = controller;
    this.router = Router();
  }
};
