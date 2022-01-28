CREATE DATABASE capstone;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE subscription_details (
    sub_id SERIAL PRIMARY KEY,
    sub_name VARCHAR(255) NOT NULL,
    plan VARCHAR(255),
    price DOUBLE PRECISION,
    duedate DATE DEFAULT CURRENT_DATE,
    user_id_fk INTEGER REFERENCES users (user_id)
);