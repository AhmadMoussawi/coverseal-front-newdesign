import React, { useCallback, useState, useMemo } from "react";
import { NoSsr, TextField, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "react-notifications-component";
import { LogoFull, Facebook, Linkedin, Youtube, Instagram } from "./icons";
import { Color, MAIL_REGEXP } from "../utils/constants";
import { Loader } from "./Loader";
import { useWindowSize } from "./useWindowSize";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { CatalogueRequestHomeSection } from "../components/CatalogueRequestHomeSection";

const color = "#FFF";

const useStyles = makeStyles({
  root: {
    "& input.MuiInput-input": {
      fontFamily: "Poppins",
      fontSize: "2rem",
      fontWeight: 300,
      color: color,
    },
    "& p.MuiFormHelperText-root": {
      fontSize: "1rem",
    },
    "& label.Mui-focused": {
      color: color,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: color,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: color,
    },
    "& .MuiInput-underline:hover::before": {
      borderBottomColor: color,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: color,
      },
    },
  },
});

interface Props extends FooterContent {
  mainMenuProps: MainMenuProps;
  formsMessages: FormMessagesContent;  
  setOpenSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// TODO: link subscribe with backend
export function Footer({
 
  mainMenuProps,
  contact_link_text,
  newsletter_text,
  newsletter_placeholder,
  privacy_policy_link_text,
  terms_and_conditions_link_text,
  newsletter_subscribe_link_text,
  youtube_link,
  facebook_link,
  instagram_link,
  linkedin_link,
  formsMessages,
  wrong_email,
  footer_cookies_policy_link_text,
  footer_manage_cookies_consent_link_text,
  setOpenSettingsModal
}: Props) {
  const { locale } = useRouter();
  const router = useRouter();
  const size = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [mail, setMail] = useState("");
  const [error, setError] = useState<null | string>(null);
  const handleOpenSettings = () => {
    setOpenSettingsModal(true);
  };
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let match = e.target.value.match(MAIL_REGEXP);
    if (!match) {
      setError(wrong_email);
    } else {
      setError(null);
    }
    setMail(e.target.value);
  }, []);

  const handleSubscribeNewsletter = useCallback(() => {
    if (error) {
      return;
    }
    setIsLoading(true);
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        mail,
        language: router.locale,
      }),
    })
      .then((res) => {
        window.dataLayer.push({
          'data':{mail,language:router.locale},
          'event': "newsletter"
        });
        if (!res.ok) {
          
          let err: any;
          if (res.status === 413) {
            err = { status: "failed", code: 413 };
          } else if (res.status === 500) {
            err = { status: "failed", code: 500 };
          }
          throw err;
        }
        
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setMail("");
        Store.addNotification({
          title: formsMessages.success_title,
          message: formsMessages.success_content,
          type: "success",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        Store.addNotification({
          title: formsMessages.error_title,
          message: formsMessages.error_content,
          type: "danger",
          insert: "top",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      });
  }, [error, formsMessages, mail, router]);

  const classes = useStyles();

  const socialNetworks = useMemo(
    () => (
      <ul className="social-networks">
        <li>
          <a target="_blank" href={youtube_link}>
            <Youtube color={Color.SAND} />
          </a>
        </li>
        <li>
          <a target="_blank" href={linkedin_link}>
            <Linkedin color={Color.SAND} />
          </a>
        </li>
        <li className="facebook">
          <a target="_blank" href={facebook_link}>
            <Facebook color={Color.SAND} />
          </a>
        </li>
        <li>
          <a target="_blank" href={instagram_link}>
            <Instagram color={Color.SAND} />
          </a>
        </li>
      </ul>
    ),
    []
  );

  return (




  

    <footer className="footer" data-color={Color.ANTHRACITE}>

{/* <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      /> */}


      <div className="section-container">
        {/*<div className="footer__top">
        {size.width <= 580 && socialNetworks}
          <div className="newsletter">
            <div
              className="wysiwyg"
              dangerouslySetInnerHTML={{ __html: newsletter_text }}
            />
            <NoSsr>
              <TextField
                className={classes.root + " input"}
                fullWidth
                required
                id="newsletter"
                placeholder={newsletter_placeholder}
                value={mail}
                onChange={handleChange}
                error={Boolean(error)}
                helperText={error}
              />
            </NoSsr>
            <div className="button-container">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  className="link-before-translate link-before-translate--white subscribe-button"
                  type="button"
                  onClick={handleSubscribeNewsletter}
                >
                  {newsletter_subscribe_link_text}
                </button>
              )}
            </div>
          </div>
          <Link href="/contact" passHref>
            <a className="contact-link subtitle-argesta">{contact_link_text}</a>
          </Link>
        </div>*/}



        
        <div className="flex-container">
          <div className="flex-child">
          <Link href="/" passHref>
                    <a className="logo">
                      <LogoFull color={Color.SAND} />
                    </a>
                  </Link>
          </div>
          
          <div className="flex-child" style ={{left:"80%"}}>{size.width > 580 && socialNetworks}</div>
        </div>
          




                  <div className="line" />
        <div className="footer__bottom" >
          
          <div className="right">
           
            <ul className="legal">
              <li>
                <Link href="/privacy-policy" passHref>
                  <a>{privacy_policy_link_text}</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" passHref>
                  <a>{terms_and_conditions_link_text}</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies-policy" passHref>
                  <a>{footer_cookies_policy_link_text}</a>
                </Link>
              </li>
              <li>
                  <a style={{cursor:"pointer"}} onClick={()=>{handleOpenSettings()}}>{footer_manage_cookies_consent_link_text}</a>
              </li>
              {mainMenuProps.hasblogs && <li>
                <Link href={mainMenuProps.blogsPath} passHref>
                  <a>{mainMenuProps.blogs_nav_link_text}</a></Link>
              </li>}
            </ul>
          </div>
        </div>
      
      </div>
    </footer>
  );
  }
declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}