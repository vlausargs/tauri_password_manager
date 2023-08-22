// @generated automatically by Diesel CLI.

diesel::table! {
    passwords (id) {
        id -> Text,
        icon_url -> Nullable<Text>,
        name -> Text,
        url -> Text,
        username -> Text,
        password -> Text,
        created_at -> Timestamp,
    }
}

diesel::table! {
    users (id) {
        id -> Text,
        name -> Nullable<Text>,
        created_at -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    passwords,
    users,
);
