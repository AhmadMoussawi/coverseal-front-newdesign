import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Cookies from 'js-cookie';
import { getLocale } from "../utils/locale";
import { Dialog, DialogTitle, DialogContent, Button, Typography, useTheme } from '@mui/material';
import { IconButton, Switch } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Footer from "./Footer"
import { BASE_URL, COUNTRIES, Color } from "../utils/constants";
// Dynamic imports for non-critical components
const TopBar = dynamic(() => import("./TopBar"), { ssr: false });
const CookieBanner = dynamic(() => import('../components/CookieBanner'), { ssr: false });
const DeferredScript = dynamic(() => import("./DeferredScript"), { ssr: false });
const LogoFull = dynamic(() => import("./icons/LogoFull"), { ssr: false });

interface Props {
  children?: ReactNode;
  title?: string;
  mainClassName: string;
  formsMessages: FormMessagesContent;
  seoProps: {
    seo_title: string;
    seo_description: string;
    opengraph_description: string;
    opengraph_image?: string;
  };
  topBarProps: any;
  footerProps: any;
  sideNavProps: any;
  canonicallocale?: string;
}

const GreenSwitch = withStyles({
  switchBase: {
    color: "var(--color-beige)",
    '&$checked': {
      color: "var(--color-terra-cotta)",
    },
    '&$checked + $track': {
      backgroundColor: "var(--color-terra-cotta)",
    },
  },
  checked: {},
  track: {},
})(Switch);

const Layout: React.FC<Props> = ({
  topBarProps,
  footerProps,
  seoProps,
  sideNavProps,
  children,
  formsMessages,
  canonicallocale
}) => {
  const [domain, setDomain] = useState("");
  const [openSettingsModal, setOpenSettingsModal] = useState(false); 
  const [bannerOpen, setBannerOpen] = useState(true);  
  const [analyticsChecked, setAnalyticsChecked] = useState(true);
  const [targetingChecked, setTargetingChecked] = useState(true);

  const setAcceptAll = (acceptance: string) => {
    Cookies.set('AnalyticalConsent', acceptance, { expires: 180 });
    Cookies.set('TargetingConsent', acceptance, { expires: 180 });
    setAnalyticsChecked(acceptance === "accepted");
    setTargetingChecked(acceptance === "accepted");
    setBannerOpen(false);
    window.dataLayer.push({ 'event': "CookieConsentAction" });
  };

  const setAcceptMyChoices = () => {
    Cookies.set('AnalyticalConsent', analyticsChecked ? 'accepted' : 'rejected', { expires: 180 });
    Cookies.set('TargetingConsent', targetingChecked ? 'accepted' : 'rejected', { expires: 180 });
    setBannerOpen(false);
    window.dataLayer.push({ 'event': "CookieConsentAction" });
  };

  useEffect(() => {
    const currentDomain = window.location.host;
    setDomain(currentDomain);
    setAnalyticsChecked(Cookies.get('AnalyticalConsent') !== "rejected");
    setTargetingChecked(Cookies.get('TargetingConsent') !== "rejected");
  }, []);

  const handleAnalyticsChange = () => setAnalyticsChecked(prev => !prev);
  const handleTargetingChange = () => setTargetingChecked(prev => !prev);

  const theme = useTheme();
  const router = useRouter();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const { seo_title, seo_description, opengraph_description, opengraph_image } = seoProps;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta name="author" content="Chloé, Benjamin" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Coverseal" />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={opengraph_description} />
        {opengraph_image && (
          <meta property="og:image" content={`${process.env.CMS_PUBLIC_URL}/assets/${opengraph_image}`} />
        )}
        <meta property="og:url" content={`${BASE_URL}/${router.locale === "default" ? "" : router.locale}${router.asPath}`} />
        {footerProps.enable_canonicals && (
          <link
            rel="canonical"
            href={`${BASE_URL}${(router.locale === "default" || router.locale === "fr" ? "" : "/" + router.locale)}${router.route == "/"?"":router.route}`.split("?")[0]}
          />
        )}
        {router.asPath !== "/country" && COUNTRIES.map(item => item.languages.map(language => {
          const code = language.toLocaleLowerCase();
          const languagecode = `${language.toLocaleLowerCase()}-${item.code}`;
          return item.code === "FR" ? (
            <React.Fragment key={code}>
              <meta property={`og:locale${code === router.locale ? "" : ":alternate"}`} content="fr-FR" />
              <link rel="alternate" hrefLang="fr-FR" href={`https://coverseal-stage.fr${router.route}`} />
            </React.Fragment>
          ) : (
            <React.Fragment key={languagecode}>
              <meta property={`og:locale${code === router.locale ? "" : ":alternate"}`} content={languagecode} />
              <link rel="alternate" hrefLang={languagecode} href={`https://www.coverseal.com/${languagecode}${router.route == "/"?"":router.route}`} />
            </React.Fragment>
          );
        }))}
        <link rel="alternate" hrefLang="x-default" href={`https://www.coverseal.com/en-GB${router.route == "/"?"":router.route}`} />
        <meta name="twitter:card" content="summary" />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K839FCD');`,
          }}
        />
        <script
          type="text/javascript"
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCH9kFQI5wzXxI7LdtJUPhicz80xSE7vuw&libraries=places&language=${getLocale(router.locale)}`}
        />
      </Head>
      <DeferredScript src="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap" />
      <DeferredScript src="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-K839FCD"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <div className="main-container" data-version={process.env.APP_VERSION}>
        <TopBar {...topBarProps} sideNavProps={sideNavProps} />
        {children}
        <Footer {...footerProps} {...topBarProps} formsMessages={formsMessages} setOpenSettingsModal={setOpenSettingsModal} />
      </div>
      {bannerOpen && <CookieBanner {...footerProps} openSettingsModal={openSettingsModal} setOpenSettingsModal={setOpenSettingsModal} setAcceptAll={setAcceptAll} />}
      <Dialog open={openSettingsModal} onClose={() => setOpenSettingsModal(false)} fullWidth maxWidth="md" sx={{ zIndex: 9999999999999 }}>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpenSettingsModal(false)}
            aria-label="close"
            className="dialog-close-button"
          >
            <CloseIcon />
          </IconButton>
          <div className="logo-container">
            <LogoFull color={Color.TERRA_COTTA} />
          </div>
          <DialogTitle className="dialog-title">{footerProps.cookies_popup_title}</DialogTitle>
          <Typography>
            {footerProps.cookies_generic_description} 
            <Button 
              onClick={() => { setOpenSettingsModal(false); router.push(`/${router.locale}/cookies-policy`) }} 
              className="cookie-policy-link"
            >
              {footerProps.banner_cookies_policy_link_text}
            </Button>
          </Typography>
          <Button className="accept-cookies-btn" onClick={() => { setAcceptAll("accepted"); setOpenSettingsModal(false); }}>
            {footerProps.acceptall_btn}
          </Button>
          <DialogTitle className="dialog-title">{footerProps.cookies_manage_consent_title}</DialogTitle>
          <Typography>
            <div className="cookie-section">
              <span className="cookie-title">{footerProps.strictly_necessary_cookies_title}</span>
              <Typography className="cookie-description">
                {footerProps.strictly_necessary_cookies_alwaysactive}
              </Typography>
              <p>{footerProps.strictly_necessary_cookies_description}</p>
            </div>
            <div className="cookie-section">
              <span className="cookie-title">{footerProps.analytical_cookies_title}</span>
              <GreenSwitch checked={analyticsChecked} onChange={handleAnalyticsChange} color="default" />
              <p>{footerProps.analytical_cookies_description}</p>
            </div>
            <div className="cookie-section">
              <span className="cookie-title">{footerProps.targeting_cookies_title}</span>
              <GreenSwitch checked={targetingChecked} color="default" onChange={handleTargetingChange} />
              <p>{footerProps.targeting_cookies_description}</p>
            </div>
          </Typography>
          <Button className="reject-all-btn" onClick={() => { setAcceptAll("rejected"); setOpenSettingsModal(false); }}>
            {footerProps.rejectall_btn}
          </Button>
          <Button className="accept-my-choice-btn" onClick={() => { setAcceptMyChoices(); setOpenSettingsModal(false); }}>
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
