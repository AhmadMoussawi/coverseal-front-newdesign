import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../types";
import type { NextHandler } from "next-connect";

const createEntryToCms =
  <BodyType, PayloadType>(
    collection: string,
    dataConstructor: (
      data: BodyType,
      res: CustomNextApiResponse
    ) => PayloadType,
    canFail?: boolean
  ) =>
  async (
    req: NextApiRequest,
    res: CustomNextApiResponse,
    next: NextHandler
  ) => {
    try {
      const { directus, parsedBody } = res.locals;

      await directus
        .items<string, PayloadType>(collection)
        .createOne(dataConstructor(parsedBody as BodyType, res));

      next();
    } catch (error) {
      const message = `Can't create new entry in collection: ${collection}`;
      console.error(error);
      console.error(message);
      if (canFail) {
        next();
      } else {
        res.status(500).json({
          success: false,
          message,
        });
      }
    }
  };

export default createEntryToCms;
