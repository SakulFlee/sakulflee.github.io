use crate::database::connection::establish_connection;
use rocket::Rocket;

// Defines a module `embedded_migrations` with a function `run` that performs database migrations when run.
embed_migrations!();

pub fn run_db_migrations() -> Result<(), diesel_migrations::RunMigrationsError> {
    let conn = establish_connection();
    embedded_migrations::run(&conn) 
}

pub fn run_db_migrations_rocket(rocket: Rocket) -> Result<Rocket, Rocket> {
    match run_db_migrations() {
        Ok(()) => Ok(rocket),
        Err(_) => {
            println!("Failed to run migrations!");
            Err(rocket)
        },
    }
}