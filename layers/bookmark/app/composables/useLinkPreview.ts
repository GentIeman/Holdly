import {shallowRef, toValue} from 'vue'
import type {LinkMetaData} from "~~/layers/bookmark/app/components/LinkPreview.vue"

export function useLinkMetaData(link: MaybeRefOrGetter<string>) {
    const metadata = shallowRef<LinkMetaData>({
        title: '',
        preview: undefined,
        description: undefined,
        siteName: undefined,
    })
    const error = shallowRef<Error | null>(null)
    const toast = useToast()

    const fetchMetaData = async () => {
        const url = toValue(link)
        error.value = null

        if (!url || url.length < 5) {
            resetMetadata()
            return
        }

        metadata.value = await $fetch('/api/link-metadata', {
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

    const resetMetadata = () => {
        metadata.value = {
            title: "",
            preview: undefined,
            description: undefined,
            siteName: undefined
        }
    }

    watch(
        () => toValue(link),
        () => fetchMetaData(),
        { immediate: true }
    )

    return {
        metadata,
        error,
        fetchMetaData,
    }
}