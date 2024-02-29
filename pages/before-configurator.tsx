import { GetStaticProps } from "next";
import React, { useEffect } from "react";
import gsap from "gsap";
import { Fetcher, getAllPagePropsOnly } from "../utils/fetchers";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";
import { PartialItem } from "@directus/sdk";
import { AnimationDirection, Color } from "../utils/constants";
import { LineCircleLink } from "../components/LineCircleLink";
import { CircleCenterLink } from "../components/CircleCenterLink";
import { CircleLink } from "../components/CircleLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { getLocale } from "../utils/locale";
import { Image } from "../components/Image";
import { Button, useTheme} from '@mui/material';
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";


function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  translateInFromLeftToRight(".start-sentence");

  translateInFromLeftToRight("[data-step='1']");
  translateInFromRightToLeft("[data-step='2']");
  translateInFromLeftToRight("[data-step='3']");
  translateInFromLeftToRight("[data-step='4']");
  translateInFromRightToLeft("[data-step='5']");
  translateInFromLeftToRight("[data-step='6']");
  translateInFromLeftToRight("[data-step='7']");
  
  gsap.fromTo(
    "#shape-1",
    {
      strokeDasharray: 800,
      strokeDashoffset: -800,
    },
    {
      scrollTrigger: {
        trigger: "#shape-1",
        start: "top bottom-=10%",
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.Out",
    }
  );

  gsap.fromTo(
    "#shape-2",
    {
      strokeDasharray: 400,
      strokeDashoffset: 400,
    },
    {
      scrollTrigger: {
        trigger: "#shape-2",
        start: "top bottom-=10%",
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.Out",
    }
  );

  gsap.fromTo(
    "#shape-3",
    {
      strokeDasharray: 300,
      strokeDashoffset: -300,
    },
    {
      scrollTrigger: {
        trigger: "#shape-3",
        start: "top bottom-=10%",
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.Out",
    }
  );

  gsap.fromTo(
    "#shape-4",
    {
      strokeDasharray: 200,
      strokeDashoffset: 200,
    },
    {
      scrollTrigger: {
        trigger: "#shape-4",
        start: "top bottom-=10%",
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.Out",
    }
  );

  gsap.fromTo(
    "#shape-5",
    {
      strokeDasharray: 300,
      strokeDashoffset: 300,
    },
    {
      scrollTrigger: {
        trigger: "#shape-5",
        start: "top bottom-=10%",
      },
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power3.Out",
    }
  );
}

const steps = [1, 2, 3, 4, 5, 6, 7];


export default function BeforeConfiguratorPage({
  pageProps,
  layoutProps,
  globalSection,
}: PageProps<PartialItem<BeforeConfiguratorTranslation>>) {
  const {
    locale,
    image,
    main_title,
    main_paragraph,
    configurator_link_text,
    start_sentence,
    help_sentence,
    contact_link_text,
    configurator_last_link_text,
    models_link_text,
  } = pageProps;
  const router = useRouter();
  const [_language, country] = router.locale.split("-");
  const theme = useTheme();
  const { modelsPath } = layoutProps.topBarProps.mainMenuProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  // works because only belgium and france can access configuration
  const configuratorLink =
    country === "BE"
      ? "https://coverseal.elfsquad.io/configure/Couverture?_gl=1*y3gd1d*_ga*NDE4NDc0NjIzLjE2OTc1Mjk4OTY.*_ga_1M41YRKMXD*MTcwMTg3MzEyMy4xMy4xLjE3MDE4NzMzMjkuMC4wLjA.*_fplc*SmNvZnNHSCUyRlM5UlBWTlViTiUyQk1TTXZpR3FKUEhBV2RXN3Z3enZCYW8ycERoaXBnQyUyRiUyQlFLTTlZOXRHU1A5VDNQVFBNYiUyQlBXdnMxd0tGS2QyQWExekp4WkgyWUhCbUN6ciUyQjhYT1hXSCUyQkdKcEVmSzVLUzN6JTJGJTJCUDZtTDFWJTJGUXclM0QlM0Q"
      : (country === "FR"?"https://coverseal-france.elfsquad.io/configure/Couverture?_gl=1*17q3lzf*_ga*NDE4NDc0NjIzLjE2OTc1Mjk4OTY.*_ga_1M41YRKMXD*MTcwMTg3MzEyMy4xMy4xLjE3MDE4NzMxMjYuMC4wLjA.*_fplc*SmNvZnNHSCUyRlM5UlBWTlViTiUyQk1TTXZpR3FKUEhBV2RXN3Z3enZCYW8ycERoaXBnQyUyRiUyQlFLTTlZOXRHU1A5VDNQVFBNYiUyQlBXdnMxd0tGS2QyQWExekp4WkgyWUhCbUN6ciUyQjhYT1hXSCUyQkdKcEVmSzVLUzN6JTJGJTJCUDZtTDFWJTJGUXclM0QlM0Q"
      :"https://coverseal-france.elfsquad.io/configure/Couverture%20Coverseal");

  return (
    <main className="before-configurator-template">



      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
        <div className="main-title main-title--terra-cotta wysiwyg"  dangerouslySetInnerHTML={{ __html: main_title }} ></div>
        <div className="content">
          <div className="text-container">
          
       <div className="mobile-image">
       <Image
            id={image}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
       </div>
            <div className="paragraph wysiwyg" style={{color:"black"}}  dangerouslySetInnerHTML={{ __html: main_paragraph }} />
            {/* <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--anthracite">
                abs
              </a>
            </Link> */}
<Link href={configuratorLink} passHref target="_blank">
                            <a className="link-before-translate link-before-translate--terra-cotta" style={{fontFamily:"Poppins"}}>
                              {configurator_link_text}
                            </a>
              </Link>
      
          </div>
<div className="desktop-image">
          <Image
            id={image}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
          </div>
        </div>
          {/* <div
            className="main-title main-title--white wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_title }}
          /> */}
          {/* <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          /> */}
          {/* <LineCircleLink
            href={configuratorLink}
            color={Color.WHITE}
            text={configurator_link_text}
            externalLink
          /> */}

          <div className="start-sentence">
            <span>{start_sentence}</span>
          </div>
          <div className="step-list" >
            {steps.map((stepId) => (
              <div key={stepId} data-step={stepId}>
                {stepId === 5 && <div className="line" />}
                <span className="number" >{`0${stepId}.`}</span>
                <div
                  className="wysiwyg" 
                  dangerouslySetInnerHTML={{
                    __html: pageProps[`content_step_${stepId}`],
                  }}
                />
              </div>
            ))}
            <svg id="shape-1" viewBox="0 0 692.17 325.75">
              <style type="text/css">{`.st0{fill:none;stroke:#7b331b;}`}</style>
              <path
                id="Tracé_358"
                className="st0"
                d="M674.05,286.43C368.22,362.68,74.72,241.66,18.49,16.12"
              />
            </svg>
            <svg id="shape-2" viewBox="0 0 252.89 155.68">
              <style type="text/css">{`.st0{fill:none;stroke:#7b331b;}`}</style>
              <path
                className="st0"
                d="M249.41,3.13C220.65,110.39,110.39,174.03,3.13,145.27"
              />
            </svg>
            <div id="shape-3">
              <svg viewBox="0 0 163.66 138.96">
                <style type="text/css">{`.st0{fill:none;stroke:#7b331b;}`}</style>
                <path
                  id="Tracé_360"
                  className="st0"
                  d="M4.5,135.92C11.46,56.21,80.91-2.83,159.61,4.04"
                />
              </svg>
            </div>
            <div id="shape-4">
              <svg viewBox="0 0 23 247">
                <style type="text/css">{`.st0{fill:none;stroke:#7b331b;}`}</style>
                <line className="st0" x1="11.5" y1="14" x2="11.5" y2="233" />
              </svg>
            </div>
            <div id="shape-5">
              <svg viewBox="0 0 23 247">
                <style type="text/css">{`.st0{fill:none;stroke:#7b331b;}`}</style>
                <line className="st0" x1="11.5" y1="14" x2="11.5" y2="233" />
              </svg>
            </div>
            <div className="link-container">
            <Link href={configuratorLink} passHref target="_blank">
                            <a className="link-before-translate link-before-translate--terra-cotta" style={{fontFamily:"Poppins"}}>
                              {configurator_link_text}
                            </a>
              </Link>
              {/* <CircleCenterLink
                text={configurator_last_link_text}
                href={configuratorLink}
                external
              /> */}
            </div>
          </div>
        </div>
      </section>
      <section className="link-section" style={{paddingTop:"30px", paddingBottom:"30px"}} data-color={Color.TERRA_COTTA}>
        <div className="text-container">
          <h2 className="subtitle-argesta subtitle-argesta--white">{help_sentence}</h2>
          {/* <Link href="/price-request" passHref>
            <a className="subtitle-argesta subtitle-argesta--terra-cotta link-underline">
              {contact_link_text}
            </a>
          </Link> */}
          <Link href={modelsPath} passHref target="_blank">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                   {models_link_text}
              </a>
              </Link>
        </div>
        
        {/* <CircleLink
          mainLink={{
            text: models_link_text,
            href: modelsPath,
          }}
        /> */}
      </section>

      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<PartialItem<BeforeConfiguratorTranslation>>
> = async ({ locale }) => {
  const fetcher = new Fetcher();
  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const cmsLocale = getLocale(locale);

  if (!allPageProps.layoutProps.hasConfigurator) {
    return {
      props: null,
      notFound: true,
    };
  }

  const pageProps = await fetcher.directus
    .singleton<string, { image:string, translations: BeforeConfiguratorTranslation[] }>(
      "before_configurator_template"
    )
    .read({
      fields: ["image","translations.*"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        } as any,
      },
    })
    .then((item) => {
      var translation = item.translations[0];
      translation.image = item.image;
      return translation;
    });

  if (!pageProps) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }

  const seoProps = {
    seo_title: pageProps.seo_title,
    seo_description: pageProps.seo_description,
    opengraph_description: pageProps.opengraph_description,
    opengraph_image: pageProps.opengraph_image || null,
  };

  return {
    props: {
      ...allPageProps,
      pageProps,
      seoProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
