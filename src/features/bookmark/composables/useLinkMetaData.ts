import { ref, toValue, type MaybeRefOrGetter } from "vue"

import { api } from "@/utils/api"
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

  const reset = () => {
    metadata.value = { ...emptyMetaData }
    isLoaded.value = false
  }

  const fetchMetaData = async () => {
    const url = toValue(link).trim()

    reset()

    if (url.length < 5) return

    metadata.value = await api<LinkMetaData>("/api/link-metadata", { query: { url } })
    isLoaded.value = true
  }

  return {
    metadata,
    isLoaded,
    fetchMetaData,
    reset
  }
}