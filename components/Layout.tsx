import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import TopBar from "./TopBar";
import { Footer } from "./Footer";
import { SideNav } from "./SideNav";
import { BASE_URL, COUNTRIES, Color } from "../utils/constants";
import Image from 'next/image'
import { getLocale } from "../utils/locale";
import Script from "next/script";
import CookieBanner from '../components/CookieBanner';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, useTheme } from '@mui/material';
import { LogoFull } from "./icons";
import { IconButton, Switch } from "@material-ui/core";
import Link from "next/link";
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';


import { green, red } from "@material-ui/core/colors";
import Cookies from 'js-cookie';
interface Props extends LayoutProps {
  children?: ReactNode;
  title?: string;
  mainClassName: string;
  formsMessages: FormMessagesContent;
}

const Layout: React.FC<Props> = ({
  topBarProps,
  footerProps,
  seoProps,
  sideNavProps,
  children,
  formsMessages,
  canonicallocale
}) => {
  var acceptedAnalytics = true;
  var acceptedTargeting = true;
  const [domain, setDomain] = useState("");
  const [openSettingsModal, setOpenSettingsModal] = useState(false); 
  const [bannerOpen, setBannerOpen] = useState(true);  
  const [analyticsChecked, setAnalyticsChecked] = React.useState(acceptedAnalytics);
  const [targetingChecked, setTargetingChecked] = React.useState(acceptedTargeting);
  const setAcceptAll = (acceptance)=>{
    //localStorage.setItem('AnalyticalConsent', acceptance);
    //localStorage.setItem('TargetingConsent', acceptance);
    setCookie('AnalyticalConsent', acceptance, { expires: 180 });
    setCookie('TargetingConsent', acceptance, { expires: 180 });
    setAnalyticsChecked(acceptance == "accepted");
    setTargetingChecked(acceptance == "accepted");
    setBannerOpen(false);
    window.dataLayer.push({
      'event': "CookieConsentAction"
    });
  }
  const setCookie = (key, value, options = {}) => {
    Cookies.set(key, value, options);
  };
  
  // Get a cookie
  const getCookie = (key) => {
    return Cookies.get(key);
  };
  const setAcceptMychoices = ()=>{
    if(analyticsChecked)
    {
      setCookie('AnalyticalConsent', 'accepted', { expires: 180 });
      //localStorage.setItem('AnalyticalConsent', "accepted");
      setAnalyticsChecked(true);
    }
    else{
      setCookie('AnalyticalConsent', 'rejected', { expires: 180 });
      //localStorage.setItem('AnalyticalConsent', "rejected");
      setAnalyticsChecked(false);
    }
    if(targetingChecked)
    {
      setCookie('TargetingConsent', 'accepted', { expires: 180 });
      //localStorage.setItem('TargetingConsent', "accepted");
      setTargetingChecked(true);
    }
    else{
      setCookie('TargetingConsent', 'rejected', { expires: 180 });
      //localStorage.setItem('TargetingConsent', "rejected");
      setTargetingChecked(false);
    }
    //send to gtm
    setBannerOpen(false);
    window.dataLayer.push({
      'event': "CookieConsentAction"
    });
  }
  
  
  useEffect(() => {
    const currentDomain = window.location.host;
    setDomain(currentDomain);
    acceptedAnalytics = getCookie('AnalyticalConsent') !="rejected"//localStorage.getItem('AnalyticalConsent')!="rejected"
    acceptedTargeting = getCookie('TargetingConsent') !="rejected"//localStorage.getItem('TargetingConsent')!="rejected"
    setAnalyticsChecked(acceptedAnalytics);
    setTargetingChecked(acceptedTargeting);
  }, []);
  
  const handleAnalyticsChange = () => {
    setAnalyticsChecked((prev) => !prev);
  };
  const handleTargetingChange = () => {
    setTargetingChecked((prev) => !prev);
  };
  const GreenSwitch = withStyles({
    switchBase: {
      color: "var(--color-beige)", // Default thumb color
      '&$checked': {
        color: "var(--color-terra-cotta)", // Thumb color when the switch is checked
      },
      '&$checked + $track': {
        backgroundColor: "var(--color-terra-cotta)", // Track color when the switch is checked
      },
    },
    checked: {},
    track: {},
  })(Switch);
  const theme = useTheme();
  const router = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

  /*if(router.locale == 'en-AE')
  {
    document.documentElement.style.setProperty('--color-anthracite', "red");
    document.documentElement.style.setProperty('--color-terra-cotta', "red");
    document.documentElement.style.setProperty('--color-sand', "gold");
    document.documentElement.style.setProperty('--color-beige', "white");
    document.documentElement.style.setProperty('--color-grey-blue', "blue");
  }*/
  const { seo_title, seo_description, opengraph_description, opengraph_image } =
    seoProps;
  return (
    <>
    <Head>          
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, user-scalable=no, user-scalable=0, maximum-scale=1"
          />

          <title>{seo_title}</title>
          <meta name="description" content={seo_description} />
          <meta name="author" content="Chloé, Benjamin" />
          <meta name="robots" content="index, follow" />
          <link rel="preconnect" href="https://www.googletagmanager.com"/>
          <link rel="preconnect" href="https://maps.googleapis.com"/>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Coverseal" />
          <meta property="og:title" content={seo_title} />
          <meta property="og:description" content={opengraph_description} />
          {opengraph_image && (
            <meta
              property="og:image"
              content={`${process.env.CMS_PUBLIC_URL}/assets/${opengraph_image}`}
            />
          )}
          {/*<meta
            name="google-site-verification"
            content="wvnlRo-2vmWKyYT-mGv0XgcCZjLjoB4FodKJ7K-QEcA"
          />*/}
          <meta
            property="og:url"
            content={`${BASE_URL}/${
              router.locale === "default" ? "" : router.locale
            }${router.asPath}`}
          />
          {footerProps.enable_canonicals ? <link
            rel="canonical"
            href={`${BASE_URL}/${
             /* router.locale === "default" ? "" : router.locale*/ canonicallocale?canonicallocale:(router.locale === "default" ? "" : router.locale)
            }${router.asPath === "/" ? "": router.asPath}`.split("?")[0]}
          />:<></>}
          
          {/* TODO: investigate why meta tag are not generated in all languages */}
          {router.asPath !== "/country" && (
            <>
              {COUNTRIES.reduce((acc, item) => {
                item.languages.forEach((language) => {
                  const code = `${language.toLocaleLowerCase()}-${item.code}`;
                  acc.push(
                    <React.Fragment key={code}>
                      <meta
                        property={`og:locale${
                          code === router.locale ? "" : ":alternate"
                        }`}
                        content={code}
                      />
                      <link
                        rel="alternate"
                        hrefLang={code}
                        href={`${process.env.NEXT_PUBLIC_DOMAIN}/${code}${router.basePath}`}
                      />
                      
                    </React.Fragment>
                  );
                });
                return acc;
              }, [])}
              <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_DOMAIN}/en-GB${router.basePath}`}  />
            </>
          )}

          <meta name="twitter:card" content="summary" />
          {/* <!-- Google Tag Manager --> */}
          <script defer
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-K839FCD');`,
            }}
          ></script>
          {/* <!-- End Google Tag Manager --> */}
          {/* TODO */}
          {/* <meta name="twitter:site" content="@nytimesbits" /> */}
          {/* TODO */}
          {/* <meta name="twitter:creator" content="@nickbilton" /> */}
          <script type="text/javascript" defer src={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCH9kFQI5wzXxI7LdtJUPhicz80xSE7vuw&libraries=places&language=" + getLocale(router.locale)}></script>
        </Head>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K839FCD"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}
      <div className="main-container" data-version={process.env.APP_VERSION}>
        
        <div className="initial-loader">
          <div className="image-container">
            <Image src="/intro.gif" width="100%" height="100%" alt="intro animation with logo" />
          </div>
          <span className="link-underline">Skip</span>
        </div>
        <TopBar {...topBarProps} />
        <SideNav {...sideNavProps} />
        {children}
        <Footer {...footerProps} {...topBarProps} formsMessages={formsMessages}  setOpenSettingsModal={setOpenSettingsModal}/>
      </div>
      {/* Cookie banner */}
      {bannerOpen && <CookieBanner {...footerProps} openSettingsModal={openSettingsModal} setOpenSettingsModal={setOpenSettingsModal} setAcceptAll={setAcceptAll} />}

      {/* Cookie settings modal */}
      <Dialog open={openSettingsModal} onClose={() => setOpenSettingsModal(false)} fullWidth maxWidth="md"  sx={{ zIndex: 1500 }}>
      <DialogContent>
      <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpenSettingsModal(false)}
          aria-label="close"
          style={{ position: 'absolute', right: 20, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
      <div style={{width:"30%",padding:"30px 0 0 0px"}}><LogoFull color={Color.TERRA_COTTA} /></div>
        <DialogTitle style={{color:"var(--color-terra-cotta)", fontWeight:"bold", marginLeft:"0px", paddingLeft:"0px"}}>{footerProps.cookies_popup_title}</DialogTitle>
        
          <Typography>
          {footerProps.cookies_generic_description} <Button onClick={()=>{setOpenSettingsModal(false); router.push(`/${router.locale}/cookies-policy`)}} style={{textDecoration:"underline", color:"rgb(5,99,193)"}}>{footerProps.banner_cookies_policy_link_text}</Button>

          </Typography>
          <Button onClick={()=>{setAcceptAll("accepted");setOpenSettingsModal(false)}} style={{border:"1px solid #723722", padding:"5px 10px",textTransform:"none", color:"white", backgroundColor:"#723722", borderRadius:"5px", marginLeft:"0px", marginTop:"20px"}}>
          {footerProps.acceptall_btn}
        </Button>
        <DialogTitle style={{color:"var(--color-terra-cotta)", fontWeight:"bold", marginLeft:"0px", paddingLeft:"0px"}}>{footerProps.cookies_manage_consent_title}</DialogTitle>
          <Typography>
            <div style={{float:"left"}}>
              <span style={{color:"var(--color-terra-cotta)", fontWeight:"bold"}}>{footerProps.strictly_necessary_cookies_title}</span>
            </div>
            <Typography sx={{float:"left", color:"#00B77A", fontWeight:"bold", [theme.breakpoints.up('md')]: {float:"right"}}}><span style={{fontWeight:"bold"}}>{footerProps.strictly_necessary_cookies_alwaysactive}</span></Typography>
            <div style={{clear:"both",height:"20px"}}></div>
            <p>{footerProps.strictly_necessary_cookies_description}
</p>
          </Typography>
          <div style={{clear:"both",height:"30px"}}></div>
          <Typography>
            <div style={{float:"left"}}>
              <span style={{color:"var(--color-terra-cotta)", fontWeight:"bold"}}>{footerProps.analytical_cookies_title}</span>
            </div>
            <div style={{float:"right"}}><GreenSwitch checked={analyticsChecked} onChange={handleAnalyticsChange} color="default" /></div>
            <div style={{clear:"both",height:"20px"}}></div>
            <p>{footerProps.analytical_cookies_description}</p>
          </Typography>
          <div style={{clear:"both",height:"30px"}}></div>
          <Typography>
            <div style={{float:"left"}}>
              <span style={{color:"var(--color-terra-cotta)", fontWeight:"bold"}}>{footerProps.targeting_cookies_title}</span>
            </div>
            <div style={{float:"right"}}><GreenSwitch  checked={targetingChecked} color="default" onChange={handleTargetingChange} /></div>
            <div style={{clear:"both",height:"20px"}}></div>
            <p>{footerProps.targeting_cookies_description}</p>
          </Typography>
          
          <div style={{clear:"both",height:"30px"}}></div>
          <Button onClick={()=>{setAcceptAll("rejected");setOpenSettingsModal(false)}} style={{border:"1px solid #723722", padding:"5px 10px", color:"#723722", borderRadius:"5px", textTransform:"none"}}  sx={{fontSize:"11px",[theme.breakpoints.up('md')]: {fontSize:"13px"}}}>
          {footerProps.rejectall_btn}
        </Button>
        <Button onClick={()=>{setAcceptMychoices();setOpenSettingsModal(false)}} style={{border:"1px solid #723722", padding:"5px 10px",textTransform:"none", color:"white", backgroundColor:"#723722", borderRadius:"5px", marginLeft:"10px"}}  sx={{fontSize:"11px",[theme.breakpoints.up('md')]: {fontSize:"13px"}}}>
        {footerProps.accept_my_choice_btn}
        </Button>
        </DialogContent>
        
      </Dialog>
    </>
  );
};
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}
export default Layout;