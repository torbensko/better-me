const uuid = require("uuid");

exports.seed = function (knex) {
  return knex("subscription")
    .insert([
      {
        id: "abcd",
        title: "Example subscription"
      }
    ])
    .then(() => {
      return knex("activity").insert([
        {
          title: "Running",
          maxCount: 2,
          type: "activity",
          subscription: "abcd"
        }
      ]);
    });
};
