// vendors
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect,
  useMemo,
} from "react";
import Link from "next/link";
import classnames from "classnames";
import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify";
import { useRouter } from "next/router";
// local
import { CircleLink } from "../../../components/CircleLink";
import { AfterSaleFAQSection } from "../../../components/AfterSaleFAQSection";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../../utils/fetchers";
import { Color } from "../../../utils/constants";
import { Arrow, Cross } from "../../../components/icons";
import { useDebounce } from "../../../components/useDebounce";
import { Loader } from "../../../components/Loader";
import { PartialItem } from "@directus/sdk";
import { getLocale } from "../../../utils/locale";
import { COUNTRIES } from "../../../utils/constants";
import StructuredData from "../../../components/StructuredData";
import { CatalogueRequestHomeSection } from "../../../components/CatalogueRequestHomeSection";

function QuestionItem({ translations }: PartialItem<FAQQuestionDirectus>) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { question, content } = translations[0];

  return (
    <div
      className={classnames({
        "question-item": true,
        "is-open": isOpen,
      })}
    >
      <h4 onClick={() => setIsOpen(!isOpen)}>
        {question} <Arrow color={Color.TERRA_COTTA} strokeWidth={2} />
      </h4>
      <div
        ref={contentRef}
        className="content wysiwyg"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
      />
    </div>
  );
}

interface FAQProps extends PageProps<FAQContent> {
  categories: PartialItem<FAQCategoryDirectus>[];
  questions: PartialItem<FAQQuestionDirectus>[];
  currentCategoryId: number | undefined;
}

export default function FAQPage({
  pageProps,
  categories,
  questions,
  currentCategoryId,
  globalSection,
  layoutProps,
}: FAQProps) {
  const { locale, asPath } = useRouter();
  const {
    main_title,
    main_description,
    search_placeholder,
    result_text,
    no_result_text,
    models_link_text,
  } = pageProps;
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryResponse, setQueryResponse] = useState<
    undefined | FAQQuestionDirectus[]
  >(undefined);

  const modelsLink = layoutProps.topBarProps.mainMenuProps.modelsPath;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchTermChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.currentTarget.value);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!searchTerm.length) {
      setQueryResponse(undefined);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm.length) {
      return;
    }
    setIsLoading(true);
    var filteredq = questions.filter(x=> x.translations.filter(z=>(z.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || (z.question!=null && z.question.includes(debouncedSearchTerm.toLowerCase())) || (z.keywords!=null && z.keywords.includes(debouncedSearchTerm.toLowerCase()))) && z.languages_code.includes(locale.split('-')[0])).length>0) as FAQQuestionDirectus[];
      setQueryResponse(filteredq);
      setIsLoading(false);
    /*fetch("/api/elastic-search", {
      method: "POST",
      body: JSON.stringify({
        searchTerm: debouncedSearchTerm,
        language: locale,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          setQueryResponse(res);
        }
        // here display an indication about an error
        setIsLoading(false);
      });*/
  }, [debouncedSearchTerm]);

  const questionTargeted = useMemo(() => {
    if (asPath.includes("#")) {
      const parts = asPath.split("#");
      if (parts[1]) {
        return parts[1];
      }
      return null;
    }
    return null;
  }, [asPath]);

  const questionsDom = useMemo(
    () =>
      (queryResponse || questions).map((question) => {
        const id = `question-${question.id}`;
        return (
          <li id={id} key={id}>
            <QuestionItem {...question} />
          </li>
        );
      }),
    [questions, queryResponse, questionTargeted]
  );

  useEffect(() => {
    const question = document.querySelector<HTMLHeadingElement>(
      `#${questionTargeted} h4`
    );
    if (question) {
      question.click();
    }
  }, []);
  var dyndata = [];
  for(let i=0;i<(queryResponse || questions).length;i++)
  {
    var q = (queryResponse || questions)[i];
    const { question, content } = q.translations[0];
    dyndata.push({
      "@type": "Question",
      "name":question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": content
      }
    })
  }
  
  const structuredData = {
    "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity":
        dyndata
  };
  return (
    <>
    <StructuredData data={structuredData}  id="faqs-data" />
    <main className="faq-template">
      <section className="section first-section section1" data-color={Color.WHITE}>
        <div className="section-container">
          <div className="title-container">
            <h1
              onClick={handleClearSearch}
              className="main-title main-title--terra-cotta link-underline"
            >
              {main_title}
            </h1>
            
            <div className="input-container desktopsearch">
              <input
                className="input"
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChanged}
                placeholder={search_placeholder}
              />
              {searchTerm.length > 0 && (
                <div className="icon-container" onClick={handleClearSearch}>
                  <Cross color={Color.ANTHRACITE} />
                </div>
              )}
            </div>
          </div>
          <div >
            <span className="text-container" style={{color:"black"}}><h6>
              {main_description}
            </h6></span>
            </div>
            <div className="title-container mobilesearch">
            <div className="input-container ">
              <input
                className="input"
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChanged}
                placeholder={search_placeholder}
              />
              {searchTerm.length > 0 && (
                <div className="icon-container" onClick={handleClearSearch}>
                  <Cross color={Color.ANTHRACITE} />
                </div>
              )}
            </div>
            </div>
            
</div>
      </section>
                <section className="section first-section section2" data-color={Color.BEIGE}>
                <div className="section-container">
          {isLoading ? (
            <div className="loader-container">
              <Loader />
            </div>
          ) : (
            <>
              {!queryResponse ? (
                <ul className="link-list categories">
                  {categories.map(({ id, translations }) => {
                    return (
                      <li key={id}  style={{ marginRight: '15px' }}>
                        <Link
                          passHref
                          href={`/faq/${id}/${slugify(translations[0].name, {
                            lower: true,
                          })}`}
                        >
                          <a
                            className={classnames({
                              "subtitle-poppins": true,
                              "link-before-translate": true,
                              "link-before-translate--terra-cotta": true,
                              "is-selected": id === currentCategoryId,
                            })}
                          >
                            {translations[0].name}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h2 className="subtitle-argesta subtitle-argesta--anthracite">
                  {queryResponse.length === 0 ? no_result_text : result_text}
                </h2>
              )}

              <ul className="questions">{questionsDom}</ul>
            </>
          )}
        </div>
      </section>
      {/* <section className="models-link-section">
        <CircleLink
          mainLink={{
            text: models_link_text,
            href: modelsLink,
          }}
        />
      </section> */}
      {layoutProps.hasSAV && (
        <AfterSaleFAQSection
          form_title={""} {...globalSection.afterSale}
          formsMessages={globalSection.formsMessages}        />
      )}


      <CatalogueRequestHomeSection 
          {...globalSection.priceRequest}
          formsMessages={globalSection.formsMessages}
          locale={locale}
          newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
      />
    </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<
  FAQProps,
  { category: string; id: string }
> = async ({ locale, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const faqTemplateProps = await getPageContentProps<FAQContent>(
    fetcher,
    "faq_template",
    locale
  );

  const currentCategory = await fetcher.directus
    .items<string, FAQCategoryDirectus>("faq_categories")
    .readOne(Number(params.id));

  if (!currentCategory) {
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }

  const categories = await fetcher.directus
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

  const questions = await fetcher.directus
    .items<string, FAQQuestionDirectus>("faq")
    .readMany({
      fields: ["translations.*", "id"],
      filter: {
        category: {
          id: {
            _eq: Number(params.id),
          },
        },
      },
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

  const props: FAQProps = {
    ...allPageProps,
    ...faqTemplateProps,
    categories,
    questions,
    currentCategoryId: Number(params.id),
  };

  return {
    props,
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();

  const categories = await fetcher.directus
    .items<string, FAQCategoryDirectus>("faq_categories")
    .readMany({
      fields: ["translations.name", "translations.languages_code", "id"],
    })
    .then((res) => res.data);

  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach((language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const cmsLocale = getLocale(locale);

      categories.forEach((category) => {
        const translation = category.translations.find(
          (item) => item.languages_code === cmsLocale
        );
        if(translation)
        {
        acc.push({
          params: {
            id: String(category.id),
            category: slugify(translation.name, { lower: true }),
          },
          locale,
        });
      }
      });
    });
    return acc;
  }, [] as any);

  return {
    paths,
    fallback: "blocking",
  };
};
