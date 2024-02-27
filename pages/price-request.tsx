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

export default function PriceRequestPage({
  pageProps,
  globalSection,
}: PageProps<PriceRequestContent>) {
  const { main_title } = pageProps;
  const { locale } = useRouter();
  return (
    <main className="price-request-template">
      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
        </div>
      </section>
      <PriceRequestSection
        noTitle
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
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
