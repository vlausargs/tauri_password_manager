use crate::{db::establish_db_connection, models::user::User, schema::users::dsl};
use diesel::prelude::*;

pub fn init() {
    let users = list_users();

    if users.len() > 0 {
        return;
    }

    let default_user = User {
        id: String::from("chatgpt"),
        name: Some("ChatGPT".to_string()),
        created_at: chrono::Utc::now().naive_utc(),
    };

    store_new_user(&default_user);
}

pub fn list_users() -> Vec<User> {
    let connection = &mut establish_db_connection();

    dsl::users
        .load::<User>(connection)
        .expect("Error loading users")
}

pub fn get_user(id: String) -> Option<User> {
    let connection = &mut establish_db_connection();

    dsl::users
        .filter(dsl::id.eq(id))
        .first::<User>(connection)
        .ok()
}

pub fn store_new_user(user: &User) {
    let connection = &mut establish_db_connection();

    diesel::insert_into(dsl::users)
        .values(user)
        .execute(connection)
        .expect("Error saving new user");
}

pub fn update_user(id: String, name: String) {
    let connection = &mut establish_db_connection();

    diesel::update(dsl::users.filter(dsl::id.eq(id)))
        .set(dsl::name.eq(name))
        .execute(connection)
        .expect("Error updating user");
}

pub fn delete_user(id: String) {
    let connection = &mut establish_db_connection();
    diesel::delete(dsl::users.filter(dsl::id.eq(id)))
        .execute(connection)
        .expect("Error deleting user");

}