import { uploadEmbeddings } from "../lib/embeddings";

async function main() {
  await uploadEmbeddings("data/astro.txt");
}

main()
  .then(() => console.log("Upload finished!"))
  .catch((err) => console.error("Upload failed:", err));
