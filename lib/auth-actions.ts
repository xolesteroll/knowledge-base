// app/actions/auth.ts
'use server';

import { db } from '@/db/db';
import { users, userRoles, sessions } from '@/db/schema';
import { eq, and, gt, desc } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { signIn, signOut } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { AuthFormsState } from './types/forms';

export async function registerUser(prevState: AuthFormsState, formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return { error: 'All fields are required' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

//   if (password.length < 8) {
//     return { error: 'Password must be at least 8 characters' };
//   }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email address' };
  }

  try {
    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: 'Email already registered' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await db.insert(users).values({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`, // For adapter
      email,
      password: hashedPassword,
      level: 0,
      isVerified: true, // Set to true for now, or false if you want email verification
    }).returning();

    // Assign default role (player)
    await db.insert(userRoles).values({
      userId: newUser.id,
      role: 'player',
    });

    // Auto sign in after registration
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      // Sign in error is okay, user can log in manually
      console.error('Auto sign-in failed:', error);
    }

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
    
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
}

export async function logoutUser() {
  await signOut({ redirectTo: '/login' });
}

// Admin functions for session management
export async function getActiveSessions() {
  const now = new Date();
  
  const activeSessions = await db.query.sessions.findMany({
    where: gt(sessions.expires, now),
    with: {
      user: {
        with: {
          roles: true,
        },
      },
    },
    orderBy: desc(sessions.createdAt),
  });

  return activeSessions.map(session => ({
    sessionToken: session.sessionToken,
    userId: session.userId,
    userName: session.user.name || `${session.user.firstName} ${session.user.lastName}`,
    email: session.user.email,
    roles: session.user.roles.map(r => r.role),
    lastActive: session.createdAt,
    expires: session.expires,
  }));
}

export async function getUserSessions(userId: string) {
  const now = new Date();
  
  const userSessions = await db
    .select()
    .from(sessions)
    .where(and(
      eq(sessions.userId, userId),
      gt(sessions.expires, now)
    ))
    .orderBy(desc(sessions.createdAt));

  return userSessions;
}

export async function revokeSession(sessionToken: string) {
  try {
    await db
      .delete(sessions)
      .where(eq(sessions.sessionToken, sessionToken));
    
    revalidatePath('/admin/sessions');
    return { success: true };
  } catch (error) {
    console.error('Error revoking session:', error);
    return { error: 'Failed to revoke session' };
  }
}

export async function revokeAllUserSessions(userId: string) {
  try {
    await db
      .delete(sessions)
      .where(eq(sessions.userId, userId));
    
    revalidatePath('/admin/sessions');
    revalidatePath('/admin/users');
    return { success: true, message: 'All sessions revoked' };
  } catch (error) {
    console.error('Error revoking sessions:', error);
    return { error: 'Failed to revoke sessions' };
  }
}

export async function toggleUserStatus(userId: string, isVerified: boolean) {
  try {
    // Update user status
    await db
      .update(users)
      .set({ isVerified, updatedAt: new Date() })
      .where(eq(users.id, userId));

    // If deactivating, revoke all sessions
    if (!isVerified) {
      await db
        .delete(sessions)
        .where(eq(sessions.userId, userId));
    }

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error toggling user status:', error);
    return { error: 'Failed to update user status' };
  }
}