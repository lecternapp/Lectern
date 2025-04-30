import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { summaries } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(req, { params }) {
  const { lectureId } = params;

  try {
    // Check if the lecture exists and has an embedding
    const result = await db
      .select()
      .from(summaries)
      .where(eq(summaries.id, lectureId))
      .limit(1);

    if (!result.length) {
      return NextResponse.json({ hasEmbedding: false, error: 'Lecture not found' }, { status: 404 });
    }

    const lecture = result[0];
    const hasEmbedding = lecture.embedding && lecture.embedding.length > 0;

    return NextResponse.json({ hasEmbedding });
  } catch (error) {
    console.error('Error checking embedding:', error);
    return NextResponse.json({ hasEmbedding: false, error: 'Failed to check embedding' }, { status: 500 });
  }
} 