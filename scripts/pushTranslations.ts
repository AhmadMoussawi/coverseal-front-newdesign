import { Directus } from "@directus/sdk";
import { generateTranslation } from "./translations/generateTranslationTemplate";

require("dotenv").config({ path: "../.env" });

const directus = new Directus(process.env.CMS_PUBLIC_URL);

export async function pushTranslationsScript() {
  // auth
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  const translations = [
    generateTranslation("fr-FR"),
    generateTranslation("fr-BE"),
    generateTranslation("nl-BE"),
    generateTranslation("nl-NL"),
    generateTranslation("de-DE"),
    generateTranslation("en-GB"),
  ];

  for (const translation of translations) {
    for (const [collectionName, collectionObject] of Object.entries(
      translation.singleCollections
    )) {
      const uploadedTranslations = await directus
        .singleton(collectionName)
        .read({
          fields: "translations",
        })
        .then((res: any) => {
          return res.translations || [];
        });

      await directus.singleton(collectionName).update({
        translations: [
          ...uploadedTranslations,
          translation.singleCollections[collectionName],
        ],
      });
    }

    for (const [collectionName, collection] of Object.entries(
      translation.nonSingleCollections
    )) {
      for (let i = 0; i < collection.length; i++) {
        const id = i + 1;

        const uploadedTranslations = await directus
          .items(collectionName)
          .readOne(id, {
            fields: "translations",
          })
          .then((res: any) => res.translations);

        await directus.transport.patch(`/items/${collectionName}/${id}`, {
          translations: [
            ...uploadedTranslations,
            translation.nonSingleCollections[collectionName][i],
          ].filter((item) => Boolean(item)),
        });
      }
    }
  }
}
