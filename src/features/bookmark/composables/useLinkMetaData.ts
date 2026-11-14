import { ref, toValue, type MaybeRefOrGetter } from "vue"

import { api } from "@/utils/api"
import type { LinkMetaData } from "@/features/bookmark/components/LinkPreview.vue"

export function useLinkMetaData(link: MaybeRefOrGetter<string>) {
  const emptyMetaData: LinkMetaData = {
    title: "",
    description: undefined,
    preview: undefined,
    siteName: undefined
  }

  const metadata = ref<LinkMetaData>({ ...emptyMetaData })
  const loaded = ref(false)
  const isLoading = ref(false)

  const reset = () => {
    metadata.value = { ...emptyMetaData }
    loaded.value = false
    isLoading.value = false
  }

  const fetchMetaData = async () => {
    const url = toValue(link).trim()

    reset()

    if (url.length < 5) return

    isLoading.value = true

    try {
      metadata.value = await api<LinkMetaData>("/api/link-metadata", { query: { url } })
      loaded.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    metadata,
    loaded,
    isLoading,
    fetchMetaData,
    reset
  }
}