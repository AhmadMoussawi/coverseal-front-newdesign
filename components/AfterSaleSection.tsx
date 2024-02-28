import { useMemo } from "react";
import { Form } from "./Form";
import { Color } from "../utils/constants";

interface Props extends AfterSaleSectionContent {
  withH1?: boolean;
  formsMessages: FormMessagesContent;
}

export function AfterSaleSection(props: Props) {
  const {
    after_sale_title,
    submit_text,
    formsMessages,
    after_sale_sentence,
    countries,
  } = props;

  const fields = useMemo(
    () => [
      {
        id: "last_name",
        type: "text",
        required: true,
      },
      {
        id: "first_name",
        type: "text",
        required: true,
      },
      
      {
        id: "mail",
        type: "text",
        required: true,
      },
      {
        id: "mail_confirmation",
        type: "email",
        required: true,
      },
      // {
      //   id: "address",
      //   type: "places",
      //   required: true,
      //   additionalstyle:{width:"100%", padding:"0px"}
      // },
      {
        id: "phone",
        type: "tel",
        required: true,
        additionalstyle:{paddingLeft:"0px", paddingRight:"30px"} 
      },
      {
        id: "coverseal_reference_number",
        textarea: true,
        rows: 2,
        maxRows: 2,
        required: true,
        // additionalstyle:{paddingLeft:"0px", marginRight:"50%", paddingRight:"30px"}
      },
      {
        id: "zip_code",
        type: "text",
        required: true,
        help: (
          <span  style={{color:"red"}}
            className="Mui-error"
            id="zip_code_validation"
          />
        ),
        additionalstyle:{paddingLeft:"0px"}
      },
      {
        id: "country",
        type: "text",
        required: true,
        select: true,
        options: countries.map(({ name, code }) => ({
          label: name,
          value: `${code}/${name}`,
        })),
        help: (
          <span
            className="form-help-text wysiwyg"
            dangerouslySetInnerHTML={{
              __html: formsMessages.country_help_text,
            }}
          />
        ),
        additionalstyle:{paddingLeft:"30px", paddingRight:"0px"} 
      },
      
      
      
      
      // { id: "city", type: "text", required: true, 
      // additionalstyle:{paddingLeft:"30px", paddingRight:"0px"} },
     
      
      {
        id: "problem_description",
        type: "text",
        required: true,
      },
      // {
      //   id: "add_photos",
      //   type: "file",
      //   required: false,
      // },
      // {
      //   id: "message",
      //   required: true,
      //   textarea: true,
      //   rows: 4,
      //   maxRows: 10,
      // },
    ],
    [countries]
  );

  const title = useMemo(() => {
    if (props.withH1) {
      return (
        <h1 className="subtitle-argesta subtitle-argesta--terra-cotta">
          {after_sale_title}
        </h1>
      );
    } else {
      return (
        <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
          {after_sale_title}
        </h3>
      );
    }
  }, [props.withH1]);

  return (
    <section
      className="section price-request-section after-sale-section"
      data-color={Color.SAND} 
    >
      <div className="section-container">
        {title}
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: after_sale_sentence }}
        />
        <Form
          id="after_sale"
          submit_text={submit_text}
          formsMessages={formsMessages}
          content={props}
          fields={fields}
          apiPath="/api/after-sale-form"
        />
      </div>
    </section>
  );
}
