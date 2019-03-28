"use strict";
/**
 * @todo add stream json and pipe to stream pg library to increase efficiency
 * @todo check why there is duplicates in emails and usernames
 */
require("dotenv").config();
const { Pool } = require("pg");
const https = require("https");
const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};
const pool = new Pool(config);
const unseed = async pool => {
  try {
    let numUser = await getNumUsers(pool);
    for (let i = 0; i <= numUser.rows[0].count; i++) {
      await delUser(pool, i);
      await delImage(pool, i);
    }
  } catch (e) {
    console.error(e);
  }
};

const seed = async (num, pool) => {
  const url = `https://randomuser.me/api/?results=${num}&nat=us,dk,fr,gb`;
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      body.results.forEach(async (e, i) => {
        const { first, last } = e.name;
        const { city, coordinates } = e.location;
        const { gender, email, nat } = e;
        const { username, sha256 } = e.login;
        const { date } = e.dob;
        const picture = e.picture.large;
        const user = {
          id: i,
          email,
          username,
          first,
          last,
          sha256,
          gender,
          city,
          nat,
          coordinates,
          date
        };
        try {
          await createUser(pool, user);
          await createImage(pool, picture, i);
        } catch (e) {
          console.error(e);
        }
      });
    });
  });
};

const createUser = (pool, user) => {
  const sex_orient = ["heterosexual", "homosexual", "bisexual"];
  const text = `INSERT INTO matcha.user
  (id, email, username, firstname, lastname, password, genre, city, country, location, dob, sex_orient) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;
  const values = [
    user.id,
    user.email + user.id,
    user.username + user.id,
    user.first,
    user.last,
    user.sha256,
    user.gender,
    user.city,
    user.nat,
    `(${user.coordinates.latitude},${user.coordinates.longitude})`,
    user.date,
    sex_orient[Math.floor(Math.random() * sex_orient.length)]
  ];
  return pool.query(text, values);
};

const getNumUsers = pool => pool.query("SELECT COUNT(*) FROM matcha.user");
const delUser = (pool, id) =>
  pool.query("DELETE FROM matcha.user WHERE id = $1", [id]);
const delImage = (pool, id) =>
  pool.query("DELETE FROM matcha.image WHERE id = $1", [id]);
const createImage = (pool, picture, id) => {
  return pool.query(
    `INSERT INTO matcha.image (id, path, is_profile, user_id) VALUES ($1,$2,$3,$4)`,
    [id, picture, true, id]
  );
};

(async () => {
  try {
    await unseed(pool);
    await seed(1000, pool);
  } catch (e) {
    return console.error(e);
  }
})();
