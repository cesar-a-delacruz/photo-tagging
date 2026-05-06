const express = require("express");
const request = require("supertest");
const path = require("path");
const routes = require("../routes/index.js");
const FileService = require("../services/FileService.js");
const { execPath } = require("process");
const ImageRepository = require("../repositories/ImageRepository.js");
const controller = require("../controllers/index.js").image;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/${routes.image.basePath}`, routes.image.router);

jest.mock("../services/FileService.js");
jest.mock("../repositories/ImageRepository.js", () =>
  jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  })),
);

describe("GET /image", () => {
  controller.repository.findAll.mockImplementationOnce(() => [
    {
      id: "",
      name: "Image",
      url: path.join(__dirname, "assets/sample1.webp"),
    },
  ]);
  test("success", (done) => {
    request(app)
      .get(`/${routes.image.basePath}`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findAll.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.image.basePath}`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("GET /image/:id", () => {
  test("success", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => ({
      id: "",
      name: "Image",
      url: path.join(__dirname, "assets/sample1.webp"),
    }));
    request(app)
      .get(`/${routes.image.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
  test("failure", (done) => {
    controller.repository.findOne.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app)
      .get(`/${routes.image.basePath}/1`)
      .expect("Content-Type", /json/)
      .expect(500, done);
  });
});

describe("POST /image", () => {
  FileService.upload.mockResolvedValueOnce({
    secure_url: path.join(__dirname, "assets/sample1.webp"),
  });

  controller.repository.create.mockResolvedValueOnce({
    id: "",
    name: "Image",
    url: path.join(__dirname, "assets/sample1.webp"),
  });

  test("success", (done) => {
    request(app)
      .post(`/${routes.image.basePath}`)
      .set("Content-Type", "multipart/form-data")
      .field({ name: "Image" })
      .attach("file", path.join(__dirname, "assets/sample1.webp"))
      .expect(201, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .post(`/${routes.image.basePath}`)
      .set("Content-Type", "multipart/form-data")
      .field({ name: "Im" })
      .attach("file", path.join(__dirname, "assets/sample1.webp"))
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .post(`/${routes.image.basePath}`)
      .set("Content-Type", "multipart/form-data")
      .field({ name: "Imageeeeeeeeeeeeeeeeeeeeee" })
      .attach("file", path.join(__dirname, "assets/sample1.webp"))
      .expect(422, done);
  });
  test("failure: file validation (size above 5MB)", (done) => {
    request(app)
      .post(`/${routes.image.basePath}`)
      .set("Content-Type", "multipart/form-data")
      .field({ name: "Image" })
      .attach("file", path.join(__dirname, "assets/sample2.png"))
      .expect(500, done);
  });
  test("failure: file validation (isn't an image)", (done) => {
    request(app)
      .post(`/${routes.image.basePath}`)
      .set("Content-Type", "multipart/form-data")
      .field({ name: "Image" })
      .attach("file", path.join(__dirname, "assets/sample3.txt"))
      .expect(500, done);
  });
});

describe("PUT /image/:id", () => {
  controller.repository.update.mockImplementationOnce(() => jest.fn());

  test("success", (done) => {
    request(app)
      .put(`/${routes.image.basePath}/1`)
      .send({ name: "Image1" })
      .expect(204, done);
  });
  test("failure: name validation (length below 3 characters)", (done) => {
    request(app)
      .put(`/${routes.image.basePath}/1`)
      .send({ name: "Im" })
      .expect(422, done);
  });
  test("failure: name validation (length above 25 characters)", (done) => {
    request(app)
      .put(`/${routes.image.basePath}/1`)
      .send({ name: "Imageeeeeeeeeeeeeeeeeeeeee" })
      .expect(422, done);
  });
});

describe("DELETE /image/:id", () => {
  FileService.delete.mockResolvedValueOnce({
    deleted: {},
  });
  test("success", (done) => {
    controller.repository.delete.mockImplementationOnce(() => jest.fn());
    request(app).delete(`/${routes.image.basePath}/1`).expect(204, done);
  });
  test("failure", (done) => {
    controller.repository.delete.mockImplementationOnce(() => {
      throw new Error();
    });
    request(app).delete(`/${routes.image.basePath}/1`).expect(500, done);
  });
});
