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
import { Grid } from "@material-ui/core";
import { getLocale } from "../utils/locale";
function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
  translateInFromLeftToRight(".block-certificate .text-container");
  translateInFromLeftToRight(".block-comfort .content .text-container");
  translateInFromRightToLeft(".block-discretion .text-container");
}
interface TheCoversealProps extends PageProps<TheCoversealContent> {
  
  home:HomeContent;
  pricerequest:PriceRequestContent;
}
export default function TheCoversealPage({
  pageProps,
  globalSection,
  layoutProps,
  home,
  pricerequest
}: TheCoversealProps) {
  const {
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
  const { form_title, step_one_title, step_two_title, next_btn_title, mobile_step_one_title, mobile_step_two_title } = pricerequest;
  useEffect(() => {
    appearingAnimations();
  }, []);
  const { locale } = useRouter();
  return (
    <main className="the-coverseal-template">
      <section className="section first-section" data-color="BEIGE">
          <div className="section-container" style={{paddingBottom:"80px"}}>
            <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
            
            <div
              className="main-paragraph wysiwyg" 
              dangerouslySetInnerHTML={{ __html: main_paragraph }}
            />

  
              
              
          </div>
        </section>   

      <section className="test-section" data-color="BEIGE">
          <div className="image-gallery">
            <div className="image-container">
                    <Image
                        id={economy_image.id}
                        title={economy_title}
                        direction={AnimationDirection.LEFT_TO_RIGHT}
                      />
                      <div  className="item-container">
                        <div className ="image-text" >
                            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >                   
                            {economy_title}
                          </h4>
                          <Link href="#economy">
                                        <a className="link-before-translate link-before-translate--white" 
                                        style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                        {economy_button_text}
                                        </a>
                          </Link>
                        </div>
                      </div>              
              </div>  
            <div className="image-container">
            <Image
                    id={security_image.id}
                    title={security_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {security_title}
                    </h4>
                    <Link href="#securite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins",  letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                  {security_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
                
              </div>
            <div className="image-container">
            <Image
                    id={water_quality_image.id}
                    title={water_quality_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {water_quality_title}
                    </h4>
                    <Link href="#qualite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins", letterSpacing: "2px",  whiteSpace:"nowrap"}}>
                                  {water_quality_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
                  
              </div>
            <div className="image-container">
                <Image
                    id={discretion_image}
                    title={discretion_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                    <div className ="image-text" >
                        <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                        {discretion_title}
                      </h4>
                      <Link href="#economy">
                                    <a className="link-before-translate link-before-translate--white" 
                                    style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                    {discretion_button_text}
                                    </a>
                      </Link>
                    </div>
                  </div> 
               
              </div>      
            <div className="image-container">
            <Image
                    id={certificate_image.id}
                    title={security_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {certificate_title}
                    </h4>
                    <Link href="#securite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins",  letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                  {certificate_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
              
              </div>
            <div className="image-container">
            <Image
                    id={comfort_image.id}
                    title={comfort_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {comfort_title}
                    </h4>
                    <Link href="#qualite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins", 
                                  letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                  {comfort_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
                 
              </div>
            </div>
        </section>
      


{/* <section className="test-section-mobile" data-color="BEIGE">
  <div className="image-gallery">
    <div className="image-row">
      <div className="image-container">
        <Image id="{economy_image.id}" title="{economy_title}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{economy_title}</h4>
            <Link href="#economy">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>{economy_button_text}</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <Image id="{security_image.id}" title="{security_title}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{security_title}</h4>
            <Link href="#securite">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>{security_button_text}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="image-row">
      <div className="image-container">
        <Image id="{water_quality_image.id}" title="{water_quality_title}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{water_quality_title}</h4>
            <Link href="#qualite">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>{water_quality_button_text}</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <Image id="{certificate_image}" title="{certificate_title}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{certificate_title}</h4>
            <Link href="#economy">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>{certificate_button_text}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="image-row">
      <div className="image-container">
        <Image id="{certificate_image.id}" title="{certificate_title}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{certificate_title}</h4>
            <Link href="#securite">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", fontSize:"1rem", whiteSpace:"nowrap"}}>{discretion_button_text}</a>
            </Link>
            </div>
        </div>
      </div>
    </div>
    <div className="image-row">
      <div className="image-container">
        <Image id="{comfort_image.id}" title="{comfort_image}" direction={AnimationDirection.LEFT_TO_RIGHT} />
        <div className="item-container">
          <div className="image-text">
            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >{comfort_title}</h4>
            <Link href="#securite">
              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins", letterSpacing: "2px", fontSize:"1rem", whiteSpace:"nowrap"}}>{comfort_button_text}</a>
            </Link>
            </div>
        </div>
      </div>
    </div>
    </div>
    </section> */}

      <section className="test-section-mobile" data-color="BEIGE">
      <div className="image-gallery">
            <div className="image-container">
                    <Image
                        id={economy_image.id}
                        title={economy_title}
                        direction={AnimationDirection.LEFT_TO_RIGHT}
                      />
                      <div  className="item-container">
                        <div className ="image-text" >
                            <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}} >                   
                            {economy_title}
                          </h4>
                          <Link href="#economy">
                                        <a className="link-before-translate link-before-translate--white" 
                                        style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                        {economy_button_text}
                                        </a>
                          </Link>
                        </div>
                      </div>              
              </div>  
            <div className="image-container">
            <Image
                    id={security_image.id}
                    title={security_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {security_title}
                    </h4>
                    <Link href="#securite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins",  letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                  {security_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
              </div>
            <div className="image-container">
            <Image
                    id={water_quality_image.id}
                    title={water_quality_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {water_quality_title}
                    </h4>
                    <Link href="#qualite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins", letterSpacing: "2px",  whiteSpace:"nowrap"}}>
                                  {water_quality_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
              </div>
            <div className="image-container">
                <Image
                    id={discretion_image}
                    title={discretion_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                    <div className ="image-text" >
                        <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                        {discretion_title}
                      </h4>
                      <Link href="#economy">
                                    <a className="link-before-translate link-before-translate--white" 
                                    style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                    {discretion_button_text}
                                    </a>
                      </Link>
                    </div>
                  </div> 
              </div>      
            <div className="image-container">
            <Image
                    id={certificate_image.id}
                    title={security_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {certificate_title}
                    </h4>
                    <Link href="#securite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins",  letterSpacing: "2px", fontSize:"1rem", whiteSpace:"nowrap"}}>
                                  {certificate_button_text}
                                  </a>
                    </Link>
                  </div>
                </div> 
              </div>
            <div className="image-container">
            <Image
                    id={comfort_image.id}
                    title={comfort_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                  <div  className="item-container">
                  <div className ="image-text" >
                      <h4 className="subtitle-argesta subtitle-argesta--white" style={{textAlign:"left"}}>                   
                      {comfort_title}
                    </h4>
                    <Link href="#qualite">
                                  <a className="link-before-translate link-before-translate--white" 
                                  style={{fontFamily:"Poppins", 
                                  letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                  {comfort_button_text}
                                  </a>
                    </Link>
                  </div>
                </div>                   
              </div>
            </div>
        </section>        

    {/* <section className="test-section-mobile" data-color="BEIGE">
      <Grid container spacing={3} style={{paddingRight:"10%", paddingLeft:"10%"}}>
        <Grid item xs={6} lg={12}>
                  <Image
                    id={economy_image.id}
                    title={economy_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
                   <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                        {economy_title}
                      </h4>
                      <Link href="#economy">
                                    <a className="link-before-translate link-before-translate--white" 
                                    style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                    {economy_button_text}
                                    </a>
                      </Link>
        </Grid>
        <Grid item xs={6} lg={12}>
            <Image
                    id={security_image.id}
                    title={security_title}
                    direction={AnimationDirection.LEFT_TO_RIGHT}
                  />
           <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                        {economy_title}
                      </h4>
                      <Link href="#economy">
                                    <a className="link-before-translate link-before-translate--white" 
                                    style={{fontFamily:"Poppins", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                                    {economy_button_text}
                                    </a>
                      </Link>
        </Grid>
      </Grid>

       
    </section> */}
  
    
            
        {/* <div className="block block-comfort" id="securite">
          <div className="content">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {security_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: security_paragraph }}
              />
              { <Link passHref href={modelsPath}>
                <a className="link-before-translate link-before-translate--anthracite">
                  {models_link_text}
                </a>
              </Link> }
            </div>
            <Image
              id={security_image.id}
              title="securite"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>
          <Image
            id={comfort_image_2.filename_disk}
            title={comfort_image_2.title}
            containerClassName="image-on-top"
            direction={AnimationDirection.TOP_TO_BOTTOM}
          />
        </div> */}

        {/* <div className="block block-comfort" id ="qualite">
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


        </div> */}
     





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

<section className="section right-image-section" data-color={Color.BEIGE} id ="economy">
      <div className="content">
       <div className="desktop-image">
      <Image
          id={economy_image.id}
          title="economie image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
        <div className="text-container">
        <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"left", width:"100%"}}>
              {economy_title}
            </h2>
            <div className="mobile-image">
      <Image
          id={economy_image.id}
          title="economy image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: economy_paragraph }} />
          {/* <Link href={`/about-us`} passHref>
            <a className="link-before-translate link-before-translate--terra-cotta" style={{textAlign:"left", marginTop:"30px"}}>
              {discretion_title}
            </a>
          </Link> */}
        </div>
        
      </div>
      
    </section>

    <section className="section left-image-section" data-color={Color.BEIGE} id ="securite">
       
       <div className="content">
            <div className="text-container">
                  <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"right", width:"100%"}}>
                  {security_title}
                  </h2>
                <div className="mobile-image">
                  <Image
                      id={security_image.id}
                      title="security image"
                      direction={AnimationDirection.BOTTOM_TO_TOP}
                    />
                </div>
              <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: security_paragraph }} />
                {/* <Link href="/the-coverseal" passHref>
                  <a className="link-before-translate link-before-translate--anthracite">
                    {certificate_title}
                  </a>
                </Link> */}
          </div>
            <div className="desktop-image">
              <Image
                id={security_image.id}
                title="security image"
                direction={AnimationDirection.BOTTOM_TO_TOP}
              />
            </div>
        </div>
       
     </section>

     <section className="section right-image-section" data-color={Color.BEIGE} id ="qualite">
      <div className="content">
       <div className="desktop-image">
      <Image
          id={water_quality_image.id}
          title="qualite image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
        <div className="text-container">
        <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"left", width:"100%"}}>
              {water_quality_title}
            </h2>
            <div className="mobile-image">
      <Image
          id={comfort_image.id}
          title="water_quality image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: water_quality_paragraph }} />
       
        </div>
        
      </div>
      
    </section>



<section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%"}}>
      
      {/* <Masonry columns={{md:2, sm:1}}> */}
            <div  className="item-container">
              <div className ="text-container" >
                  <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                  {models_title}
                </h4>
                <Link href={`/price-request`} passHref>
                              <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                                {models_link_text}
                              </a>
                </Link>
              </div>
            </div>
            
            <div></div>
          {/* </Masonry>         */}
  
        </div>
    </section>



    <section className="section right-image-section" data-color={Color.BEIGE} id ="discretion" style={{ marginTop: '80px' }}>
      <div className="content">
       <div className="desktop-image">
      <Image
          id={discretion_image}
          title="discretion image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
        <div className="text-container">
        <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"left", width:"100%"}}>
              {discretion_title}
            </h2>
            <div className="mobile-image">
      <Image
          id={discretion_image}
          title="discretion image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: discretion_paragraph }} />
          {/* <Link href={`/about-us`} passHref>
            <a className="link-before-translate link-before-translate--terra-cotta" style={{textAlign:"left", marginTop:"30px"}}>
              {discretion_title}
            </a>
          </Link> */}
        </div>
        
      </div>
      
    </section>

    <section className="section left-image-section" data-color={Color.BEIGE} id ="brevet">
       
       <div className="content">
         <div className="text-container">
         <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"right", width:"100%"}}>
        {certificate_title}
      </h2>
      <div className="mobile-image">
      <Image
           id={certificate_image.id}
           title="certificate image"
           direction={AnimationDirection.BOTTOM_TO_TOP}
         />
      </div>
           <div className="paragraph wysiwyg"   dangerouslySetInnerHTML={{ __html: certificate_paragraph }} />
           {/* <Link href="/the-coverseal" passHref>
             <a className="link-before-translate link-before-translate--anthracite">
               {certificate_title}
             </a>
           </Link> */}
         </div>
<div className="desktop-image">
         <Image
           id={discretion_image}
           title="certificate image"
           direction={AnimationDirection.BOTTOM_TO_TOP}
         />
         </div>
       </div>
       
     </section>

     <section className="section right-image-section" data-color={Color.BEIGE} id ="confort">
      <div className="content">
       <div className="desktop-image">
      <Image
          id={comfort_image.id}
          title="confort image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
        <div className="text-container">
        <h2 className="subtitle-argesta subtitle-argesta--grey-blue" style={{textAlign:"left", width:"100%"}}>
              {comfort_title}
            </h2>
            <div className="mobile-image">
      <Image
          id={comfort_image.id}
          title="about image"
          direction={AnimationDirection.LEFT_TO_RIGHT}
        />
</div>
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: comfort_paragraph }} />
       
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
            <div className="shade-top"></div>

                <Image
                  id={home.realisations_image.id}
                  title="coverseal image"
                  direction={AnimationDirection.RIGHT_TO_LEFT}
                />
              <div className="text-container">
                <h1 className="subtitle-argesta subtitle-argesta--white">
                  {home.realisations_title}
                </h1>
                <h6 style={{ color: 'white' }}>
                  {home.realisations_description}
                </h6>
                <Link href="/the-coverseal" passHref >
                          <a className="link-before-translate link-before-translate--white">
                            {home.realisations_link_text}
                          </a>
                </Link>
              </div>       
              </div>     
        </section>
{/* 
<section>
        <Grid container spacing={3} style={{paddingRight:"10%", paddingLeft:"10%"}}>
        <Grid item xs={6} lg={5}>
               <Image
                  id={realisations_image}
                  title="coverseal image"
                  direction={AnimationDirection.RIGHT_TO_LEFT}
                />
        </Grid>
        <Grid item xs={6} lg={7}>
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
        </Grid>
        </Grid>

      </section> */}

        {/* <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <p>{main_description}</p>
        </div>
      </section>
      <PriceRequestSection
        noTitle
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        form_title={form_title}
        step_one_title={step_one_title}
        step_two_title={step_two_title}
        mobile_step_one_title={mobile_step_one_title}
        mobile_step_two_title={mobile_step_two_title}
        next_btn_title={next_btn_title}
      /> */}
      <section className="section pr-first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h2 className="subtitle-argesta subtitle-argesta--terra-cotta">{pricerequest.main_title}</h2>
          <p>{pricerequest.main_description}</p>
        </div>
      </section>
      <PriceRequestSection
      
      {...globalSection.priceRequest}
      formsMessages={globalSection.formsMessages}
      locale={locale}
      form_title={""}
      noTitle
      step_one_title={step_one_title}
      step_two_title={step_two_title}
      mobile_step_one_title={mobile_step_one_title}
      mobile_step_two_title={mobile_step_two_title}
      next_btn_title={next_btn_title}
    />
      {/* <PriceRequestSection
        noTitle
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        form_title="{form_title}"
        step_one_title={step_one_title}
        step_two_title={step_two_title}
        mobile_step_one_title={mobile_step_one_title}
        mobile_step_two_title={mobile_step_two_title}
        next_btn_title={next_btn_title}
      /> */}
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
> = async ({ locale }) => {
  const fetcher = new Fetcher();

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<TheCoversealContent>(
    fetcher,
    "the_coverseal_template",
    locale
  );
  const cmsLocale = getLocale(locale);
  const home= await fetcher.fetchCollection<HomeContent>("home_template", cmsLocale);
  const pricerequest= await fetcher.fetchCollection<PriceRequestContent>("price_request_template", cmsLocale);
  return {
    props: {
      ...allPageProps,
      ...pageProps,
      home,
      pricerequest
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
