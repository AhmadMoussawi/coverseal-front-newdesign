import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import {
  Fetcher,
  getPageContentProps,
  getAllPagePropsOnly,
} from "../../../../utils/fetchers";
import { ArrowCustom } from "../../../../components/icons";
import { Image } from "../../../../components/Image";
import slugify from "slugify";
import Link from "next/link";
import { AnimationDirection, Color } from "../../../../utils/constants";
import { generateAchievementPath } from "../../../../utils/paths";
import { translateInFromRightToLeft } from "../../../../animations/appearing/shared";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../../../utils/locale";
import { COUNTRIES } from "../../../../utils/constants";

function appearingAnimations() {
  // translateInFromRightToLeft(".first-section .main-title");
}

interface AchievementsCategoryProps
  extends PageProps<AchievementsCategoryDirectus> {
  projects: PartialItem<SingleAchievementDirectus>[];
  achievementsRootContent: AchievementsContent;
}

export default function AchievementsCategoryPage({
  pageProps,
  projects,
  achievementsRootContent,
}: AchievementsCategoryProps) {
  const {
    // main_title, achievementsRootContent,
    id,
    translations,
  } = pageProps;

  useEffect(() => {
    appearingAnimations();
  }, []);

  return (
    <main className="achievements-category-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              <span>{achievementsRootContent.main_title}</span>{" "}
              {translations[0].main_title}
            </h1>
            <Link href="/achievements" passHref>
              <a className="back-button">
                <ArrowCustom color={Color.TERRA_COTTA} />
                {achievementsRootContent.back_to_achievements}
              </a>
            </Link>
          </div>

          <ul className="projects">
            {projects.map((project, i) => (
              <li key={project.translations[0].main_title}>
                <Link
                  href={generateAchievementPath(
                    id,
                    translations[0].main_title,
                    project.id,
                    project.translations[0].main_title
                  )}
                  passHref
                >
                  <a className="link-before-translate link-before-translate--anthracite">
                    <Image
                      id={project.list_image}
                      title="Project image"
                      direction={
                        (i + 1) % 2 === 0
                          ? AnimationDirection.LEFT_TO_RIGHT
                          : AnimationDirection.RIGHT_TO_LEFT
                      }
                      isBackgroundCss
                    />
                    <div className="text-container">
                      <h3 className="subtitle-poppins">
                        <span>{project.translations[0].project_text}</span>{" "}
                        {project.translations[0].main_title}
                      </h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  AchievementsCategoryProps,
  { category: string; category_id: string }
> = async ({ locale, locales, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const achievementsTemplateProps =
    await getPageContentProps<AchievementsContent>(
      fetcher,
      "achievements_template",
      locale
    );

  // ensure category exist
  const currentCategory = await fetcher.directus
    .items<string, AchievementsCategoryDirectus>("achievements_categories")
    .readOne(params.category_id, {
      fields: ["translations.*", "id", "opengraph_image"],
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
    .catch(() => null);

  if (!currentCategory) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }

  const achievements = await fetcher.directus
    .items<string, SingleAchievementDirectus>("achievements")
    .readMany({
      fields: ["translations.*", "id", "list_image","orderindex"],
      sort: ["orderindex"],
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
        } as any,
      },
    })
    .then((res) => res.data.filter((item: any) => item.translations.length));

  return {
    props: {
      ...allPageProps,
      seoProps: {
        seo_title: currentCategory.translations[0].seo_title || null,
        seo_description:
          currentCategory.translations[0].seo_description || null,
        opengraph_description:
          currentCategory.translations[0].opengraph_description || null,
        opengraph_image: currentCategory.opengraph_image || null,
      },
      pageProps: {
        ...currentCategory,
      },
      achievementsRootContent: achievementsTemplateProps.pageProps,
      projects: achievements,
    },
    revalidate: 1//parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();
  const categories = await fetcher.directus
    .items<string, AchievementsCategoryDirectus>("achievements_categories")
    .readMany({
      fields: ["translations.main_title", "translations.languages_code", "id"],
      filter: {
        is_enabled: {
          _eq: true,
        },
      },
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach((language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);

      categories.forEach((category) => {
        const translation = category.translations.find(
          (item) => item.languages_code === cmsLocale
        );
        if(translation)
        {
        acc.push({
          params: {
            category_id: String(category.id),
            category: slugify(translation.main_title, { lower: true }),
          },
          locale,
        });
      }
      });
    });
    return acc;
  }, [] as any);

  return {
    paths,
    fallback: "blocking",
  };
};
