import { config } from "dotenv";
config();

import { defineConfig } from "@prisma/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definida en .env");
}

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});