import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CircleLink } from "../components/CircleLink";
import { LineLink } from "../components/LineLink";
import { VideoLink, YoutubePlayButton } from "../components/icons";
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
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";
import Link from "next/link";
import { useRouter } from "next/router";
import Masonry from "@mui/lab/Masonry";
import { Grid, useTheme } from "@material-ui/core";
import Box from "../components/Box";
import VerticalBoxGroup from "../components/VerticalBoxGroup";
import { useWindowSize } from "../components/useWindowSize";
import { getLocale } from "../utils/locale";

declare const YT: any;

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  translateInFromLeftToRight(".block-history .text-container");
  translateInFromRightToLeft(".block-company .text-container");
  translateInFromLeftToRight(".block-network .text-container");
}

interface AboutUsProps extends PageProps<AboutUsContent> {
  
  home:HomeContent;
}

export default function AboutUsPage({ globalSection, pageProps, home }: AboutUsProps) {
  const [isGenerated, setIsGenerated] = useState(false);
  const size = useWindowSize();
  const {
    installation_effectue_number,
    installation_effectue_title,
    countries_number,
    countries_title,
    years_number,
    years_title,
    quality_title,
    more_then,
    collaborator_title,
    collaborator_number,
    advantages_title,
    advantages_text,
    jobs_title,
    jobs_link_text,
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
    company_image_4,
  } = pageProps;

   const boxData = [
    { 
      text1: countries_number,
      text2: countries_title,
      fontSize: "3rem",
      color1: "red",
      color2: "blue",
      backgroundColor: "#FFC0CB"
    },
    { 
      text1: years_number,
      text2: years_title,
      fontSize: "1rem",
      color1: "green",
      color2: "orange",
      backgroundColor: "#98FB98"
    },
    { 
      text1: quality_title,
      text2: more_then,
      fontSize: "2rem",
      color1: "purple",
      color2: "yellow",
      backgroundColor: "#FFA07A"
    },
    { 
      text1: quality_title,
      text2: more_then,
      fontSize: "2rem",
      color1: "purple",
      color2: "yellow",
      backgroundColor: "#FFA07A"
    },
    { 
      text1: quality_title,
      text2: more_then,
      fontSize: "2rem",
      color1: "purple",
      color2: "yellow",
      backgroundColor: "#FFA07A"
    },
  ];

  const groupedBoxData = [];
for (let i = 0; i < boxData.length; i += 3) {
  groupedBoxData.push(boxData.slice(i, i + 3));
}

  type BoxProps = {
    text: string;
    color: string;
  };
  
  
  const { locale } = useRouter();

  const theme = useTheme();
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

    //const videoContainer = document.querySelector(".video-container");

    /*const onVideoClick = function () {
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
    };*/


   // videoContainer.addEventListener("click", onVideoClick);

    if (!isGenerated) {
      //generateMap();
      setIsGenerated(true);
    }
  }, [isGenerated]);


  return (
    <main className="about-us-template">
      <section className="section first-section" data-color="beige" style={{paddingTop:"150px"}}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{main_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          {/* <div className="video-container"> */}
            {/* <div className="video-poster" />
            <div className="button-container">
              <YoutubePlayButton color={Color.TERRA_COTTA} />
            </div>
            <div id="video" /> */}
          {/* </div> */}

          {/* <div className="block block-history">
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
          </div> */}

          {/* <div className="block block-text-image image-left">
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
          </div> */}

          {/* <div className="block block-double-image">
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
          </div> */}

          {/* <div className="block block-network">
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
          </div> */}
        </div>
        {/* <LineLink
          href="/partnerships"
          text={partnership_link_text}
          color={Color.WHITE}
        /> */}
      </section>
      {/* <section className="link-section" data-color={Color.WHITE}>
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
      </section> */}



      <section className="section image-box-two-section" data-color={Color.BEIGE} >
        <div className="container">
          <Grid container spacing={2}>
            <Grid item sm={6} lg={2}  xs={6} spacing={2} >
              <div className="boxpair">
              <div className="insidebox" style={{verticalAlign:"middle", textAlign:"center", padding:"30px 20px 30px 20px", backgroundColor:"var(--color-terra-cotta)",color:"#FFFFFF", flexDirection:"column", width:"100%"}}>
                <div className="boxnumber">{installation_effectue_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{installation_effectue_title}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </div>
            </Grid>
            <Grid item spacing={2} lg={2} sm={6}  xs={6}>
            <div className="boximpair">
            <div className="insidebox" style={{verticalAlign:"middle", textAlign:"center", padding:"30px 20px 30px 20px", backgroundColor:"var(--color-anthracite)",color:"#FFFFFF", flexDirection:"column", width:"100%"}}>
                <div className="boxnumber">{countries_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{countries_title}</div></div>
                <div style={{height:"40px"}}></div>
              </div></div>
            </Grid>
            <Grid item sm={6} lg={2} xs={6} spacing={2}>
            <div className="boxpair">
            <div className="insidebox" style={{verticalAlign:"middle", textAlign:"center", padding:"30px 20px 30px 20px", backgroundColor:"var(--color-white)",color:"var(--color-terra-cotta)", flexDirection:"column", width:"100%"}}>
                <div className="boxnumber adaptedboxnumber">{years_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{years_title}</div></div>
                <div className="belowyearsnumber" style={{height:"40px"}}></div>
              </div></div>
            </Grid>
            <Grid item sm={6} lg={2} xs={6} spacing={2}>
            <div className="boximpair">
            <div className="madeinbelgium" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"var(--color-terra-cotta)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div><img src="/made_in_belgium.png" style={{maxWidth:"90%", margin:"center"}}/><div className="boxtitle adaptedboxtitle" style={{marginTop:"-10px"}}>{quality_title}</div></div>
                
              </div></div>
            </Grid>
            <Grid item sm={6} lg={2} xs={6} spacing={2}>
            <div className="boxpair lastbox">
            <div className="insidebox" style={{verticalAlign:"middle", textAlign:"center", padding:"40px 20px 30px 20px", backgroundColor:"var(--color-sand)",color:"var(--color-anthracite)", flexDirection:"column", width:"100%"}}>
            <div style={{fontSize:"12px"}}>{more_then}</div><div className="boxnumber" style={{marginTop:"-30px"}}>{collaborator_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{collaborator_title}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </div>
            </Grid>
          </Grid>
        
        </div>
    
      </section>

      
      <section className="section video-section" data-color="beige" style={{paddingTop:"50px"}}>
        <div className="section-container-full">
        <div className="section-container">

          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{advantages_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: advantages_text }}
          />
          </div>
         {/*<div className="video-container">
         <div className="video-poster" />
         <div className="button-container">
           <YoutubePlayButton color={Color.TERRA_COTTA} />
         </div>
         <div id="video" />
    </div>*/}
          </div>
          </section>
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
            id={home.video_mobile_placeholder.filename_disk}
            title="Placeholder mobile"
          />
        )
        }


        
        <a
          href="https://www.youtube.com/watch?v=MLJhLqqxUj0"
          target="_blank"
          className="video-icon-container"
        >
          <span>{home.video_link_text}</span>
          <VideoLink color={Color.WHITE} />
        </a>
      </section>
      </main>

      <section  className="section image-box-two" data-color={Color.BEIGE} style={{paddingTop:"30px", paddingBottom:"30px"}}>
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{history_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: history_paragraph }}
          />
        </div>
      </section>
{/* section une entreprise */}
      <section className="section text-image-section" data-color="white">
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{company_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: company_paragraph }}
          />
          <div className="image-container">
            <div>
              {/*history_image,
    history_image_2,
    company_image,
    company_image_2,
    company_image_3,
    company_image_4,*/}
            <Image
                  id={company_image.id}
                  title="dressing image"
                  direction={AnimationDirection.BOTTOM_TO_TOP}
                  style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
                /> 
                <Grid container spacing={2} style={{marginTop:"10px"}}>
                        <Grid item xs={4} lg={4}>
                          <Image id={company_image_2} title="image" />
                          </Grid>
                          <Grid item xs={4} lg={4}>
                          <Image id={company_image_3} title="image" />
                          </Grid>
                          <Grid item xs={4} lg={4}>
                          <Image id={company_image_4.id} title="image" />
                          </Grid>
                  </Grid>
          </div>
          </div>
          </div>
          </section>
{/* 3images section/ white background*/}
<section className="section three-image" data-color="white">
  </section>

{/* section text and link  */}
<section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" >
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {jobs_title}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                            {jobs_link_text}
                            </a>
              </Link>
              </div></div>
            
           
          </Masonry>     
        </div>
    </section>

    {/*text image  */}
    <section className="section first-section" data-color={Color.BEIGE} style={{paddingTop:"50px"}}>
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{network_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: network_paragraph }}
          />         
          </div>
          </section>

          {/*  */}

          <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {home.devis_title}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {home.devis_link_text}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="emptydiv">&nbsp;</div>
            <div className="item-container rightcontainer">
            <div className ="text-container" style={{textAlign:"right"}} >
                <h4 className="subtitle-argesta subtitle-argesta--white"  >                   
                {home.partenaire_title}
              </h4>
              <Link href={`/partnerships`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {home.partenair_link_text}
                            </a>
              </Link>
              </div>
              </div>
          </Masonry>
        </div>
    </section>

    {/*  */}
      {/* <section className="section para-section-third" data-color={Color.WHITE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {advantages_title}
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html: advantages_text }} /> 
            </div>
      </section> */}
      {/* <section  className="section image-box-forth" data-color={Color.WHITE}>
      <div>
      
      </div>
    </section> */}
      {/* <section className="section para-section-fifth" data-color={Color.BEIGE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
               
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html:  }} /> 
            </div>
      </section> */}
      {/* <section className="section para-section-six" data-color={Color.WHITE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html }} /> 
            </div>
      </section> */}
    {/* <section  className="section image-box-seven" data-color={Color.WHITE}>
      <div>
       
      </div>
    </section> */}

  

      {/* <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                           
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>     
        </div>
    </section> */}


     

      <CatalogueRequestHomeSection 
          {...globalSection.priceRequest}
          formsMessages={globalSection.formsMessages}
          locale={locale} newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}/>
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<AboutUsContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);
  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const home= await fetcher.fetchCollection<HomeContent>("home_template", cmsLocale);
  const pageProps = await getPageContentProps<AboutUsContent>(
    fetcher,
    "about_us_template",
    locale
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
      home
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
