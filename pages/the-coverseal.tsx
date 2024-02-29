import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { PriceRequestSection } from "../components/PriceRequestSection";
import { Image } from "../components/Image";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { LineLink } from "../components/LineLink";
import { CircleCenterLink } from "../components/CircleCenterLink";
import { Color, AnimationDirection } from "../utils/constants";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";

import { useRouter } from "next/router";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";
import Masonry from "@mui/lab/Masonry";
import { Label } from "@material-ui/icons";
function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
  translateInFromLeftToRight(".block-certificate .text-container");
  translateInFromLeftToRight(".block-comfort .content .text-container");
  translateInFromRightToLeft(".block-discretion .text-container");
}

export default function TheCoversealPage({
  pageProps,
  globalSection,
  layoutProps,
}: PageProps<TheCoversealContent>) {
  const {
    realisations_image,
    realisations_title,
    realisations_description,
    realisations_link_text,
    water_quality_title,
water_quality_paragraph,
security_title,
security_paragraph,
economy_title,
economy_paragraph,
water_quality_button_text,
security_button_text,
economy_button_text,
discretion_button_text,
certificate_button_text,
comfort_button_text,
    certificate_image_2,
    security_image,
    security_image_2,
    economy_image,
    economy_image_2,
    water_quality_image,
    water_quality_image_2,
    models_title,
    main_title,
    main_paragraph,
    certificate_title,
    certificate_paragraph,
    comfort_title,
    comfort_paragraph,
    comfort_image,
    comfort_image_2,
    discretion_title,
    discretion_paragraph,
    models_link_text,
    certificate_image,
    discretion_image,
    discretion_image_2,
    discretion_image_3,
    gallery_link_text,
    why_coverseal_title,
    benefits_link_text,
    faq_link_text,
  } = pageProps;
  const { modelsPath, faqPath } = layoutProps.topBarProps.mainMenuProps;

  useEffect(() => {
    appearingAnimations();
  }, []);
  const { locale } = useRouter();
  return (
    <main className="the-coverseal-template">
      <section className="section first-section" data-color="beige">
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />

  <div className="image-row">
        <div className="image-container">
             <Image
                id={economy_image.id}
                title={economy_title}
                direction={AnimationDirection.LEFT_TO_RIGHT}
              />
              <div  className="item-container">
                <div className ="image-text" >
                    <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                    {economy_title}
                  </h4>
                  <Link href="#discretion">
                                <a className="link-before-translate link-before-translate--white" 
                                style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                                {economy_button_text}
                                </a>
                  </Link>
                </div>
               </div> 
              {/* <div className="image-text">{economy_title}
              <a href="#economie" className="btn">en savoir plus</a>
              </div> */}
          </div>      
        <div className="image-container">
        <Image
                id={security_image.id}
                title={security_title}
                direction={AnimationDirection.LEFT_TO_RIGHT}
              />
              <div  className="item-container">
              <div className ="image-text" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                  {security_title}
                </h4>
                <Link href="#discretion">
                              <a className="link-before-translate link-before-translate--white" 
                              style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                              {security_button_text}
                              </a>
                </Link>
              </div>
            </div> 
              {/* <div className="image-text">{security_title}
              <a href="#securite" className="btn">en savoir plus</a>
              </div> */}
        </div>
        <div className="image-container">
        <Image
                id={water_quality_image.id}
                title={water_quality_title}
                direction={AnimationDirection.LEFT_TO_RIGHT}
              />
              <div  className="item-container">
              <div className ="image-text" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                  {water_quality_title}
                </h4>
                <Link href="#discretion">
                              <a className="link-before-translate link-before-translate--white" 
                              style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                              {water_quality_button_text}
                              </a>
                </Link>
              </div>
            </div> 
              {/* <div className="image-text">{water_quality_title}
              <a href="#qualite" className="btn">en savoir plus</a></div> */}

        </div>
  </div>

    <div className="image-row">
      <div className="image-container">
      <Image
              id={discretion_image}
              title={discretion_title}
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
            <div  className="item-container">
              <div className ="image-text" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                  {discretion_title}
                </h4>
                <Link href="#discretion">
                              <a className="link-before-translate link-before-translate--white" 
                              style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                              {discretion_button_text}
                              </a>
                </Link>
              </div>
            </div>            
      </div>
      <div className="image-container">
      <Image
              id={certificate_image.id}
              title={certificate_title}
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
             <div  className="item-container">
              <div className ="image-text" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                  {certificate_title}
                </h4>
                <Link href="#brevets">
                              <a className="link-before-translate link-before-translate--white" 
                              style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                              {certificate_button_text}
                              </a>
                </Link>
              </div>
            </div> 
            {/* <div className="image-text">Image 6 Text
            <a href="#brevets" className="btn">en savoir plus</a>
            </div> */}
      </div>
      <div className="image-container">
      <Image
              id={comfort_image.id}
              title={comfort_title}
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
             <div  className="item-container">
              <div className ="image-text" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" style={{fontSize:"1.5rem"}}>                   
                  {comfort_title}
                </h4>
                <Link href="#comfort">
                              <a className="link-before-translate link-before-translate--white" 
                              style={{fontFamily:"Poppins", padding:"0px 0px", letterSpacing: "1px", fontSize:"1rem"}}>
                              {comfort_button_text}
                              </a>
                </Link>
              </div>
            </div> 
            {/* <div className="image-text">{comfort_title}
            <a href="#comfort" className="btn">en savoir plus</a>
            </div> */}
      </div>
    </div>  
            
            
        
          

          <div className="block block-certificate" id="economie">
            <Image
              id={economy_image.id}
              title="economy"
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue" >
                {economy_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: economy_paragraph }}
              />
            </div>
          </div>
        </div>
        <div className="block block-comfort" id="securite">
          <div className="content">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {security_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: security_paragraph }}
              />
              {/* <Link passHref href={modelsPath}>
                <a className="link-before-translate link-before-translate--anthracite">
                  {models_link_text}
                </a>
              </Link> */}
            </div>
            <Image
              id={security_image.id}
              title="securite"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>
          {/* <Image
            id={comfort_image_2.filename_disk}
            title={comfort_image_2.title}
            containerClassName="image-on-top"
            direction={AnimationDirection.TOP_TO_BOTTOM}
          /> */}
        </div>

        <div className="block block-comfort" id ="qualite">
          <div className="content">
            <Image
              id={water_quality_image.id}
              title="quality image"
              containerClassName="image-first"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {water_quality_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: water_quality_paragraph }}
              />
            </div>
          </div>


          {/* <div className="section-container" id= "discretion">
            <div className="images-container">
              <div className="image-second">
                <Image
                  id={discretion_image_2}
                  title="Discretion image 2"
                  direction={AnimationDirection.TOP_TO_BOTTOM}
                />
              </div>
              <div className="circle-image-container">
                <Image
                  id={discretion_image_3}
                  title="Discretion image 3"
                  containerClassName="image-third"
                  direction={AnimationDirection.LEFT_TO_RIGHT}
                />
            
              </div>
            </div>
          </div> */}
        </div>
      </section>





      {/* to be added */}
      {/* <section className="section benefits-section" data-color={Color.BEIGE}>
          <div className="content">
                <div style={{ width:"80%", margin:"auto"}}>
               
                  </div>
              <Masonry columns={{xs:1, sm:1, md:3}} spacing={2} className="projects">
                  
              <div className="item-container" style={{marginTop:"20px"}}>
                      
                      <Image
                        id={comfort_image.filename_disk}
                        title="Blog image"
                        quality="50"
                        
                        isBackgroundCss
                      />
                      <Label><h5 className="subtitle-argesta subtitle-argesta--grey-blue" style={{fontWeight:"500"
                    }}>{security_image}</h5>
                      <div
                          className="wysiwyg parafourlines"
                          dangerouslySetInnerHTML={{ __html: comfort_image.title }}
                        />
                      </Label>
                      
                    </div>
                   
             </Masonry>
          </div>
         
        </section> */}

      {/* <section className="section section-why" data-color={Color.WHITE}>
        <LineLink
          href="/benefits"
          text={benefits_link_text}
          color={Color.TERRA_COTTA}
          isHtml
        />
        <div className="section-container">
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {why_coverseal_title}
          </h3>
        </div>
        <LineLink
          href={faqPath}
          text={faq_link_text}
          color={Color.TERRA_COTTA}
        />
      </section> */}
      {/* <section className="section section-why" data-color={Color.WHITE}>
        <div className="line-alone" />
        <div className="section-container why-coverseal-container">
          <h3 className="subtitle-argesta subtitle-argesta--terra-cotta">
            {why_coverseal_title}
          </h3>
          <Link href="/benefits" passHref>
            <a className="link-underline">{benefits_link_text}</a>
          </Link>
        </div>
        <LineLink
          href={faqPath}
          text={faq_link_text}
          color={Color.TERRA_COTTA}
        />
      </section> */}


{/* to be added */}
<section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div  className="item-container">
              <div className ="text-container" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                  {models_title}
                </h4>
                <Link href={`/price-request`} passHref>
                              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                                {models_title}
                              </a>
                </Link>
              </div>
            </div>
            
            <div></div>
          </Masonry>        
  
        </div>
    </section>







      <section className="section first-section" data-color="beige">
        {/* <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          /> */}




        <div className="block block-discretion"  id ="discretion">
          <div className="content">
            <Image
              id={discretion_image}
              title="Discretion image"
              containerClassName="image-first"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {discretion_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: discretion_paragraph }}
              />
            </div>
          </div>
          {/* <div className="section-container">
            <div className="images-container"> */}
              {/* <div className="image-second">
                <Image
                  id={discretion_image_2}
                  title="Discretion image 2"
                  direction={AnimationDirection.TOP_TO_BOTTOM}
                />
              </div> */}
              {/* <div className="circle-image-container">
                <Image
                  id={discretion_image_3}
                  title="Discretion image 3"
                  containerClassName="image-third"
                  direction={AnimationDirection.LEFT_TO_RIGHT}
                />
                <CircleCenterLink
                  href="/achievements"
                  text={gallery_link_text}
                />
              </div> */}
            {/* </div>
          </div> */}
        </div>


          <div className="block block-certificate"  id ="brevets">
           
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {certificate_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: certificate_paragraph }}
              />
            </div>
            <Image
              id={certificate_image_2.id}
              title={certificate_title}
              direction={AnimationDirection.LEFT_TO_RIGHT}
            />
          </div>
        {/* </div> */}

        <div className="block block-comfort"  id ="comfort">
          <div className="content">
          <Image
              id={comfort_image.id}
              title={comfort_title}
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {comfort_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: comfort_paragraph }}
              />
              {/* <Link passHref href={modelsPath}>
                <a className="link-before-translate link-before-translate--anthracite">
                  {models_link_text}
                </a>
              </Link> */}
            </div>
            
          </div>
         
        </div>

        
      </section>
      {/* to be added */}
{/* <section className="section six-section" data-color={Color.SAND}>
            <div className="content" style={{position:"relative"}}> 
        <Image
          id={comfort_image_2.id}
          title="coverseal image"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        />
              <div className="text-container">
             
                <h1 className="subtitle-argesta subtitle-argesta--white">
                  {discretion_image}
                </h1>
                <h6 style={{ color: 'white' }}>
                  {discretion_image}
                </h6>
                <h6 >
                <Link href="/the-coverseal" passHref >
                          <a className="link-before-translate link-before-translate--white">
                            {discretion_image}
                          </a>
                </Link>
                </h6>
              </div>       
              </div>     
        </section> */}

        <section className="section six-section" data-color={Color.SAND}>
            <div className="content" style={{position:"relative"}}>
              

                <Image
                  id={realisations_image}
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

      <PriceRequestSection
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
  <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}

// TODO: activate ISR on all pages
export const getStaticProps: GetStaticProps<
  PageProps<TheCoversealContent>
> = async ({ locale, locales }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<TheCoversealContent>(
    fetcher,
    "the_coverseal_template",
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
