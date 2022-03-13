
exports.up = function (knex, Promise) {
  return knex.schema.createTable("", function (table) {
    table.string("id").primary();
    table.string("title");
    table.timestamp("activeStart");
    table.timestamp("activeEnd");
    table.timestamp("createdAt");
    table.timestamp("deletedAt");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("");
};
