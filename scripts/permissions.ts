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
  "achievements_translations",
  "achievements_categories_translations",
  "achievements_template_translations",
  "page_not_found_template_translations",
  "privacy_policy_template_translations",
  "terms_and_conditions_template_translations",
  "jobs_template_translations",
  "jobs_translations",
  "price_request_template_translations",
  "achievements_sections_translations",
  "before_configurator_template_translations",

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
  "price_request_template",
  "users",
  "achievements_sections",
  "before_configurator_template",
];

const publicActions = ["read"];
const managerActions = ["read", "create", "update", "delete"];
const managerId = "d8a21e2d-1f7e-41d0-b172-85e7e96ae335";

export async function permissionsScript() {
  await directus.auth.login({
    email: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  });

  for (const collection of collections) {
    try {
      for (const action of publicActions) {
        await directus.transport.post(`/permissions/`, {
          role: null,
          collection: collection,
          action: action,
          fields: "*",
          permissions: {},
          validation: {},
        });
      }

      for (const action of managerActions) {
        await directus.transport.post(`/permissions/`, {
          role: managerId,
          collection: collection,
          action: action,
          fields: "*",
          permissions: {},
          validation: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
