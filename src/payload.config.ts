import path from "path";
import dotenv from "dotenv";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

import { Users } from "./collections/Users";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "Users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- DigitalMarket",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },

  rateLimit: {
    max: 2000,
  },

  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGO_DB_URL!,
  }),

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
