use crate::schema::users;
use chrono::NaiveDateTime;
use diesel::{Insertable, Queryable};
use serde::Serialize;

#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = users)]
pub struct User {
    pub id: String,
    pub name:  Option<String>,
    pub created_at: NaiveDateTime
}