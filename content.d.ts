interface FooterContent {
  contact_link_text: string;
  newsletter_text: string;
  newsletter_placeholder: string;
  privacy_policy_link_text: string;
  terms_and_conditions_link_text: string;
  newsletter_subscribe_link_text: string;
  facebook_link: string;
  linkedin_link: string;
  instagram_link: string;
  youtube_link: string;
  wrong_email: string;
  enable_canonicals:boolean;
  cookies_banner_text:string;
  cookies_banner_title:string;
  personalize_settings_btn:string;
  rejectall_btn:string;
  acceptall_btn:string;
  cookies_popup_title:string;
  cookies_generic_description:string;
  cookies_manage_consent_title:string;
  strictly_necessary_cookies_title:string;
  strictly_necessary_cookies_description:string;
  strictly_necessary_cookies_alwaysactive:string;
  analytical_cookies_title:string;
  analytical_cookies_description:string;
  targeting_cookies_title:string;
  targeting_cookies_description:string;
  accept_my_choice_btn:string;
  banner_cookies_policy_link_text:string;
  footer_cookies_policy_link_text:string;				
  footer_manage_cookies_consent_link_text:string;
}
interface CanonicalSettings{
  id:number;
  languages:string;
  country:{code:string};
}
interface MainMenuContent {
  menu_hamburger_text: string;
  the_coverseal_main_nav_link_text: string;
  benefits_main_nav_link_text: string;
  models_main_nav_link_text: string;
  achievements_main_nav_link_text: string;
  about_us_main_nav_link_text: string;
  contact_main_nav_link_text: string;
  jobs_main_nav_link_text: string;
  partnerships_main_nav_link_text: string;
  faq_main_nav_link_text: string;
  after_sale_main_nav_link_text: string;
  documents_nav_link_text: string;
  reviews_nav_link_text: string;
  blogs_nav_link_text:string;
}

interface SideNavContent {
  hasConfigurator: boolean;
  hasSAV: boolean;
  canonicallocale:string | undefined;
  catalog_side_nav_link_text: string;
  price_request_side_nav_link_text: string;
  configurator_side_nav_link_text: string;
  after_sale_side_nav_link_text: string;
  partnerships_side_nav_link_text: string;
}

interface GlobalFormContent {
  countries: { name: string; code: string }[];
  full_name_label: string;
  first_name_label:string;
  last_name_label:string;
  coverseal_reference_number_label:string;
  mail_label: string;
  mail_confirmation_label: string;
  phone_label: string;
  submit_text: string;
  wrong_email: string;
  wrong_email_confirmation: string;
  wrong_phone: string;
  message_label: string;
  confidentiality_checkbox_label: string;
  gdpr_checkbox_label: string;
  zip_code_label: string;
  address_label: string;
  city_label: string;
  country_label: string;
  wrong_zip:string;
  company_name_label:string;
  contact_person_label:string;
}

interface AfterSaleSectionContent extends GlobalFormContent {
  after_sale_title: string;
  after_sale_sentence: string;
  problem_description_label: string;
  add_photos_label: string;
  coverseal_type_label: string;
  modelList: SingleModelDirectus[];
}

interface PriceRequestSectionContent extends GlobalFormContent {
  user_come_from_label: string;
  user_come_from_options: { name: string; code: string }[];
  catalog_checkbox_label: string;
  price_request_title: string;
  catalog_request_title: string;
  demand_label: string;
  price_request_label: string;
  add_documents_label: string;
  pool_width_label: string;
  pool_length_label: string;
  current_pool_specialist_label: string;
}

interface FormMessagesContent {
  country_help_text: string;
  partnerships_success_title: string;
  partnerships_success_paragraph: string;
  partnerships_success_cta: string;
  price_request_success_title: string;
  price_request_success_paragraph: string;
  price_request_success_cta: string;
  catalog_request_success_title: string;
  catalog_request_success_paragraph: string;
  catalog_request_success_cta: string;
  after_sale_success_title: string;
  after_sale_success_paragraph: string;
  after_sale_success_cta: string;
  success_title: string;
  error_title: string;
  error_content: string;
  success_content: string;
}

interface GlobalContent
  extends PriceRequestSectionContent,
    AfterSaleSectionContent,
    FooterContent,
    MainMenuContent,
    SideNavContent,
    FormMessagesContent,
    CountryContent {
  languages_code: string;
}

interface AllPageContent {
  id: number;
  languages_code: string;
  seo_title: string;
  seo_description: string;
  opengraph_description: string;
  main_title: string;
  image:DirectusImage;
  opengraph_image: string;
}

interface AllPageContentNonTranslated {
  opengraph_image: string;
}

interface AllTranslation {
  languages_code: string;
}

interface AfterSaleContent extends AllPageContent {}
interface PriceRequestContent extends AllPageContent {}
interface CatalogRequestContent extends AllPageContent {
  image:DirectusImage;
  form_title:string;
  description:string;
}

interface BeforeConfiguratorTranslation extends AllPageContent {
  main_paragraph: string;
  configurator_link_text: string;
  start_sentence: string;
  content_step_1: string;
  content_step_2: string;
  content_step_3: string;
  content_step_4: string;
  content_step_5: string;
  content_step_6: string;
  content_step_7: string;
  configurator_last_link_text: string;
  models_link_text: string;
  help_sentence: string;
  contact_link_text: string;
  image:string;
}

interface CountryContent {
  country_image: DirectusImage;
  country_main_text: string;
  country_button_text: string;
}

interface ContactContent extends AllPageContent {
  after_sale_mail_de: string;
  after_sale_mail_en: string;
  main_paragraph: string;
  price_request_title: string;
  price_request_paragraph: string;
  price_request_link_text: string;
  catalog_title: string;
  catalog_paragraph: string;
  catalog_link_text: string;
  after_sale_service_title: string;
  after_sale_service_paragraph: string;
  after_sale_service_link_text: string;
  faq_link_text: string;
}

interface DocumentsTemplateTranslation extends AllPageContent {
  main_paragraph: string;
  files: {
    id: number;
    directus_files_id: DirectusImage;
  }[];
}

interface DocumentsTemplateDirectus {
  translations: DocumentsTemplateTranslation[];
}

interface PageNotFoundContent extends AllPageContent {
  back_to_home_link_text: string;
}

interface WysiwygPageContent extends AllPageContent {
  back_to_home_link_text: string;
  content: string;
}

interface AboutUsContent extends AllPageContent {
  main_paragraph: string;
  history_title: string;
  history_paragraph: string;
  company_title: string;
  company_paragraph: string;
  network_title: string;
  network_paragraph: string;
  partnership_link_text: string;
  the_coverseal_link_text: string;
  achievements_link_text: string;
  history_image: string;
  history_image_2: string;
  company_image: DirectusImage;
  company_image_2: string;
  company_image_3: string;  
  company_image_4: DirectusImage;
}
interface CookiesPolicyContent extends AllPageContent{
  title:string;
  text:string;
}
interface FAQContent extends AllPageContent {
  search_placeholder: string;
  models_link_text: string;
  result_text: string;
  no_result_text: string;
}

interface DirectusImage {
  id: string;
  title: string;
  filename_download: string;
  filename_disk:string;
}

// pages

interface TheCoversealContent extends AllPageContent {
  certificate_image: DirectusImage;
  comfort_image: DirectusImage;
  comfort_image_2: DirectusImage;
  discretion_image: string;
  discretion_image_2: string;
  discretion_image_3: string;
  main_paragraph: string;
  certificate_title: string;
  certificate_paragraph: string;
  comfort_title: string;
  comfort_paragraph: string;
  models_link_text: string;
  discretion_title: string;
  discretion_paragraph: string;
  gallery_link_text: string;
  why_coverseal_title: string;
  benefits_link_text: string;
  faq_link_text: string;
}

interface BenefitsContent extends AllPageContent {
  security_title: string;
  security_paragraph: string;
  water_quality_title: string;
  security_home_description: string;
  water_quality_home_description :string;
  isolation_home_description:string;
  water_quality_paragraph: string;
  isolation_title: string;
  isolation_paragraph: string;
  models_link_text: string;
  security_image: string;
  water_quality_image: DirectusImage;
  isolation_image: string;
  distributor_title: string;
  distributor_paragraph: string;
  distributor_link_text: string;
  dealer_title: string;
  dealer_paragraph: string;
  dealer_link_text: string;
  lead_title: string;
  lead_paragraph: string;
  lead_link_text: string;
}
interface ReviewsContent extends AllPageContent {
  title: string;
  subtitle: string;
  description: string;
  Photo: DirectusImage;
}

interface PartnershipsContent extends AllPageContent {
  partnerships_image: string;
  main_title: string;
  main_paragraph: string;
  distributor_title: string;
  distributor_paragraph: string;
  distributor_link_text: string;
  dealer_title: string;
  dealer_paragraph: string;
  dealer_link_text: string;
  lead_title: string;
  lead_paragraph: string;
  lead_link_text: string;
  gallery_link_text: string;
  faq_link_text: string;
  security_title: string;
  security_paragraph: string;
  water_quality_title: string;
  water_quality_paragraph: string;
  isolation_title: string;
  isolation_paragraph: string;
  security_image: DirectusImage;
  water_quality_image: DirectusImage;
  isolation_image: DirectusImage;
}

interface PartershipsFormContent extends AllPageContent {
  distributor_type: string;
  dealer_type: string;
  lead_type: string;
  type_label: string;
}

interface HomeContent extends AllPageContent {
  video_mobile_placeholder: DirectusImage;
  coverseal_image: string;
  coverseal_image_2: string;
  realisations_title:string;
  realisations_description:string;
  realisations_image:DirectImage;
  realisations_link_text:string;
  models_image:DirectusImage;
  benefits_image: string;
  main_title: string;
  coverseal_title: string;
  devis_title:string;

devis_link_text:string;
partenaire_title:string;

partenair_link_text:string;
  about_image:DirectusImage;
  about_title:string;
  about_description:string;
  about_link_text:string;
  coverseal_paragraph: string;
  coverseal_link_text: string;
  gallery_link_text: string;
  models_title: string;
  models_link_text: string;
  models_paragraph: string;
  models_image:string;
  configurator_link_text: string;
  scroll_down_link_text: string;
  video_link_text: string;
  readmore:string;
}

interface SingleModelTranslation extends AllPageContent {
  languages_code: string;
  product_description: string;
  technical_information: { text: string }[];
  technical_info_file: DirectusImage;
  user_manual_file: DirectusImage;
  customization_title: string;
  customization_paragraph: string;
  membrane_title: string;
  membrane_paragraph: string;
  dressing_title: string;
  dressing_paragraph: string;
  options_title: string;
  options_paragraph: string;
  options_items: { option_name: string; option_text: string }[];    
  published:boolean;
  home_title:sting;
  home_link_text:string;
}

interface SingleModelDirectus extends AllPageContentNonTranslated {
  id: number;
  reference: string;
  home_image: string;
  product_image: string;
  product_image_2: string;
  translations: SingleModelTranslation[];
  membrane_colors: { color_name: string; color_code: string }[];
  dressing_image: string;
  options_images: string;
}

interface ModelsContent extends AllPageContent {
  main_paragraph: string;
  technical_information_title: string;
  technical_info_file_text: string;
  user_manual_file_text: string;
  configurator_link_text: string;
  achievements_link_text: string;
  customization_configurator_link_text: string;
  last_configurator_link_text: string;
  scroll_down_link_text: string;
}

// achievements

interface AchievementsContent extends AllPageContent {
  back_to_achievements: string;
  next_coverseal: string;
  models_link_text: string;
}
interface BlogsContent extends AllPageContent {
  back_to_blogs:string;
  next_coverseal: string;
  related_blogs_text:string;
  search_placeholder:string;
  result_text: string;
  no_result_text: string;
  header_image:DirectusImage;
  all:string;
  readmore:string,
  allowed_countries:BlogCountiesDirectus[]
}
interface BlogCategoryDirectus {
  id: number;
  translations: {
    languages_code: string;
    name: string;
  }[];
  hasblogs?:bool;
}
interface BlogAuthorDirectus {
  id: number;
  name:string;
  url:string;
}
interface SingleAchievementTranslation extends AllPageContent {
  achievements_id: number;
  project_text: string;
}
interface SingleBlogTranslation extends AllPageContent {
  Blogs_id: number;
  description: string;
  content:string;
  published:boolean;
}
interface AchievementsSectionsDirectus {
  reference: string;
  double_images_variant:
    | "images_overlap_1"
    | "images_overlap_2"
    | "images_overlap_3"
    | "images_equal";
  text_image_variant: "image_left" | "image_right";
  id: number;
  image: string;
  image_2: string;
  translations: { content: string }[];
  type: "image_only" | "text_only" | "double_images" | "text_image";
}

interface SingleAchievementDirectus extends AllPageContentNonTranslated {
  id: number;
  list_image: string;
  sections: AchievementsSectionsDirectus[];
  model: ModelContent | number;
  category: number | AchievementsCategoryDirectus;
  translations: SingleAchievementTranslation[];
  orderindex:number;
}
interface BlogsSectionsDirectus {
  reference: string;
  double_images_variant:
    | "images_overlap_1"
    | "images_overlap_2"
    | "images_overlap_3"
    | "images_equal";
  text_image_variant: "image_left" | "image_right";
  id: number;
  image: string;
  image_2: string;
  translations: { content: string }[];
  type: "image_only" | "text_only" | "double_images" | "text_image";
}
interface SingleBlogDirectus extends AllPageContentNonTranslated {
  id: number;
  list_image: string;
  sections: BlogsSectionsDirectus[];
  related_blogs:SingleBlogDirectus[];
  translations: SingleBlogTranslation[];
  orderindex:number;
  date_created: DateTime;  
  category: BlogCategoryDirectus | number;
  blog_author:BlogAuthorDirectus;
}
interface AchievementsCategoryDirectus extends AllPageContentNonTranslated {
  id: number;
  is_enabled: boolean;
  translations: AllPageContent[];
}

interface CountriesTranslation {
  name: string;
  languages_code: string;
}

interface CountriesDirectus {
  id: number;
  reference: string;
  translations: CountriesTranslation[];
  code:string;
}
interface BlogCountiesDirectus{
  id:number;
  countries_id:number;
}
// FAQ
interface FAQCategoryDirectus {
  id: number;
  translations: {
    languages_code: string;
    name: string;
  }[];
}

interface FAQQuestionDirectus {
  id: number;
  category: FAQCategoryDirectus | number;
  reference:string;
  translations: {
    languages_code: string;
    question: string;
    content: string;
    keywords: string;
  }[];
}

// jobs

interface JobContent extends AllPageContent {
  content: string;
}

interface JobsContent extends AllPageContent {
  main_paragraph: string;
  interested_text: string;
  send_your_cv_text: string;
  no_job_offer_text: string;
  back_to_jobs_text: string;
  country_label_text: string;
  all_filter_text: string;
}

interface SingleJobTranslation extends AllPageContent {
  content: string;
}

interface SingleJobDirectus extends AllPageContentNonTranslated {
  id: number;
  country: number;
  reference: string;
  translations: SingleJobTranslation[];
}

// files

interface PreUploadedFile {
  filePath: string;
  fileName: keyof AllFiles;
}

interface UploadedFile {
  id: string;
  fileName: keyof AllFiles;
}

interface AllFiles {
  // the coverseal
  certificate_image: UploadedFile;
  comfort_image: UploadedFile;
  comfort_image_2: UploadedFile;
  discretion_image: UploadedFile;
  discretion_image_2: UploadedFile;
  discretion_image_3: UploadedFile;
  // benefits
  security_image: UploadedFile;
  // models
  dressing_image: UploadedFile;
  // each model
  automatic_product_image: UploadedFile;
  automatic_product_image_2: UploadedFile;
  semi_automatic_product_image: UploadedFile;
  semi_automatic_product_image_2: UploadedFile;
  manual_product_image: UploadedFile;
  manual_product_image_2: UploadedFile;
  home_image_automatic: UploadedFile;
  home_image_semi_automatic: UploadedFile;
  home_image_manual: UploadedFile;
  // about us
  history_image: UploadedFile;
  history_image_2: UploadedFile;
  // partnerships
  partnerships_image: UploadedFile;
  // home
  coverseal_image: UploadedFile;
  coverseal_image_2: UploadedFile;
  models_image:UploadedFile;
  benefits_image: UploadedFile;
  // achievements
  louise_and_martin_first_image: UploadedFile;
  louise_and_martin_second_image: UploadedFile;
  julie_and_maxime_first_image: UploadedFile;
  julie_and_maxime_second_image: UploadedFile;
  julie_and_maxime_third_image: UploadedFile;
  julie_and_maxime_fourth_image: UploadedFile;
  julie_and_maxime_fifth_image: UploadedFile;
  julie_and_maxime_sixth_image: UploadedFile;
}

interface AfterSaleDirectus {
  id: number;
  custom_id: number;
  full_name: string;
  mail: string;
  phone: string;
  coverseal_type: string;
  problem_description: string;
  message: string;
  zip_code: string;
  country: string;
  address: string;
  city: string;
  language: string;
  uploaded_files: { url: string }[];
  first_name: string;
  last_name: string;
  coverseal_reference_number:string;
}

interface AfterSaleTextData {
  full_name: string;
  first_name:string;
  last_name:string;
  mail: string;
  phone: string;
  coverseal_type: string;
  problem_description: string;
  message: string;
  language: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  coverseal_reference_number:string;
}

interface MailsContentDirectus {
  mails: {
    area: "rest_of_the_world" | "france" | "benelux";
    catalog_request: string;
    price_request: string;
    partnership: string;
    after_sale: string;
  }[];
  translations: {
    after_sale_confirm_reception_subject: string;
    after_sale_confirm_reception: string;
    price_request_confirm_reception_subject: string;
    price_request_confirm_reception: string;
    catalog_request_confirm_reception_subject: string;
    catalog_request_confirm_reception: string;
    newsletter_confirm_reception_subject: string;
    newsletter_confirm_reception: string;
    partnership_confirm_reception_subject: string;
    partnership_confirm_reception: string;
    catalog?: string | DirectusImage;
  }[];
}

interface PriceRequestFormDirectus {
  id: number;
  custom_id: number;
  full_name: string;
  mail: string;
  phone: string;
  country: string;
  zip_code: string;
  address: string;
  city: string;
  uploaded_documents: { url: string }[];
  language: string;
  message: string;
  pool_width?: string;
  pool_length?: string;
  first_name: string;
  last_name: string;
}

interface CatalogRequestFormDirectus {
  id: number;
  custom_id: number;
  full_name: string;
  mail: string;
  country: string;
  zip_code: string;
  language: string;
  first_name: string;
  last_name: string;
}

interface PriceRequestTextData {
  full_name: string;
  price_request: [string, string] | string;
  catalog: [string, string] | string;
  mail: string;
  phone: string;
  address: string;
  zip_code: string;
  country: string;
  city: string;
  message: string;
  language: string;
  catalog?: "true" | "false";
  pool_width?: string;
  pool_length?: string;
  first_name: string;
  last_name: string;
}

interface CatalogRequestTextData {
  full_name: string;
  mail: string;
  country: string;
  zip_code: string;
  language: string;
  first_name: string;
  last_name: string;
}

interface NewsLetterDirectus {
  custom_id: number;
  mail: string;
  active: boolean;
  language: string;
}

interface NewsLetterData {
  mail: string;
  language: string;
}

interface PartnershipData {
  mail: string;
  type: string;
  language: string;
  country: string;
  zip_code: string;
  company_name: string;
  contact_person: string;
}
