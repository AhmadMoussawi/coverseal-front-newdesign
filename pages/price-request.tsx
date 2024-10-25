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
import dynamic from "next/dynamic";
const CatalogueRequestHomeSection = dynamic(() => import('../components/CatalogueRequestHomeSection'));

export default function PriceRequestPage({
  pageProps,
  globalSection,
}: PageProps<PriceRequestContent>) {
  const { main_title, main_description, form_title, step_one_title, step_two_title, next_btn_title, mobile_step_one_title, mobile_step_two_title } = pageProps;
  const { locale } = useRouter();
  return (
    <main className="price-request-template">
      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <p>{main_description}</p>
        </div>
      </section>
      <PriceRequestSection
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
      />
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
  PageProps<PriceRequestContent>
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<PriceRequestContent>(
    fetcher,
    "price_request_template",
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
