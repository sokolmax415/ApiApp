import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        currency: resolve(__dirname, "pages/currency.html"),
        weather: resolve(__dirname, "pages/weather.html"),
        movies: resolve(__dirname, "pages/movies.html")
      }
    }
  }
});