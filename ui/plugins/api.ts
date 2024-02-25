export default defineNuxtPlugin({
  setup() {
    const toast = useToast();
    const accessToken = useCookie("access_token");
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase,
      onResponseError: () => {
        toast.add({
          title: "OOPS!",
          description: "The operation failed.",
          color: "red",
        });
      },
      onResponse: ({ options, request, response }) => {
        if (
          options.method !== undefined &&
          response.status >= 200 &&
          response.status <= 210
        ) {
          toast.add({ title: "The operation was successful!" });
        }
      },
      onRequest: (req) => {
        req.options.headers = { Authorization: accessToken.value! };
      },
    });

    return {
      provide: {
        api,
      },
    };
  },
});
