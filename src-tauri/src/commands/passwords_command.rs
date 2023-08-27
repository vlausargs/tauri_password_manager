use uuid::Uuid;

use crate::{models::{password::Password, password_decrypted::PasswordDecrypted, password_detail::PasswordDetail}, services::passwords_service};

#[derive(serde::Deserialize)]
pub struct PasswordRequest {
    name: String, url: String, username: String, password: String , icon_url: Option<String>
}

#[tauri::command]
pub fn create_password(new_password: PasswordRequest) {
    let password = Password {
        id: Uuid::new_v4().to_string(),
        name: new_password.name,
        url: new_password.url,
        username: new_password.username,
        password: new_password.password,
        icon_url: new_password.icon_url,
        created_at: chrono::Utc::now().naive_utc(),
    };

    passwords_service::store_new_password(&password);
}

#[tauri::command]
pub fn list_passwords() -> Vec<Password> {
    passwords_service::list_passwords()
}

#[tauri::command]
pub fn get_password_decrypted(id: String,otp: String) -> Option<PasswordDecrypted> {
    passwords_service::get_password_decrypted(id,otp)
}
#[tauri::command]
pub fn generate_totp()  {
    passwords_service::generate_totp();
}
#[tauri::command]
pub fn generate_random_password() -> String {
    passwords_service::generate_random_password()
}

#[tauri::command]
pub fn validate_totp(otp: String,)  {
    passwords_service::validate_totp(otp);
}

#[tauri::command]
pub fn update_password(id: String, password: PasswordRequest) {
    passwords_service::update_password(id, password.name, password.url, password.username, password.password, password.icon_url.unwrap());
}
#[tauri::command]
pub fn delete_password(id: String) {
    passwords_service::delete_password(id);
}

#[tauri::command]
pub fn get_password_detail(id: String) -> Option<PasswordDetail> {
    passwords_service::get_password_detail(id)
}