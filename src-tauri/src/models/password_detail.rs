use crate::schema::passwords;
use chrono::NaiveDateTime;
use diesel::prelude::QueryableByName;
use serde::Serialize;

#[derive(QueryableByName, Serialize,Clone)]
#[diesel(table_name = passwords)]
pub struct PasswordDetail {
    pub id: String,
    pub icon_url:  Option<String>,
    pub name: String,
    pub url: String,
    pub username: String,
    pub created_at: NaiveDateTime
}