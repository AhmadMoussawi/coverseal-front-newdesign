import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../../lib/types";
import nextConnect from "next-connect";
import Cors from "cors";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import rateLimit from "../../utils/rate-limit";
import validateFormData from "../../lib/middleware/validateFormData";
import connectToCms from "../../lib/middleware/connectToCms";
import createEntryToCms from "../../lib/middleware/createEntryToCms";
import sendMail from "../../lib/middleware/sendMail";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
const requiredFields = ["mail", "language"];

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
      origin: ["https://coverseal-stage.fr"],
    })
  )
  .use(validateFormData(requiredFields))
  .use(connectToCms("newletter_mails"))
  .use(
    createEntryToCms<NewsLetterData, Partial<NewsLetterDirectus>>(
      "newletter_mails",
      (data, res) => {
        const { nextEntryId } = res.locals;
        return {
          ...data,
          custom_id: nextEntryId,
        };
      },
      true
    )
  )
  .use(
    sendMail({
      contentKey: "newsletter",
      withoutCc: true,
    })
  )
  .post((req, res) => {
    res.status(200).json({ status: "ok" });
  });

export default handler;
