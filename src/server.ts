import express from "express";
import { nextApp, nextHandler } from "./nextUtils";
import { getPayloadClient } from "./getPayload";

const app = express();
const PORT = Number(process.env.PORT) || 3005;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    // payload.logger.info("Next.js started");

    app.listen(PORT, async () => {
      // payload.logger.info(
      //   `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      // );
    });
  });
};

start();