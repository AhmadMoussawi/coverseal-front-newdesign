import { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import {
  Fetcher,
  getPageContentProps,
  getAllPagePropsOnly,
} from "../../utils/fetchers";
import { ArrowCustom } from "../../components/icons";
import dynamic from "next/dynamic";
const Image = dynamic(() => import('../../components/Image'));
import slugify from "slugify";
import Link from "next/link";
import { AnimationDirection, Color } from "../../utils/constants";
import { generateAchievementPath } from "../../utils/paths";
import { translateInFromRightToLeft } from "../../animations/appearing/shared";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../utils/locale";
import { COUNTRIES } from "../../utils/constants";
const CatalogueRequestHomeSection = dynamic(() => import('../../components/CatalogueRequestHomeSection'));
import { useRouter } from "next/router";

function appearingAnimations() {
  // translateInFromRightToLeft(".first-section .main-title");
}

interface AchievementsProps
  extends PageProps<AchievementsContent> {
  projects: PartialItem<SingleAchievementDirectus>[];
}

export default function AchievementsCategoryPage({
  pageProps,
  projects,
  globalSection
}: AchievementsProps) {
  const {
    // main_title, achievementsRootContent,
    id,
    main_title,
    main_description
  } = pageProps;

  const { locale, asPath } = useRouter();
  useEffect(() => {
    appearingAnimations();
  }, []);

  return (
    <main className="achievements-category-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              {pageProps.main_title}
            </h1>
            {/*<Link href="/achievements" passHref>
              <a className="back-button">
                <ArrowCustom color={Color.TERRA_COTTA} />
                {achievementsRootContent.back_to_achievements}
              </a>
  </Link>*/}
          </div>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_description }}
          />
          </div>
          <div className="section-container section-container-second">
          <ul className="projects">
            {projects.map((project, i) => (
              <li key={project.translations[0].main_title}>
                <Link
                  href={generateAchievementPath(
                    project.category.id,
                    project.category.translations[0].main_title,
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
      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
      />
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  AchievementsProps,
  { category: string; category_id: string }
> = async ({ locale, locales, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<AchievementsContent>(
    fetcher,
    "achievements_template",
    locale
  );


  const achievements = await fetcher.directus
    .items<string, SingleAchievementDirectus>("achievements")
    .readMany({
      fields: ["translations.*", "id", "list_image","orderindex", "category.*", "category.translations.*"],
      sort: ["orderindex"],
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
      ...pageProps,
      projects: achievements,
    },
    revalidate: 1//parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};


