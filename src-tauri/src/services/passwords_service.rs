use crate::models::password_decrypted::PasswordDecrypted;
use crate::models::password_detail::PasswordDetail;
use crate::{db::establish_db_connection, models::password::Password, schema::passwords::dsl};
use diesel::prelude::*;
use magic_crypt::{new_magic_crypt, MagicCryptTrait};
use totp_rs::{Secret, TOTP, Algorithm};

use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;

pub fn totp_init() ->TOTP {
    let env_secret = std::env::var("TOTP_SECRET_KEY").expect("TOTP_SECRET_KEY must be set.");
    let secret = Secret::Raw(env_secret.as_bytes().to_vec());
    let totp = TOTP::new(Algorithm::SHA1, 6, 0, 30, secret.to_bytes().unwrap(), None, "test2".to_string()).unwrap();
    totp
}

pub fn generate_totp(){
    let env_secret = std::env::var("TOTP_SECRET_KEY").expect("TOTP_SECRET_KEY must be set.");

    let secret = Secret::Raw(env_secret.as_bytes().to_vec());
    let totp = TOTP::new(Algorithm::SHA1, 6, 0, 30, secret.to_bytes().unwrap(), None, "test2".to_string()).unwrap();
    let code = totp.get_qr().unwrap();

    println!(
        "secret raw: {} ; secret base32 {} ; code: {},qr: {}",
        secret,
        secret.to_encoded(),
        totp.generate_current().unwrap(),
        code
    )

}

pub fn string_password_encrypt(password:String) ->String{
    let env_secret: String = std::env::var("DB_SECRET").expect("DB_SECRET must be set.");

    let mc = new_magic_crypt!(env_secret, 256);
    mc.encrypt_str_to_base64(password)
}
pub fn string_password_decrypt(password:String) ->String{
    let env_secret = std::env::var("DB_SECRET").expect("DB_SECRET must be set.");

    let mc = new_magic_crypt!(env_secret, 256);
    mc.decrypt_base64_to_string(password).unwrap()

}
pub fn generate_random_password() -> String {
    let password: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(20)
        .map(char::from)
        .collect();
    password
}
pub fn validate_totp(otp:String)-> bool{
    let totp = totp_init();
    let valid = totp.check_current(&otp).unwrap();
    println!("valid: {}", valid);
    valid
}

pub fn list_passwords() -> Vec<Password> {
    let connection = &mut establish_db_connection();

    dsl::passwords
        .load::<Password>(connection)
        .expect("Error loading passwords")
}
pub fn get_password_decrypted(id: String,otp:String) -> Option<PasswordDecrypted> {
    let connection = &mut establish_db_connection();

   let res =  diesel::sql_query("SELECT id, password from passwords where id = $1 LIMIT 1")
    .bind::<diesel::sql_types::Text,_>(id)
    .load::<PasswordDecrypted>(connection)
    .ok();
    // let res = dsl::passwords
    //     .filter(dsl::id.eq(id))
    //     .first::<PasswordDecrypted>(connection)
    //     .ok(); 
    if validate_totp(otp) {
        let res2  = res.unwrap().first().cloned();
        res2.map(|mut p| {
            p.password = string_password_decrypt(p.password);
            p
        })
    }else{
        None
    }

}
pub fn get_password_detail(id: String) -> Option<PasswordDetail> {
    let connection = &mut establish_db_connection();

   let res =  diesel::sql_query("SELECT id, icon_url, name, url, username, created_at from passwords where id = $1 LIMIT 1")
    .bind::<diesel::sql_types::Text,_>(id)
    .load::<PasswordDetail>(connection)
    .ok();

    res.unwrap().first().cloned()
}

pub fn store_new_password(password: &Password) {
    let connection = &mut establish_db_connection();


    let password_new = Password {
        id: password.id.clone(),
        name: password.name.clone(),
        username: password.username.clone(),
        password: string_password_encrypt(password.password.clone()),
        url: password.url.clone(),
        icon_url: password.icon_url.clone(),
        created_at: password.created_at.clone(),
    };

    diesel::insert_into(dsl::passwords)
        .values(password_new)
        .execute(connection)
        .expect("Error saving new password");
}
pub fn update_password(id: String, name: String, url: String, username: String, password: String , icon_url: String) {
    let connection = &mut establish_db_connection();
    let mc = new_magic_crypt!("s3CrEt@!_!@___@!_!@", 256);
    let enc_password = mc.encrypt_str_to_base64(password);
    diesel::update(dsl::passwords.filter(dsl::id.eq(id)))
        .set((dsl::name.eq(name),dsl::username.eq(username), dsl::password.eq(enc_password), dsl::url.eq(url), dsl::icon_url.eq(icon_url)))
        .execute(connection)
        .expect("Error updating password");
}
pub fn delete_password(id: String) {
    let connection = &mut establish_db_connection();
    diesel::delete(dsl::passwords.filter(dsl::id.eq(id)))
        .execute(connection)
        .expect("Error deleting password");
}