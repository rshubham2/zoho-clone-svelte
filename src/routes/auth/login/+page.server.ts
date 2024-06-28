import type { Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import prisma from '$lib/server/db';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, error: 'Invalid email or password' };
      }

      cookies.set('session', user.id, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 7 });

      return { success: true, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  },
};