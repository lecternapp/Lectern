// import { 
//   json, 
//   pgTable, 
//   serial, 
//   uuid, 
//   varchar, 
//   text, 
//   timestamp, 
//   boolean 
// } from "drizzle-orm/pg-core";

// export const learningMaterials = pgTable("learning_materials", {
//   id: serial("id").primaryKey(),
//   contentId: uuid("content_id").defaultRandom().notNull(), 
//   createdBy: uuid("created_by").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
//   isPublic: boolean("is_public").default(false).notNull(), 
//   publicSlug: varchar("public_slug", { length: 255 }).unique(), 
//   transcript: text("transcript").notNull(),
//   summaryTitle: varchar("summary_title", { length: 255 }),
//   summaryDescription: text("summary_description"),
//   quiz: json("quiz"), // [{question, options, correctAnswer}]
//   flashcards: json("flashcards") // [{term, definition}]
// });
// 

import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  doublePrecision,
  integer,
} from 'drizzle-orm/pg-core';

// ====================
// Summaries Table
// ====================
export const summaries = pgTable('summaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('user_id', { length: 255 }),
  filename: varchar('filename', { length: 255 }),
  summary: text('summary'),
  embedding: doublePrecision('embedding').array().notNull(),
  createdAt: timestamp('created_at', { mode: 'timestamptz' }).defaultNow(),
  isPublic: boolean('is_public').notNull().default(false),
  publicSlug: varchar('public_slug', { length: 255 }).unique(),
  summaryTitle: varchar('summary_title', { length: 255 }),
  summaryDescription: text('summary_description'),
});

// ====================
// Flashcards Table
// ====================
export const flashcards = pgTable('flashcards', {
  id: uuid('id').primaryKey().defaultRandom(),
  summaryId: uuid('summary_id')
    .notNull()
    .references(() => summaries.id, { onDelete: 'cascade' }),
  term: text('term').notNull(),
  definition: text('definition').notNull(),
});

// ====================
// Quiz Questions Table (optional, if used)
// ====================
export const quizQuestions = pgTable('quiz_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  summaryId: uuid('summary_id')
    .notNull()
    .references(() => summaries.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  options: text('options').array().notNull(),
  answer: varchar('answer', { length: 255 }).notNull(),
});
