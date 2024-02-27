import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../types";
import type { NextHandler } from "next-connect";
import AWS from "aws-sdk";
import fs from "fs";

AWS.config.update({
  region: "eu-central-1",
});

const uploadFilesToS3 =
  <T extends { full_name: string, first_name:string, last_name:string }>(folderName: string) =>
  async (
    req: NextApiRequest & { files: [{ path: string; originalname: string }] },
    res: CustomNextApiResponse,
    next: NextHandler
  ) => {
    try {
      const { nextEntryId, parsedBody } = res.locals;
      const data = parsedBody as T;

      const requests = req.files.map((file, i) => {
        const parts = file.originalname.split(".");
        const fileExtension = parts[parts.length - 1];
        var  filetypes = "exe|jsp|rar|zip|html|php|asp|aspx|gif|js";
        if(!filetypes.includes(fileExtension))
        {
        const stream = fs.createReadStream(file.path);
        var fulldata = data.first_name + "_" + data.last_name;
        if(fulldata)
        fulldata = fulldata.toLowerCase()
        .replace(/\s/g, "_");
        return new AWS.S3.ManagedUpload({
          params: {
            Bucket: "becoflex-frontend-storage-bucket",//"becoflex-storage-staging",
            Key: `${folderName}/${nextEntryId}_${fulldata}_image_${i}.${fileExtension}`,
            Body: stream,
          },
        })
          .promise()
          .then((data) => {
            console.log("success", data);
            return data;
          });
        }
        else{
          return null;
        }
      });

      res.locals.uploaded_files = await Promise.all(requests).then(
        (responses) => responses.map((item) => ({ url: item.Location }))
      );

      // delete files on disk
      req.files.map((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`File ${file.originalname} successfully deleted`);
        });
      });

      next();
    } catch (error) {
      const errorMessage = "Can't upload files to S3";
      console.error(error);
      console.error(errorMessage);

      // delete files on disk
      req.files.map((file) => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`File ${file.originalname} successfully deleted`);
        });
      });

      res.status(500).json({
        success: false,
        message: error,
      });
    }
  };

export default uploadFilesToS3;
