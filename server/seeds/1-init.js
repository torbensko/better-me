const uuid = require("uuid");
const _ = require("lodash");
const dayjs = require("dayjs");

const activityCount = 10;

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
      ]).then((ret) => {
        const performances = _.times(activityCount, (i) => {
          // dates before and after today
          const performedAt = dayjs().add(i - activityCount / 2, 'day').toISOString();
          return {
            activity: ret.id,
            timesPerformed: 1,
            performedAt
          };
        })
        return knex("activityPerformed").insert(performances);
      });
    });
};
