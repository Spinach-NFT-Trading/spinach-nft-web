"use server";

import {ObjectId} from "mongodb";
import {headers} from "next/headers";

import {auth} from "@/lib/auth";
import {getUserCollection, hasAnyUsers, requireAdmin} from "@/lib/session";


type CreateUserOpts = {
  username: string,
  password: string,
  name: string,
  notes?: string,
};

type ChangePasswordOpts = {
  userId: string,
  newPassword: string,
};

type UpdateUserNotesOpts = {
  userId: string,
  notes: string,
};

export const createUserAction = async (opts: CreateUserOpts) => {
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
};

export const changePasswordAction = async (opts: ChangePasswordOpts) => {
  await requireAdmin();
  return auth.api.setUserPassword({
    body: {userId: opts.userId, newPassword: opts.newPassword},
    headers: await headers(),
  });
};

export const deleteUserAction = async (userId: string) => {
  await requireAdmin();
  try {
    const result = await auth.api.removeUser({
      body: {userId},
      headers: await headers(),
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUserNotesAction = async (opts: UpdateUserNotesOpts) => {
  await requireAdmin();
  await getUserCollection().updateOne(
    {_id: new ObjectId(opts.userId)},
    {$set: {notes: opts.notes}},
  );
};

export const listUsersAction = async () => {
  await requireAdmin();
  return auth.api.listUsers({query: {}, headers: await headers()});
};

export const setUserRoleAction = async (userId: string, role: string) => {
  await requireAdmin();
  const validRoles = ["user", "admin"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  await auth.api.setRole({
    body: {userId, role: role as "user" | "admin"},
    headers: await headers(),
  });
};

export const checkHasUsersAction = async () => {
  return hasAnyUsers();
};
