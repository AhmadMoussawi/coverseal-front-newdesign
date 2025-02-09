const redirectArray = require("./redirect.json");
const version = require("./package.json").version;
const ContentSecurityPolicy = `
  default-src 'unsafe-inline';
  script-src 'unsafe-inline';
  child-src 'unsafe-inline';
  style-src 'unsafe-inline';
  font-src 'unsafe-inline';  
`;
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  },
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
];
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// next.config.js
module.exports = withBundleAnalyzer({
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  basePath: '',
  poweredByHeader: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return redirectArray.map((item) => {
      return {
        source: item["Ancienne URL"],
        destination: `/fr-FR${item["Nouvelle URL"]}`,
        permanent: true,
      };
    });
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coverseal-stage.com',
      },{
        protocol: 'https',
        hostname: 'coverseal-stage.fr',
      },{
        protocol: 'https',
        hostname: 'coverseal.com',
      },{
        protocol: 'https',
        hostname: 'coverseal-stage.fr',
      },{
        protocol: 'https',
        hostname: 'coverseal-stage.fr',
      },
    ],
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: [
      "default",

      //"fr-BE",
      //"nl-BE",
      //"en-BE",
      //"de-BE",

      "fr",
      //"en",

     // "nl-NL",
      //"en-NL",

      //"fr-LU",
      //"de-LU",
      //"en-LU",

      //"de-DE",
      //"en-DE",

      //"de-AT",
      /*"en-AT",

      "en-CH",
      "fr-CH",
      "de-CH",

      "en-ES",
      "fr-ES",
      "es-ES",

      "en-IL",

      "en-GB",

      "en-NO",

      "en-SE",

      "en-FI",
      "en-DK",

      //"en-EASTEUROPE",

      "en-AFRICA",
      "fr-AFRICA",

      //"en-AMERICAS",
      //"es-AMERICAS",
      "en-AE",
      "en-HU",
      "en-BU",
      "en-US",
      "es-US",
      "fr-CA",
      "en-CA",
      "en-SOUTHAMERICA",
      "es-SOUTHAMERICA",
      "en-RO",
      "en-CY",
      "en-BG",
      "en-SK",
      "en-BA",
      "en-PL",
      "en-SI",
      "en-RS",
      "en-TR",
      "en-ME",
      "en-WORLD"*/
    ],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "fr",
    localeDetection: false,
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
     domains: [
       {
         domain: "coverseal-stage.fr",
         defaultLocale: "fr"
       },
       /*{
         domain: "coverseal-stage.fr",
         defaultLocale: "fr-FR"
       },
       {
         domain: "coverseal-stage.fr",
         defaultLocale: "fr-FR"
       },*/
    //   {
    //     domain: "example.nl",
    //     defaultLocale: "nl-NL",
    //   },
    //   {
    //     domain: "example.fr",
    //     defaultLocale: "fr",
    //   },
     ],
  },
  env: {
    APP_VERSION: version,
    CMS_PUBLIC_URL: process.env.CMS_PUBLIC_URL,
    CMS_INTERNAL_URL: process.env.CMS_INTERNAL_URL,
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    // reactStrictMode: true,
    // BACKEND_ROOT: "https://saporita.ddns.net/backend",
    // BACKEND_ROOT: "http://localhost:8080",
  },
  compress: true,
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"]
      }
    ],
  ]
});
