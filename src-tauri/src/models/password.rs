use crate::schema::passwords;
use chrono::NaiveDateTime;
use diesel::{Insertable, Queryable};
use serde::Serialize;

#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = users)]
pub struct Password {
    pub id: String,
    pub icon_url:  Option<String>,
    pub name: String,
    pub url: String,
    pub password: String,
    pub created_at: NaiveDateTime
}