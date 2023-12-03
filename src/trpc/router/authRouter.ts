import { getPayloadClient } from "../../getPayload";
import { publicProcedure, router } from "../trpc";
import { COLLECTIONS } from "../constants/collections";
import { AuthCredentialsValidator } from "../../lib/validators/accountCredentialsValidator";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // Check if user already exists
      const { docs: users } = await payload.find({
        collection: "Users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await payload.create({
        collection: "Users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentEmail: email };
    }),
});
