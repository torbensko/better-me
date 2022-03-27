const uuid = require("uuid");
const _ = require("lodash");
const dayjs = require("dayjs");

const activityCount = 30;

exports.seed = function (knex) {
  return knex("subscription")
    .insert([
      {
        id: "ABCD",
        title: "Example subscription"
      }
    ])
    .then(() => {
      return knex("activity").insert([
        {
          title: "Run",
          maxCount: 2,
          type: "activity",
          subscription: "ABCD",
          color: "#ef6"
        }, {
          title: "Ride",
          maxCount: 3,
          type: "activity",
          subscription: "ABCD",
          color: "#e6f"
        }, {
          title: "Gym",
          maxCount: 3,
          type: "activity",
          subscription: "ABCD",
          color: "#6f6"
        }, {
          title: "Meditate",
          type: "ritual",
          subscription: "ABCD",
          color: "#6ef"
        },
      ]).then((ret) => {
        const performances = _.times(activityCount, (i) => {
          // dates before and after today
          const performedAt = dayjs().add(i - activityCount / 2, 'day').format('YYYY-MM-DD');
          return {
            // HACK
            subscription: "ABCD",
            activity: 1,
            timesPerformed: _.random(1, 2),
            performedAt
          };
        })
        return knex("activityPerformed").insert(performances);
      });
    });
};
