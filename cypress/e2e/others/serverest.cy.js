import {
  faker,
  clone,
  crudStorage,
  POST,
  GET,
  Requests,
} from "../../support/e2e";
Requests("Test in serverest", function () {
  POST("Login and return Authorization ", function () {
    cy.crud({ payload: "serverest/post_login_token" });
  });
  GET("List users", function () {
    cy.crud({ payload: "serverest/get_list_users" });
  });
  POST("Create new user", function () {
    let payload = crudStorage.save;
    payload.name_user = faker.generateName();
    payload.email_user = faker.generateEmails();
    payload.password_user = faker.generatePassword();

    cy.crud({ payload: "serverest/post_create_new_user" });
  });
  GET("User id", function () {
    cy.crud({ payload: "serverest/get_id" });
  });

  it("Logs rescue_save", () => {
    cy.log(rescue_save());
  });
});

function rescue_save(params) {
  if (params) {
    return crudStorage.save[params];
  }
  return JSON.stringify(crudStorage.save);
}
