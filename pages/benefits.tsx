import { GetStaticProps } from "next";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Image } from "../components/Image";
import { PriceRequestSection } from "../components/PriceRequestSection";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { BlockList } from "../components/BlockList";
import { AnimationDirection, Color } from "../utils/constants";
import type { PartialItem } from "@directus/sdk";
import { CircleLink } from "../components/CircleLink";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(
    ".first-section .block-text-image .text-container"
  );

  translateInFromLeftToRight(".first-section .block-water-quality h2");
  translateInFromLeftToRight(".first-section .block-water-quality .wysiwyg");

  translateInFromLeftToRight(".first-section .block-isolation .left");
}
interface Props extends PageProps<BenefitsContent> {
  partnershipContent: PageProps<PartnershipsContent>;
}
export default function BenefitsPage({
  pageProps,
  globalSection,
  layoutProps,
  partnershipContent
}: Props) {
  const {
    main_title,
    security_title,
    security_paragraph,
    water_quality_title,
    water_quality_paragraph,
    isolation_title,
    isolation_paragraph,
    models_link_text,
    security_image,
    isolation_image,
    water_quality_image
  } = pageProps;
  const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  const modelsLink = layoutProps.topBarProps.mainMenuProps.modelsPath;

  useEffect(() => {
    appearingAnimations();
  }, []);
  const blocks = useMemo(() => {
    switch (country) {
      case "BE":
        return ["lead", "dealer"];
      case "NL":
        return ["dealer", "distributor"];
      case "DE":
      case "FR":
        return ["lead", "dealer", "distributor"];
      // case Languages.EN_GB:
      default:
        return ["distributor"];
    }
  }, [country]);
  const linksMap = useMemo(() => {
    return {
      lead: "/partnerships-form?type=lead",
      dealer: "/partnerships-form?type=dealer",
      distributor: "/partnerships-form?type=distributor",
    };
  }, [country]);
  return (
    <main className="benefits-template">
      <section className="section first-section" data-color={Color.SAND}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>

          <div id="security" className="block block-text-image">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {security_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: security_paragraph }}
              />
            </div>
            <Image
              id={security_image}
              title="security image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>

          <div
            id="water-quality"
            className="block block-text-image block-water-quality"
          >
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {water_quality_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: water_quality_paragraph }}
              />
            </div>
            <Image
              id={water_quality_image.id}
              title="water quality image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>
          <div id="isolation" className="block block-text-image">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {isolation_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: isolation_paragraph }}
              />
            </div>
            <Image
              id={isolation_image}
              title="isolation image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>
          
          {/*<div className="circle-section-container">
            <div className="circle-link-container">
              <div className="line" />
              <CircleLink
                mainLink={{ href: modelsLink, text: models_link_text }}
                textAlign="bottom"
              />
            </div>
  </div>*/}
        </div>
        <div style={{clear:"both", height:"100px"}}></div>
        <div className="section-container">
          
          <BlockList
            pageProps={partnershipContent.pageProps}
            blocks={blocks}
            linksMap={linksMap}
          />
        </div>
      </section>
      {/*<PriceRequestSection
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
  />*/}
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<BenefitsContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<BenefitsContent>(
    fetcher,
    "benefits_template",
    locale
  );
  const partnershipContent = await getPageContentProps<PartnershipsContent>(
    fetcher,
    "partnerships_template",
    locale
  );
  return {
    props: {
      ...allPageProps,
      ...pageProps,
      partnershipContent,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
