<template>
  <BookmarkList :bookmarks="bookmarks" />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { storeToRefs } from "pinia"

import BookmarkList from "@/features/bookmark/components/BookmarkList.vue"
import { useBookmarkStore } from "@/features/bookmark/stores/bookmark"

const bookmarkStore = useBookmarkStore()
const { bookmarks } = storeToRefs(bookmarkStore)
const { fetchBookmarks } = bookmarkStore

onMounted(fetchBookmarks)
</script>