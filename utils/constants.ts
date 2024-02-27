export const BASE_URL = "https://coverseal-stage.com";

export const API_ROOT = process.env.CMS_INTERNAL_URL;
export const CMS_PUBLIC_URL = process.env.CMS_PUBLIC_URL;

export enum Color {
  TERRA_COTTA = "terra-cotta",
  WHITE = "white",
  BEIGE = "beige",
  SAND = "sand",
  ANTHRACITE = "anthracite",
  ICON_COLOR = "#7f351b"
}

export enum AnimationDirection {
  LEFT_TO_RIGHT,
  RIGHT_TO_LEFT,
  BOTTOM_TO_TOP,
  TOP_TO_BOTTOM,
}

/*export const MAIL_REGEXP =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
*/
export const MAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PHONE_REGEXP = /\+?([\d|\(][\h|\(\d{3}\)|\.|\-|\d]{4,}\d)/;

export const LIMIT_REQUEST_BY_MINUTE = 1000;

export const COUNTRIES = [
  {
    name: "Belgium",
    code: "BE",
    languages: ["FR", "NL", "EN", "DE"],
  },
  {
    name: "France",
    code: "FR",
    languages: ["FR", "EN"],
  },
  {
    name: "The Netherlands",
    code: "NL",
    languages: ["NL", "EN"],
  },
  {
    name: "Luxembourg",
    code: "LU",
    languages: ["FR", "DE", "EN"],
  },
  {
    name: "Germany",
    code: "DE",
    languages: ["DE", "EN"],
  },
  {
    name: "Austria",
    code: "AT",
    languages: ["DE", "EN"],
  },
  {
    name: "Switzerland",
    code: "CH",
    languages: ["FR", "DE", "EN"], // +IT
  },
  {
    name: "Spain",
    code: "ES",
    languages: ["ES", "FR", "EN"],
  },
  {
    name: "Israel",
    code: "IL",
    languages: ["EN"],
  },
  {
    name: "United Kingdom",
    code: "GB",
    languages: ["EN"],
  },
  {
    name: "Norway",
    code: "NO",
    languages: ["EN"],
  },
  {
    name: "Sweden",
    code: "SE",
    languages: ["EN"],
  },
  {
    name: "Finland",
    code: "FI",
    languages: ["EN"],
  },
  {
    name: "Denmark",
    code: "DK",
    languages: ["EN"],
  },
  /*{
    name: "East-Europe",
    code: "EASTEUROPE",
    languages: ["EN"],
  },*/
  {
    name: "Africa",
    code: "AFRICA",
    languages: ["EN", "FR"],
  },
  /*{
    name: "Americas",
    code: "AMERICAS",
    languages: ["EN", "ES"],
  },*/
  {
    name: "United Arab Emirates",
    code: "AE",
    languages: ["EN"],
  },
  {
    name: "Hungary",
    code: "HU",
    languages: ["EN"],
  },
  {
    name: "Bulgaria",
    code: "BU",
    languages: ["EN"],
  },
  {
    name: "United States",
    code: "US",
    languages: ["EN", "ES"],
  },
  {
    name: "Canada",
    code: "CA",
    languages: ["FR", "EN"],
  },
  {
    name: "South America",
    code: "SOUTHAMERICA",
    languages: ["EN", "ES"],
  },
  {
    name: "Romania",
    code: "RO",
    languages: ["EN"],
  },
  {
    name: "Cyprus",
    code: "CY",
    languages: ["EN"],
  },
  {
    name: "Bulgaria",
    code: "BG",
    languages: ["EN"],
  },
  {
    name: "Slovakia",
    code: "SK",
    languages: ["EN"],
  },
  {
    name: "Bosnia-Herzegovina",
    code: "BA",
    languages: ["EN"],
  },
  {
    name: "Poland",
    code: "PL",
    languages: ["EN"],
  },
  {
    name: "Slovenia",
    code: "SI",
    languages: ["EN"],
  },
  {
    name: "Serbia",
    code: "RS",
    languages: ["EN"],
  },
  {
    name: "Turkey",
    code: "TR",
    languages: ["EN"],
  },
  {
    name: "Montenegro",
    code: "ME",
    languages: ["EN"],
  },
  {
    name: "Rest of the World ",
    code: "WORLD",
    languages: ["EN"],
  },
  // {
  //   name: "Italy",
  //   code: "IT",
  // },
];
