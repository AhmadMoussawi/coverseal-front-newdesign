import { useState, useMemo, useRef } from "react";
import { Form } from "./Form";
import { getLocale } from "../utils/locale";
import { String } from "aws-sdk/clients/cloudtrail";
import { Box } from "@material-ui/core";
interface Props extends PriceRequestSectionContent {
  withH1?: boolean;
  noTitle?: boolean;
  formsMessages: FormMessagesContent;
  locale:String;
  form_title:String;
  step_one_title:String;
  step_two_title:String;
  next_btn_title:String;
  mobile_step_one_title:String;
  mobile_step_two_title:String;
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
    locale,
    form_title,
    step_one_title,
    step_two_title,
    next_btn_title,
    mobile_step_one_title,
    mobile_step_two_title,
  } = props;

  const fields = useMemo(
    () => [
      
      {
        id: "last_name",
        type: "text",
        required: true,
        step:1
      },
      {
        id: "first_name",
        type: "text",
        required: true,
        step:1
      },
      {
        id: "mail",
        type: "email",
        required: true,
        step:1
      },
      {
        id: "mail_confirmation",
        type: "email",
        required: true,
        step:1
      },
      /*{
        id: "address",
        type: "places",
        required: false,
        additionalstyle:{width:"100%", padding:"0px"},
        step:2
      },  
      {
        id: "phone",
        type: "tel",
        required: true,
        additionalstyle:{paddingLeft:"0px"},
        step:1
      },*/
      {
        id: "country",
        type: "text",
        required: true,
        select: true,
        options: countries.map(({ name, code }) => ({
          label: name,
          value: `${code}/${name}`,
        })),
        /*help: (
          <span
            className="form-help-text wysiwyg"
            dangerouslySetInnerHTML={{
              __html: formsMessages.country_help_text,
            }}
          />
        ),*/
        additionalstyle:{width:"100%", paddingRight:"0px", paddingLeft:"0px"},
        step:2
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
        additionalstyle:{width:"100%", paddingRight:"0px", paddingLeft:"0px"},
        step:2
      },
     /* { id: "city", type: "text", required: false, additionalstyle:{paddingLeft:"30px", paddingRight:"0px"},
      step:2 },
      {
        id: "pool_width",
        type: "number",
        additionalstyle:{paddingLeft:"0px"},
        step:2
      },
      {
        id: "pool_length",
        type: "number",
        additionalstyle:{paddingLeft:"30px", paddingRight:"0px"},
        step:2
      },
      {
        id: "add_documents",
        type: "file",
        required: false,
        additionalstyle:{paddingLeft:"0px"},
        step:2
      },*/
      {
        id: "user_come_from",
        required: false,
        select: true,
        options: user_come_from_options.map(({ name, code }) => ({
          label: name,
          value: code,
        })),
        additionalstyle:{width:"100%", paddingLeft:"0px", paddingRight:"0px"},
        step:2
      },
      /*{
        id: "message",
        required: false,
        textarea: true,
        rows: 4,
        maxRows: 10,
        additionalstyle:{paddingLeft:"0px", width:"100%", paddingRight:"0px"},
        step:2
      },*/
    ],
    [countries]
  );
  const [currentstep, setStep] = useState(1);
  const [language, lcountry] = locale.split("-");
  var countrieslist = 'BE,LU,FR,NL';
  if(countrieslist.includes(lcountry))
  {
    if(fields.filter(x=>x.id == "current_pool_specialist").length == 0)
    fields.splice(fields.length - 2,0,{
      id: "current_pool_specialist", type: "text", required: false,
      additionalstyle: {width:"100%", paddingLeft:"0px", paddingRight:"0px"},
      step:2
    })
  }
  

  
  return (
    <section className="section price-request-section" data-color="beige">
      <div className="section-container">
        {!noTitle && (
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {price_request_title}
          </h3>
        )}
        {form_title && <div style={{fontWeight:"500", fontSize:"19px", margin:"10px 0"}}>{form_title}</div>}
        
        <Form
        color={undefined}
        setStep={undefined}
          id="price_request"
          formsMessages={formsMessages}
          submit_text={submit_text}
          content={props}
          next_btn_title={next_btn_title}
          fields={fields}
          apiPath="/api/price-request-form"
          showsteps={true}
          step_one_title={step_one_title}
          step_two_title={step_two_title}
          mobile_step_one_title={mobile_step_one_title}
          mobile_step_two_title={mobile_step_two_title}
        />
      </div>
    </section>
  );
}
