import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { summaries } from '@/configs/schema';

export async function PUT(request) {
  try {
    const { summaryId, summaryTitle, summaryDescription, isPublic } = await request.json();

    if (!summaryId || !summaryTitle || !summaryDescription || typeof isPublic !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedSummary = await db
      .update(summaries)
      .set({
        summaryTitle,
        summaryDescription,
        isPublic,
      })
      .where(eq(summaries.id, summaryId))
      .returning();

    if (updatedSummary.length === 0) {
      return NextResponse.json(
        { error: 'Summary not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedSummary[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while updating the lecture' },
      { status: 500 }
    );
  }
}
