const express = require("express");
const request = require("supertest");
const path = require("path");
const routes = require("../routes/index.js");
const { execPath } = require("process");
const RESTRepository = require("../repositories/RESTRepository.js");
const controller = require("../controllers/index.js").user;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/${routes.user.basePath}`, routes.user.router);

jest.mock("../repositories/RESTRepository.js", () =>
  jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
);

describe("GET /user", () => {
  controller.repository.findAll.mockImplementationOnce(() => [
    {
      id: "",
      name: "user",
    },
  ]);
  test("success", (done) => {
    request(app)
      .get(`/${routes.user.basePath}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findAll.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.user.basePath}`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("GET /user/:id", () => {
  test("success", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => ({
      id: "",
      name: "User",
    }));
    request(app)
      .get(`/${routes.user.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.user.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("POST /user", () => {
  controller.repository.create.mockResolvedValueOnce({
    id: "",
    name: "User",
  });

  test("success", (done) => {
    request(app)
      .post(`/${routes.user.basePath}`)
      .send({
        name: "User",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .post(`/${routes.user.basePath}`)
      .send({
        name: "Us",
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .post(`/${routes.user.basePath}`)
      .send({
        name: "Userrrrrrrrrrrrrrrrrrrrrrr",
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (doesn't exist)", (done) => {
    request(app)
      .post(`/${routes.user.basePath}`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("PUT /user/:id", () => {
  controller.repository.update.mockImplementationOnce(() => jest.fn());

  test("success", (done) => {
    request(app)
      .put(`/${routes.user.basePath}/1`)
      .send({
        name: "User",
      })
      .expect(204, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .put(`/${routes.user.basePath}/1`)
      .send({
        name: "Us",
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .put(`/${routes.user.basePath}/1`)
      .send({
        name: "Userrrrrrrrrrrrrrrrrrrrrrr",
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (doesn't exist)", (done) => {
    request(app)
      .put(`/${routes.user.basePath}/1`)
      .send({})
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("DELETE /user/:id", () => {
  test("success", (done) => {
    controller.repository.delete.mockImplementationOnce(() => jest.fn());
    request(app).delete(`/${routes.user.basePath}/1`).expect(204, done);
  });
  test("failure", (done) => {
    controller.repository.delete.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app).delete(`/${routes.user.basePath}/1`).expect(500, done);
  });
});
