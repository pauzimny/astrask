# Astrask

A Next.js application with Supabase and OpenAI integration for semantic search and embeddings.

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Supabase account
- OpenAI API key

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd astrask
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

## Supabase Setup

1. Create a new project in [Supabase](https://supabase.com/)
2. In your Supabase dashboard, go to the SQL editor and run the following SQL to set up the required tables and functions:
   ```sql
   -- Enable the pgvector extension
   create extension vector;

   -- Create a table to store documents and their embeddings
   create table documents (
     id bigserial primary key,
     content text,
     metadata jsonb,
     embedding vector(1536)
   );

   -- Create a function to match documents based on similarity
   create or replace function match_documents (
     query_embedding vector(1536),
     match_threshold float,
     match_count int
   )
   returns table (
     id bigint,
     content text,
     metadata jsonb,
     similarity float
   )
   language sql
   as $$
     select
       documents.id,
       documents.content,
       documents.metadata,
       1 - (documents.embedding <=> query_embedding) as similarity
     from documents
     where 1 - (documents.embedding <=> query_embedding) > match_threshold
     order by similarity desc
     limit match_count;
   $$;
   ```

3. Go to Project Settings > API to find your Supabase URL and anon/public key.

## Uploading Embeddings

To upload document embeddings to Supabase, use the provided script:

1. Place your documents in the `data` directory (create it if it doesn't exist).
2. Run the upload script:
   ```bash
   npm run upload-embeddings
   # or
   yarn upload-embeddings
   # or
   pnpm upload-embeddings
   ```

   The script will:
   - Read documents from the `data` directory
   - Generate embeddings using OpenAI
   - Upload them to your Supabase database

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run the linter
- `npm run format` - Format the code
- `npm run upload-embeddings` - Upload document embeddings to Supabase

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `OPENAI_API_KEY` - Your OpenAI API key

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [OpenAI](https://openai.com/) - For generating embeddings
- [LangChain](https://js.langchain.com/) - For working with language models
- [Tailwind CSS](https://tailwindcss.com/) - For styling
