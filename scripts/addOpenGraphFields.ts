import { Directus } from "@directus/sdk";
import { pageCollections } from "./pageCollections";
import { allPageTranslatedFields } from "./allPageFields";
import { globalCollection } from "./globalCollection";
import {
  achievementsCollection,
  achievementsCategoriesCollection,
  achievementsSection,
} from "./achievements";
import { faqCategoriesCollection, faqCollection } from "./faq";
import type { CollectionsMap } from "./types";
import { modelsCollection } from "./models";
import { jobsCollection } from "./job";

const collections: CollectionsMap = {
  global: globalCollection,
  ...pageCollections,
  // faq_categories should be created before faq or the relation will create a crash
  faq_categories: faqCategoriesCollection,
  faq: faqCollection,
  models: modelsCollection,
  achievements_categories: achievementsCategoriesCollection,
  achievements_sections: achievementsSection,
  achievements: achievementsCollection,
  jobs: jobsCollection,
};

require("dotenv").config({ path: "../.env" });
const directus = new Directus(process.env.CMS_PUBLIC_URL);

async function main() {
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  for (const [collectionName, data] of Object.entries(collections)) {
    if (data.isPage) {
      console.log(collectionName);

      const collectionTranslationName = `${collectionName}_translations`;

      const description = {
        field: "opengraph_description",
        type: "text",
        schema: {
          is_nullable: false,
          default_value: "An open graph description",
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 6,
          hidden: false,
          interface: "input-multiline",
          options: null,
          display: null,
          display_options: null,
          readonly: false,
          special: null,
          note: "The content of the open graph description tag used when sharing to social networks",
        },
      };

      const image = {
        field: "opengraph_image",
        type: "uuid",
        schema: {
          is_nullable: true,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 1,
          hidden: false,
          interface: "file-image",
          display: "image",
          display_options: {},
          readonly: false,
          note: "The image of the open graph image tag used when sharing to social networks",
        },
      };

      try {
        await directus.transport.delete(`/fields/${collectionName}/opengrah_image`, {
          // collection: collectionName,
          // ...image,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main();
