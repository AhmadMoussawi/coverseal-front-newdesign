import { GetStaticProps } from "next";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import React, { useEffect } from "react";
import { Fetcher, getAllPagePropsOnly } from "../utils/fetchers";
import { translateInFromRightToLeft } from "../animations/appearing/shared";
import { CMS_PUBLIC_URL } from "../utils/constants";
import { getLocale } from "../utils/locale";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
}

export default function DocumentsPage({
  globalSection,
  pageProps,
  layoutProps,
}: PageProps<DocumentsTemplateDirectus>) {
  const { main_title, main_paragraph, files , locale} = pageProps.translations[0];

  useEffect(() => {
    appearingAnimations();
  }, []);

  return (
    <main className="contact-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" dangerouslySetInnerHTML={{ __html: main_paragraph }}/>
        

          <ul className="documents-list">
            {files.map(({ directus_files_id }) => {
              if (!directus_files_id) {
                return null;
              }
              const { id, filename_download } = directus_files_id;
              return (
                <li>
                  <a
                    href={`${CMS_PUBLIC_URL}/assets/${id}`}
                    target="_blank"
                    className="link-underline"
                  >
                    <InsertDriveFileIcon htmlColor="#7b331b" />
                    <span>{filename_download}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const pageProps = await fetcher.directus
    .singleton<string, DocumentsTemplateDirectus>("documents_template")
    .read({
      fields: ["*.*.*.*"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        },
      } as any,
    });

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);

  return {
    props: {
      ...allPageProps,
      seoProps: {
        seo_title: pageProps.translations[0].seo_title,
        seo_description: pageProps.translations[0].seo_description,
        opengraph_description: pageProps.translations[0].opengraph_description,
      },
      pageProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
