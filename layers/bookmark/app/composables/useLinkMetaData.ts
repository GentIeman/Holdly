import { ref, toValue } from "vue"
import type { LinkMetaData } from "~/components/ui/bookmark/LinkPreview.vue"
import { useNotifications } from "@vuetify/v0"

export function useLinkMetaData(link: MaybeRefOrGetter<string>) {
  const metadata = ref<LinkMetaData>({
    title: "",
    preview: undefined,
    description: undefined,
    siteName: undefined
  })
  const error = ref<Error | null>(null)
  const notification = useNotifications()
  const config = useRuntimeConfig()

  const fetchMetaData = async () => {
    const url = toValue(link)
    error.value = null

    if (!url || url.length < 5) {
      resetMetadata()
      return
    }

    metadata.value = await $fetch("/api/link-metadata", {
      baseURL: config.public.apiBase as string,
      query: { url },
      credentials: "include",
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