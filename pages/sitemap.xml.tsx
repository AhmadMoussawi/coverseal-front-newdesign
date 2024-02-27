import {
    Fetcher,
    getPageContentProps,
    getAllPagePropsOnly,
  } from "../utils/fetchers";
  import slugify from "slugify";
import { COUNTRIES } from "../utils/constants";
import { getLocale } from "../utils/locale";
 
import { generateAchievementPath } from "../utils/paths";
import { useEffect } from "react";
import { useRouter } from "next/router";
var URL = "https://coverseal-stage.com";

 const processUrls = async(urlObj)=>{
    var fetcher = new Fetcher();
    var cmsLocale = getLocale(urlObj.locale);
    const achievementscategories = await fetcher.directus
    .items<string, AchievementsCategoryDirectus>("achievements_categories")
    .readMany({
      fields: ["translations.*", "id"],
      filter: {
        is_enabled: {
          _eq: true,
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
    .then((res) => res.data.filter((item: any) => item.translations.length));
    var achievementcategoriesUrls = "";
    for (const element of achievementscategories) {
        // Use await inside this loop for asynchronous operations
        var achievements = await fetcher.directus
    .items<string, SingleAchievementDirectus>("achievements")
    .readMany({
      fields: ["translations.*", "id", "list_image","orderindex"],
      sort: ["orderindex"],
      filter: {
        category: {
          _eq: Number(element.id),
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
    .then((res) => res.data.filter((item: any) => item.translations.length));
        achievementcategoriesUrls += `<url>
        <loc>${urlObj.url}/achievements/${element.id}/${slugify(
            element.translations[0].main_title,
            {
              lower: true,
            }
          )}</loc>
      </url>`;
      achievements.forEach((el)=>{
        achievementcategoriesUrls += `<url>
        <loc>${urlObj.url}/achievements/${element.id}/${slugify(element.translations[0].main_title, {
            lower: true,
          })}/${el.id}/${slugify(el.translations[0].main_title, {
            lower: true,
          })}</loc>
      </url>`;
      })
      
      }
      const blogTemplateProps = await getPageContentProps<BlogsContent>(
        fetcher,
        "blogs_template",
        urlObj.locale
      );
      
      const [language, country] = urlObj.locale.split("-");
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
    var conseilspratiques = "";
    if(hasblog)
    {
        conseilspratiques = `<url>
        <loc>${urlObj.url}/conseils-pratiques/all</loc>
      </url>`;
      var blogcategories = await fetcher.directus
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
      for (const element of blogcategories) {
        const blogs = await fetcher.directus
        .items<string, SingleBlogDirectus>("Blogs")
        .readMany({
          fields: ["translations.*", "id", "category","list_image", "date_created"],
          sort: ["-date_created"],
          filter: element.id?{
            category: {
              id: {
                _eq:element.id,
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
          }
        })
        .then((res) =>{
          
          return res.data.filter((item) => item.translations.length);
        } );
        conseilspratiques += `<url>
        <loc>${urlObj.url}/conseils-pratiques/${element.id}</loc>
      </url>`;
      for(var row of blogs)
      {
        conseilspratiques += `<url>
        <loc>${urlObj.url}/conseils-pratiques/${element.id}/${slugify(row.translations[0].main_title, {
            lower: true,
          })}/${row.id}</loc>
      </url>`;
      }
      }
    }
    var faqs  = await fetcher.directus
    .items<string, FAQCategoryDirectus>("faq_categories")
    .readMany({
      fields: ["translations.name", "translations.languages_code", "id"],
    })
    .then((res) => res.data);
    var faqUrls = "";
    for(var element of faqs)
    {
        faqUrls +=`<url>
        <loc>${urlObj.url}/faq/${element.id}/${slugify(element.translations[0].name, {
            lower: true,
          })}</loc>
      </url>`
    }
    const jobs = await fetcher.directus
    .items<string, SingleJobDirectus>("jobs")
    .readMany({
      fields: [
        "translations.main_title",
        "translations.languages_code",
        "id",
        "reference",
        "country",
      ],
      sort: ["-id"],
    })
    .then((res) =>
      res.data.map((job) => {
        const updatedJob = { ...job };
        (updatedJob as any).translations = [
          job.translations.find((item) => item.languages_code === cmsLocale),
        ];
        if (!updatedJob.translations[0]) {
          (updatedJob as any).translations = [job.translations[0]];
        }
        return updatedJob;
      })
    );
    var jobsUrl = "";
    for(var jobrow of jobs)
    {
        jobsUrl += `<url>
        <loc>${urlObj.url}/jobs/${jobrow.id}/${slugify(jobrow.translations[0].main_title, {
            lower: true,
          })}</loc>
      </url>`
    }
    const models = await fetcher.directus
    .items<string, SingleModelDirectus>("models")
    .readMany({
      fields: ["id", "translations.main_title", "translations.languages_code", "translations.published"],
    })
    .then((res) => res.data);
    var modelsUrls = "";
    for(var modelrow of models)
    {
      const translation = modelrow.translations.find(
        (item) => item.languages_code === cmsLocale
      );
      if(translation.published === true)
      {
        modelsUrls+=`<url>
        <loc>${urlObj.url}/models/${modelrow.id}/${slugify(translation.main_title, {
            lower: true,
          })}</loc>
      </url>`
        }
    }
                    return `
    <url>
      <loc>${urlObj.url}</loc>
    </url>
    <url>
      <loc>${urlObj.url}/404</loc>
    </url>
    <url>
      <loc>${urlObj.url}/500</loc>
    </url>
    <url>
      <loc>${urlObj.url}/about-us</loc>
    </url>
    <url>
      <loc>${urlObj.url}/after-sale</loc>
    </url>
    <url>
      <loc>${urlObj.url}/before-configurator</loc>
    </url>    
    <url>
      <loc>${urlObj.url}/benefits</loc>
    </url>
    <url>
      <loc>${urlObj.url}/catalog-request</loc>
    </url>
    <url>
      <loc>${urlObj.url}/contact</loc>
    </url>
    <url>
      <loc>${urlObj.url}/cookies-policy</loc>
    </url>
    <url>
      <loc>${urlObj.url}/documents</loc>
    </url>
    <url>
      <loc>${urlObj.url}/partnerships-form</loc>
    </url>
    <url>
      <loc>${urlObj.url}/partnerships</loc>
    </url>
    <url>
      <loc>${urlObj.url}/price-request</loc>
    </url>
    <url>
      <loc>${urlObj.url}/privacy-policy</loc>
    </url>
    <url>
      <loc>${urlObj.url}/reviews</loc>
    </url>
    <url>
      <loc>${urlObj.url}/terms-and-conditions</loc>
    </url>
    <url>
      <loc>${urlObj.url}/the-coverseal</loc>
    </url>
    <url>
      <loc>${urlObj.url}/achievements</loc>
    </url>
    ${achievementcategoriesUrls}
    ${conseilspratiques}
    ${faqUrls}
    <url>
      <loc>${urlObj.url}/jobs</loc>
    </url>
    ${jobsUrl}
    ${modelsUrls}
  `
 }
 const getAchievements = async()=>{

 }
async function generateSiteMap(sitemapUrls) {
  
    var result = await Promise.all(sitemapUrls
    .map(processUrls));
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${URL}</loc>
     </url>
     <url>
       <loc>${URL}/country</loc>
     </url>
      
     ${
        result
  .join('\n')
       }
   </urlset>
 `;
}
 
export async function getServerSideProps({ res, req }) {
    const fetcher = new Fetcher();
    const host = req.headers.host;
  console.log({ host });
  URL = "https://" + host;
    const sitemapUrls = COUNTRIES.flatMap((country) =>
    
    country.languages.map((language) => ({
      url: `${URL}/${language.toLowerCase()}-${country.code}`,
      locale:`${language.toLowerCase()}-${country.code}`
    }))
  );
  // Generate the XML sitemap with the blog data
  const sitemap = await generateSiteMap(sitemapUrls);
 
  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();
 
  return {
    props: {},
  };
}
 
export default function SiteMap() {}