import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import slugify from "slugify";
import { useRouter } from "next/router";
import { makeStyles, MenuItem, NoSsr, TextField } from "@material-ui/core";
import {
  Fetcher,
  getAllPagePropsOnly,
  getPageContentProps,
} from "../../utils/fetchers";
import { translateInFromRightToLeft } from "../../animations/appearing/shared";
import { Color } from "../../utils/constants";
import { useCallback } from "react";
import { getLocale } from "../../utils/locale";
import { CatalogueRequestHomeSection } from "../../components/CatalogueRequestHomeSection";

const terraCotta = "#7f351b";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: terraCotta,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: terraCotta,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: terraCotta,
      },
    },
  },
});

function appearingAnimations() {
  translateInFromRightToLeft(".first-section .main-title");
  translateInFromRightToLeft(".first-section .main-paragraph");

  gsap.fromTo(
    ".first-section .jobs .item",
    {
      opacity: 0,
      y: "200%",
    },
    {
      scrollTrigger: {
        trigger: ".first-section .link-list li",
        start: "top bottom-=10%",
      },
      duration: 2,
      opacity: 1,
      y: 0,
      stagger: 0.5,
      ease: "power3.out",
      clearProps: "all",
    }
  );
}

interface JobsProps extends PageProps<JobsContent> {
  jobs: SingleJobDirectus[];
  countries: CountriesDirectus[];
}

export default function JobsPage({ pageProps, jobs, countries, globalSection }: JobsProps) {
  const { main_title, main_paragraph, all_filter_text, country_label_text } =
    pageProps;
    const { locale } = useRouter();
  const [_language, country] = locale.split("-");
  var code = countries.filter(x=>x.code == country);
  var sstat = "all";
  if(code.length>0)
  {
    sstat = code[0].id.toString();
  }
  const [currentFilter, setCurrentFilter] = useState(sstat);
  useEffect(() => {
    appearingAnimations();
  }, []);

  const classes = useStyles();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(e.currentTarget.getAttribute("data-value"));
  }, []);

  const displayedJobs = useMemo(() => {
    if (currentFilter === "all") {
      return jobs;
    }
    return jobs.filter(
      (item) =>
        item.country === Number(currentFilter) ||
        item.reference === "spontaneous-application"
    );
  }, [currentFilter, jobs]);

  return (
    <main className="jobs-template">
      <section className="section first-section" data-color={Color.BEIGE}>
        <div className="section-container">
          <h1 className="main-title main-title--terra-cotta">{main_title}</h1>
          <div
            className="main-paragraph wysiwyg"
            dangerouslySetInnerHTML={{ __html: main_paragraph }}
          />
          <div className="country-selector">
            <NoSsr>
              <TextField
                className={classes.root}
                label={country_label_text}
                select
                value={currentFilter}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem key="all" value="all">
                  {all_filter_text}
                </MenuItem>
                {countries.map(({ id, translations }) => (
                  <MenuItem key={id} value={id}>
                    {translations[0].name}
                  </MenuItem>
                ))}
              </TextField>
            </NoSsr>
          </div>
          <div className="jobs">
            {displayedJobs.map(({ translations, id }) => (
              <div key={id} className="item-container">
                <Link
                  href={`/jobs/${id}/${slugify(translations[0].main_title, {
                    lower: true,
                  })}`}
                  passHref
                >
                  <a key={id} className="item">
                    <span className="subtitle-poppins">
                      {translations[0].main_title}
                    </span>
                    <span className="plus">+</span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CatalogueRequestHomeSection 
        {...globalSection.priceRequest}
        formsMessages={globalSection.formsMessages}
        locale={locale}
        newsletter_subscribe_link_text={globalSection.footer.newsletter_subscribe_link_text}
      />
    </main>
     
  );
}

export const getStaticProps: GetStaticProps<PageProps<JobsContent>> = async ({
  locale,
}) => {
  const fetcher = new Fetcher();
  const cmsLocale = getLocale(locale);

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

  const countries = await fetcher.directus
    .items<string, CountriesDirectus>("countries")
    .readMany({
      fields: ["id", "translations.*", "code"],
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
    .then((res) => res.data);

  const allPageProps = await getAllPagePropsOnly(fetcher, locale);
  const pageProps = await getPageContentProps<JobsContent>(
    fetcher,
    "jobs_template",
    locale
  );

  return {
    props: {
      ...allPageProps,
      ...pageProps,
      jobs,
      countries,
    },
    revalidate: parseInt(process.env.REVALIDATION_TIME), // In seconds
  };
};
