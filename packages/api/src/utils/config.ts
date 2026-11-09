export const origin = import.meta.env.VITE_STRAPI_ORIGIN

export const requestOptions = {
  timeout: 10_000,
  retry: false,
  ignoreResponseError: true
} as const
