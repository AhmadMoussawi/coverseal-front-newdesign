import { GetStaticProps } from "next";
import React from "react";
import { PriceRequestSection } from "../components/PriceRequestSection";
import { Color } from "../utils/constants";
import { useRouter } from "next/router";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";

export default function PriceRequestPage({
  pageProps,
  globalSection,
}: PageProps<PriceRequestContent>) {
  const { main_title, main_description, form_title, step_one_title, step_two_title, next_btn_title, mobile_step_one_title, mobile_step_two_title } = pageProps;
  const { locale } = useRouter();
  return (
    <main className="after-sale-template">
      {<section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{/*main_title*/}</h1>
        </div>
      </section>}
      <section className="section price-request-section after-sale-section" data-color="beige">
      <div className="section-container">
      <div className="success-form">
        <h3 className={"subtitle-argesta subtitle-argesta--anthracite"}>
          {globalSection.formsMessages[`partnerships_success_title`]}
        </h3>
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{
            __html: globalSection.formsMessages[`partnerships_success_paragraph`],
          }}
        />
        
          <a href="https://www.linkedin.com/company/coverseal/"
            className={"link-before-translate link-before-translate--anthracite"}
            target={"_blank"}
          >
            

            {globalSection.formsMessages[`partnerships_success_cta`]}

          </a>
      </div>
      </div>
      </section>
      {/*<PriceRequestSection
        noTitle
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        form_title={form_title}
        step_one_title={step_one_title}
        step_two_title={step_two_title}
        mobile_step_one_title={mobile_step_one_title}
        mobile_step_two_title={mobile_step_two_title}
        next_btn_title={next_btn_title}
  />*/}
      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
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
