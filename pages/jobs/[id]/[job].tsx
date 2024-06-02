import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import slugify from "slugify";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../../utils/fetchers";
import { translateInFromRightToLeft } from "../../../animations/appearing/shared";
import Link from "next/link";
import { ArrowCustom } from "../../../components/icons";
import { Color } from "../../../utils/constants";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../../utils/locale";
import { COUNTRIES } from "../../../utils/constants";
// import { CatalogueRequestHomeSection } from "../../../components/CatalogueRequestHomeSection";
// import { useRouter } from "next/router";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
}

interface SingleJobProps extends PageProps<PartialItem<SingleJobDirectus>> {
  globalJobsContent: JobsContent;
}

export default function SingleJobPage({
  // globalSection,
  pageProps,
  globalJobsContent,
}: SingleJobProps) {
  const { translations } = pageProps;
  const { back_to_jobs_text, interested_text, send_your_cv_text } =
    globalJobsContent;
    // const { locale } = useRouter();
  useEffect(() => {
    appearingAnimations();
  }, []);

  return (
    <main className="single-job-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              {translations[0].main_title}
            </h1>
            <Link href="/jobs" passHref>
              <a className="back-button">
                <ArrowCustom color={Color.TERRA_COTTA} />
                {back_to_jobs_text}
              </a>
            </Link>
          </div>
          <div
            className="wysiwyg"
            dangerouslySetInnerHTML={{ __html: translations[0].content }}
          />

          <div className="contact-container">
            <h4 className="subtitle-argesta subtitle-argesta--terra-cotta">
              {interested_text.replace(" ?","?")}
            </h4>
            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{ __html: send_your_cv_text }}
            />
          </div>
        </div>
      </section>

     
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  SingleJobProps,
  { job: string; id: string }
> = async ({ locale, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const globalJobsProps = await getPageContentProps<JobsContent>(
    fetcher,
    "jobs_template",
    locale
  );

  const currentJob = await fetcher.directus
    .items<string, SingleJobDirectus>("jobs")
    .readOne(Number(params.id), {
      fields: ["translations.*", "opengraph_image"],
    })
    .then((job) => {
      const updatedJob = { ...job };
      (updatedJob as any).translations = [
        job.translations.find((item) => item.languages_code === cmsLocale),
      ];
      if (!updatedJob.translations[0]) {
        (updatedJob as any).translations = [job.translations[0]];
      }
      return updatedJob;
    });

  if (!currentJob) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }

  return {
    props: {
      ...allPageProps,
      seoProps: {
        seo_title: currentJob.translations[0].seo_title,
        seo_description: currentJob.translations[0].seo_description,
        opengraph_description: currentJob.translations[0].opengraph_description,
        opengraph_image: currentJob.opengraph_image || null,
      },
      pageProps: currentJob,
      globalJobsContent: globalJobsProps.pageProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();

  const jobs = await fetcher.directus
    .items<string, SingleJobDirectus>("jobs")
    .readMany({
      fields: ["translations.main_title", "translations.languages_code", "id"],
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach((language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);

      jobs.forEach((job) => {
        const translation = job.translations.find(
          (item) => item.languages_code === cmsLocale
        );
        if(translation)
        acc.push({
          params: {
            id: String(job.id),
            job: slugify(translation.main_title, { lower: true }),
          },
          locale,
        });
      });
    });
    return acc;
  }, [] as any);

  return {
    paths,
    fallback: "blocking",
  };
};
