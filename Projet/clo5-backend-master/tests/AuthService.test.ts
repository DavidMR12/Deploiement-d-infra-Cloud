import { AuthService } from "../src/Service/AuthService";

describe("AuthService", () => {
  it("should authenticate a user", () => {
    process.env.ADMIN_PASSWORD = "test";
    const req = {
      headers: {
        authorization: "test",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();
    AuthService.login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      code: 401,
      message: "Access forbidden",
    });
  });
});
