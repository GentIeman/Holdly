<template>
  <BookmarkList
    :bookmarks="bookmarks"
    :view="viewMode"
  />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { storeToRefs } from "pinia"

import BookmarkList, { type BookmarkView } from "@/features/bookmark/components/BookmarkList.vue"
import { useBookmarkStore } from "@/features/bookmark/stores/bookmark"

const bookmarkStore = useBookmarkStore()
const { bookmarks } = storeToRefs(bookmarkStore)
const { fetchBookmarks } = bookmarkStore

const viewMode: BookmarkView = "cards"

onMounted(fetchBookmarks)
</script>