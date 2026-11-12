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
        user: userStore.user.documentId
      }
    })
  }

  const deleteBookmark = async (id: Bookmark["documentId"]) => {
    await api(`/api/bookmark/${id}`, {
      method: "DELETE"
    })

    bookmarks.value = bookmarks.value.filter((bookmark) => bookmark.documentId !== id)
  }

  return {
    bookmarks,
    fetchBookmarks,
    deleteBookmark
  }
})