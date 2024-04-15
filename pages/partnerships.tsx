import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import slugify from "slugify";
import React, { useEffect, useMemo } from "react";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { BlockList } from "../components/BlockList";
import { Image } from "../components/Image";
import { CircleCenterLink } from "../components/CircleCenterLink";
import Link from "next/link";
import {
  translateInFromLeftToRight,
  translateInFromRightToLeft,
} from "../animations/appearing/shared";
import { AnimationDirection, Color } from "../utils/constants";
import type { PartialItem } from "@directus/sdk";
import { getLocale } from "../utils/locale";
import { Grid } from "@material-ui/core";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";
import Masonry from "@mui/lab/Masonry";
import Box from "../components/Box";
import VerticalBoxGroup from "../components/VerticalBoxGroup";

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");
  translateInFromLeftToRight(".faq-link");
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

interface Props extends PageProps<PartnershipsContent> {
  faqQuestions: PartialItem<FAQQuestionDirectus>[];
}

export default function PartnershipsPage({ pageProps, globalSection, faqQuestions }: Props) {
  const { main_title, main_paragraph, partnerships_image, gallery_link_text,security_title,
    security_paragraph,
    water_quality_title,
    water_quality_paragraph,
    isolation_title,
    isolation_paragraph,security_image,
    isolation_image,
    water_quality_image,
    about_coverseal_title,
    about_coverseal_text,
    about_coverseal_texttwo,
    coverseal_partners_title,
    coverseal_partners_text,
    coverseal_stregths_title,
    strength1_title,
    strength1_text,
    strength2_title,
    strength2_text,
    strength3_title,
    strength3_text,
    strength4_title,
    strength4_text,
    strength5_title,
    strength5_text,
    partner_profile_title,
    partner_profile_text,
    becoming_partner_title,
    becoming_partner_text,
    coverseal_partners_image,
    coverseal_partners_mobile_image,
    partner_profile_image,
    water_economy_title,
water_economy_paragraph,
water_economy_image,
aesthetic_title,
aesthetic_paragraph,
aesthetic_image,
comfort_in_use_title,
comfort_in_use_paragraph,
comfort_in_use_image,
more_link_text,
lead_title,
lead_link_text,
dealer_title,
dealer_link_text
   } =
    pageProps;
  const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  var filteredquestions = faqQuestions.filter(x=>x.category);
  const randomQuestionIndex = getRandomInt(0, filteredquestions.length - 1);

  const randomQuestion = filteredquestions[randomQuestionIndex];

  useEffect(() => {
    appearingAnimations();
  }, []);

  const blocks = useMemo(() => {
    switch (country) {
      case "BE":
      case "NL":
      case "DE":
        case "AT":          
        case "CH":          
        case "IL":          
        case "GB":          
        case "AE":
        return ["lead", "dealer"];
      
      case "FR":
        return ["lead", "dealer", "distributor"];
      // case Languages.EN_GB:
      default:
        return ["distributor"];
    }
  }, [country]);
  const linksMap = useMemo(() => {
    return {
      lead: "/partnerships-form?type=lead",
      dealer: "/partnerships-form?type=dealer",
      distributor: "/partnerships-form?type=distributor",
    };
  }, [country]);

  return (
    <main className="partnerships-template">
      {/* <section className="section first-section" data-color="beige">
      
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          
          <BlockList
              pageProps={pageProps}
              blocks={blocks}
              linksMap={linksMap}
            />
          <div style={{clear:"both", height:"50px"}}></div>
          {(security_title && security_paragraph) && <div id="security" className="block block-text-image">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {security_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: security_paragraph }}
              />
            </div>
            <Image
              id={security_image.id}
              title="security image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>}

          {(water_quality_title && water_quality_paragraph) &&<div
            id="water-quality"
            className="block block-text-image block-water-quality"
          >
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {water_quality_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: water_quality_paragraph }}
              />
            </div>
            <Image
              id={water_quality_image.id}
              title="water quality image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>}
          {(isolation_title && isolation_paragraph) && <div id="isolation" className="block block-text-image">
            <div className="text-container">
              <h2 className="subtitle-argesta subtitle-argesta--grey-blue">
                {isolation_title}
              </h2>
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: isolation_paragraph }}
              />
            </div>
            <Image
              id={isolation_image.id}
              title="isolation image"
              direction={AnimationDirection.RIGHT_TO_LEFT}
            />
          </div>}
          
        </div>
        <div style={{clear:"both", height:"100px"}}></div>
        
        <div className="image-circle-container">
          <Image
            id={partnerships_image}
            title="partnerships image"
            direction={AnimationDirection.RIGHT_TO_LEFT}
          />
          <CircleCenterLink text={gallery_link_text} href="/achievements" />
        </div>
        <div className="section-container">
          <Link
            href={`/faq/${
              (randomQuestion.category as FAQCategoryDirectus).id
            }/${slugify(
              (randomQuestion.category as FAQCategoryDirectus).translations[0]
                .name,
              { lower: true }
            )}#question-${randomQuestion.id}`}
            passHref
          >
            <a className="faq-link subtitle-argesta subtitle-argesta--terra-cotta link-underline">
              {randomQuestion.translations[0].question}
            </a>
          </Link>
        </div>
      </section> */}

<section className="section only-title-1-section" data-color={Color.BEIGE} >
      <div className="content">       
        <div className="text-container">    
        
        <h2 className="main-title main-title--terra-cotta">{main_title}
              </h2>  
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"left", width:"100%"}}>
              {about_coverseal_title}
            </h3>                         
        </div>        
      </div>      
    </section>


    <section className="section devenir-partenaire-section" data-color={Color.BEIGE} >
      <div className="content">       
        <div className="text-container">
                      
          <div className="paragraph wysiwyg" style={{fontSize:"25px"}} dangerouslySetInnerHTML={{ __html: about_coverseal_text }} />         
        </div>        
      </div>      
    </section>

{/* <section className="section image-box-two-section" data-color={Color.BEIGE} >
        <div className="container"    style={{paddingRight:"5%",  paddingLeft:"5%"}}>
        <div className="horizontal-box-groups">
          <VerticalBoxGroup 
            //width = "280px"
            boxes={[
              <Box
                key={1}
                content={strength1_title}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#FFFFFF"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength1_text}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F7F7F7"
                fontSize="19px"
                // width="10%"
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
                content={strength2_title}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />, // Empty Box
              <Box
                key={1}
                content={strength2_text}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="19px"
                // width="10%"
                height="110px"
                textPosition="top"
              />,
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              
              <Box
                key={1}
                content={strength3_title}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength3_text}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="19px"
                // width="10%"
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
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength4_text}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F1E2D5"
                fontSize="19px"
                // width="10%"
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
                content={strength5_title}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="3rem"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength5_text}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="1rem"
                // width="10%"
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
        </div>
    
      </section> */}
      <section className="section image-box-two-section" data-color={Color.BEIGE} >
        <div className="container">
          <Grid container spacing={2}>
            <Grid item sm={12} lg={2}  xs={12} spacing={2} >
              <div className="boxpair">
              <Image id={security_image.id} title="security_image" />
             <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%", marginTop:"10px"}}>
                <div style={{fontSize:"50px"}}>
                <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{security_title}</h4>
                <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}}  dangerouslySetInnerHTML={{ __html: security_paragraph }}></div></div>
                <div style={{height:"40px"}}></div>
                <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
              
            </Grid>
            <Grid item spacing={2} lg={2} sm={12}  xs={12}>
            <div className="boximpair">
            <Image id={water_economy_image.id} title="isolation_image" className="hidenimage"/>
            <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%", marginTop:"10px"}}>
            <div style={{fontSize:"50px"}}>
            <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{water_economy_title}</h4>
            <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}} dangerouslySetInnerHTML={{ __html: water_economy_paragraph }}></div></div>
                <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {more_link_text}
              </a>
            </Link>
              </div></div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boxpair">
              <Image id={aesthetic_image.id} title="isolation_image" className="hidenimage"/>
              <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%", marginTop:"10px"}}>
                <div style={{fontSize:"50px.5rem"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{aesthetic_title}</h4>
                <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}} dangerouslySetInnerHTML={{ __html: aesthetic_paragraph }}></div></div>
                <div style={{height:"40px"}}></div>
                <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boximpair">
            <Image id={water_quality_image.id} title="water_quality_image" className="hidenimage"/>
            <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%", marginTop:"10px"}}>
            <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{water_quality_title}</h4>
            <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}} dangerouslySetInnerHTML={{ __html: water_quality_paragraph }}></div></div>
                <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {more_link_text}
              </a>
            </Link>
              </div></div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boxpair">
              <Image id={comfort_in_use_image.id
              } title="isolation_image" className="hidenimage"/>
              <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%", marginTop:"10px"}}>
                <div style={{fontSize:"50px"}}>
                <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{comfort_in_use_title}</h4>
                <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}} dangerouslySetInnerHTML={{ __html: comfort_in_use_paragraph }}></div>
                </div>
                <div style={{height:"40px"}}></div>
                <Link href="/the-coverseal" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
            </Grid>
          </Grid>
        
        </div>
    
      </section>


      <section className ="section spacing-section" data-color={Color.SAND} > </section>

<section className="section only-text-section" data-color={Color.BEIGE}>
      <div className="content">       
        <div className="text-container">                 
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: about_coverseal_texttwo }} />          
        </div>        
      </div>      
    </section>

<section className="section background-image-section" data-color={Color.SAND}>
            <div className="content" style={{position:"relative"}}>
              

        <Image
          id={coverseal_partners_image.id}
          title="coverseal image" className="desktopimage"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        />
        <Image
          id={coverseal_partners_mobile_image.id}
          title="coverseal image" className="mobileimage"
          direction={AnimationDirection.RIGHT_TO_LEFT}
        />
        <div style={{position:"absolute", width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,.5)", top:"0px", left:"0px"}}></div>
              <div className="text-container">
                <h1 className="subtitle-argesta subtitle-argesta--white backgroundtitle">
                  {coverseal_partners_title}
                </h1>
                
                <div className="paragraph wysiwyg" style={{color:"white", fontSize:"25px"}}  dangerouslySetInnerHTML={{ __html: coverseal_partners_text }} />  
                
              </div>       
              </div>     
        </section>

    <section className="section only-title-section" data-color={Color.SAND} >
      <div className="content">       
        <div className="text-container">    
        <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" >
        {coverseal_stregths_title}
              </h2>                          
        </div>        
      </div>      
    </section>

    <section className="section image-box-two-section" data-color={Color.SAND} >
        <div className="container">
          <Grid container spacing={2}>
            <Grid item sm={12} lg={2}  xs={12} spacing={2} >
              <div className="boxpair">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"left", padding:"50px 20px",backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><img src="/Picto_Partenaire-01.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"27%"}}/></div>                
              </div>        
          
              <div style={{verticalAlign:"left", textAlign:"left", paddingTop:"20px",flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px", fontFamily:"Poppins"}}>
                  <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                  <table><tr><td valign="top"><img src="/Picto_Partenaire-01-mobile.svg" className="mobileimage" style={{width:"47.8px"}}/></td><td style={{verticalAlign:"top", paddingLeft:"10px"}}>{strength1_title}</td></tr></table>
                  </h4>
                  <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"Poppins"}}>
                    {strength1_text}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </div>
            </Grid>
            <Grid item spacing={2} lg={2} sm={12}  xs={12}>
            <div className="boximpair">
            <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"left", padding:"50px 20px",backgroundColor:"var(--color-terra-cotta)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><img src="/Picto_Partenaire-02.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"27%"}}/></div>                
              </div></div>
              <div style={{verticalAlign:"middle", textAlign:"left", padding:"20px", flexDirection:"column", width:"100%"}}>
              <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
              <table><tr><td valign="top"><img src="/Picto_Partenaire-02-mobile.svg" className="mobileimage" style={{width:"47.8px"}}/></td><td style={{verticalAlign:"top", paddingLeft:"10px"}}>{strength2_title}</td></tr></table></h4>
              <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}}>{strength2_text}</div></div></div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boxpair">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"var(--color-white)",color:"var(--color-anthracite)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-03.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div>
              <div style={{verticalAlign:"middle", textAlign:"left", paddingTop:"20px", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                <table><tr><td valign="top"><img src="/Picto_Partenaire-03-mobile.svg" className="mobileimage" style={{width:"47.8px"}}/></td><td style={{verticalAlign:"top", paddingLeft:"10px"}}>{strength3_title}</td></tr></table>
                  </h4>
                <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}}>{strength3_text}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boximpair">
            <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-04.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div></div>
              <div style={{verticalAlign:"middle", textAlign:"left", paddingLeft:"30px",paddingTop:"20px",flexDirection:"column", width:"100%"}}>
              <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
              <table><tr><td valign="top"><img src="/Picto_Partenaire-04-mobile.svg" className="mobileimage" style={{width:"47.8px"}}/></td><td style={{verticalAlign:"top", paddingLeft:"10px"}}>{strength4_title}</td></tr></table>
                </h4>
              <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}}>{strength4_text}</div></div></div>
            </Grid>
            <Grid item sm={12} lg={2} xs={12} spacing={2}>
            <div className="boxpair">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"var(--color-white)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-05.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div>
              <div style={{verticalAlign:"middle", textAlign:"left", paddingTop:"20px", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                <table><tr><td valign="top"><img src="/Picto_Partenaire-05-mobile.svg" className="mobileimage" style={{width:"47.8px"}}/></td><td style={{verticalAlign:"top", paddingLeft:"10px"}}>{strength5_title}</td></tr></table>
                  </h4>
                <div style={{fontSize:"22px", marginTop:"-10px", color:"#343337", fontFamily:"poppins"}}>{strength5_text}</div></div>
                <div style={{height:"40px"}}></div>
              </div>
              </div>
            </Grid>
          </Grid>
        
        </div>
    
      </section>
{/* <section className="section image-box-two-section" data-color={Color.BEIGE} >
        <div className="container"    style={{paddingRight:"5%",  paddingLeft:"5%"}}>
        <div className="horizontal-box-groups">
          <VerticalBoxGroup 
            //width = "280px"
            boxes={[
              <Box
                key={1}
                content={strength1_title}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#FFFFFF"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength1_text}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F7F7F7"
                fontSize="19px"
                // width="10%"
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
                content={strength2_title}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />, // Empty Box
              <Box
                key={1}
                content={strength2_text}
                backgroundColor="var(--color-anthracite)"
                textColor="#F1E2D5"
                fontSize="19px"
                // width="10%"
                height="110px"
                textPosition="top"
              />,
            ]}
          />
          <VerticalBoxGroup
            boxes={[
              
              <Box
                key={1}
                content={strength3_title}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="110px"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength3_text}
                backgroundColor="var(--color-white)"
                textColor="#7F351B"
                fontSize="19px"
                // width="10%"
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
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength4_text}
                backgroundColor="var(--color-terra-cotta)"
                textColor="#F1E2D5"
                fontSize="19px"
                // width="10%"
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
                content={strength5_title}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="3rem"
                // width="10%"
                height="170px"
                textPosition="bottom"
              />,
              <Box
                key={1}
                content={strength5_text}
                backgroundColor="#F1E2D5"
                textColor="#343337"
                fontSize="1rem"
                // width="10%"
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
        </div>
    
      </section> */}

<section className="section partenaire-ideal-section" data-color={Color.ANTHRACITE}>
        <div className="content">
          <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta partnertitle" style={{fontSize:"3rem"}}>
                {partner_profile_title}
              </h2>
          <div className="mobile-image">
          <Image
                id={partner_profile_image.id}
                title="coverseal image"
                direction={AnimationDirection.BOTTOM_TO_TOP}
              />
          </div>
            <div className="paragraph wysiwyg" style={{fontSize:"25px"}} dangerouslySetInnerHTML={{ __html: partner_profile_text }} />            
          </div>
        <div className="desktop-image">
          <Image
            id={partner_profile_image.id}
            title="coverseal image"
            direction={AnimationDirection.BOTTOM_TO_TOP}
          />
          </div>
        </div>        
      </section>


<section className="section devenir-partenaire-section" data-color={Color.BEIGE} >
      <div className="content">       
        <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"left", width:"100%"}}>
              {becoming_partner_title}
            </h2>           
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: becoming_partner_text }} />          
        </div>        
      </div>      
    </section>
      
    <section className="section devis-section" data-color={Color.TERRA_COTTA}>      
      <div className="content" style={{margin:"auto", width:"90%", marginTop:"30px", marginBottom:"30px"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {lead_title}
              </h4>
              <Link href={`/partnerships-form?type=lead`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {lead_link_text}
                            </a>
              </Link>
              </div></div>
            
            <div></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="item-container">&nbsp;</div>
            <div className="item-container" style={{textAlign:"right"}}>
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {dealer_title}
              </h4>
              <Link href={`/partnerships-form?type=dealer`} passHref>
                            <a className="link-before-translate link-before-translate--white" style={{fontFamily:"Poppins"}}>
                              {dealer_link_text}
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

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  if (locale === "default") {
    return {
      props: null,
      notFound: true,
    };
  }

  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<PartnershipsContent>(
    fetcher,
    "partnerships_template",
    locale
  );

  const faqQuestions = await fetcher.directus
    .items<string, FAQQuestionDirectus>("faq")
    .readMany({
      fields: ["translations.*", "id", "category.*.*", "reference"],
      deep: {
        category:{
          _filter: {
            "reference": {
              _in: ["general","practice"]
            }
        }
      },
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        } as any,
      },
    })
    .then((res) => res.data.filter((item) => item.translations.length));

  return {
    props: {
      ...allPageProps,
      ...pageProps,
      faqQuestions,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
