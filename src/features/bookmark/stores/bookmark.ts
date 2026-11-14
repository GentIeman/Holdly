import { defineStore } from "pinia"
import { computed, ref } from "vue"

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

type SaveBookmarkPayload = Pick<Bookmark, "link" | "title"> &
  Partial<Pick<Bookmark, "description" | "preview">>

export const useBookmarkStore = defineStore("bookmark", () => {
  const userStore = useUserStore()

  const bookmarks = ref<Bookmark[]>([])

  const bookmarkLength = computed(() => bookmarks.value.length)

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

  const saveBookmark = async (payload: SaveBookmarkPayload) => {
    if (!userStore.user) throw new Error("User is not authenticated")

    await api<Bookmark>("/api/bookmark", {
      method: "POST",
      body: {
        ...payload,
        user: userStore.user.documentId
      }
    })

    await fetchBookmarks()
  }

  return {
    bookmarks,
    fetchBookmarks,
    deleteBookmark,
    saveBookmark,
    bookmarkLength
  }
})