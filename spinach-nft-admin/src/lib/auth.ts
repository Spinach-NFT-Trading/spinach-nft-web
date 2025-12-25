import {Mongo} from "@spinach/common/controller/const";
import {betterAuth} from "better-auth";
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {admin, username} from "better-auth/plugins";


const db = Mongo.db("admin_auth");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Check if this is the first user
          const userCount = await db.collection("user").countDocuments({}, {limit: 1});
          if (userCount === 0) {
            // First user becomes admin
            return {
              data: {
                ...user,
                role: "admin",
              },
            };
          }
          return {data: user};
        },
      },
    },
  },
});
