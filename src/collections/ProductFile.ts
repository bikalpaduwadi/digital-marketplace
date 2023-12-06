import { Access, CollectionConfig } from "payload/types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

import { User } from "../payload-types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;

  return { ...data, user: user?.id };
};

const youOwnOrPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (!user) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFilesIds = products.map((prod) => prod.product_files).flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductFileIds = orders
    .map((order) => {
      return order.products
        .map((product) => {
          if (typeof product === "string") {
            return null;
          }

          return typeof product.product_files === "string"
            ? product.product_files
            : product.product_files.id;
        })
        .filter(Boolean);
    })
    .flat();

  return {
    id: {
      in: [...ownProductFilesIds, ...purchasedProductFileIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: youOwnOrPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "Users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
