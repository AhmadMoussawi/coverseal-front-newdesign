import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://vpc-search-domain-ghf2j3mcds7n5uesk5y3yeiwgi.eu-central-1.es.amazonaws.com",
});

client.indices
  .delete({
    index: "directus",
  })
  .then((response) => {
    console.log("response", response.body);
  });
