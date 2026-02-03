import {shallowRef} from 'vue'
import type {LinkPreview} from "~~/layers/bookmark/app/components/LinkPreview.vue"

export function useLinkPreview() {
    const preview = shallowRef<LinkPreview | null>(null)
    const error = shallowRef<Error | null>(null)
    const toast = useToast()

    const fetchPreview = async (url: string) => {
        preview.value = null
        error.value = null

        if (url.length < 5) return

        preview.value = await $fetch('/api/link-preview', {
            query: {url},
            onResponseError({response}) {
                if (response.status == 400) {
                    toast.add({
                        title: 'Invalid link',
                        description: 'Please check that the URL is correct and publicly accessible.',
                        color: 'error',
                    })
                }

                if (response.status == 504) {
                    toast.add({
                        title: 'Request timed out',
                        description: 'Please try again later or use a different link.',
                        color: 'error',
                    })
                }

                toast.clear()
            }
        })
    }

    return {
        preview,
        error,
        fetchPreview,
    }
}