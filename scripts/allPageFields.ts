// TODO-2: presets when we visualize a table
const seoFields = [
  {
    field: "seo_section_divider",
    type: null,
    meta: {
      sort: 4,
      hidden: false,
      interface: "presentation-divider",
      options: { title: "SEO" },
      readonly: false,
      special: ["alias", "no-data"],
      note: "The fields about the SEO",
    },
  },
  {
    field: "seo_title",
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: 5,
      hidden: false,
      readonly: false,
      note: "The content of the title HTML tag",
      interface: "input",
      options: { trim: true },
    },
  },
  {
    field: "seo_description",
    type: "text",
    schema: {
      is_nullable: false,
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
      note: "The content of the description HTML meta tag",
    },
  },
];

const displayedContentFields = [
  {
    field: "displayed_content_section_divider",
    type: null,
    meta: {
      sort: 7,
      hidden: false,
      interface: "presentation-divider",
      options: { title: "Displayed content" },
      readonly: false,
      special: ["alias", "no-data"],
      note: "The fields about content displayed on the page",
    },
  },
  {
    field: "main_title",
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: 8,
      interface: "input-multiline",
      hidden: false,
      readonly: false,
      note: "Content of the H1",
    },
  },
];

export const allPageTranslatedFields = [
  ...seoFields,
  ...displayedContentFields,
];
