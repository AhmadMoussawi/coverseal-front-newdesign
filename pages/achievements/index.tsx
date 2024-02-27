import { GetStaticProps } from "next";
import Link from "next/link";
import gsap from "gsap";
import React, { useEffect } from "react";
import slugify from "slugify";
import { translateInFromRightToLeft } from "../../animations/appearing/shared";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../utils/fetchers";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../utils/locale";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
}

interface AchievementsProps extends PageProps<AchievementsContent> {
  achievementsCategories: PartialItem<AchievementsCategoryDirectus>[];
}

export default function AchievementsListPage({
  pageProps,
  achievementsCategories,
}: AchievementsProps) {
  const { main_title } = pageProps;

  useEffect(() => {
    appearingAnimations();

    gsap.fromTo(
      ".categories li",
      {
        y: "100%",
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".categories li",
          start: "top bottom-=10%",
        },
        duration: 2,
        y: 0,
        opacity: 1,
        stagger: 0.25,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <main className="achievements-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>

          <ul className="categories">
            {achievementsCategories.map(({ translations, id }) => (
              <li key={translations[0].main_title}>
                <Link
                  href={`/achievements/${id}/${slugify(
                    translations[0].main_title,
                    {
                      lower: true,
                    }
                  )}`}
                  passHref
                >
                  <a className="link-before-translate link-before-translate--anthracite">
                    {translations[0].main_title}
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

export const getStaticProps: GetStaticProps<AchievementsProps> = async ({
  locale,
}) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<AchievementsContent>(
    fetcher,
    "achievements_template",
    locale
  );

  const categories = await fetcher.directus
    .items<string, AchievementsCategoryDirectus>("achievements_categories")
    .readMany({
      fields: ["translations.*", "id"],
      filter: {
        is_enabled: {
          _eq: true,
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
      ...pageProps,
      achievementsCategories: categories,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
