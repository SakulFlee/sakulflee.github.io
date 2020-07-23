use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

fn raw_connection() -> ConnectionResult<PgConnection> {
    // Initialize dotenv
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
}

pub fn establish_connection() -> PgConnection {
    raw_connection().unwrap()
}

pub fn connection_valid() -> bool {
    raw_connection().is_ok()
}
