const express = require("express");
const request = require("supertest");
const path = require("path");
const routes = require("../routes/index.js");
const { execPath } = require("process");
const RESTRepository = require("../repositories/RESTRepository.js");
const controller = require("../controllers/index.js").object;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/${routes.object.basePath}`, routes.object.router);

jest.mock("../repositories/RESTRepository.js", () =>
  jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
);

describe("GET /object", () => {
  controller.repository.findAll.mockImplementationOnce(() => [
    {
      id: "",
      name: "Object",
      position: { x: 1, y: 2 },
      imageId: 1,
    },
  ]);
  test("success", (done) => {
    request(app)
      .get(`/${routes.object.basePath}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findAll.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.object.basePath}`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("GET /object/:id", () => {
  test("success", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => ({
      id: "",
      name: "Object",
      position: { x: 1, y: 2 },
      imageId: 1,
    }));
    request(app)
      .get(`/${routes.object.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.object.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("POST /object", () => {
  controller.repository.create.mockResolvedValueOnce({
    id: "",
    name: "Object",
    position: { x: 1, y: 2 },
    imageId: 1,
  });

  test("success", (done) => {
    request(app)
      .post(`/${routes.object.basePath}`)
      .send({
        name: "Object",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .post(`/${routes.object.basePath}`)
      .send({
        name: "Ob",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .post(`/${routes.object.basePath}`)
      .send({
        name: "Objecttttttttttttttttttttt",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: position validation (doesn't exist)", (done) => {
    request(app)
      .post(`/${routes.object.basePath}`)
      .send({
        name: "Object",
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("PUT /object/:id", () => {
  controller.repository.update.mockImplementationOnce(() => jest.fn());

  test("success", (done) => {
    request(app)
      .put(`/${routes.object.basePath}/1`)
      .send({
        name: "Object",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect(204, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .put(`/${routes.object.basePath}/1`)
      .send({
        name: "Ob",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .put(`/${routes.object.basePath}/1`)
      .send({
        name: "Objecttttttttttttttttttttt",
        position: `{ "x": "1", "y": "2" }`,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: position validation (doesn't exist)", (done) => {
    request(app)
      .put(`/${routes.object.basePath}/1`)
      .send({
        name: "Object",
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("DELETE /object/:id", () => {
  test("success", (done) => {
    controller.repository.delete.mockImplementationOnce(() => jest.fn());
    request(app).delete(`/${routes.object.basePath}/1`).expect(204, done);
  });
  test("failure", (done) => {
    controller.repository.delete.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app).delete(`/${routes.object.basePath}/1`).expect(500, done);
  });
});
