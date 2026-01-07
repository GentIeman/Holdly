import type { FetchRequest } from "ofetch";

type StrapiResponse<T> = {
    data: T
    error?: null
    meta?: null
}

interface Options extends Omit<FetchRequest, "headers"> {
    token?: string
    headers?: Record<string, string>,
    method?: "GET" | "POST" | "PUT" | "DELETE"
}

export default async function <T>(collection: string, options: Options = {}) {

    const config = useRuntimeConfig()

    const {data, error, meta} = await $fetch<StrapiResponse<T>>(config.public.strapiOrigin + collection, {
        headers: options.headers
    })

    return {
        data,
        error,
        meta
    }
}