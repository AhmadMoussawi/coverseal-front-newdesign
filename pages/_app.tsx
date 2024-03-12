import { useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/router";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {ReactNotifications} from "react-notifications-component";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import type { AppProps /*, AppContext */ } from "next/app";
import Layout from "../components/Layout";
import "../styles/main.scss";
import { hostname  } from "os";
gsap.registerPlugin(ScrollTrigger);

// TODO: use an ease for this appearing anim
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  useEffect(() => {
    const currentDomain = window.location.host;
    setDomain(currentDomain);
    const loader = document.querySelector<HTMLDivElement>(".initial-loader");
    const skipButton = loader.querySelector(".link-underline");
    const PUBLIC_FILE = /\.(.*)$/;
    //implement middleware here
    
    if(router.asPath === "/" && router.locale==="default" && document.cookie.includes("LOCALE="))
    {
      console.log(document.cookie);
      var locale = getCookie("LOCALE");
      
      window.location.href = "/" + locale;
      
      //router.push("/" + router.locale);
    }
    if (
      router.asPath === "/" &&
      router.locale === "default"
    ) {
      //window.location.href = "/country";
      router.push("/country");
    }
    if(router.locale.includes("-"))
      {
        var c = router.locale.split('-')[1];
        if(c.toLowerCase()!="fr" && (window.location.host.includes("coverseal-stage.fr")||window.location.host.includes("coverseal.fr")))
        {
          window.location.href = "https://coverseal.com/" + router.locale;
        }
      }
    //end of implement middleware here
    if (document.cookie.includes("VISITED=true")) {
      loader.style.display = "none";
    } else {
      disableBodyScroll(loader);
    }
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    const closeIntroScreen = () => {
      gsap
        .to(loader, {
          x: "-100%",
        })
        .then(() => {
          loader.style.display = "none";
          document.cookie = `VISITED=true; expires=${new Date(
            Date.now() + 12096e5
          ).toString()};`;
        });
      enableBodyScroll(loader);
    };

    const timeOutId = setTimeout(closeIntroScreen, 6000);
    skipButton.addEventListener("click", () => {
      closeIntroScreen();
      clearTimeout(timeOutId);
    });

    gsap.fromTo(".side-nav li", { x: 80 }, { x: 0, stagger: 0.2, delay: 0.5 });
    // gsap.fromTo(
    //   ".open-menu-button",
    //   { y: "-200%" },
    //   { y: 0, delay: 0.5, clearProps: "all" }
    // );
  }, []);
  return (<Layout
      {...pageProps.layoutProps}
      seoProps={pageProps.seoProps}
      formsMessages={pageProps.globalSection.formsMessages}
      canonicalSettings={pageProps.globalSection.canonicalSettings}
    >
      <ReactNotifications />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  )
  return {
    props: {
    },
  }
}