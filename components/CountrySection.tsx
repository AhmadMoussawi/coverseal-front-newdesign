import React, { useCallback, useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import { LogoFull, VideoLink } from "./icons";
import { NoSsr, TextField, MenuItem, makeStyles } from "@material-ui/core";
import { Color, CMS_PUBLIC_URL, COUNTRIES } from "../utils/constants";
import { Value } from "sass";

const white = "#FFF";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      fontFamily: "Poppins",
      fontWeight: 300,
      color: white,
      padding: "12px 10px",
    },
    "& label.Mui-focused": {
      color: white,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: white,
    },
    "& .MuiInput-underline:hover::before": {
      borderBottomColor: white,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: white,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: white,
      },
    },
    "& .MuiSelect-icon": {
      color: white,
    },
  },
});

export function CountrySection({
  country_image,
  country_main_text,
  country_button_text,
}: CountrySectionProps) {
  const router = useRouter();
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState("default");
  const [selectedLanguage, setSelectedLanguage] = useState<undefined | string>(
    undefined
  );
  const [languageList, setLanguageList] = useState([]);

  const handleChangeCountry = useCallback((e) => {
    
    if (e.target.value === "default") {
      
      return;
    }
    const languages = COUNTRIES.find(
      (country) => country.code === e.target.value
    ).languages;
    if(e.target.value.toLowerCase()!=="fr" && (window.location.host.includes("coverseal-stage.fr")||window.location.host.includes("coverseal-stage.fr")))
    {
        window.location.href = "https://www.coverseal.com/" + languages[0]+"-" + e.target.value
     
    }
    else{
      setLanguageList(languages);
      setSelectedCountry(e.target.value);
      setSelectedLanguage(languages[0]);
    }
    
  }, []);

  const handleChangeLanguage = useCallback((e) => {
    setSelectedLanguage(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedLanguage) {
        return;
      }
      const locale = `${selectedLanguage.toLocaleLowerCase()}-${selectedCountry}`;
      document.cookie = `LOCALE=${locale};`;
      router.push(`/${locale}`);
    },
    [selectedCountry, selectedLanguage, router]
  );

  return (
    <div
      className="country-section"
      style={{
        backgroundImage: `url(${CMS_PUBLIC_URL}/assets/${country_image.id}?quality=40&format=webp)`,
      }}
    >
      <div className="overlay" />
      <div className="logo-container">
        <LogoFull color={Color.WHITE} />
      </div>
      <form className="text-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <NoSsr>
          
            <TextField
              className={classes.root}
              select
              fullWidth
              value={selectedCountry}
              onChange={handleChangeCountry}
              SelectProps={{
                native: true,
              }}
            >
              <option key="default" value="default">
                {country_main_text}
              </option>
              {COUNTRIES.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </TextField>
            {selectedCountry !== "default" && (
              <TextField
                className={classes.root}
                select
                fullWidth
                value={selectedLanguage}
                onChange={handleChangeLanguage}
                SelectProps={{
                  native: true,
                }}
              >
                {languageList.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </TextField>
            )}
          </NoSsr>
        </div>
        {selectedCountry !== "default" && (
          <button
            type="submit"
            className="link-before-translate link-before-translate--white"
          >
            {country_button_text}
          </button>
        )}
      </form>
    </div>
  );
}
