import type { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../../../../utils/fetchers";
import {
  TextImage,
  DoubleImage,
  TextOnly,
  ImageOnly,
} from "../../../../../components/achievements";
import slugify from "slugify";
import Link from "next/link";
import { CircleLink } from "../../../../../components/CircleLink";
import { Color } from "../../../../../utils/constants";
import {
  generateAchievementPath,
  generateAchievementCategoryPath,
} from "../../../../../utils/paths";
import { ArrowCustom } from "../../../../../components/icons";
import { translateInFromRightToLeft } from "../../../../../animations/appearing/shared";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../../../../utils/locale";
import { COUNTRIES } from "../../../../../utils/constants";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
}
interface AchievementsDetailsProps
  extends PageProps<PartialItem<SingleAchievementDirectus>> {
  linkToNextProject: string | null;
  linkToModel: string;
  achievementsTemplateProps: AchievementsContent;
  backToCategoryPath: string;
}

export default function AchievementsInspirationDetailsPage({
  pageProps,
  linkToModel,
  linkToNextProject,
  achievementsTemplateProps,
  backToCategoryPath,
}: AchievementsDetailsProps) {
  const { project_text, main_title } = pageProps.translations[0];

  const { sections } = pageProps;
  const { back_to_achievements, models_link_text, next_coverseal } =
    achievementsTemplateProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  return (
    <main className="achievements-details-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              <span>{project_text}</span> {main_title}
            </h1>
            <Link href={backToCategoryPath} passHref>
              <a className="back-button">
                <ArrowCustom color={Color.TERRA_COTTA} />
                {back_to_achievements}
              </a>
            </Link>
          </div>
          {sections.map((section, i) => {
            switch (section.type) {
              case "double_images":
                return (
                  <DoubleImage
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                );
              case "text_only":
                return (
                  <TextOnly
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                );
              case "text_image":
                return (
                  <TextImage
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                );
              case "image_only":
                return (
                  <ImageOnly
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                );
            }
          })}
        </div>
        <div className="circle-link-container">
          <CircleLink
            mainLink={{
              text: models_link_text,
              href: linkToModel,
            }}
            textAlign="left"
          />
        </div>
        <div className="section-container link-container">
          <Link href={backToCategoryPath} passHref>
            <a className="back-button">
              <ArrowCustom color={Color.TERRA_COTTA} />
              {back_to_achievements}
            </a>
          </Link>
          {linkToNextProject && (
            <Link href={linkToNextProject} passHref>
              <a className="back-button next-button">
                {next_coverseal}
                <ArrowCustom color={Color.TERRA_COTTA} />
              </a>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  AchievementsDetailsProps,
  { project: string; id: string; category: string; category_id: string }
> = async ({ locale, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const achievementsTemplateProps =
    await getPageContentProps<AchievementsContent>(
      fetcher,
      "achievements_template",
      locale
    );

  // TODO: this way to get the third level fields (sections.translations.*) is OP and should be use widly over the project
  const currentProject = await fetcher.directus
    .items<string, SingleAchievementDirectus>("achievements")
    .readOne(params.id, {
      fields: [
        "translations.*",
        "*",
        "sections.*",
        "sections.translations.*",
        "model.id",
        "model.translations.main_title",
        "model.translations.languages_code",
      ],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        },
        model: {
          translations: {
            _filter: {
              languages_code: {
                _eq: cmsLocale,
              },
            },
          },
        },
        sections: {
          translations: {
            _filter: {
              languages_code: {
                _eq: cmsLocale,
              },
            },
          },
        },
      } as any,
    })
    .catch((e) => {
      return null;
    });

  if (
    !currentProject ||
    currentProject.translations.length === 0 ||
    currentProject.sections.some(
      (item) => item.type === "text_image" && item.translations.length === 0
    )
  ) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }

  const linkToModel = `/models/${currentProject.model.id}/${slugify(
    currentProject.model.translations[0].main_title,
    {
      lower: true,
    }
  )}`;

  const linkToNextProject = await (async () => {
    const nextProject = await fetcher.directus
      .items<string, SingleAchievementDirectus>("achievements")
      .readMany({
        fields: [
          "id",
          "opengraph_image",
          "translations.main_title",
          "category.id",
          "category.translations.main_title",
        ],
        filter: {
          category: {
            _eq: Number(params.category_id),
          },
        },
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: cmsLocale,
              },
            },
          },
          category: {
            translations: {
              _filter: {
                languages_code: {
                  _eq: cmsLocale,
                },
              },
            },
          },
        } as any,
      })
      .then((res) => res.data.find((item) => item.id > Number(params.id)))
      .catch((_error) => {
        console.log("next item doesn't exist");
        return null;
      });

    if (nextProject && nextProject.translations.length) {
      return generateAchievementPath(
        nextProject.category.id,
        nextProject.category.translations[0].main_title,
        nextProject.id,
        nextProject.translations[0].main_title
      );
    }

    return null;
  })();

  const props: AchievementsDetailsProps = {
    ...allPageProps,
    seoProps: {
      seo_title: currentProject.translations[0].seo_title,
      seo_description: currentProject.translations[0].seo_description,
      opengraph_description:
        currentProject.translations[0].opengraph_description,
      opengraph_image: currentProject.opengraph_image || null,
    },
    pageProps: currentProject,
    achievementsTemplateProps: achievementsTemplateProps.pageProps,
    linkToModel,
    linkToNextProject,
    backToCategoryPath: generateAchievementCategoryPath(
      Number(params.category_id),
      params.category
    ),
  };

  return {
    props,
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();

  const achievements = await fetcher.directus
    .items<string, SingleAchievementDirectus>("achievements")
    .readMany({
      fields: [
        "id",
        "translations.main_title",
        "translations.languages_code",
        "category.translations.main_title",
        "category.translations.languages_code",
        "category.id",
      ],
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach((language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);

      achievements.forEach((achievement) => {
        const translation = achievement.translations.find(
          (item) => item.languages_code === cmsLocale
        );
        const category = achievement.category as AchievementsCategoryDirectus;
        const categoryTranslation = category.translations.find(
          (item) => item.languages_code === cmsLocale
        );
          if(translation)
        acc.push({
          params: {
            category_id: String(category.id),
            project: slugify(translation.main_title, { lower: true }),
            category: slugify(categoryTranslation.main_title, { lower: true }),
            id: String(achievement.id),
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
