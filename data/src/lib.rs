#![feature(decl_macro)]

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate serde_derive;

pub mod data;
pub mod database;
pub mod models;
pub mod schema;
