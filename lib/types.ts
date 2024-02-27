import type { NextApiResponse } from "next";
import type { Directus } from "@directus/sdk";

export type CustomNextApiResponse = NextApiResponse & {
  locals: {
    directus?: Directus<any>;
    nextEntryId?: number;
    uploaded_files?: any;
    parsedBody?: IAnyObject;
  };
};
