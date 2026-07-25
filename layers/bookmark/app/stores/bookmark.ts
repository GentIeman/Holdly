import { defineStore } from "pinia"
import type { Bookmark } from "~~/layers/bookmark/app/components/Bookmark.vue"
import { useUserStore } from "~~/layers/user/app/stores/user"

export const useBookmarkStore = defineStore("bookmark", () => {
  const userStore = useUserStore()
  const config = useRuntimeConfig()

  const bookmarks = ref<Bookmark[]>([])

  const fetchBookmarks = async () => {
    if (!userStore.user) return
    bookmarks.value = await $fetch<Bookmark[]>("/api/bookmarks", {
      baseURL: config.public.apiBase as string,
      credentials: "include",
      query: {
        userDocumentId: userStore.user.documentId
      }
    })
  }

  return {
    bookmarks,
    fetchBookmarks
  }
})