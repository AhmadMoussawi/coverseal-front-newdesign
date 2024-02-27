export function createSectionFields(sectionName: string, fieldIndex: number) {
  const formattedSectionName = sectionName.replace(" ", "_");
  return [
    {
      field: `${formattedSectionName}_title`,
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: fieldIndex,
        hidden: false,
        readonly: false,
        note: `Title of the '${sectionName}' section`,
      },
    },
    {
      field: `${formattedSectionName}_paragraph`,
      type: "text",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: fieldIndex + 1,
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
        note: `The paragraph displayed below the ${sectionName} title`,
      },
    },
  ];
}

export function createLinkField(linkName: string, fieldIndex: number) {
  return {
    field: `${linkName.replace(/ /g, "_").toLowerCase()}_link_text`,
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: fieldIndex,
      hidden: false,
      readonly: false,
      note: `Text of the link to the '${linkName}' page`,
    },
  };
}

export function createImageField(
  imageName: string,
  note: string,
  fieldIndex: number
) {
  return {
    field: imageName,
    type: "uuid",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: fieldIndex,
      hidden: false,
      interface: "file-image",
      display: "image",
      display_options: {},
      readonly: false,
      note,
    },
  };
}

export function createLabelField(labelName: string, fieldIndex: number) {
  return {
    field: `${labelName.replace(" ", "_")}_label`,
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: fieldIndex,
      hidden: false,
      readonly: false,
      note: `Label text for the '${labelName}' field`,
    },
  };
}

export function createBlock(name: string, fieldIndex: number) {
  const formattedSectionName = name.replace(/ /g, "_").toLowerCase();
  return [
    {
      field: `${formattedSectionName}_title`,
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: fieldIndex,
        hidden: false,
        readonly: false,
        note: `Title of the '${name}' section`,
      },
    },
    {
      field: `${formattedSectionName}_paragraph`,
      type: "text",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: fieldIndex + 1,
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
        note: `The paragraph displayed below the ${name} title`,
      },
    },
    {
      field: `${formattedSectionName}_link_text`,
      type: "string",
      schema: {
        is_nullable: false,
        is_unique: false,
        numeric_precision: null,
        numeric_scale: null,
      },
      meta: {
        sort: fieldIndex + 2,
        hidden: false,
        readonly: false,
        note: `Text of the link to the '${name}' form`,
      },
    },
  ];
}

export function createFullWyziwygField(
  name: string,
  index: number,
  note: string
) {
  return {
    field: name,
    type: "text",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: index,
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
      note,
    },
  };
}

export function createBasicTextField(
  name: string,
  fieldIndex: number,
  note: string
) {
  return {
    field: name,
    type: "string",
    schema: {
      is_nullable: false,
      is_unique: false,
      numeric_precision: null,
      numeric_scale: null,
    },
    meta: {
      sort: fieldIndex,
      hidden: false,
      readonly: false,
      note,
    },
  };
}
