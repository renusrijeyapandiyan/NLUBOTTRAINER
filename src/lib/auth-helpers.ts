import { NextRequest } from 'next/server';
import { db } from '@/db';
import { session } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
 
/**
 * Validates user session from cookies (recommended for API routes)
 * Returns user object if authenticated, null otherwise
 *
 * This calls better-auth directly in-process (no network request),
 * which avoids the self-fetch issues that can happen with betterFetch
 * calling the app's own public URL in production.
 */
export async function validateSessionFromCookies(request: NextRequest) {
  try {
    const authSession = await auth.api.getSession({
      headers: request.headers,
    });
 
    if (!authSession?.user) {
      return null;
    }
 
    return {
      userId: authSession.user.id,
      email: authSession.user.email,
      name: authSession.user.name,
    };
  } catch (error) {
    console.error('Session validation error:', error);
    return null;
  }
}
 
/**
 * @deprecated Use validateSessionFromCookies instead
 * Legacy function for Bearer token authentication
 */
export async function getCurrentUser(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
 
    const token = authHeader.substring(7);
 
    const sessionRecord = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);
 
    if (sessionRecord.length === 0) {
      return null;
    }
 
    const userSession = sessionRecord[0];
 
    if (new Date(userSession.expiresAt) < new Date()) {
      return null;
    }
 
    return { id: userSession.userId };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}
 