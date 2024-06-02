import { GetStaticProps } from "next";
import React from "react";
import { AfterSaleSection } from "../components/AfterSaleSection";
import { Color } from "../utils/constants";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";
import { useRouter } from "next/router";

export default function AfterSalePage({
  pageProps,
  globalSection,
}: PageProps<AfterSaleContent>) {
  const { main_title, form_title } = pageProps;
  const { locale, asPath } = useRouter();
  return (
    <main className="after-sale-template">
      {<section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{/*main_title*/}</h1>
        </div>
      </section>}
      <section
      className="section price-request-section after-sale-section"
      data-color={Color.BEIGE} 
    >
      <div className="section-container">
      {/*<h3 className="main-title main-title--terra-cotta">
          {globalSection.afterSale.after_sale_title}
        </h3>
        <div
          className="wysiwyg"

          dangerouslySetInnerHTML={{ __html: globalSection.afterSale.after_sale_sentence }}
  />*/}
        <div className="success-form">
        <h3 className={"subtitle-argesta subtitle-argesta--anthracite"}>
          {globalSection.formsMessages[`after_sale_success_title`]}
        </h3>
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{
            __html: globalSection.formsMessages[`after_sale_success_paragraph`],
          }}
        />
        
          <a href="https://www.facebook.com/CoversealOfficial"
            className={"link-before-translate link-before-translate--anthracite"}
            target={"_blank"}
          >
            

            {globalSection.formsMessages[`after_sale_success_cta`]}

          </a>
      </div>
      </div>
    </section>
      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale} newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<AfterSaleContent>
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  if (!allPageProps.layoutProps.hasSAV) {
    return {
      props: null,
      notFound: true,
    };
  }
  const pageProps = await getPageContentProps<AfterSaleContent>(
    fetcher,
    "after_sale_template",
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
