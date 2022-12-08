"use strict";
const server = require("../server");
const supertest = require("supertest");

const mockRequest = supertest(server.app);

describe("testing my server", () => {
  it("/ route works", async () => {
    const response = await mockRequest.get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("im alive and working");
  });

  it("handlers of dailed route", async () => {
    const response = await mockRequest.get("/bad");
    expect(response.status).toEqual(404);
  });

  it("bad method", async () => {
    const response = await mockRequest.post("/searchRandomImage");
    expect(response.status).toEqual(404);
  });

  it("handeling random imaage rout", async () => {
    const response = await mockRequest.get("/searchRandomImage");
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });

  it("checking for title in query", async () => {
    const data = { search: "book" };
    const response = await mockRequest.get("/searchImage").query(data);
    expect(response.status).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it("testing for invalid search", async () => {
    const data = { search: "" };
    const response = await mockRequest.get("/searchImage").query(data);
    expect(response.status).toEqual(500);
  });
});
