import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://vpc-search-domain-ghf2j3mcds7n5uesk5y3yeiwgi.eu-central-1.es.amazonaws.com",
});

async function main() {
  await client.indices.close({
    index: "directus",
  });

  await client.indices.putSettings({
    index: "directus",
    body: {
      analysis: {
        analyzer: {
          autocomplete: {
            tokenizer: "autocomplete",
            filter: ["lowercase", "asciifolding"],
          },
          autocomplete_search: {
            tokenizer: "lowercase",
          },
        },
        tokenizer: {
          autocomplete: {
            type: "edge_ngram",
            min_gram: 2,
            max_gram: 50,
            token_chars: ["letter", "digit"],
          },
        },
      },
      mappings: {
        properties: {
          content: {
            type: "text",
            analyzer: "autocomplete",
            search_analyzer: "autocomplete_search",
          },
          question: {
            type: "text",
            analyzer: "autocomplete",
            search_analyzer: "autocomplete_search",
          },
        },
      },
    },
  });

  console.log('HERE');

  await client.indices.put_mapping({
    index: "directus",
    body: {
      properties: {
        content: {
          type: "text",
          analyzer: "autocomplete",
          search_analyzer: "autocomplete_search",
        },
        question: {
          type: "text",
          analyzer: "autocomplete",
          search_analyzer: "autocomplete_search",
        },
      },
    },
  });

  await client.indices.open({
    index: "directus",
  });
}

main();
