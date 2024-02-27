
import rateLimit from "../../utils/rate-limit";
import { cors } from "../../lib/init-middleware";
import { LIMIT_REQUEST_BY_MINUTE } from "../../utils/constants";
import { CloudFrontClient, AssociateAliasCommand, AssociateAliasCommandInput, Signer } from "@aws-sdk/client-cloudfront";
import {RequestSigner, AwsCredentialIdentity, AwsCredentialIdentityProvider} from "@aws-sdk/types"
import { fromTemporaryCredentials } from "@aws-sdk/credential-providers";
import { sign } from "crypto";
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const CLOUDFRONT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEA0Fw9633TaU1APGOQ1n+wpgfVGkNAAboDPrzlN4QjJOVcMyhF\nMBE19YILQfmhemF4ICVs7au3DnXwlu6FhrcwwYT4wJ8XmApqwtAktwB6emUqu1aa\n8MdGIBugb8kuJcsp/kEM9eZQxw/CFcTP0qPAhnsjNqBFU/wXxAxXp7oD/xG61Ee6\ndBRWUxA45iZayr+MOgtQeMbVbXay0b8NIX+EHR6hFKZkJurCocZqn6ZE5HuiCL0e\nDGFApijc2jqg1VVSowmDhrEYZWEbW58eaXfL+Un87CDisgLxEPa9xCF3G1pj/mpJ\nXwEGmHbWs+5gm9b9ZQAErz4xk+BXOsX+6siChQIDAQABAoIBACHSN0LYg86d+YVT\n"+
  "7BjFVVk+ADtpGySsmwY+Bz8BteqxSEwNh12MDaQyXb1x1eJVm/gr2wihTO+N+WWm\n"+
  "hgoeBk4DVZV+vYeyeS3yN2N1MmxXq54JKtFWp21izqIWl+UOm1xoFsB7iDUnu6to\n"+
  "7QsWBZROvKKLVXWSgBEUp83UBf4LCaiWvTCkXT0t0fXuyP7M4TyQZpZBnitvHGpy\n"+
  "0iBagtfXOH/x7jLwbm5zFhlqhWbOU3p/yRuOtjIzcGdM/4rqnm894845smyetY6s\n"+
  "mULQh4c/V/4NXs0PRx8yGKSY2h9uBRODx4srWduTCREiSxUD5DTHUPL2ea7wm+ck\n"+
  "3c7V7wECgYEA8ZhWFPWiQdrGesbse0UHLmn/rq9EN7iO3ZDxGH+vL90cF4Es3108\n"+
  "wI2SMWkiBV1doK7hfJvWB9IQmJp0ZC6mFnakiHTY6Mi3w4+MtKzSIfQ80QGv1E/8\n"+
  "tJSJVzKVPAGK4YM4jKnE9AVd91OIq9sIeduPskIsemkLrYDqJRqJEeUCgYEA3Mid\n"+
  "z3pE461+XmYN9PMrWLlu8Xk5vOrT6TzHr1h/WMQG9QVWnxf4k1w3lE9JzKjEJBSe\n"+
  "FSiL8ynSapckvh8BBb4S/cMd6Ob+esD/mJS0bn01nlVy0QH0zx/xCc593vl219+3\n"+
  "RUa1SSGJ3WYwLlgyvOQT65EhxnA56CfdLPClJCECgYAj7XWPtF+mz3QIuiBczI0e\n"+
  "1+CQB7xrVOTaCj3wWLyir40H6cvUg7cPI36EHpBSn+nWhWs+7qXLj++r4fxBEbbd\n"+
  "TFN3f3jqVT8OtABGthShvAJ3SnrtZd+8swIhl4Id5FTU6IC2WmDRsSKiLyf59p6y\n"+
  "EHa0GacnpQt5h9xKHEIaCQKBgFttTER1yn9KAhGPS2pLJIEaUQH4BFviFpz4SWyo\n"+
  "Rhv5GTRv4H4DTDGht3ZYGySAIrEaRJhYcRPiFruDGXkNl7vMCUtCeGlQ9sLYlz+V\n"+
  "HN7AROrrUZ+RotH+1S8Nbnxea8NbZiZu8HV3SQMA5STb6y7jeAhN0mG9aY1krKeG\n"+
  "g6xhAoGANjnPNfRIF9I8jbwGELirUDee8r1NEcXqqsxT0KTg2lnrzeGqSw9+vCJh\n"+
  "fNH52phOuC4lk9ZgR8I3lmxPvSXhlMLXt6LqP5ZvAlRPh0JT7+M/FEZUSuefvnDA\n"+
  "lW0nUvOHJtOhnPRRJ2NHt98PlLFyUfLDCb02+aqD8wH/jIbkCNo=\n"+
  "-----END RSA PRIVATE KEY-----\n";
const CLOUDFRONT_PUBLIC_KEY_ID='K3CWKZ683FETCK'
var signers = {
  KeyPairIds : {Items:[CLOUDFRONT_PUBLIC_KEY_ID]}
} as Signer;



export default async function handler(req, res) {
  await cors(req, res);
  
  try {
    await limiter.check(res, LIMIT_REQUEST_BY_MINUTE, "CACHE_TOKEN");
  } catch (error) {
    console.error(error);
    res.status(429).json({ error: "Rate limit exceeded" });
  }


  try {
    var signer = {
  sign(requestToSign, options) {
  },
    } as RequestSigner; 
    var signedurl = await signer.sign(req.query.unsigned_url, {});
    var identityProvider = {} as AwsCredentialIdentityProvider;

 
  const client = new CloudFrontClient({ region:"eu-central-1"  });
      const params = {
        TargetDistributionId: "E2GYSFV1AO3WIF",
        Alias: "d3nou5eyizbneo.cloudfront.net"
        /** input parameters */
      } as AssociateAliasCommandInput;
      const command = new AssociateAliasCommand(params);
      const data = await client.send(command);
      console.log(data);
    res.status(200).json(
      {signed_url:data}
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Issue contacting cloudfront" });
  }
}
