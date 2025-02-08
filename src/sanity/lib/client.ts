import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:
    "sk7TGF7QITyw3NbEkvFz2TJx68CUzzfFKkrLwBUttv3F4abtmBUqYr5flcwNZSegs6jjXzzzhYGjseUO6AfEkObx4An57SGqzrNS8tdqdUsQq8KFfQWsazpmpBpq5orAsLgAICVJM81eQ2oFKuDKMxfEQG6MpUyqHNV538lmycWLambPh4BB",
});
