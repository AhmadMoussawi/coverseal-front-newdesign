import { Directus } from "@directus/sdk";
require("dotenv").config({ path: "../.env" });

const directus = new Directus(process.env.CMS_PUBLIC_URL);

const collections = [
  "the_coverseal_template_translations",
  "benefits_template_translations",
  "models_template_translations",
  "about_us_template_translations",
  "global_translations",
  "contact_template_translations",
  "partnerships_template_translations",
  "after_sale_template_translations",
  "faq_template_translations",
  "faq_categories_translations",
  "faq_translations",
  "models_translations",
  "home_template_translations",
  "achievements_sections_translations",
  "achievements_translations",
  "achievements_categories_translations",
  "achievements_template_translations",
  "page_not_found_template_translations",
  "privacy_policy_template_translations",
  "terms_and_conditions_template_translations",
  "jobs_template_translations",
  "jobs_translations",
  "before_configurator_template_translations",
  "price_request_template_translations",

  "the_coverseal_template",
  "benefits_template",
  "models_template_directus_files",
  "models_template",
  "about_us_template",
  "languages",
  "global",
  "contact_template",
  "partnerships_template",
  "after_sale_template",
  "faq_template",
  "faq",
  "faq_categories",
  "achievements_sections",
  "achievements",
  "achievements_categories",
  "achievements_template",
  "models",
  "home_template",
  "page_not_found_template",
  "privacy_policy_template",
  "terms_and_conditions_template",
  "jobs_template",
  "jobs",
  "before_configurator_template",
  "price_request_template",
  "users",
];

export async function deleteScript() {
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  for (const collection of collections) {
    try {
      await directus.transport.delete(`/collections/${collection}`);
    } catch (error) {
      console.log(error);
    }
  }

  const images = await directus.transport.get("/files");

  for (const { id } of images.data) {
    await directus.transport.delete(`/files/${id}`);
  }
}
