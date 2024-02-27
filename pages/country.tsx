import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { CountrySection } from "../components/CountrySection";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function CountryPage({ pageProps, layoutProps }: PageProps<{}>) {
  const { countryProps } = layoutProps;

  useEffect(() => {
    const countrySection =
      document.querySelector<HTMLDivElement>(".country-section");
    disableBodyScroll(countrySection);

    return () => {
      enableBodyScroll(countrySection);
    };
  }, []);

  return (
    <main className="country-template">
      <CountrySection {...countryProps} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<PageProps<{}>> = async ({
  locale,
  locales,
}) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, "en-GB");
  const pageProps = await getPageContentProps<ContactContent>(
    fetcher,
    "home_template",
    "en-GB"
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
