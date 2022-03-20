const express = require("express");
const uuid = require("uuid");
const app = express();
const _ = require("lodash");
const dayjs = require("dayjs");

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const cors = require("cors");
const { keyBy } = require("lodash");

const port = process.env.PORT || 3001;

app.use(cors());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const rowToActivityType = (row) => {
  const activityType = {
    id: row.id,

    title: row.title,
    subscription: row.subscription,
    color: row.color,
    type: row.type,
    maxCount: row.maxCount,

    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deletedAt
  };

  return activityType;
};

const rowToActivityPerformed = (row) => {
  const idea = {
    id: row.id,
    performedAt: row.performedAt,
    activity: row.activity,
    timesPerformed: row.timesPerformed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deletedAt
  };
  return idea;
};

app.get("/ping", (req, res) => res.send("pong"));

app.get("/subscriptions/:id/days", (req, res) => {
  knex
    .select("*")
    .from("activity")
    .where({ subscription: req.params.id })
    .whereNull("deletedAt")
    .then((rows) => {
      const activityTypes = rows.map(rowToActivityType);
      const activities = (activityTypes || []).filter(a => a.type === "activity");
      const rituals = (activityTypes || []).filter(a => a.type === "ritual");

      const days = [];
      for (let m = 0; m < 12; m++) {
        const dayCount = dayjs().month(m).daysInMonth();
        for (let d = 0; d < dayCount; d++) {
          days.push({
            date: dayjs().date(d + 1).month(m).toISOString(),
            activities: activities.map((a) => ({
              activity: a,
              timesPerformed: 0
            })),
            rituals: rituals.map((a) => ({
              activity: a,
              timesPerformed: 0
            }))
          });
        }
      }
      const dayMap = keyBy(days, (d) => dayjs(d.date).format("YYYY-MM-DD"));

      knex
        .select("*")
        .from("activityPerformed")
        .where({ subscription: req.params.id })
        .whereBetween("performedAt", [
          dayjs().subtract(1, "year").startOf("day").toISOString(),
          dayjs().endOf("day").toISOString()
        ])
        .whereNull("deletedAt")
        .then((rows) => {
          const performances = rows.map(rowToActivityPerformed);
          // add to the days
          performances.map(p => {
            const key = dayjs(p.performedAt).format("YYYY-MM-DD");
            const day = dayMap[key];
            const peformance = day?.activities.find(a => a.activity.id === p.activity) || day?.rituals.find(a => a.activity.id === p.activity);
            if (peformance) {
              peformance.timesPerformed = p.timesPerformed;
            }
          });

          res.json({ days: Object.values(dayMap) });
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
        });
    });



});

app.get("/subscriptions/:id/activity-types", (req, res) => {
  knex
    .select("*")
    .from("activity")
    .where({ subscription: req.params.id })
    .whereNull("deletedAt")
    .then((rows) => {
      res.json({ activityTypes: rows.map(rowToActivityType) });
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

app.post("/subscriptions", (req, res) => {
  const body = req.body;
  const idea = {
    id: body.subscription
  };

  knex("subscription")
    .insert(idea)
    .then((ret) => {
      Promise.all(
        body.activities.map((a) => {
          const activity = { ...a, subscription: body.subscription };
          return knex("activity").insert(activity);
        })
      )
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post("/subscriptions/:id/days", (req, res) => {
  const body = req.body;
  const date = body.date;
  const subscription = req.params.id;
  const performedActs = [...body.activities, ...body.rituals];

  knex("activityPerformed")
    .where({ subscription })
    .whereBetween("performedAt", [dayjs(date).startOf('day').toISOString(), dayjs(date).endOf('day').toISOString()])
    .update({
      deletedAt: dayjs().toISOString()
    })
    .then((ret) => {
      Promise.all(
        performedActs.map((a) => {
          const activityPerformed = {
            subscription,
            activity: a.activity.id,
            timesPerformed: a.timesPerformed,
            performedAt: date
          };
          return knex("activityPerformed").insert(activityPerformed);
        })
      )
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// need to ensure the folder exists
app.use(express.static("../client/build"));

app.listen(port, () => console.log("Example app listening on port " + port));
