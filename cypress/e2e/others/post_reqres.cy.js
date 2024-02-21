import {
  faker,
  clone,
  crudStorage,
  POST,
  GET,
  Requests,
} from "../../support/e2e";
Requests("Test post in reqresIn without method", function () {
  crudStorage.save.name_user = faker.generateName();
  crudStorage.save.street_user = faker.generateStreet();
  crudStorage.save.city_user = faker.generateCity();

  POST("Create", function () {
    cy.crud({ payload: "others/post_without_method" }).save({
      path: "id",
      as: "id_user_created",
    });
  });

  GET("Rescue id created in post", function () {
    cy.crud({ payload: "others/get_id_reqres" });
  });

  it("Logs crudStorage.save", () => {
    cy.log(rescue_save());
  });
});

function rescue_save(params) {
  if (params) {
    return crudStorage.save[params];
  }
  return JSON.stringify(crudStorage.save);
}
