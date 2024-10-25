export const getLocale = (locale: string) => {
  if(!locale.includes('-'))
    {
      locale += "-FR"
    }
  if (locale === "default") {
    return "en-GB";
  }

  var [language, country] = locale.split("-");
  if(!country)
    {
      country = "FR";
    }
  switch (true) {
    case language === "de":
      return "de-DE";
      case language === "es" && country ==="US":
      case language === "es" && country ==="SOUTHAMERICA":
        return locale;
      case language === "es":
      return "es-ES";
      case language === "en" && country ==="US":
      case language === "en" && country ==="CA":
      case language === "en" && country ==="SOUTHAMERICA":
        return locale;
      case language === "en":
      return "en-GB";
      
    case language === "fr" && country === "LU":
    case language === "fr" && country === "BE":
    case language === "nl" && country === "BE":
    case language === "fr" && country === "FR":
    case language === "nl" && country === "NL":
      return locale;
      case language === "fr":
      return "fr-BE";
    default:
      return "en-GB";
  }
};
