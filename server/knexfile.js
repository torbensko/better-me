require('dotenv').config();

const parts = process.env.DATABASE_URL.match(/^postgres:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.*)/);

module.exports = {
  client: "pg",
  // connection: process.env.DATABASE_URL,
  connection: {
    user: parts[1],
    password: parts[2],
    host: parts[3],
    database: parts[5],
    charset: "utf8",
    pool: { min: 0, max: 50 },
    // ssl: { rejectUnauthorized: false }
  },
  migrations: {
    extension: "js",
  },
};