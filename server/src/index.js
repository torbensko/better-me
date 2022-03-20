const express = require("express");
const uuid = require("uuid");
const app = express();
const _ = require("lodash");
const dayjs = require("dayjs");

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const cors = require("cors");

const port = process.env.PORT || 3001;

app.use(cors());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const rowToActivityPerformed = (row) => {
  const idea = {
    id: row.id,
    performedAt: row.performedAt,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deletedAt,
  }
  return idea;
}

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
    deletedAt: row.deletedAt,
  }

  return activityType;
}

app.get("/ping", (req, res) => res.send("pong"));

app.get("/subscriptions/:id/days", (req, res) => {
  knex
    .select("*")
    .from("activityPerformed")
    .where({ subscription: req.params.id })
    // .whereBetween("performedAt", [dayjs().toISOString(), dayjs().subtract(1, 'year').toISOString()])
    .whereNull("deletedAt")
    .then((rows) => {
      res.json({ days: rows.map(rowToActivityPerformed) });
    })
    .catch((err) => {
      res.status(500);
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
          return knex("activity")
            .insert(activity);
        })
      ).then(() => {
        res.sendStatus(200);
      })
        .catch((err) => {
          res.sendStatus(500);
        })
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});



// need to ensure the folder exists
app.use(express.static('../client/build'));

app.listen(port, () => console.log("Example app listening on port " + port));
