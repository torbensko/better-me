
exports.up = function (knex, Promise) {
  knex.schema.createTable("subscription", function (table) {
    table.string("id").primary();
    table.string("title");
    table.timestamp("createdAt");
    table.timestamp("deletedAt");
  });
  knex.schema.createTable("activity", function (table) {
    table.increments("id").primary();
    table.string("title");
    table.string("subscription");
    table.foreign('subscription').references('subscription.id').deferrable('deferred');
    table.string("color");
    table.enu('type', ['activity', 'ritual'])
    table.number("maxCount");
    table.timestamp("createdAt");
    table.timestamp("deletedAt");
  });
  knex.schema.createTable("activityPerformed", function (table) {
    table.increments("id").primary();
    table.number("activity");
    table.foreign('activity').references('activity.id').deferrable('deferred');
    table.timestamp("createdAt");
    table.timestamp("deletedAt");
  });
};

exports.down = function (knex, Promise) {
  knex.schema.dropTable("activityPerformed");
  knex.schema.dropTable("activity");
  knex.schema.dropTable("subscription");
};
