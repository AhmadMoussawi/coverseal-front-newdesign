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

import { Form } from "../components/Form";
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
  formsContent:PartialItem<PartershipsFormContent>;
}

export default function PartnershipsPage({ pageProps, globalSection, faqQuestions, formsContent }: Props) {
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
    const router = useRouter();
  const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  var filteredquestions = faqQuestions.filter(x=>x.category);
  const randomQuestionIndex = getRandomInt(0, filteredquestions.length - 1);
  const partnership_types = ["distributor", "dealer", "lead"];
  const randomQuestion = filteredquestions[randomQuestionIndex];
  var lang = "en";
  switch(_language)
  {
    case "fr":
      lang = "fr";
      break;
      case "de":
        lang = "de";
        break;
        case "es":
          lang = "es";
          break;
          case "nl":
            lang = "nl";
            break;
  }
  var countries = require(`../scripts/countries/${lang}/countries.json`);
  const fields = useMemo(
    () => [
      {
        id: "last_name",
        type: "text",
        required: true,
        step:1
      },
      {
        id: "first_name",
        type: "text",
        required: true,
        step:1
      },
      {
        id: "company_name",
        type: "text"
      },
      {
        id: "zip_code",
        type: "text",
        required: true,
        help: (
          <span  style={{color:"red"}}
            className="Mui-error"
            id="zip_code_validation"
          />
        ),
      },
      {
        id: "country",
        type: "text",
        required: true,
        select: true,
        options: countries.map(({ name, alpha2 }) => ({
          label: name,
          value: `${alpha2}/${name}`,
        })),
        
      },
      {
        id: "phone",
        type: "tel"
      },
      {
        id: "mail",
        type: "text",
        required: true,
      },
      {
        id: "mail_confirmation",
        type: "email",
        required: true,
      }
      /*{
        id: "type",
        type: "text",
        required: true,
        select: true,
        options: partnership_types.map((type) => ({
          label: pageProps[`${type}_type`],
          value: type,
        })),
        defaultValue: router.query.type,
      },
      
      
      
      
      {
        id: "contact_person",
        type: "text"
      },*/
      
    ],
    [router, globalSection.priceRequest.countries]
  );
  useEffect(() => {
    appearingAnimations();
  }, []);
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        const header = document.querySelector('header');
        if (element && header) {
          const headerHeight = header.offsetHeight;
          window.scrollTo({
            top: element.offsetTop - headerHeight,
            behavior: 'smooth',
          });
        }
      }
    };

    // Handle initial load
    handleHashChange();

    // Listen for hash changes
    router.events.on('hashChangeComplete', handleHashChange);

    return () => {
      router.events.off('hashChangeComplete', handleHashChange);
    };
  }, [router.events]);
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
<div className="section-container">
      <div className="content">       
        <div className="text-container">    
        
        <h2 className="main-title main-title--terra-cotta">{main_title}
              </h2>  
              <h3 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"left", width:"100%"}}>
              {about_coverseal_title}
            </h3>                         
        </div>        
      </div>
      </div>   
    </section>


    <section className="section devenir-partenaire-section" data-color={Color.BEIGE} >
    <div className="section-container">
      <div className="content">       
        <div className="text-container">
                      
          <div className="paragraph wysiwyg" dangerouslySetInnerHTML={{ __html: about_coverseal_text }} />         
        </div>        
      </div>
      </div>    
    </section>
      <section className="section image-box-two-section about-section" data-color={Color.BEIGE} >
        <div className="container">
          <Grid container className="aboutcontainer">
            <Grid item className="aboutitem"  >
              <div className="boxpair">
              <Image id={security_image.id} title="security_image" className="security-image-container" />
             <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%"}}>
                <div>
                <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{security_title}</h4>
                <div dangerouslySetInnerHTML={{ __html: security_paragraph }}></div></div>
                
                <Link href="/the-coverseal#securite" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta hidemobilelink">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
              
            </Grid>
            <Grid item className="aboutitem">
            <div className="boximpair">
            <Image id={water_economy_image.id} title="isolation_image" className="hidenimage"/>
            <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%"}}>
            <div>
            <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{water_economy_title}</h4>
            <div dangerouslySetInnerHTML={{ __html: water_economy_paragraph }}></div></div>
                <Link href="/the-coverseal#economy" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta hidemobilelink">
                {more_link_text}
              </a>
            </Link>
              </div></div>
            </Grid>
            <Grid item className="aboutitem" >
            <div className="boxpair">
              <Image id={aesthetic_image.id} title="isolation_image" className="hidenimage"/>
              <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%"}}>
                <div><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{aesthetic_title}</h4>
                <div dangerouslySetInnerHTML={{ __html: aesthetic_paragraph }}></div></div>
                <Link href="/the-coverseal#discretion" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta hidemobilelink">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
            </Grid>
            <Grid item className="aboutitem" >
            <div className="boximpair">
            <Image id={water_quality_image.id} title="water_quality_image" className="hidenimage"/>
            <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%"}}>
            <div><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{water_quality_title}</h4>
            <div dangerouslySetInnerHTML={{ __html: water_quality_paragraph }}></div></div>
                <Link href="/the-coverseal#qualite" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta hidemobilelink">
                {more_link_text}
              </a>
            </Link>
              </div></div>
            </Grid>
            <Grid item className="aboutitem" >
            <div className="boxpair">
              <Image id={comfort_in_use_image.id
              } title="isolation_image" className="hidenimage"/>
              <div style={{verticalAlign:"middle", textAlign:"left", flexDirection:"column", width:"100%"}}>
                <div>
                <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle">{comfort_in_use_title}</h4>
                <div dangerouslySetInnerHTML={{ __html: comfort_in_use_paragraph }}></div>
                </div>
                <Link href="/the-coverseal#comfort" passHref>
              <a className="link-before-translate link-before-translate--terra-cotta hidemobilelink">
                {more_link_text}
              </a>
            </Link>
              </div>
              </div>
            </Grid>
          </Grid>
        
    </div>
      </section>


      

<section className="section only-text-section" data-color={Color.BEIGE}>
<div className="section-container">
      <div className="content">       
        <div className="text-container">                 
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: about_coverseal_texttwo }} />          
        </div>        
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
              <div className="text-container conversealpertners">
                <h1 className="subtitle-argesta subtitle-argesta--white backgroundtitle">
                  {coverseal_partners_title}
                </h1>
                
                <div className="paragraph wysiwyg" style={{color:"white", fontSize:"25px"}}  dangerouslySetInnerHTML={{ __html: coverseal_partners_text }} />  
                
              </div>       
              </div>     
        </section>

    <section className="section only-title-section" data-color={Color.SAND} style={{paddingBottom:"0px"}} >
    <div className="section-container">
      <div className="content">       
        <div className="text-container">    
        <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" >
        {coverseal_stregths_title}
              </h2>                          
        </div>        
      </div>  
      </div>    
    </section>

    <section className="section image-box-two-section about-section" data-color={Color.SAND} >
        <div className="container">
          <Grid container className="aboutcontainer">
            <Grid item className="aboutitem" >
              <div className="boxpair1">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"left", padding:"50px 20px",backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column", width:"100%", height:"160px"}}>
                <div style={{fontSize:"50px"}}><img src="/Picto_Partenaire-01.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"27%"}}/></div>                
              </div>        
          
              <div style={{verticalAlign:"left", textAlign:"left", paddingTop:"20px",flexDirection:"column", width:"100%"}} className="firstbox">
                <div style={{fontSize:"50px"}}>
                  <h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                  <table><tr><td valign="top"><img src="/Picto_Partenaire-01-mobile.svg" className="mobileimage"/></td><td style={{width:"7px"}}></td><td style={{verticalAlign:"top"}}>{strength1_title}</td></tr></table>
                  </h4>
                  <p>
                    {strength1_text}</p></div>
              </div>
              </div>
            </Grid>
            <Grid item className="aboutitem">
            <div className="boximpair1">
            <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"left", padding:"50px 20px",backgroundColor:"var(--color-terra-cotta)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><img src="/Picto_Partenaire-02.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"27%"}}/></div>                
              </div>
              <div style={{verticalAlign:"middle", textAlign:"left", padding:"20px 0px", flexDirection:"column", width:"100%"}}>
              <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
              <table><tr><td valign="top"><img src="/Picto_Partenaire-02-mobile.svg" className="mobileimage"/></td><td style={{width:"7px"}}></td><td style={{verticalAlign:"top"}}>{strength2_title}</td></tr></table></h4>
              <p>{strength2_text}</p></div></div></div>
            </Grid>
            <Grid item className="aboutitem">
            <div className="boxpair1">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"white",color:"var(--color-anthracite)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-03.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div>
              <div style={{verticalAlign:"middle", textAlign:"left", paddingTop:"20px", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                <table><tr><td valign="top"><img src="/Picto_Partenaire-03-mobile.svg" className="mobileimage"/></td><td style={{width:"7px"}}></td><td style={{verticalAlign:"top"}}>{strength3_title}</td></tr></table>
                  </h4>
                <p>{strength3_text}</p></div>
              </div>
              </div>
            </Grid>
            <Grid item className="aboutitem">
            <div className="boximpair1">
            <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", padding:"50px 20px",backgroundColor:"var(--color-anthracite)",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-04.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div>
              <div className="strength4" style={{verticalAlign:"middle", textAlign:"left", paddingTop:"20px",flexDirection:"column", width:"100%"}}>
              <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
              <table><tr><td valign="top"><img src="/Picto_Partenaire-04-mobile.svg" className="mobileimage"/></td><td style={{width:"7px"}}></td><td style={{verticalAlign:"top"}}>{strength4_title}</td></tr></table>
                </h4>
              <p>{strength4_text}</p></div></div></div>
            </Grid>
            <Grid item className="aboutitem">
            <div className="boxpair1">
              <div className="desktopimage" style={{verticalAlign:"middle", textAlign:"center", backgroundColor:"white",color:"var(--color-sand)", flexDirection:"column", width:"100%"}}>
                <div style={{fontSize:"60px"}}><img src="/Picto_Partenaire-05.svg" style={{maxWidth:"50%", margin:"center", marginLeft:"0%"}}/></div>                
              </div>
              <div style={{verticalAlign:"middle", textAlign:"left", paddingTop:"20px", flexDirection:"column", width:"100%"}} className="lastbox">
                <div style={{fontSize:"50px"}}><h4 className="subtitle-argesta subtitle-argesta--terra-cotta mobiletitle2">
                <table><tr><td valign="top"><img src="/Picto_Partenaire-05-mobile.svg" className="mobileimage"/></td><td style={{width:"7px"}}></td><td style={{verticalAlign:"top"}}>{strength5_title}</td></tr></table>
                  </h4>
                <p>{strength5_text}</p></div>
              </div>
              </div>
            </Grid>
          </Grid>
        
        </div>
    
      </section>


<section className="section partenaire-ideal-section" data-color={Color.ANTHRACITE}>
  
        <div className="content">
          <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta partnertitle">
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


<section className="section devenir-partenaire-section-1" data-color={Color.BEIGE} >
<div className="section-container">
      <div className="content">       
        <div className="text-container">
            <h2 className="subtitle-argesta subtitle-argesta--terra-cotta" style={{textAlign:"left", width:"100%"}}>
              {becoming_partner_title}
            </h2>           
          <div className="paragraph wysiwyg"  dangerouslySetInnerHTML={{ __html: becoming_partner_text }} />          
        </div>        
      </div>  
      </div>    
    </section>
      

    <section className="section devis-section devis-section-form" data-color={Color.TERRA_COTTA}>      
      <div className="content"
         style={{margin:"auto"}}>
      
      <Masonry columns={{md:2, sm:1}}>
            <div
              className="item-container textleft-container"
            >
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {lead_title}
              </h4><br/><br/>
              
                            <a href="#partner-form" className="link-before-translate link-before-translate--white">
                              {lead_link_text}
                            </a>
              
              </div></div>
            
            <div className="emptydiv"></div>
          </Masonry>
          
            <Masonry columns={{md:2, sm:1}}>
              
         <div className="emptydiv">&nbsp;</div>
            <div className="item-container textright-container">
            <div className ="text-container" >
                <h4 className="subtitle-argesta subtitle-argesta--white" >                   
                {dealer_title}
              </h4><br/><br/>
                            <a href="#partner-form" className="link-before-translate link-before-translate--white">
                              {dealer_link_text}
                            </a>
              </div>
              </div>
          </Masonry>
        </div>
    </section>
    <section className="spacing-section" id="partner-form" data-color={Color.BEIGE}></section>
    <section className="section partners-section"  data-color={Color.BEIGE} style={{padding:"0px"}}>
        <div className="section-container">
          <h1 className="subtitle-argesta subtitle-argesta--terra-cotta">{formsContent.main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: formsContent.main_description }}
          />
        </div>
            </section>
    <section
        className="section price-request-section after-sale-section"
        data-color={Color.BEIGE}
      >
        <div className="section-container">
          <Form
            id="partnerships"
            submit_text={globalSection.afterSale.submit_text}
            formsMessages={globalSection.formsMessages}
            content={{
              ...pageProps,
              ...globalSection.afterSale,
            }}
            fields={fields}
            apiPath="/api/partnerships-form" color={""} next_btn_title={""} setStep={undefined} showsteps={false} step_one_title={""} step_two_title={""} mobile_step_one_title={""} mobile_step_two_title={""}          />
        </div>
          </section>

    <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
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
    const formsContent = await fetcher.directus
    .items<string, PartershipsFormContent>("partnerships_form")
    .readMany({
      fields: ["translations.*", "id"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
          },
        } as any,
      },
    })
    .then((res) => {
        
      return res.data.translations[0]
    });
    console.log("RES", formsContent)
  return {
    props: {
      ...allPageProps,
      ...pageProps,
      faqQuestions,
      formsContent
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
