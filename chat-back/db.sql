-- Active: 1706797903376@@127.0.0.1@5432@chatapp@public
CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR(255) NOT NULL
);


-- insert
INSERT INTO users(username, passhash) VALUES($1, $2);