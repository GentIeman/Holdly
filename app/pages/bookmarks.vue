<template>
  <main>
    <UContainer
      class="grid gap-4"
      :class="{
        'grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))]': ['cards'].includes(viewMode),
        'grid-cols-1': isBookmarksEmpty
      }"
    >
      <Bookmark
        v-for="bookmark in bookmarks"
        :key="bookmark.documentId"
        :view="viewMode"
        :bookmark="bookmark"
      />
      <UEmpty
        v-if="isBookmarksEmpty"
        title="It looks like you haven't added any bookmarks"
        icon="i-lucide-bookmark"
        :actions="[
          {
            icon: 'i-lucide-plus',
            label: 'Add'
          }
        ]"
      />
    </UContainer>
  </main>
</template>

<script setup lang="ts">
import type { BookmarkView } from "~~/layers/bookmark/app/components/Bookmark.vue"
import { useBookmarkStore } from "~~/layers/bookmark/app/stores/bookmark"

const bookmarkStore = useBookmarkStore()
const { bookmarks } = storeToRefs(bookmarkStore)
const { fetchBookmarks } = bookmarkStore

const isBookmarksEmpty = computed(() => bookmarks.value.length < 1)

definePageMeta({
  middleware: ["auth"]
})

// temporary solution to switch between view modes
const viewMode: BookmarkView = "cards"
onMounted(fetchBookmarks)
</script>

<style scoped></style>