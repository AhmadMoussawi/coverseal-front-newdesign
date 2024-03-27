import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../../lib/types";
import multer from "multer";
import nextConnect from "next-connect";
import Cors from "cors";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import rateLimit from "../../utils/rate-limit";
import validateFormData from "../../lib/middleware/validateFormData";
import connectToCms from "../../lib/middleware/connectToCms";
import createEntryToCms from "../../lib/middleware/createEntryToCms";
import sendMail from "../../lib/middleware/sendMail";

const upload = multer({
  storage: multer.memoryStorage(),
});
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const requiredFields = ["mail", "language"];

// TODO: add send mail to the user that wanted a catalog
const handler = nextConnect<NextApiRequest, CustomNextApiResponse>()
  .use(async (req, res, next) => {
    res.locals = {};
    try {
      await limiter.check(res, LIMIT_REQUEST_BY_MINUTE, "CACHE_TOKEN");
      next();
    } catch (error) {
      console.error(error);
      res.status(429).json({ error: "Rate limit exceeded" });
    }
  })
  .use(
    Cors({
      origin: ["https://coverseal-stage.com"],
    })
  )
  .use(upload.array("add_documents", 3))
  .use(validateFormData(requiredFields))
  .use(connectToCms("catalog_request_users"))
  .use(
    createEntryToCms<
      CatalogRequestTextData,
      Partial<CatalogRequestFormDirectus>
    >("catalog_request_users", (data, res) => {
      data.full_name = data.first_name +" "+ data.last_name;
      const { nextEntryId } = res.locals;
      return {
        ...data,
        custom_id: nextEntryId,
      };
    })
  )
  .use(
    sendMail({
      contentKey: "catalog_request",
      withCatalog: true,
    })
  )
  // .post((req, res) => {
  //   res.status(200).json({ status: "ok" });
  // });

export default handler;
