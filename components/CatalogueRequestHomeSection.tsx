import { useMemo } from "react";
import { Form } from "./Form";
import { Color } from "../utils/constants";

interface Props extends PriceRequestSectionContent {
  withH1?: boolean;
  noTitle?: boolean;
  formsMessages: FormMessagesContent;
  locale:String;
}

// TODO_2: global fallback for translation could be nice
export function CatalogueRequestHomeSection(props: Props) {
  const {
    catalog_request_title,
    submit_text,
    formsMessages,
    noTitle,
    countries,
    locale
  } = props;

  const fields = useMemo(
    () => [
     
      {
        id: "last_name",
        type: "text",
        required: true,
        dontshrink:true,
      },
      {
        id: "first_name",
        type: "text",
        required:  true,
        dontshrink:true,
      },
      {
        id: "country",
        type: "hidden",
        required: false,
        value:locale.split('-')[0],
      },{
        id: "zip_code",
        type: "hidden",
        required: false,
        value:"0000",
      },
      {
        id: "mail",
        type: "email",
        required: true,
        dontshrink:true,
        additionalstyle:{padding:"0px", paddingRight:"30px"}
      },
      // {
      //   id: "mail_confirmation",
      //   type: "email",
      //   required: true,
      // },
      // {
      //   id: "address",
      //   type: "places",
      //   required: true,
      //   additionalstyle:{width:"100%", padding:"0px"}
      // },
      // {
      //   id: "country",
      //   type: "text",
      //   required: false,
      //   select: true,
      //   options: countries.map(({ name, code }) => ({
      //     label: name,
      //     value: `${code}/${name}`,
      //   })),
      //   help: (
      //     <span
      //       className="form-help-text wysiwyg"
      //       dangerouslySetInnerHTML={{
      //         __html: formsMessages.country_help_text,
      //       }}
      //     />
      //   ),
      //   additionalstyle:{paddingLeft:"0px"}
      // },
      // {
      //   id: "zip_code",
      //   type: "text",
      //   required: false,
      //   help: (
      //     <span  style={{color:"red"}}
      //       className="Mui-error"
      //       id="zip_code_validation"
      //     />
      //   ),
      //   additionalstyle:{paddingLeft:"30px", paddingRight:"0px"}
      // },
      // {
      //   id: "message",
      //   required: false,
      //   textarea: true,
      //   rows: 4,
      //   maxRows: 10
      // },
    ],
    [countries]
  );
  const labelStyle = { color: '#808080' };
  return (
    <section
      className="section catalogue-request-home-section catalog-request-section"
      data-color={Color.ANTHRACITE}
    >
      <div className="section-container">
        {!noTitle && (
          <h3 className="subtitle-argesta subtitle-argesta--white">
            {catalog_request_title}
          </h3>
        )}
        <Form
        color="white"
          id="catalog_request"
          formsMessages={formsMessages}
          submit_text={submit_text}
          content={props}
          fields={fields.map(field => ({
            ...field,
            labelStyle: labelStyle // Apply label style to each field
          }))}
          apiPath="/api/catalog-request-form"
        />
      </div>
    </section>
  );
}
