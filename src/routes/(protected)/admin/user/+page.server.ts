// import { redirect } from '@sveltejs/kit';
// import type { PageServerLoad, Actions } from './$types';
// import { db } from '$lib/server/db';

// export const load: PageServerLoad = async ({ locals }) => {
//   if (!locals.user || locals.user.role !== 'ADMIN') {
//     throw redirect(302, '/');
//   }

//   const [pendingUsers, approvedUsers, declinedUsers] = await Promise.all([
//     db.user.findMany({
//       where: { status: 'PENDING' },
//       select: { id: true, username: true, email: true, createdAt: true }
//     }),
//     db.user.findMany({
//       where: { status: 'APPROVED' },
//       select: { id: true, username: true, email: true, createdAt: true }
//     }),
//     db.user.findMany({
//       where: { status: 'DECLINED' },
//       select: { id: true, username: true, email: true, createdAt: true }
//     })
//   ]);

//   return { pendingUsers, approvedUsers, declinedUsers };
// };

// export const actions: Actions = {
//   approve: async ({ request }) => {
//     const data = await request.formData();
//     const userId = data.get('userId');

//     if (typeof userId !== 'string') {
//       return { success: false, message: 'Invalid user ID' };
//     }

//     await db.user.update({
//       where: { id: userId },
//       data: { status: 'APPROVED' }
//     });

//     return { 
//       success: true,
//       message: 'User approved successfully',
//       userId
//     };
//   },

//   decline: async ({ request }) => {
//     const data = await request.formData();
//     const userId = data.get('userId');

//     if (typeof userId !== 'string') {
//       return { success: false, message: 'Invalid user ID' };
//     }

//     await db.user.update({
//       where: { id: userId },
//       data: { status: 'DECLINED' }
//     });

//     return { 
//       success: true,
//       message: 'User declined',
//       userId
//     };
//   }
// };