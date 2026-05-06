const express = require("express");
const request = require("supertest");
const path = require("path");
const routes = require("../routes/index.js");
const { execPath } = require("process");
const ScoreRepository = require("../repositories/ScoreRepository.js");
const controller = require("../controllers/index.js").score;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/${routes.score.basePath}`, routes.score.router);

jest.mock("../repositories/ScoreRepository.js", () =>
  jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
);

describe("GET /score/user/:userId", () => {
  controller.repository.findAll.mockImplementationOnce(() => [
    {
      id: "",
      record: "00:00",
      userId: 1,
      imageId: 1,
    },
  ]);
  test("success", (done) => {
    request(app)
      .get(`/${routes.score.basePath}/user/1`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findAll.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.score.basePath}/user/1`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("GET /score/user/:userId/image/:imageId", () => {
  test("success", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => ({
      id: "",
      record: "00:00",
      userId: 1,
      imageId: 1,
    }));
    request(app)
      .get(`/${routes.score.basePath}/user/1/image/1`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.score.basePath}/user/1/image/1`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("POST /score", () => {
  controller.repository.create.mockResolvedValueOnce({
    id: "",
    record: "00:00",
    userId: 1,
    imageId: 1,
  });

  test("success", (done) => {
    request(app)
      .post(`/${routes.score.basePath}`)
      .send({
        record: "00:00",
        userId: 1,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
  test("failure: record validation (length above 8 characters)", (done) => {
    request(app)
      .post(`/${routes.score.basePath}`)
      .send({
        record: "00:000000",
        userId: 1,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: userId validation (doesn't exist)", (done) => {
    request(app)
      .post(`/${routes.score.basePath}`)
      .send({
        record: "00:00",
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("PUT /score/:id", () => {
  controller.repository.update.mockImplementationOnce(() => jest.fn());

  test("success", (done) => {
    request(app)
      .put(`/${routes.score.basePath}/1`)
      .send({
        record: "00:00",
        userId: 1,
        imageId: 1,
      })
      .expect(204, done);
  });
  test("failure: record validation (length above 8 characters)", (done) => {
    request(app)
      .put(`/${routes.score.basePath}/1`)
      .send({
        record: "00:000000",
        userId: 1,
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
  test("failure: userId validation (doesn't exist)", (done) => {
    request(app)
      .put(`/${routes.score.basePath}/1`)
      .send({
        record: "00:00",
        imageId: 1,
      })
      .expect("Content-Type", /json/)
      .expect(422, done);
  });
});

describe("DELETE /score/:id", () => {
  test("success", (done) => {
    controller.repository.delete.mockImplementationOnce(() => jest.fn());
    request(app).delete(`/${routes.score.basePath}/1`).expect(204, done);
  });
  test("failure", (done) => {
    controller.repository.delete.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app).delete(`/${routes.score.basePath}/1`).expect(500, done);
  });
});
