import { uploadEmbeddings } from "../lib/embeddings.ts";

(async () => {
  try {
    await uploadEmbeddings("src/app/data/astro.txt");
  } catch (err) {
    console.error("Caught error type:", typeof err);
    console.error("Constructor:", err?.constructor?.name);
    console.dir(err, { depth: null });
  }
})();
