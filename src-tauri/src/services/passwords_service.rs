use crate::{db::establish_db_connection, models::password::Password, schema::passwords::dsl};
use diesel::prelude::*;
use magic_crypt::{new_magic_crypt, MagicCryptTrait};
pub fn list_passwords() -> Vec<Password> {
    let connection = &mut establish_db_connection();

    dsl::passwords
        .load::<Password>(connection)
        .expect("Error loading passwords")
}
pub fn get_password_decrypted(id: String) -> Option<Password> {
    let connection = &mut establish_db_connection();

    let res = dsl::passwords
        .filter(dsl::id.eq(id))
        .first::<Password>(connection)
        .ok(); 

    let mc = new_magic_crypt!("s3CrEt@!_!@___@!_!@", 256);
    res.map(|mut p| {
        p.password = mc.decrypt_base64_to_string(p.password).unwrap();
        p
    })
}
pub fn store_new_password(password: &Password) {
    let connection = &mut establish_db_connection();

    diesel::insert_into(dsl::passwords)
        .values(password)
        .execute(connection)
        .expect("Error saving new password");
}
pub fn update_password(id: String, name: String, url: String, password: String , icon_url: String) {
    let connection = &mut establish_db_connection();
    let mc = new_magic_crypt!("s3CrEt@!_!@___@!_!@", 256);
    let enc_password = mc.encrypt_str_to_base64(password);
    diesel::update(dsl::passwords.filter(dsl::id.eq(id)))
        .set((dsl::name.eq(name), dsl::password.eq(enc_password), dsl::url.eq(url), dsl::icon_url.eq(icon_url)))
        .execute(connection)
        .expect("Error updating password");
}
pub fn delete_password(id: String) {
    let connection = &mut establish_db_connection();
    diesel::delete(dsl::passwords.filter(dsl::id.eq(id)))
        .execute(connection)
        .expect("Error deleting password");
}