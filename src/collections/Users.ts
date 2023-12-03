import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "Users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<h2> Hi there, Please verify your email. </h2>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      // admin: {
      //   condition: ({ req }) => req.user.role === "admin",
      // },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};