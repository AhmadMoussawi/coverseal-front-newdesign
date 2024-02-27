import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { PriceRequestSection } from "../components/PriceRequestSection";
import { Image } from "../components/Image";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { LineLink } from "../components/LineLink";
import { CircleCenterLink } from "../components/CircleCenterLink";
import { Color, AnimationDirection } from "../utils/constants";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

import { useRouter } from "next/router";
function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
  translateInFromLeftToRight(".block-certificate .text-container");
  translateInFromLeftToRight(".block-comfort .content .text-container");
  translateInFromRightToLeft(".block-discretion .text-container");
}

export default function TheCoversealPage({
  pageProps,
  globalSection,
  layoutProps,
}: PageProps<TheCoversealContent>) {
  const {
    main_title,
    main_paragraph,
    certificate_title,
    certificate_paragraph,
    comfort_title,
    comfort_paragraph,
    comfort_image,
    comfort_image_2,
    discretion_title,
    discretion_paragraph,
    models_link_text,
    certificate_image,
    discretion_image,
    discretion_image_2,
    discretion_image_3,
    gallery_link_text,
    why_coverseal_title,
    benefits_link_text,
    faq_link_text,
  } = pageProps;
  const { modelsPath, faqPath } = layoutProps.topBarProps.mainMenuProps;

  useEffect(() => {
    appearingAnimations();
  }, []);
  const { locale } = useRouter();
  return (
    <main className="the-coverseal-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          <div className="block block-certificate">
            <Image
              id={certificate_image.filename_disk}
              title={certificate_image.title}
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {certificate_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: certificate_paragraph }}
              />
            </div>
          </div>
        </div>

        <div className="block block-comfort">
          <div className="content">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {comfort_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: comfort_paragraph }}
              />
              <Link passHref href={modelsPath}>
                <a className="link-before-translate link-before-translate--anthracite">
                  {models_link_text}
                </a>
              </Link>
            </div>
            <Image
              id={comfort_image.filename_disk}
              title={comfort_image.title}
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>
          <Image
            id={comfort_image_2.filename_disk}
            title={comfort_image_2.title}
            containerClassName="image-on-top"
            direction={AnimationDirection.TOP_TO_BOTTOM}
          />
        </div>

        <div className="block block-discretion">
          <div className="content">
            <Image
              id={discretion_image}
              title="Discretion image"
              containerClassName="image-first"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {discretion_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: discretion_paragraph }}
              />
            </div>
          </div>
          <div className="section-container">
            <div className="images-container">
              <div className="image-second">
                <Image
                  id={discretion_image_2}
                  title="Discretion image 2"
                  direction={AnimationDirection.TOP_TO_BOTTOM}
                />
              </div>
              <div className="circle-image-container">
                <Image
                  id={discretion_image_3}
                  title="Discretion image 3"
                  containerClassName="image-third"
                  direction={AnimationDirection.LEFT_TO_RIGHT}
                />
                <CircleCenterLink
                  href="/achievements"
                  text={gallery_link_text}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-why" data-color={Color.WHITE}>
        <LineLink
          href="/benefits"
          text={benefits_link_text}
          color={Color.TERRA_COTTA}
          isHtml
        />
        <div className="section-container">
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {why_coverseal_title}
          </h3>
        </div>
        <LineLink
          href={faqPath}
          text={faq_link_text}
          color={Color.TERRA_COTTA}
        />
      </section>
      {/* <section className="section section-why" data-color={Color.WHITE}>
        <div className="line-alone" />
        <div className="section-container why-coverseal-container">
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {why_coverseal_title}
          </h3>
          <Link href="/benefits" passHref>
            <a className="link-underline">{benefits_link_text}</a>
          </Link>
        </div>
        <LineLink
          href={faqPath}
          text={faq_link_text}
          color={Color.TERRA_COTTA}
        />
      </section> */}
      <PriceRequestSection
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}

// TODO: activate ISR on all pages
export const getStaticProps: GetStaticProps<
  PageProps<TheCoversealContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<TheCoversealContent>(
    fetcher,
    "the_coverseal_template",
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
