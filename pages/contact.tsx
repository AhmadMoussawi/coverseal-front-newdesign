import { GetStaticProps } from "next";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { BlockList } from "../components/BlockList";
import { CircleLink } from "../components/CircleLink";
import { translateInFromRightToLeft } from "../animations/appearing/shared";

const blocks = ["price_request", "catalog", "after_sale_service"];

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
}

export default function ContactPage({
  pageProps,
  layoutProps,
}: PageProps<ContactContent>) {
  const router = useRouter();
  const {
    main_title,
    main_paragraph,
    faq_link_text,
    after_sale_mail_de,
    after_sale_mail_en,
  } = pageProps;
  const { faqPath } = layoutProps.topBarProps.mainMenuProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  const linksMap = useMemo(() => {
    return {
      price_request: "/price-request",
      catalog: "/catalog-request",
      after_sale_service: (() => {
        if (router.locale === "de-DE") {
          return `mailto:${after_sale_mail_de}`;
        }
        if (router.locale === "en-GB" || router.locale === "en-BU"|| router.locale === "en-HU"|| router.locale === "en-AE") {
          return `mailto:${after_sale_mail_en}`;
        }
        return "/after-sale";
      })(),
    };
  }, [after_sale_mail_de, after_sale_mail_en, router.locale]);

  return (
    <main className="contact-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          <BlockList
            blocks={blocks}
            pageProps={pageProps}
            linksMap={linksMap}
          />
        </div>
        <div className="link-container">
          <CircleLink
            mainLink={{
              text: faq_link_text,
              href: faqPath,
            }}
            textAlign="right"
          />
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<ContactContent>
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<ContactContent>(
    fetcher,
    "contact_template",
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
