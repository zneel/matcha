CREATE SCHEMA IF NOT EXISTS matcha;
CREATE TYPE enum_genre AS ENUM ('male', 'female');
CREATE TYPE enum_sex_orient AS ENUM ('heterosexual', 'homosexual', 'bisexual');
CREATE TABLE IF NOT EXISTS matcha.user (
    id serial PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    username varchar(45) NOT NULL UNIQUE,
    firstname varchar(45),
    lastname varchar(45),
    dob date,
    city varchar(45),
    country varchar(45),
    location point,
    password varchar(255) NOT NULL,
    is_activated boolean DEFAULT false,
    bio text,
    genre enum_genre, 
    sex_orient enum_sex_orient,
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matcha.tag (
    id serial PRIMARY KEY,
    name varchar(45) UNIQUE
);

CREATE TABLE IF NOT EXISTS matcha.user_has_tags (
    user_id integer REFERENCES matcha.user ON DELETE CASCADE,
    tag_id integer REFERENCES matcha.tag ON DELETE RESTRICT,
    PRIMARY KEY (user_id, tag_id)
);

CREATE TABLE IF NOT EXISTS matcha.image (
    id serial PRIMARY KEY,
    path varchar(255) NOT NULL,
    is_profile boolean DEFAULT false,
    user_id integer REFERENCES matcha.user ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS matcha.user_has_visitors (
    user_visits integer REFERENCES matcha.user ON DELETE CASCADE,
    user_visited integer REFERENCES matcha.user ON DELETE CASCADE,
    visited_at timestamp DEFAULT NOW(),
    PRIMARY KEY (user_visits, user_visited)
);

CREATE TABLE IF NOT EXISTS matcha.user_has_likes (
    user_likes integer REFERENCES matcha.user ON DELETE CASCADE,
    user_liked integer REFERENCES matcha.user ON DELETE CASCADE,
    liked_at timestamp DEFAULT NOW(),
    PRIMARY KEY (user_likes, user_liked)
);

INSERT INTO matcha.tag (name) VALUES ('#php');
INSERT INTO matcha.tag (name) VALUES ('#42');
INSERT INTO matcha.tag (name) VALUES ('#born2c0de');
INSERT INTO matcha.tag (name) VALUES ('#C');
INSERT INTO matcha.tag (name) VALUES ('#C#');
INSERT INTO matcha.tag (name) VALUES ('#C++');
INSERT INTO matcha.tag (name) VALUES ('#nodejs');
INSERT INTO matcha.tag (name) VALUES ('#sql');
INSERT INTO matcha.tag (name) VALUES ('#norminet');
INSERT INTO matcha.tag (name) VALUES ('#lescouysUrL@T4blE');