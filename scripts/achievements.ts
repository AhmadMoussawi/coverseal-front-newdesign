import { createImageField } from "./utils/field";
import type { CollectionDescriptor } from "./types";

export const achievementsCollection: CollectionDescriptor = {
  isSingleton: false,
  isPage: true,
  description: "List of achievements",
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
  relations: [
    {
      collection: "achievements",
      field: "model",
      related_collection: "models",
      meta: { sort_field: null },
      schema: { on_delete: "SET NULL" },
    },
    {
      collection: "achievements",
      field: "category",
      related_collection: "achievements_categories",
      meta: { sort_field: null },
      schema: { on_delete: "SET NULL" },
    },
    {
      collection: "achievements_sections",
      field: "achievements_id",
      related_collection: "achievements",
      meta: {
        one_field: "sections",
        sort_field: "order",
        one_deselect_action: "nullify",
      },
      schema: { on_delete: "SET NULL" },
    },
  ],
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
        note: "A unique string to keep track of the project whatever the language",
      },
    },
    {
      field: "model",
      type: "integer",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 1,
        hidden: false,
        interface: "select-dropdown-m2o",
        options: { template: "{{reference}}" },
        display: "related-values",
        display_options: { template: "{{reference}}" },
        readonly: false,
      },
    },
    {
      field: "category",
      type: "integer",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 2,
        hidden: false,
        interface: "select-dropdown-m2o",
        options: { template: "{{reference}}" },
        display: "related-values",
        display_options: { template: "{{reference}}" },
        readonly: false,
      },
    },
    createImageField("list_image", "Image use in the list of inspirations", 3),
    {
      field: "sections",
      type: "alias",
      meta: {
        sort: 4,
        hidden: false,
        interface: "list-o2m",
        options: { template: "{{reference}}" },
        display: "related-values",
        display_options: { template: "{{reference}}" },
        readonly: false,
        special: ["o2m"],
      },
    },
  ],
  translatedFields: [
    {
      field: "project_text",
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
        note: "The translated text before the name of the project",
        interface: "input",
        options: { trim: true },
      },
    },
  ],
};

export const achievementsCategoriesCollection: CollectionDescriptor = {
  isPage: true,
  isSingleton: false,
  description: "The different categories for the achievements",
  translationField: {
    field: "translations",
    meta: {
      display: "related-values",
      display_options: {
        template: "{{main_title}}",
      },
      hidden: false,
      interface: "translations",
      readonly: false,
      special: ["translations"],
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
        note: "A unique string to keep track of the category whatever the language",
      },
    },
  ],
};

export const achievementsSection: CollectionDescriptor = {
  isSingleton: false,
  isPage: false,
  description:
    "The different section that can be created to compose the achievements pages",
  translationField: {
    field: "translations",
    meta: {
      hidden: false,
      interface: "translations",
      readonly: false,
      special: ["translations"],
      conditions: [
        {
          name: "is not section with text",
          rule: {
            _or: [
              {
                type: {
                  _eq: "image_only",
                },
              },
              {
                type: {
                  _eq: "double_images",
                },
              },
            ],
          },
          readonly: false,
          hidden: true,
        },
      ],
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
        note: "The section reference for humans to understand where it belongs",
      },
    },
    {
      field: "type",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 2,
        hidden: false,
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Double images", value: "double_images" },
            { text: "Text image", value: "text_image" },
            { text: "Image only", value: "image_only" },
            { text: "Text only", value: "text_only" },
          ],
          allowNone: false,
          icon: null,
        },
        display: "labels",
        readonly: false,
      },
    },
    {
      field: "text_image_variant",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
        default_value: "image_left",
      },
      meta: {
        sort: 3,
        hidden: false,
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Image on the left", value: "image_left" },
            { text: "Image on the right", value: "image_right" },
          ],
          allowNone: false,
          icon: null,
        },
        display: "labels",
        readonly: false,
        conditions: [
          {
            name: "is not text image",
            rule: { type: { _neq: "text_image" } },
            readonly: false,
            hidden: true,
          },
        ],
      },
    },
    {
      field: "double_images_variant",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
        default_value: "images_overlap_1",
      },
      meta: {
        sort: 4,
        hidden: false,
        interface: "select-dropdown",
        options: {
          choices: [
            { text: "Images equal", value: "images_equal" },
            { text: "Images overlap 1", value: "images_overlap_1" },
            { text: "Images overlap 2", value: "images_overlap_2" },
            { text: "Images overlap 3", value: "images_overlap_3" },
          ],
          allowNone: false,
          icon: null,
        },
        display: "labels",
        readonly: false,
        conditions: [
          {
            name: "is not double image",
            rule: { type: { _neq: "double_images" } },
            readonly: false,
            hidden: true,
          },
        ],
      },
    },
    {
      field: "image",
      type: "uuid",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 5,
        hidden: false,
        interface: "file-image",
        display: "image",
        display_options: {},
        readonly: false,
        conditions: [
          {
            name: "is section without image",
            rule: { type: { _eq: "text_only" } },
            readonly: false,
            hidden: true,
          },
        ],
      },
    },
    {
      field: "image_2",
      type: "uuid",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 6,
        hidden: false,
        interface: "file-image",
        display: "image",
        display_options: {},
        readonly: false,
        conditions: [
          {
            name: "is not section 2 images",
            rule: { type: { _neq: "double_images" } },
            readonly: false,
            hidden: true,
          },
        ],
      },
    },
    {
      field: "achievements_id",
      type: "integer",
      schema: {},
      meta: { hidden: true },
    },
    {
      field: "order",
      type: "integer",
      schema: {},
      meta: { hidden: true },
    },
  ],
  translatedFields: [
    {
      field: "content",
      type: "text",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 1,
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
        note: "The text content of the section",
      },
    },
  ],
};
