import { GetStaticProps } from "next";
import React,   { useEffect, useState  } from "react";
import classNames from "classnames";
import Link from "next/link";
import slugify from "slugify";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import dynamic from "next/dynamic";

import { AnimationDirection, CMS_PUBLIC_URL, Color } from "../utils/constants";
//import gsap from "gsap";
import {
  translateInFromRightToLeft,
} from "../animations/appearing/shared";
import { useRouter } from "next/router";
import { getLocale } from "../utils/locale";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { PartialItem } from "@directus/sdk";
const CatalogueRequestHomeSection = dynamic(() => import('../components/CatalogueRequestHomeSection'));
const Image = dynamic(() => import('../components/Image'));
const Masonry = dynamic(() => import('@mui/lab/Masonry'));
import NextImage from 'next/image';
import { Grid } from "@material-ui/core";
import Head from "next/head";


const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(0.5),
  textAlign: 'left',
  height:'160px',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow:"unset",
}));

function appearingAnimations() {
  translateInFromRightToLeft(".main-title");

  //translateInFromLeftToRight(".coverseal-section h2");
 // translateInFromRightToLeft(".coverseal-section .text-container");

  /*gsap.fromTo(
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
  );*/
  //translateInFromLeftToRight(".benefits-section .text-container");

  //translateInFromLeftToRight(".models-section h2");

  /*gsap.fromTo(
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
  );*/
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
  benefits_section
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
    video_placeholder,
    coverseal_image,
    models_title,
    models_link_text,
    models_paragraph,
    models_image,
    configurator_link_text,
    video_desktop,
    video_mobile,
    video_tablet,
    video_tablet_placeholder,
    show_video
  } = pageProps;
  const YourComponent = () => (
    <Image
      id={coverseal_image}
      title="Coverseal image"
      containerClassName="first"
      // direction={AnimationDirection.BOTTOM_TO_TOP}
    />
  );
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [imgSrc, setImgSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const getImageSrc = () => {
    if (windowSize.width < 768) {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${video_mobile_placeholder.filename_disk}?quality=40&format=webp`);
    } else if (windowSize.width < 1024) {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${video_tablet_placeholder.filename_disk}?quality=40&format=webp`);
    } else {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${video_placeholder.filename_disk}?quality=40&format=webp`);
    }
  };
  const getVideoSrc = () => {
    if (windowSize.width < 768) {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${video_mobile.filename_disk}`);
    } else if (windowSize.width < 1024) {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${video_tablet.filename_disk}`);
    } else {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${video_desktop.filename_disk}`);
    }
  };
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });      
      getImageSrc();
      getVideoSrc();
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [imgSrc, videoSrc, windowSize]); // Empty array ensures that effect is only run on mount and unmount

  
  var [language, country] = locale.split("-");
  if(!country)
    {
      country = "FR";
    }

   //const [blogs, setBlogs] = useState<  undefined | SingleBlogDirectus[]>(undefined);
   //const [queryResponse, setQueryResponse] = useState<  undefined | SingleBlogDirectus[]  >(undefined);
   /*const questionTargeted = useMemo(() => {
    if (asPath.includes("#")) {
      const parts = asPath.split("#");
      if (parts[1]) {
        return parts[1];
      }
      return null;
    }
    return null;
  }, [asPath]);*/
  useEffect(() => {
    appearingAnimations();
  }, []);
  var filteredmodels = models.filter(x=>x.translations && x.translations.length>0);
  return (
    <>
    <Head>
    <link rel="preconnect" href={CMS_PUBLIC_URL} />
      <style>
        {`
          body::before {
            content: url('${CMS_PUBLIC_URL}/assets/${video_mobile_placeholder.filename_disk}?quality=40&format=webp');
            display: none;
          }
        `}
      </style>
    </Head>
      <main className="home-template">
       <section className="section first-section" data-color={Color.ANTHRACITE}> 
       
        <div className="background-overlay" />
        
        {show_video == true ? (
          <video autoPlay muted loop id="myVideo" src={videoSrc}>
            
          </video>
        ) : (
          <NextImage
            
            src={imgSrc}
            title="Placeholder mobile" priority layout="fill"
          />
        )}


      
       
        <div className="text-container">
          <h1 className="main-title">{main_title}</h1>
        </div>
       
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
                  <Link href="/the-coverseal" passHref>
              <a>
                <h2 className="subtitle-argesta subtitle-argesta--terra-cotta link-underline benefitstitle">
                  {benefits_section.main_title}
                </h2>
              </a>
            </Link>
                  </div>
                
                  <Grid container spacing={0} className="benefits-container">
                  <Grid item className="benefits-item">

                  <Image
                        id={benefits_section.security_image}
                        title="Blog image"
                        
                        
                      />



                      <Label><h3 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"
                    }}>{benefits_section.security_title}</h3>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: benefits_section.security_home_description }}
                        />
                      </Label>
                      <div className="benefitslinkmobile">
                    <Link href="/the-coverseal" passHref>
                          <a className="link-before-translate link-before-translate--terra-cotta">
                            {benefits_link_text}
                          </a>
            </Link></div>
                    </Grid>
                    <Grid item  className="benefits-item">
                    <Image
                        id={benefits_section.water_quality_image.id}
                        title="Blog image"
                        
                        
                      />
                      <Label><h3 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"}}>{benefits_section.water_quality_title}</h3>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: benefits_section.water_quality_home_description }}
                        />
                      </Label>
                      <div className="benefitslinkmobile">
                    <Link href="/the-coverseal" passHref>
                          <a className="link-before-translate link-before-translate--terra-cotta">
                            {benefits_link_text}
                          </a>
            </Link></div>
                    </Grid>
                    <Grid item  className="benefits-item">
                    <Image
                        id={benefits_section.isolation_image}
                        title="Blog image"
                        
                        
                      />
                      <Label><h3 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"}}>{benefits_section.isolation_title}</h3>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: benefits_section.isolation_home_description }}
                        />
                      </Label>
                      <div className="benefitslinkmobile">
                    <Link href="/the-coverseal" passHref>
                          <a className="link-before-translate link-before-translate--terra-cotta">
                            {benefits_link_text}
                          </a>
            </Link></div>
                    </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <div className="benefitslink">
                    <Link href="/the-coverseal" passHref>
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
        <div className="content">
          
        {filteredmodels.map(({ translations, reference, id }, index) => (
          index%2==0?
          <Grid container className="models-container">
            <Grid item className="models-text">
            <div
            className={classNames({
              "item-container": true,
              "model-text":true,
              [`model-${reference}`]: true,
            })}
          >
          <div className ="text-container" >
              <h3 className="subtitle-argesta subtitle-argesta--white" >                   
              {translations[0].home_title}
            </h3><br/>
            <div>
            <Link href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`} passHref>
                          <a className="link-before-translate link-before-translate--white subscribe-button">
                            {translations[0].home_link_text}
                          </a>
            </Link></div>
            </div></div>
            </Grid>
            <Grid item className="models-image">
            <Link
          key={id}
          href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`}
          passHref
        >
          <a
            className={classNames({
              "item-container models-image": true,
              [`model-${reference}`]: true,
            })}
          >
          <div className="icon-container">
              <img src={`/${reference}.png`} alt={reference} className="image" loading="lazy"  style={{ color: Color.WHITE }} />
              
            </div>
            </a></Link>
            </Grid>
          </Grid>
          :
          <Grid container className="models-container">
            <Grid item className="models-image">
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
            <div className="icon-container" style={{textAlign:"right"}}>
            <img src={`/${reference}.png`} alt={reference} className="image" loading="lazy" style={{ color: Color.WHITE }} />
                
              </div>
              </a></Link>
            </Grid>
            <Grid item className="models-text">
            <div
              className={classNames({
                "item-container": true,                
                "model-text":true,
                [`model-${reference}`]: true,
              })}
            >
            <div className ="text-container" style={{textAlign:"right"}}>
                <h3 className="subtitle-argesta subtitle-argesta--white" >                   
                {translations[0].home_title}
              </h3><br/>
              <div>
               <Link href={`/models/${id}/${slugify(translations[0].main_title, {
            lower: true,
          })}`} passHref>
                          <a className="link-before-translate link-before-translate--white">
                            {translations[0].home_link_text}
                          </a>
            </Link></div>
              </div></div>    
            </Grid>
          </Grid>
            
          ))}
        </div>
        
      </section>}

      <section className ="section spacing-section" data-color={Color.SAND} > </section>


      {filteredmodels && filteredmodels.length>0 && 
      <section className="section coversealnew-section-2" data-color={Color.SAND}>
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
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: models_paragraph }} />
          <Link href={`/before-configurator`} passHref>
            <a className="link-before-translate link-before-translate--terra-cotta">
              {configurator_link_text}
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
        isBackgroundCss
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
                <Link href="/achievements" passHref >
                          <a className="link-before-translate link-before-translate--white">
                            {realisations_link_text}
                          </a>
                </Link>
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
        <div className="text-container about-title">
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
            <a className="link-before-translate link-before-translate--terra-cotta" style={{textAlign:"left"}}>
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
              className="item-container textleft-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {devis_title}
              </h4><br/>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {devis_link_text}
                            </a>
              </Link>
              </div></div>
            
            <div className="emptydiv"></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="emptydiv">&nbsp;</div>
            <div className="item-container textright-container">
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {partenaire_title}
              </h4><br/>
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
        locale={locale} newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
      />
    </main>
    </>
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
