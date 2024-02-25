export const authFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("access_token");

  return useFetch(request, {
    ...opts,
    baseURL: `${config.public.apiBase}/auth`,
    method: "POST",
    onResponse: ({ response }) => {
      if (response.status === 200 && response._data.accessToken) {
        accessToken.value = `Bearer ${response._data.accessToken}`;
      }
    },
  });
};
