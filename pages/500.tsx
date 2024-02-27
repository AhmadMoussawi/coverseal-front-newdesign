import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { Color } from "../utils/constants";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";

export default function ErrorPage({
  pageProps,
}: PageProps<PageNotFoundContent>) {
  const { main_title, back_to_home_link_text } = pageProps;

  return (
    <main className="page-not-found-template">
      <section className="section first-section" data-color={Color.TERRA_COTTA}>
        <div className="section-container">
          <h1 className="main-title main-title--sand">{main_title}</h1>
          <Link href="/" passHref>
            <a className="link-before-translate link-before-translate--white back-to-home">
              {back_to_home_link_text}
            </a>
          </Link>
        </div>
        <div className="circle" />
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<PageNotFoundContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<PageNotFoundContent>(
    fetcher,
    "page_not_found_template",
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
