create extension if not exists vector;

create table if not exists documents (
  id serial primary key,
  content text not null,
  embedding vector(1536)
);

create index if not exists idx_documents_embedding
on documents using ivfflat (embedding vector_cosine_ops)
with (lists = 100);