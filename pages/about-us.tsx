import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CircleLink } from "../components/CircleLink";
import { LineLink } from "../components/LineLink";
import { VideoLink, YoutubePlayButton } from "../components/icons";
import dynamic from "next/dynamic";
const Image = dynamic(() => import('../components/Image'));
import { AnimationDirection, Color, CMS_PUBLIC_URL } from "../utils/constants";
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
const CatalogueRequestHomeSection = dynamic(() => import('../components/CatalogueRequestHomeSection'));
import Link from "next/link";
import { useRouter } from "next/router";
import Masonry from "@mui/lab/Masonry";
import { Grid, useTheme } from "@material-ui/core";
import Box from "../components/Box";
import VerticalBoxGroup from "../components/VerticalBoxGroup";
import { useWindowSize } from "../components/useWindowSize";
import { getLocale } from "../utils/locale";
import NextImage from 'next/image';
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
    network_partners,
    partnership_link_text,
    the_coverseal_link_text,
    achievements_link_text,
    history_image,
    history_image_2,
    company_image,
    company_image_2,
    company_image_3,
    company_image_4,
    company_image_5,
    video_mobile_image,
    banner_image_mobile,
    banner_image_desktop,
    banner_image_tablet,
  banner_video_desktop,
  banner_video_mobile,
  banner_video_tablet,
  banner_title,
  show_video
  } = pageProps;
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  const [imgSrc, setImgSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  
  const getImageSrc = () => {
    if (windowSize.width < 768) {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${banner_image_mobile.filename_disk}?quality=40&format=webp`);
    } else if (windowSize.width < 1024) {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${banner_image_tablet.filename_disk}?quality=40&format=webp`);
    } else {
      setImgSrc(`${CMS_PUBLIC_URL}/assets/${banner_image_desktop.filename_disk}?quality=40&format=webp`);
    }
    
  };
  const getVideoSrc = () => {
    if (windowSize.width < 768) {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${banner_video_mobile.filename_disk}`);
    } else if (windowSize.width < 1024) {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${banner_video_tablet.filename_disk}`);
    } else {
      setVideoSrc(`${CMS_PUBLIC_URL}/assets/${banner_video_desktop.filename_disk}`);
    }
  };
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
  useEffect(() => {
    
    // Function to update the window width state
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      getImageSrc();
      getVideoSrc();
    };

    // Call handler once to get the initial window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imgSrc, videoSrc, windowSize]);
  return (
    <>
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
         <h1 className="main-title">{banner_title}</h1>
       </div>
      
     </section>
    </main>
    <main className="about-us-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{main_title.replace(/ \?/gi,"?")}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
        </div>
      </section>
      <section className="section image-box-two-section" data-color={Color.BEIGE} >
        <div className="container">
          <table className="desktopboxes">
            <tr>
              <td style={{verticalAlign:"top"}}>
              <div className="boxpair">
              <div className="insidebox" style={{ backgroundColor:"var(--color-terra-cotta)",color:"#FFFFFF", flexDirection:"column"}}>
                <div className="boxnumber">{installation_effectue_number && installation_effectue_number.split('.').length>1 && installation_effectue_number.split('.')[0]}<small>.{installation_effectue_number && installation_effectue_number.split('.').length>1 && installation_effectue_number.split('.')[1]}</small><div className="boxtitle">{installation_effectue_title}</div></div>
                <div className="spacebelow"></div>
              </div>
              </div>
              </td>
              <td style={{verticalAlign:"bottom"}}>
              <div className="boximpair">
            <div className="insidebox" style={{backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column"}}>
                <div className="boxnumber">{countries_number}<div className="boxtitle">{countries_title}</div></div>
                <div className="spacebelow"></div>
              </div></div>
              </td>
              <td style={{verticalAlign:"top"}}>
              <div className="boxpair">
            <div className="insidebox" style={{backgroundColor:"white",color:"var(--color-terra-cotta)", flexDirection:"column"}}>
                <div className="boxnumber adaptedboxnumber">{years_number}<div className="boxtitle">{years_title}</div></div>
                <div className="belowyearsnumber"></div>
              </div></div>
              </td>
              <td style={{verticalAlign:"bottom"}}>
              <div className="boximpair">
            <div className="insidebox" style={{backgroundColor:"var(--color-terra-cotta)",color:"var(--color-sand)", flexDirection:"column"}}>
                <div><img src="/made_in_belgium.png" className="madeinbelgium"/><div className="boxtitle adaptedboxtitle">{quality_title}</div></div>
                
              </div></div>
              </td>
              <td style={{verticalAlign:"top"}}>
              <div className="boxpair lastbox">
            <div className="insidebox" style={{backgroundColor:"var(--color-sand)",color:"var(--color-anthracite)", flexDirection:"column"}}>
            <div className="morethen">{more_then}</div><div className="boxnumber">{collaborator_number}<div className="boxtitle">{collaborator_title}</div></div>
                <div className="spacebelow"></div>
              </div>
              </div>
              </td>
            </tr>
          </table>
          <table className="mobileboxes">
            <tr>
              <td style={{padding:"10px", verticalAlign:"top"}}>
              <div className="insidebox" style={{ backgroundColor:"var(--color-terra-cotta)",color:"#FFFFFF", flexDirection:"column"}}>
                <div className="boxnumber">{installation_effectue_number && installation_effectue_number.split('.').length>1 && installation_effectue_number.split('.')[0]}<small>.{installation_effectue_number && installation_effectue_number.split('.').length>1 && installation_effectue_number.split('.')[1]}</small><div className="boxtitle" style={{marginTop:"-30px"}}>{installation_effectue_title}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </td>
              <td  style={{padding:"10px", verticalAlign:"top"}}>
            <div className="insidebox" style={{backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column"}}>
            <div style={{marginTop:"44px"}}><img src="/made_in_belgium.png"  className="madeinbelgium"/><div className="boxtitle adaptedboxtitle">{quality_title}</div></div>
                
                <div style={{height:"40px"}}></div>
              </div>
              </td>
              </tr><tr>
              <td  style={{padding:"10px", verticalAlign:"top"}}>
            <div className="insidebox" style={{backgroundColor:"white",color:"var(--color-terra-cotta)", flexDirection:"column"}}>
                <div className="boxnumber adaptedboxnumber">{years_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{years_title}</div></div>
                <div className="belowyearsnumber" style={{height:"40px"}}></div>
              </div>
              </td>
              <td  style={{padding:"10px", verticalAlign:"top"}}>
            <div className="insidebox" style={{backgroundColor:"var(--color-terra-cotta)",color:"var(--color-sand)", flexDirection:"column"}}>
            <div className="boxnumber adaptedboxnumber">{countries_number}<div className="boxtitle" style={{marginTop:"-30px"}}>{countries_title}</div></div>
            <div className="belowyearsnumber" style={{height:"40px"}}></div>
              </div>
              </td>
            </tr>
          </table>
        </div>
    
      </section>

      
      <section className="section video-section" data-color="beige" >
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
      <section className="section first-section-about" data-color={Color.ANTHRACITE}> 
        {/*first image background*/}
        <div className="background-overlay" />
        {size.width > 768 ? (
          <video autoPlay muted loop id="myVideo">
            <source src="/showcase.webm" type="video/webm" />
            <source src="/showcase.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            isBackgroundCss
            id={video_mobile_image.filename_disk}
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

      <section  className="section image-box-two" data-color={Color.SAND}>
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{history_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: history_paragraph }}
          />
        </div>
      </section>
{/* section une entreprise */}
      <section className="section text-image-section" data-color="white" style={{backgroundColor:"white"}}>
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
                /> 
                <Grid container spacing={5} style={{marginTop:"10px"}}>
                        <Grid item xs={4} lg={4}>
                          <Image id={company_image_2} title="image" />
                          </Grid>
                          <Grid item xs={4} lg={4}>
                          <Image id={company_image_3} title="image" />
                          </Grid>
                          <Grid item xs={4} lg={4}>
                          <Image id={company_image_5.id} title="image" />
                          </Grid>
                  </Grid>
          </div>
          </div>
          </div>
          </section>


{/* section text and link  */}
<section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" >
      
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {jobs_title}
              </h4><br/>
              <Link href={`/jobs`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                            {jobs_link_text}
                            </a>
              </Link>
              </div></div>
               
        </div>
    </section>

    {/*text image  */}
    <section className="section partners" data-color={Color.BEIGE} >
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta" >{network_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: network_paragraph }}
          />  
          <Image id={company_image_4.id} title="image" />
          {/*<Grid container spacing={2}>
                    {network_partners && network_partners.length>0 ? <>{network_partners.map(gal=>{
                      return (
                        <Grid item xs={6} lg={2}>
                          <Image id={gal.directus_files_id} title="image" />
                          </Grid>
                      );
                    })}</>:<></>}
                  </Grid>*/}   
          </div>
          
          </section>

          {/*  */}

          <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" >
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {home.devis_title}
              </h4><br/>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {home.devis_link_text}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}} className="seconddevis">
              
         <div className="emptydiv">&nbsp;</div>
            <div className="item-container rightcontainer">
            <div className ="text-container" style={{textAlign:"right"}} >
                <h4 className="subtitle-argesta subtitle-argesta--white"  >                   
                {home.partenaire_title}
              </h4><br/>
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
    </>
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
