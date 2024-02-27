import { Directus } from "@directus/sdk";
import path from "path";
import {
  makeCollection,
  createTranslationsCollection,
  addTranslations,
} from "./utils/collection";
import type { CollectionsMap } from "./types";
import { pageCollections } from "./pageCollections";
import { allPageTranslatedFields } from "./allPageFields";
import { globalCollection } from "./globalCollection";
import {
  achievementsCollection,
  achievementsCategoriesCollection,
  achievementsSection,
} from "./achievements";
import { faqCategoriesCollection, faqCollection } from "./faq";
import { modelsCollection } from "./models";
import { jobsCollection } from "./job";
import { userCollection } from "./user";
import { uploadFile } from "./utils/file";

require("dotenv").config({ path: "../.env" });
const directus = new Directus(process.env.CMS_PUBLIC_URL);

const pathToAssets = path.join(__dirname, "../assets");

const files: PreUploadedFile[] = [
  // the coverseal
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/certificate_image_opti.png"
    ),
    fileName: "certificate_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/comfort_image_opti.png"
    ),
    fileName: "comfort_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/comfort_image_2_opti.png"
    ),
    fileName: "comfort_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/discretion_image_opti.png"
    ),
    fileName: "discretion_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/discretion_image_2_opti.png"
    ),
    fileName: "discretion_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/the_coverseal/discretion_image_3_opti.png"
    ),
    fileName: "discretion_image_3",
  },
  // benefits
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/benefits/security_image_opti.png"
    ),
    fileName: "security_image",
  },
  // models
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/dressing_image_opti.png"
    ),
    fileName: "dressing_image",
  },
  // each model
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/automatic/product_image_opti.png"
    ),
    fileName: "automatic_product_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/automatic/product_image_2_opti.png"
    ),
    fileName: "automatic_product_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/automatic/home_image_opti.png"
    ),
    fileName: "home_image_automatic",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/semi_automatic/product_image_opti.png"
    ),
    fileName: "semi_automatic_product_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/automatic/product_image_2_opti.png"
    ),
    fileName: "semi_automatic_product_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/semi_automatic/home_image_opti.png"
    ),
    fileName: "home_image_semi_automatic",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/manual/product_image_opti.png"
    ),
    fileName: "manual_product_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/manual/product_image_2_opti.png"
    ),
    fileName: "manual_product_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/models/manual/home_image_opti.png"
    ),
    fileName: "home_image_manual",
  },
  // about us
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/about_us/history_image_opti.png"
    ),
    fileName: "history_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/about_us/history_image_2_opti.png"
    ),
    fileName: "history_image_2",
  },
  // partnerships
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/partnerships/partnerships_image_opti.png"
    ),
    fileName: "partnerships_image",
  },
  // home
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/home/coverseal_image_opti.png"
    ),
    fileName: "coverseal_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/home/coverseal_image_2_opti.png"
    ),
    fileName: "coverseal_image_2",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/home/benefits_image_opti.png"
    ),
    fileName: "benefits_image",
  },
  // achievements
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/first_image.jpg"
    ),
    fileName: "julie_and_maxime_first_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/second_image.jpg"
    ),
    fileName: "julie_and_maxime_second_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/third_image.jpg"
    ),
    fileName: "julie_and_maxime_third_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/fourth_image.jpg"
    ),
    fileName: "julie_and_maxime_fourth_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/fifth_image.jpg"
    ),
    fileName: "julie_and_maxime_fifth_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/julie_and_maxime/sixth_image.jpg"
    ),
    fileName: "julie_and_maxime_sixth_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/louise_and_martin/first_image_opti.png"
    ),
    fileName: "louise_and_martin_first_image",
  },
  {
    filePath: path.join(
      pathToAssets,
      "croped_opti/achievements/louise_and_martin/second_image_opti.png"
    ),
    fileName: "louise_and_martin_second_image",
  },
];

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
  users: userCollection,
};

export async function setupScript() {
  // auth
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  const fileStorage = process.env.FILE_STORAGE;

  // upload files first
  const requests = files.map(({ fileName, filePath }) =>
    uploadFile(directus, filePath, fileName, fileStorage)
  );

  const uploadedFilesRaw = await Promise.all(requests);

  const uploadedFilesIndex = uploadedFilesRaw.reduce(
    (acc: Partial<AllFiles>, { fileName, id }) => {
      acc[fileName] = { fileName, id };
      return acc;
    },
    {}
  );

  // setup for translations
  try {
    await createTranslationsCollection(directus);
  } catch (error) {
    console.log(error);
  }

  // create collections and fields
  for (const [collectionName, data] of Object.entries(collections)) {
    try {
      await directus.transport.post(
        "/collections",
        makeCollection(
          collectionName,
          data.description,
          data.isSingleton,
          data.isHidden
        )
      );
    } catch (error) {
      console.log(error);
    }

    if (!data.noTranslation) {
      const collectionTranslationName = `${collectionName}_translations`;
      try {
        await addTranslations(directus, collectionName, data.translationField);
      } catch (error) {
        console.log(error);
      }

      if (data.isPage) {
        for (const field of allPageTranslatedFields) {
          try {
            await directus.transport.post(
              `/fields/${collectionTranslationName}`,
              {
                collection: collectionTranslationName,
                ...field,
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      }

      if (data.translatedFields) {
        for (const field of data.translatedFields) {
          try {
            await directus.transport.post(
              `/fields/${collectionTranslationName}`,
              {
                collection: collectionTranslationName,
                ...field,
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    if (data.fields) {
      for (const field of data.fields) {
        try {
          await directus.transport.post(`/fields/${collectionName}`, {
            collection: collectionName,
            ...field,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (data.relations) {
      for (const relation of data.relations) {
        try {
          await directus.transport.post("/relations", relation);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  // create FAQ categories
  const faqCategories = [
    {
      reference: "general",
    },
    {
      reference: "practice",
    },
    {
      reference: "after-sale",
    },
  ];
  for (const item of faqCategories) {
    await directus.transport.post("/items/faq_categories", {
      ...item,
      translations: [],
    });
  }

  // create FAQ questions
  const faqItems = [{ category: 1 }, { category: 2 }, { category: 3 }];
  for (const item of faqItems) {
    await directus.transport.post("/items/faq", {
      ...item,
      translations: [],
    });
  }

  // create models items
  const models = [
    {
      reference: "automatic",
      product_image: uploadedFilesIndex.automatic_product_image!.id,
      product_image_2: uploadedFilesIndex.automatic_product_image_2!.id,
      home_image: uploadedFilesIndex.home_image_automatic!.id,
      technical_info_file: uploadedFilesIndex.home_image_automatic!.id,
    },
    {
      reference: "semi-automatic",
      product_image: uploadedFilesIndex.semi_automatic_product_image!.id,
      product_image_2: uploadedFilesIndex.semi_automatic_product_image_2!.id,
      home_image: uploadedFilesIndex.home_image_semi_automatic!.id,
    },
    {
      reference: "manual",
      product_image: uploadedFilesIndex.manual_product_image!.id,
      product_image_2: uploadedFilesIndex.manual_product_image_2!.id,
      home_image: uploadedFilesIndex.home_image_manual!.id,
    },
  ];

  for (const item of models) {
    await directus.transport.post("/items/models", {
      ...item,
      translations: [],
    });
  }

  const achievementsCategories = [
    {
      reference: "a-to-z",
    },
    {
      reference: "inspirations",
    },
  ];
  // create achievements categories
  for (const item of achievementsCategories) {
    await directus.transport.post("/items/achievements_categories", {
      ...item,
      translations: [],
    });
  }

  const jobs = [
    {
      reference: "marketing-assistant",
    },
    {
      reference: "project-manager",
    },
    {
      reference: "technician",
    },
  ];
  // create jobs
  for (const item of jobs) {
    await directus.transport.post("/items/jobs", {
      ...item,
      translations: [],
    });
  }

  // create achievements sections
  const sections = [
    // julie and maxime
    {
      reference: "intro-image-julie-and-maxime",
      type: "image_only",
      image: uploadedFilesIndex.julie_and_maxime_first_image!.id,
    },
    {
      reference: "intro-text-julie-and-maxime",
      type: "text_only",
    },
    {
      reference: "01-julie-and-maxime",
      type: "text_image",
      text_image_variant: "image_left",
      image: uploadedFilesIndex.julie_and_maxime_second_image!.id,
    },
    {
      reference: "02-julie-and-maxime",
      type: "text_only",
    },
    {
      reference: "03-julie-and-maxime",
      type: "text_image",
      text_image_variant: "image_right",
      image: uploadedFilesIndex.julie_and_maxime_third_image!.id,
    },
    {
      reference: "04-julie-and-maxime",
      type: "text_image",
      text_image_variant: "image_left",
      image: uploadedFilesIndex.julie_and_maxime_fourth_image!.id,
    },
    {
      reference: "image-full-julie-and-maxime",
      type: "image_only",
      image: uploadedFilesIndex.julie_and_maxime_fifth_image!.id,
    },
    {
      reference: "05-julie-and-maxime",
      type: "text_image",
      text_image_variant: "image_right",
      image: uploadedFilesIndex.julie_and_maxime_sixth_image!.id,
    },
    // louise and martin
    {
      reference: "intro-louise-and-martin",
      type: "text_image",
      text_image_variant: "image_left",
      image: uploadedFilesIndex.louise_and_martin_first_image!.id,
    },
    {
      reference: "02-louise-and-martin",
      type: "text_image",
      text_image_variant: "image_right",
      image: uploadedFilesIndex.louise_and_martin_second_image!.id,
    },
    {
      reference: "03-louise-and-martin",
      type: "double_images",
      double_images_variant: "images_overlap_1",
      image: uploadedFilesIndex.coverseal_image!.id,
      image_2: uploadedFilesIndex.coverseal_image_2!.id,
    },
    {
      reference: "04-louise-and-martin",
      type: "double_images",
      double_images_variant: "images_equal",
      image: uploadedFilesIndex.benefits_image!.id,
      image_2: uploadedFilesIndex.benefits_image!.id,
    },
    {
      reference: "05-louise-and-martin",
      type: "double_images",
      double_images_variant: "images_overlap_2",
      image: uploadedFilesIndex.dressing_image!.id,
      image_2: uploadedFilesIndex.security_image!.id,
    },
    {
      reference: "06-louise-and-martin",
      type: "double_images",
      double_images_variant: "images_overlap_3",
      image_2: uploadedFilesIndex.coverseal_image!.id,
      image: uploadedFilesIndex.security_image!.id,
    },
  ];

  for (const item of sections) {
    await directus.transport.post("/items/achievements_sections", {
      ...item,
      translations: [],
    });
  }

  // create achievements
  const achievements = [
    {
      reference: "louise-and-martin",
      list_image: uploadedFilesIndex.benefits_image!.id,
      model: 1,
      category: 2,
      sections: [9, 10, 11, 12, 13, 14],
    },
    {
      reference: "julie-and-maxime",
      list_image: uploadedFilesIndex.benefits_image!.id,
      model: 2,
      category: 1,
      sections: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  ];

  for (const item of achievements) {
    await directus.transport.post("/items/achievements", {
      ...item,
      translations: [],
    });
  }

  // fill all non translated fields (mainly images)
  await directus.transport.patch("/items/the_coverseal_template", {
    certificate_image: uploadedFilesIndex.certificate_image!.id,
    comfort_image: uploadedFilesIndex.comfort_image!.id,
    comfort_image_2: uploadedFilesIndex.comfort_image_2!.id,
    discretion_image: uploadedFilesIndex.discretion_image!.id,
    discretion_image_2: uploadedFilesIndex.discretion_image_2!.id,
    discretion_image_3: uploadedFilesIndex.discretion_image_3!.id,
  });

  await directus.transport.patch("/items/home_template", {
    coverseal_image: uploadedFilesIndex.coverseal_image!.id,
    coverseal_image_2: uploadedFilesIndex.coverseal_image_2!.id,
    benefits_image: uploadedFilesIndex.benefits_image!.id,
  });

  await directus.transport.patch("/items/benefits_template", {
    security_image: uploadedFilesIndex.security_image!.id,
  });

  await directus.transport.patch("/items/models_template", {
    membrane_colors: [
      {
        color_name: "RAL 9005",
        color_code: "#000000",
      },
      {
        color_name: "RAL 5013",
        color_code: "#193153",
      },
      {
        color_name: "RAL 5015",
        color_code: "#007CB0",
      },
      {
        color_name: "RAL 6026",
        color_code: "#005F4E",
      },
      {
        color_name: "RAL 7037",
        color_code: "#7A7B7A",
      },
      {
        color_name: "RAL 1015",
        color_code: "#E6D2B5",
      },
    ],
    dressing_image: uploadedFilesIndex.dressing_image!.id,
  });

  await directus.transport.patch("/items/about_us_template", {
    history_image: uploadedFilesIndex.history_image!.id,
    history_image_2: uploadedFilesIndex.history_image_2!.id,
  });

  await directus.transport.patch("/items/partnerships_template", {
    partnerships_image: uploadedFilesIndex.partnerships_image!.id,
  });

  await directus.transport.patch("/items/global", {
    facebook_link: "#",
    linkedin_link: "#",
    instagram_link: "#",
    youtube_link: "#",
  });
}
