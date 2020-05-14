const supertest = require("supertest");
const server = require("../index");

const db = require("../data/config");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("people db integration tests", () => {
  it("GET /people", async () => {
    const res = await supertest(server).get("/people");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(4);
    expect(res.body[0].name).toBe("anna");
    expect(res.body[1].name).toBe("walker");
  });

  it("GET /people/:id", async () => {
    const res = await supertest(server).get("/people/2");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("walker");
  });

  it("GET /people/:id (not found)", async () => {
    const res = await supertest(server).get("/people/20");
    expect(res.statusCode).toBe(404);
  });

  it("POST /people", async () => {
    const data = { name: "jane" };
    const res = await supertest(server)
      .post("/people")
      .send(data);

    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("jane");
  });

  it("DEL /people/4", async () => {
    res = await supertest(server).delete("/people/4");
    expect(res.statusCode).toBe(204);
  });
});
