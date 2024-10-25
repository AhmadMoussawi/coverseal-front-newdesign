import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../../lib/types";
import multer from "multer";
import nextConnect from "next-connect";
import Cors from "cors";
import rateLimit from "../../utils/rate-limit";
import validateFormData from "../../lib/middleware/validateFormData";
import connectToCms from "../../lib/middleware/connectToCms";
import uploadFilesToS3 from "../../lib/middleware/uploadFilesToS3";
import createEntryToCms from "../../lib/middleware/createEntryToCms";
import sendMail from "../../lib/middleware/sendMail";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";

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

const requiredFields = [
  "first_name",
  "last_name",
  "mail",
  "phone",
  "problem_description",
  "language",
  "zip_code",
  "country",
];

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
  .use(upload.array("add_photos", 3))
  .use(validateFormData(requiredFields))
  .use(connectToCms("after_sale_users"))
  .use(uploadFilesToS3("after_sale_uploads"))
  .use(
    createEntryToCms<AfterSaleTextData, Partial<AfterSaleDirectus>>(
      "after_sale_users",
      (data, res) => {
        data.full_name = data.first_name +" "+ data.last_name;
        const { nextEntryId } = res.locals;
        return {
          ...data,
          uploaded_files: res.locals.uploaded_files,
          custom_id: nextEntryId,
        };
      }
    )
  )
  .use(
    sendMail({
      contentKey: "after_sale",
    })
  )
  .post((req, res) => {
    res.status(200).json({ status: "ok" });
  });

export default handler;
