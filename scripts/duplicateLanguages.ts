import { Directus } from "@directus/sdk";
require("dotenv").config({ path: "../.env" });

const directus = new Directus(process.env.CMS_PUBLIC_URL);

const NEW_LANGUAGE = "fr-LU";
const LANGUAGE_TO_DUPLICATE = "fr-BE";

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

    const translation = await directus.items(collectionName).readMany({
      limit: 10000,
    });

    const translationEsExist = translation.data.some(
      (item: any) => item.languages_code === NEW_LANGUAGE
    );

    if (translationEsExist) {
      continue;
    }

    console.log(collectionName);

    const englishTranslations = translation.data.filter(
      (item: any) => item.languages_code === LANGUAGE_TO_DUPLICATE
    );

    try {
      await directus
        .items(collectionName)
        .createMany(
          englishTranslations.map((item) => {
            const updated: any = {
              ...item,
              languages_code: NEW_LANGUAGE,
            };
            delete updated.id;
            return updated;
          })
        )
        .then((res) => {
          console.log("HERE success", res);
        });
    } catch (error) {
      console.log("HERE fail", error);
    }
  }
}

main();
