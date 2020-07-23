

-- to run psql -d postgres://xmgmqfkr:avBVrWffAkdsEl9J7SSc9Y_AJvp5SAzZ@ruby.db.elephantsql.com:5432/xmgmqfkr -f server/models/kunligi.sql

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

Drop table if exists public.users;
Drop table if exists public.rooms;
Drop table if exists public.prompts;
Drop table if exists public.rooms_users;
Drop table if exists public.messages;

CREATE TABLE public.users (
	"id" serial NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.rooms (
	"id" serial NOT NULL,
	"hash" varchar NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "rooms_pk" PRIMARY KEY ("id")
	
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.prompts (
	"id" serial NOT NULL,
	"prompt" varchar NOT NULL,
	"prompt_type" varchar NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "prompts_pk" PRIMARY KEY ("id")
	
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.rooms_users (
	"id" serial NOT NULL,
	"room_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	CONSTRAINT "rooms_fk0" FOREIGN KEY ("room_id") REFERENCES  public.rooms("id"),
	CONSTRAINT "rooms_fk1" FOREIGN KEY ("user_id") REFERENCES  public.users("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.messages (
	"id" serial NOT NULL,
	"room_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"prompt_id" bigint,
	"message" varchar NOT NULL,
	"created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "messages_fk0" FOREIGN KEY ("room_id") REFERENCES  public.rooms("id"),
	CONSTRAINT "messages_fk1" FOREIGN KEY ("user_id") REFERENCES  public.users("id"),
	CONSTRAINT "messages_fk2" FOREIGN KEY ("prompt_id") REFERENCES  public.prompts("id")
) WITH (
  OIDS=FALSE
);

-- adding in some dummy data
insert into public.users (username,email,password) values ('Tyler','tysullberg@gmail.com','abc123');
insert into public.users (username,email,password) values ('Doggie','ruff@ruff.com','dog123');
insert into public.prompts (prompt,prompt_type) values ('When is the last time you cried?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What is your earliest childhood memory?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('Have you ever been let off the hook for a punishment you deserved? How did that make you feel??','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('How much trouble did you get into during your school days? Explain.','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What’s something that you did growing up that your parents never found out about?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('If you could rid the world of one fear, what fear would it be? Why?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('If you had to locate the feeling of “longing” or “yearning” in your body, where would you say it was?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What silly thing have you done in the name of love?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What silly thing have you done in the name of love?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What has recently made you depressed?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('When do you find yourself singing?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What’s weighing heavy on your heart these days?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('What is one thing you no longer believe about God that you believed when you were younger? What changed your mind?','Deep connection');
insert into public.prompts (prompt,prompt_type) values ('Should we defund the police?','Difficult topics');
insert into public.prompts (prompt,prompt_type) values ('Does free will exist?','Difficult topics');
insert into public.prompts (prompt,prompt_type) values ('Should Universal Basic Income be implemented on a large scale?','Difficult topics');
insert into public.prompts (prompt,prompt_type) values ('Are the situations when restricting the free press is a good thing?','Difficult topics');
insert into public.prompts (prompt,prompt_type) values ('Does social media have an overall positive or negative effect on social change?','Difficult topics');