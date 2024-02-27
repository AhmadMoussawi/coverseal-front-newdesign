import { Directus } from "@directus/sdk";
require("dotenv").config({ path: "../.env" });

const directus = new Directus(process.env.CMS_PUBLIC_URL);

async function main() {
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  const uploadedTranslations: any = await directus
    .singleton("global")
    .read({
      fields: ["*.*.*"],
    })
    .then((res: any) => {
      return res.translations;
    });

  const updatedTranslations = uploadedTranslations.map((item) => ({
    ...item,
    user_come_from_label: "Comment avez-vous découvert Coverseal ?",
    user_come_from_options: [
      {
        name: "Par le site internet",
        code: "website",
      },
      {
        name: "Par les réseaux sociaux",
        code: "social_network",
      },
      {
        name: "Par une publicité / un reportage dans un magazine",
        code: "pub",
      },
      {
        name: "Par une publicité Youtube",
        code: "youtube",
      },
      {
        name: "PAr le bouche à oreille",
        code: "peer_to_peer",
      },
      {
        name: "Autre",
        code: "other",
      },
    ],
  }));

  return await directus.singleton("global").update({
    translations: [...updatedTranslations],
  });
}

main();

// it worked!
