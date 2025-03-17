import { 
  json, 
  pgTable, 
  serial, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  boolean 
} from "drizzle-orm/pg-core";

export const learningMaterials = pgTable("learning_materials", {
  id: serial("id").primaryKey(),
  contentId: uuid("content_id").defaultRandom().notNull(), 
  createdBy: uuid("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isPublic: boolean("is_public").default(false).notNull(), 
  publicSlug: varchar("public_slug", { length: 255 }).unique(), 
  transcript: text("transcript").notNull(),
  summaryTitle: varchar("summary_title", { length: 255 }),
  summaryDescription: text("summary_description"),
  quiz: json("quiz"), // [{question, options, correctAnswer}]
  flashcards: json("flashcards") // [{term, definition}]
});
