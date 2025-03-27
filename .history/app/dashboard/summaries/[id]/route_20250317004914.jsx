 import { json, pgTable, serial, varchar, boolean, integer } from "drizzle-orm/pg-core";

// Summaries Table
export const Summaries = pgTable('summaries', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    content: json('content').notNull(), 
    createdBy: varchar('createdBy').notNull(), i
    userName: varchar('userName').notNull(), 
    createdAt: varchar('createdAt').default('NOW()') /
});

// Quizzes Table
export const Quizzes = pgTable('quizzes', {
    id: serial('id').primaryKey(),
    summaryId: integer('summaryId').references(() => Summaries.id, { onDelete: 'cascade' }),
    question: varchar('question').notNull(),
    correctAnswer: varchar('correctAnswer').notNull(),
    explanation: varchar('explanation'),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull(),
    createdAt: varchar('createdAt').default('NOW()')
});

// Quiz Options Table (Stores Multiple Choices for Quizzes)
export const QuizOptions = pgTable('quiz_options', {
    id: serial('id').primaryKey(),
    quizId: integer('quizId').references(() => Quizzes.id, { onDelete: 'cascade' }),
    optionText: varchar('optionText').notNull()
});

// Flashcards Table
export const Flashcards = pgTable('flashcards', {
    id: serial('id').primaryKey(),
    summaryId: integer('summaryId').references(() => Summaries.id, { onDelete: 'cascade' }),
    term: varchar('term').notNull(),
    definition: varchar('definition').notNull(),
    createdBy: varchar('createdBy').notNull(),
    userName: varchar('userName').notNull(),
    createdAt: varchar('createdAt').default('NOW()')
});