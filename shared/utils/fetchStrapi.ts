import type { FetchRequest } from "ofetch";

type StrapiResponse<T> = {
    data: T
    error?: null
    meta?: null
}

type Body = Record<string, string | number | boolean>;

type Options = Omit<FetchRequest, "headers"> & {
    token?: string;
    headers?: Record<string, string>;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Body
}

export default async function <T>(collection: string, options: Options = {}) {

    const config = useRuntimeConfig()

    const {data, error, meta} = await $fetch<StrapiResponse<T>>(config.public.strapiOrigin + collection, {
        headers: options.headers,
        body: options.body
    })

    return {
        data,
        error,
        meta
    }
}