import { GetStaticProps } from "next";
import React, { useMemo } from "react";
import { Form } from "../components/Form";
import { Color } from "../utils/constants";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CatalogueRequestHomeSection = dynamic(() => import('../components/CatalogueRequestHomeSection'));

const partnership_types = ["distributor", "dealer", "lead"];

export default function PartnershipsForm({
  pageProps,
  globalSection,
}: PageProps<PartershipsFormContent>) {
  const { main_title } = pageProps;
  const router = useRouter();
  var [language, lcountry] = router.locale.split("-");
  if(!lcountry)
    {
      lcountry = "FR";
    }
  var lang = "en";
  switch(language)
  {
    case "fr":
      lang = "fr";
      break;
      case "de":
        lang = "de";
        break;
        case "es":
          lang = "es";
          break;
          case "nl":
            lang = "nl";
  }
var countries = require(`../scripts/countries/${lang}/countries.json`);
  const fields = useMemo(
    () => [
      {
        id: "type",
        type: "text",
        required: true,
        select: true,
        options: partnership_types.map((type) => ({
          label: pageProps[`${type}_type`],
          value: type,
        })),
        defaultValue: router.query.type,
      },
      {
        id: "country",
        type: "text",
        required: true,
        select: true,
        options: countries.map(({ name, alpha2 }) => ({
          label: name,
          value: `${alpha2}/${name}`,
        })),
        help: (
          <span
            className="form-help-text wysiwyg"
            dangerouslySetInnerHTML={{
              __html: globalSection.formsMessages.country_help_text,
            }}
          />
        ),
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
      },
      {
        id: "company_name",
        type: "text"
      },
      {
        id: "contact_person",
        type: "text"
      },
      {
        id: "phone",
        type: "tel"
      }
    ],
    [router, globalSection.priceRequest.countries]
  );

  return (
    <main className="after-sale-template">
      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
        </div>
      </section>
      {/* <section
        className="section price-request-section after-sale-section"
        data-color={Color.BEIGE}
      >
        <div className="section-container">
          <Form
            id="partnerships"
            submit_text={globalSection.afterSale.submit_text}
            formsMessages={globalSection.formsMessages}
            content={{
              ...pageProps,
              ...globalSection.afterSale,
            }}
            fields={fields}
            apiPath="/api/partnerships-form"
          />
        </div>
      </section> */}
      <CatalogueRequestHomeSection 
          {...globalSection.priceRequest}
          formsMessages={globalSection.formsMessages}
          locale={router.locale}
          newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
          />
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<PartershipsFormContent>
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<PartershipsFormContent>(
    fetcher,
    "partnerships_form",
    locale
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
