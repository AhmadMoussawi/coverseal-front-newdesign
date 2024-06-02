import { GetStaticProps } from "next";
import React from "react";
import Link from "next/link";
import { CatalogRequestSection } from "../components/CatalogRequestSection";
import { AnimationDirection, Color } from "../utils/constants";
import { useRouter } from "next/router";
import { Image } from "../components/Image";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import {
  LogoSymbol
} from "../components/icons";

export default function CatalogRequestPage({
  pageProps,
  globalSection,
}: PageProps<CatalogRequestContent>) {
  const { main_title,
    image,
    form_title,    
    description } = pageProps;  
  const { locale } = useRouter();
  return (
    <main className="price-request-template">

    


      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
        </div>
      </section>

      <section className="section coversealnew-section" data-color={Color.BEIGE}>
      <div className="section-container">
        <div className="content">
         
        <div className="logo-container1">
                <LogoSymbol color={Color.WHITE} />
        </div>

          <div className="text-container">
              
            <div className="paragraph wysiwyg" dangerouslySetInnerHTML={{ __html: description }} />
            {/* <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--anthracite">
                abc
              </a>
            </Link> */}
          </div>

          <Image
            id={image.id}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
        </div>
        </div>
      </section>


      <CatalogRequestSection
      noTitle
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        form_title={form_title}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<CatalogRequestContent>
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<CatalogRequestContent>(
    fetcher,
    "catalog_request_template",
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
