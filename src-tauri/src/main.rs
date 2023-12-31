// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
mod models;
mod schema;
mod services;

use commands::users_command::*;
use commands::passwords_command::*;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();
    tauri::async_runtime::set(tokio::runtime::Handle::current());
    // tauri
    tauri::Builder::default()
    // .manage(model_manager)
    .invoke_handler(tauri::generate_handler![
        get_user,
        list_users,
        create_user,
        update_user,
        delete_user,
        create_password,
        list_passwords,
        get_password_decrypted,
        get_password_detail,
        update_password,
        delete_password,
        generate_random_password,
        generate_totp,
        validate_totp,
        ])
        .setup(|_app| {

            tokio::spawn(async move {
                db::init();
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
