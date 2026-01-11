import { Router } from "express";

export default class BaseRouter {
  constructor(basePath, controller) {
    this.basePath = basePath;
    this.controller = controller;
    this.router = Router();
  }
}
