import {
  createLinkField,
  createSectionFields,
  createBlock,
  createImageField,
  createFullWyziwygField,
} from "./utils/field";
import type { CollectionsMap } from "./types";

const mainParagraph = {
  field: "main_paragraph",
  type: "text",
  schema: {
    is_nullable: false,
    is_unique: false,
    numeric_precision: null,
    numeric_scale: null,
  },
  meta: {
    sort: 9,
    hidden: false,
    interface: "input-rich-text-html",
    options: {
      toolbar: [
        "bold",
        "italic",
        "removeformat",
        "bullist",
        "blockquote",
        "code",
        "fullscreen",
      ],
    },
    display: null,
    display_options: null,
    readonly: false,
    special: null,
    note: "The paragraph displayed below the main title",
  },
};
// TODO: page avant le configurateur
export const pageCollections: CollectionsMap = {
  home_template: {
    description: "The content of the home page",
    isPage: true,
    isSingleton: true,
    fields: [
      createImageField(
        "coverseal_image",
        "The first image of the coverseal section",
        1
      ),
      createImageField(
        "coverseal_image_2",
        "The second image of the coverseal section",
        2
      ),
      createImageField("benefits_image", "Image of the benefits section", 3),
    ],
    translatedFields: [
      ...createBlock("coverseal", 10),
      createLinkField("gallery", 13),
      {
        field: "models_title",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 14,
          hidden: false,
          readonly: false,
          note: "Title of the 'models' section",
        },
      },
      createLinkField("models", 15),
      {
        field: "models_paragraph",
        type: "text",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 16,
          hidden: false,
          interface: "input-rich-text-html",
          options: {
            toolbar: [
              "bold",
              "italic",
              "removeformat",
              "bullist",
              "blockquote",
              "code",
              "fullscreen",
            ],
          },
          display: null,
          display_options: null,
          readonly: false,
          special: null,
          note: "The paragraph displayed next tot the models link",
        },
      },
      createLinkField("configurator", 17),
      createLinkField("scroll_down", 18),
    ],
  },
  the_coverseal_template: {
    description: "The content of 'The Coverseal' page",
    isPage: true,
    isSingleton: true,
    fields: [
      createImageField("certificate_image", "Image of the comfort section", 1),
      createImageField(
        "comfort_image",
        "First image of the comfort section",
        2
      ),
      createImageField(
        "comfort_image_2",
        "Second image of the comfort section",
        3
      ),
      createImageField(
        "discretion_image",
        "first image after the discretion section",
        4
      ),
      createImageField(
        "discretion_image_2",
        "Second image after the discretion section",
        5
      ),
      createImageField(
        "discretion_image_3",
        "Third image after the discretion section",
        5
      ),
    ],
    relations: [
      {
        collection: "the_coverseal_template",
        field: "certificate_image",
        related_collection: "directus_files",
        meta: { sort_field: null },
      },
      {
        collection: "the_coverseal_template",
        field: "comfort_image",
        related_collection: "directus_files",
        meta: { sort_field: null },
      },
      {
        collection: "the_coverseal_template",
        field: "comfort_image_2",
        related_collection: "directus_files",
        meta: { sort_field: null },
      },
    ],
    translatedFields: [
      mainParagraph,
      ...createSectionFields("certificate", 10),
      ...createSectionFields("comfort", 12),
      createLinkField("models", 14),
      ...createSectionFields("discretion", 15),
      createLinkField("gallery", 17),
      {
        field: "why_coverseal_title",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 18,
          hidden: false,
          readonly: false,
          note: "Title of the 'Why a Coverseal?' section",
        },
      },
      createLinkField("benefits", 19),
      createLinkField("FAQ", 20),
    ],
  },
  benefits_template: {
    isSingleton: true,
    description: "The content of the 'Benefits' page",
    isPage: true,
    fields: [
      createImageField("security_image", "Image of the security section", 1),
    ],
    translatedFields: [
      ...createSectionFields("security", 9),
      ...createSectionFields("water quality", 11),
      ...createSectionFields("isolation", 13),
      createLinkField("models", 15),
    ],
  },
  models_template_directus_files: {
    isPage: false,
    isSingleton: false,
    isHidden: true,
    description: "",
    fields: [
      {
        field: "models_template_id",
        type: "integer",
        schema: {},
        meta: { hidden: true },
      },
      {
        field: "directus_files_id",
        type: "uuid",
        schema: {},
        meta: { hidden: true },
      },
      {
        field: "sort",
        type: "integer",
        schema: {},
        meta: { hidden: true },
      },
    ],
    noTranslation: true,
  },
  models_template: {
    description: "The content of the 'Models' page",
    isSingleton: true,
    isPage: true,
    relations: [
      {
        collection: "models_template_directus_files",
        field: "models_template_id",
        related_collection: "models_template",
        meta: {
          one_field: "option_images",
          sort_field: "sort",
          one_deselect_action: "nullify",
          junction_field: "directus_files_id",
        },
        schema: { on_delete: "SET NULL" },
      },
      {
        collection: "models_template_directus_files",
        field: "directus_files_id",
        related_collection: "directus_files",
        meta: {
          one_field: null,
          sort_field: null,
          one_deselect_action: "nullify",
          junction_field: "models_template_id",
        },
        schema: { on_delete: "SET NULL" },
      },
    ],
    fields: [
      {
        field: "membrane_colors",
        type: "json",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 1,
          hidden: false,
          interface: "list",
          options: {
            fields: [
              {
                field: "color_name",
                name: "color_name",
                type: "string",
                meta: {
                  field: "color_name",
                  type: "string",
                  note: "The name of the color",
                  options: {
                    placeholder: "RAL 905",
                  },
                  interface: "input",
                },
              },
              {
                field: "color_code",
                name: "color_code",
                type: "string",
                meta: {
                  field: "color_code",
                  type: "string",
                  note: "The hexadecimal color code to display it on the website",
                  options: {
                    placeholder: "#000000",
                  },
                  interface: "input",
                },
              },
            ],
            addLabel: "Add color",
          },
          display: null,
          display_options: null,
          readonly: false,
          special: ["json"],
          note: "The list of colors",
        },
      },
      createImageField(
        "dressing_image",
        "The image of the dressing section",
        2
      ),
      {
        field: "option_images",
        type: "alias",
        meta: {
          sort: 3,
          hidden: false,
          interface: "list-m2m",
          readonly: false,
          special: ["files"],
          note: "The photos used for the options",
        },
      },
    ],
    translatedFields: [
      mainParagraph,
      {
        field: "technical_information_title",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 10,
          hidden: false,
          readonly: false,
          note: "The title of the technical information",
          interface: "input",
          options: { trim: true },
        },
      },
      {
        field: "technical_info_file_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          readonly: false,
          note: "The text next to the download technical info file button",
          interface: "input",
          options: { trim: true },
        },
      },
      createLinkField("configurator", 11),
      createLinkField("achievements", 12),
      ...createSectionFields("customization", 13),
      createLinkField("customization_configurator", 15),
      ...createSectionFields("membrane", 16),
      ...createSectionFields("dressing", 18),
      ...createSectionFields("options", 20),
      {
        field: "options_items",
        type: "json",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 21,
          hidden: false,
          interface: "list",
          options: {
            fields: [
              {
                field: "option_name",
                name: "option_name",
                type: "string",
                meta: {
                  field: "option_name",
                  type: "string",
                  note: "The name of the option",
                  options: {
                    placeholder: "Option 1",
                  },
                  interface: "input",
                },
              },
            ],
            addLabel: "Add option",
          },
          display: null,
          display_options: null,
          readonly: false,
          special: ["json"],
          note: "The list of options",
        },
      },
      createLinkField("last_configurator", 21),
      createLinkField("scroll_down", 22),
    ],
  },
  about_us_template: {
    description: "The content of the 'About us' page",
    isPage: true,
    isSingleton: true,
    fields: [
      createImageField(
        "history_image",
        "The first image of the history section",
        1
      ),
      createImageField(
        "history_image_2",
        "The second image of the history section",
        1
      ),
    ],
    translatedFields: [
      mainParagraph,
      ...createSectionFields("history", 10),
      ...createSectionFields("company", 12),
      ...createSectionFields("network", 14),
      createLinkField("partnership", 16),
      createLinkField("the_coverseal", 17),
      createLinkField("achievements", 18),
    ],
  },
  faq_template: {
    isPage: true,
    isSingleton: true,
    description: "The content of the 'FAQ' page, except the questions part",
    translatedFields: [
      {
        field: "search_placeholder",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 9,
          hidden: false,
          readonly: false,
          note: "The content display in the search field while empty",
        },
      },
      {
        field: "result_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 10,
          hidden: false,
          readonly: false,
          note: "Text showed on top of the search result",
        },
      },
      {
        field: "no_result_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          readonly: false,
          note: "Text showed if no result is found",
        },
      },
    ],
  },
  partnerships_template: {
    isSingleton: true,
    isPage: true,
    description: "The content of the 'partnership' page",
    fields: [
      createImageField(
        "partnerships_image",
        "The image of the partnerships page",
        1
      ),
    ],
    translatedFields: [
      mainParagraph,
      ...createBlock("Distributor", 10),
      ...createBlock("Dealer", 13),
      ...createBlock("Lead", 16),
      createLinkField("gallery", 19),
      createLinkField("faq", 20),
    ],
  },
  contact_template: {
    isSingleton: true,
    isPage: true,
    description: "The content of the 'contact' page",
    translatedFields: [
      mainParagraph,
      ...createBlock("Price request", 10),
      ...createBlock("Catalog", 13),
      ...createBlock("After sale service", 16),
      createLinkField("faq", 19),
    ],
  },
  after_sale_template: {
    description: "The content of the 'After sale' page",
    isPage: true,
    isSingleton: true,
  },
  price_request_template: {
    description: "The content of the 'Price request' page",
    isPage: true,
    isSingleton: true,
  },
  achievements_template: {
    description: "The content you can find on the achievements page",
    isPage: true,
    isSingleton: true,
    translatedFields: [
      {
        field: "back_to_achievements",
        type: "text",
        meta: {
          sort: 11,
          interface: "input",
        },
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
      },
      {
        field: "next_coverseal",
        type: "text",
        meta: {
          sort: 12,
          interface: "input",
        },
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
      },
      createLinkField("models", 13),
    ],
  },
  page_not_found_template: {
    isSingleton: true,
    isPage: true,
    description: "The content of the 404 page",
    translatedFields: [createLinkField("back_to_home", 10)],
  },
  privacy_policy_template: {
    isSingleton: true,
    isPage: true,
    description: "The content of the privacy policy page",
    translatedFields: [
      createLinkField("back_to_home", 10),
      {
        field: "content",
        type: "text",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          interface: "input-rich-text-html",
          options: {
            toolbar: [
              "bold",
              "italic",
              "removeformat",
              "bullist",
              "code",
              "fullscreen",
              "aligncenter",
              "alignright",
              "alignleft",
              "underline",
              "numlist",
              "customLink",
              "unlink",
              "copy",
              "cut",
              "paste",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "undo",
              "redo",
            ],
          },
          display: null,
          display_options: null,
          readonly: false,
          special: null,
          note: "All the content of the page",
        },
      },
    ],
  },
  terms_and_conditions_template: {
    isSingleton: true,
    isPage: true,
    description: "The content of the terms & conditions page",
    translatedFields: [
      createLinkField("back_to_home", 10),
      {
        field: "content",
        type: "text",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          interface: "input-rich-text-html",
          options: {
            toolbar: [
              "bold",
              "italic",
              "removeformat",
              "bullist",
              "code",
              "fullscreen",
              "aligncenter",
              "alignright",
              "alignleft",
              "underline",
              "numlist",
              "customLink",
              "unlink",
              "copy",
              "cut",
              "paste",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "undo",
              "redo",
            ],
          },
          display: null,
          display_options: null,
          readonly: false,
          special: null,
          note: "All the content of the page",
        },
      },
    ],
  },
  jobs_template: {
    isPage: true,
    isSingleton: true,
    description: "The content of the jobs page",
    translatedFields: [
      mainParagraph,
      {
        field: "interested_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          readonly: false,
          note: "Subtitle showed next to the 'send your cv' text",
        },
      },
      {
        field: "send_your_cv_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 13,
          hidden: false,
          interface: "input-rich-text-html",
          options: {
            toolbar: [
              "bold",
              "italic",
              "removeformat",
              "bullist",
              "blockquote",
              "code",
              "fullscreen",
              "customLink",
            ],
          },
          display: null,
          display_options: null,
          readonly: false,
          special: null,
          note: "Send your cv text",
        },
      },
      {
        field: "no_job_offer_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 14,
          hidden: false,
          readonly: false,
          note: "Text to show if there is no job offer at the moment",
        },
      },
      {
        field: "back_to_jobs_text",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 15,
          hidden: false,
          readonly: false,
          note: "Button back text",
        },
      },
    ],
  },
  before_configurator_template: {
    isPage: true,
    isSingleton: true,
    description: "The page before the configurator",
    translatedFields: [
      mainParagraph,
      createLinkField("configurator", 10),
      {
        field: "start_sentence",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 11,
          hidden: false,
          readonly: false,
          note: "The sentence just before starting the steps",
        },
      },
      createFullWyziwygField("content_step_1", 12, "Content of the first step"),
      createFullWyziwygField(
        "content_step_2",
        13,
        "Content of the second step"
      ),
      createFullWyziwygField("content_step_3", 14, "Content of the third step"),
      createFullWyziwygField(
        "content_step_4",
        15,
        "Content of the fourth step"
      ),
      createFullWyziwygField("content_step_5", 16, "Content of the fifth step"),
      createFullWyziwygField("content_step_6", 17, "Content of the sixth step"),
      createFullWyziwygField(
        "content_step_7",
        18,
        "Content of the seventh step"
      ),
      createLinkField("configurator_last", 19),
      createLinkField("models", 20),
      {
        field: "help_sentence",
        type: "string",
        schema: {
          is_nullable: false,
          is_unique: false,
          numeric_precision: null,
          numeric_scale: null,
        },
        meta: {
          sort: 21,
          hidden: false,
          readonly: false,
          note: "The sentence to propose help on top of the contact link",
        },
      },
      createLinkField("contact", 22),
    ],
  },
};
