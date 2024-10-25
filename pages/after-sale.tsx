import { GetStaticProps } from "next";
import React from "react";
import { AfterSaleSection } from "../components/AfterSaleSection";
import { Color } from "../utils/constants";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import dynamic from "next/dynamic";
const CatalogueRequestHomeSection = dynamic(() => import('../components/CatalogueRequestHomeSection'));
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
      <AfterSaleSection
        {...globalSection.afterSale}
        formsMessages={globalSection.formsMessages}
        form_title={form_title}
      />
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
