import { createImageField } from "./utils/field";
import type { CollectionDescriptor } from "./types";

export const modelsCollection: CollectionDescriptor = {
  isPage: true,
  isSingleton: false,
  description: "List of models / products",
  translationField: {
    field: "translations",
    meta: {
      hidden: false,
      interface: "translations",
      readonly: false,
      special: ["translations"],
      display: "related-values",
      display_options: { template: "{{main_title}}" },
    },
    type: null,
  },
  fields: [
    {
      field: "reference",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: true,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 1,
        hidden: false,
        readonly: false,
        note: "A unique string to keep track of the product whatever the language",
      },
    },
    createImageField("product_image", "the first product image", 1),
    createImageField("product_image_2", "the second product image", 2),
    createImageField("home_image", "the image used on the home page", 3),
    {
      field: "technical_info_file",
      type: "uuid",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        hidden: false,
        interface: "file",
        display: "file",
        readonly: false,
      },
    },
  ],
  relations: [
    {
      collection: "models",
      field: "technical_info_file",
      related_collection: "directus_files",
      meta: { sort_field: null },
    },
  ],
  translatedFields: [
    {
      field: "product_description",
      type: "text",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 10,
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
        note: "The product description",
      },
    },
    {
      field: "technical_section_divider",
      type: null,
      meta: {
        sort: 11,
        hidden: false,
        interface: "presentation-divider",
        options: { title: "Technical info" },
        readonly: false,
        special: ["alias", "no-data"],
        note: "The technical information about the product",
      },
    },
    {
      field: "technical_information",
      type: "json",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 12,
        hidden: false,
        interface: "list",
        options: {
          fields: [
            {
              field: "text",
              name: "text",
              type: "string",
              meta: {
                field: "text",
                type: "string",
                note: "A technical info",
                options: {
                  placeholder: "Sur mesure",
                },
                interface: "input",
              },
            },
          ],
          addLabel: "Add info",
        },
        display: null,
        display_options: null,
        readonly: false,
        special: ["json"],
        note: "The list of technical information",
      },
    },
  ],
};
