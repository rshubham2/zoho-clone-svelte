import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/db';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const sessionId = cookies.get('session');

  if (sessionId) {
    const user = await prisma.user.findUnique({ where: { id: sessionId } });
    if (user) {
      return {
        user: { id: user.id, name: user.name, email: user.email }
      };
    }
  }

  return { user: null };
};