const express = require("express");
const uuid = require("uuid");
const app = express();
const _ = require("lodash");

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const cors = require("cors");

const port = process.env.PORT || 3001;

app.use(cors());
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const rowToIdea = (row) => {
  const idea = {
    id: row.id,
    title: row.title,
    timeOfDay: row.timeOfDay ? row.timeOfDay.split("|") : null,
    requirements: row.requirements ? row.requirements.split("|") : null,
    price: row.price || null,
    activeStart: row.activeStart,
    activeEnd: row.activeEnd,
    createdAt: row.createdAt,
    deletedAt: row.deletedAt,
  }
  return idea;
}

app.get("/ping", (req, res) => res.send("pong"));

app.get("/ideas", (req, res) => {
  knex
    .select("*")
    .from("ideas")
    .whereNull("deletedAt")
    .then((rows) => {
      res.json({ ideas: rows.map(rowToIdea) });
    })
    .catch((err) => {
      res.status(500);
    });
});

app.post("/ideas-suggestion", (req, res) => {
  const { requirements = [], timeOfDay = [], price } = req.body;

  const query = knex
    .select("*")
    .from("ideas")
    .whereNull("deletedAt");

  if (price) {
    query.andWhere("price", "=", price);
  }

  if (timeOfDay.length) {
    query.andWhere((whereClause) => {
      whereClause.whereNull('timeOfDay');
      Object.values((timeOfDay || [])).forEach(time => {
        whereClause.orWhere('timeOfDay', 'like', `%${time}%`)
      });
    });
  }

  Object.values((requirements || [])).forEach(r => {
    query.andWhere('requirements', 'like', `%${r}%`)
  });

  query
    .then((rows) => {
      if (rows.length === 0) {
        res.json(null);
        return;
      }
      const ideas = rows;
      const index = _.random(0, ideas.length - 1);
      res.json(rowToIdea(ideas[index]));
    })
    .catch((err) => {
      res.status(500);
    });
});

app.post("/ideas", (req, res) => {

  // TODO add some checks and validations
  const body = req.body;
  const idea = {
    id: uuid.v4().substr(0, 6),
    title: body.title,
    timeOfDay: (body.timeOfDay || []).join("|") || null,
    requirements: (body.requirements || []).join("|") || null,
    price: body.price || null,
    createdAt: new Date(),
    activeStart: new Date(),
    activeEnd: null,
  };

  knex("ideas")
    .insert(idea)
    .then((ret) => {
      res.json(ret);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.put("/ideas/:id", (req, res) => {

  // TODO add some checks and validations
  const { id, ...idea } = req.body;

  knex("ideas")
    .where({ id: req.params.id })
    .update(idea)
    .then((ret) => {
      console.log(ret);
      res.json(ret);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.delete("/ideas/:id", (req, res) => {

  // TODO add some checks and validations
  const { id, ...idea } = req.body;

  knex("ideas")
    .where({ id: req.params.id })
    .update({
      deletedAt: new Date()
    })
    .then((ret) => {
      console.log(ret);
      res.json(ret);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// need to ensure the folder exists
app.use(express.static('../client/build'));

app.listen(port, () => console.log("Example app listening on port " + port));
