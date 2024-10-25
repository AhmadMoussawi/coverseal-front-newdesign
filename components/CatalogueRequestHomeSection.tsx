import { useMemo } from "react";
import { Form } from "./Form";
import { Color } from "../utils/constants";

interface Props extends PriceRequestSectionContent {
  withH1?: boolean;
  noTitle?: boolean;
  formsMessages: FormMessagesContent;
  locale: String;
  newsletter_subscribe_link_text: string;
}

export default function CatalogueRequestHomeSection(props: Props) {
  const {
    catalog_request_title,
    submit_text,
    formsMessages,
    noTitle,
    countries,
    locale,
    newsletter_subscribe_link_text
  } = props;

  const fields = useMemo(
    () => [
      {
        id: "last_name",
        type: "text",
        required: true,
        dontshrink: true,
      },
      {
        id: "first_name",
        type: "text",
        required: true,
        dontshrink: true,
      },
      {
        id: "country",
        type: "hidden",
        required: false,
        value: locale.split('-')[0],
      }, {
        id: "zip_code",
        type: "hidden",
        required: false,
        value: "0000",
      },
      {
        id: "mail",
        type: "email",
        required: true,
        dontshrink: true,
        additionalstyle: { padding: "0px", paddingRight: "30px" }
      },
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
          <h3 className="subtitle-argesta subtitle-argesta--white catalogmobiletitle">
            {catalog_request_title}
          </h3>
        )}
        <Form
          color="white"
          id="catalog_request_home"
          formsMessages={formsMessages}
          submit_text={newsletter_subscribe_link_text}
          content={props}
          fields={fields}
          apiPath="/api/catalog-request-form"
          next_btn_title=""
          setStep={undefined}
          showsteps={false}
          step_one_title=""
          step_two_title=""
          mobile_step_one_title=""
          mobile_step_two_title=""
        />
      </div>
    </section>
  );
}
