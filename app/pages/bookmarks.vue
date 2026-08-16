<template>
  <BookmarkList
    :bookmarks="bookmarks"
    :view="viewMode"
  />
</template>

<script setup lang="ts">
import BookmarkList, { type BookmarkView } from "@/components/ui/bookmark/BookmarkList.vue"
import { useBookmarkStore } from "~~/layers/bookmark/app/stores/bookmark"

const bookmarkStore = useBookmarkStore()
const { bookmarks } = storeToRefs(bookmarkStore)
const { fetchBookmarks } = bookmarkStore

definePageMeta({
  middleware: ["auth"]
})

const viewMode: BookmarkView = "cards"

onMounted(fetchBookmarks)
</script>