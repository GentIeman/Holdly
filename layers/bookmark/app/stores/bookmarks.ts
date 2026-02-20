import { defineStore } from 'pinia'
import type { Response as BookmarksResponse } from '~~/layers/bookmark/server/api/bookmarks.get'
import type { Bookmark } from '~~/layers/bookmark/app/components/Bookmark.vue'
import {useUser} from "~~/layers/user/app/composables/useUser"

export const useBookmarksStore = defineStore('bookmarks', () => {
    const user = useUser()

    const bookmarks = ref<Bookmark[]>([])

    const fetchBookmarks = async () => {
        bookmarks.value = await $fetch<BookmarksResponse>('/api/bookmarks', {
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
