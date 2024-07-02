import { fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import { db } from '$lib/server/db'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ACCOUNTS = 'ACCOUNTS'
}

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in
  if (locals.user) {
    redirect(302, '/')
  }
}

const register: Action = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const email = data.get('email')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string'    ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const existingEmail = await db.user.findUnique({ where: { email } });

  if (existingEmail) {
    return fail(400, { email: true })
  }

  const user = await db.user.findUnique({
    where: { username },
  })

  if (user) {
    return fail(400, { user: true })
  }

  await db.user.create({
    data: {
      username,
      passwordHash: await bcrypt.hash(password, 10),
      email,
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: Roles.USER } },
      isApproved: false
    },
  })

  redirect(303, '/login')

  return { success: true, message: 'Registration successful. Please wait for admin approval.' }
}



export const actions: Actions = { register }
