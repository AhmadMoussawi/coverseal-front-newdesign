// vendors
import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import Link from "next/link";
import classnames from "classnames";
import { GetStaticProps, GetStaticPaths } from "next";
import slugify from "slugify";
import { useRouter } from "next/router";
import { generateBlogPath } from "../../utils/paths";
import { Image } from "../../components/Image";
import { HeaderImage } from "../../components/HeaderImage";
import Date from '../../components/date';
import { ArrowCustom } from "../../components/icons";
// local
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../utils/fetchers";
import { AnimationDirection, Color } from "../../utils/constants";
import { Arrow, Cross } from "../../components/icons";
import { useDebounce } from "../../components/useDebounce";
import { Loader } from "../../components/Loader";
import { PartialItem } from "@directus/sdk";
import { getLocale } from "../../utils/locale";
import { COUNTRIES } from "../../utils/constants";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ItemSelection } from "@aws-sdk/client-cloudfront";
import { redirect } from "next/dist/server/api-utils";
import { CatalogueRequestHomeSection } from "../../components/CatalogueRequestHomeSection";


const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  //...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'left',
  height:'160px',
  //color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxShadow:"unset",
}));
var pagelimit = 16;
/*function BlogItem(question) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
if(question.translations && question.translations.length>0)
{
  const { id, main_title, description } = question.translations[0];
  const category_id = question.category as number;
  return (
    
                <Link
                  href={generateBlogPath(
                    category_id,
                    main_title, question.id
                  )}
                  passHref
                >
                  <a className="link-before-translate link-before-translate--anthracite">
                    <Image
                      id={question.list_image}
                      title={question.list_image.title}
                      direction={
                        (question.i + 1) % 2 === 0
                          ? AnimationDirection.LEFT_TO_RIGHT
                          : AnimationDirection.RIGHT_TO_LEFT
                      }
                      isBackgroundCss
                    />
                    <div className="text-container">
                      <h3 className="subtitle-poppins">
                        
                        {main_title}
                      </h3>
                    </div>
                  </a>
                </Link>
              
  );
                    }
                    else{
                      return <></>
                    }
}*/

interface BlogsProps extends PageProps<BlogsContent> {
  categories: PartialItem<BlogCategoryDirectus>[];
  currentCategoryId: number | undefined;
  currentCategory:PartialItem<BlogCategoryDirectus>;
  dblogs:PartialItem<SingleBlogDirectus>[];
  dblogspagecount:[];
}

export default function BlogsPage({
  pageProps,
  categories,
  currentCategoryId,
  currentCategory,
  globalSection,
  layoutProps,
  dblogs,
  dblogspagecount
}: BlogsProps) {
  const { locale, asPath } = useRouter();
  const {
    main_description,
    main_title,
    search_placeholder,
    result_text,
    no_result_text,
    header_image,
    all,
    readmore,
    
  } = pageProps;
  const [searchTerm, setSearchTerm] = useState("");
  const [sessionPage, setPage] = useState("1");
  const [blogspagecount, setPageCount] = useState(dblogspagecount);
  const [isLoading, setIsLoading] = useState(false);
  const [queryResponse, setQueryResponse] = useState<
    undefined | SingleBlogDirectus[]
  >(undefined);
  const [blogs, setBlogs] = useState<
  undefined | SingleBlogDirectus[]
>(undefined);
  const modelsLink = layoutProps.topBarProps.mainMenuProps.modelsPath;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchTermChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.currentTarget.value);
    },
    []
  );
  useEffect(()=>{
  var page = window.location.search.split("=")[1];
  setPage(page);
  
  const fetchData = async () => {
    
      if(page && page!="1")
      {
        
        var results = await blogsNextPage(page,locale,currentCategoryId, blogspagecount);
        var blogs = results.blogs as SingleBlogDirectus[];
        
        
          setBlogs(blogs);
          setPageCount(results.blogspagecount);
      }
        
        
        
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);
  
},[])
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
    var filteredq = blogs.filter(x=> x.translations.filter(z=>(z.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || (z.main_title!=null && z.main_title.includes(debouncedSearchTerm.toLowerCase()))) && z.languages_code.includes(locale.split('-')[0])).length>0) as SingleBlogDirectus[];
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
  const [language, country] = locale.split("-");
  const questionsDom = useMemo(
    () =>
      (queryResponse || blogs || dblogs).map((question, i) => {
        const id = `question-${question.id}`;
        const { main_title, description, main_description } = question.translations[0];
        const category_id = question.category as number;
        return (
          <div key={i}>
            <Link
          href={generateBlogPath(
            category_id,
            main_title, question.id
          )}
          passHref
        >
          <a>
            <Image
              id={question.list_image}
              title="Blog image"
              quality="50"
              
              isBackgroundCss
            />
            <Label><h5 className="subtitle" style={{fontWeight:"500"}}>{main_title}</h5>
            <span className="subtext">{description}</span>
            <Date style={{fontSize:"12px",marginTop:"5px", display:"block"}} dateString={question.date_created.toString()} language={language} /><a className="back-button next-button" href={"/" + locale + generateBlogPath(
            category_id,
            main_title, question.id
          )} style={{fontSize:"12px", marginTop:"10px"}}>{readmore}
          <ArrowCustom color={Color.TERRA_COTTA} />
          </a></Label>
            </a>
            </Link>
          </div>
          
          
        );
      }),
    [blogs, queryResponse, questionTargeted]
  );
  const pagesDom = useMemo(
    () =>
      (blogspagecount).map((pagerow, i) => {
        return (
          <li key={i}>
        
                          <a href={`/${locale}/conseils-pratiques/${currentCategoryId?currentCategoryId:"all"}?page=${(i +1)}`}
                            className={classnames({
                              "subtitle-poppins": true,
                              "link-before-translate": true,
                              "link-before-translate--terra-cotta": true,
                              "is-selected": ((!sessionPage && i == 0) ||(i + 1).toString() === sessionPage),
                            })}
                          >
                            {i+1}
                          </a>
                        </li>
          
          
        );
      }),
    [currentCategoryId, blogspagecount, sessionPage]
  );
  useEffect(() => {
    const question = document.querySelector<HTMLHeadingElement>(
      `#${questionTargeted} h4`
    );
    if (question) {
      question.click();
    }
  }, []);
  return (
    <main className="blogs-category-template">
      <section className="section first-section" data-color={Color.WHITE}>
        <div className="section-container">
        {/*<HeaderImage
                      id={header_image.id}
                      title="Blog image"
                      main_title={main_title + (currentCategory && currentCategory.translations && currentCategory.translations.length>0?": " + currentCategory.translations[0].name:"")}
                      direction={AnimationDirection.LEFT_TO_RIGHT}
  />*/}
          <div className="title-container" style={{paddingTop:"50px"}}>
            
              <a href={`/${locale}/conseils-pratiques/all`}>
                <h1  onClick={handleClearSearch}
              className="main-title main-title--terra-cotta  header-title"
            >
              {main_title}
              
              
            </h1></a>
            
            {/*<div className="input-container">
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
              </div>*/}
          </div>
          <div className="text-container" style={{color:"black", marginBottom:"20px"}}><h6>{main_description}</h6></div>
          </div>
          </section>
           {/* </div>

          </section>           
            <section className="section second-section" data-color={Color.BEIGE}> 
           <div className="section-container">
          { */}
            <section className="section first-section" data-color={Color.BEIGE}>
            <div className="section-container">
               {!queryResponse ? (
                <>
                <Tabs
                variant="scrollable"
                scrollButtons={true}
                allowScrollButtonsMobile
                className="link-list categories cattab"
                aria-label="scrollable auto tabs example"
                value={(currentCategoryId?currentCategoryId:"all")}
              >
                <Tab value={"all"} label={all} className={
                  classnames({
                        "subtitle-poppins": true,
                        "link-before-translate": true,
                        "link-before-translate--TERRA_COTTA": true,
                        "is-selected": !currentCategoryId,
                      })} href={`/${locale}/conseils-pratiques/all`} key="allcategories" />
                {categories.filter(x=>x.hasblogs==true).map(({ id, translations, hasblogs }) => {
                  
                  const cmsLocale = getLocale(locale);
                  var trans = translations.filter(x=>x.languages_code == cmsLocale);
                  if(trans && trans.length>0)
                    translations = trans;
                  else
                  {
                    trans = [];
                  trans.push(translations[0]);
                  }
                  translations = trans;
                    return (
                      <Tab value={id} key={"cat-" + id} label={translations && translations.length>0?translations[0].name:""} className={classnames({
                        "subtitle-poppins": true,
                        "link-before-translate": true,
                        "link-before-translate--terra-cotta": true,
                        "is-selected": id === currentCategoryId,
                      })} href={`/${locale}/conseils-pratiques/${id}`} />
                    );
                  })}
                
                
              </Tabs>
                <ul className="link-list categories catlink">
                <li key={"all"}>
                      <Link
                        passHref
                        href={`/conseils-pratiques/all`}
                      >
                        <a
                          className={classnames({
                            "subtitle-poppins": true,
                            "link-before-translate": true,
                            "link-before-translate--terra-cotta": true,
                            "is-selected": (!currentCategoryId),
                          })}
                        >
                          {all}
                        </a>
                      </Link>
                    </li>
                {categories.filter(x=>x.hasblogs == true).map(({ id, translations }) => {
                  return (
                    
                    <li key={id}>
                      <Link
                        passHref
                        href={`/conseils-pratiques/${id}`}
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
                </>
              ) : (
                <h2 className="subtitle-argesta subtitle-argesta--anthracite">
                  {queryResponse.length === 0 ? no_result_text : result_text}
                </h2>
              )}
              
      <Masonry columns={{xs:1, sm:2, md:3, lg:4}} spacing={2} className="projects"> 
        
        {questionsDom}
        
        </Masonry>
            
              {/*<ul className="projects">{questionsDom}</ul>*/}
              <ul className="link-list categories pagescats">
              {pagesDom}
              </ul>
              </div>
      </section>
      

      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
      />
    </main>
  );
}
export async function blogsNextPage(page, locale, category_id, blogspagecount) {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);
  const blogs = await fetcher.directus
    .items<string, SingleBlogDirectus>("Blogs")
    .readMany({
      fields: ["translations.*", "id", "category","list_image", "date_created"],
      sort: ["-date_created"],
      filter: category_id?{
        category: {
          id: {
            _eq:category_id,
          }
        },
        translations:{
          "languages_code":{
            "_eq":cmsLocale
          },
          "published":{
            _eq:true
          }
        }
      }:{
        translations:{
          "languages_code":{
            "_eq":cmsLocale
          },
          "published":{
            _eq:true
          }
        }
      },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: cmsLocale,
            },
            published: {
              _eq: true,
            },
          },
        } as any,
      },
      limit:pagelimit,
      page:page,
      meta:"*",
    })
    .then((res) =>{
      if(res.meta)
      {
        var filterc = res.data.filter(x=>x.translations.filter(z=>z.languages_code == cmsLocale).length>0).length;
        //console.log("datac", res.data.length)
        //console.log("filterc", filterc)
        var count = Math.ceil(res.meta.filter_count / pagelimit);
        blogspagecount = [];
        if((count>1 && filterc == 16) || page>1)
        {
          
          for(let i=1;i<=count;i++)
          {
            blogspagecount.push(i);
          }
        }
      }
      return res.data.filter((item) => item.translations.length);
    } );
    return {blogs, blogspagecount};
}
function paginate(array, page_size, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
export const getStaticProps: GetStaticProps<
  BlogsProps,
  { category_id: string; }
> = async ({ locale, params }) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);
  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const blogTemplateProps = await getPageContentProps<BlogsContent>(
    fetcher,
    "blogs_template",
    locale
  );
  
  const [language, country] = locale.split("-");
  const countrydb = await fetcher.directus
    .items<string, CountriesDirectus>("countries")
    .readMany({
      fields: ["id", "translations.*", "code"],
      filter:{
        code:{
          _eq:country
        }
      }
      
    })
    .then((res) => res.data);
                var hasblog = blogTemplateProps.pageProps.allowed_countries.filter(x=>countrydb.length>0 && x.countries_id == countrydb[0].id).length>0;
                if (!hasblog) {
                  
  
                  return {
                    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
                    redirect: {
                      permanent: false,
                      destination: '/' + locale,
                  },
                  };
                }
                else{
  var currentCategory = null;
  if(params && params.category_id && params.category_id!="all")
  {
    currentCategory = await fetcher.directus
      .items<string, BlogCategoryDirectus>("blog_categories")
      .readOne(Number(params.category_id[0]),{fields: ["translations.name","translations.languages_code", "id"]
    });
    var trans = currentCategory.translations.filter(x=>x.languages_code == cmsLocale);
    if(trans)
      currentCategory.translations = trans;
    else
    {
      trans = [];
    trans.push(currentCategory.translations[0]);
    }
    currentCategory.translations = trans;
  }

  /*if (!currentCategory) {
    
    return {
      props: null,
      revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
      notFound: true,
    };
  }*/
  
  const categories = await fetcher.directus
    .items<string, BlogCategoryDirectus>("blog_categories")
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
    .then(async(res) =>{ 
      for(var i=0;i<res.data.length;i++)
      {
        var el = res.data[i];
        var blogs = await fetcher.directus
    .items<string, SingleBlogDirectus>("Blogs")
    .readMany({
      fields: ["translations.*", "id", "category"],
      sort: ["-date_created"],
      meta:"filter_count",
      filter: {
        category: {
          id: {
            _eq:el.id,
          },
        },
        translations:{
          "languages_code":{
            "_eq":cmsLocale
          },
          "published":{
            _eq:true
          }
        }
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
    .then((res1) =>{
      return res1.data.filter((item) => item.translations.length);
      
    } );
    el.hasblogs = blogs.length>0;
      }
      return res.data.filter((item) => item.translations.length && item.hasblogs)});
var blogspagecount = [1];
var currentpage = "1";
var dblogs = await blogsNextPage(1,cmsLocale,params.category_id!="all"?params.category_id:null,blogspagecount);
  /*const blogs = await fetcher.directus
    .items<string, SingleBlogDirectus>("Blogs")
    .readMany({
      fields: ["translations.*", "id", "category","list_image"],
      sort: ["-date_created"],
      limit:pagelimit,
      page:1,
      meta:"filter_count",
      filter: params.category_id?{
        category: {
          id: {
            _eq:Number(params.category_id),
          },
        },
      }:{},
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
    .then((res) =>{
      console.log("META", res)
      if(res.meta)
      {
        var count = res.meta.filter_count / pagelimit;
        if(count>1)
        {
          blogspagecount = [];
          for(let i=1;i<=count;i++)
          {
            blogspagecount.push(i);
          }
        }
      }
      if(params.category_id)
      {
        res.data = res.data.filter((item) => item.category == Number(params.category_id));
      }
      return res.data.filter((item) => item.translations.length);
    } );*/

  const props: BlogsProps = {
    ...allPageProps,
    ...blogTemplateProps,
    categories,
    currentCategoryId: (params.category_id?Number(params.category_id):null),
    currentCategory,
    dblogs:dblogs.blogs,
    dblogspagecount:dblogs.blogspagecount
  };

  return {
    props,
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
}
};

export const getStaticPaths: GetStaticPaths = async () => {
  const fetcher = new Fetcher();
  
  const categories = await fetcher.directus
    .items<string, BlogCategoryDirectus>("blog_categories")
    .readMany({
      fields: ["translations.name", "translations.languages_code", "id"],
    })
    .then((res) => res.data);
    
  const paths = COUNTRIES.reduce((acc, country) => {
    const countryCode = country.code;

    country.languages.forEach(async(language) => {
      const locale = `${language.toLowerCase()}-${countryCode}`;
      const blogTemplateProps = await getPageContentProps<BlogsContent>(
        fetcher,
        "blogs_template",
        locale
      );
      
      
      const countrydb = await fetcher.directus
        .items<string, CountriesDirectus>("countries")
        .readMany({
          fields: ["id", "translations.*", "code"],
          filter:{
            code:{
              _eq:countryCode
            }
          }
          
        })
        .then((res) => res.data);
                    var hasblog = blogTemplateProps.pageProps.allowed_countries.filter(x=>countrydb.length>0 && x.countries_id == countrydb[0].id).length>0;
      const cmsLocale = getLocale(locale);
      if(hasblog)
      {
        acc.push({
          params: {
            category_id: "all"
          },
          locale,
        });
        categories.forEach((category) => {
          var translation = category.translations.find(
            (item) => item.languages_code === cmsLocale
          );
          if(!translation)
            translation = category.translations[0];
            if(translation)
            {
              acc.push({
                params: {
                  category_id: String(category.id)
                },
                locale,
              });
            }
        });
      }
      
      
    });
    return acc;
  }, [] as any);

  return {
    paths,
    fallback: "blocking",
  };
};
