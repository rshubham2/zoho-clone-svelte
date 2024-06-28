import type { Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import prisma from '$lib/server/db';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return { success: true, user: { id: user.id, username: user.username, email: user.email } };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  },
};