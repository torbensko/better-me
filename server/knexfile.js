require('dotenv').config()

// SQLite support
// module.exports = {
//   client: "sqlite3",
//   connection: {
//     filename: "./mydb.sqlite",
//   },
// };

// PostGres support
const parts = process.env.DATABASE_URL.match(/^postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([\w\d]+)/);

module.exports = {
  client: "pg",
  debug: process.env.DEBUG,
  connection: {
    user: parts[1],
    password: parts[2],
    host: parts[3],
    database: parts[5],
    charset: "utf8",
    pool: { min: 0, max: 50 },
    ssl: { rejectUnauthorized: false }
  }
};