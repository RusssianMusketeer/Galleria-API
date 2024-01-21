const request = require("supertest");
const app = require("../../app.js");


describe("Test Post /login", () => {
	test("It should respond with a 201 success", async () => {
		const response = await request(app)
			.post("/login")
			.send({
				email: "test123@gmail.com",
				password: "test123",
			})
			.expect("Content-type", /json/)
			.expect(200);
	});
});
