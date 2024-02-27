import { GetStaticProps } from "next";
import { WysiwygTemplate } from "../components/WysiwygTemplate";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../utils/fetchers";

export default WysiwygTemplate;

export const getStaticProps: GetStaticProps<PageProps<WysiwygPageContent>> =
  async ({ locale, locales }) => {
    const fetcher = new Fetcher();

    const allPageProps = await getAllPagePropsOnly(fetcher, locale);
    const pageProps = await getPageContentProps<WysiwygPageContent>(
      fetcher,
      "privacy_policy_template",
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
