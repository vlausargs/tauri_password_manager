use uuid::Uuid;

use crate::{models::user::User, services::users_service};

#[derive(serde::Deserialize)]
pub struct UserRequest {
    name: String,
}

#[tauri::command]
pub fn create_user(new_user: UserRequest) {
    let user = User {
        id: Uuid::new_v4().to_string(),
        name: Some(new_user.name),
        created_at: chrono::Utc::now().naive_utc(),
    };

    users_service::store_new_user(&user);
}

#[tauri::command]
pub fn list_users() -> Vec<User> {
    users_service::list_users()
}

#[tauri::command]
pub fn get_user(id: String) -> Option<User> {
    users_service::get_user(id)
}

#[tauri::command]
pub fn update_user(id: String, user: UserRequest) {
    users_service::update_user(id, user.name);
}
#[tauri::command]
pub fn delete_user(id: String) {
    users_service::delete_user(id);
}
