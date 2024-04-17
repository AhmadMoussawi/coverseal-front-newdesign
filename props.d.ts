interface LanguageSwitcherProps {
  currentValue: string;
  list: any[];
  onChange: (value: string) => void;
}

interface TopBarProps {
  mainMenuProps: MainMenuProps;
  hasSAV: boolean;
}

interface MainMenuProps extends MainMenuContent {
  faqPath: string;
  modelsPath: string;
  blogsPath:string;
  hasblogs:bool;
}

interface CountrySectionProps extends CountryContent {}

interface SEOProps {
  seo_title: string;
  seo_description: string;
  opengraph_description: string;
  opengraph_image: string | null;
}

interface LayoutProps {
  hasSAV: boolean;
  canonicallocale:string | undefined;
  hasConfigurator: boolean;
  topBarProps: TopBarProps;
  footerProps: FooterContent;
  seoProps: SEOProps;
  sideNavProps: SideNavContent;
  countryProps: CountrySectionProps;
}

interface AllPageProps {
  layoutProps: LayoutProps | undefined;
  globalSection: {
    priceRequest: PriceRequestSectionContent;
    afterSale: AfterSaleSectionContent;
    formsMessages: FormMessagesContent;
    footer:FooterContent;
  } | undefined;
}

interface PagePropsOnly<T> {
  pageProps: T;
  seoProps: SEOProps;
}

interface PageProps<T> extends AllPageProps, PagePropsOnly<T> {

}
