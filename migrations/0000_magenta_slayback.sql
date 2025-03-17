CREATE TABLE "learning_materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"is_public" boolean DEFAULT false NOT NULL,
	"public_slug" varchar(255),
	"transcript" text NOT NULL,
	"summary_title" varchar(255),
	"summary_description" text,
	"quiz" json,
	"flashcards" json,
	CONSTRAINT "learning_materials_public_slug_unique" UNIQUE("public_slug")
);
