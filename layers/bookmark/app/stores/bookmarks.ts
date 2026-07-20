import { defineStore } from 'pinia'
import type { Bookmark } from '~~/layers/bookmark/app/components/Bookmark.vue'
import {useUser} from "~~/layers/user/app/composables/useUser"

export const useBookmarksStore = defineStore('bookmarks', () => {
    const user = useUser()
    const config = useRuntimeConfig()

    const bookmarks = ref<Bookmark[]>([])

    const fetchBookmarks = async () => {
        bookmarks.value = await $fetch<Bookmark[]>('/api/bookmarks', {
            baseURL: config.public.apiBase as string,
            credentials: "include",
            query: {
                userDocumentId: user.value.documentId,
            },
        })
    }

    return {
        bookmarks,
        fetchBookmarks,
    }
})
