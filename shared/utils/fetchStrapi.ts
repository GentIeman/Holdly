import type { FetchOptions } from "ofetch";

type StrapiResponse<T> = {
    data: T
    error?: null
    meta?: null
}

type Options = FetchOptions & {
    method?: "GET" | "POST" | "PUT" | "DELETE"
}

export default async function <T>(collection: string, options: Options = {}) {

    const config = useRuntimeConfig()

    const {data, error, meta} = await $fetch<StrapiResponse<T>>(config.public.strapiOrigin + collection, {
        method: options.method ?? "GET",
        headers: options.headers,
        body: options.body,
        onRequest: options.onRequest,
        onRequestError: options.onRequestError,
        onResponse: options.onResponse,
        onResponseError: options.onResponseError,
    })

    return {
        data,
        error,
        meta
    }
}