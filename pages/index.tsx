import { GetStaticProps } from "next";
import React,   { useMemo, useEffect, useState  } from "react";
import classNames from "classnames";
import Link from "next/link";
import slugify from "slugify";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import {
  LogoSymbol,
  ModelSemiAutomatic,
  ModelManual,
  ModelAutomatic,
  VideoLink,
} from "../components/icons";
import { Image } from "../components/Image";
import { LineCircleLink } from "../components/LineCircleLink";
import { CircleCenterLink } from "../components/CircleCenterLink";
import { ScrollDown } from "../components/ScrollDown";
import { AnimationDirection, Color } from "../utils/constants";
import gsap from "gsap";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";
import { useRouter } from "next/router";
import { useWindowSize } from "../components/useWindowSize";
import { getLocale } from "../utils/locale";
import { generateBlogPath } from "../utils/paths";
import { ArrowCustom } from "../components/icons";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import Date from '../components/date';
import { PartialItem } from "@directus/sdk";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";
import { Grid } from "@material-ui/core";
import { Height } from "@material-ui/icons";


const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  //...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'left',
  height:'160px',
  //color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow:"unset",
}));

function appearingAnimations() {
  translateInFromRightToLeft(".main-title");

  translateInFromLeftToRight(".coverseal-section h2");
  translateInFromRightToLeft(".coverseal-section .text-container");

  gsap.fromTo(
    ".models-section .line-alone",
    {
      x: "100%",
    },
    {
      scrollTrigger: {
        trigger: ".models-section .line-alone",
        start: "top bottom-=10%",
      },
      duration: 2,
      x: 0,
      ease: "power3.out",
    }
  );
  translateInFromLeftToRight(".benefits-section .text-container");

  translateInFromLeftToRight(".models-section h2");

  gsap.fromTo(
    ".item-container",
    { opacity: 0 },
    {
      opacity: 1,
      delay: 0.5,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".item-container",
        start: "top center",
      },
    }
  );
}

interface Props extends PageProps<HomeContent> {
  models: SingleModelDirectus[];
  benefits_section: {
    security_title: string;
    water_quality_title: string;
    isolation_title: string;
    main_title: string;
    security_paragraph:string;
    security_home_description:string;
water_quality_home_description:string;
isolation_home_description:string;
    security_image:string;
    water_quality_image:DirectusImage;
    water_quality_paragraph:string;
    isolation_image:string;
    isolation_paragraph:string;
  };
  dblogs:PartialItem<SingleBlogDirectus>[];
}






export default function HomePage({
  pageProps,
  globalSection,
  models,
  benefits_section,
  layoutProps,
  dblogs,
}: Props) {
  const { locale, asPath } = useRouter();


  
 
  const {
    main_title,
    coverseal_title,
    devis_title,

devis_link_text,
    about_image,
    about_title,
    partenaire_title,

partenair_link_text,
    realisations_title,
    realisations_description,
    realisations_image,
    realisations_link_text,
    about_description,
    about_link_text,
    coverseal_paragraph,
    coverseal_link_text,
    benefits_link_text,
    video_mobile_placeholder,
    coverseal_image,
    coverseal_image_2,
    gallery_link_text,    
    models_title,
    models_link_text,
    models_paragraph,
    models_image,
    configurator_link_text,
    benefits_image,
    scroll_down_link_text,
    video_link_text,
    readmore,
  } = pageProps;
  const YourComponent = () => (
    <Image
      id={coverseal_image}
      title="Coverseal image"
      containerClassName="first"
      // direction={AnimationDirection.BOTTOM_TO_TOP}
    />
  );
 
  const [language, country] = locale.split("-");
 // const { locale } = useRouter();
  const size = useWindowSize();

   // Add state for blogs, queryResponse, and questionTargeted
     // Replace 'BlogType' with the actual type of your blogs
   const [blogs, setBlogs] = useState<  undefined | SingleBlogDirectus[]>(undefined);
   const [queryResponse, setQueryResponse] = useState<  undefined | SingleBlogDirectus[]  >(undefined);
   //const [questionTargeted, setQuestionTargeted] = useState<YourQuestionType | null>(null);  // Replace 'YourQuestionType' with the actual type
 

   
   const questionTargeted = useMemo(() => {
    if (asPath.includes("#")) {
      const parts = asPath.split("#");
      if (parts[1]) {
        return parts[1];
      }
      return null;
    }
    return null;
  }, [asPath]);


  

  //  const questionsDom = useMemo(
  //   () =>
  //     (queryResponse || blogs || dblogs).map((question, i) => {
  //       const id = `question-${question.id}`;
  //       const { main_title, description } = question.translations[0];
  //       const category_id = question.category as number;
  //       return (
  //         <div key={i}>
  //           <Link
  //         href={generateBlogPath(
  //           category_id,
  //           main_title, question.id
  //         )}
  //         passHref
  //       >
  //         <a>
  //           <Image
  //             id={question.list_image}
  //             title="Blog image"
  //             quality="50"
              
  //             isBackgroundCss
  //           />
  //           <Label><h5 className="subtitle" style={{fontWeight:"500"}}>{main_title}</h5>
  //           <span className="subtext">{description}</span>
  //           <Date style={{fontSize:"12px",marginTop:"5px", display:"block"}} 
  //           dateString={question.date_created.toString()} language={language} />
  //           <a className="back-button next-button" href={"/" + locale + generateBlogPath(
  //           category_id,
  //           main_title, question.id
  //         )} style={{fontSize:"12px", marginTop:"10px"}}>{readmore}
  //         <ArrowCustom color={Color.TERRA_COTTA} />
  //         </a></Label>
  //           </a>
  //           </Link>
  //         </div>
          
          
  //       );
  //     }),
  //   [blogs, queryResponse, questionTargeted]
  // );
  useEffect(() => {
    appearingAnimations();
  }, []);


  // return (
  //   <main className="home-template">
  //     {/* ... existing sections and components */}
      
  //     {/* Include YourComponent within the JSX structure */}
  //     <YourComponent />

  //     {/* ... other sections and components */}
  //   </main>
  // );
  
  var filteredmodels = models.filter(x=>x.translations && x.translations.length>0);
  return (
      <main className="home-template">
       <section className="section first-section" data-color={Color.ANTHRACITE}> 
        {/*first image background*/}
        <div className="background-overlay" />
        {size.width > 580 ? (
          <video autoPlay muted loop id="myVideo">
            <source src="/showcase.webm" type="video/webm" />
            <source src="/showcase.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            isBackgroundCss
            id={video_mobile_placeholder.filename_disk}
            title="Placeholder mobile"
          />
        )
        }


      
       
        <div className="text-container">
          <h1 className="main-title">{main_title}</h1>
        </div>
        {/* <ScrollDown          text={scroll_down_link_text}          target="coverseal-section"          color={Color.WHITE}        /> */}
        {/* <a
          href="https://www.youtube.com/watch?v=MLJhLqqxUj0"
          target="_blank"
          className="video-icon-container"
        >
          <span>{video_link_text}</span>
          <VideoLink color={Color.WHITE} />
        </a> */}
      </section>

      <section className ="section spacing-section" data-color={Color.SAND} > </section>

<section className="section coversealnew-section" id="coverseal-section" data-color={Color.SAND}>
       
        <div className="content">
          <div className="text-container">
          <h2 className="subtitle-argesta subtitle-argesta--terra-cotta">
         {coverseal_title}
       </h2>
       <div className="mobile-image">
       <Image
            id={coverseal_image}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
       </div>
            <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: coverseal_paragraph }} />
            <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {coverseal_link_text}
              </a>
            </Link>
          </div>
<div className="desktop-image">
          <Image
            id={coverseal_image}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
          </div>
        </div>
        
      </section>

      <section className ="section spacing-section" data-color={Color.SAND}> </section>


        <section className="section benefits-section" data-color={Color.BEIGE}>
          
                <div className = "first-div">
                  {/* style={{ paddingLeft:"160px", paddingRight:"160px", width:"calc(100% - 320px)", margin:"auto"}}> */}
                  <div className="title-container">
                  <Link href="/benefits" passHref>
              <a>
                <h2 className="subtitle-argesta subtitle-argesta--terra-cotta link-underline">
                  {benefits_section.main_title}
                </h2>
              </a>
            </Link>
                  </div>
                
                  <Grid container spacing={4}>
                  <Grid item xs={12} lg={4}>

                  <Image
                        id={benefits_section.security_image}
                        title="Blog image"
                        quality="50"
                        
                        
                      />



                      <Label><h5 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"
                    }}>{benefits_section.security_title}</h5>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: benefits_section.security_home_description }}
                        />
                      </Label>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                    <Image
                        id={benefits_section.water_quality_image.id}
                        title="Blog image"
                        quality="50"
                        
                        
                      />
                      <Label><h5 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"}}>{benefits_section.water_quality_title}</h5>
                      <div
                          className="wysiwyg"
                          dangerouslySetInnerHTML={{ __html: benefits_section.water_quality_home_description }}
                        />
                      </Label>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                    <Image
                        id={benefits_section.isolation_image}
                        title="Blog image"
                        quality="50"
                        
                        
                      />
                      <Label><h5 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"}}>{benefits_section.isolation_title}</h5>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: benefits_section.isolation_home_description }}
                        />
                      </Label>
                    </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div style={{marginTop:"20px"}}>
                    <Link href="/benefits" passHref>
                          <a className="link-before-translate link-before-translate--terra-cotta">
                            {benefits_link_text}
                          </a>
            </Link></div>
                    </Grid>
                    </Grid>
             
          </div>
        </section>

        <section className ="section spacing-section" data-color={Color.BEIGE}> </section>

      {filteredmodels && filteredmodels.length>1 && <section
        className="section models-section"
        data-color={Color.ANTHRACITE}
      >
        
        <div className="content">
          <h2 className="subtitle-argesta subtitle-argesta--white">
            {models_title}
          </h2>
        </div>
        <div className="content" style={{marginTop:"50px"}}>
          
        {filteredmodels.map(({ translations, reference, id }, index) => (
          index%2==0?
          <Masonry columns={{sm:1, md:2}} spacing={{ sm: 1, md: 2 }}> 
            
          
          <div
            className={classNames({
              "item-container": true,
              [`model-${reference}`]: true,
            })}
          >
          <div className ="text-container" >
              <h4 className="subtitle-argesta subtitle-argesta--white" >                   
              {translations[0].home_title}
            </h4>
            <Link href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`} passHref>
                          <a className="link-before-translate link-before-translate--white subscribe-button">
                            {translations[0].home_link_text}
                          </a>
            </Link>
            </div></div>
          
          <Link
          key={id}
          href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`}
          passHref
        >
          <a
            className={classNames({
              "item-container model-image": true,
              [`model-${reference}`]: true,
            })}
          >
          <div className="icon-container">
              {reference === "automatic" && (
                <ModelAutomatic color={Color.WHITE} />
              )}
              {reference === "semi-automatic" && (
                <ModelSemiAutomatic color={Color.WHITE} />
              )}
              {reference === "manual" && (
                <ModelManual color={Color.WHITE} />
              )}
            </div>
            </a></Link>
        </Masonry>:
            <Masonry columns={{sm:1, md:2}} spacing={{ sm: 1, md: 2 }}>
              
            <Link
            key={id}
            href={`/models/${id}/${slugify(translations[0].main_title, {
              lower: true,
            })}`}
            passHref
          >
            <a
              className={classNames({
                "item-container model-image": true,
                [`model-${reference}`]: true,
              })}
            >
            <div className="icon-container">
                {reference === "automatic" && (
                  <ModelAutomatic color={Color.WHITE} />
                )}
                {reference === "semi-automatic" && (
                  <ModelSemiAutomatic color={Color.WHITE} />
                )}
                {reference === "manual" && (
                  <ModelManual color={Color.WHITE} />
                )}
              </div>
              </a></Link>
            
            <div
              className={classNames({
                "item-container": true,
                [`model-${reference}`]: true,
              })}
            >
            <div className ="text-container" style={{textAlign:"right"}}>
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {translations[0].home_title}
              </h4>

               <Link href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`} passHref>
                          <a className="link-before-translate link-before-translate--white">
                            {translations[0].home_link_text}
                          </a>
            </Link>
              </div></div>            
          </Masonry>
          ))}
        </div>
        
      </section>}

      <section className ="section spacing-section" data-color={Color.SAND} > </section>


      {filteredmodels && filteredmodels.length>0 && 
      <section className="section coversealnew-section" data-color={Color.SAND}>
      <div className="content">
       
        <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"right", width:"100%"}}>
              {models_link_text}
            </h2>
            <div className="mobile-image">
            <Image
          id={models_image.id}
          title="coverseal image"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        />
            </div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: coverseal_paragraph }} />
          <Link href={`/models/${filteredmodels[0].id}/${slugify(filteredmodels[0].translations[0].main_title, {
            lower: true,
          })}`} passHref>
            <a className="link-before-translate link-before-translate--terra-cotta">
              {coverseal_link_text}
            </a>
          </Link>
        </div>
        <div className="desktop-image">
        <Image
          id={models_image.id}
          title="coverseal image"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        /></div>
      </div>
      
    </section>}

    <section className ="section spacing-section" data-color={Color.SAND} > </section>


      <section className="section six-section" data-color={Color.SAND}>
            <div className="content" style={{position:"relative"}}>
            {/* <div className="overlay"></div> */}
            <div className="overlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(50, 50, 50, 0.7)" }}></div>
        <Image
          id={realisations_image.id}
          title="coverseal image"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        />
              <div className="text-container">
              {/* <div className="tx-container"> */}
                <h1 className="subtitle-argesta subtitle-argesta--white">
                  {realisations_title}
                </h1>
                <h6 style={{ color: 'white' }}>
                  {realisations_description}
                </h6>
                <h6 >
                <Link href="/the-coverseal" passHref >
                          <a className="link-before-translate link-before-translate--white">
                            {realisations_link_text}
                          </a>
                </Link>
                </h6>
              </div>       
              </div>     
        </section>

      <section className ="section spacing-section" data-color={Color.BEIGE} > </section>

        {filteredmodels && filteredmodels.length>0 && 
      <section className="section about-section" data-color={Color.BEIGE}>
      <div className="content">
       <div className="desktop-image">
      <Image
          id={about_image.id}
          title="about image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
        <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"left", width:"100%"}}>
              {about_title}
            </h2>
            <div className="mobile-image">
      <Image
          id={about_image.id}
          title="about image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: about_description }} />
          <Link href={`/about-us`} passHref>
            <a className="link-before-translate link-before-translate--terra-cotta" style={{textAlign:"left", marginTop:"30px"}}>
              {about_link_text}
            </a>
          </Link>
        </div>
        
      </div>
      
    </section>}
    <section className ="section spacing-section" data-color={Color.BEIGE} > </section>


    <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content">
         {/* style={{margin:"auto", width:"90%"}}> */}
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {devis_title}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {devis_link_text}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="item-container">&nbsp;</div>
            <div className="item-container">
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {partenaire_title}
              </h4>
              <Link href={`/partnerships`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {partenair_link_text}
                            </a>
              </Link>
              </div>
              </div>
          </Masonry>
        </div>
    </section>
        
      


      
      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}



export const getStaticProps: GetStaticProps<PageProps<HomeContent>> = async ({
  locale,
  locales
}) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);
  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const homeProps = await getPageContentProps<HomeContent>(
    fetcher,
    "home_template",
    locale
  );

  const benefitsProps = await getPageContentProps<BenefitsContent>(
    fetcher,
    "benefits_template",
    locale
  );

  const {
    pageProps: {
      security_title,
      security_paragraph,
      water_quality_home_description,
      security_home_description,
      isolation_home_description,
      security_image,
      water_quality_title,
      water_quality_image,
      water_quality_paragraph,
      isolation_title,
      isolation_image,
      isolation_paragraph,
      main_title,
    },
  } = benefitsProps;

  const models = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readMany({
      fields: ["id", "translations.*", "reference"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          "published":{
            _eq:true
          }
          },
        } as any,
      },
    })
    .then((res) => res.data);

  return {
    props: {
      ...allPageProps,
      ...homeProps,
      benefits_section: {
        security_title,
        security_image,
        security_paragraph,
        security_home_description,
water_quality_home_description,
isolation_home_description,
        water_quality_title,
        water_quality_image,
        water_quality_paragraph,
        isolation_title,
        isolation_image,
        isolation_paragraph,
        main_title,
      },
      models: models.slice(0, 3),
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
