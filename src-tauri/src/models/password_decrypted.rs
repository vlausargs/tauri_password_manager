use crate::schema::passwords;
use diesel::prelude::QueryableByName;
use serde::Serialize;

#[derive(QueryableByName, Serialize, Clone)]
#[diesel(table_name = passwords)]
pub struct PasswordDecrypted {
    pub id: String,
    pub password: String,
}