UPDATE "user" SET hashed_password = (SELECT hashed_password FROM "user" WHERE email = 'superuser@nestedhub.com') WHERE email = 'chantha.kim@example.com';
