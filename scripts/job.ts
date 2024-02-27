import { CollectionDescriptor } from "./types";

export const jobsCollection: CollectionDescriptor = {
  isPage: true,
  isSingleton: false,
  description: "All the jobs offer",
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
        note: "A unique string to keep track of the job whatever the language",
      },
    },
  ],
  translatedFields: [
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
        note: "The job description",
      },
    },
  ],
};
