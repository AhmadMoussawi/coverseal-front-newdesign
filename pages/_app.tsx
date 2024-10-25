import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "../styles/main.scss";

import { ReactNotifications } from "react-notifications-component";
// Import non-critical components dynamically
const Layout = dynamic(() => import('../components/Layout'), { ssr: false });

// Utility function to get a cookie value
const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (const cookie of cookies) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(name)) {
      return trimmedCookie.substring(name.length);
    }
  }
  return "";
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      const currentDomain = window.location.host;
      if (router.asPath === "/" && router.locale === "default") {
        if (document.cookie.includes("LOCALE=")) {
          const locale = getCookie("LOCALE");
          router.push(`${(locale!="default" && locale!="fr"?"/" + locale:"")}`);
        } else {
          router.push("/country");
        }
      } else if (router.locale.includes("-")) {
        const [, region] = router.locale.split('-');
        if (region.toLowerCase() !== "fr" && currentDomain.includes("coverseal-stage.fr")) {
          window.location.href = `https://www.coverseal.com/${router.locale}`;
        }
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <>
      <Layout
        {...pageProps.layoutProps}
        seoProps={pageProps.seoProps}
        formsMessages={pageProps.globalSection.formsMessages}
        canonicalSettings={pageProps.globalSection.canonicalSettings}
      >
        <ReactNotifications />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  return { props: {} };
}
