import {
  faker,
  clone,
  crudStorage,
  POST,
  GET,
  Requests,
} from "../../support/e2e";
Requests("Requisition in rest countries", function () {
  GET("Validations", function () {
    cy.crud({ payload: "others/get_restcountries" });
  });
});

function rescue_save(params) {
  if (params) {
    return crudStorage.save[params];
  }
  return JSON.stringify(crudStorage.save);
}
