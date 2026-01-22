import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserRole } from '@/types';
import { NextResponse } from 'next/server';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await requireAuth();
  const userRole = (session.user as any).role;

  if (!allowedRoles.includes(userRole)) {
    throw new Error('Forbidden');
  }

  return session;
}

export function handleApiError(error: any) {
  console.error('API Error:', error);

  if (error.message === 'Unauthorized') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (error.message === 'Forbidden') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json(
    { error: error.message || 'Internal Server Error' },
    { status: 500 }
  );
}
