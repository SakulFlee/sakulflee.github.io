use crate::database::connection::establish_connection;
use rocket::Rocket;

// Defines a module `embedded_migrations` with a function `run` that performs database migrations when run.
embed_migrations!();

pub fn run_db_migrations(rocket: Rocket) -> Result<Rocket, Rocket> {
    let conn = establish_connection();
    match embedded_migrations::run(&conn) {
        Ok(()) => Ok(rocket),
        Err(e) => {
            error!("Failed to run database migrations: {:?}", e);
            Err(rocket)
        }
    }
}
