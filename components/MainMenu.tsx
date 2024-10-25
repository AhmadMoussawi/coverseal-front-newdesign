import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState, useCallback, useEffect } from "react";
import { LogoSymbol, Cross, Globe } from "./icons";
import { Color, COUNTRIES } from "../utils/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";
import { Grid } from "@material-ui/core";
interface Props extends MainMenuProps {
  hasSAV: boolean;
  overlayRef: React.RefObject<HTMLDivElement>;
  handleMenuClose: () => void;
}

// TODO: refactor the language logic here, it's disgusting, messy and unreliable
export function MainMenu(props: Props) {
  const { overlayRef, handleMenuClose, faqPath, modelsPath, hasSAV, blogsPath, hasblogs } = props;
  const router = useRouter();
  const { locale, asPath, basePath } = router;
  var [language, country] = locale.split("-");
  if(!country)
  {
    country = "FR"
  }
  const [currentLanguage, setCurrentLanguage] = useState(language || "");
  const [currentLanguageList, setCurrentLanguageList] = useState(() => {
    if (locale === "default") {
      return [];
    }
    return COUNTRIES.find((c) => c.code === country).languages;
  });
  const [currentCountry, setCurrentCountry] = useState(country || "");

  useEffect(() => {
    setCurrentLanguage(language || "");
    setCurrentLanguageList(() => {
      if (locale === "default") {
        return [];
      }
      return COUNTRIES.find((c) => c.code === country).languages;
    });
    setCurrentCountry(country || "");
  }, [language, country]);
 
  const mainMenuItems = useMemo(
    () => [
      {
        key: "the_coverseal",
        href: "/the-coverseal",
      },
      // {
      //   key: "benefits",
      //   href: "/benefits",
      // },
      {
        key: "models",
        href: modelsPath,
      },
      {
        key: "achievements",
        href: "/achievements",
      },
      {
        key: "about_us",
        href: "/about-us",
      },
    ],
    [modelsPath]
  );

   

  const subMenuItems = useMemo(
    () => {
      
      return [
      // {
      //   key: "contact",
      //   href: "/contact",
      // },
      {
        key: "jobs",
        href: "/jobs",
      },
      // {
      //   key: "partnerships",
      //   href: "/partnerships",
      // },
      ...(hasblogs
        ? [
            {
              key: "blogs",
      href: blogsPath,
            },
          ]
        : []),
      {
        key: "faq",
        href: faqPath,
      },
      // ...(hasSAV
      //   ? [
      //       {
      //         key: "after_sale",
      //         href: "/after-sale",
      //       },
      //     ]
      //   : []),
       
      {
        key: "documents",
        href: "/documents",
      },      
      /*{
        key: "reviews",
        href: "/reviews",
      },*/
    ]},
    [faqPath]
  );

  const onCountryChange = useCallback(
    (c: string) => {
      const languages = COUNTRIES.find(
        (country) => country.code === c
      ).languages;
      const locale = `${languages[0].toLocaleLowerCase()}-${c}`;
      document.cookie = `LOCALE=${locale};`;
      if(c.toLowerCase()!=="fr" && (window.location.host.includes("coverseal-stage.fr")||window.location.host.includes("coverseal-stage.fr")))
      {
          window.location.href = "https://coverseal.com/" + locale + (asPath.lastIndexOf("?")>-1?asPath.substring(0,asPath.lastIndexOf("?")):asPath);
      }
      else
      {
        window.location.href=(locale=="default" || locale=="fr"?"/" + locale:"") + (asPath.lastIndexOf("?")>-1?asPath.substring(0,asPath.lastIndexOf("?")):asPath);
      }
      /*router.push(asPath, undefined, {
        locale,
        shallow:false
      });*/
    },
    [asPath]
  );

  const onLanguageChange = useCallback(
    (l) => {
      /*router.push(asPath, undefined, {
        locale: `${l.toLocaleLowerCase()}-${currentCountry}`,
        shallow:false
      });*/
      window.location.href="/" + `${l.toLocaleLowerCase()}` + (asPath.lastIndexOf("?")>-1?asPath.substring(0,asPath.lastIndexOf("?")):asPath);
    },
    [asPath, currentCountry]
  );

  return (
    <div className="overlay-menu hidden">
      <div className="wrapper" ref={overlayRef}>
      <div className="section-container">
          <div className="top">
                <div  className="icon-container" style={{marginRight:"70%"}}>
                        <Link href="/" passHref>
                          <a className="logo"  aria-label="logo">         
                          <LogoSymbol color={Color.TERRA_COTTA} />              
                          </a>
                        </Link>
                </div> 
            <div className="icon-container glob">
                     <Globe color={Color.TERRA_COTTA} />
            </div>               
            <div>
              <LanguageSwitcher
                      list={COUNTRIES}
                      currentValue={currentCountry}
                      onChange={onCountryChange}
                    />
            </div>
            {/*<div>
              
              <LanguageSwitcher
                      list={currentLanguageList.map((language) => ({
                        name: language,
                        code: language,
                      }))}
                      currentValue={currentLanguage.toUpperCase()}
                      onChange={onLanguageChange}
                    />         
              
              </div>*/}
            <div>
              <button className="close-menu-button" title="close menu" onClick={handleMenuClose}>
                    <Cross color={Color.TERRA_COTTA} />
                  </button>
              </div>            
          </div>
          <nav>
            <div className="left" />
           <Grid container spacing={2} >
                <Grid className="not-decorated" item xs={12} sm={6} >
                  <ul className="main-menu">
                    {mainMenuItems.filter(x=>x.href!='').map(({ href, key }) => (
                      <li key={key}>
                        <Link href={href} passHref>
                          <a>{(props as any)[`${key}_main_nav_link_text`]}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>          
                </Grid>
                <Grid className="decorated" item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >                   
                  <ul className="main-menu" >
                      <li >
                        <Link href="/catalog-request" passHref>
                          <a className="brownlink">&nbsp;&nbsp;{(props as any)[`catalogue_main_nav_link_text`]}&nbsp;&nbsp;</a>
                        </Link>
                        <Link href="/price-request" passHref>
                          <a className="brownlink">&nbsp;&nbsp;{(props as any)[`price_request_main_nav_link_text`]}&nbsp;&nbsp;</a>
                        </Link>
                      </li>
                      <li > 
                        <Link href="/before-configurator" passHref>
                          <a className="brownlink">&nbsp;&nbsp;{(props as any)[`configurator_main_nav_link_text`]}&nbsp;&nbsp;</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/partnerships" passHref>
                          <a className="brownlink">&nbsp;&nbsp;{(props as any)[`partnerships_main_nav_link_text`]}&nbsp;&nbsp;</a>
                        </Link>
                      </li>
                     {hasSAV && <li>
                        <Link href="/after-sale" passHref>
                          <a className="brownlink">&nbsp;&nbsp;{(props as any)[`after_sale_main_nav_link_text`]}&nbsp;&nbsp;</a>
                        </Link>
                      </li>}
                    
                  </ul>         
                </Grid>
           </Grid> 
          </nav>
          
           
            <div className="bottom">
            
            
            <ul className="sub-menu" style={{justifyContent:"flex-start"}}>
              {subMenuItems.map(({ key, href }) => {
                if(key!="blogs")
                {
                return (
               <> <li key={key} data-item={key}>
                  <Link href={href} passHref>
                    <a className="link-underline" style={{fontFamily:"Lexend", letterSpacing: "2px", whiteSpace:"nowrap"}}> 
                      {(props as any)[`${key}_main_nav_link_text`] ||
                        (props as any)[`${key}_nav_link_text`]}                        
                    </a>
                  </Link>
                  
                </li>
                <li><span className="dots"></span></li>
                </>
              )
                }
                else{
                  return (
                    <><li key={key} data-item={key}>
                        <a href={"/" + locale + href} className="link-underline" style={{fontFamily:"Lexend", letterSpacing: "2px", whiteSpace:"nowrap"}}>
                          {(props as any)[`${key}_main_nav_link_text`] ||
                            (props as any)[`${key}_nav_link_text`]}
                        </a>
                        
                    </li>
                    <li><span className="dots" ></span></li>
                    </>
                  )
                }
            })}
            </ul>
       
          </div>
          <div className="bottom">
            <br/>
          </div>
        </div>

        <div className="section-container-mobile">
          <div className="top">
                <div  className="icon-container" style={{marginTop:"0px"}}>
                        <Link href="/" passHref>
                          <a className="logo"  aria-label="logo">         
                          <LogoSymbol color={Color.TERRA_COTTA} />              
                          </a>
                        </Link>
                </div> 
            <div>
              <button className="close-menu-button" title="close menu" onClick={handleMenuClose}>
                    <Cross color={Color.TERRA_COTTA} />
                  </button>
              </div>
          </div>
          <nav>
            <div className="left" />
           <Grid container spacing={2} >
                <Grid className="not-decorated" item xs={12} lg={6}  >
                  <ul className="main-menu first-menu" >
                        <li >
                          <Link href="/catalog-request" passHref>
                            <a className="brownlink" style={{margin:"0px"}}>&nbsp;&nbsp;{(props as any)[`catalogue_main_nav_link_text`]}&nbsp;&nbsp;</a>
                          </Link>
                          <Link href="/price-request" passHref>
                            <a className="brownlink" style={{margin:"0px", marginLeft:"10px"}}>&nbsp;&nbsp;{(props as any)[`price_request_main_nav_link_text`]}&nbsp;&nbsp;</a>
                          </Link>
                        </li>
                        <li > 
                          <Link href="/before-configurator" passHref>
                            <a className="brownlink" style={{backgroundColor:"var(--color-terra-cotta)", borderRadius:"40px", color:"white", margin:"0px", fontSize:"smaller"}}>&nbsp;&nbsp;{(props as any)[`configurator_main_nav_link_text`]}&nbsp;&nbsp;</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/partnerships" passHref>
                            <a className="brownlink" style={{backgroundColor:"var(--color-terra-cotta)", borderRadius:"40px", color:"white", margin:"0px", fontSize:"smaller"}}>&nbsp;&nbsp;{(props as any)[`partnerships_main_nav_link_text`]}&nbsp;&nbsp;</a>
                          </Link>
                        </li>
                      {hasSAV && <li>
                          <Link href="/after-sale" passHref>
                            <a className="brownlink" style={{backgroundColor:"var(--color-terra-cotta)", borderRadius:"40px", color:"white", margin:"0px", fontSize:"smaller"}}>&nbsp;&nbsp;{(props as any)[`after_sale_main_nav_link_text`]}&nbsp;&nbsp;</a>
                          </Link>
                        </li>}
                      
                    </ul> 
                          
                </Grid>
                <Grid className="decorated" item xs={12} lg={6} >                   
                  <ul className="main-menu">
                    {mainMenuItems.filter(x=>x.href!='').map(({ href, key }) => (
                      <li key={key}>
                        <Link href={href} passHref>
                          <a>{(props as any)[`${key}_main_nav_link_text`]}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>    
                </Grid>
           </Grid>  
          </nav>
          <div className="bottom" style={{marginTop:"10px"}}>
            <ul className="sub-menu" >
              {subMenuItems.map(({ key, href }) => {
                if(key!="blogs")
                {
                return (
                <><li key={key} data-item={key}>
                  <Link href={href} passHref>
                    <a className="link-underline" style={{fontFamily:"Lexend", letterSpacing: "0px", whiteSpace:"nowrap", marginRight:"0px"}}> 
                      {(props as any)[`${key}_main_nav_link_text`] ||
                        (props as any)[`${key}_nav_link_text`]}                        
                    </a>
                  </Link>
                  
                </li>
                <li><span className="dots"> </span></li>
                </>
              )
                }
                else{
                  return (
                    <><li key={key} data-item={key}>
                        <a href={"/" + locale + href} className="link-underline" style={{fontFamily:"Lexend", letterSpacing: "0px", whiteSpace:"nowrap", marginRight:"0px"}}>
                          {(props as any)[`${key}_main_nav_link_text`] ||
                            (props as any)[`${key}_nav_link_text`]}
                        </a>
                    </li><li><span className="dots"></span></li></>
                  )
                }
            })}
            </ul>
            
          </div>
          <div className="bottom" style={{marginLeft:"27%", justifyContent:"space-between", width:"45%", display: "flex", marginTop:"0px"}}>
          <div className="icon-container globe">
                     <Globe color={Color.TERRA_COTTA} />
            </div>               
            <div style={{marginRight:"5px"}}>
              <LanguageSwitcher
                      list={COUNTRIES}
                      currentValue={currentCountry}
                      onChange={onCountryChange}
                    />
            </div>
            {/*<div>
              <LanguageSwitcher
                      list={currentLanguageList.map((language) => ({
                        name: language,
                        code: language,
                      }))}
                      currentValue={currentLanguage.toUpperCase()}
                      onChange={onLanguageChange}
                    />  
              </div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
