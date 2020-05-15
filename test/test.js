const agent = require("superagent");
const chai = require("chai");
const statusCode = require("http-status-codes");

const expect = chai.expect;

var port = process.env.PORT_BACKEND || 8080;

/*
The backend test is divided in two sections, one for the database connection, 
and one for the endpoints test, result of the data obtained from mysql database
*/

/*
Tests that the database connection with the backend can be established
*/
describe("Database connection Test", () => {
  it("Create a valid database connection with MySQL Database", async () => {
    var mysql = require("mysql");
    const con = mysql.createConnection({
      host: process.env.DB_HOST || "",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASS || "*",
      database: process.env.DB_NAME || "",
    });

    chai.assert(con != null);
  });
});

describe("Endpoints Tests", () => {
  it("Consume GET Service with save query for next test for /users endpoint", async () => {
    const response = await agent.get("http://localhost:"+port+"/users/");
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body != undefined);
  });

  it("Consume POST Service with query parameters save of before request for /user/add endpoint", async () => {
    const response1 = await agent
      .post("http://localhost:"+port+"/user/add/")
      .send({ id: "0", nombre: "test" });
    expect(response1.status).to.equal(statusCode.OK);

    const response = await agent.get("http://localhost:"+port+"/users/");
    var tmp = response.body.users.pop();
    expect(tmp.id == "0" && tmp.nombre == "test");
  });
});
