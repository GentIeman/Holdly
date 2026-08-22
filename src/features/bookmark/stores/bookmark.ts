import { defineStore } from "pinia"
import { ref } from "vue"

import { api } from "@/utils/api"
import { type User, useUserStore } from "@/features/user/stores/user"

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

  const bookmarks = ref<Bookmark[]>([])

  const fetchBookmarks = async () => {
    if (!userStore.user) return
    bookmarks.value = await api<Bookmark[]>("/api/bookmarks", {
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