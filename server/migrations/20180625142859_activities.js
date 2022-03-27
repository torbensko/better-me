
exports.up = function (knex, Promise) {
  return knex.schema.createTable("subscription", function (table) {
    table.string("id").primary();
    table.string("title");
    table.timestamps(true, true, true);
    table.timestamp("deletedAt");
  }).then(() => {
    return knex.schema.createTable("activity", function (table) {
      table.increments("id").primary();
      table.string("title");
      table.string("subscription");
      table.foreign('subscription').references('subscription.id');
      table.string("color");
      table.enu('type', ['activity', 'ritual'])
      table.integer("maxCount");
      table.timestamps(true, true, true);
      table.timestamp("deletedAt");
    }).then(() => {

      return knex.schema.createTable("activityPerformed", function (table) {
        table.increments("id").primary();
        table.string("subscription");
        table.foreign('subscription').references('subscription.id');
        table.integer("activity");
        table.foreign('activity').references('activity.id');
        table.integer("timesPerformed");
        table.date("performedAt");
        table.timestamps(true, true, true);
        table.timestamp("deletedAt");
      });
    });
  });
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("activityPerformed"),
    knex.schema.dropTable("activity"),
    knex.schema.dropTable("subscription")
  ]);
};
