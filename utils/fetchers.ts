import { Directus } from "@directus/sdk";
import slugify from "slugify";
import { API_ROOT } from "../utils/constants";
import { getLocale } from "../utils/locale";

export class Fetcher {
  public directus: Directus<Collections>;

  constructor() {
    this.directus = new Directus<Collections>(API_ROOT);
  }

  public fetchCollection = <T extends AllTranslation>(
    collection: string,
    locale: string = "en-GB"
  ): Promise<T> =>
    this.directus.transport
      .get(`/items/${collection}?fields=*.*`)
      ?.then((res) => {
        if(!locale.includes('-'))
        {
          locale += "-FR"
        }
        return Object.entries(res.data).reduce(
          (acc: IAnyObject, [key, value]: any) => {
            if (key === "id") {
              return acc;
            }

            if (key === "translations") {
              const translation = value.find(
                (translation: Partial<T>) =>
                  translation.languages_code === locale
              );
              Object.entries(translation).forEach(([key, value]) => {
                acc[key] = value;
              });
              return acc;
            }

            acc[key] = value;
            return acc;
          },
          {}
        ) as T;
      });
}

export async function getAllPagePropsOnly(
  fetcher: Fetcher,
  locale: string = "en-GB"
): Promise<AllPageProps> {
  if(!locale.includes('-'))
    {
      locale += "-FR"
    }
  const cmsLocale = getLocale(locale);
  
  const {
    // footer
    contact_link_text,
    newsletter_text,
    newsletter_placeholder,
    privacy_policy_link_text,
    terms_and_conditions_link_text,
    youtube_link,
    linkedin_link,
    facebook_link,
    instagram_link,
    enable_canonicals,
    footer_cookies_policy_link_text,
    footer_manage_cookies_consent_link_text,    
    cookies_banner_text,
    cookies_banner_title,
    personalize_settings_btn,
    rejectall_btn,
    acceptall_btn,
    cookies_popup_title,
    cookies_generic_description,
    cookies_manage_consent_title,
    strictly_necessary_cookies_title,
    strictly_necessary_cookies_description,
    strictly_necessary_cookies_alwaysactive,
    analytical_cookies_title,
    analytical_cookies_description,
    targeting_cookies_title,
    targeting_cookies_description,
    accept_my_choice_btn,
    banner_cookies_policy_link_text,
    // forms
    countries,
    user_come_from_label,
    user_come_from_options,
    catalog_checkbox_label,
    price_request_title,
    catalog_request_title,
    full_name_label,
    first_name_label,
    coverseal_reference_number_label,
    coverseal_reference_number_tooltip,
    last_name_label,
    phone_label,
    mail_label,
    mail_confirmation_label,
    demand_label,
    zip_code_label,
    company_name_label,
    contact_person_label,
    country_label,
    submit_text,
    validate_text,
    price_request_label,
    problem_description_label,
    add_photos_label,
    after_sale_title,
    message_label,
    pool_width_label,
    pool_length_label,
    coverseal_type_label,
    after_sale_sentence,
    wrong_email,
    wrong_email_confirmation,
    wrong_zip,
    wrong_phone,
    add_documents_label,
    address_label,
    city_label,
    gdpr_checkbox_label,
    confidentiality_checkbox_label,
    current_pool_specialist_label,
    // main menu
    menu_hamburger_text,
    the_coverseal_main_nav_link_text,
    benefits_main_nav_link_text,
    models_main_nav_link_text,
    achievements_main_nav_link_text,
    about_us_main_nav_link_text,
    contact_main_nav_link_text,
    jobs_main_nav_link_text,
    partnerships_main_nav_link_text,
    faq_main_nav_link_text,
    after_sale_main_nav_link_text,
    documents_nav_link_text,
    reviews_nav_link_text,
    blogs_nav_link_text,
    catalogue_main_nav_link_text,
    price_request_main_nav_link_text,
    configurator_main_nav_link_text,
    // side nav
    catalog_side_nav_link_text,
    price_request_side_nav_link_text,
    configurator_side_nav_link_text,
    after_sale_side_nav_link_text,
    newsletter_subscribe_link_text,
    partnerships_side_nav_link_text,
    // form messages
    country_help_text,
    partnerships_success_title,
    partnerships_success_paragraph,
    partnerships_success_cta,
    price_request_success_title,
    price_request_success_paragraph,
    price_request_success_cta,
    catalog_request_success_title,
    catalog_request_success_paragraph,
    catalog_request_success_cta,
    after_sale_success_title,
    after_sale_success_paragraph,
    after_sale_success_cta,
    success_content,
    success_title,
    error_title,
    error_content,
    // country content
    country_image,
    country_main_text,
    country_button_text,
  } = await fetcher.fetchCollection<GlobalContent>("global", cmsLocale);
var s = "";
var canonicallocale = "";
  const faqCategories = await fetcher.directus
    .items<string, FAQCategoryDirectus>("faq_categories")
    .readMany({
      fields: ["translations.name", "id"],
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
    .then((res) => res.data.filter((item) => item.translations.length));

    
  const models = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readMany({
      fields: ["id", "translations.*"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },            
          "published":{
            _eq:true
          }
          },
        } as any,
      },
    })
    .then((res) => res.data);
    const blogTemplateProps = await getPageContentProps<BlogsContent>(
      fetcher,
      "blogs_template",
      locale
    )
    try{
    var [language, countryS] = locale.split("-");
    if(!countryS)
      {
        countryS = "FR";
      }
    var hasblogs = false;
    const countrydb = await fetcher.directus
.items<string, CountriesDirectus>("countries")
.readMany({
fields: ["id", "translations.*", "code"],
filter:{
code:{
_eq:countryS
}
}

})
.then((res) => res.data);
const canonicals = await fetcher.directus
.items<string, CanonicalSettings>("canonical_settings")
.readMany({
fields: ["id", "country.code", "languages"],
filter:{
languages:{
_eq:language
}
}

})
.then((res) => res.data);

if(canonicals.length>0)
{
  canonicallocale = canonicals[0].languages + "-" + canonicals[0].country.code;
}
    hasblogs = blogTemplateProps.pageProps.allowed_countries.filter(x=>countrydb.length>0 && x.countries_id == countrydb[0].id).length>0;
}
catch{}
  const faqPath = `/faq/${faqCategories[0].id}/${slugify(
    faqCategories[0].translations[0].name,
    {
      lower: true,
    }
  )}`;
  const blogsPath = `/conseils-pratiques/all`;
  var filteredmodels = models.filter(x=>x.translations && x.translations.length>0);
  var modelsPath ='';
  if(filteredmodels && filteredmodels.length>0)
  modelsPath = `/models/${filteredmodels[0].id}/${slugify(
    filteredmodels[0].translations[0].main_title,
    {
      lower: true,
    }
  )}`;

  var [_language, country] = locale.split("-");
  if(!country)
  {
    country = "FR";
  }
  const hasSAV = (() => {
    switch (country) {
      case "BE":
      case "FR":
      case "NL":
      case "LU":
        return true;
      case "DE":
      case "AT":
      case "CH":
      case "ES":
      case "IL":
      case "GB":
      case "NO":
      case "SE":
      case "FI":
      case "DK":
      case "EASTEUROPE":
      case "AFRICA":
      case "AMERICAS":
        return false;
      default:
        return false;
    }
  })();

  const hasConfigurator = (() => {
    switch (country) {
      case "BE":
      case "FR":
        return true;
      case "LU":
      case "DE":
      case "AT":
      case "CH":
      case "ES":
      case "IL":
      case "GB":
      case "NO":
      case "SE":
      case "FI":
      case "DK":
      case "EASTEUROPE":
      case "AFRICA":
      case "AMERICAS":
        return false;
      default:
        return false;
    }
  })();

  return {
    layoutProps: {
      hasSAV,
      hasConfigurator,
      canonicallocale,
      topBarProps: {
        hasSAV,
        mainMenuProps: {
          faqPath,
          blogsPath,
          hasblogs,
          modelsPath,
          menu_hamburger_text,
          the_coverseal_main_nav_link_text,
          benefits_main_nav_link_text,
          models_main_nav_link_text,
          achievements_main_nav_link_text,
          about_us_main_nav_link_text,
          contact_main_nav_link_text,
          jobs_main_nav_link_text,
          partnerships_main_nav_link_text,
          faq_main_nav_link_text,
          after_sale_main_nav_link_text,
          documents_nav_link_text,
          reviews_nav_link_text,
          blogs_nav_link_text,
          catalogue_main_nav_link_text,
          price_request_main_nav_link_text,
          configurator_main_nav_link_text,
        },
      },
      footerProps: {
        newsletter_placeholder,
        contact_link_text,
        newsletter_text,
        privacy_policy_link_text,
        terms_and_conditions_link_text,
        newsletter_subscribe_link_text,
        youtube_link,
        linkedin_link,
        facebook_link,
        instagram_link,
        wrong_email,
        enable_canonicals,
        footer_cookies_policy_link_text,
        footer_manage_cookies_consent_link_text,
        cookies_banner_text,
        cookies_banner_title,
        personalize_settings_btn,
        rejectall_btn,
        acceptall_btn,
        cookies_popup_title,
        cookies_generic_description,
        cookies_manage_consent_title,
        strictly_necessary_cookies_title,
        strictly_necessary_cookies_description,
        strictly_necessary_cookies_alwaysactive,
        analytical_cookies_title,
        analytical_cookies_description,
        targeting_cookies_title,
        targeting_cookies_description,
        accept_my_choice_btn,
        banner_cookies_policy_link_text
      },
      //seoProps,
      seoProps: {
        seo_title: "",
        seo_description: "",
        opengraph_description: "",
        opengraph_image: "",
      },
      sideNavProps: {
        hasSAV,
        canonicallocale,
        hasConfigurator,
        catalog_side_nav_link_text,
        price_request_side_nav_link_text,
        configurator_side_nav_link_text,
        after_sale_side_nav_link_text,
        partnerships_side_nav_link_text,
      },
      countryProps: {
        country_image,
        country_main_text,
        country_button_text,
      },
    },
    globalSection: {
      priceRequest: {
        user_come_from_label,
        user_come_from_options,
        countries,
        catalog_checkbox_label,
        price_request_title,
        catalog_request_title,
        full_name_label,
        first_name_label,
        last_name_label,
        phone_label,
        mail_label,
        mail_confirmation_label,
        demand_label,
        zip_code_label,
        country_label,
        submit_text,
        validate_text,
        price_request_label,
        wrong_email,
        wrong_email_confirmation,
        wrong_zip,
        wrong_phone,
        address_label,
        city_label,
        add_documents_label,
        message_label,
        gdpr_checkbox_label,
        confidentiality_checkbox_label,
        current_pool_specialist_label,
        pool_width_label,
        pool_length_label, coverseal_reference_number_label,
        coverseal_reference_number_tooltip,
        company_name_label,
        contact_person_label
      },
      afterSale: {
        countries,
        country_label,
        problem_description_label,
        add_photos_label,
        full_name_label,
        first_name_label,
        coverseal_reference_number_label,
        coverseal_reference_number_tooltip,
        last_name_label,
        phone_label,
        mail_label,
        mail_confirmation_label,
        submit_text,
        validate_text,
        after_sale_title,
        after_sale_sentence,
        message_label,
        coverseal_type_label,
        modelList: models as SingleModelDirectus[],
        wrong_email,
        wrong_email_confirmation,
        wrong_zip,
        wrong_phone,
        gdpr_checkbox_label,
        confidentiality_checkbox_label,
        address_label,
        city_label,
        zip_code_label,
        company_name_label,
        contact_person_label
      },
      formsMessages: {
        country_help_text,
        partnerships_success_title,
        partnerships_success_paragraph,
        partnerships_success_cta,
        price_request_success_title,
        price_request_success_paragraph,
        price_request_success_cta,
        catalog_request_success_title,
        catalog_request_success_paragraph,
        catalog_request_success_cta,
        after_sale_success_title,
        after_sale_success_paragraph,
        after_sale_success_cta,
        success_content,
        success_title,
        error_title,
        error_content,
      },
      footer:{
        contact_link_text,
  newsletter_text,
  newsletter_placeholder,
  privacy_policy_link_text,
  terms_and_conditions_link_text,
  newsletter_subscribe_link_text,
  facebook_link,
  linkedin_link,
  instagram_link,
  youtube_link,
  wrong_email,
  enable_canonicals,
  cookies_banner_text,
  cookies_banner_title,
  personalize_settings_btn,
  rejectall_btn,
  acceptall_btn,
  cookies_popup_title,
  cookies_generic_description,
  cookies_manage_consent_title,
  strictly_necessary_cookies_title,
  strictly_necessary_cookies_description,
  strictly_necessary_cookies_alwaysactive,
  analytical_cookies_title,
  analytical_cookies_description,
  targeting_cookies_title,
  targeting_cookies_description,
  accept_my_choice_btn,
  banner_cookies_policy_link_text,
  footer_cookies_policy_link_text,			
  footer_manage_cookies_consent_link_text
      }
    }
  };
}
export const getGuestSuiteContent = async(
  locale: string = "en-GB",
  page = 0
) =>{
  if(!locale.includes('-'))
    {
      locale += "-FR"
    }
  const cmsLocale = getLocale(locale);

  
  
  var [_language, country] = locale.split("-");
  if(!country)
    {
      country = "FR";
    }
  var reviews = [];
  try{
  const res = await fetch("https://wire.guest-suite.com/rest/reviews.json?access_token=xlLQipaxg7aELTft&page=" + page);
  const data = await res.json();
  reviews = data.reviews.filter(x=>x.language_code.toLowerCase() == _language);
  page = data.page;
  }
  catch(ex){}
  return {reviews:reviews, page:page};
}
export async function getPageContentProps<T extends AllPageContent>(
  fetcher: Fetcher,
  collection: string,
  locale: string = "en-GB"
): Promise<PagePropsOnly<T>> {
  if(!locale.includes('-'))
    {
      locale += "-FR"
    }
  const cmsLocale = getLocale(locale);

  const collectionContent = await fetcher.fetchCollection<T>(
    collection,
    cmsLocale
  );

  const seoProps = {
    seo_title: collectionContent.seo_title,
    seo_description: collectionContent.seo_description,
    opengraph_description: collectionContent.opengraph_description,
    opengraph_image: collectionContent.opengraph_image || null,
  };

  return {
    pageProps: collectionContent,
    seoProps,
  };
}
