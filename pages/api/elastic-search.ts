import { Client } from "@elastic/elasticsearch";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import rateLimit from "../../utils/rate-limit";
import { cors } from "../../lib/init-middleware";

const ELASTICSEARCH_URL =
  "https://vpc-search-domain-ghf2j3mcds7n5uesk5y3yeiwgi.eu-central-1.es.amazonaws.com";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export default async function handler(req, res) {
  await cors(req, res);

  if (req.method !== "POST") {
    res.status(400);
    return;
  }

  try {
    await limiter.check(res, LIMIT_REQUEST_BY_MINUTE, "CACHE_TOKEN");
  } catch (error) {
    console.error(error);
    res.status(429).json({ error: "Rate limit exceeded" });
  }

  const { searchTerm, language } = JSON.parse(req.body);
  if (!searchTerm || !language) {
    res.status(400).json({
      success: false,
      message: "searchTerm and language are required",
    });
  }

  try {
    const client = new Client({
      node: ELASTICSEARCH_URL,
      maxRetries: 5,
      requestTimeout: 60000,
      sniffOnStart: true
    });
    const elasticSearchRes = await client.search({
      index: "directus",
      body: {
        query: {
          bool: {
            must: [{ match: { languages_code: language } }],
            should: [
              { match: { content: { query: searchTerm } } },
              { match: { question: { query: searchTerm } } },
              { match: { keywords: { query: searchTerm } } },
            ],
            minimum_should_match: 1,
          },
        },
      },
    });

    res.status(200).json(
      elasticSearchRes?.body?.hits?.hits.map((item) => ({
        id: item._source.id,
        translations: [
          {
            ...item._source,
          },
        ],
      }))
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Issue contacting elasticsearch" });
  }
}
