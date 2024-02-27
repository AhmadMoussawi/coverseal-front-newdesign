import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://vpc-search-domain-ghf2j3mcds7n5uesk5y3yeiwgi.eu-central-1.es.amazonaws.com",
});

client.indices
  .create({
    index: "directus",
    body: {
      settings: {
        analysis: {
          analyzer: {
            autocomplete: {
              tokenizer: "autocomplete",
              filter: ["lowercase", "asciifolding"],
            },
            content_analyzer: {
              type: "custom",
              tokenizer: "autocomplete",
              char_filter: ["html_strip"],
              filter: ["lowercase", "asciifolding"],
            },
          },
          tokenizer: {
            autocomplete: {
              type: "edge_ngram",
              min_gram: 3,
              max_gram: 10,
              token_chars: ["letter", "digit"],
            },
          },
        },
      },
      mappings: {
        properties: {
          languages_code: {
            type: "keyword",
          },
          content: {
            type: "text",
            analyzer: "content_analyzer",
            // search_analyzer: "autocomplete_search",
          },
          question: {
            type: "text",
            analyzer: "autocomplete",
            // search_analyzer: "autocomplete_search",
          },
          keywords: {
            type: "text",
            analyzer: "autocomplete",
            // search_analyzer: "autocomplete_search",
          },
        },
      },
    },
  })
  .then((response) => {
    console.log("HERE", response.body);
  });
