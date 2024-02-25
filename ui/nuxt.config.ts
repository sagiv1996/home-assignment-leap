// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
});
