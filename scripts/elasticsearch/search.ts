import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://vpc-search-domain-ghf2j3mcds7n5uesk5y3yeiwgi.eu-central-1.es.amazonaws.com",
});

client.indices.refresh();
const query = "baterie";
client
  .search({
    index: "directus",
    body: {
      query: {
        bool: {
          must: [
            {
              match: { languages_code: "fr-FR" },
            },
          ],
          should: [
            { match: { content: { query } } },
            { match: { question: { query } } },
            { match: { keywords: { query } } },
          ],
          minimum_should_match: 1,
        },
      },
    },
  })
  .then((res) => {
    console.log("HERE", res);
    console.log("HERE", res?.body?.hits?.hits);
  });
