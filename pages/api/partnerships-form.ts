import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../../lib/types";
import multer from "multer";
import Cors from "cors";
import nextConnect from "next-connect";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import rateLimit from "../../utils/rate-limit";
import validateFormData from "../../lib/middleware/validateFormData";
import connectToCms from "../../lib/middleware/connectToCms";
import createEntryToCms from "../../lib/middleware/createEntryToCms";
import sendMail from "../../lib/middleware/sendMail";

const storage = multer.diskStorage({});
const upload = multer({
  storage,
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
const requiredFields = ["mail", "language", "country", "type", "zip_code"];

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
  .use(connectToCms("partnerships_users"))
  .use(
    createEntryToCms<PartnershipData, PartnershipData>(
      "partnerships_users",
      (data, res) => {
        const { nextEntryId } = res.locals;
        return {
          ...data,
          custom_id: nextEntryId,
        };
      }
    )
  )
  .use(
    sendMail({
      contentKey: "partnership",
    })
  )
  .post((req, res) => {
    res.status(200).json({ status: "ok" });
  });

export default handler;
