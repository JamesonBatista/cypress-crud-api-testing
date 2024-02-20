import {
  faker,
  clone,
  crudStorage,
  POST,
  GET,
  Requests,
} from "../../support/e2e"; // add ../ find support/e2e
Requests("Test whit endpoint in url", function () {
  //add Request, but, describe and it ...

  GET(
    "Test name endpoint in file cypress.config.js Cypress.env",
    function () {
      cy.crud({ payload: "others/get_request_whit_env" });
    }
    // { only: true }
  );

  //   it("Test name endpoint in file cypress.config.js Cypress.env", function () {
  //     cy.crud({ payload: "others/get_request_whit_env" });
  //   }); // use it

  GET(
    "Test whit endpoint and param url",
    function () {
      cy.crud({ payload: "others/request_path" });
    }
    // { skip: true } // whit skip
  );

  GET("Test whit endpoint and param url and save value", function () {
    crudStorage.save.paramUrl = "/lang";

    cy.crud({ payload: "others/request_endpoint_path" });
  });
});

function rescue_save(params) {
  if (params) {
    return crudStorage.save[params];
  }
  return JSON.stringify(crudStorage.save);
}
