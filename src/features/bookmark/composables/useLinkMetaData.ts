import { ref, toValue, type MaybeRefOrGetter } from "vue"

import { api, toApiError, type ApiError } from "@/utils/api"
import type { LinkMetaData } from "@/features/bookmark/components/LinkPreview.vue"

const emptyMetaData: LinkMetaData = {
  title: "",
  description: undefined,
  preview: undefined,
  siteName: undefined
}

export function useLinkMetaData(link: MaybeRefOrGetter<string>) {
  const metadata = ref<LinkMetaData>({ ...emptyMetaData })
  const isLoaded = ref(false)
  const error = ref<ApiError | null>(null)

  const resetMetaData = () => {
    metadata.value = { ...emptyMetaData }
    isLoaded.value = false
    error.value = null
  }

  const fetchMetaData = async () => {
    const url = toValue(link).trim()

    resetMetaData()

    if (url.length < 5) return

    try {
      metadata.value = await api<LinkMetaData>("/api/link-metadata", { query: { url } })
      isLoaded.value = true
    } catch (cause) {
      error.value = toApiError(cause)
    }
  }

  return {
    metadata,
    isLoaded,
    error,
    fetchMetaData,
    resetMetaData
  }
}