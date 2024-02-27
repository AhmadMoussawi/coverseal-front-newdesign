import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../types";
import type { NextHandler } from "next-connect";
import { Directus } from "@directus/sdk";

const connectToCms =
  (collection: string) =>
  async (
    req: NextApiRequest,
    res: CustomNextApiResponse,
    next: NextHandler
  ) => {
    try {
      const directus =  new Directus(process.env.CMS_INTERNAL_URL);
      await directus.auth.login({
        email: process.env.CMS_USER,
        password: process.env.CMS_PASSWORD,
      });

      const lastEntry = await directus
        .items<string, IAnyObject>(collection)
        .readMany({ limit: 1, sort: ["-id"] as any })
        .then((response) => response.data);

      res.locals.directus = directus;
      res.locals.nextEntryId = (lastEntry.length>0?lastEntry[0].id:0) + 1;

      next();
    } catch (error) {
      const errorMessage = "Can't connect login to CMS or find last entry";
      console.error(error);
      console.error(errorMessage);
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  };

export default connectToCms;
