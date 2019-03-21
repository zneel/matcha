const faker = require("faker");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const saltRounds = 10;
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
con.query("INSERT INTO genres (name) VALUES ('homme')");
con.query("INSERT INTO genres (name) VALUES ('femme')");
con.query("INSERT INTO tags (name) VALUES ('PHP')");
con.query("INSERT INTO tags (name) VALUES ('WoW')");
con.query("INSERT INTO tags (name) VALUES ('42')");
con.query("INSERT INTO tags (name) VALUES ('jeCpaCod3r')");

for (let i = 0; i <= 1000; i++) {
  const randomEmail = faker.internet.email();
  const randomUsername = faker.internet.userName();
  const randomName = faker.name.firstName();
  const randomSurname = faker.name.lastName();
  const randomBio = faker.lorem.paragraph();
  const password = bcrypt.hash(faker.internet.password(), saltRounds);
  con.query(
    `INSERT INTO users (email, username, name, surname, password, bio, genre_id)`,
    [
      randomEmail,
      randomUsername,
      randomName,
      randomSurname,
      password,
      randomBio,
      faker.random.number(1, 2)
    ]
  );
}
