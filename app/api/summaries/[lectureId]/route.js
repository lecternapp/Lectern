import { db } from '@/configs/db';
import { summaries } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Handles the GET request for fetching a summary based on the provided lectureId.

export async function GET(req, { params }) {
  const { lectureId } = await params;

  try {
    const result = await db
      .select()
      .from(summaries)
      .where(eq(summaries.id, lectureId))
      .limit(1);

    if (!result.length) {
      return NextResponse.json({ summary: '' }, { status: 404 });
    }

    const data = result[0]; // Access the first result

    const responseData = {
      summary: data.summary ?? '', // Default to empty string if undefined or null
      title: data.summaryTitle ?? '',
      description: data.summaryDescription ?? '',
      createdAt: data.createdAt,
    };

    return NextResponse.json(responseData);
  } catch (err) {
    console.error('[GET SUMMARY ERROR]', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
