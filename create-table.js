import { sql } from "./db.js";

sql `CREATE TABLE videos (
  id TEXT PRIMARY KEY,  -- Text ID as the primary key
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER  -- Store duration in seconds (adjust if needed)
);`
  .then(()=>{
    console.log("tabela criada.")
  })