import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { CircleLink } from "../components/CircleLink";
import { LineLink } from "../components/LineLink";
import { YoutubePlayButton } from "../components/icons";
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
import { Grid } from "@material-ui/core";
import Box from "../components/Box";
import VerticalBoxGroup from "../components/VerticalBoxGroup";

declare const YT: any;

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  translateInFromLeftToRight(".block-history .text-container");
  translateInFromRightToLeft(".block-company .text-container");
  translateInFromLeftToRight(".block-network .text-container");
}



export default function AboutUsPage({ pageProps }: PageProps<AboutUsContent>) {
  const [isGenerated, setIsGenerated] = useState(false);

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
    company_image_4
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

    const videoContainer = document.querySelector(".video-container");

    const onVideoClick = function () {
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
    };




    videoContainer.addEventListener("click", onVideoClick);

    if (!isGenerated) {
      //generateMap();
      setIsGenerated(true);
    }
  }, [isGenerated]);


  return (
    <main className="about-us-template">
      <section className="section first-section" data-color="beige">
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


     
        <div className="container" style={{paddingRight:"5%",  paddingLeft:"5%"}}>
          <VerticalBoxGroup
            boxes={[
              <Box
                key={1}
                content={<p>Text 1</p>}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#FFFFFF"
                fontSize="110px"
                width="280px"
                height="170px"
                textPosition="bottom"
          
              />,
              <Box
                key={1}
                content={<p>Text 1</p>}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F7F7F7"
                fontSize="19px"
                width="280px"
                height="110px"
                textPosition="top"
               
              />, // Empty Box
              <Box key={2} />,
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              <Box key={2} height="80px"/>,
              <Box
                key={1}
                content={<p>{countries_number}</p>}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="110px"
                width="280px"
                height="170px"
                textPosition="bottom"
              />, // Empty Box
              <Box
                key={1}
                content={<p>{countries_title}</p>}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="19px"
                width="280px"
                height="110px"
                textPosition="top"
              />,
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              
              <Box
                key={1}
                content={<p>{years_number}</p>}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="110px"
                width="280px"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={<p>{years_title}</p>}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="19px"
                width="280px"
                height="110px"
                textPosition="top"
              />,
              <Box key={2} />, // Empty Box
             
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              <Box key={2} height="80px"/>, // Empty Box
              <Box
                key={1}
                content={<p>Text 1</p>}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F1E2D5"
                fontSize="3rem"
                width="280px"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={<p>{quality_title}</p>}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F1E2D5"
                fontSize="19px"
                width="280px"
                height="110px"
                textPosition="top"
              />,
              // <Box
              //   key={3}
              //   content={<img src="your-image-url.jpg" alt="Image" />}
              //   backgroundColor="#98FB98"
              //   textColor="green"
              //   fontSize="1rem"
              //   width="150px"
              //   height="100px"
              // />,
              
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              <Box
                key={1}
                content={<p>Text 1</p>}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="3rem"
                width="280px"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={<p>Text 1</p>}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="1rem"
                width="280px"
                height="110px"
                textPosition="bottom"
              />,
              <Box key={2} />, 
              // <Box
              //   key={3}
              //   content={<img src="your-image-url.jpg" alt="Image" />}
              //   backgroundColor="var(--color-beige)"
              //   textColor="#343337"
              //   fontSize="1rem"
              //   width="280px"
              //   height="110px"
              //   textPosition="top"
              // />,
              <Box key={2} />, // Empty Box
            ]}
          />
        </div>
    
      </section>

      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{advantages_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: advantages_text }}
          />
          <div className="video-container">
            <div className="video-poster" />
            <div className="button-container">
              <YoutubePlayButton color={Color.TERRA_COTTA} />
            </div>
            <div id="video" />
          </div>
          </div>
          </section>


      <section  className="section image-box-two" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{advantages_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: advantages_text }}
          />
        </div>
      </section>
{/* section une entreprise */}
      <section className="section first-section" data-color="white">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{advantages_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: advantages_text }}
          />
          <div className="image-container">
            <div>
            <Image
                  id= {history_image}
                  title="dressing image"
                  direction={AnimationDirection.BOTTOM_TO_TOP}
                  style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
                /> 
          </div>
          </div>
          </div>
          </section>
{/* 3images section/ white background*/}
<section className="section three-image" data-color="white">
  </section>

{/* section text and link  */}
<section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {company_paragraph}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                            {company_title}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>     
        </div>
    </section>

    {/*text image  */}
    <section className="section first-section" data-color="white">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta" >{advantages_title}</h1>
          <div
            className="main-paragraph wysiwyg" style={{color:"var(--color-anthracite)"}}
            dangerouslySetInnerHTML={{ __html: advantages_text }}
          />
          <div className="image-container">
            <div>
            <Image
                  id= {history_image}
                  title="dressing image"
                  direction={AnimationDirection.BOTTOM_TO_TOP}
                  style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
                /> 
          </div>
          </div>
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
                {/* {home.devis_title} */}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {/* {home.devis_link_text} */}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="item-container">&nbsp;</div>
            <div className="item-container">
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white"  >                   
                {/* {home.partenaire_title} */}
              </h4>
              <Link href={`/partnerships`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {/* {home.partenair_link_text} */}
                            </a>
              </Link>
              </div>
              </div>
          </Masonry>
        </div>
    </section>

    {/*  */}
      <section className="section para-section-third" data-color={Color.WHITE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {advantages_title}
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html: advantages_text }} /> 
            </div>
      </section>
      <section  className="section image-box-forth" data-color={Color.WHITE}>
      <div>
        {/* <Image
              id= {dressing_image}
              title="dressing image"
              direction={AnimationDirection.BOTTOM_TO_TOP}
              style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
            /> */}
      </div>
    </section>
      <section className="section para-section-fifth" data-color={Color.BEIGE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {/* {related_blogs_text} */}
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html: {/*options_paragraph*/} }} /> 
            </div>
      </section>
      <section className="section para-section-six" data-color={Color.WHITE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {/* {related_blogs_text} */}
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html: {/*options_paragraph*/} }} /> 
            </div>
      </section>
    <section  className="section image-box-seven" data-color={Color.WHITE}>
      <div>
        {/* <Image
              id= {dressing_image}
              title="dressing image"
              direction={AnimationDirection.BOTTOM_TO_TOP}
              style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
            /> */}
      </div>
    </section>

    <section className="section-model-content" data-color={Color.ANTHRACITE} style={{backgroundColor:"var(--color-anthracite)"}}>
      <Grid container spacing={3}
       style={{paddingRight:"5%", paddingLeft:"5%", height:"300px", overflow:"hidden", backgroundColor:"var(--color-ANTHRACITE)"}}>          
          <Grid item xs={6} lg={4}>
            {/* <Image
              id= {dressing_image}
              title="dressing image"
              direction={AnimationDirection.BOTTOM_TO_TOP}
              style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
            /> */}
          </Grid>
          <Grid item xs={6} lg={4}>
          {/* <Image
            id= {dressing_image}
            title="dressing image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
           style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
                    /> */}
          </Grid>
          <Grid item xs={6} lg={4}>
          {/* <Image
            id= {dressing_image}
            title="dressing image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
           style={{height: '100%', objectFit: 'cover', maxHeight:"300px"}}
                    /> */}
          </Grid>
        </Grid>
      </section>

      <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {/* {home.devis_title} */}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {/* {home.devis_link_text} */}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>     
        </div>
    </section>


      <section className="section tenth-section" data-color={Color.BEIGE}>
      <div className="section-container">
            <div className="title-container">
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {/* {related_blogs_text} */}
              </h3>              
            </div>
            <div className="paragraph wysiwyg" style={{color:'white'}} dangerouslySetInnerHTML={{ __html: {/*options_paragraph*/} }} /> 
            </div>
      </section>

      <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {/* {home.devis_title} */}
              </h4>
              <Link href={`/price-request`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {/* {home.devis_link_text} */}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="item-container">&nbsp;</div>
            <div className="item-container">
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white"  >                   
                {/* {home.partenaire_title} */}
              </h4>
              <Link href={`/partnerships`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {/* {home.partenair_link_text} */}
                            </a>
              </Link>
              </div>
              </div>
          </Masonry>
        </div>
    </section>
      {/* <CatalogueRequestHomeSection 
          {...globalSection.priceRequest}
          formsMessages={globalSection.formsMessages}
          locale={locale}/> */}
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<AboutUsContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<AboutUsContent>(
    fetcher,
    "about_us_template",
    locale
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
