/*import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CircleLink } from "../components/CircleLink";
import { LineLink } from "../components/LineLink";
import { YoutubePlayButton } from "../components/icons";
import { Image } from "../components/Image";
import { AnimationDirection, Color } from "../utils/constants";
import { generateMap } from "../utils/map";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

declare const YT: any;

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  translateInFromLeftToRight(".block-history .text-container");
  translateInFromRightToLeft(".block-company .text-container");
  translateInFromLeftToRight(".block-network .text-container");
}

export default function CookiesPolicyPage({ pageProps }: PageProps<CookiesPolicyContent>) {
  const [isGenerated, setIsGenerated] = useState(false);

  const {
    title,
    text
  } = pageProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  

  return (
    <main className="after-sale-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          
        </div>
        
      </section>
    
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<CookiesPolicyContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<CookiesPolicyContent>(
    fetcher,
    "cookies_policy",
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
*/
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import gsap from "gsap";
import { CircleLink } from "../components/CircleLink";
import { LineLink } from "../components/LineLink";
import { YoutubePlayButton } from "../components/icons";
import { Image } from "../components/Image";
import { AnimationDirection, Color } from "../utils/constants";
import { generateMap } from "../utils/map";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

declare const YT: any;

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  translateInFromLeftToRight(".block-history .text-container");
  translateInFromRightToLeft(".block-company .text-container");
  translateInFromLeftToRight(".block-network .text-container");
}

interface CookiesPolicyProps extends PageProps<CookiesPolicyContent> {}

export default function CookiesPolicyPage({ pageProps }: PageProps<CookiesPolicyContent>) {
  useEffect(() => {
    appearingAnimations();
  }, []);
  const {
    title,
    text
  } = pageProps;
  return (
    <main className="after-sale-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<CookiesPolicyProps> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<CookiesPolicyContent>(
    fetcher,
    "cookies_policy",
    locale
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
    },
  };
};