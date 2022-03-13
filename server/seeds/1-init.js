const uuid = require("uuid");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("ideas")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("ideas").insert([
        {
          id: uuid.v4().substr(0, 6),
          title: "Walk",
          price: "free",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null,
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Rock climbing",
          price: "casual",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Fancy dinner",
          price: "fancy",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Special night",
          price: "special",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Morning",
          timeOfDay: "morning",
          price: "casual",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Afternoon",
          timeOfDay: "afternoon",
          price: "casual",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null,
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Evening",
          timeOfDay: "evening",
          price: "casual",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null,
        },
        {
          id: uuid.v4().substr(0, 6),
          title: "Afternoon & evening",
          timeOfDay: "afternoon|evening",
          price: "casual",
          createdAt: new Date(),
          activeStart: new Date(),
          activeEnd: null,
        },
      ]);
    });
};
