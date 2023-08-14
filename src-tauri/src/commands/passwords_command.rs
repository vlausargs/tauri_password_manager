use uuid::Uuid;

use crate::{models::password::Password, services::passwords_service};

#[derive(serde::Deserialize)]
pub struct PasswordRequest {
    name: String, url: String, password: String , icon_url: String
}

#[tauri::command]
pub fn create_password(new_password: PasswordRequest) {
    let password = Password {
        id: Uuid::new_v4().to_string(),
        name: new_password.name,
        url: new_password.url,
        password: new_password.password,
        icon_url: Some(new_password.icon_url),
        created_at: chrono::Utc::now().naive_utc(),
    };

    passwords_service::store_new_password(&password);
}

#[tauri::command]
pub fn list_passwords() -> Vec<Password> {
    passwords_service::list_passwords()
}

#[tauri::command]
pub fn get_password_decrypted(id: String) -> Option<Password> {
    passwords_service::get_password_decrypted(id)
}

#[tauri::command]
pub fn update_password(id: String, password: PasswordRequest) {
    passwords_service::update_password(id, password.name , password.url , password.password , password.icon_url);
}
#[tauri::command]
pub fn delete_password(id: String) {
    passwords_service::delete_password(id);
}
