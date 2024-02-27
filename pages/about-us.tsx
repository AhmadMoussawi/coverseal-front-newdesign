import { GetStaticProps } from "next";
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

export default function AboutUsPage({ pageProps }: PageProps<AboutUsContent>) {
  const [isGenerated, setIsGenerated] = useState(false);

  const {
    main_title,
    main_paragraph,
    company_title,
    company_paragraph,
    history_title,
    history_paragraph,
    network_paragraph,
    network_title,
    partnership_link_text,
    the_coverseal_link_text,
    achievements_link_text,
    history_image,
    history_image_2,
    company_image,
    company_image_2,
    company_image_3,
    company_image_4
  } = pageProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  useEffect(() => {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player: any;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("video", {
        width: 600,
        height: 400,
        videoId: "MLJhLqqxUj0",
        playerVars: {
          color: "white",
        },
      });
    }

    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    const videoContainer = document.querySelector(".video-container");

    const onVideoClick = function () {
      if (player && player.playVideo) {
        player.playVideo();
      }
      videoContainer.classList.add("player");
      const videoPoster = document.querySelector<HTMLElement>(".video-poster");
      const playButton =
        document.querySelector<HTMLElement>(".button-container");
      gsap.to(videoPoster, {
        opacity: 0,
        duration: 2,
        ease: "power3.out",
        onComplete: () => {
          videoPoster.style.display = "none";
        },
      });

      gsap.to(playButton, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          playButton.style.display = "none";
        },
      });

      videoContainer.removeEventListener("click", onVideoClick);
    };

    videoContainer.addEventListener("click", onVideoClick);

    if (!isGenerated) {
      //generateMap();
      setIsGenerated(true);
    }
  }, [isGenerated]);

  return (
    <main className="about-us-template">
      <section className="section first-section" data-color="terra-cotta">
        <div className="section-container">
          <h1 className="main-title main-title--white">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          <div className="video-container">
            <div className="video-poster" />
            <div className="button-container">
              <YoutubePlayButton color={Color.TERRA_COTTA} />
            </div>
            <div id="video" />
          </div>

          <div className="block block-history">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--white">
                {history_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{
                  __html: history_paragraph,
                }}
              />
              <Image
                id={history_image_2}
                title="histoire image 2"
                containerClassName="image-on-top"
                direction={AnimationDirection.RIGHT_TO_LEFT}
              />
            </div>
            <Image
              id={history_image}
              title="histoire image"
              containerClassName="image-behind"
              direction={AnimationDirection.TOP_TO_BOTTOM}
            />
          </div>

          <div className="block block-text-image image-left">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--white">
                {company_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{
                  __html: company_paragraph,
                }}
              />
            </div>
            <Image
              id={company_image.filename_disk}
              title="company image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>

          <div className="block block-double-image">
            <Image
              id={company_image_2}
              title="company image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            <Image
              id={company_image_3}
              title="company image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>

          <div className="block block-network">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--white">
                {network_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{
                  __html: network_paragraph,
                }}
              />
            </div>
            <Image
              id={company_image_4.filename_disk}
              title="company image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            {/*<div id="map">
              <div className="tooltip" />
              </div>*/}
          </div>
        </div>
        <LineLink
          href="/partnerships"
          text={partnership_link_text}
          color={Color.WHITE}
        />
      </section>
      <section className="link-section" data-color={Color.WHITE}>
        <CircleLink
          mainLink={{
            text: the_coverseal_link_text,
            href: "/the-coverseal",
          }}
          secondLink={{
            text: achievements_link_text,
            href: "/achievements",
          }}
          textAlign="right"
        />
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<AboutUsContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<AboutUsContent>(
    fetcher,
    "about_us_template",
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
