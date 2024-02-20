
import { clone, crudStorage, faker } from "../support/e2e";
import json from "../fixtures/examples/big_data";
import users from "../fixtures/examples/users";

describe("template spec", () => {
  afterEach(() => {
    cy.crudScreenshot();
  });
  it("Example simple requisition", () => {
    cy.crud({ payload: "examples/jsonNotAlias" })
      .save({ path: "id" })
      .save({ path: "id", alias: "id_user" });
  });
  it("Example simple requisition return array", () => {
    cy.crud({ payload: "examples/jsonGetArray" }).then((response) => {
      for (let items of response.body?.data) {
        expect(items.id).to.exist;
        if (items.id == 7) crudStorage.save.id_Seven = items.id;
      }
    });
  });
  it("Example whit .bodyResponse", () => {
    cy.crud({ payload: "examples/jsonNotAlias" }).bodyResponse({
      path: "last_name",
      eq: "Weaver",
    });
  });

  it("Example whit  .save", () => {
    cy.crud({ payload: "examples/jsonNotAlias" }).save({ path: "id" });
    // .crudScreenshot(); // or save({path:'id', log: false}) // save id 7
  });

  it("Example whit .save and .write, create JSON response in", () => {
    cy.crud({ payload: "examples/jsonNotAlias" })
      .save({ path: "id" }) // or save({path:'id', log: false})
      .write({ path: "user/user" });
    //.crudScreenshot(); // save in fixtures/user/user.json .write() // save in fixtures/response.json
  });

  it("Example whit  .save", () => {
    cy.crud({ payload: "examples/jsonNotAlias" }).save({ path: "id" }); // or save({path:'id', log: false})
  });

  it("Example use JSON whit alias, rescue save", () => {
    /** {
    "request": {
      "method": "GET",
      "url": "https://reqres.in/api/users/2",
      "path": "save",
      "body": null,
      "qs": null,
      "headers": {
        "Content-Type": "application/json"
      }
    },
    "validations": [{ "path": "status", "value": 200 }, { "path": "first_name" }]
  }
   */
    cy.crud({ payload: "examples/jsonAlias" });
    // .crudScreenshot(); ;
  });

  it("Example crud change JSON before request", () => {
    let json = require("../fixtures/examples/jsonNotAlias");
    cy.log(json);
    let data = { ...json };

    data.request.body = { id: crudStorage.save.save }; // Authorization: Bearer token, etc.

    cy.crud({ payload: data });
  });

  it("Example without  path validations in JSON", () => {
    cy.crud({ payload: "examples/jsonWithoutValidation" });
  });

  it("Example without  path validations in JSON, but use .bodyResponse", () => {
    cy.crud({ payload: "examples/jsonWithoutValidation" }).bodyResponse({
      path: "status",
      eq: 200,
    });
  });

  it("Example use variable crudStorage", () => {
    cy.log("last requisition", crudStorage.alias.bodyResponse);
    cy.log("save", crudStorage.save?.save);
    // for use crudStorage

    crudStorage.reserve = {};

    crudStorage.reserve.value = "Hello"; // another reserve.value reserve.body reserve.id etc
  });
  it("Example change ENVIRONMENT QA DEV PROD etc", () => {
    /** USE in cypress.config.js
   *
   * const { defineConfig } = require("cypress");

    module.exports = defineConfig({
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      testIsolation: false,
      env: {
        environment: "QA", // chance environment
        QA: {
          getUser: "https://reqres.in/api/users/2",
        },
        DEV: {
          getUser: "https://reqres.in/api/users/2",
        },
        PROD: {
          getUser: "https://reqres.in/api/users/2",
        },
      },
    },
  });

   */
    // chanve environment and new endpoint add
    let env = Cypress.env();
    env.environment = "DEV";
    env.DEV = {
      getUser: "https://reqres.in/api/users/2",
    };
    console.log(env);
    cy.crud({ payload: "examples/jsonEndpoint" });
  });

  it("Example without path endpoint, but path id_user/continueEndpoint", () => {
    cy.crud({ payload: "examples/jsonWithParam" });
  });

  it("Example whit path endpoint, but path id_user/continueEndpoint", () => {
    // Used whit JSON file

    let obj = {
      endpoint: "getUser", // configure env in cypress.config.js
      request: {
        method: "POST",
        url: "https://reqres.in/api/users/2",
        path: "id/continueWhitWndpoint",
        body: null,
        qs: null,
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    cy.crud({ payload: obj });
  });

  it("Example without path endpoint, but path id_user/continueEndpoint", () => {
    // Used in JSON file
    let obj = {
      request: {
        method: "POST",
        url: "https://reqres.in/api/users/2",
        path: "id/continueWhitWndpoint",
        body: null,
        qs: null,
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    cy.crud({ payload: obj });
  });

  it("Example without path endpoint, but path /continueEndpoint", () => {
    // Used in JSON file

    // endpoint:"alias defined"
    let obj = {
      request: {
        method: "POST",
        url: "https://reqres.in/api/users/2",
        path: "/continueWhitWndpoint",
        body: null,
        qs: null,
        headers: {
          "Content-Type": "application/json",
        },
      },
    };

    cy.crud({ payload: obj });
  });

  it("Example validate schema", () => {
    cy.crud({ payload: "examples/jsonNotAlias" }).validateSchema({
      schema: "jsonSchema",
    });

    cy.log("ID first requisition", crudStorage.save.id_Seven);
  });

  it("Example simple requisition whit MOCK", () => {
    cy.crud({ payload: "examples/jsonGETMock" });
  });
  it("Example simple requisition", () => {
    cy.crud({ payload: "examples/jsonNotAlias" }).save({
      path: "first_name",
      alias: "access_token",
    });
  });
  it("Example simple requisition with replace token, param, etc...", () => {
    cy.crud({ payload: "examples/jsonReplaceAlias" })
      .save({
        path: "Authorization",
      })
      .save({ path: "Authorization", position: 1 });
  });

  it("JSON 1", function () {
    cy.crud({ payload: "mockable/json1" });
  });

  it("JSON 2", function () {
    cy.crud({ payload: "mockable/json2" });
  });

  it("JSON 3", function () {
    cy.crud({ payload: "mockable/json3" });
  });
  it("JSON 4", function () {
    cy.crud({ payload: "mockable/json4" });
  });
  it("JSON 5", function () {
    cy.crud({ payload: "mockable/json5" });
  });
  it("JSON 6", function () {
    cy.crud({ payload: "mockable/json6" });
  });
  it("Big data testing", function () {
    cy.crud({ payload: json })
      .expects({
        path: "team",
        eq: "Maria Smith",
      })
      .save({ path: "team", eq: "Maria Smith" })
      .save({ path: "age", eq: 30, alias: "year" })
      .save({ path: "type", eq: "residential", alias: "address" })
      .save({ path: "name", eq: "Maria Smith", alias: "user" })
      .save({ path: "features", alias: "features" })
      // .save({ path: "features", alias: "features", position: 2 })
      .save({ path: "vehicle", alias: "veh" })
      .save({ path: "name", alias: "username" })
      .save({ path: "name", alias: "username", position: 2 })
      .save({ path: "addresses", alias: "addresses" });
  });

  it("POST data testing", function () {
    let data = clone(json);
    data.request.method = "POST";
    data.request.url = "https://reqres.in/api/users/2";
    data.request.replace =
      "save, year, address, user, features, veh, addresses";
    data.request.body = {
      name: "year address user",
      city: "address",
      lastName: "user",
      vacation: "features",
      professional: "veh",
      addresses: "addresses",
    };
    data.expects = [{ path: "status", eq: 201 }];
    cy.crud({ payload: data });
    console.log(rescue_save());
  });
  it("Test in api save value id", () => {
    cy.crud({ payload: users }).save({
      path: "id",
      eq: 5,
      alias: "save_id_users",
    });
  });
  it("Test rescue save_id_users", () => {
    let data = clone(users);
    data.request.url += "/" + rescue_save("save_id_users");
    // data.request.path = 'save_id_users'
    data.expects = [{ path: "userName", eq: "User 5" }, { path: "status" }];
    cy.crud({ payload: data });
  });
  it("Rescue data save in alias", function () {
    console.log(rescue_save()); // save, token, access_token, etc.
    cy.log(rescue_save());
  });
  it("GET Rest Countries", () => {
    let payload = {
      // set in file .json payload.json
      request: {
        method: "GET",
        url: "https://restcountries.com/v3.1/name/eesti",
      },
      expect: [
        { path: "common" },
        { path: "common", type: "array" },
        { path: "tld" },
        { path: "cca2" },
        { path: "common", position: 3 },
        { path: "cioc" },
        { path: "independent", eq: true },
        { path: "kor" },
        { path: "latlng" },
        { path: "borders" },
        { path: "f" },
        { path: "postalCode" },
        { path: "status" },
        { path: "EUR" },
        { path: "suffixes" },
        { path: "symbol" },
        { path: "timezones" },
        { path: "flag" },
        { path: "flags" },
        { path: "car" },
        { path: "signs" },
        { path: "startOfWeek" },
        { path: "region" },
        { path: "official" },
        { path: "root", eq: "+3" },
        { path: "side" },
        { path: "side", eq: "right" },
        { path: "side", eq: "right", type: "string" },
      ],
    };
    // set path fixtures payload.json ex: cy.crud({path: '../fixtures/payload.json'})
    cy.crud({ payload: payload });
  });

  it("GET Rest Countries EESTI and save[alias] search TRUE", () => {
    let payload = {
      // set in file .json payload.json
      request: {
        method: "GET",
        url: "https://restcountries.com/v3.1/name/eesti",
      },
      expect: [
        { search: ".ee" },
        { search: ".ee", alias: "ee" },
        { search: "€" },
        { search: "€", alias: "euro" },
        { search: 200, alias: "status" },
        { search: "EST", alias: "est" },
      ],
    };
    // set path fixtures payload.json ex: cy.crud({path: '../fixtures/payload.json'})
    cy.crud({ payload: payload });
  });
});
function rescue_save(params) {
  if (params) {
    return crudStorage.save[params];
  }
  return JSON.stringify(crudStorage.save);
}
after(() => {
  console.log(crudStorage.request);
  console.log(crudStorage.response);
});

