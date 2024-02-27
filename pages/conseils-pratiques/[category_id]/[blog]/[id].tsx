import type { GetStaticPaths, GetStaticProps } from "next";
import React, { useEffect } from "react";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../../../utils/fetchers";
import {
  TextImage,
  DoubleImage,
  TextOnly,
  ImageOnly,
} from "../../../../components/achievements";
import { Image } from "../../../../components/Image";
import slugify from "slugify";
import Link from "next/link";
import { CircleLink } from "../../../../components/CircleLink";
import { AnimationDirection,Color } from "../../../../utils/constants";
import {
  generateBlogPath
} from "../../../../utils/paths";
import { ArrowCustom } from "../../../../components/icons";
import { translateInFromRightToLeft } from "../../../../animations/appearing/shared";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../../../../utils/locale";
import { COUNTRIES,CMS_PUBLIC_URL } from "../../../../utils/constants";
import Date from '../../../../components/date';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router'
import StructuredData from '../../../../components/StructuredData';
function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
}
interface BlogsDetailsProps
  extends PageProps<PartialItem<SingleBlogDirectus>> {
  blogsTemplateProps: BlogsContent;
}
const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  //...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'left',
  //color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow:"unset",
}));
export default function AchievementsInspirationDetailsPage({
  pageProps,
  blogsTemplateProps
}: BlogsDetailsProps) {
  const { description, main_title, content } = pageProps.translations[0];
  const { related_blogs, date_created, list_image, blog_author } = pageProps;
  const { back_to_blogs, next_coverseal, related_blogs_text } =
  blogsTemplateProps;

  const imglink = `${CMS_PUBLIC_URL}/assets/${list_image}`;
  useEffect(() => {
    appearingAnimations();
  }, []);
  const router = useRouter();
  const { locale } = useRouter();
  const structuredData = {
    "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": main_title,
      "image": [
        imglink
       ],
      "datePublished": date_created,
      "author": [blog_author?{
          "@type": "Person",
          "name": blog_author.name,
          "url": blog_author.url?blog_author.url:""
        }:{}]
  };
  
  const [language, country] = locale.split("-");
  return (
    <>
    <StructuredData data={structuredData} id="conseils-pratiques-data" />
    <article className="blogs-details-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <div className="title-container">
            <h1 className="main-title main-title--terra-cotta">
              {/*<span>{text}</span>*/} {main_title}
              <Date style={{fontSize:"15px",marginTop:"0px", display:"block"}} dateString={date_created.toString()} language={language} />
            </h1>
            
            
              <a className="back-button" style={{cursor:"pointer"}} onClick={() => router.back()}>
                <ArrowCustom color={Color.TERRA_COTTA} />
                {back_to_blogs}
              </a>
          </div>
          <div  className="text-only-block block">
      <div
        className="paragraph wysiwyg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
          {/*sections.map((section, i) => {
            switch (section.type) {
              case "double_images":
                return (
                  <DoubleImage
                    key={i}
                    {...(section as BlogsSectionsDirectus)}
                  />
                );
              case "text_only": 
              return (
                  <TextOnly
                    key={i}
                    {...(section as BlogsSectionsDirectus)}
                  />
                );
              case "text_image":
                return (
                  <TextImage
                    key={i}
                    {...(section as BlogsSectionsDirectus)}
                  />
                );
              case "image_only":
                return (
                  <ImageOnly
                    key={i}
                    {...(section as BlogsSectionsDirectus)}
                  />
                );
            }
          })*/}
        </div>
        {/*<div className="circle-link-container">
          <CircleLink
            mainLink={{
              text: models_link_text,
              href: linkToModel,
            }}
            textAlign="left"
          />
          </div>*/}
        <div className="section-container link-container">
          
            <a className="back-button btn" style={{cursor:"pointer"}} onClick={() => router.back()}>
              <ArrowCustom color={Color.TERRA_COTTA} />
              {back_to_blogs}
            </a>
          {/*linkToNextProject && (
            <Link href={linkToNextProject} passHref>
              <a className="back-button next-button">
                {next_coverseal}
                <ArrowCustom color={Color.TERRA_COTTA} />
              </a>
            </Link>
          )*/}
        </div>
        
        {related_blogs.length>0 && (
            <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {related_blogs_text}
              </h3>
              
            </div>
            <Masonry columns={{xs:1, sm:2, md:3, lg:4}} spacing={2} className="projects">
        
            {related_blogs.map((project, i) => (
              <div key={project.translations[0].main_title}>
              <Link
                    href={generateBlogPath(
                      project.category as number,
                      project.translations[0].main_title,
                      project.id
                    )}
                    passHref
                  >
            <a>
              <Image
                id={project.list_image}
                title="Blog Image"
                
                direction={
                  (i + 1) % 2 === 0
                    ? AnimationDirection.LEFT_TO_RIGHT
                    : AnimationDirection.RIGHT_TO_LEFT
                }
                isBackgroundCss={true}
              />
              <Label><h5 className="subtitle" style={{fontWeight:"500"}}>{project.translations[0].main_title}</h5>{project.translations[0].description}<br/><a className="back-button next-button" href={generateBlogPath(
                      project.category as number,
                      project.translations[0].main_title,
                      project.id
                    )} style={{fontSize:"12px", marginTop:"12px"}}>{blogsTemplateProps.readmore}
            <ArrowCustom color={Color.TERRA_COTTA} />
            </a><Date style={{fontSize:"12px",marginTop:"10px", display:"block"}} dateString={project.date_created.toString()} language={language} /></Label>
              </a>
              </Link>
            </div>
                
              ))}
        
        </Masonry>
            {/*<ul className="projects">
              {related_blogs.map((project, i) => (
                <li key={project.translations[0].main_title}>
                  <Link
                    href={generateBlogPath(
                      project.category as number,
                      project.translations[0].main_title,
                      project.id
                    )}
                    passHref
                  >
                    <a className="link-before-translate link-before-translate--anthracite">
                      <Image
                        id={project.list_image}
                        title="Blog image"
                        direction={
                          (i + 1) % 2 === 0
                            ? AnimationDirection.LEFT_TO_RIGHT
                            : AnimationDirection.RIGHT_TO_LEFT
                        }
                        isBackgroundCss
                      />
                      <div className="text-container">
                        <h3 className="subtitle-poppins">
                          
                          {project.translations[0].main_title}
                        </h3>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>*/}
          </div>
            )}
      </section>
    </article>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  BlogsDetailsProps,
  { blog: string; category_id: string; id:string; }
> = async ({ locale, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const blogsTemplateProps =
    await getPageContentProps<BlogsContent>(
      fetcher,
      "blogs_template",
      locale
    );
    const [language, country] = locale.split("-");
    const countrydb = await fetcher.directus
      .items<string, CountriesDirectus>("countries")
      .readMany({
        fields: ["id", "translations.*", "code"],
        filter:{
          code:{
            _eq:country
          }
        }
        
      })
      .then((res) => res.data);
                  var hasblog = blogsTemplateProps.pageProps.allowed_countries.filter(x=>countrydb.length>0 && x.countries_id == countrydb[0].id).length>0;
                  if (!hasblog) {
      
                    return {
                      props: null,
                      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
                      redirect: {
                        permanent: false,
                        destination: '/' + locale,
                    },
                    };
                  }
  // TODO: this way to get the third level fields (sections.translations.*) is OP and should be use widly over the project
  const currentProject = await fetcher.directus
    .items<string, SingleBlogDirectus>("Blogs")
    .readOne(params.id, {
      fields: [
        "translations.*",
        "*",
        //"sections.*",
        //"sections.translations.*",
        "related_blogs.*",
        "related_blogs.translations.*",
        "blog_author.*"
      ],
      /*deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        },
      } as any,*/
    })
    .catch((e) => {
      return null;
    });
    var els = [];
    /*for(var i=0;i<currentProject.sections.length;i++)
    {
      var el = currentProject.sections[i];
      if(el.translations.filter(x=>x.languages_code == cmsLocale).length > 0)
      {
        el.translations = el.translations.filter(x=>x.languages_code == cmsLocale);
      }
      else if(el.translations.length > 0)
      {
        els.push(el.translations[0]);
        el.translations = els;
      }
    }*/
  if (
    !currentProject ||
    currentProject.translations.filter(x=>x.languages_code == cmsLocale && x.published).length === 0 /*||
    currentProject.sections.some(
      (item) => item.type === "text_image" && item.translations.length === 0
    )*/
  ) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      redirect: {
        permanent: false,
        destination: '/' + locale,
    },
    };
  }
  
  var trans = currentProject.translations.filter(x=>x.languages_code == cmsLocale);
if(trans && trans.length>0)
  currentProject.translations = trans;
else
{
  trans = [];
  trans.push(currentProject.translations[0]);
  currentProject.translations = trans;
}



  const props: BlogsDetailsProps = {
    ...allPageProps,
    seoProps: {
      seo_title: currentProject.translations[0].seo_title,
      seo_description: currentProject.translations[0].seo_description,
      opengraph_description:
        currentProject.translations[0].opengraph_description,
      opengraph_image: currentProject.opengraph_image || null,
    },
    pageProps: currentProject,
    blogsTemplateProps: blogsTemplateProps.pageProps
  };

  return {
    props,
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();

  const blogs = await fetcher.directus
    .items<string, SingleBlogDirectus>("Blogs")
    .readMany({
      fields: [
        "id",
        "date_created",
        "translations.main_title",
        "translations.languages_code",
      ],
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach(async(language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);
      const blogTemplateProps = await getPageContentProps<BlogsContent>(
        fetcher,
        "blogs_template",
        locale
      );
      
      
      const countrydb = await fetcher.directus
        .items<string, CountriesDirectus>("countries")
        .readMany({
          fields: ["id", "translations.*", "code"],
          filter:{
            code:{
              _eq:countryCode
            }
          }
          
        })
        .then((res) => res.data);
                    var hasblog = blogTemplateProps.pageProps.allowed_countries.filter(x=>countrydb.length>0 && x.countries_id == countrydb[0].id).length>0;
                    if(hasblog)
                    {
      blogs.forEach((blog) => {
        const translation = blog.translations.find(
          (item) => item.languages_code === cmsLocale
        );
        
          if(translation && translation.main_title)
        acc.push({
          params: {
            blog: slugify(translation.main_title, { lower: true }),
            category_id: String(blog.category),
            id: String(blog.id),
          },
          locale,
        });
      });
    }
    });
    return acc;
  }, [] as any);

  return {
    paths,
    fallback: "blocking",
  };
};
