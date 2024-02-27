import { Directus } from "@directus/sdk";
require("dotenv").config({ path: "../.env" });

const directus = new Directus(process.env.CMS_PUBLIC_URL);

const NEW_LANGUAGE = "es-ES";

async function main() {
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  const collections = await directus.collections.readAll();

  const translationsCollections = collections.data.filter((collection: any) =>
    collection.collection.includes("translations")
  );

  for (const collection of translationsCollections) {
    const collectionName = (collection as any).collection;

    if (collectionName === "documents_template_translations_directus_files") {
      continue;
    }

    const translations: any[] = await directus
      .items(collectionName)
      .readMany({
        limit: 10000,
      })
      .then((res) => res.data);
    console.log(translations);

    for (const item of translations) {
      if (item.languages_code === NEW_LANGUAGE) {
        await directus
          .items(collectionName)
          .deleteOne(item.id)
          .then((res) => {
            console.log("HERE success", res);
          });
      }
    }
  }
}

main();
