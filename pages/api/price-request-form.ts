import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../../lib/types";
import multer from "multer";
import Cors from "cors";
import nextConnect from "next-connect";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import rateLimit from "../../utils/rate-limit";
import uploadFilesToS3 from "../../lib/middleware/uploadFilesToS3";
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
const requiredFields = [
  "first_name",
  "last_name",
  "mail",
  "phone",
  "country",
  "zip_code",
  "language",
];

// TODO: add send mail to the user that wanted a catalog
const handler = nextConnect<NextApiRequest, CustomNextApiResponse>();
try{
  handler.use(async (req, res, next) => {
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
  .use(connectToCms("users"))
  .use(uploadFilesToS3("price_requests_uploads"))
  .use(
    createEntryToCms<PriceRequestTextData, Partial<PriceRequestFormDirectus>>(
      "users",
      (data, res) => {
        data.full_name = data.first_name +" "+ data.last_name;
        const { nextEntryId } = res.locals;
        return {
          ...data,
          pool_width: data.pool_width || undefined,
          pool_length: data.pool_length || undefined,
          uploaded_documents: res.locals.uploaded_files,
          custom_id: nextEntryId,
        };
      }
    )
  )
  .use(
    sendMail({
      contentKey: "price_request",
      withCatalog: true,
    })
  )
  .post((req, res) => {
    res.status(200).json({ status: "ok" });
  });
}
catch(error){
  handler.post((req, res) => {
    res.status(500).json({
      success: false,
      message: error,
    });
  });
}
export default handler;
