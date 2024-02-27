// vendors
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify";
import gsap from "gsap";
// local
import { CircleLink } from "../../../components/CircleLink";
import { useWindowSize } from "../../../components/useWindowSize";
import { CircleCenterLink } from "../../../components/CircleCenterLink";
import { Image } from "../../../components/Image";
import {
  Download,
  ModelAutomatic,
  ModelManual,
  ModelSemiAutomatic,
} from "../../../components/icons";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../../utils/fetchers";
import {
  Color,
  CMS_PUBLIC_URL,
  AnimationDirection,
} from "../../../utils/constants";
import { generateAchievementPath } from "../../../utils/paths";
import { LineCircleLink } from "../../../components/LineCircleLink";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../../../animations/appearing/shared";
import { ScrollDown } from "../../../components/ScrollDown";
import type { PartialItem } from "@directus/sdk";
import { useRouter } from "next/router";
import { OptionItem } from "../../../components/model/OptionItem";
import { getLocale } from "../../../utils/locale";
import { COUNTRIES } from "../../../utils/constants";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  gsap.fromTo(
    ".first-section .link-list li",
    {
      opacity: 0,
      y: "200%",
    },
    {
      scrollTrigger: {
        trigger: ".first-section .link-list li",
        start: "top bottom-=10%",
      },
      duration: 2,
      opacity: 1,
      y: 0,
      stagger: 0.5,
      ease: "power3.out",
    }
  );

  // translateInFromLeftToRight(".product-description");

  gsap.fromTo(
    ".technical-information li",
    {
      x: "-100%",
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: ".technical-information li",
        start: "top bottom-=10%",
      },
      duration: 2,
      x: 0,
      opacity: 1,
      stagger: 0.25,
      ease: "power3.out",
    }
  );

  translateInFromRightToLeft(".section-customization .main-title");
  translateInFromRightToLeft(".section-customization .main-paragraph");
  translateInFromLeftToRight(".section-customization .block-colors .left");
  translateInFromLeftToRight(".section-customization .block-dressing .left");
  translateInFromLeftToRight(".section-customization .block-options .left");

  gsap.fromTo(
    ".section-customization .block-colors .colors li",
    {
      x: "100%",
      opacity: 0,
    },
    {
      scrollTrigger: {
        trigger: ".section-customization .block-colors .colors li",
        start: "top bottom-=10%",
      },
      duration: 2,
      x: 0,
      opacity: 1,
      stagger: 0.25,
      ease: "power3.out",
    }
  );
}

interface ModelProps extends PageProps<ModelsContent> {
  models: PartialItem<SingleModelDirectus>[];
  currentModel: PartialItem<SingleModelDirectus>;
  achievementsPath: string | null;
}

// TODO: add missing line at the end
export default function ModelPage({
  pageProps,
  models,
  currentModel,
  achievementsPath,
  layoutProps,
}: ModelProps) {
  const { locale } = useRouter();

  const cmsLocale = getLocale(locale);
  const {
    main_title,
    main_paragraph,
    technical_information_title,
    configurator_link_text,
    achievements_link_text,
    customization_configurator_link_text,
    last_configurator_link_text,
    technical_info_file_text,
    scroll_down_link_text,
    user_manual_file_text,
  } = pageProps;

  const {
    membrane_colors,
    dressing_image,
    product_image,
    options_images,
    product_image_2,
    reference,
    translations,
    id,
  } = currentModel;
  const size = useWindowSize();
  
  const {
    customization_title,
    customization_paragraph,
    membrane_title,
    membrane_paragraph,
    dressing_title,
    dressing_paragraph,
    options_title,
    options_paragraph,
    options_items,
  } = translations[0];

  useEffect(() => {
    appearingAnimations();
  }, []);

  useEffect(() => {
    if (size.width > 580) {
      return;
    }
    const linkList = document.querySelector("ul.link-list")!;
    if (id === 3) {
      linkList.scrollLeft = linkList.scrollWidth;
    } else if (id === 1) {
      linkList.scrollLeft = 0;
    }
  }, [size, id]);

  const onDownloadTechnicalFileClick = useCallback(
    (fileKey: string) => (e) => {
      e.preventDefault();
      fetch(`${CMS_PUBLIC_URL}/assets/${translations[0][fileKey].id}`)
        .then((res) => res.blob())
        .then((blob) => {
          var elem = window.document.createElement("a");
          elem.href = window.URL.createObjectURL(blob);
          elem.download = translations[0][fileKey].filename_download;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
        });
    },
    [currentModel]
  );
var filteredmodels = models.filter(x=>x.translations.filter(
  (item) => item.languages_code.code === cmsLocale && item.published === true
).length>0);
  return (
    <main className="model-template">
      <section className="section first-section" data-color={Color.WHITE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />

          <ul className="link-list categories">
            {filteredmodels.length>1 && filteredmodels.map(({ id, translations }) => {
              const translation = translations.find(
                (item) => item.languages_code.code === cmsLocale && item.published === true
              );
              if(translation)
              {
              return (
                <li key={id}>
                  <Link
                    passHref
                    href={`/models/${id}/${slugify(translation.main_title, {
                      lower: true,
                    })}`}
                  >
                    <a
                      className={classnames({
                        "subtitle-poppins": true,
                        "link-before-translate": true,
                        "link-before-translate--terra-cotta": true,
                        "is-selected": id === currentModel.id,
                      })}
                    >
                      {translation.main_title}
                    </a>
                  </Link>
                </li>
              );
                    }

            })}
          </ul>
        </div>
      </section>
      <section className="section-model-content" data-color={Color.BEIGE}>
        <div className="top">
          <div
            className="product-description wysiwyg"
            dangerouslySetInnerHTML={{
              __html: translations[0].product_description,
            }}
          />
          <div className="images-container">
            <Image
              id={product_image}
              title="product image"
              containerClassName="main-image"
              isBackgroundCss
            />
            <Image
              id={product_image_2}
              title="product image 2"
              containerClassName="image-on-top"
              direction={AnimationDirection.TOP_TO_BOTTOM}
              isBackgroundCss={Boolean(size.width) && size.width! <= 1024}
            />
          </div>
        </div>
        {layoutProps.hasConfigurator && (
          <div className="link-container">
            <CircleCenterLink
              href="/before-configurator"
              text={configurator_link_text}
            />
          </div>
        )}
        <div className="bottom">
          <div className="technical-information">
            <h3 className="subtitle-argesta subtitle-argesta--anthracite">
              {technical_information_title}
            </h3>
            <ul>
              {translations[0].technical_information.map(({ text }) => (
                <li key={text}>{text}</li>
              ))}
              {translations[0].technical_info_file && (
                <li className="technical-file-item">
                  {technical_info_file_text}
                  <a
                    onClick={onDownloadTechnicalFileClick(
                      "technical_info_file"
                    )}
                  >
                    <Download color={Color.ANTHRACITE} />
                  </a>
                </li>
              )}
              {translations[0].user_manual_file && (
                <li className="technical-file-item">
                  {user_manual_file_text}
                  <a onClick={onDownloadTechnicalFileClick("user_manual_file")}>
                    <Download color={Color.ANTHRACITE} />
                  </a>
                </li>
              )}
            </ul>
            <div className="icon-container">
              {reference === "automatic" && (
                <ModelAutomatic color={Color.TERRA_COTTA} />
              )}
              {reference === "semi-automatic" && (
                <ModelSemiAutomatic color={Color.TERRA_COTTA} />
              )}
              {reference === "manual" && (
                <ModelManual color={Color.TERRA_COTTA} />
              )}
            </div>
          </div>
          {achievementsPath && (
            <CircleLink
              mainLink={{
                href: achievementsPath,
                text: achievements_link_text,
              }}
              textAlign="left"
            />
          )}
        </div>
        <ScrollDown
          text={scroll_down_link_text}
          color={Color.TERRA_COTTA}
          target="section-customization"
        />
      </section>
      <section
        id="section-customization"
        className="section section-customization"
        data-color={Color.ANTHRACITE}
      >
        <div className="section-container">
          <h2 className="main-title main-title--sand">{customization_title}</h2>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: customization_paragraph }}
          />
          {layoutProps.hasConfigurator && (
            <LineCircleLink
              href="/before-configurator"
              color={Color.WHITE}
              text={customization_configurator_link_text}
            />
          )}
        </div>

        <div className="section-container">
          <div className="block block-colors">
            <div className="left">A</div>
            <div className="content">
              <h3 className="subtitle-poppins">{membrane_title}</h3>
              <div
                className="paragraph wysiwyg"
                dangerouslySetInnerHTML={{ __html: membrane_paragraph }}
              />
              <ul className="colors">
                {membrane_colors.map(({ color_name, color_code }) => (
                  <li
                    key={color_name}
                    className="square"
                    style={{ background: color_code }}
                  >
                    <span>{color_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="block block-dressing">
          <div className="left">B</div>
          <div className="text-container">
            <h3 className="subtitle-poppins">{dressing_title}</h3>
            <div
              className="paragraph wysiwyg"
              dangerouslySetInnerHTML={{ __html: dressing_paragraph }}
            />
          </div>
          <Image id={dressing_image} title="Image container" />
        </div>

        <div className="section-container">
          <div className="block block-options">
            <div className="left">+</div>
            <div className="content">
              <Image
                id={options_images}
                title="option image"
                direction={AnimationDirection.RIGHT_TO_LEFT}
              />
              <div className="text-container">
                <h3 className="subtitle-poppins">{options_title}</h3>
                <div
                  className="paragraph wysiwyg"
                  dangerouslySetInnerHTML={{ __html: options_paragraph }}
                />
                <ul className="options">
                  {options_items.map(({ option_name, option_text }) => (
                    <OptionItem
                      key={option_name}
                      name={option_name}
                      popoverText={option_text}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {layoutProps.hasConfigurator && (
        <section className="section link-section" data-color="white">
          <div className="line" />
          <CircleLink
            mainLink={{
              text: last_configurator_link_text,
              href: "/before-configurator",
            }}
            textAlign="left"
          />
        </section>
      )}
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  ModelProps,
  { model: string; id: string }
> = async ({ locale, locales, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const modelsTemplateProps = await getPageContentProps<ModelsContent>(
    fetcher,
    "models_template",
    locale
  );

  // TODO: remove this shit
  const currentModel = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readOne(Number(params.id), {
      fields: ["*.*.*"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        } as any,
      },
    });

  if (!currentModel) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }
  const models = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readMany({
      fields: ["id", "translations.*.*"],
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
    .then((res) => res.data);

  const achievementsPath = await (async () => {
    const deepQuery = {
      translations: {
        _filter: {
          languages_code: {
            _eq: cmsLocale,
          },
        },
      },
    } as any;

    const achievementsFound = await fetcher.directus
      .items("achievements")
      .readMany({
        fields: [
          "id",
          "translations.main_title",
          "category",
          "opengraph_image",
        ],
        filter: {
          model: {
            id: {
              _eq: currentModel.id,
            },
          },
        },
        deep: deepQuery,
      })
      .then((res) => res.data);

    if (achievementsFound.length) {
      const category = await fetcher.directus
        .items<string, AchievementsCategoryDirectus>("achievements_categories")
        .readOne((achievementsFound[0] as any).category, {
          fields: ["translations.main_title", "id"],
          deep: deepQuery,
        });

      return generateAchievementPath(
        category.id,
        category.translations[0].main_title,
        (achievementsFound[0] as any).id,
        (achievementsFound[0] as any).translations[0].main_title
      );
    }

    return null;
  })();

  const props: ModelProps = {
    ...allPageProps,
    ...modelsTemplateProps,
    seoProps: {
      seo_title: currentModel.translations[0].seo_title,
      seo_description: currentModel.translations[0].seo_description,
      opengraph_description: currentModel.translations[0].opengraph_description,
      opengraph_image: currentModel.opengraph_image || null,
    },
    models,
    currentModel,
    achievementsPath,
  };

  return {
    props,
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const fetcher = new Fetcher();

  const models = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readMany({
      fields: ["id", "translations.main_title", "translations.languages_code", "translations.published"],
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach((language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);

      models.forEach((model) => {
        const translation = model.translations.find(
          (item) => item.languages_code === cmsLocale && item.published === true
        );
        if(translation)
        acc.push({
          params: {
            id: String(model.id),
            model: slugify(translation.main_title, { lower: true }),
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
