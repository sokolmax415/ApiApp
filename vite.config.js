import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/ApiApp/",
  build: {
    rollupOptions: {
      input: {
        currency: resolve(__dirname, "pages/currency.html"),
        books: resolve(__dirname, "pages/books.html")
      }
    }
  }
});