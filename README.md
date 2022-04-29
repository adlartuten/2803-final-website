# 2803-final-website
final project for CS 2803 DWD

to create the SQL database:

drop database if exists cs2803;
create database cs2803;
use cs2803;
create table users(username varchar(64) primary key not null, password varchar(64) not null);

also run 

npm install

to install all project dependencies