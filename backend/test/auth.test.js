const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

jest.mock("../models/user");

describe("Auth Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Auth routes", () => {
    it("should register a new user", async () => {
      const mockUser = {
        _id: mongoose.Types.ObjectId(),
        username: "allanbinga",
        email: "allanbinga@gmail.com",
        password: await bcrypt.hash("password123", 10),
      };

      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const response = (await request(app).post("/api/auth/register")).send({
        username: "allanbinga",
        email: "allanbinga@gmail.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        username: "allanbinga",
        email: "allanbinga@gmail.com",
      });
    });
  });
});
