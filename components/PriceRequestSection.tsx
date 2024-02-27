import { useMemo } from "react";
import { Form } from "./Form";
import { getLocale } from "../utils/locale";
import { String } from "aws-sdk/clients/cloudtrail";
interface Props extends PriceRequestSectionContent {
  withH1?: boolean;
  noTitle?: boolean;
  formsMessages: FormMessagesContent;
  locale:String
}

// TODO_2: global fallback for translation could be nice
export function PriceRequestSection(props: Props) {
  const {
    price_request_title,
    submit_text,
    formsMessages,
    noTitle,
    countries,
    user_come_from_options,
    locale
  } = props;

  const fields = useMemo(
    () => [
      {
        id: "first_name",
        type: "text",
        required: true,
      },
      {
        id: "last_name",
        type: "text",
        required: true,
      },
      {
        id: "mail",
        type: "email",
        required: true,
      },
      {
        id: "mail_confirmation",
        type: "email",
        required: true,
      },
      {
        id: "address",
        type: "places",
        required: false,
        additionalstyle:{width:"100%", padding:"0px"}
      },  
      {
        id: "phone",
        type: "tel",
        required: true,
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
          
      
      {
        id: "zip_code",
        type: "text",
        required: true,
        help: (
          <span style={{color:"red"}}
            className="Mui-error"
            id="zip_code_validation"
          />
        ),
        additionalstyle:{paddingLeft:"0px"}
      },
      { id: "city", type: "text", required: false, additionalstyle:{paddingLeft:"30px", paddingRight:"0px"} },
      {
        id: "pool_width",
        type: "number",
        additionalstyle:{paddingLeft:"0px"}
      },
      {
        id: "pool_length",
        type: "number",
        additionalstyle:{paddingLeft:"30px", paddingRight:"0px"}
      },
      {
        id: "add_documents",
        type: "file",
        required: false,
        additionalstyle:{paddingLeft:"0px"}
      },
      {
        id: "user_come_from",
        required: false,
        select: true,
        options: user_come_from_options.map(({ name, code }) => ({
          label: name,
          value: code,
        })),
        additionalstyle:{paddingLeft:"30px", paddingRight:"0px"}
      },
      {
        id: "message",
        required: false,
        textarea: true,
        rows: 4,
        maxRows: 10,
        additionalstyle:{paddingLeft:"0px", width:"100%", paddingRight:"0px"}
      },
    ],
    [countries]
  );
  const [language, lcountry] = locale.split("-");
  var countrieslist = 'BE,LU,FR,NL';
  if(countrieslist.includes(lcountry))
  {
    if(fields.filter(x=>x.id == "current_pool_specialist").length == 0)
      fields.splice(fields.length - 2,0,{id:"current_pool_specialist",type: "text", required:false})
  }
  return (
    <section className="section price-request-section" data-color="beige">
      <div className="section-container">
        {!noTitle && (
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {price_request_title}
          </h3>
        )}
        <Form
          id="price_request"
          formsMessages={formsMessages}
          submit_text={submit_text}
          content={props}
          fields={fields}
          apiPath="/api/price-request-form"
        />
      </div>
    </section>
  );
}
