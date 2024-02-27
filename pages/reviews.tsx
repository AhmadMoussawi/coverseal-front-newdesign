import { GetStaticProps } from "next";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Image } from "../components/Image";
import Avis  from "../components/Avis";
import { PriceRequestSection } from "../components/PriceRequestSection";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from 'react-stars'
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
  getGuestSuiteContent
} from "../utils/fetchers";
import { BlockList } from "../components/BlockList";
import { AnimationDirection, Color } from "../utils/constants";
import type { PartialItem } from "@directus/sdk";
import { CircleLink } from "../components/CircleLink";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(
    ".first-section .block-text-image .text-container"
  );

  translateInFromLeftToRight(".first-section .block-water-quality h2");
  translateInFromLeftToRight(".first-section .block-water-quality .wysiwyg");

  translateInFromLeftToRight(".first-section .block-isolation .left");
}
interface Props extends PageProps<ReviewsContent> {
  avis: [];
}
export default function ReviewsPage({
  pageProps,
  globalSection,
  layoutProps,
  avis
}: Props) {
  const {
    title,
    subtitle,
    description,
    Photo
  } = pageProps;
  const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  const modelsLink = layoutProps.topBarProps.mainMenuProps.modelsPath;
  var page = 0;
  useEffect(() => {
    appearingAnimations();
    
  }, []);
  
  return (
    <main className="benefits-template">
      <section className="section first-section" data-color={Color.SAND}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{title}</h1>

          <div id="security" className="block block-text-image">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--terra-cotta">
                {subtitle}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            <Image
              id={Photo.filename_disk}
              title="Reviews Image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>

        
          
          {/*<div className="circle-section-container">
            <div className="circle-link-container">
              <div className="line" />
              <CircleLink
                mainLink={{ href: modelsLink, text: models_link_text }}
                textAlign="bottom"
              />
            </div>
  </div>*/}
        </div>
        <div style={{clear:"both", height:"50px"}}></div>
        <div className="section-container">
        <Avis data={avis} locale={locale}/>
          {/*{avis.map(({user_name,global_rate,comment})=>{
            var rating = global_rate / 2;
            var name = user_name as string;
            return (
              <>
              <div style={{marginTop:"50px"}}>
           <div style={{width:"auto", float:"left"}}>  
            <div style={{backgroundColor:"white",color:"var(--color-terra-cotta)", width:"50px", height:"50px", borderRadius:"100%", lineHeight:"50px", textAlign:"center", textTransform:"uppercase", fontWeight:"bold", fontSize:"16px"}}>{name.substr(0,1)}</div>
            </div>
            <div style={{width:"80%", float:"left", marginLeft:"20px"}}>
              <div style={{color:"var(--color-terra-cotta)", textTransform:"capitalize", fontWeight:"bold", fontSize:"16px"}}>{name}</div>
              <ReactStars
        count={5}
        value={rating}
        edit={false}
        size={15}
        color1={'white'}
        color2={'white'} />
              <div>{comment}</div>
              <div style={{width:"100%", height:"1px", backgroundColor:"white", marginTop:"10px"}}></div>
            </div>
            </div>
            <div style={{clear:"both"}}></div>
            
            </>
            )
          })}*/}
          </div>
      </section>
      {/*<PriceRequestSection
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
  />*/}
    </main>
  );
}

export const getStaticProps: GetStaticProps<
  PageProps<ReviewsContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  var avis = await getGuestSuiteContent(locale);
  const pageProps = await getPageContentProps<ReviewsContent>(
    fetcher,
    "Reviews_Template",
    locale
  );
  
  return {
    props: {
      ...allPageProps,
      ...pageProps,
      avis
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
