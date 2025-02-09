import { useMemo } from "react";
import { Form } from "./Form";

interface Props extends PriceRequestSectionContent {
  withH1?: boolean;
  noTitle?: boolean;
  formsMessages: FormMessagesContent;
  locale:String;
  form_title:String;
}

// TODO_2: global fallback for translation could be nice
export function CatalogRequestSection(props: Props) {
  const {
    catalog_request_title,
    submit_text,
    formsMessages,
    noTitle,
    countries,
    locale,
    form_title
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
        required:  true,
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
      // {
      //   id: "address",
      //   type: "places",
      //   required: true,
      //   additionalstyle:{width:"100%", padding:"0px"}
      // },
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
        //additionalstyle:{paddingLeft:"0px", paddingRight:"0px"}
      },

      {
        id: "country",
        type: "text",
        required: false,
        select: true,
        options: countries.map(({ name, code }) => ({
          label: name,
          value: `${code}/${name}`,
        })),
       
        // help: (
        //   <span
        //     className="form-help-text wysiwyg"
        //     dangerouslySetInnerHTML={{
        //       __html: formsMessages.country_help_text,
        //     }}
        //   />
        // ),
       // additionalstyle:{paddingLeft:"0px"}
      },
     
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
  if(locale!=null && locale!="")
  {
    var [language, lcountry] = locale.split("-");
    if(!lcountry)
    {
      lcountry = "FR"
    }
    var countrieslist = 'BE,LU,FR,NL';
    // if(countrieslist.includes(lcountry))
    // {
    //   if(fields.filter(x=>x.id == "current_pool_specialist").length == 0)
    //   fields.push({id:"current_pool_specialist",required:false, textarea:true, rows:4, maxRows:10})
    // }
 }
  return (
    <section
      className="section price-request-section catalog-request-section"
      data-color="beige"
    >
      <div className="section-container">
        {!noTitle && (
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {catalog_request_title}
          </h3>
        )}
        {form_title && <div className="formtitle">{form_title}</div>}
        <Form
          id="catalog_request"
          formsMessages={formsMessages}
          submit_text={submit_text}
          content={props}
          fields={fields}
        color="terra-cotta"
          apiPath="/api/catalog-request-form"
        />
      </div>
    </section>
  );
}
