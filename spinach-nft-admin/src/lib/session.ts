import {cache} from "react";

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {Mongo} from "@spinach/common/controller/const";

export const getSession = cache(async () => {
  return auth.api.getSession({headers: await headers()});
});

export const getUserCollection = () => {
  return Mongo.db("admin_auth").collection("user");
};

export const hasAnyUsers = async (): Promise<boolean> => {
  const count = await getUserCollection().countDocuments({}, {limit: 1});
  return count > 0;
};
