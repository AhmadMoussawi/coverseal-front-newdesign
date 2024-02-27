import { CollectionDescriptor } from "./types";

export const faqCollection: CollectionDescriptor = {
  isSingleton: false,
  description: "All the questions you can find on the FAQ template",
  translationField: {
    field: "translations",
    meta: {
      display: "related-values",
      display_options: {
        template: "{{question}}",
      },
      hidden: false,
      interface: "translations",
      readonly: false,
      special: ["translations"],
    },
    type: null,
  },
  translatedFields: [
    {
      field: "question",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 1,
        hidden: false,
        readonly: false,
        note: "The displayed question",
      },
    },
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
        sort: 2,
        hidden: false,
        interface: "input-rich-text-html",
        options: {
          toolbar: [
            "bold",
            "italic",
            "underline",
            "removeformat",
            "customLink",
            "bullist",
            "numlist",
            "blockquote",
            "h3",
            "customImage",
            "customMedia",
            "hr",
            "aligncenter",
            "alignjustify",
            "alignleft",
            "alignright",
            "h4",
            "h5",
            "h6",
            "fullscreen",
          ],
        },
        note: "The content of the question, the response / explanation",
        display: null,
        display_options: null,
        readonly: false,
        special: null,
      },
    },
    {
      field: "keywords",
      type: "csv",
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 3,
        hidden: false,
        interface: "tags",
        options: {
          placeholder: "Membrane, Bâche, Toile",
          whitespace: "",
          capitalization: "lowercase",
        },
        display: null,
        display_options: null,
        readonly: false,
        special: ["csv"],
        note: "The keywords not displayed but used in case of search",
      },
    },
  ],
  fields: [
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
        hidden: false,
        interface: "select-dropdown-m2o",
        options: { template: "{{reference}}" },
        display: "related-values",
        display_options: { template: "{{reference}}" },
        readonly: false,
      },
    },
  ],
  relations: [
    {
      collection: "faq",
      field: "category",
      related_collection: "faq_categories",
      meta: { sort_field: null },
      schema: { on_delete: "SET NULL" },
    },
  ],
};

export const faqCategoriesCollection: CollectionDescriptor = {
  isSingleton: false,
  description:
    "The different categories the questions in FAQ can be tagged on.",
  translationField: {
    field: "translations",
    meta: {
      display: "related-values",
      display_options: {
        template: "{{name}}",
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
  translatedFields: [
    {
      field: "name",
      type: "string",
      meta: {
        sort: 1,
        display: null,
        display_options: null,
        hidden: false,
        interface: "input",
        options: null,
        readonly: false,
        special: null,
        note: "FAQ's category name displayed",
      },
      schema: {
        is_nullable: true,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
    },
  ],
};
