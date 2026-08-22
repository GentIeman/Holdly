import { ref, toValue, type MaybeRefOrGetter } from "vue"

import { useNotifications } from "@vuetify/v0"

import { api } from "@/utils/api"
import type { LinkMetaData } from "@/features/bookmark/components/LinkPreview.vue"

export function useLinkMetaData(link: MaybeRefOrGetter<string>) {
  const metadata = ref<LinkMetaData>({
    title: "",
    preview: undefined,
    description: undefined,
    siteName: undefined
  })
  const error = ref<Error | null>(null)
  const notification = useNotifications()

  const fetchMetaData = async () => {
    const url = toValue(link)
    error.value = null

    if (!url || url.length < 5) {
      resetMetadata()
      return
    }

    metadata.value = await api<LinkMetaData>("/api/link-metadata", {
      query: { url },
      onResponseError({ response }) {
        if (response.status == 400) {
          notification.send({
            subject: "Please check that the URL is correct.",
            severity: "error"
          })
        }

        if (response.status == 504) {
          notification.send({
            subject: "Please try again later or use a different link.",
            severity: "error"
          })
        }
      }
    })
  }

  const resetMetadata = () => {
    metadata.value = {
      title: "",
      preview: undefined,
      description: undefined,
      siteName: undefined
    }
  }

  return {
    metadata,
    error,
    fetchMetaData
  }
}