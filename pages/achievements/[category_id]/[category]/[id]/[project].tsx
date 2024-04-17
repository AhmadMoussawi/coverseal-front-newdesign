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
import { Image } from "../../../../../components/Image";
import { Grid } from "@material-ui/core";
import { PriceRequestSection } from "../../../../../components/PriceRequestSection";
import { CatalogueRequestHomeSection } from "../../../../../components/CatalogueRequestHomeSection";
import { useRouter } from "next/router";
function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
}
interface AchievementsDetailsProps
  extends PageProps<PartialItem<SingleAchievementDirectus>> {
  linkToNextProject: string | null;
  nextProjectTitle:string | null;
  linkToModel: string;
  achievementsTemplateProps: AchievementsContent;
  backToCategoryPath: string;
  pricerequest:PriceRequestContent;
}

export default function AchievementsInspirationDetailsPage({
  pageProps,
  linkToModel,
  linkToNextProject,
  nextProjectTitle,
  achievementsTemplateProps,
  backToCategoryPath,
  globalSection,
  pricerequest
}: AchievementsDetailsProps) {
  const { project_text, main_title,  } = pageProps.translations[0];
  const { locale } = useRouter();
  const { sections } = pageProps;
  const { back_to_achievements, models_link_text, next_coverseal, configurator_title, configurator_link_text } = achievementsTemplateProps;
  const { form_title, step_one_title, step_two_title, next_btn_title, mobile_step_one_title, mobile_step_two_title } = pricerequest;
  useEffect(() => {
    appearingAnimations();
  }, []);
  const sortGallery = ( a, b ) =>{
    if ( a.image_sort < b.image_sort ){
      return -1;
    }
    if ( a.image_sort > b.image_sort ){
      return 1;
    }
    return 0;
  }
  return (
    <>
    <main className="achievements-details-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              <span>{project_text}</span> {main_title}
            </h1>
            {/*<Link href={backToCategoryPath} passHref>
              <a className="back-button">
                <ArrowCustom color={Color.TERRA_COTTA} />
                {back_to_achievements}
              </a>
  </Link>*/}
          </div>
          </div>
          {sections.map((section, i) => {
            switch (section.type) {
              case "double_images":
                return (
                  <div className="section-container">
                  <DoubleImage
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                  </div>
                );
              case "text_only":
                return (
                  <div className="section-container">
                  <TextOnly
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                  </div>
                );
              case "text_image":
                return (
                  <div className="section-container">
                  <TextImage
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                  </div>
                );
              case "image_only":
                return (
                  <div className="section-container">
                  <ImageOnly
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                  </div>
                );
                case "full_screen_image":
                return (
                  <div style={{width:"100%", marginTop:"50px"}}>
                  <Image id={section.image} title="image" />
                  </div>
                );
                case "images_gallery":
                return (
                  <div className="section-container">
                  <ImageOnly
                    key={i}
                    {...(section as AchievementsSectionsDirectus)}
                  />
                  <Grid container spacing={2}>
                    {section.gallery.sort(sortGallery).map(gal=>{
                      return (
                        <Grid item xs={6} lg={4}>
                          <Image id={gal.directus_files_id} title="image" />
                          </Grid>
                      );
                    })}
                  </Grid>
                  </div>
                );
            }
          })}
        {/*<div className="circle-link-container">
          <CircleLink
            mainLink={{
              text: models_link_text,
              href: linkToModel,
            }}
            textAlign="left"
          />
          </div>*/}
          </section>
          <section className="section " style={{padding:"30px 0"}} data-color="white">
        <div className="section-container link-container">
          <Link href="/achievements" passHref>
            <a className="back-button">
              <ArrowCustom color={Color.TERRA_COTTA} />
              {back_to_achievements}
            </a>
          </Link>
          {linkToNextProject && (
            <Link href={linkToNextProject} passHref>
              <a className="back-button next-button">
                {next_coverseal} «{nextProjectTitle}»
                <ArrowCustom color={Color.TERRA_COTTA} />
              </a>
            </Link>
          )}
        </div>
      </section>
      <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {configurator_title}
              </h4>
              <Link href={`/before-configurator`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {configurator_link_text}
                            </a>
              </Link>
              </div></div>
            
          
            
        </div>
    </section>
    </main>
    <main className="price-request-template">
    <section className="section first-section" data-color={Color.BEIGE}>
      <div className="section-container">
        <h1 className="subtitle-argesta subtitle-argesta--terra-cotta">{pricerequest.main_title}</h1>
        <p>{pricerequest.main_description}</p>
      </div>
    </section>
    <PriceRequestSection
      noTitle
      {...globalSection.priceRequest}
      formsMessages={globalSection.formsMessages}
      locale={locale}
      form_title={""}
      step_one_title={step_one_title}
      step_two_title={step_two_title}
      mobile_step_one_title={mobile_step_one_title}
      mobile_step_two_title={mobile_step_two_title}
      next_btn_title={next_btn_title}
    />
    <CatalogueRequestHomeSection 
      {...globalSection.priceRequest}
      formsMessages={globalSection.formsMessages}
      locale={locale}
      newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
    />
  </main>
  </>
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
        "sections.gallery.*",
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
  const nextProject = await fetcher.directus
  .items<string, SingleAchievementDirectus>("achievements")
  .readMany({
    fields: [
      "id",
      "opengraph_image",
      "translations.main_title",
      "translations.project_text",
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
  const nextProjectTitle = nextProject ? nextProject.translations[0].project_text + " " +nextProject.translations[0].main_title:null;
  const linkToNextProject = await (async () => {
    

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
  const pricerequest= await fetcher.fetchCollection<PriceRequestContent>("price_request_template", cmsLocale)
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
    nextProjectTitle,
    backToCategoryPath: generateAchievementCategoryPath(
      Number(params.category_id),
      params.category
    ),
    pricerequest
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
