import { Directus, TypeMap } from "@directus/sdk";
import FormData from "form-data";
import fs from "fs";

export async function uploadFile(
  directus: Directus<TypeMap>,
  filePath: string,
  fileName: keyof AllFiles,
  fileStorage: string
): Promise<UploadedFile> {
  const file = fs.createReadStream(filePath);

  const formData = new FormData();
  formData.append("title", fileName);
  formData.append("storage", fileStorage);
  formData.append("file", file);

  return directus.transport
    .post("/files", formData, {
      headers: formData.getHeaders(),
    })
    .then((res) => ({
      id: res.data.id,
      fileName,
    }));
}
