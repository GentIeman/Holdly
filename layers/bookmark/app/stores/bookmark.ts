import { defineStore } from "pinia"
import { type User, useUserStore } from "~~/layers/user/app/stores/user"

export type Bookmark = {
  documentId: string
  title: string
  description: string
  link: string
  preview: string
  createdAt: string
  user: User
}

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