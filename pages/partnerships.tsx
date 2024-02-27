import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import slugify from "slugify";
import React, { useEffect, useMemo } from "react";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { BlockList } from "../components/BlockList";
import { Image } from "../components/Image";
import { CircleCenterLink } from "../components/CircleCenterLink";
import Link from "next/link";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";
import { AnimationDirection } from "../utils/constants";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../utils/locale";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
  translateInFromLeftToRight(".faq-link");
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

interface Props extends PageProps<PartnershipsContent> {
  faqQuestions: PartialItem<FAQQuestionDirectus>[];
}

export default function PartnershipsPage({ pageProps, faqQuestions }: Props) {
  const { main_title, main_paragraph, partnerships_image, gallery_link_text,security_title,
    security_paragraph,
    water_quality_title,
    water_quality_paragraph,
    isolation_title,
    isolation_paragraph,security_image,
    isolation_image,
    water_quality_image } =
    pageProps;
  const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  var filteredquestions = faqQuestions.filter(x=>x.category);
  const randomQuestionIndex = getRandomInt(0, filteredquestions.length - 1);

  const randomQuestion = filteredquestions[randomQuestionIndex];

  useEffect(() => {
    appearingAnimations();
  }, []);

  const blocks = useMemo(() => {
    switch (country) {
      case "BE":
      case "NL":
      case "DE":
        case "AT":          
        case "CH":          
        case "IL":          
        case "GB":          
        case "AE":
        return ["lead", "dealer"];
      
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
    <main className="partnerships-template">
      <section className="section first-section" data-color="beige">
      
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          
          <BlockList
              pageProps={pageProps}
              blocks={blocks}
              linksMap={linksMap}
            />
          <div style={{clear:"both", height:"50px"}}></div>
          {(security_title && security_paragraph) && <div id="security" className="block block-text-image">
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
              id={security_image.id}
              title="security image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>}

          {(water_quality_title && water_quality_paragraph) &&<div
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
          </div>}
          {(isolation_title && isolation_paragraph) && <div id="isolation" className="block block-text-image">
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
              id={isolation_image.id}
              title="isolation image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>}
          
        </div>
        <div style={{clear:"both", height:"100px"}}></div>
        
        <div className="image-circle-container">
          <Image
            id={partnerships_image}
            title="partnerships image"
            direction={AnimationDirection.RIGHT_TO_LEFT}
          />
          <CircleCenterLink text={gallery_link_text} href="/achievements" />
        </div>
        <div className="section-container">
          <Link
            href={`/faq/${
              (randomQuestion.category as FAQCategoryDirectus).id
            }/${slugify(
              (randomQuestion.category as FAQCategoryDirectus).translations[0]
                .name,
              { lower: true }
            )}#question-${randomQuestion.id}`}
            passHref
          >
            <a className="faq-link subtitle-argesta subtitle-argesta--terra-cotta link-underline">
              {randomQuestion.translations[0].question}
            </a>
          </Link>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  if (locale === "default") {
    return {
      props: null,
      notFound: true,
    };
  }

  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<PartnershipsContent>(
    fetcher,
    "partnerships_template",
    locale
  );

  const faqQuestions = await fetcher.directus
    .items<string, FAQQuestionDirectus>("faq")
    .readMany({
      fields: ["translations.*", "id", "category.*.*", "reference"],
      deep: {
        category:{
          _filter: {
            "reference": {
              _in: ["general","practice"]
            }
        }
      },
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        } as any,
      },
    })
    .then((res) => res.data.filter((item) => item.translations.length));

  return {
    props: {
      ...allPageProps,
      ...pageProps,
      faqQuestions,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
