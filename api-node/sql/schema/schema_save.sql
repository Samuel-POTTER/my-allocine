CREATE TABLE "users" ("id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()), "email" VARCHAR(60),
                                                                                 "password" VARCHAR(255),
                                                                                            "created_at" timestamptz NOT NULL DEFAULT (NOW()), "updated_at" timestamptz NOT NULL DEFAULT (NOW()), "deleted_at" timestamptz);


CREATE TABLE "refresh_token" ("id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()), "created_at" timestamptz NOT NULL DEFAULT (NOW()), "updated_at" timestamptz NOT NULL DEFAULT (NOW()), "deleted_at" timestamptz,
                                                                                                                                                                                       "ip" text NOT NULL,
                                                                                                                                                                                                 "user_agent" text NOT NULL,
                                                                                                                                                                                                                   "token" text NOT NULL,
                                                                                                                                                                                                                                "expire_on" timestamptz NOT NULL,
                                                                                                                                                                                                                                                        "user_id" uuid NOT NULL);


ALTER TABLE "refresh_token" ADD
FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON
DELETE CASCADE;


CREATE TABLE "genre_list" ("id" INTEGER PRIMARY KEY NOT NULL,
                                                    "user_id" UUID NOT NULL,
                                                                   "genre_name" VARCHAR(255) NOT NULL);


CREATE TABLE "liked_movie" ("user_id" UUID NOT NULL,
                                           "poster_path" VARCHAR(100),
                                                         "adult" BOOLEAN, "overview" VARCHAR(255),
                                                                                     "release_date" VARCHAR(100),
                                                                                                    "genre_ids" jsonb NOT NULL DEFAULT '[]',
                                                                                                                                       "id" DOUBLE PRECISION, "original_title" VARCHAR(255),
                                                                                                                                                                               "original_language" VARCHAR(255),
                                                                                                                                                                                                   "title" VARCHAR(100),
                                                                                                                                                                                                           "backdrop_path" VARCHAR(255),
                                                                                                                                                                                                                           "popularity" VARCHAR(100),
                                                                                                                                                                                                                                        "vote_count" DOUBLE PRECISION, "video" BOOLEAN, "vote_average" REAL);


CREATE TABLE "playlists" ("id" UUID PRIMARY KEY DEFAULT (gen_random_uuid()), "playlist_name" VARCHAR(255),
                                                                                             "user_id" UUID NOT NULL);


CREATE TABLE "movies" ("playlist_id" UUID NOT NULL,
                                          "poster_path" VARCHAR(100),
                                                        "adult" BOOLEAN, "overview" VARCHAR(255),
                                                                                    "release_date" VARCHAR(100),
                                                                                                   "genre_ids" jsonb NOT NULL DEFAULT '[]',
                                                                                                                                      "id" DOUBLE PRECISION, "original_title" VARCHAR(255),
                                                                                                                                                                              "original_language" VARCHAR(255),
                                                                                                                                                                                                  "title" VARCHAR(100),
                                                                                                                                                                                                          "backdrop_path" VARCHAR(255),
                                                                                                                                                                                                                          "popularity" VARCHAR(100));


CREATE TABLE "seen_movie" ("user_id" UUID NOT NULL,
                                          "poster_path" VARCHAR(100),
                                                        "adult" BOOLEAN, "overview" VARCHAR(255),
                                                                                    "release_date" VARCHAR(100),
                                                                                                   "genre_ids" jsonb NOT NULL DEFAULT '[]',
                                                                                                                                      "id" DOUBLE PRECISION, "original_title" VARCHAR(255),
                                                                                                                                                                              "original_language" VARCHAR(255),
                                                                                                                                                                                                  "title" VARCHAR(100),
                                                                                                                                                                                                          "backdrop_path" VARCHAR(255),
                                                                                                                                                                                                                          "popularity" VARCHAR(100),
                                                                                                                                                                                                                                       "vote_count" DOUBLE PRECISION, "video" BOOLEAN, "vote_average" REAL);


ALTER TABLE "playlists" ADD
FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON
DELETE CASCADE;


ALTER TABLE "liked_movie" ADD
FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON
DELETE CASCADE;


ALTER TABLE "movies" ADD
FOREIGN KEY ("playlist_id") REFERENCES "playlists" ("id") ON
DELETE CASCADE;


ALTER TABLE "genre_list" ADD
FOREIGN KEY("user_id") REFERENCES "users" ("id") ON
DELETE CASCADE;


ALTER TABLE "seen_movie" ADD
FOREIGN KEY("user_id") REFERENCES "users" ("id") ON
DELETE CASCADE;