import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { Mongo } from "spinach-nft-common/controller/const";

export const auth = betterAuth({
  database: mongodbAdapter(Mongo.db("admin_auth")), 
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username()
  ]
});
