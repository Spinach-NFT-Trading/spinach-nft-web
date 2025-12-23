"use server";

import {ObjectId} from "mongodb";

import {auth} from "@/lib/auth";
import {getSession, getUserCollection, hasAnyUsers} from "@/lib/session";
import {headers} from "next/headers";

type CreateUserOpts = {
  username: string;
  password: string;
  name: string;
  notes?: string;
};

type ChangePasswordOpts = {
  userId: string;
  newPassword: string;
};

type UpdateUserNotesOpts = {
  userId: string;
  notes: string;
};

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }
  return session;
}

export async function createUserAction(opts: CreateUserOpts) {
  await requireAdmin();
  const email = `${opts.username}@admin.local`;
  const result = await auth.api.createUser({
    body: {email, password: opts.password, name: opts.name, role: "user"},
  });

  // Update notes if provided
  if (opts.notes && result.user?.id) {
    await getUserCollection().updateOne(
      {_id: new ObjectId(result.user.id)},
      {$set: {notes: opts.notes}},
    );
  }

  return result;
}

export async function changePasswordAction(opts: ChangePasswordOpts) {
  await requireAdmin();
  return auth.api.setUserPassword({
    body: {userId: opts.userId, newPassword: opts.newPassword},
    headers: await headers(),
  });
}

export async function deleteUserAction(userId: string) {
  await requireAdmin();
  console.log(`Deleting user: ${userId}`);
  try {
    const result = await auth.api.removeUser({
      body: {userId},
      headers: await headers(),
    });
    console.log(`Delete result for ${userId}:`, result);
    return result;
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);
    throw error;
  }
}

export async function updateUserNotesAction(opts: UpdateUserNotesOpts) {
  await requireAdmin();
  await getUserCollection().updateOne(
    {_id: new ObjectId(opts.userId)},
    {$set: {notes: opts.notes}},
  );
}

export async function listUsersAction() {
  await requireAdmin();
  return auth.api.listUsers({query: {}, headers: await headers()});
}

export async function setUserRoleAction(userId: string, role: string) {
  await requireAdmin();
  const validRoles = ["user", "admin"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  await auth.api.setRole({
    body: {userId, role: role as "user" | "admin"},
    headers: await headers(),
  });
}

export async function checkHasUsersAction() {
  return hasAnyUsers();
}
