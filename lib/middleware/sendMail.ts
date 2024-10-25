import type { NextApiRequest } from "next";
import type { CustomNextApiResponse } from "../types";
import type { NextHandler } from "next-connect";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";
import { getLocale } from "../../utils/locale";

function detectArea(country: string) {
  switch (true) {
    case country.includes("BE"):
      return "belgique";
    case country.includes("FR"):
      return "france";
    case country.includes("DE"):
      return "germany";
    case country.includes("NL"):
      return "netherlands";
    default:
      return "rest_of_the_world";
  }
}

const sendMail =
  <
    T extends {
      language: string;
      catalog?: string;
      country?: string;
      mail?: string;
    }
  >({
    contentKey,
    withCatalog,
    withoutCc,
  }: {
    contentKey: string;
    withCatalog?: boolean;
    withoutCc?: boolean;
  }) =>
  async (
    req: NextApiRequest,
    res: CustomNextApiResponse,
    next: NextHandler
  ) => {
    try {
      const { directus, parsedBody } = res.locals;
      const data = parsedBody as T;
      const cmsLocale = getLocale(data.language);

      const subjectKey = `${contentKey}_confirm_reception_subject`;
      const bodyKey = `${contentKey}_confirm_reception`;

      const mailsContent = await directus
        .singleton<string, MailsContentDirectus>("mails_content")
        .read({
          fields: [
            "mails",
            `translations.${bodyKey}`,
            `translations.${subjectKey}`,
            ...(withCatalog ? ["translations.catalog.*"] : []),
          ],
          deep: {
            translations: {
              _filter: {
                languages_code: {
                  _eq: cmsLocale,
                },
              },
            } as any,
          },
        });
        var htm = jsonToUl(data);
      const mails = (() => {
        if (withoutCc || !data.country) {
          return undefined;
        }
        const area = detectArea(data.country);
        return mailsContent.mails.find((item) => item.area === area);
      })();

      console.log("mails area used", mails);

      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region: "eu-central-1", apiVersion: "2010-12-01" }),
      });

      // send confirmation mail to the user
      await transporter
        .sendMail({
          from: "berenice@coverseal.com",
          to: data.mail,
          subject: mailsContent.translations[0][subjectKey],
          html: mailsContent.translations[0][bodyKey],
          replyTo: mails ? mails[contentKey] : undefined,
        })
        .then(function (data) {
          console.log(data);
        });

      if (mails) {
        // send mail with data to the proper service
        
        
        await transporter
          .sendMail({
            from: "berenice@coverseal.com",
            to: mails[contentKey],
            subject: mailsContent.translations[0][subjectKey],
            html: `
            <p>New entry in the CMS: </p>
            
            <ul><li><b>Request type:</b> ${contentKey}</li>
            <li><b>Data:</b><br/>
            
            ${htm}</li></ul>`,
          })
          .then(function (data) {
            console.log(data);
          });
      }

      next();
    } catch (error) {
      const message = "Can't send mail";
      //console.error(error);
      //console.error(message);
      /*res.status(500).json({
        success: false,
        message,
      });*/
      next();
    }
  };
  function jsonToUl(jsonData) {
    var ulHtml = '<ul>';
    for (const key in jsonData) {
      ulHtml += `<li>${key}: ${Array.isArray(jsonData[key]) ? jsonData[key].join(', ') : jsonData[key]}</li>`;
      
    }
    // Iterate through JSON properties
    /*for (var key in jsonData) {
        //if (jsonData.hasOwnProperty(key)) {
            ulHtml += '<li><strong>' + key + ':</strong> ';

            // Check if the property is an array or object and recurse
            if (Array.isArray(jsonData[key])) {
                ulHtml += jsonToUl({ items: jsonData[key] }); // Assuming array items are always nested under 'items'
            } else if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
                ulHtml += jsonToUl(jsonData[key]);
            } else {
                ulHtml += jsonData[key];
            }

            ulHtml += '</li>';
        //}
    }*/

    ulHtml += '</ul>';
    return ulHtml;
}
export default sendMail;
