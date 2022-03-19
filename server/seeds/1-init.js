const uuid = require("uuid");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ideas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("subscriptions").insert([
        {
          id: "ABCD"
          title: "Torben's",
        },
      ]);
    });
};
