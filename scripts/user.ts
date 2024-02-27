import { CollectionDescriptor } from "./types";

export const userCollection: CollectionDescriptor = {
  isSingleton: false,
  noTranslation: true,
  description: "The list of the users that have used the forms of the website",
  fields: [
    {
      field: "request_processed",
      type: "boolean",
      schema: {
        default_value: false,
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 1,
        hidden: false,
        interface: "boolean",
        options: { label: "Coverseal has followed up on request" },
        display: "boolean",
        readonly: false,
        special: ["boolean"],
      },
    },
    {
      field: "full_name",
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
        readonly: false,
      },
    },
    {
      field: "mail",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 3,
        hidden: false,
        readonly: false,
      },
    },
    {
      field: "phone",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 4,
        hidden: false,
        readonly: false,
      },
    },
    {
      field: "country",
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
      },
    },
    {
      field: "zip_code",
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 6,
        hidden: false,
        readonly: false,
      },
    },
    {
      field: "catalog_request",
      type: "boolean",
      schema: {
        default_value: false,
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 7,
        hidden: false,
        interface: "boolean",
        options: { label: "The user asked for catalog" },
        display: "boolean",
        readonly: true,
        special: ["boolean"],
      },
    },
    {
      field: "price_request",
      type: "boolean",
      schema: {
        default_value: false,
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: 8,
        hidden: false,
        interface: "boolean",
        options: { label: "The user asked for a price request" },
        display: "boolean",
        readonly: true,
        special: ["boolean"],
      },
    },
  ],
};
