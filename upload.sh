if [ -f .env.local ]; then
  set -o allexport
  source .env.local
  set +o allexport
fi


if [ -z "$SUPABASE_URL" ]; then
  read -p "Provide SUPABASE_URL: " SUPABASE_URL
fi


if [ -z "$SUPABASE_KEY" ]; then
  read -sp "Provide SUPABASE_KEY: " SUPABASE_KEY
  echo ""
fi

SUPABASE_URL=$SUPABASE_URL SUPABASE_KEY=$SUPABASE_KEY node --import tsx ./src/app/scripts/upload-embeddings.ts