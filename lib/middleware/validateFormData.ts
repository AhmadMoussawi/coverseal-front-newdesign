import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../types";
import type { NextHandler } from "next-connect";

const validateFormData =
  (requiredFields: string[]) =>
  (req: NextApiRequest, res: CustomNextApiResponse, next: NextHandler) => {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    for (const field of requiredFields) {
      if(field == "address")
      {
        if (!body[field])
        {
          res.status(400).json({
            success: false,
            message: `Wrong data: ${field} is a required field`,
          });
        }
      }
      else{
      if (!body[field] || typeof body[field] !== "string") {
        res.status(400).json({
          success: false,
          message: `Wrong data: ${field} is a required field`,
        });
      }
    }
    }
    res.locals.parsedBody = body;
    next();
  };

export default validateFormData;
