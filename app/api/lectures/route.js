import { db } from '@/configs/db';
import { summaries } from '@/configs/schema';
import { eq } from 'drizzle-orm';


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Missing user ID' }), {
      status: 400,
    });
  }

  try {
    const userLectures = await db
      .select()
      .from(summaries)
      .where(eq(summaries.userId, userId));

    return new Response(JSON.stringify({ lectures: userLectures }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
    });
  }
}
